<script setup lang="ts">
import { computed } from "vue";
import { useFloatingPanel } from "../../composables/use-floating-panel";

const props = withDefaults(
    defineProps<{
        modelValue: string;
        suggestions: string[];
        placeholder?: string;
        disabled?: boolean;
    }>(),
    { disabled: false },
);

const emit = defineEmits<{ "update:modelValue": [string]; select: [string] }>();

const { open, triggerRef, rect, openPanel, closePanel } = useFloatingPanel(
    "complex-ui-autocomplete-panel",
    240,
);

const filtered = computed(() => {
    const q = props.modelValue.trim().toLowerCase();
    if (!q) return props.suggestions.slice(0, 8);
    return props.suggestions
        .filter((s) => s.toLowerCase().includes(q))
        .slice(0, 8);
});

function onInput(e: Event) {
    emit("update:modelValue", (e.target as HTMLInputElement).value);
    openPanel();
}

function select(value: string) {
    emit("update:modelValue", value);
    emit("select", value);
    closePanel();
}
</script>

<template>
    <div class="w-full text-sm">
        <input
            ref="triggerRef"
            :value="modelValue"
            :placeholder="placeholder"
            :disabled="disabled"
            class="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 disabled:bg-gray-100"
            @input="onInput"
            @focus="openPanel"
        />
        <Teleport to="body">
            <ul
                v-if="open && filtered.length && rect"
                class="complex-ui-autocomplete-panel fixed z-[70] max-h-60 overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg"
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
                    v-for="item in filtered"
                    :key="item"
                    class="cursor-pointer px-3 py-2 hover:bg-gray-50"
                    @click="select(item)"
                >
                    {{ item }}
                </li>
            </ul>
        </Teleport>
    </div>
</template>
