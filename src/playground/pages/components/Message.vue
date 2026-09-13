<script setup lang="ts">
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import { message } from "../../../components/Message";
import Button from "../../../components/Button/Button.vue";
const doc = docs.message;
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="flex flex-wrap gap-2">
                <Button size="sm" @click="message.success('Сохранено')"
                    >Success</Button
                >
                <Button size="sm" @click="message.info('Информация')"
                    >Info</Button
                >
                <Button size="sm" @click="message.warning('Осторожно')"
                    >Warning</Button
                >
                <Button size="sm" @click="message.error('Ошибка', 5000)"
                    >Error</Button
                >
            </div>
        </template>
    </ComponentDoc>
</template>
