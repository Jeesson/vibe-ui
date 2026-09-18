<script setup lang="ts">
import { provide } from "vue";
import { CheckboxGroupKey } from "./group-context";

const props = defineProps<{ modelValue: (string | number)[] }>();
const emit = defineEmits<{ "update:modelValue": [(string | number)[]] }>();

function isChecked(value: string | number) {
    return props.modelValue.includes(value);
}

function toggle(value: string | number) {
    const next = isChecked(value) ? props.modelValue.filter((v) => v !== value) : [...props.modelValue, value];
    emit("update:modelValue", next);
}

provide(CheckboxGroupKey, { isChecked, toggle });
</script>

<template>
    <div class="flex flex-wrap gap-4">
        <slot />
    </div>
</template>
