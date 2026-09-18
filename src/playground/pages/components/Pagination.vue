<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Pagination from "../../../components/Pagination/Pagination.vue";
const doc = docs.pagination;
const page = ref(3);
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <p class="mb-2 text-xs text-gray-400">Страница: {{ page }}</p>
            <Pagination v-model="page" :total="120" :page-size="10" />
            <div class="mt-4">
                <Pagination v-model="page" :total="1000" :page-size="10" :sibling-count="2" />
            </div>
        </template>
    </ComponentDoc>
</template>
