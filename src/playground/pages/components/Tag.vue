<script setup lang="ts">
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Tag from "../../../components/Tag/Tag.vue";
const doc = docs.tag;
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="flex flex-wrap items-center gap-3">
                <Tag type="primary">Primary</Tag>
                <Tag type="success">Success</Tag>
                <Tag type="warning">Warning</Tag>
                <Tag type="danger">Danger</Tag>
                <Tag type="info">Info</Tag>
                <Tag type="danger" closable>Закрываемый</Tag>
            </div>
        </template>
    </ComponentDoc>
</template>
