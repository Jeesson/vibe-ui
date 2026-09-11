<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";

const props = withDefaults(
    defineProps<{
        modelValue: number;
        count?: number;
        disabled?: boolean;
    }>(),
    { count: 5, disabled: false },
);

const emit = defineEmits<{ "update:modelValue": [number] }>();

const hovered = ref<number | null>(null);
const displayValue = computed(() => hovered.value ?? props.modelValue);
const poppingIndex = ref<number | null>(null);

function select(i: number) {
    if (props.disabled) return;
    emit("update:modelValue", i);
}

// Лёгкий "pop" на изменившихся звёздах при смене значения.
watch(
    () => props.modelValue,
    () => {
        poppingIndex.value = props.modelValue;
        nextTick(() => setTimeout(() => (poppingIndex.value = null), 220));
    },
);
</script>

<template>
    <div class="inline-flex gap-1" @mouseleave="hovered = null">
        <span
            v-for="i in count"
            :key="i"
            :class="[
                'text-xl leading-none transition-transform duration-150 ease-out',
                disabled ? 'cursor-default' : 'cursor-pointer',
                i <= displayValue ? 'text-amber-400' : 'text-gray-200',
                i <= poppingIndex! && i > poppingIndex! - 1 && 'scale-125',
            ]"
            @mouseenter="!disabled && (hovered = i)"
            @click="select(i)"
            >★</span
        >
    </div>
</template>
