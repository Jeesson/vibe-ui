<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Menu from "../../../components/Menu/Menu.vue";
const doc = docs.menu;
const active = ref("overview");
const items = [
    { key: "overview", label: "Обзор" },
    {
        key: "components",
        label: "Компоненты",
        children: [
            { key: "form-components", label: "Форма" },
            { key: "data-components", label: "Данные" },
        ],
    },
    { key: "settings", label: "Настройки" },
];
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="max-w-xs rounded-md bg-gray-50 p-2">
                <Menu :items="items" v-model="active" />
            </div>
        </template>
    </ComponentDoc>
</template>
