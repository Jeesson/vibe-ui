<script setup lang="ts">
import { ref, computed } from "vue";
import {
    buildMonthGrid,
    WEEKDAY_LABELS,
    MONTH_LABELS,
} from "../../composables/date-grid";

const props = withDefaults(defineProps<{ modelValue?: Date }>(), {
    modelValue: () => new Date(),
});

const cursor = ref(
    new Date(props.modelValue.getFullYear(), props.modelValue.getMonth(), 1),
);

const cells = computed(() =>
    buildMonthGrid(cursor.value.getFullYear(), cursor.value.getMonth()),
);
const label = computed(
    () =>
        `${MONTH_LABELS[cursor.value.getMonth()]} ${cursor.value.getFullYear()}`,
);

function shiftMonth(delta: number) {
    cursor.value = new Date(
        cursor.value.getFullYear(),
        cursor.value.getMonth() + delta,
        1,
    );
}
</script>

<template>
    <div class="w-full rounded-md border border-gray-200 p-3">
        <div class="mb-2 flex items-center justify-between">
            <button
                type="button"
                class="px-2 text-gray-400 hover:text-gray-700"
                @click="shiftMonth(-1)"
            >
                ‹
            </button>
            <span class="text-sm font-medium text-gray-800">{{ label }}</span>
            <button
                type="button"
                class="px-2 text-gray-400 hover:text-gray-700"
                @click="shiftMonth(1)"
            >
                ›
            </button>
        </div>
        <div
            class="mb-1 grid grid-cols-7 gap-1 text-center text-xs text-gray-400"
        >
            <span v-for="d in WEEKDAY_LABELS" :key="d">{{ d }}</span>
        </div>
        <div class="grid grid-cols-7 gap-1">
            <div
                v-for="cell in cells"
                :key="cell.iso"
                :class="[
                    'flex h-9 flex-col items-center justify-center rounded-md text-sm',
                    !cell.inCurrentMonth && 'text-gray-300',
                    cell.isToday && 'ring-primary-500 ring-1',
                ]"
            >
                <slot name="cell" :cell="cell">{{ cell.date.getDate() }}</slot>
            </div>
        </div>
    </div>
</template>
