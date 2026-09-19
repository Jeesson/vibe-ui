<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import Scrollbar from "../Scrollbar/Scrollbar.vue";
import { useFloatingPanel } from "../../composables/use-floating-panel";

export interface CascaderOption {
    label: string;
    value: string;
    children?: CascaderOption[];
}

const props = defineProps<{
    modelValue: string[];
    options: CascaderOption[];
    placeholder?: string;
}>();

const emit = defineEmits<{ "update:modelValue": [string[]] }>();

const COLUMN_WIDTH = 160;

const activePath = ref<CascaderOption[]>([]);

const columns = computed<CascaderOption[][]>(() => {
    const cols: CascaderOption[][] = [props.options];
    for (const node of activePath.value) {
        if (node.children?.length) cols.push(node.children);
    }
    return cols;
});

const displayLabel = computed(() => {
    if (!props.modelValue.length) return "";
    const labels: string[] = [];
    let list = props.options;
    for (const v of props.modelValue) {
        const found = list.find((o) => o.value === v);
        if (!found) break;
        labels.push(found.label);
        list = found.children ?? [];
    }
    return labels.join(" / ");
});

// Column count grows with the active path; useFloatingPanel owns positioning,
// outside-click and resize/scroll tracking. Width is a getter so the panel
// tracks the number of expanded columns.
const { open, triggerRef, rect, updateRect, togglePanel, closePanel } = useFloatingPanel(
    "vibe-ui-cascader-panel",
    260,
    () => columns.value.length * COLUMN_WIDTH,
);

// Recalculate panel position/width when the column tree changes.
watch(columns, () => open.value && nextTick(updateRect));
// Reset the active path on any external close (incl. backdrop / outside click).
watch(open, (isOpen) => {
    if (!isOpen) activePath.value = [];
});

function hover(depth: number, option: CascaderOption) {
    activePath.value = [...activePath.value.slice(0, depth), option];
    if (!option.children?.length) {
        emit(
            "update:modelValue",
            activePath.value.map((o) => o.value),
        );
        closePanel();
    }
}
</script>

<template>
    <div class="relative inline-block w-full text-sm">
        <button
            ref="triggerRef"
            type="button"
            class="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left"
            @click="togglePanel">
            <span :class="!displayLabel && 'text-gray-400'">
                {{ displayLabel || placeholder || "Select" }}
            </span>
            <ChevronDownIcon class="h-4 w-4 text-gray-400" aria-hidden="true" />
        </button>

        <Teleport to="body">
            <div
                v-if="open && rect"
                class="vibe-ui-cascader-panel fixed z-70 flex rounded-md border border-gray-200 bg-white shadow-lg"
                :style="{
                    top: rect.top + 'px',
                    left: rect.left + 'px',
                    transform: rect.placement === 'top' ? 'translateY(-100%)' : undefined,
                }">
                <Scrollbar
                    v-for="(col, depth) in columns"
                    :key="depth"
                    max-height="15rem"
                    class="border-r border-gray-100 last:border-r-0"
                    :style="{ width: COLUMN_WIDTH + 'px' }">
                    <ul class="py-1">
                        <li
                            v-for="option in col"
                            :key="option.value"
                            :class="[
                                'flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-gray-50',
                                activePath[depth]?.value === option.value && 'bg-primary-50 text-primary-700',
                            ]"
                            @click="hover(depth, option)">
                            {{ option.label }}
                            <ChevronRightIcon v-if="option.children?.length" class="h-4 w-4 text-gray-300" aria-hidden="true" />
                        </li>
                    </ul>
                </Scrollbar>
            </div>
        </Teleport>
    </div>
</template>
