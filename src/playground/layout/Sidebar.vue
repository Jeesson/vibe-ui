<script setup lang="ts">
import Menu from "../../components/Menu/Menu.vue";

defineProps<{ modelValue: string }>();
defineEmits<{ "update:modelValue": [string] }>();

const items = [
    { key: "basic", label: "Базовые" },
    { key: "form", label: "Форма" },
    { key: "data", label: "Данные" },
    { key: "navigation", label: "Навигация" },
    { key: "feedback", label: "Feedback" },
    { key: "misc", label: "Разное" },
    { key: "datetime", label: "Дата и время" },
];
</script>

<template>
    <aside
        class="sticky top-14 h-[calc(100vh-3.5rem)] w-52 shrink-0 overflow-y-auto border-r border-gray-100 bg-white p-3"
    >
        <Menu
            :items="items"
            :model-value="modelValue"
            @update:model-value="$emit('update:modelValue', $event)"
        />
    </aside>
</template>
