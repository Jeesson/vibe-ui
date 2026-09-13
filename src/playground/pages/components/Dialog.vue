<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Dialog from "../../../components/Dialog/Dialog.vue";
import Button from "../../../components/Button/Button.vue";
const doc = docs.dialog;
const open = ref(false);
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <Button @click="open = true">Открыть диалог</Button>
            <Dialog v-model="open" title="Пример диалога" width="380px">
                Простое содержимое диалога.
                <template #footer>
                    <Button variant="ghost" @click="open = false"
                        >Отмена</Button
                    >
                    <Button @click="open = false">Ок</Button>
                </template>
            </Dialog>
        </template>
    </ComponentDoc>
</template>
