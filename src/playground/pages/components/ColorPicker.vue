<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import DocExample from "../../docs/DocExample.vue";
import { components as docs } from "../../docs/component-docs";
import ColorPicker from "../../../components/ColorPicker/ColorPicker.vue";
const doc = docs.colorPicker;
const color = ref("#185FA5");
const source = '<ColorPicker v-model="color" />';
</script>

<template>
    <ComponentDoc :doc="doc" structured-examples>
        <template #examples>
            <DocExample title="Выбор цвета" :source="source">
                <ColorPicker v-model="color" />
            </DocExample>
        </template>
    </ComponentDoc>
</template>
