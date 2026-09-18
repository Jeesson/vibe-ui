<script setup lang="ts">
withDefaults(defineProps<{ direction?: "horizontal" | "vertical" }>(), {
    direction: "horizontal",
});
</script>

<template>
    <div v-if="direction === 'vertical'" class="inline-block h-4 w-px bg-gray-200 align-middle" />
    <div v-else-if="$slots.default" class="flex w-full items-center gap-3 text-sm leading-5 text-gray-400">
        <span class="h-px min-w-0 flex-1 bg-gray-200" />
        <span class="relative -top-px flex shrink-0 items-center px-1 whitespace-nowrap">
            <slot />
        </span>
        <span class="h-px min-w-0 flex-1 bg-gray-200" />
    </div>
    <div v-else class="h-px w-full bg-gray-200" />
</template>
