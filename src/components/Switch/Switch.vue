<script setup lang="ts">
withDefaults(defineProps<{ modelValue: boolean; disabled?: boolean }>(), {
    disabled: false,
});
const emit = defineEmits<{ "update:modelValue": [boolean] }>();
</script>

<template>
    <button
        type="button"
        role="switch"
        :aria-checked="modelValue"
        :disabled="disabled"
        :class="[
            'relative inline-flex h-5 w-9 items-center rounded-full transition-colors',
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            modelValue ? 'bg-primary-600' : 'bg-gray-300',
        ]"
        @click="!disabled && emit('update:modelValue', !modelValue)">
        <span
            class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            :style="{
                transform: modelValue ? 'translateX(18px)' : 'translateX(2px)',
            }" />
    </button>
</template>
