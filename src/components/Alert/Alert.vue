<script setup lang="ts">
import { ref } from "vue";
import { XCircleIcon } from "@heroicons/vue/24/outline";

withDefaults(
    defineProps<{
        type?: "success" | "warning" | "danger" | "info";
        title?: string;
        closable?: boolean;
    }>(),
    { type: "info", closable: false },
);
const emit = defineEmits<{ close: [] }>();

const visible = ref(true);
function close() {
    visible.value = false;
    emit("close");
}

const typeClasses = {
    success: "bg-green-50 text-green-800 border-green-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    danger: "bg-red-50 text-red-800 border-red-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
};
</script>

<template>
    <div
        v-if="visible"
        :class="[
            'flex items-start justify-between gap-3 rounded-md border px-4 py-3 text-sm',
            typeClasses[type],
        ]"
    >
        <div class="flex flex-col gap-0.5">
            <p v-if="title" class="font-medium">{{ title }}</p>
            <p><slot /></p>
        </div>
        <button
            v-if="closable"
            type="button"
            class="opacity-60 hover:opacity-100"
            @click="close"
        >
            <XCircleIcon class="h-5 w-5" />
        </button>
    </div>
</template>
