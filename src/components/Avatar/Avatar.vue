<script setup lang="ts">
import { computed } from "vue";
import { avatarColors } from "../../composables/avatar-color";

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

// Stable per-user color derived from initials/src (see composables/avatar-color).
const colors = computed(() => avatarColors(props.initials || props.src || ""));
</script>

<template>
    <span
        :class="[
            'inline-flex shrink-0 items-center justify-center overflow-hidden font-medium',
            sizeClasses[size],
            shape === 'circle' ? 'rounded-full' : 'rounded-md',
        ]"
        :style="!src ? { backgroundColor: colors.bg, color: colors.fg } : undefined">
        <img v-if="src" :src="src" class="h-full w-full object-cover" alt="" />
        <span v-else>{{ initials }}</span>
    </span>
</template>
