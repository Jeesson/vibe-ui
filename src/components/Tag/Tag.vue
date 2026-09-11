<script setup lang="ts">
withDefaults(
    defineProps<{
        type?: "primary" | "success" | "warning" | "danger" | "info";
        closable?: boolean;
    }>(),
    { type: "info", closable: false },
);
defineEmits<{ close: [] }>();

const typeClasses = {
    primary: "bg-primary-50 text-primary-700 border-primary-200",
    success: "bg-green-50 text-green-700 border-green-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-red-50 text-red-700 border-red-200",
    info: "bg-gray-100 text-gray-600 border-gray-200",
};
</script>

<template>
    <span
        :class="[
            'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium',
            typeClasses[type],
        ]"
    >
        <slot />
        <button
            v-if="closable"
            type="button"
            class="ml-0.5 opacity-60 hover:opacity-100"
            @click="$emit('close')"
        >
            ✕
        </button>
    </span>
</template>
