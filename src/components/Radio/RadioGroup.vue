<script setup lang="ts">
import { provide } from "vue";
import { RadioGroupKey } from "./group-context";

const props = defineProps<{ modelValue: string | number | null }>();
const emit = defineEmits<{ "update:modelValue": [string | number] }>();

provide(RadioGroupKey, {
    isSelected: (value) => value === props.modelValue,
    select: (value) => emit("update:modelValue", value),
});
</script>

<template>
    <div class="flex flex-wrap gap-4">
        <slot />
    </div>
</template>
