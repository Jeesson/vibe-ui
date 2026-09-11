<script setup lang="ts">
import { useFloatingPanel } from "../../composables/use-floating-panel";

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ "update:modelValue": [string] }>();

const { open, triggerRef, rect, togglePanel } = useFloatingPanel(
    "my-ui-colorpicker-panel",
    180,
    208,
);

const presets = [
    "#185FA5",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#111827",
];

function apply(value: string) {
    emit("update:modelValue", value);
}
</script>

<template>
    <div class="inline-block">
        <button
            ref="triggerRef"
            type="button"
            class="h-8 w-8 rounded-md border border-gray-300 shadow-sm"
            :style="{ backgroundColor: modelValue }"
            @click="togglePanel"
        />
        <Teleport to="body">
            <div
                v-if="open && rect"
                class="my-ui-colorpicker-panel fixed z-[70] w-52 rounded-md border border-gray-200 bg-white p-3 shadow-lg"
                :style="{
                    top: rect.top + 'px',
                    left: rect.left + 'px',
                    transform:
                        rect.placement === 'top'
                            ? 'translateY(-100%)'
                            : undefined,
                }"
            >
                <input
                    type="color"
                    :value="modelValue"
                    class="h-8 w-full cursor-pointer rounded border-0"
                    @input="apply(($event.target as HTMLInputElement).value)"
                />
                <input
                    :value="modelValue"
                    class="focus:ring-primary-500 mt-2 w-full rounded-md border border-gray-300 px-2 py-1 font-mono text-xs outline-none focus:ring-2"
                    @change="apply(($event.target as HTMLInputElement).value)"
                />
                <div class="mt-2 flex flex-wrap gap-1.5">
                    <button
                        v-for="c in presets"
                        :key="c"
                        type="button"
                        class="h-5 w-5 rounded border border-gray-200"
                        :style="{ backgroundColor: c }"
                        @click="apply(c)"
                    />
                </div>
            </div>
        </Teleport>
    </div>
</template>
