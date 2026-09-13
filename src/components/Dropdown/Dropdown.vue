<script setup lang="ts">
import { useFloatingPanel } from "../../composables/use-floating-panel";
import type { PanelPlacement } from "../../composables/floating";

export interface DropdownItem {
    label: string;
    value: string;
    disabled?: boolean;
    danger?: boolean;
}

const props = withDefaults(
    defineProps<{
        items: DropdownItem[];
        // Шесть позиционок: сторона (top/bottom) × выравнивание (start/центр/end).
        // Если выбранной стороне не хватает места на экране — панель сама
        // переворачивается на противоположную.
        placement?: PanelPlacement;
    }>(),
    { placement: "bottom-start" },
);
const emit = defineEmits<{ select: [string] }>();

const { open, triggerRef, rect, togglePanel, closePanel } = useFloatingPanel(
    "vibe-ui-dropdown-panel",
    200,
    160,
    () => props.placement,
);

function select(item: DropdownItem) {
    if (item.disabled) return;
    emit("select", item.value);
    closePanel();
}
</script>

<template>
    <span ref="triggerRef" class="inline-block" @click="togglePanel">
        <slot />
    </span>
    <Teleport to="body">
        <ul
            v-if="open && rect"
            class="vibe-ui-dropdown-panel fixed z-70 min-w-40 rounded-md border border-gray-200 bg-white py-1 shadow-lg"
            :style="{
                top: rect.top + 'px',
                left: rect.left + 'px',
                transform:
                    rect.placement === 'top' ? 'translateY(-100%)' : undefined,
            }"
        >
            <li
                v-for="item in items"
                :key="item.value"
                :class="[
                    'cursor-pointer px-3 py-2 text-sm',
                    item.disabled
                        ? 'cursor-not-allowed text-gray-300'
                        : item.danger
                          ? 'text-red-600 hover:bg-red-50'
                          : 'text-gray-700 hover:bg-gray-50',
                ]"
                @click="select(item)"
            >
                {{ item.label }}
            </li>
        </ul>
    </Teleport>
</template>
