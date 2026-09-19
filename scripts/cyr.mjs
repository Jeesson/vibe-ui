// Lists Cyrillic lines inside library code only (src/components, src/composables, src/styles).
import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(".");
const walk = (dir, out = []) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, e.name);
        if (e.isDirectory()) walk(full, out);
        else if (/\.(ts|vue|css)$/.test(e.name)) out.push(full);
    }
    return out;
};

let found = 0;
for (const dir of ["src/components", "src/composables", "src/styles"]) {
    for (const f of walk(join(root, dir))) {
        const text = readFileSync(f, "utf8");
        text.split(/\r?\n/).forEach((line, i) => {
            if (/[\u0400-\u04FF]/.test(line)) {
                found++;
                console.log(`${f.replace(root, "")}:${i + 1}: ${line.trim()}`);
            }
        });
    }
}
if (!found) console.log("LIBRARY files with cyrillic: 0");
