<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Slider from "../../../components/Slider/Slider.vue";
const doc = docs.slider;
const value = ref(40);
const range = ref(25);
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="flex max-w-sm flex-col gap-3">
                <Slider v-model="value" />
                <Slider v-model="range" :min="0" :max="50" :step="5" />
                <Slider v-model="value" disabled />
            </div>
        </template>
    </ComponentDoc>
</template>
