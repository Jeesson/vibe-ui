<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Loading from "../../../components/Loading/Loading.vue";
import Button from "../../../components/Button/Button.vue";
const doc = docs.loading;
const loading = ref(false);
function run() {
    loading.value = true;
    setTimeout(() => (loading.value = false), 1500);
}
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="max-w-sm">
                <Loading :loading="loading" text="Загрузка…">
                    <div class="rounded-md border border-gray-100 p-6 text-center text-sm text-gray-500">Область с контентом</div>
                </Loading>
                <Button size="sm" class="mt-2" @click="run">Показать загрузку (1.5с)</Button>
            </div>
        </template>
    </ComponentDoc>
</template>
