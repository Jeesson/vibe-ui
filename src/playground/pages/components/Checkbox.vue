<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Checkbox from "../../../components/Checkbox/Checkbox.vue";
const doc = docs.checkbox;
const agree = ref(false);
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="flex max-w-sm flex-col gap-3">
                <Checkbox v-model="agree">Согласен с условиями</Checkbox>
                <Checkbox v-model="agree" disabled>Отключено</Checkbox>
            </div>
        </template>
    </ComponentDoc>
</template>
