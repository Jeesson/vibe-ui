<script setup lang="ts">
import type { Component } from "vue";

withDefaults(
    defineProps<{
        variant?: "primary" | "secondary" | "ghost";
        size?: "sm" | "md" | "lg";
        disabled?: boolean;
        // Any SVG icon component (e.g. heroicons); renders <svg> scaled to size.
        icon?: Component;
        iconRight?: Component;
    }>(),
    { variant: "primary", size: "md", disabled: false },
);

defineEmits<{ click: [MouseEvent] }>();

const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
};

const iconSizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
};

const variantClasses = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline-primary-600",
    secondary: "bg-primary-50 text-primary-700 hover:bg-primary-100 focus-visible:outline-primary-600",
    ghost: "bg-transparent text-primary-700 hover:bg-primary-50 focus-visible:outline-primary-600",
};
</script>

<template>
    <button
        :disabled="disabled"
        :class="[
            'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors',
            'focus-visible:outline focus-visible:outline-offset-2',
            'disabled:pointer-events-none disabled:opacity-50',
            sizeClasses[size],
            variantClasses[variant],
        ]"
        @click="$emit('click', $event)">
        <component :is="icon" v-if="icon" :class="iconSizeClasses[size]" aria-hidden="true" />
        <slot />
        <component :is="iconRight" v-if="iconRight" :class="iconSizeClasses[size]" aria-hidden="true" />
    </button>
</template>
