<script setup lang="ts">
import { ref, reactive } from "vue";
import Input from "../../components/Input/Input.vue";
import Select from "../../components/Select/Select.vue";
import Checkbox from "../../components/Checkbox/Checkbox.vue";
import CheckboxGroup from "../../components/Checkbox/CheckboxGroup.vue";
import Radio from "../../components/Radio/Radio.vue";
import RadioGroup from "../../components/Radio/RadioGroup.vue";
import Switch from "../../components/Switch/Switch.vue";
import Slider from "../../components/Slider/Slider.vue";
import InputNumber from "../../components/InputNumber/InputNumber.vue";
import Rate from "../../components/Rate/Rate.vue";
import Button from "../../components/Button/Button.vue";
import Dialog from "../../components/Dialog/Dialog.vue";
import Form from "../../components/Form/Form.vue";
import FormItem from "../../components/Form/FormItem.vue";
import type { FormRule } from "../../composables/form-context";
import { toast } from "vue-sonner";

const name = ref("");
const agree = ref(false);
const switchOn = ref(true);
const radioValue = ref<string | number | null>("a");
const checkboxGroupValue = ref<(string | number)[]>(["vue"]);
const sliderValue = ref(40);
const numberValue = ref(3);
const rateValue = ref(3);
const dialogVisible = ref(false);

const roleOptions = [
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
    { label: "Fullstack", value: "fullstack", disabled: true },
];

const formRef = ref();
const model = reactive({ email: "", role: null as string | number | null });
const rules: Record<string, FormRule[]> = {
    email: [
        { required: true, message: "Email обязателен" },
        { pattern: /.+@.+\..+/, message: "Неверный email" },
    ],
    role: [{ required: true, message: "Выберите роль" }],
};

function submit() {
    if (formRef.value?.validate()) {
        toast.success("Форма сохранена");
        dialogVisible.value = false;
    }
}

defineExpose({
    anchors: [
        { href: "#form-input", title: "Input / Select" },
        { href: "#form-checkbox", title: "Checkbox / Radio / Switch" },
        { href: "#form-slider", title: "Slider / Number / Rate" },
        { href: "#form-validation", title: "Form с валидацией" },
    ],
});
</script>

<template>
    <div class="flex flex-col gap-4">
        <section
            id="form-input"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">
                Input / Select
            </h2>
            <div class="flex max-w-sm flex-col gap-3">
                <Input v-model="name" label="Имя" placeholder="Введите имя" />
                <Select
                    v-model="model.role"
                    :options="roleOptions"
                    placeholder="Роль"
                    clearable
                />
            </div>
        </section>

        <section
            id="form-checkbox"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">
                Checkbox / Radio / Switch
            </h2>
            <div class="flex flex-col gap-3">
                <Checkbox v-model="agree">Согласен с условиями</Checkbox>
                <CheckboxGroup v-model="checkboxGroupValue">
                    <Checkbox value="vue">Vue</Checkbox>
                    <Checkbox value="react">React</Checkbox>
                    <Checkbox value="svelte">Svelte</Checkbox>
                </CheckboxGroup>
                <RadioGroup v-model="radioValue">
                    <Radio value="a">Вариант A</Radio>
                    <Radio value="b">Вариант B</Radio>
                </RadioGroup>
                <Switch v-model="switchOn" />
            </div>
        </section>

        <section
            id="form-slider"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">
                Slider / InputNumber / Rate
            </h2>
            <div class="flex max-w-sm flex-col gap-3">
                <Slider v-model="sliderValue" />
                <InputNumber v-model="numberValue" :min="0" :max="10" />
                <Rate v-model="rateValue" />
            </div>
        </section>

        <section
            id="form-validation"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">
                Form с валидацией
            </h2>
            <Button @click="dialogVisible = true">Открыть форму</Button>
            <Dialog
                v-model="dialogVisible"
                title="Новый пользователь"
                width="420px"
            >
                <Form ref="formRef" :model="model" :rules="rules">
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
                </Form>
                <template #footer>
                    <Button variant="ghost" @click="dialogVisible = false"
                        >Отмена</Button
                    >
                    <Button @click="submit">Сохранить</Button>
                </template>
            </Dialog>
        </section>
    </div>
</template>
