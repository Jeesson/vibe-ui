<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
    defineProps<{
        percentage?: number;
        type?: "line" | "circle" | "dashboard";
        status?: "normal" | "success" | "warning" | "exception";
        indeterminate?: boolean;
        animation?: "slide" | "stripes" | "pulse";
        strokeColor?: string;
        strokeWidth?: number;
        showText?: boolean;
        size?: number;
    }>(),
    {
        type: "line",
        status: "normal",
        indeterminate: false,
        animation: "slide",
        strokeWidth: 6,
        showText: true,
        size: 80,
    },
);

const clamped = computed(() => Math.min(100, Math.max(0, props.percentage ?? 0)));

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

// Dashboard — дуга-спидометр: 270° (зазор 90° снизу), старт с нижнего левого
// края по часовой стрелке. Строится настоящим SVG path — у трека и заполнения
// корректные скруглённые концы, без артефактов linecap в зазоре.
const dashboardSweep = 270;
const dashboardArcAngle = computed(() => (dashboardSweep * clamped.value) / 100);

function polar(cx: number, cy: number, r: number, angleDeg: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function arcPath(startAngle: number, sweep: number) {
    const start = polar(40, 40, circleRadius, startAngle);
    const end = polar(40, 40, circleRadius, startAngle + sweep);
    const largeArc = sweep > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${circleRadius} ${circleRadius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}
const dashboardTrackPath = arcPath(135, dashboardSweep);
const dashboardProgressPath = computed(() => arcPath(135, Math.max(dashboardArcAngle.value, 0.01)));
const gradientId = `vibe-ui-progress-grad-${Math.random().toString(36).slice(2, 9)}`;
</script>

<template>
    <div v-if="type === 'line'" class="flex items-center gap-2">
        <div class="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
            <div
                v-if="indeterminate && animation === 'stripes'"
                class="animate-vibe-ui-progress-stripes h-full w-full rounded-full"
                :style="{
                    backgroundImage: `linear-gradient(45deg, ${color} 25%, transparent 25%, transparent 50%, ${color} 50%, ${color} 75%, transparent 75%, transparent)`,
                }" />
            <div
                v-else-if="indeterminate && animation === 'pulse'"
                class="animate-vibe-ui-progress-pulse h-full w-full origin-left rounded-full"
                :style="{ backgroundColor: color }" />
            <div
                v-else-if="indeterminate"
                class="animate-vibe-ui-progress-indeterminate h-full w-1/3 rounded-full"
                :style="{ backgroundColor: color }" />
            <div v-else class="h-full rounded-full transition-all" :style="{ width: clamped + '%', backgroundColor: color }" />
        </div>
        <span v-if="showText && !indeterminate" class="w-9 text-right text-xs text-gray-500">{{ clamped }}%</span>
    </div>

    <div
        v-else-if="type === 'dashboard'"
        class="relative inline-flex items-center justify-center"
        :style="{ width: size + 'px', height: size + 'px' }">
        <svg viewBox="0 0 80 80" :class="indeterminate && 'animate-spin'" class="h-full w-full">
            <defs>
                <linearGradient :id="gradientId" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" :stop-color="color" stop-opacity="0.55" />
                    <stop offset="100%" :stop-color="color" stop-opacity="1" />
                </linearGradient>
            </defs>
            <path :d="dashboardTrackPath" fill="none" stroke="#F3F4F6" :stroke-width="strokeWidth" stroke-linecap="round" />
            <path
                v-if="!indeterminate"
                :d="dashboardProgressPath"
                fill="none"
                :stroke="`url(#${gradientId})`"
                :stroke-width="strokeWidth"
                stroke-linecap="round"
                class="transition-all" />
        </svg>
        <span v-if="showText && !indeterminate" class="absolute text-sm font-semibold text-gray-700 tabular-nums"> {{ clamped }}% </span>
    </div>

    <div v-else class="relative inline-flex items-center justify-center" :style="{ width: size + 'px', height: size + 'px' }">
        <svg viewBox="0 0 80 80" class="h-full w-full -rotate-90" :class="indeterminate && 'animate-spin'">
            <circle cx="40" cy="40" :r="circleRadius" fill="none" stroke="#F3F4F6" :stroke-width="strokeWidth" />
            <circle
                cx="40"
                cy="40"
                :r="circleRadius"
                fill="none"
                :stroke="color"
                :stroke-width="strokeWidth"
                stroke-linecap="round"
                :stroke-dasharray="indeterminate ? undefined : circumference"
                :stroke-dashoffset="indeterminate ? circumference * 0.75 : dashOffset"
                class="transition-all" />
        </svg>
        <span v-if="showText && !indeterminate" class="absolute text-sm font-medium text-gray-700">{{ clamped }}%</span>
    </div>
</template>

<style>
@keyframes vibe-ui-progress-indeterminate {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(300%);
    }
}
.animate-vibe-ui-progress-indeterminate {
    animation: vibe-ui-progress-indeterminate 1.2s ease-in-out infinite;
}

@keyframes vibe-ui-progress-stripes {
    from {
        background-position-x: 0;
    }
    to {
        background-position-x: 16px;
    }
}
.animate-vibe-ui-progress-stripes {
    background-size: 16px 16px;
    animation: vibe-ui-progress-stripes 0.6s linear infinite;
}

@keyframes vibe-ui-progress-pulse {
    0% {
        transform: scaleX(0);
        opacity: 1;
    }
    80%,
    100% {
        transform: scaleX(1);
        opacity: 0;
    }
}
.animate-vibe-ui-progress-pulse {
    animation: vibe-ui-progress-pulse 1.4s ease-in-out infinite;
}
</style>
