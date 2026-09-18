<script setup lang="ts">
export interface TimelineItem {
    title: string;
    time?: string;
    description?: string;
    type?: "default" | "primary" | "success" | "warning" | "danger";
    hollow?: boolean;
}

defineProps<{ items: TimelineItem[] }>();

const dotClasses: Record<string, string> = {
    default: "bg-gray-300",
    primary: "bg-primary-600",
    success: "bg-green-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
};
const ringClasses: Record<string, string> = {
    default: "ring-gray-300",
    primary: "ring-primary-600",
    success: "ring-green-500",
    warning: "ring-amber-500",
    danger: "ring-red-500",
};
</script>

<template>
    <ul class="flex flex-col">
        <li v-for="(item, i) in items" :key="i" class="flex gap-3">
            <!-- Dot and line share a flex column: line uses flex-1 to match adjacent
            content height without fixed pixel offsets or uneven line heights. -->
            <div class="flex flex-col items-center">
                <slot name="dot" :item="item" :index="i">
                    <span
                        :class="[
                            'mt-1 h-2.5 w-2.5 shrink-0 rounded-full',
                            item.hollow ? ['bg-white ring-2', ringClasses[item.type ?? 'default']] : dotClasses[item.type ?? 'default'],
                        ]" />
                </slot>
                <span v-if="i < items.length - 1" class="my-1 w-px flex-1 bg-gray-200" />
            </div>

            <div class="flex-1 pb-6 last:pb-0">
                <div class="flex items-baseline justify-between gap-2">
                    <p class="text-sm font-medium text-gray-800">
                        {{ item.title }}
                    </p>
                    <span v-if="item.time" class="text-xs text-gray-400">{{ item.time }}</span>
                </div>
                <p v-if="item.description" class="mt-0.5 text-sm text-gray-500">
                    {{ item.description }}
                </p>
            </div>
        </li>
    </ul>
</template>
