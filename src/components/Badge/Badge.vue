<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
    defineProps<{
        value?: number | string;
        max?: number;
        dot?: boolean;
        type?: "primary" | "danger" | "success" | "warning";
        hidden?: boolean;
    }>(),
    { max: 99, dot: false, type: "danger", hidden: false },
);

const display = computed(() => {
    if (typeof props.value === "number" && props.value > props.max) return `${props.max}+`;
    return props.value;
});

const typeClasses = {
    primary: "bg-primary-600",
    danger: "bg-red-500",
    success: "bg-green-500",
    warning: "bg-amber-500",
};
</script>

<template>
    <span class="relative inline-flex">
        <slot />
        <span
            v-if="!hidden && (dot || value !== undefined)"
            :class="[
                'absolute -top-1 -right-1 flex items-center justify-center rounded-full leading-none text-white',
                typeClasses[type],
                dot ? 'h-2 w-2' : 'h-4 min-w-4 px-1 text-[10px]',
            ]">
            <template v-if="!dot">{{ display }}</template>
        </span>
    </span>
</template>
