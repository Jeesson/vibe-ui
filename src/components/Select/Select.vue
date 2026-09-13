<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import {
    computeFloatingRect,
    type FloatingRect,
} from "../../composables/floating";

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
    }>(),
    { placeholder: "Выберите", disabled: false, clearable: false },
);

const emit = defineEmits<{
    "update:modelValue": [string | number | null];
    change: [string | number | null];
}>();

const open = ref(false);
const rootRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
const rect = ref<FloatingRect | null>(null);

const selectedLabel = computed(
    () => props.options.find((o) => o.value === props.modelValue)?.label ?? "",
);

function updateRect() {
    if (triggerRef.value)
        rect.value = computeFloatingRect(triggerRef.value, 240);
}

function toggle() {
    if (props.disabled) return;
    open.value = !open.value;
    if (open.value) nextTick(updateRect);
}

function select(option: SelectOption) {
    if (option.disabled) return;
    emit("update:modelValue", option.value);
    emit("change", option.value);
    open.value = false;
}

function clear(e: Event) {
    e.stopPropagation();
    emit("update:modelValue", null);
    emit("change", null);
}

function onClickOutside(e: MouseEvent) {
    const target = e.target as Node;
    if (rootRef.value?.contains(target)) return;
    if ((e.target as HTMLElement)?.closest?.(".vibe-ui-select-panel"))
        return;
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
        <button
            ref="triggerRef"
            type="button"
            :disabled="disabled"
            :class="[
                'flex w-full items-center justify-between rounded-md border px-3 py-2 text-left transition-colors',
                'focus:ring-primary-500 focus:border-primary-500 focus:ring-2',
                disabled
                    ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                    : 'cursor-pointer bg-white',
                'border-gray-300',
            ]"
            @click="toggle"
        >
            <span :class="!selectedLabel && 'text-gray-400'">
                {{ selectedLabel || placeholder }}
            </span>
            <span class="flex items-center gap-1">
                <span
                    v-if="clearable && modelValue !== null"
                    class="text-gray-400 hover:text-gray-600"
                    @click="clear"
                    >✕</span
                >
                <span class="text-gray-400" :class="open && 'rotate-180'"
                    >▾</span
                >
            </span>
        </button>

        <!--
      Teleport в body + position:fixed, координаты посчитаны от триггера.
      Раньше список был position:absolute внутри самого компонента — если Select
      стоял в форме внутри Dialog (у которого overflow-auto), браузер прокручивал
      сам Dialog, чтобы "вместить" абсолютно спозиционированный список. Теперь
      список живёт вне скроллящегося контейнера и не влияет на его scrollHeight.
    -->
        <Teleport to="body">
            <ul
                v-if="open && rect"
                class="vibe-ui-select-panel fixed z-70 max-h-60 overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg"
                :style="{
                    top: rect.top + 'px',
                    left: rect.left + 'px',
                    width: rect.width + 'px',
                    transform:
                        rect.placement === 'top'
                            ? 'translateY(-100%)'
                            : undefined,
                }"
            >
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
                    @click="select(option)"
                >
                    {{ option.label }}
                </li>
                <li v-if="!options.length" class="px-3 py-2 text-gray-400">
                    Нет данных
                </li>
            </ul>
        </Teleport>
    </div>
</template>
