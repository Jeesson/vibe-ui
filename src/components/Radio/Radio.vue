<script setup lang="ts">
import { inject, computed } from "vue";
import { RadioGroupKey } from "./group-context";

const props = withDefaults(
    defineProps<{
        modelValue?: boolean;
        value?: string | number;
        disabled?: boolean;
    }>(),
    { modelValue: false, disabled: false },
);

const emit = defineEmits<{ "update:modelValue": [boolean] }>();

const group = inject(RadioGroupKey, null);

const selected = computed(() => (group && props.value !== undefined ? group.isSelected(props.value) : props.modelValue));

function onChange() {
    if (props.disabled) return;
    if (group && props.value !== undefined) {
        group.select(props.value);
    } else {
        emit("update:modelValue", true);
    }
}
</script>

<template>
    <label
        class="inline-flex items-center gap-2 text-sm select-none"
        :class="disabled ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-gray-700'">
        <!-- Real input is visually hidden (sr-only) but stays accessible and clickable
         via native label semantics without custom click logic. -->
        <input type="radio" class="sr-only" :checked="selected" :disabled="disabled" @change="onChange" />
        <span
            class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors"
            :class="selected ? 'border-primary-600' : 'border-gray-300'">
            <span v-if="selected" class="bg-primary-600 h-2 w-2 rounded-full" />
        </span>
        <slot />
    </label>
</template>
