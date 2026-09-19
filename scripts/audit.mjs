// Temporary audit helper (not part of the library).
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";

const root = resolve(".");
const read = (p) => readFileSync(join(root, p), "utf8");

const docs = read("src/playground/docs/component-docs.ts");
const docKeys = [...docs.matchAll(/^ +key: "([\w-]+)",/gm)].map((m) => m[1]);
const docGroups = [...docs.matchAll(/^ +group: "([\w-]+)",/gm)].map((m) => m[1]);

const pages = read("src/playground/component-pages.ts");
const pageKeys = [...pages.matchAll(/^ {4}(\w+): C_/gm)].map((m) => m[1]);

const onlyDocs = docKeys.filter((k) => !pageKeys.includes(k));
const onlyPages = pageKeys.filter((k) => !docKeys.includes(k));
console.log("docs keys:", docKeys.length, "page keys:", pageKeys.length);
console.log("docs w/o page:", onlyDocs.join(", ") || "-");
console.log("page w/o docs:", onlyPages.join(", ") || "-");
console.log("groups used:", [...new Set(docGroups)].join(", "));

// groupOrder
const go = docs.match(/export const groupOrder[\s\S]*?\[([\s\S]*?)\]/);
console.log("groupOrder:", go ? go[1].replace(/\s+/g, " ").trim() : "n/a");

// unordered docs keys (keys whose doc has no group?) - count group per key
const groupCount = docGroups.length;
console.log("group fields:", groupCount);

// Cyrillic comments / strings inventory
const walk = (dir, out = []) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, e.name);
        if (e.isDirectory()) walk(full, out);
        else if (/\.(ts|vue)$/.test(e.name)) out.push(full);
    }
    return out;
};
const cyr = [];
for (const f of walk(join(root, "src"))) {
    const rel = f.replace(root + "\\", "");
    if (!/^src\\(components|composables|styles)\\/.test(rel)) continue;
    const text = readFileSync(f, "utf8");
    const m = text.match(/[\u0400-\u04FF]/);
    if (m) cyr.push(rel);
}
console.log("LIBRARY files with cyrillic:", cyr.length);
console.log(cyr.join("\n"));
