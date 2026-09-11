<script setup lang="ts">
import { ref, computed } from "vue";

const props = withDefaults(
    defineProps<{
        modelValue: string[];
        placeholder?: string;
        disabled?: boolean;
        max?: number;
    }>(),
    { disabled: false },
);

const emit = defineEmits<{ "update:modelValue": [string[]] }>();

const draft = ref("");
const limitReached = computed(
    () => props.max !== undefined && props.modelValue.length >= props.max,
);

function addTag(raw: string) {
    const value = raw.trim();
    if (!value || props.modelValue.includes(value) || limitReached.value)
        return;
    emit("update:modelValue", [...props.modelValue, value]);
}

function onEnter() {
    addTag(draft.value);
    draft.value = "";
}

// Запятая тоже завершает тег — удобно при вставке готового списка через запятую.
function onInput(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    if (value.includes(",")) {
        value.split(",").forEach((part) => addTag(part));
        draft.value = "";
    } else {
        draft.value = value;
    }
}

function removeTag(index: number) {
    if (props.disabled) return;
    emit(
        "update:modelValue",
        props.modelValue.filter((_, i) => i !== index),
    );
}

function onBackspace() {
    if (!draft.value && props.modelValue.length)
        removeTag(props.modelValue.length - 1);
}
</script>

<template>
    <div
        :class="[
            'flex flex-wrap items-center gap-1.5 rounded-md border px-2 py-1.5',
            disabled
                ? 'border-gray-200 bg-gray-100'
                : 'focus-within:ring-primary-500 focus-within:border-primary-500 border-gray-300 focus-within:ring-2',
        ]"
    >
        <span
            v-for="(tag, i) in modelValue"
            :key="tag"
            class="bg-primary-50 text-primary-700 inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs"
        >
            {{ tag }}
            <button
                v-if="!disabled"
                type="button"
                class="opacity-60 hover:opacity-100"
                @click="removeTag(i)"
            >
                ✕
            </button>
        </span>
        <input
            :value="draft"
            :disabled="disabled || limitReached"
            :placeholder="modelValue.length ? '' : placeholder"
            class="min-w-[80px] flex-1 border-none py-0.5 text-sm outline-none disabled:bg-transparent"
            @input="onInput"
            @keydown.enter.prevent="onEnter"
            @keydown.backspace="onBackspace"
        />
    </div>
</template>
