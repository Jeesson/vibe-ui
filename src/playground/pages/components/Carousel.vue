<script setup lang="ts">
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Carousel from "../../../components/Carousel/Carousel.vue";
const doc = docs.carousel;
const slides = [
    "bg-primary-50 text-primary-700",
    "bg-green-50 text-green-700",
    "bg-amber-50 text-amber-700",
    "bg-violet-50 text-violet-700",
];
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <Carousel class="h-40 max-w-sm" autoplay :interval="2500">
                <div v-for="(cls, i) in slides" :key="i" :class="['flex h-40 items-center justify-center text-lg font-medium', cls]">
                    Слайд {{ i + 1 }}
                </div>
            </Carousel>
        </template>
    </ComponentDoc>
</template>
