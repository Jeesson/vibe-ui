<script setup lang="ts">
withDefaults(defineProps<{ direction?: "horizontal" | "vertical" }>(), {
    direction: "horizontal",
});
</script>

<template>
    <div
        v-if="direction === 'vertical'"
        class="inline-block h-4 w-px bg-gray-200 align-middle"
    />
    <div
        v-else-if="$slots.default"
        class="flex items-center gap-3 text-sm text-gray-400"
    >
        <span class="h-px flex-1 bg-gray-200" />
        <slot />
        <span class="h-px flex-1 bg-gray-200" />
    </div>
    <div v-else class="h-px w-full bg-gray-200" />
</template>
