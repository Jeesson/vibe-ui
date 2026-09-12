<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
    defineProps<{
        percentage?: number;
        type?: "line" | "circle" | "dashboard";
        status?: "normal" | "success" | "warning" | "exception";
        indeterminate?: boolean;
        strokeColor?: string;
        strokeWidth?: number;
        showText?: boolean;
        size?: number;
    }>(),
    {
        type: "line",
        status: "normal",
        indeterminate: false,
        strokeWidth: 6,
        showText: true,
        size: 80,
    },
);

const clamped = computed(() =>
    Math.min(100, Math.max(0, props.percentage ?? 0)),
);

const statusColors: Record<string, string> = {
    normal: "var(--color-primary-600)",
    success: "#22c55e",
    warning: "#f59e0b",
    exception: "#ef4444",
};
const color = computed(() => props.strokeColor ?? statusColors[props.status]);

const circleRadius = 36;
const circumference = 2 * Math.PI * circleRadius;
const dashOffset = computed(() => circumference * (1 - clamped.value / 100));

// Dashboard — круг с зазором 90° (270° дуги), зазор снизу. Прогресс идёт
// от левого края зазора по часовой стрелке, поэтому offset = 0.
const dashboardGap = circumference * 0.25;
const dashboardDash = computed(() => dashboardGap * (clamped.value / 100));
</script>

<template>
    <div v-if="type === 'line'" class="flex items-center gap-2">
        <div class="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
            <div
                v-if="indeterminate"
                class="animate-complex-ui-progress-indeterminate h-full w-1/3 rounded-full"
                :style="{ backgroundColor: color }"
            />
            <div
                v-else
                class="h-full rounded-full transition-all"
                :style="{ width: clamped + '%', backgroundColor: color }"
            />
        </div>
        <span
            v-if="showText && !indeterminate"
            class="w-9 text-right text-xs text-gray-500"
            >{{ clamped }}%</span
        >
    </div>

    <div
        v-else
        class="relative inline-flex items-center justify-center"
        :style="{ width: size + 'px', height: size + 'px' }"
    >
        <svg
            viewBox="0 0 80 80"
            :class="[
                type === 'dashboard' ? 'rotate-135' : '-rotate-90',
                indeterminate && 'animate-spin',
            ]"
        >
            <circle
                cx="40"
                cy="40"
                :r="circleRadius"
                fill="none"
                stroke="#F3F4F6"
                :stroke-width="strokeWidth"
                :stroke-dasharray="
                    type === 'dashboard'
                        ? `${circumference - dashboardGap} ${dashboardGap}`
                        : undefined
                "
            />
            <circle
                cx="40"
                cy="40"
                :r="circleRadius"
                fill="none"
                :stroke="color"
                :stroke-width="strokeWidth"
                stroke-linecap="round"
                :stroke-dasharray="
                    indeterminate
                        ? undefined
                        : type === 'dashboard'
                          ? `${dashboardDash} ${circumference}`
                          : circumference
                "
                :stroke-dashoffset="
                    indeterminate
                        ? circumference * 0.75
                        : type === 'dashboard'
                          ? 0
                          : dashOffset
                "
                class="transition-all"
            />
        </svg>
        <span
            v-if="showText && !indeterminate"
            class="absolute text-sm font-medium text-gray-700"
            >{{ clamped }}%</span
        >
    </div>
</template>

<style>
@keyframes complex-ui-progress-indeterminate {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(300%);
    }
}
.animate-complex-ui-progress-indeterminate {
    animation: complex-ui-progress-indeterminate 1.2s ease-in-out infinite;
}
</style>
