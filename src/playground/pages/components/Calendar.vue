<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import DocExample from "../../docs/DocExample.vue";
import { components as docs } from "../../docs/component-docs";
import Calendar from "../../../components/Calendar/Calendar.vue";
const doc = docs.calendar;
const date = ref(new Date());
const source = '<Calendar v-model="date" class="max-w-sm" />';
</script>

<template>
    <ComponentDoc :doc="doc" structured-examples>
        <template #examples>
            <DocExample title="Календарь" :source="source"><Calendar v-model="date" class="max-w-sm" /></DocExample>
        </template>
    </ComponentDoc>
</template>
