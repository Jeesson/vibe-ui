<script setup lang="ts">
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Tooltip from "../../../components/Tooltip/Tooltip.vue";
const doc = docs.tooltip;
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="flex flex-wrap items-center gap-8">
                <Tooltip content="Подсказка сверху">
                    <span class="cursor-help text-sm underline decoration-dotted">сверху</span>
                </Tooltip>
                <Tooltip content="Подсказка снизу" placement="bottom">
                    <span class="cursor-help text-sm underline decoration-dotted">снизу</span>
                </Tooltip>
                <Tooltip content="Подсказка слева" placement="left">
                    <span class="cursor-help text-sm underline decoration-dotted">слева</span>
                </Tooltip>
                <Tooltip content="Подсказка справа" placement="right">
                    <span class="cursor-help text-sm underline decoration-dotted">справа</span>
                </Tooltip>
            </div>
        </template>
    </ComponentDoc>
</template>
