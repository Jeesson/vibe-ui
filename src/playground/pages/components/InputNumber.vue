<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import InputNumber from "../../../components/InputNumber/InputNumber.vue";
const doc = docs.inputNumber;
const value = ref(3);
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="flex max-w-sm flex-col gap-3">
                <InputNumber v-model="value" />
                <InputNumber v-model="value" :min="0" :max="10" :step="2" />
                <InputNumber v-model="value" disabled />
            </div>
        </template>
    </ComponentDoc>
</template>
