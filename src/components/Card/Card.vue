<script setup lang="ts">
withDefaults(
    defineProps<{
        title?: string;
        type?: "bordered" | "elevated" | "flat" | "filled";
    }>(),
    { type: "bordered" },
);

const typeClasses = {
    bordered: "border border-gray-200 bg-white",
    elevated: "border-none bg-white shadow-md",
    flat: "border-none bg-transparent",
    filled: "border-none bg-gray-50",
};
</script>

<template>
    <div :class="['rounded-lg', typeClasses[type]]">
        <div
            v-if="title || $slots.header"
            class="border-b border-gray-100 px-4 py-3"
        >
            <slot name="header">
                <h3 class="text-sm font-semibold text-gray-900">{{ title }}</h3>
            </slot>
        </div>
        <div class="px-4 py-4 text-sm text-gray-700">
            <slot />
        </div>
        <div v-if="$slots.footer" class="border-t border-gray-100 px-4 py-3">
            <slot name="footer" />
        </div>
    </div>
</template>
