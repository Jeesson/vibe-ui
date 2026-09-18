<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import FormItem from "../../../components/Form/FormItem.vue";
import Input from "../../../components/Input/Input.vue";
const doc = docs.formItem;
const value = ref("Заполнено");
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <p class="mb-2 text-xs text-gray-400">
                FormItem работает внутри <code>&lt;Form&gt;</code> и выводит ошибку валидации (см. страницу «Form»). Ниже — внешний вид
                пункта.
            </p>
            <div class="max-w-xs rounded-md border border-gray-100 p-3">
                <FormItem prop="demo" label="Обычный пункт">
                    <Input v-model="value" />
                </FormItem>
            </div>
        </template>
    </ComponentDoc>
</template>
