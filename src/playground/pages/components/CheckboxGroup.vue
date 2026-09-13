<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import CheckboxGroup from "../../../components/Checkbox/CheckboxGroup.vue";
import Checkbox from "../../../components/Checkbox/Checkbox.vue";
const doc = docs.checkboxGroup;
const selected = ref<string[]>(["vue"]);
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <p class="mb-2 text-xs text-gray-400">
                Выбрано: {{ selected.join(", ") || "—" }}
            </p>
            <CheckboxGroup v-model="selected">
                <Checkbox value="vue">Vue</Checkbox>
                <Checkbox value="react">React</Checkbox>
                <Checkbox value="svelte">Svelte</Checkbox>
            </CheckboxGroup>
        </template>
    </ComponentDoc>
</template>
