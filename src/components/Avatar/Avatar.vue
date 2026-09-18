<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
    defineProps<{
        src?: string;
        initials?: string;
        size?: "sm" | "md" | "lg";
        shape?: "circle" | "square";
    }>(),
    { size: "md", shape: "circle" },
);

const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-12 w-12 text-base",
};

// Hue-based background palette (oklch) hashed from initials/src
// ensures a user consistently receives the same color.
const palette = [
    "oklch(0.9 0.05 20)", // pink
    "oklch(0.9 0.05 60)", // orange
    "oklch(0.9 0.05 140)", // green
    "oklch(0.9 0.05 200)", // cyan
    "oklch(0.9 0.05 260)", // blue
    "oklch(0.9 0.05 300)", // purple
];
const textPalette = [
    "oklch(0.45 0.15 20)",
    "oklch(0.45 0.15 60)",
    "oklch(0.45 0.15 140)",
    "oklch(0.45 0.15 200)",
    "oklch(0.45 0.15 260)",
    "oklch(0.45 0.15 300)",
];

function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

const colorIndex = computed(() => hashString(props.initials || props.src || "default") % palette.length);
const bg = computed(() => palette[colorIndex.value]);
const fg = computed(() => textPalette[colorIndex.value]);
</script>

<template>
    <span
        :class="[
            'inline-flex shrink-0 items-center justify-center overflow-hidden font-medium',
            sizeClasses[size],
            shape === 'circle' ? 'rounded-full' : 'rounded-md',
        ]"
        :style="!src ? { backgroundColor: bg, color: fg } : undefined">
        <img v-if="src" :src="src" class="h-full w-full object-cover" alt="" />
        <span v-else>{{ initials }}</span>
    </span>
</template>
