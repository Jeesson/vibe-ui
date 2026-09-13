<script setup lang="ts">
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Empty from "../../../components/Empty/Empty.vue";
import Button from "../../../components/Button/Button.vue";
const doc = docs.empty;
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="max-w-sm">
                <Empty description="Список пуст">
                    <Button size="sm" variant="secondary">Добавить</Button>
                </Empty>
            </div>
        </template>
    </ComponentDoc>
</template>
