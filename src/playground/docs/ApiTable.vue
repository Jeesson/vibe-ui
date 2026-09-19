<script setup lang="ts">
import { computed } from "vue";
import ApiValueCell from "./ApiValueCell.vue";
import { apiDescriptionsEn } from "./component-docs";
import { useLocale } from "../composables/ui-locale";
import type { PropDoc, EventDoc, MethodDoc, SlotDoc } from "./component-docs";

type Row = PropDoc | EventDoc | MethodDoc | SlotDoc;

const props = defineProps<{
    variant: "props" | "events" | "methods" | "slots";
    rows: Row[];
    /** Component key in apiDescriptionsEn — for English API descriptions. */
    docKey: string;
}>();

const { locale, t } = useLocale();

// Table shape varies by variant only in column count / labels; the row renderer
// (enum/function badges, required "*", default column) is shared by all four.
const config = computed(() => {
    switch (props.variant) {
        case "props":
            return {
                nameLabel: t.value("docs.name"),
                valueLabel: t.value("docs.type"),
                valueKey: "type" as const,
                hasDefault: true,
                namePrefix: "",
            };
        case "events":
            return {
                nameLabel: t.value("docs.event"),
                valueLabel: t.value("docs.params"),
                valueKey: "params" as const,
                hasDefault: false,
                namePrefix: "@",
            };
        case "methods":
            return {
                nameLabel: t.value("docs.method"),
                valueLabel: t.value("docs.signature"),
                valueKey: "params" as const,
                hasDefault: false,
                namePrefix: "",
            };
        case "slots":
            return {
                nameLabel: t.value("docs.slot"),
                valueLabel: t.value("docs.params"),
                valueKey: "params" as const,
                hasDefault: false,
                namePrefix: "#",
            };
    }
});

function apiDescription(name: string, description?: string): string | undefined {
    if (locale.value !== "en") return description;
    return apiDescriptionsEn[props.docKey]?.[name] ?? description;
}

// Unified accessor: both `type` (props) and `params` (events/methods/slots) live on Row.
const rowValue = (row: Row) => (row as { type?: string; params?: string })[config.value.valueKey] as string | undefined;
</script>

<template>
    <table class="w-full table-fixed text-sm">
        <colgroup>
            <col style="width: 20%" />
            <col :style="{ width: config.hasDefault ? '30%' : '45%' }" />
            <col v-if="config.hasDefault" style="width: 15%" />
            <col :style="{ width: config.hasDefault ? '35%' : '45%' }" />
        </colgroup>
        <thead>
            <tr class="border-b border-gray-100 text-left text-gray-500">
                <th class="px-3 py-1.5 font-medium">{{ config.nameLabel }}</th>
                <th class="px-3 py-1.5 font-medium">{{ config.valueLabel }}</th>
                <th v-if="config.hasDefault" class="px-3 py-1.5 font-medium">{{ t("docs.default") }}</th>
                <th class="px-3 py-1.5 font-medium">{{ t("docs.description") }}</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
            <tr v-for="row in rows" :key="row.name" class="align-top">
                <td class="px-3 py-2 font-mono text-xs">
                    <template v-if="variant === 'slots' && row.name === 'default'">(default)</template>
                    <template v-else>
                        {{ config.namePrefix }}{{ row.name }}
                        <span v-if="variant === 'props' && (row as PropDoc).required" class="text-red-500">*</span>
                    </template>
                </td>
                <td class="px-3 py-2 font-mono text-xs text-gray-500">
                    <ApiValueCell :value="rowValue(row)" :mode="variant === 'props' ? 'type' : 'params'" />
                </td>
                <td v-if="config.hasDefault" class="px-3 py-2 font-mono text-xs text-gray-400">
                    {{ (row as PropDoc).default }}
                </td>
                <td class="px-3 py-2 text-gray-600">
                    {{ apiDescription(row.name, row.description) }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
table {
    min-width: 640px;
    overflow: hidden;
    border: 1px solid var(--color-gray-200);
    border-radius: 0.5rem;
    border-spacing: 0;
    border-collapse: separate;
}

thead {
    background: var(--color-gray-50);
}

th {
    height: 2.25rem;
    color: var(--color-gray-500);
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    white-space: nowrap;
}

tbody tr:nth-child(even) {
    background: color-mix(in oklab, var(--color-gray-50) 42%, transparent);
}

tbody td {
    border-top: 1px solid var(--color-gray-100);
    line-height: 1.45;
}

tbody tr:first-child td {
    border-top: 0;
}

tbody td:first-child {
    color: var(--color-gray-800);
    font-weight: 600;
}

tbody tr {
    transition: background-color 0.15s ease;
}

tbody tr:hover {
    background: var(--color-gray-50);
}
</style>
