<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(
    defineProps<{ modelValue: File[]; multiple?: boolean; accept?: string }>(),
    {
        multiple: true,
    },
);
const emit = defineEmits<{ "update:modelValue": [File[]] }>();

const dragging = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list);
    emit(
        "update:modelValue",
        props.multiple
            ? [...props.modelValue, ...incoming]
            : incoming.slice(0, 1),
    );
}

function onDrop(e: DragEvent) {
    dragging.value = false;
    addFiles(e.dataTransfer?.files ?? null);
}

function removeFile(i: number) {
    emit(
        "update:modelValue",
        props.modelValue.filter((_, idx) => idx !== i),
    );
}

function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
</script>

<template>
    <div>
        <div
            :class="[
                'flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed px-6 py-8 text-center transition-colors',
                dragging
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-gray-400',
            ]"
            @click="inputRef?.click()"
            @dragover.prevent="dragging = true"
            @dragleave.prevent="dragging = false"
            @drop.prevent="onDrop"
        >
            <span class="text-sm text-gray-600"
                >Перетащи файлы сюда или нажми, чтобы выбрать</span
            >
            <span class="text-xs text-gray-400">{{
                accept ?? "Любые файлы"
            }}</span>
            <input
                ref="inputRef"
                type="file"
                class="hidden"
                :multiple="multiple"
                :accept="accept"
                @change="addFiles(($event.target as HTMLInputElement).files)"
            />
        </div>

        <ul v-if="modelValue.length" class="mt-2 flex flex-col gap-1">
            <li
                v-for="(file, i) in modelValue"
                :key="file.name + i"
                class="flex items-center justify-between rounded-md border border-gray-100 px-3 py-1.5 text-sm"
            >
                <span class="truncate text-gray-700">{{ file.name }}</span>
                <span class="flex items-center gap-2 text-gray-400">
                    {{ formatSize(file.size) }}
                    <button
                        type="button"
                        class="hover:text-red-500"
                        @click="removeFile(i)"
                    >
                        ✕
                    </button>
                </span>
            </li>
        </ul>
    </div>
</template>
