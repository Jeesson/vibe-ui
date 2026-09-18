<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";

import { buildMonthGrid, WEEKDAY_LABELS, MONTH_LABELS } from "../../composables/date-grid";
import { computeFloatingRect, type FloatingRect } from "../../composables/floating";

const props = defineProps<{
    modelValue: string | null;
    placeholder?: string;
}>();
const emit = defineEmits<{ "update:modelValue": [string] }>();

const PANEL_WIDTH = 256;
const PANEL_HEIGHT = 320;

const open = ref(false);
const rootRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
const rect = ref<FloatingRect | null>(null);
const cursor = ref(props.modelValue ? new Date(props.modelValue) : new Date());

const cells = computed(() => buildMonthGrid(cursor.value.getFullYear(), cursor.value.getMonth()));
const label = computed(() => `${MONTH_LABELS[cursor.value.getMonth()]} ${cursor.value.getFullYear()}`);

function shiftMonth(delta: number) {
    cursor.value = new Date(cursor.value.getFullYear(), cursor.value.getMonth() + delta, 1);
}

function updateRect() {
    if (triggerRef.value) rect.value = computeFloatingRect(triggerRef.value, PANEL_HEIGHT, 4, PANEL_WIDTH);
}

function toggle() {
    open.value = !open.value;
    if (open.value) nextTick(updateRect);
}

function select(iso: string) {
    emit("update:modelValue", iso);
    open.value = false;
}

function onClickOutside(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (rootRef.value?.contains(target)) return;
    if (target.closest?.(".vibe-ui-datepicker-panel")) return;
    open.value = false;
}
onMounted(() => {
    document.addEventListener("click", onClickOutside);
    window.addEventListener("scroll", updateRect, true);
    window.addEventListener("resize", updateRect);
});
onBeforeUnmount(() => {
    document.removeEventListener("click", onClickOutside);
    window.removeEventListener("scroll", updateRect, true);
    window.removeEventListener("resize", updateRect);
});
</script>

<template>
    <div ref="rootRef" class="relative inline-block w-full text-sm">
        <input
            ref="triggerRef"
            readonly
            :value="modelValue"
            :placeholder="placeholder ?? 'Выберите дату'"
            class="focus:ring-primary-500 w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2"
            @click="toggle" />

        <!-- Teleport + fixed-позиционирование: панель сама разворачивается вверх,
         если снизу не хватает места (например, у DatePicker в самом низу формы),
         и поджимается по горизонтали, если вылезает за правый край экрана. -->
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
