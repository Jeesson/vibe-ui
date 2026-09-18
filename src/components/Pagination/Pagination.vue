<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
    defineProps<{
        modelValue: number;
        total: number;
        pageSize?: number;
        siblingCount?: number;
    }>(),
    { pageSize: 10, siblingCount: 1 },
);

const emit = defineEmits<{ "update:modelValue": [number] }>();

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)));

const pages = computed<(number | "...")[]>(() => {
    const total = pageCount.value;
    const current = props.modelValue;
    const sib = props.siblingCount;
    const range: (number | "...")[] = [];

    const start = Math.max(2, current - sib);
    const end = Math.min(total - 1, current + sib);

    range.push(1);
    if (start > 2) range.push("...");
    for (let i = start; i <= end; i++) range.push(i);
    if (end < total - 1) range.push("...");
    if (total > 1) range.push(total);

    return range;
});

function go(page: number) {
    if (page < 1 || page > pageCount.value || page === props.modelValue) return;
    emit("update:modelValue", page);
}
</script>

<template>
    <div class="flex items-center gap-1 text-sm">
        <button
            type="button"
            class="h-8 w-8 rounded-md hover:bg-gray-100 disabled:opacity-30"
            :disabled="modelValue === 1"
            @click="go(modelValue - 1)">
            ‹
        </button>

        <template v-for="(page, i) in pages" :key="i">
            <span v-if="page === '...'" class="px-1 text-gray-400">…</span>
            <button
                v-else
                type="button"
                :class="[
                    'h-8 w-8 rounded-md transition-colors',
                    page === modelValue ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100',
                ]"
                @click="go(page)">
                {{ page }}
            </button>
        </template>

        <button
            type="button"
            class="h-8 w-8 rounded-md hover:bg-gray-100 disabled:opacity-30"
            :disabled="modelValue === pageCount"
            @click="go(modelValue + 1)">
            ›
        </button>
    </div>
</template>
