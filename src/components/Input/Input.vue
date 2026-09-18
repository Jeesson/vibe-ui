<script setup lang="ts">
defineProps<{
    modelValue: string;
    label?: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
}>();

defineEmits<{ "update:modelValue": [string] }>();
</script>

<template>
    <div class="flex flex-col gap-1">
        <label v-if="label" class="text-sm font-medium text-gray-700">{{ label }}</label>
        <input
            :value="modelValue"
            :placeholder="placeholder"
            :disabled="disabled"
            :class="[
                'rounded-md border px-3 py-2 text-sm transition-colors outline-none',
                'focus:ring-primary-500 focus:border-primary-500 focus:ring-2',
                'disabled:cursor-not-allowed disabled:bg-gray-100',
                error ? 'border-red-500' : 'border-gray-300',
            ]"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
        <span v-if="error" class="text-xs text-red-600">{{ error }}</span>
    </div>
</template>
