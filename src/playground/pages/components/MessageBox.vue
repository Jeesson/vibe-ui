<script setup lang="ts">
import { toast } from "vue-sonner";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import { messageBox } from "../../../components/MessageBox";
import Button from "../../../components/Button/Button.vue";
const doc = docs.messageBox;
function askDelete() {
    messageBox
        .confirm("Это действие необратимо. Продолжить?", {
            title: "Удалить элемент?",
            type: "danger",
            confirmText: "Удалить",
        })
        .then(() => toast.success("Удалено"))
        .catch(() => toast.info("Отменено"));
}
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <Button variant="ghost" @click="askDelete">Удалить элемент</Button>
        </template>
    </ComponentDoc>
</template>
