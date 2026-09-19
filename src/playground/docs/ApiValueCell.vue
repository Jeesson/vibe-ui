<script setup lang="ts">
import Tooltip from "../../components/Tooltip/Tooltip.vue";
import { enumValues, enumTip, isFunctionType, functionTip } from "./api-type-badges";

const props = defineProps<{
    value?: string;
    /**
     * "params" — Events/Methods/Slots: renders a `function` badge if applicable.
     * "type"  — Props: renders an inline `enum [a, b]` badge (with a tooltip
     *           listing the values) or plain text.
     */
    mode: "params" | "type";
}>();
</script>

<template>
    <Tooltip v-if="mode === 'params' && isFunctionType(value)" :content="functionTip(value)">
        <code
            class="cursor-help rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:border-emerald-400 dark:bg-emerald-900 dark:text-emerald-100">
            function
        </code>
    </Tooltip>
    <Tooltip v-else-if="enumValues(value).length && mode === 'type'" :content="enumTip(value)">
        <code
            class="cursor-help rounded border border-indigo-200 bg-indigo-50 px-1.5 py-0.5 text-[11px] font-semibold text-indigo-700 dark:border-indigo-400 dark:bg-indigo-900 dark:text-white"
            >enum</code
        >
    </Tooltip>
    <Tooltip v-else-if="enumValues(value).length" :content="enumTip(value)">
        <span class="cursor-help border-b border-dashed border-gray-400">enum [{{ enumValues(value).join(", ") }}]</span>
    </Tooltip>
    <template v-else>{{ value }}</template>
</template>
