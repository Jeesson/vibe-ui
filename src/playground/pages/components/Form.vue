<script setup lang="ts">
import { ref, reactive } from "vue";
import { toast } from "vue-sonner";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import type { FormRule } from "../../../composables/form-context";
import Form from "../../../components/Form/Form.vue";
import FormItem from "../../../components/Form/FormItem.vue";
import Input from "../../../components/Input/Input.vue";
import Select from "../../../components/Select/Select.vue";
import Button from "../../../components/Button/Button.vue";

const doc = docs.form;
const formRef = ref();
const model = reactive({ email: "", role: null as string | number | null });
const roleOptions = [
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
];
const rules: Record<string, FormRule[]> = {
    email: [
        { required: true, message: "Email обязателен" },
        { pattern: /.+@.+\..+/, message: "Неверный email" },
    ],
    role: [{ required: true, message: "Выберите роль" }],
};
function submit() {
    if (formRef.value?.validate()) {
        toast.success("Форма валидна");
    }
}
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <Form ref="formRef" :model="model" :rules="rules" class="max-w-sm">
                <FormItem prop="email" label="Email">
                    <Input
                        v-model="model.email"
                        placeholder="you@example.com"
                    />
                </FormItem>
                <FormItem prop="role" label="Роль">
                    <Select
                        v-model="model.role"
                        :options="roleOptions"
                        placeholder="Выберите роль"
                    />
                </FormItem>
                <Button @click="submit">Проверить</Button>
            </Form>
        </template>
    </ComponentDoc>
</template>
