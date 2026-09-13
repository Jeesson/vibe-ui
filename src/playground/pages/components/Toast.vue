<script setup lang="ts">
import { toast } from "vue-sonner";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Button from "../../../components/Button/Button.vue";
const doc = docs.toast;
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="flex gap-2">
                <Button size="sm" @click="toast.success('Успешно!')"
                    >Success</Button
                >
                <Button size="sm" @click="toast.error('Что-то пошло не так')"
                    >Error</Button
                >
                <Button size="sm" @click="toast.warning('Осторожно')"
                    >Warning</Button
                >
            </div>
        </template>
    </ComponentDoc>
</template>
