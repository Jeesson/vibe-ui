#!/usr/bin/env node
/**
 * check-imports.mjs
 * -----------------------------------------------------------------------------
 * Scans all .ts/.vue files under src/ and verifies that every relative import
 * (from "./x", from "../y") resolves to a real file on disk.
 *
 * Why: during refactoring/file removal it's easy to miss a reference — e.g.
 * src/playground/pages/components/Message.vue imported an already-deleted
 * components/Message. vue-tsc doesn't always catch this with the current
 * noUnusedLocals/strict settings for .vue SFC imports, so this is a fast
 * filesystem-level check.
 *
 * Run: node scripts/check-imports.mjs  (aliased as `npm run verify:imports`)
 * -----------------------------------------------------------------------------
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");

const IMPORT_RE = /(?:from\s+|import\s*\(\s*)["']([^"']+)["']/g;
const RESOLVABLE_EXT = ["", ".ts", ".vue", ".js", "/index.ts", "/index.vue"];

function findSourceFiles(dir, out = []) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) findSourceFiles(full, out);
        else if (/\.(ts|vue)$/.test(entry.name)) out.push(full);
    }
    return out;
}

function resolves(fromFile, spec) {
    if (!spec.startsWith(".")) return true; // package import — not our concern
    const base = resolve(dirname(fromFile), spec);
    return RESOLVABLE_EXT.some((ext) => existsSync(base + ext));
}

const files = findSourceFiles(SRC);
const broken = [];

for (const file of files) {
    const text = readFileSync(file, "utf8");
    for (const match of text.matchAll(IMPORT_RE)) {
        const spec = match[1];
        if (spec.endsWith(".css")) continue; // side-effect styles — not .ts/.vue graph
        if (!resolves(file, spec)) {
            broken.push({ file: file.replace(ROOT + "/", ""), spec });
        }
    }
}

if (broken.length) {
    console.error(`\n✗ Found ${broken.length} broken relative imports:\n`);
    for (const { file, spec } of broken) {
        console.error(`  ${file}\n    → "${spec}" does not resolve on disk\n`);
    }
    process.exit(1);
} else {
    console.log(`✓ All relative imports resolve (${files.length} files checked)`);
}
