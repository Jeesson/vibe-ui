<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Cascader from "../../../components/Cascader/Cascader.vue";
const doc = docs.cascader;
const value = ref<string[]>([]);
const options = [
    {
        label: "Франция",
        value: "fr",
        children: [
            {
                label: "Иль-де-Франс",
                value: "ile-de-france",
                children: [{ label: "Париж", value: "paris" }],
            },
            {
                label: "Овернь — Рона — Альпы",
                value: "auvergne-rhone-alpes",
                children: [{ label: "Лион", value: "lyon" }],
            },
        ],
    },
    {
        label: "Германия",
        value: "de",
        children: [
            {
                label: "Берлин",
                value: "berlin-region",
                children: [{ label: "Берлин", value: "berlin" }],
            },
            {
                label: "Бавария",
                value: "bavaria",
                children: [{ label: "Мюнхен", value: "munich" }],
            },
        ],
    },
    {
        label: "Италия",
        value: "it",
        children: [
            {
                label: "Лацио",
                value: "lazio",
                children: [{ label: "Рим", value: "rome" }],
            },
            {
                label: "Ломбардия",
                value: "lombardy",
                children: [{ label: "Милан", value: "milan" }],
            },
        ],
    },
    {
        label: "Испания",
        value: "es",
        children: [
            {
                label: "Мадрид",
                value: "madrid-region",
                children: [{ label: "Мадрид", value: "madrid" }],
            },
            {
                label: "Каталония",
                value: "catalonia",
                children: [{ label: "Барселона", value: "barcelona" }],
            },
        ],
    },
    {
        label: "Польша",
        value: "pl",
        children: [
            {
                label: "Мазовецкое воеводство",
                value: "masovia",
                children: [{ label: "Варшава", value: "warsaw" }],
            },
            {
                label: "Малопольское воеводство",
                value: "lesser-poland",
                children: [{ label: "Краков", value: "krakow" }],
            },
        ],
    },
    {
        label: "Чехия",
        value: "cz",
        children: [
            {
                label: "Прага",
                value: "prague-region",
                children: [{ label: "Прага", value: "prague" }],
            },
        ],
    },
];
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <Cascader
                v-model="value"
                :options="options"
                placeholder="Область / город"
                class="max-w-sm"
            />
        </template>
    </ComponentDoc>
</template>
