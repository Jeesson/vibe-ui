<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import TimeSelect from "../../../components/TimeSelect/TimeSelect.vue";
const doc = docs.timeSelect;
const time = ref<string | null>(null);
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <p class="mb-2 text-xs text-gray-400">Выбрано: {{ time || "—" }}</p>
            <TimeSelect
                v-model="time"
                start="09:00"
                end="18:00"
                :step="30"
                class="max-w-sm"
            />
        </template>
    </ComponentDoc>
</template>
