<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        modelValue: number;
        min?: number;
        max?: number;
        step?: number;
        disabled?: boolean;
        width?: string;
    }>(),
    { min: -Infinity, max: Infinity, step: 1, disabled: false, width: "4rem" },
);

const emit = defineEmits<{ "update:modelValue": [number] }>();

function clamp(value: number) {
    return Math.min(props.max, Math.max(props.min, value));
}

function change(delta: number) {
    if (props.disabled) return;
    emit("update:modelValue", clamp(props.modelValue + delta));
}

function onInput(e: Event) {
    const value = Number((e.target as HTMLInputElement).value);
    if (!Number.isNaN(value)) emit("update:modelValue", clamp(value));
}
</script>

<template>
    <div
        class="inline-flex items-center overflow-hidden rounded-md border border-gray-300"
        :class="disabled && 'opacity-50'"
    >
        <button
            type="button"
            :disabled="disabled || modelValue <= min"
            class="flex h-8 w-7 shrink-0 items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent"
            @click="change(-step)"
        >
            −
        </button>
        <input
            type="number"
            :value="modelValue"
            :disabled="disabled"
            :style="{ width }"
            class="my-ui-number-input shrink-0 border-x border-gray-200 py-1.5 text-center text-sm outline-none"
            @change="onInput"
        />
        <button
            type="button"
            :disabled="disabled || modelValue >= max"
            class="flex h-8 w-7 shrink-0 items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent"
            @click="change(step)"
        >
            +
        </button>
    </div>
</template>

<style>
/* Прячем нативные стрелки type=number — свои кнопки уже есть, а нативные
   в Chrome/Safari добавляли собственную ширину и визуально плавали. */
.my-ui-number-input::-webkit-inner-spin-button,
.my-ui-number-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
.my-ui-number-input {
    -moz-appearance: textfield;
}
</style>
