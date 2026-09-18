<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Mention from "../../../components/Mention/Mention.vue";
const doc = docs.mention;
const text = ref("Привет, ");
const users = ["anna_dev", "igor", "marta_design", "dodik"];
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <p class="mb-2 text-xs text-gray-400">
                Введи символ <strong>@</strong> — появится список пользователей: {{ users.join(", ") }}.
            </p>
            <Mention v-model="text" :users="users" placeholder="Напиши что-нибудь и добавь @имя" class="max-w-sm" />
        </template>
    </ComponentDoc>
</template>
