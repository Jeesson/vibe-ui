<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import DocExample from "../../docs/DocExample.vue";
import { components as docs } from "../../docs/component-docs";
import Input from "../../../components/Input/Input.vue";
const doc = docs.input;
const name = ref("");
const email = ref("");
const nameSource = '<Input v-model="name" label="Имя" placeholder="Введите имя" />';
const emailSource = '<Input v-model="email" label="Email" placeholder="you@example.com" />';
const errorSource = '<Input v-model="email" label="С ошибкой" error="Неверный email" />';
const disabledSource = '<Input v-model="name" label="Отключено" placeholder="Недоступно" disabled />';
</script>

<template>
    <ComponentDoc :doc="doc" structured-examples>
        <template #examples>
            <div class="flex max-w-sm flex-col gap-3">
                <DocExample title="Обычный Input" :source="nameSource">
                    <Input v-model="name" label="Имя" placeholder="Введите имя" />
                </DocExample>
                <DocExample title="Email" :source="emailSource">
                    <Input v-model="email" label="Email" placeholder="you@example.com" />
                </DocExample>
                <DocExample title="Ошибка" :source="errorSource">
                    <Input v-model="email" label="С ошибкой" error="Неверный email" />
                </DocExample>
                <DocExample title="Отключенный Input" :source="disabledSource">
                    <Input v-model="name" label="Отключено" placeholder="Недоступно" disabled />
                </DocExample>
            </div>
        </template>
    </ComponentDoc>
</template>
