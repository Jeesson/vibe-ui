<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import RadioGroup from "../../../components/Radio/RadioGroup.vue";
import Radio from "../../../components/Radio/Radio.vue";
const doc = docs.radioGroup;
const value = ref<string | number | null>("a");
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <p class="mb-2 text-xs text-gray-400">Выбрано: {{ value }}</p>
            <RadioGroup v-model="value">
                <Radio value="a">Вариант A</Radio>
                <Radio value="b">Вариант B</Radio>
                <Radio value="c" disabled>Вариант C (недоступен)</Radio>
            </RadioGroup>
        </template>
    </ComponentDoc>
</template>
