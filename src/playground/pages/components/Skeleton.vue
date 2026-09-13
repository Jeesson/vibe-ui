<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Skeleton from "../../../components/Skeleton/Skeleton.vue";
import Switch from "../../../components/Switch/Switch.vue";
const doc = docs.skeleton;
const loading = ref(true);
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <Switch v-model="loading" />
            <Skeleton :loading="loading" :rows="3" avatar class="mt-3 max-w-sm">
                <p class="text-sm text-gray-700">
                    Контент, когда загрузка завершена.
                </p>
            </Skeleton>
        </template>
    </ComponentDoc>
</template>
