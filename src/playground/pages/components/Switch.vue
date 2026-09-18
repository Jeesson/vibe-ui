<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Switch from "../../../components/Switch/Switch.vue";
const doc = docs.switch;
const on = ref(true);
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="flex items-center gap-3">
                <Switch v-model="on" />
                <span class="text-sm text-gray-600">{{ on ? "Включено" : "Выключено" }}</span>
            </div>
            <div class="mt-3 flex items-center gap-3">
                <Switch :model-value="true" disabled />
                <span class="text-sm text-gray-400">Отключено</span>
            </div>
        </template>
    </ComponentDoc>
</template>
