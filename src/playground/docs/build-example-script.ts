/**
 * build-example-script.ts
 * -----------------------------------------------------------------------------
 * Turns a `usage` snippet from component-docs.ts (just a piece of template,
 * e.g. `<Slider v-model="value" />`) into a runnable example with an
 * auto-generated <script setup> — it infers the needed ref/reactive bindings
 * from attribute patterns (v-model, :options, @click, ref=...).
 *
 * Used to live inline in ComponentDoc.vue mixed with the API table markup —
 * extracted into a standalone module since it has no dependency on the Vue
 * runtime.
 * -----------------------------------------------------------------------------
 */
import type { ComponentDoc } from "./component-docs";

export interface SourceExample {
    title: string;
    source: string;
}

function buildScript(usage: string): string {
    const modelMatches = [...usage.matchAll(/v-model(?:\:[\w-]+)?="([\w$]+)(?:\.([\w$]+))?"/g)];
    const arrays = [...usage.matchAll(/:(?:items|options|suggestions|users|links|tree|columns|data)="([\w$]+)"/g)].map((match) => match[1]);
    const bindings = [...usage.matchAll(/:(?:model|rules|links|items|options|columns|data)="([\w$]+)"/g)].map((match) => match[1]);
    const simpleBindings = [...usage.matchAll(/:[\w-]+="([a-z][\w$]*)"/g)].map((match) => match[1]);
    const templateRefs = [...usage.matchAll(/\sref="([\w$]+)"/g)].map((match) => match[1]);
    const handlers = [...usage.matchAll(/@[\w-]+="([A-Za-z_$][\w$]*)"/g)].map((match) => match[1]);
    const callbackHandlers = [...usage.matchAll(/=>\s*([A-Za-z_$][\w$]*)\s*\(/g)].map((match) => match[1]);
    const declarations: string[] = [];
    const declared = new Set<string>();
    const nestedModels = new Map<string, string[]>();

    for (const match of modelMatches) {
        const root = match[1];
        const field = match[2];
        if (root && field) {
            nestedModels.set(root, [...(nestedModels.get(root) ?? []), field]);
        }
    }

    for (const [name, fields] of nestedModels) {
        declared.add(name);
        declarations.push(`const ${name} = reactive({ ${fields.map((field) => `${field}: ""`).join(", ")} })`);
    }

    for (const match of modelMatches) {
        const name = match[1];
        if (!name || declared.has(name)) continue;
        declared.add(name);
        const isArray = /(?:arr|tags|files|selected|path|links|items|options)/i.test(name);
        const isBoolean = /^(?:is|has|open|loading|busy|on|agree)/i.test(name);
        const initialValue = isArray ? "[]" : isBoolean ? "false" : '""';
        declarations.push(`const ${name} = ref(${initialValue})`);
    }

    for (const name of [...arrays, ...bindings]) {
        if (!name || declared.has(name)) continue;
        declared.add(name);
        if (name === "rules") {
            const fields = nestedModels.get("model") ?? [];
            const rules = fields.length
                ? `{ ${fields.map((field) => `${field}: [{ required: true, message: "This field is required" }]`).join(", ")} }`
                : "{}";
            declarations.push(`const rules: Record<string, FormRule[]> = ${rules}`);
        } else {
            const isOptions = /options$/i.test(name);
            declarations.push(
                isOptions
                    ? `const ${name}: SelectOption[] = [{ label: "Frontend", value: "frontend" }, { label: "Backend", value: "backend", disabled: true }]`
                    : `const ${name} = []`,
            );
        }
    }

    for (const name of simpleBindings) {
        if (!name || declared.has(name)) continue;
        declared.add(name);
        declarations.push(name === "containerRef" ? `const ${name} = ref<HTMLElement | null>(null)` : `const ${name} = ref("")`);
    }

    for (const name of templateRefs) {
        if (!name || declared.has(name)) continue;
        declared.add(name);
        declarations.push(`const ${name} = ref(null)`);
    }

    for (const name of [...handlers, ...callbackHandlers]) {
        if (!name || declared.has(name)) continue;
        declared.add(name);
        declarations.push(
            name === "handleClick"
                ? `function ${name}(event: MouseEvent) { event.preventDefault() }`
                : `function ${name}(_value: unknown) {}`,
        );
    }

    if (!declarations.length) {
        return "// No local state is required for this example.";
    }

    const imports = [`import { ${nestedModels.size ? "reactive, " : ""}ref } from "vue";`];
    if (declarations.some((line) => line.includes("FormRule"))) {
        imports.push('import type { FormRule } from "@jeesson/vibe-ui";');
    }
    if (declarations.some((line) => line.includes("SelectOption"))) {
        imports.push('import type { SelectOption } from "@jeesson/vibe-ui";');
    }
    return `${imports.join("\n")}\n\n${declarations.join("\n")}`;
}
/** Splits a usage snippet into self-contained template chunks (one per component instance). */
function splitUsage(usage: string): string[] {
    const chunks: string[] = [];
    let current: string[] = [];
    let depth = 0;

    for (const rawLine of usage.split("\n")) {
        const line = rawLine.trim();
        if (!line) continue;
        if (current.length && depth === 0) {
            chunks.push(current.join("\n"));
            current = [];
        }

        current.push(line);
        const openingTags = line.match(/<[A-Z][\w-]*(?:\s[^>]*)?>/g) ?? [];
        const closingTags = line.match(/<\/[A-Z][\w-]*\s*>/g) ?? [];
        depth += openingTags.filter((tag) => !tag.endsWith("/>")).length;
        depth -= closingTags.length;

        if (depth === 0) {
            chunks.push(current.join("\n"));
            current = [];
        }
    }

    if (current.length) chunks.push(current.join("\n"));
    return chunks;
}

function exampleTitle(example: string, index: number): string {
    const tag = example.match(/<([A-Z][\w-]*)/)?.[1] ?? "Component";
    const normalized = example.toLowerCase();

    if (normalized.includes("disabled")) return "Disabled state";
    if (normalized.includes(":icon") || normalized.includes("icon-right")) return "With icon";
    if (normalized.includes("clearable")) return "Clearable value";
    if (normalized.includes('status="success"')) return "Success state";
    if (normalized.includes('status="warning"')) return "Warning";
    if (normalized.includes('status="exception"')) return "Error state";
    if (normalized.includes('type="circle"') || normalized.includes('type="dashboard"')) {
        return "Circular variant";
    }
    if (normalized.includes("@")) return "Interactive";
    if (normalized.includes("v-model")) return `${tag} with value`;
    return `${tag} · variant ${index + 1}`;
}

/** Builds the list of runnable examples from doc.usage — the entry point of the module. */
export function buildSourceExamples(doc: ComponentDoc): SourceExample[] {
    const usage = doc.usage ?? "";
    const usages = /^(?:import\s|message\.|messageBox\.|toast\.)/.test(usage.trim()) ? [usage] : splitUsage(usage);

    return usages.map((example, index) => {
        if (/^(?:import\s|message\.|messageBox\.|toast\.)/.test(example.trim())) {
            const importLine = example.trim().startsWith("message.")
                ? 'import { message } from "@jeesson/vibe-ui";\n\n'
                : example.trim().startsWith("messageBox.")
                  ? 'import { messageBox, toast } from "@jeesson/vibe-ui";\n\n'
                  : "";
            return {
                title: exampleTitle(example, index),
                source: `<script setup lang="ts">\n${importLine}${example}\n<\/script>`,
            };
        }

        const script = buildScript(example);
        const template = example
            .split("\n")
            .map((line) => `  ${line}`)
            .join("\n");
        return {
            title: exampleTitle(example, index),
            source: `<template>\n${template}\n</template>\n\n<script setup lang="ts">\n${script}\n<\/script>`,
        };
    });
}
