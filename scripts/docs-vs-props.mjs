// Temporary: compare docs props vs real component props.
import { readFileSync, readdirSync } from "node:fs";
import { join, resolve, basename } from "node:path";

const root = resolve(".");
const docsSrc = readFileSync(join(root, "src/playground/docs/component-docs.ts"), "utf8");

// Programmatic-API components have no .vue file — the audit doesn't apply to them.
const SKIP_KEYS = new Set(["message", "toast", "messageBox"]);
// Some doc keys map to component files with a different name.
const COMPONENT_ALIASES = {
    messageBox: "MessageBoxDialog",
    autocomplete: "Autocomplete",
    inputTag: "InputTag",
    timeSelect: "TimeSelect",
};
// Props that belong to child components (TabPane, AnchorLink) rather than the
// parent documented here — they are documented on the child's own page.
const KNOWN_NESTED = {
    anchor: ["title"],
    tabs: ["label", "disabled"],
};

// Split doc entries: "    <key>: {" ... until next "    }," at same indent
const entries = [];
const re = /^ {4}(\w+): \{\r?\n([\s\S]*?)^ {4}\},$/gm;
let m;
while ((m = re.exec(docsSrc))) entries.push({ key: m[1], body: m[2] });

const vueFiles = [];
const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, e.name);
        if (e.isDirectory()) walk(full);
        else if (e.name.endsWith(".vue")) vueFiles.push(full);
    }
};
walk(join(root, "src/components"));

function namesFromTypeLiteral(text) {
    const names = new Set();
    for (const chunk of text.split(/[;\n]/)) {
        const mm = chunk.match(/^\s*([A-Za-z_$][\w$]*)\s*\??\s*:/);
        if (mm) names.add(mm[1]);
    }
    return names;
}

function propNames(file) {
    const text = readFileSync(file, "utf8");
    const names = new Set();
    for (const b of text.matchAll(/defineProps<\{([\s\S]*?)\}>\(\)/g)) {
        for (const n of namesFromTypeLiteral(b[1])) names.add(n);
    }
    for (const im of text.matchAll(/defineProps<([A-Z]\w*)>\(\)/g)) {
        const iface = text.match(new RegExp(`(?:export )?interface ${im[1]} \\{([\\s\\S]*?)\\n\\}`));
        if (iface) for (const n of namesFromTypeLiteral(iface[1])) names.add(n);
    }
    return names;
}

function lowerFirst(s) {
    return s.charAt(0).toLowerCase() + s.slice(1);
}

let problems = 0;
for (const entry of entries) {
    // Only real component-doc entries carry a `group:` field; fragments of
    // apiDescriptionsEn / componentDescriptionsEn at the same indent don't.
    if (!/^ {8}group: /m.test(entry.body)) continue;
    if (SKIP_KEYS.has(entry.key)) continue;
    const nameMatch = entry.body.match(/name: "([\w-]+)"/);
    const compName = COMPONENT_ALIASES[entry.key] ?? (nameMatch ? nameMatch[1] : entry.key.charAt(0).toUpperCase() + entry.key.slice(1));
    const file =
        vueFiles.find((f) => basename(f) === `${compName}.vue`) ?? vueFiles.find((f) => basename(f) === `${lowerFirst(compName)}.vue`);
    if (!file) {
        console.log(`?? ${entry.key}: no <${compName}>.vue found`);
        problems++;
        continue;
    }
    const real = propNames(file);
    // props block may be formatted as a multi-line array or a single line.
    // Choose the strategy by whether a newline follows "props: [".
    const propsBlock = /^ {8}props: \[\r?\n/m.test(entry.body)
        ? entry.body.match(/^ {8}props: \[([\s\S]*?)^ {8}\],$/m)
        : entry.body.match(/props: \[([^\]]*)\]/);
    const documented = propsBlock ? [...propsBlock[1].matchAll(/name: "([\w-]+)"/g)].map((x) => x[1]) : [];
    const missingInDocs = [...real].filter((p) => !documented.includes(p) && !(KNOWN_NESTED[entry.key] ?? []).includes(p));
    const extraInDocs = documented.filter((p) => !real.has(p));
    if (missingInDocs.length || extraInDocs.length) {
        problems++;
        console.log(`${entry.key} (${basename(file)})${propsBlock ? "" : " [NO props BLOCK]"}`);
        if (missingInDocs.length) console.log(`   docs missing: ${missingInDocs.join(", ")}`);
        if (extraInDocs.length) console.log(`   docs extra  : ${extraInDocs.join(", ")}`);
    }
}
console.log(problems ? `\n✗ ${problems} несоответствий` : "✓ Документация пропсов синхронна с кодом");
