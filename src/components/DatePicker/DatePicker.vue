<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";

import { buildMonthGrid, WEEKDAY_LABELS, MONTH_LABELS } from "../../composables/date-grid";
import { useFloatingPanel } from "../../composables/use-floating-panel";

const props = defineProps<{
    modelValue: string | null;
    placeholder?: string;
}>();
const emit = defineEmits<{ "update:modelValue": [string] }>();

const PANEL_WIDTH = 256;
const PANEL_HEIGHT = 320;

// Teleported panel: useFloatingPanel owns positioning, outside-click and resize/scroll tracking.
const { open, triggerRef, rect, togglePanel, closePanel } = useFloatingPanel("vibe-ui-datepicker-panel", PANEL_HEIGHT, PANEL_WIDTH);

const cursor = ref(props.modelValue ? new Date(props.modelValue) : new Date());

const cells = computed(() => buildMonthGrid(cursor.value.getFullYear(), cursor.value.getMonth()));
const label = computed(() => `${MONTH_LABELS[cursor.value.getMonth()]} ${cursor.value.getFullYear()}`);

function shiftMonth(delta: number) {
    cursor.value = new Date(cursor.value.getFullYear(), cursor.value.getMonth() + delta, 1);
}

function select(iso: string) {
    emit("update:modelValue", iso);
    closePanel();
}
</script>

<template>
    <div class="relative inline-block w-full text-sm">
        <input
            ref="triggerRef"
            readonly
            :value="modelValue"
            :placeholder="placeholder ?? 'Select date'"
            class="focus:ring-primary-500 w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2"
            @click="togglePanel" />

        <!-- Teleport + fixed positioning: flips upwards when bottom space is
         insufficient and clamps horizontally to prevent viewport overflow. -->
        <Teleport to="body">
            <div
                v-if="open && rect"
                class="vibe-ui-datepicker-panel fixed z-70 rounded-md border border-gray-200 bg-white p-3 shadow-lg"
                :style="{
                    top: rect.top + 'px',
                    left: rect.left + 'px',
                    width: PANEL_WIDTH + 'px',
                    transform: rect.placement === 'top' ? 'translateY(-100%)' : undefined,
                }">
                <div class="mb-3 flex items-center justify-between">
                    <button type="button" class="px-2 text-gray-400 hover:text-gray-700" @click="shiftMonth(-1)">
                        <ChevronLeftIcon class="h-4 w-4" />
                    </button>
                    <span class="font-medium text-gray-800">{{ label }}</span>
                    <button type="button" class="px-2 text-gray-400 hover:text-gray-700" @click="shiftMonth(1)">
                        <ChevronRightIcon class="h-4 w-4" />
                    </button>
                </div>
                <div class="mb-1 grid grid-cols-7 gap-1 text-center text-xs text-gray-400">
                    <span v-for="d in WEEKDAY_LABELS" :key="d">{{ d }}</span>
                </div>
                <div class="grid grid-cols-7 gap-1">
                    <button
                        v-for="cell in cells"
                        :key="cell.iso"
                        type="button"
                        :class="[
                            'h-8 rounded-md text-sm',
                            !cell.inCurrentMonth ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-50',
                            cell.iso === modelValue && 'bg-primary-600 hover:bg-primary-600 text-white',
                            cell.isToday && cell.iso !== modelValue && 'ring-primary-400 ring-1',
                        ]"
                        @click="select(cell.iso)">
                        {{ cell.date.getDate() }}
                    </button>
                </div>
            </div>
        </Teleport>
    </div>
</template>
