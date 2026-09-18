<script setup lang="ts">
import { provide } from "vue";
import { CollapseKey } from "./context";

const props = defineProps<{ modelValue: string[] }>();
const emit = defineEmits<{ "update:modelValue": [string[]] }>();

provide(CollapseKey, {
    isActive: (name) => props.modelValue.includes(name),
    toggle: (name) => {
        const next = props.modelValue.includes(name) ? props.modelValue.filter((n) => n !== name) : [...props.modelValue, name];
        emit("update:modelValue", next);
    },
});
</script>

<template>
    <div class="divide-y divide-gray-100 overflow-hidden rounded-md border border-gray-100">
        <slot />
    </div>
</template>
