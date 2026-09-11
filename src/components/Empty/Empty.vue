<script setup lang="ts">
withDefaults(defineProps<{ description?: string }>(), {
    description: "Нет данных",
});
</script>

<template>
    <div
        class="flex flex-col items-center justify-center gap-3 py-10 text-center"
    >
        <svg viewBox="0 0 64 41" class="h-16 w-24 text-gray-300" fill="none">
            <ellipse
                cx="32"
                cy="37"
                rx="28"
                ry="4"
                fill="currentColor"
                opacity="0.3"
            />
            <path
                d="M12 4h40l8 16H4l8-16z"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
            />
            <path
                d="M4 20h16a4 4 0 004 4h16a4 4 0 004-4h16v13a2 2 0 01-2 2H6a2 2 0 01-2-2V20z"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
            />
        </svg>
        <p class="text-sm text-gray-400">{{ description }}</p>
        <slot />
    </div>
</template>
