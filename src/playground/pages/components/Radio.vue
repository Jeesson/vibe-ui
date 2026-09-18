<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Radio from "../../../components/Radio/Radio.vue";
const doc = docs.radio;
const on = ref(false);
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="flex max-w-sm flex-col gap-3">
                <Radio v-model="on">Standalone-кнопка</Radio>
                <Radio v-model="on" disabled>Отключено</Radio>
                <p class="text-xs text-gray-400">Внутри RadioGroup см. страницу «RadioGroup».</p>
            </div>
        </template>
    </ComponentDoc>
</template>
