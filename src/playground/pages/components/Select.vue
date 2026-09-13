<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import DocExample from "../../docs/DocExample.vue";
import { components as docs } from "../../docs/component-docs";
import Select from "../../../components/Select/Select.vue";
const doc = docs.select;
const value = ref<string | number | null>("frontend");
const roleOptions = [
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
    { label: "Fullstack", value: "fullstack", disabled: true },
];
const basicSource = '<Select v-model="value" :options="roleOptions" />';
const clearableSource =
    '<Select v-model="value" :options="roleOptions" placeholder="Роль" clearable />';
const disabledSource =
    '<Select v-model="value" :options="roleOptions" placeholder="Отключено" disabled />';
</script>

<template>
    <ComponentDoc :doc="doc" structured-examples>
        <template #examples>
            <div class="flex max-w-sm flex-col gap-3">
                <DocExample title="Базовый Select" :source="basicSource">
                    <Select v-model="value" :options="roleOptions" />
                </DocExample>
                <DocExample title="Очищаемый Select" :source="clearableSource">
                    <Select
                        v-model="value"
                        :options="roleOptions"
                        placeholder="Роль"
                        clearable
                    />
                </DocExample>
                <DocExample title="Отключенный Select" :source="disabledSource">
                    <Select
                        v-model="value"
                        :options="roleOptions"
                        placeholder="Отключено"
                        disabled
                    />
                </DocExample>
            </div>
        </template>
    </ComponentDoc>
</template>
