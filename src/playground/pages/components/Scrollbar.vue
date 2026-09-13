<script setup lang="ts">
import ComponentDoc from "../../docs/ComponentDoc.vue";
import DocExample from "../../docs/DocExample.vue";
import { components as docs } from "../../docs/component-docs";
import Scrollbar from "../../../components/Scrollbar/Scrollbar.vue";
const doc = docs.scrollbar;
const source = '<Scrollbar max-height="120px" class="max-w-sm">...</Scrollbar>';
</script>

<template>
    <ComponentDoc :doc="doc" structured-examples>
        <template #examples>
            <DocExample title="Прокручиваемый список" :source="source">
                <Scrollbar max-height="120px" class="max-w-sm">
                    <p v-for="i in 12" :key="i" class="border-b border-gray-50 px-3 py-1.5 text-sm text-gray-600">Строка списка №{{ i }}</p>
                </Scrollbar>
            </DocExample>
        </template>
    </ComponentDoc>
</template>
