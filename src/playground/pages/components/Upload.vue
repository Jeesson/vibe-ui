<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import DocExample from "../../docs/DocExample.vue";
import { components as docs } from "../../docs/component-docs";
import Upload from "../../../components/Upload/Upload.vue";
const doc = docs.upload;
const files = ref<File[]>([]);
const source = '<Upload v-model="files" class="max-w-sm" />';
</script>

<template>
    <ComponentDoc :doc="doc" structured-examples>
        <template #examples>
            <DocExample title="Загрузка файлов" :source="source"><Upload v-model="files" class="max-w-sm" /></DocExample>
        </template>
    </ComponentDoc>
</template>
