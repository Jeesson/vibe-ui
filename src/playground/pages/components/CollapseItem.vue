<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Collapse from "../../../components/Collapse/Collapse.vue";
import CollapseItem from "../../../components/Collapse/CollapseItem.vue";
const doc = docs.collapseItem;
const active = ref<string[]>(["a"]);
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <p class="mb-2 text-xs text-gray-400">Секция используется внутри <code>&lt;Collapse&gt;</code>:</p>
            <Collapse v-model="active" class="max-w-sm">
                <CollapseItem name="a" title="Заголовок A"> Содержимое секции A. </CollapseItem>
                <CollapseItem name="b" title="Заголовок B"> Содержимое секции B. </CollapseItem>
            </Collapse>
        </template>
    </ComponentDoc>
</template>
