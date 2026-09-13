<script setup lang="ts">
import { computed } from "vue";
import Tooltip from "../../components/Tooltip/Tooltip.vue";
import type {
    PropDoc,
    EventDoc,
    MethodDoc,
    SlotDoc,
    ComponentDoc,
} from "./component-docs";
import { componentDescriptionsEn } from "./component-docs";
import { apiDescriptionsEn } from "./component-docs";
import { useLocale } from "../composables/ui-locale";

const props = defineProps<{
    doc: ComponentDoc;
    structuredExamples?: boolean;
}>();
const { locale, t } = useLocale();
const localizedDescription = computed(() =>
    locale.value === "en"
        ? componentDescriptionsEn[props.doc.key] ?? props.doc.description
        : props.doc.description,
);
function buildScript(usage: string): string {
    const modelMatches = [
        ...usage.matchAll(/v-model(?:\:[\w-]+)?="([\w$]+)(?:\.([\w$]+))?"/g),
    ];
    const arrays = [
        ...usage.matchAll(/:(?:items|options|suggestions|users|links|tree|columns|data)="([\w$]+)"/g),
    ].map((match) => match[1]);
    const bindings = [
        ...usage.matchAll(/:(?:model|rules|links|items|options|columns|data)="([\w$]+)"/g),
    ].map((match) => match[1]);
    const simpleBindings = [
        ...usage.matchAll(/:[\w-]+="([a-z][\w$]*)"/g),
    ].map((match) => match[1]);
    const templateRefs = [...usage.matchAll(/\sref="([\w$]+)"/g)].map(
        (match) => match[1],
    );
    const handlers = [
        ...usage.matchAll(/@[\w-]+="([A-Za-z_$][\w$]*)"/g),
    ].map((match) => match[1]);
    const callbackHandlers = [
        ...usage.matchAll(/=>\s*([A-Za-z_$][\w$]*)\s*\(/g),
    ].map((match) => match[1]);
    const declarations: string[] = [];
    const declared = new Set<string>();
    const nestedModels = new Map<string, string[]>();

    for (const match of modelMatches) {
        const root = match[1];
        const field = match[2];
        if (root && field) {
            nestedModels.set(root, [
                ...(nestedModels.get(root) ?? []),
                field,
            ]);
        }
    }

    for (const [name, fields] of nestedModels) {
        declared.add(name);
        declarations.push(
            `const ${name} = reactive({ ${fields.map((field) => `${field}: ""`).join(", ")} })`,
        );
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
            ? `{ ${fields.map((field) => `${field}: [{ required: true, message: "Обязательное поле" }]`).join(", ")} }`
            : "{}";
            declarations.push(
            `const rules: Record<string, FormRule[]> = ${rules}`,
            );
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
        declarations.push(
            name === "containerRef"
                ? `const ${name} = ref<HTMLElement | null>(null)`
                : `const ${name} = ref("")`,
        );
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
        imports.push('import type { FormRule } from "complex-ui";');
    }
    if (declarations.some((line) => line.includes("SelectOption"))) {
        imports.push('import type { SelectOption } from "complex-ui";');
    }
    return `${imports.join("\n")}\n\n${declarations.join("\n")}`;
}

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
    const tag = example.match(/<([A-Z][\w-]*)/)?.[1] ?? "Компонент";
    const normalized = example.toLowerCase();

    if (normalized.includes("disabled")) return "Отключенное состояние";
    if (normalized.includes(":icon") || normalized.includes("icon-right")) {
        return "Вариант с иконкой";
    }
    if (normalized.includes("clearable")) return "Очищаемое значение";
    if (normalized.includes("status=\"success\"")) {
        return "Успешное состояние";
    }
    if (normalized.includes("status=\"warning\"")) {
        return "Предупреждение";
    }
    if (normalized.includes("status=\"exception\"")) {
        return "Состояние ошибки";
    }
    if (normalized.includes("type=\"circle\"") || normalized.includes("type=\"dashboard\"")) {
        return "Круговой вариант";
    }
    if (normalized.includes("@")) return "Интерактивный вариант";
    if (normalized.includes("v-model")) return `${tag} со значением`;
    return `${tag} · вариант ${index + 1}`;
}

const sourceExamples = computed(() => {
    const usage = props.doc.usage ?? "";
    const usages = /^(?:import\s|message\.|messageBox\.|toast\.)/.test(
        usage.trim(),
    )
        ? [usage]
        : splitUsage(usage);

    return usages.map((example, index) => {
        if (/^(?:import\s|message\.|messageBox\.|toast\.)/.test(example.trim())) {
            const importLine = example.trim().startsWith("message.")
                ? 'import { message } from "complex-ui";\n\n'
                : example.trim().startsWith("messageBox.")
                  ? 'import { messageBox, toast } from "complex-ui";\n\n'
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
});

function initials(name: string): string {
    const parts = name.trim().split(/\s+/);
    return parts
        .map((p) => p[0] ?? "")
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

const palette = [
    "oklch(0.9 0.05 20)",
    "oklch(0.9 0.05 60)",
    "oklch(0.9 0.05 140)",
    "oklch(0.9 0.05 200)",
    "oklch(0.9 0.05 260)",
    "oklch(0.9 0.05 300)",
];
function colorFor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = (hash << 5) - hash + name.charCodeAt(i);
        hash |= 0;
    }
    return palette[Math.abs(hash) % palette.length];
}

const propRows = (list?: PropDoc[]) => list ?? [];
const eventRows = (list?: EventDoc[]) => list ?? [];
const methodRows = (list?: MethodDoc[]) => list ?? [];
const slotRows = (list?: SlotDoc[]) => list ?? [];

/**
 * Распознаёт строковые union-литералы вида `"top" | "bottom" | "left"`
 * и возвращает список значений для бейджа `enum [...]` с поповером.
 * Для обычных типов (string, boolean, …) — пустой массив.
 */
function enumValues(type?: string): string[] {
    if (!type) return [];
    const parts = type
        .split("|")
        .map((p) => p.trim())
        .filter(Boolean);
    if (parts.length < 2) return [];
    if (!parts.every((p) => /^["'][^"']+["']$/.test(p))) return [];
    return parts.map((p) => p.slice(1, -1));
}

/**
 * Текст для тултипа enum-бейджа: значения в кавычках через `|`,
 * например `"top" | "bottom" | "left" | "right"`.
 */
function enumTip(type?: string): string {
    return enumValues(type)
        .map((v) => `"${v}"`)
        .join(" | ");
}

function isFunctionType(type?: string): boolean {
    return Boolean(type && /=>/.test(type));
}

function functionTip(type?: string): string {
    return type?.trim() ?? "function";
}

function apiDescription(name: string, description?: string): string | undefined {
    if (locale.value !== "en") return description;
    return apiDescriptionsEn[props.doc.key]?.[name] ?? description;
}
</script>

<template>
    <div class="flex flex-col gap-6">
        <!-- Шапка: имя + тег + описание -->
        <div>
            <div class="flex items-center gap-2">
                <h2 class="text-lg font-semibold text-gray-900">
                    {{ doc.name }}
                </h2>
                <span
                    v-if="doc.tag"
                    class="bg-primary-50 text-primary-700 rounded px-1.5 py-0.5 font-mono text-[11px]"
                >
                    &lt;{{ doc.tag }}&gt;
                </span>
            </div>
            <p class="mt-1 text-sm text-gray-500">{{ localizedDescription }}</p>
        </div>

        <!-- Примеры (живой демо-код из страницы компонента) -->
        <section
            id="component-examples"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <div class="mb-2 flex items-center justify-between gap-3">
                <h3
                    class="text-xs font-semibold tracking-wide text-gray-400 uppercase"
                >
                    {{ t("docs.livePreview") }}
                </h3>
                <span class="text-[11px] text-gray-400">{{ t("docs.component") }}</span>
            </div>
            <div v-if="structuredExamples" class="mt-3">
                <slot name="examples" />
            </div>
            <div v-else-if="sourceExamples.length" class="mt-3">
                <h4 class="mb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-800">
                    {{ t("docs.mainExample") }}
                </h4>
                <section class="overflow-hidden rounded-md border border-gray-200 dark:border-gray-300">
                    <div class="bg-white px-4 py-4 dark:bg-gray-50">
                        <slot name="examples" />
                    </div>
                    <details class="border-t border-gray-200 bg-gray-50 dark:border-gray-300 dark:bg-gray-100">
                        <summary class="cursor-pointer px-4 py-2 text-[11px] font-semibold tracking-wide text-gray-500 uppercase transition-colors hover:bg-gray-100 dark:text-gray-700 dark:hover:bg-gray-200">
                            {{ t("docs.showCode") }}
                        </summary>
                        <pre class="overflow-x-auto border-t border-gray-200 px-4 py-4 text-xs leading-6 text-gray-700 dark:border-gray-300 dark:text-gray-800"><code>{{ sourceExamples.map((example) => example.source).join("\n\n") }}</code></pre>
                    </details>
                </section>
            </div>
        </section>

        <!-- API -->
        <div v-if="doc.props || doc.events || doc.methods || doc.slots">
            <section id="component-api" class="api-docs overflow-hidden rounded-lg border border-gray-100 bg-white">
                <div class="border-b border-gray-100 px-5 py-4">
                    <div class="flex items-center justify-between gap-3">
                        <div>
                            <h3 class="text-sm font-semibold text-gray-900">
                                {{ t("docs.api") }}
                            </h3>
                            <p class="mt-0.5 text-xs text-gray-500">
                                {{ t("docs.apiDescription") }}
                            </p>
                        </div>
                        <span class="rounded-full border border-primary-100 bg-primary-50 px-2 py-1 text-[10px] font-semibold tracking-wide text-primary-700 uppercase">
                            API
                        </span>
                    </div>
                </div>
                <div class="space-y-6 p-5">

                <!-- Props -->
                <template v-if="propRows(doc.props).length">
                    <h4 class="mb-2 text-sm font-medium text-gray-700">
                                {{ t("docs.props") }}
                    </h4>
                    <table class="w-full table-fixed text-sm">
                        <colgroup>
                            <col style="width: 20%" />
                            <col style="width: 30%" />
                            <col style="width: 15%" />
                            <col style="width: 35%" />
                        </colgroup>
                        <thead>
                            <tr
                                class="border-b border-gray-100 text-left text-gray-500"
                            >
                                <th class="w-[18%] px-3 py-1.5 font-medium">
                                    {{ t("docs.name") }}
                                </th>
                                <th class="w-[30%] px-3 py-1.5 font-medium">
                                    {{ t("docs.type") }}
                                </th>
                                <th class="px-3 py-1.5 font-medium">
                                    {{ t("docs.default") }}
                                </th>
                                <th class="px-3 py-1.5 font-medium">
                                    {{ t("docs.description") }}
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr
                                v-for="row in propRows(doc.props)"
                                :key="row.name"
                                class="align-top"
                            >
                                <td class="px-3 py-2 font-mono text-xs">
                                    {{ row.name
                                    }}<span
                                        v-if="row.required"
                                        class="text-red-500"
                                        >*</span
                                    >
                                </td>
                                <td
                                    class="px-3 py-2 font-mono text-xs text-gray-500"
                                >
                                    <Tooltip
                                        v-if="enumValues(row.type).length"
                                        :content="enumTip(row.type)"
                                    >
                                        <code
                                            class="cursor-help rounded border border-indigo-200 bg-indigo-50 px-1.5 py-0.5 text-[11px] font-semibold text-indigo-700 dark:border-indigo-400 dark:bg-indigo-900 dark:text-white"
                                            >enum</code
                                        >
                                    </Tooltip>
                                    <template v-else>{{ row.type }}</template>
                                </td>
                                <td
                                    class="px-3 py-2 font-mono text-xs text-gray-400"
                                >
                                    {{ row.default }}
                                </td>
                                <td class="px-3 py-2 text-gray-600">
                                    {{ apiDescription(row.name, row.description) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </template>
                <!-- Events -->
                <template v-if="eventRows(doc.events).length">
                        <h4 class="mt-5 mb-2 text-sm font-medium text-gray-700">
                        {{ t("docs.events") }}
                    </h4>
                    <table class="w-full table-fixed text-sm">
                        <colgroup>
                            <col style="width: 20%" />
                            <col style="width: 45%" />
                            <col style="width: 35%" />
                        </colgroup>
                        <thead>
                            <tr
                                class="border-b border-gray-100 text-left text-gray-500"
                            >
                                <th class="px-3 py-1.5 font-medium">{{ t("docs.event") }}</th>
                                <th class="px-3 py-1.5 font-medium">
                                    {{ t("docs.params") }}
                                </th>
                                <th class="px-3 py-1.5 font-medium">
                                    {{ t("docs.description") }}
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr
                                v-for="row in eventRows(doc.events)"
                                :key="row.name"
                                class="align-top"
                            >
                                <td class="px-3 py-2 font-mono text-xs">
                                    @{{ row.name }}
                                </td>
                                <td
                                    class="px-3 py-2 font-mono text-xs text-gray-500"
                                >
                                    <Tooltip
                                        v-if="isFunctionType(row.params)"
                                        :content="functionTip(row.params)"
                                    >
                                        <code class="cursor-help rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:border-emerald-400 dark:bg-emerald-900 dark:text-emerald-100">
                                            function
                                        </code>
                                    </Tooltip>
                                    <template v-else-if="enumValues(row.params).length">
                                        <Tooltip :content="enumTip(row.params)">
                                            <span
                                                class="cursor-help border-b border-dashed border-gray-400"
                                                >enum [{{
                                                    enumValues(row.params).join(
                                                        ", ",
                                                    )
                                                }}]</span
                                            >
                                        </Tooltip>
                                    </template>
                                    <template v-else>{{ row.params }}</template>
                                </td>
                                <td class="px-3 py-2 text-gray-600">
                                    {{ apiDescription(row.name, row.description) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </template>

                <!-- Methods -->
                <template v-if="methodRows(doc.methods).length">
                        <h4 class="mt-5 mb-2 text-sm font-medium text-gray-700">
                        {{ t("docs.methods") }}
                    </h4>
                    <table class="w-full table-fixed text-sm">
                        <colgroup>
                            <col style="width: 20%" />
                            <col style="width: 45%" />
                            <col style="width: 35%" />
                        </colgroup>
                        <thead>
                            <tr
                                class="border-b border-gray-100 text-left text-gray-500"
                            >
                                <th class="px-3 py-1.5 font-medium">{{ t("docs.method") }}</th>
                                <th class="px-3 py-1.5 font-medium">
                                    {{ t("docs.signature") }}
                                </th>
                                <th class="px-3 py-1.5 font-medium">
                                    {{ t("docs.description") }}
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr
                                v-for="row in methodRows(doc.methods)"
                                :key="row.name"
                                class="align-top"
                            >
                                <td class="px-3 py-2 font-mono text-xs">
                                    {{ row.name }}
                                </td>
                                <td
                                    class="px-3 py-2 font-mono text-xs text-gray-500"
                                >
                                    <Tooltip
                                        v-if="isFunctionType(row.params)"
                                        :content="functionTip(row.params)"
                                    >
                                        <code class="cursor-help rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:border-emerald-400 dark:bg-emerald-900 dark:text-emerald-100">
                                            function
                                        </code>
                                    </Tooltip>
                                    <template v-else-if="enumValues(row.params).length">
                                        <Tooltip :content="enumTip(row.params)">
                                            <span
                                                class="cursor-help border-b border-dashed border-gray-400"
                                                >enum [{{
                                                    enumValues(row.params).join(
                                                        ", ",
                                                    )
                                                }}]</span
                                            >
                                        </Tooltip>
                                    </template>
                                    <template v-else>{{ row.params }}</template>
                                </td>
                                <td class="px-3 py-2 text-gray-600">
                                    {{ apiDescription(row.name, row.description) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </template>

                <!-- Slots -->
                <template v-if="slotRows(doc.slots).length">
                        <h4 class="mt-5 mb-2 text-sm font-medium text-gray-700">
                        {{ t("docs.slots") }}
                    </h4>
                    <table class="w-full table-fixed text-sm">
                        <colgroup>
                            <col style="width: 20%" />
                            <col style="width: 45%" />
                            <col style="width: 35%" />
                        </colgroup>
                        <thead>
                            <tr
                                class="border-b border-gray-100 text-left text-gray-500"
                            >
                                <th class="px-3 py-1.5 font-medium">{{ t("docs.slot") }}</th>
                                <th class="px-3 py-1.5 font-medium">
                                    {{ t("docs.params") }}
                                </th>
                                <th class="px-3 py-1.5 font-medium">
                                    {{ t("docs.description") }}
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr
                                v-for="row in slotRows(doc.slots)"
                                :key="row.name"
                                class="align-top"
                            >
                                <td class="px-3 py-2 font-mono text-xs">
                                    <template v-if="row.name === 'default'"
                                        >(default)</template
                                    ><template v-else>#{{ row.name }}</template>
                                </td>
                                <td
                                    class="px-3 py-2 font-mono text-xs text-gray-500"
                                >
                                    <Tooltip
                                        v-if="isFunctionType(row.params)"
                                        :content="functionTip(row.params)"
                                    >
                                        <code class="cursor-help rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:border-emerald-400 dark:bg-emerald-900 dark:text-emerald-100">
                                            function
                                        </code>
                                    </Tooltip>
                                    <template v-else-if="enumValues(row.params).length">
                                        <Tooltip :content="enumTip(row.params)">
                                            <span
                                                class="cursor-help border-b border-dashed border-gray-400"
                                                >enum [{{
                                                    enumValues(row.params).join(
                                                        ", ",
                                                    )
                                                }}]</span
                                            >
                                        </Tooltip>
                                    </template>
                                    <template v-else>{{ row.params }}</template>
                                </td>
                                <td class="px-3 py-2 text-gray-600">
                                    {{ apiDescription(row.name, row.description) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </template>
                </div>
            </section>

            <!-- Contributors -->
            <section
                id="component-contributors"
                class="mt-5 scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
            >
                <h3
                    class="mb-4 text-xs font-semibold tracking-wide text-gray-400 uppercase"
                >
                    {{ t("docs.contributors") }}
                </h3>
                <ul class="flex flex-col gap-2">
                    <li
                        v-for="c in doc.contributors"
                        :key="c.github ?? c.name"
                        class="flex items-center gap-3"
                    >
                        <span
                            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium"
                            :style="{
                                backgroundColor: colorFor(c.github ?? c.name),
                            }"
                        >
                            {{ initials(c.name) }}
                        </span>
                        <div>
                            <a
                                v-if="c.github"
                                :href="'https://github.com/' + c.github"
                                target="_blank"
                                rel="noopener"
                                class="hover:text-primary-700 text-sm font-medium text-gray-800"
                            >
                                {{ c.name }}
                                <span class="text-gray-400"
                                    >@{{ c.github }}</span
                                >
                            </a>
                            <p v-else class="text-sm font-medium text-gray-800">
                                {{ c.name }}
                            </p>
                            <p v-if="c.role" class="text-xs text-gray-400">
                                {{ c.role }}
                            </p>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<style scoped>
.api-docs > div:last-child {
    overflow-x: auto;
}

.api-docs h4 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 0 0.5rem;
    color: var(--color-gray-700);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.api-docs table {
    min-width: 640px;
    overflow: hidden;
    border: 1px solid var(--color-gray-200);
    border-radius: 0.5rem;
    border-spacing: 0;
    border-collapse: separate;
}

.api-docs thead {
    background: var(--color-gray-50);
}

.api-docs th {
    height: 2.25rem;
    color: var(--color-gray-500);
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    white-space: nowrap;
}

.api-docs tbody tr:nth-child(even) {
    background: color-mix(in oklab, var(--color-gray-50) 42%, transparent);
}

.api-docs tbody td {
    border-top: 1px solid var(--color-gray-100);
    line-height: 1.45;
}

.api-docs tbody tr:first-child td {
    border-top: 0;
}

.api-docs tbody td:first-child {
    color: var(--color-gray-800);
    font-weight: 600;
}

.api-docs tbody tr {
    transition: background-color 0.15s ease;
}

.api-docs tbody tr:hover {
    background: var(--color-gray-50);
}
</style>
