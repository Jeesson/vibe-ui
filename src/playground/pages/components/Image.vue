<script setup lang="ts">
import ComponentDoc from "../../docs/ComponentDoc.vue";
import DocExample from "../../docs/DocExample.vue";
import { components as docs } from "../../docs/component-docs";
import Image from "../../../components/Image/Image.vue";
const doc = docs.image;
const source = '<Image src="https://picsum.photos/seed/vibe-ui/320/180" class="h-48 w-64 rounded-md" previewable />';
</script>

<template>
    <ComponentDoc :doc="doc" structured-examples>
        <template #examples>
            <DocExample title="Изображение с предпросмотром" :source="source"><Image src="https://picsum.photos/seed/vibe-ui/320/180" class="h-48 w-64 rounded-md" previewable /></DocExample>
        </template>
    </ComponentDoc>
</template>
