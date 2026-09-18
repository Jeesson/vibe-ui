<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
    defineProps<{
        modelValue: number;
        min?: number;
        max?: number;
        step?: number;
        disabled?: boolean;
    }>(),
    { min: 0, max: 100, step: 1, disabled: false },
);

const emit = defineEmits<{ "update:modelValue": [number] }>();

const percent = computed(() => ((props.modelValue - props.min) / (props.max - props.min)) * 100);

function onInput(e: Event) {
    emit("update:modelValue", Number((e.target as HTMLInputElement).value));
}
</script>

<template>
    <div class="flex items-center gap-3">
        <div class="relative flex h-5 flex-1 items-center">
            <div class="h-1.5 w-full rounded-full bg-gray-200">
                <div class="bg-primary-600 h-1.5 rounded-full" :style="{ width: percent + '%' }" />
            </div>
            <input
                type="range"
                :min="min"
                :max="max"
                :step="step"
                :value="modelValue"
                :disabled="disabled"
                class="[&::-webkit-slider-thumb]:border-primary-600 absolute inset-0 w-full cursor-pointer appearance-none bg-transparent disabled:cursor-not-allowed [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow"
                @input="onInput" />
        </div>
        <span class="w-8 text-right text-sm text-gray-500">{{ modelValue }}</span>
    </div>
</template>
