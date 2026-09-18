<script setup lang="ts">
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Backtop from "../../../components/Backtop/Backtop.vue";
const doc = docs.backtop;
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="rounded-md border border-gray-100 p-4">
                <p class="text-sm text-gray-600">
                    Прокрути страницу вниз — в правом нижнем углу появится кнопка «наверх» (порог — 200px). У этого экземпляра порог поднят
                    до 300px, чтобы не мешать демо.
                </p>
            </div>
            <Backtop :visibility-height="300" />
        </template>
    </ComponentDoc>
</template>
