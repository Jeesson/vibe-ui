<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import InputTag from "../../../components/InputTag/InputTag.vue";
const doc = docs.inputTag;
const tags = ref<string[]>(["vue", "typescript"]);
const limited = ref<string[]>(["a", "b"]);
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <p class="mb-2 text-xs text-gray-400">
                Enter / запятая — добавить, Backspace на пустом поле — удалить.
            </p>
            <InputTag
                v-model="tags"
                placeholder="Введи текст и Enter / запятую"
                class="max-w-sm"
            />
            <p class="mt-4 mb-2 text-xs text-gray-400">
                С лимитом (максимум 3):
            </p>
            <InputTag
                v-model="limited"
                :max="3"
                placeholder="Максимум 3 тега"
                class="max-w-sm"
            />
        </template>
    </ComponentDoc>
</template>
