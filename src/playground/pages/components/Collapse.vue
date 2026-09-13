<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Collapse from "../../../components/Collapse/Collapse.vue";
import CollapseItem from "../../../components/Collapse/CollapseItem.vue";
const doc = docs.collapse;
const active = ref<string[]>(["a"]);
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <Collapse v-model="active" class="max-w-sm">
                <CollapseItem name="a" title="Раздел A"
                    >Плавная CSS-анимация высоты.</CollapseItem
                >
                <CollapseItem name="b" title="Раздел B"
                    >Содержимое B.</CollapseItem
                >
                <CollapseItem name="c" title="Раздел C"
                    >Содержимое C.</CollapseItem
                >
            </Collapse>
        </template>
    </ComponentDoc>
</template>
