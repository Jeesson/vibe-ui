<script setup lang="ts">
import {
    ref,
    computed,
    watch,
    onMounted,
    onBeforeUnmount,
    nextTick,
} from "vue";
import {
    ChevronDownIcon,
    ChevronRightIcon,
} from "@heroicons/vue/24/outline";
import Scrollbar from "../Scrollbar/Scrollbar.vue";
import {
    computeFloatingRect,
    type FloatingRect,
} from "../../composables/floating";

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

const open = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const rect = ref<FloatingRect | null>(null);
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

function updateRect() {
    if (triggerRef.value)
        rect.value = computeFloatingRect(
            triggerRef.value,
            260,
            4,
            columns.value.length * COLUMN_WIDTH,
        );
}
// Число колонок растёт по мере раскрытия дерева — пересчитываем позицию/ширину панели.
watch(columns, () => open.value && nextTick(updateRect));

function toggle() {
    open.value = !open.value;
    if (open.value) nextTick(updateRect);
}

function hover(depth: number, option: CascaderOption) {
    activePath.value = [...activePath.value.slice(0, depth), option];
    if (!option.children?.length) {
        emit(
            "update:modelValue",
            activePath.value.map((o) => o.value),
        );
        open.value = false;
        activePath.value = [];
    }
}

function onClickOutside(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (triggerRef.value?.contains(target)) return;
    if (target.closest?.(".vibe-ui-cascader-panel")) return;
    open.value = false;
    activePath.value = [];
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
    <div class="relative inline-block w-full text-sm">
        <button
            ref="triggerRef"
            type="button"
            class="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left"
            @click="toggle"
        >
            <span :class="!displayLabel && 'text-gray-400'">
                {{ displayLabel || placeholder || "Выберите" }}
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
                    transform:
                        rect.placement === 'top'
                            ? 'translateY(-100%)'
                            : undefined,
                }"
            >
                <Scrollbar
                    v-for="(col, depth) in columns"
                    :key="depth"
                    max-height="15rem"
                    class="border-r border-gray-100 last:border-r-0"
                    :style="{ width: COLUMN_WIDTH + 'px' }"
                >
                    <ul class="py-1">
                        <li
                            v-for="option in col"
                            :key="option.value"
                            :class="[
                                'flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-gray-50',
                                activePath[depth]?.value === option.value &&
                                    'bg-primary-50 text-primary-700',
                            ]"
                            @click="hover(depth, option)"
                        >
                            {{ option.label }}
                            <ChevronRightIcon
                                v-if="option.children?.length"
                                class="h-4 w-4 text-gray-300"
                                aria-hidden="true"
                            />
                        </li>
                    </ul>
                </Scrollbar>
            </div>
        </Teleport>
    </div>
</template>
