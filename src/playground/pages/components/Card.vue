<script setup lang="ts">
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Card from "../../../components/Card/Card.vue";
const doc = docs.card;
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="grid grid-cols-2 gap-3">
                <Card title="Bordered" type="bordered">С рамкой.</Card>
                <Card title="Elevated" type="elevated">С тенью.</Card>
                <Card title="Flat" type="flat">Без рамки и тени.</Card>
                <Card title="Filled" type="filled">Залитый фон.</Card>
            </div>
            <Card class="mt-3">
                <template #header>
                    <span class="text-sm font-semibold">Кастомная шапка</span>
                </template>
                Контент карточки.
                <template #footer>
                    <span class="text-xs text-gray-500">Подвал</span>
                </template>
            </Card>
        </template>
    </ComponentDoc>
</template>
