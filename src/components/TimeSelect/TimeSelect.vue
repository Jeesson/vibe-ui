<script setup lang="ts">
import { computed } from "vue";
import { useFloatingPanel } from "../../composables/use-floating-panel";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";

const props = withDefaults(
    defineProps<{
        modelValue: string | null;
        start?: string;
        end?: string;
        step?: number;
        placeholder?: string;
    }>(),
    { start: "09:00", end: "18:00", step: 30 },
);

const emit = defineEmits<{ "update:modelValue": [string] }>();

const { open, triggerRef, rect, togglePanel, closePanel } = useFloatingPanel("vibe-ui-timeselect-panel", 220);

const slots = computed(() => {
    const [sh, sm] = props.start.split(":").map(Number);
    const [eh, em] = props.end.split(":").map(Number);
    let mins = sh * 60 + sm;
    const endMins = eh * 60 + em;
    const result: string[] = [];
    while (mins <= endMins) {
        const h = String(Math.floor(mins / 60)).padStart(2, "0");
        const m = String(mins % 60).padStart(2, "0");
        result.push(`${h}:${m}`);
        mins += props.step;
    }
    return result;
});

function select(v: string) {
    emit("update:modelValue", v);
    closePanel();
}
</script>

<template>
    <div class="relative inline-block w-full text-sm">
        <button
            ref="triggerRef"
            type="button"
            class="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left"
            @click="togglePanel">
            <span :class="!modelValue && 'text-gray-400'">
                {{ modelValue || placeholder || "Select time" }}
            </span>
            <ChevronDownIcon class="h-4 w-4 text-gray-400" />
        </button>
        <Teleport to="body">
            <ul
                v-if="open && rect"
                class="vibe-ui-timeselect-panel fixed z-70 max-h-52 overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg"
                :style="{
                    top: rect.top + 'px',
                    left: rect.left + 'px',
                    width: rect.width + 'px',
                    transform: rect.placement === 'top' ? 'translateY(-100%)' : undefined,
                }">
                <li
                    v-for="slot in slots"
                    :key="slot"
                    :class="['cursor-pointer px-3 py-1.5 hover:bg-gray-50', slot === modelValue && 'bg-primary-50 text-primary-700']"
                    @click="select(slot)">
                    {{ slot }}
                </li>
            </ul>
        </Teleport>
    </div>
</template>
