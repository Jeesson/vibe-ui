<script setup lang="ts">
import { computed } from "vue";
import { useFloatingPanel } from "../../composables/use-floating-panel";

export interface SelectOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}

const props = withDefaults(
    defineProps<{
        modelValue: string | number | null;
        options: SelectOption[];
        placeholder?: string;
        disabled?: boolean;
        clearable?: boolean;
        emptyText?: string;
    }>(),
    { placeholder: "Select", disabled: false, clearable: false, emptyText: "No data" },
);

const emit = defineEmits<{
    "update:modelValue": [string | number | null];
    change: [string | number | null];
}>();

// Teleported panel: useFloatingPanel owns positioning, outside-click and resize/scroll tracking.
const { open, triggerRef, rect, togglePanel, closePanel } = useFloatingPanel("vibe-ui-select-panel", 240);

const selectedLabel = computed(() => props.options.find((o) => o.value === props.modelValue)?.label ?? "");

function toggle() {
    if (props.disabled) return;
    togglePanel();
}

function select(option: SelectOption) {
    if (option.disabled) return;
    emit("update:modelValue", option.value);
    emit("change", option.value);
    closePanel();
}

function clear(e: Event) {
    e.stopPropagation();
    emit("update:modelValue", null);
    emit("change", null);
}
</script>

<template>
    <div class="relative inline-block w-full text-sm">
        <button
            ref="triggerRef"
            type="button"
            :disabled="disabled"
            :class="[
                'flex w-full items-center justify-between rounded-md border px-3 py-2 text-left transition-colors',
                'focus:ring-primary-500 focus:border-primary-500 focus:ring-2',
                disabled ? 'cursor-not-allowed bg-gray-100 text-gray-400' : 'cursor-pointer bg-white',
                'border-gray-300',
            ]"
            @click="toggle">
            <span :class="!selectedLabel && 'text-gray-400'">
                {{ selectedLabel || placeholder }}
            </span>
            <span class="flex items-center gap-1">
                <span v-if="clearable && modelValue !== null" class="text-gray-400 hover:text-gray-600" @click="clear">✕</span>
                <span class="text-gray-400" :class="open && 'rotate-180'">▾</span>
            </span>
        </button>

        <!-- Teleport to body + position: fixed, coordinates calculated from trigger.
        Prevents scrolling container expansion when nested inside modals/dialogs. -->
        <Teleport to="body">
            <ul
                v-if="open && rect"
                class="vibe-ui-select-panel fixed z-70 max-h-60 overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg"
                :style="{
                    top: rect.top + 'px',
                    left: rect.left + 'px',
                    width: rect.width + 'px',
                    transform: rect.placement === 'top' ? 'translateY(-100%)' : undefined,
                }">
                <li
                    v-for="option in options"
                    :key="option.value"
                    :class="[
                        'cursor-pointer px-3 py-2',
                        option.disabled
                            ? 'cursor-not-allowed text-gray-300'
                            : option.value === modelValue
                              ? 'bg-primary-50 text-primary-700'
                              : 'hover:bg-gray-50',
                    ]"
                    @click="select(option)">
                    {{ option.label }}
                </li>
                <li v-if="!options.length" class="px-3 py-2 text-gray-400">{{ emptyText }}</li>
            </ul>
        </Teleport>
    </div>
</template>
