<script setup lang="ts">
import { ref, watch, nextTick } from "vue";

const props = withDefaults(defineProps<{ modelValue: string; length?: number }>(), { length: 6 });
const emit = defineEmits<{
    "update:modelValue": [string];
    complete: [string];
}>();

const boxes = ref<HTMLInputElement[]>([]);
const digits = ref<string[]>(Array.from({ length: props.length }, (_, i) => props.modelValue[i] ?? ""));

watch(
    () => props.modelValue,
    (value) => {
        digits.value = Array.from({ length: props.length }, (_, i) => value[i] ?? "");
    },
);

function emitValue() {
    const value = digits.value.join("");
    emit("update:modelValue", value);
    if (value.length === props.length && !value.includes("")) emit("complete", value);
}

function onInput(i: number, e: Event) {
    const raw = (e.target as HTMLInputElement).value;
    const char = raw.replace(/\D/g, "").slice(-1);
    digits.value[i] = char;
    emitValue();
    if (char && i < props.length - 1) nextTick(() => boxes.value[i + 1]?.focus());
}

function onKeydown(i: number, e: KeyboardEvent) {
    if (e.key === "Backspace" && !digits.value[i] && i > 0) {
        boxes.value[i - 1]?.focus();
    }
}

function onPaste(e: ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData?.getData("text").replace(/\D/g, "") ?? "";
    digits.value = Array.from({ length: props.length }, (_, i) => text[i] ?? "");
    emitValue();
    nextTick(() => boxes.value[Math.min(text.length, props.length - 1)]?.focus());
}
</script>

<template>
    <div class="flex gap-2" @paste="onPaste">
        <input
            v-for="(digit, i) in digits"
            :key="i"
            :ref="(el) => (boxes[i] = el as HTMLInputElement)"
            :value="digit"
            inputmode="numeric"
            maxlength="1"
            class="focus:ring-primary-500 focus:border-primary-500 h-11 w-9 rounded-md border border-gray-300 text-center text-lg outline-none focus:ring-2"
            @input="onInput(i, $event)"
            @keydown="onKeydown(i, $event)" />
    </div>
</template>
