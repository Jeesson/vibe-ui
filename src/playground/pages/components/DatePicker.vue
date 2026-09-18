<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import DatePicker from "../../../components/DatePicker/DatePicker.vue";
const doc = docs.datePicker;
const date = ref<string | null>(null);
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <p class="mb-2 text-xs text-gray-400">Выбрано: {{ date || "—" }}</p>
            <DatePicker v-model="date" placeholder="Выберите дату" class="max-w-sm" />
        </template>
    </ComponentDoc>
</template>
