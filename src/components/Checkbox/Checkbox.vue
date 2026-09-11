<script setup lang="ts">
import { inject, computed } from "vue";
import { CheckboxGroupKey } from "./group-context";

const props = withDefaults(
    defineProps<{
        modelValue?: boolean;
        value?: string | number;
        disabled?: boolean;
    }>(),
    { modelValue: false, disabled: false },
);

const emit = defineEmits<{ "update:modelValue": [boolean] }>();

const group = inject(CheckboxGroupKey, null);

const checked = computed(() =>
    group && props.value !== undefined
        ? group.isChecked(props.value)
        : props.modelValue,
);

function onChange() {
    if (props.disabled) return;
    if (group && props.value !== undefined) {
        group.toggle(props.value);
    } else {
        emit("update:modelValue", !props.modelValue);
    }
}
</script>

<template>
    <label
        class="inline-flex items-center gap-2 text-sm select-none"
        :class="
            disabled
                ? 'cursor-not-allowed text-gray-400'
                : 'cursor-pointer text-gray-700'
        "
    >
        <input
            type="checkbox"
            class="sr-only"
            :checked="checked"
            :disabled="disabled"
            @change="onChange"
        />
        <span
            class="flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors"
            :class="
                checked
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : 'border-gray-300 bg-white'
            "
        >
            <svg
                v-if="checked"
                viewBox="0 0 12 12"
                class="h-2.5 w-2.5"
                fill="none"
            >
                <path
                    d="M2 6l2.5 2.5L10 3"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </span>
        <slot />
    </label>
</template>
