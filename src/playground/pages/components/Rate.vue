<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Rate from "../../../components/Rate/Rate.vue";
const doc = docs.rate;
const value = ref(3);
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="flex max-w-sm flex-col gap-3">
                <Rate v-model="value" />
                <Rate v-model="value" :count="10" />
                <Rate v-model="value" disabled />
            </div>
        </template>
    </ComponentDoc>
</template>
