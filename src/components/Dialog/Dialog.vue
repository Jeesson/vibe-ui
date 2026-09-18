<script setup lang="ts">
import { watch, onBeforeUnmount } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { lockBodyScroll, unlockBodyScroll } from "../../composables/scroll-lock";

const props = withDefaults(
    defineProps<{
        modelValue: boolean;
        title?: string;
        width?: string;
        closeOnClickOverlay?: boolean;
    }>(),
    { closeOnClickOverlay: true },
);

const emit = defineEmits<{ "update:modelValue": [boolean]; close: [] }>();

function close() {
    emit("update:modelValue", false);
    emit("close");
}

function onOverlayClick() {
    if (props.closeOnClickOverlay) close();
}

function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape" && props.modelValue) close();
}

watch(
    () => props.modelValue,
    (visible) => {
        if (visible) {
            lockBodyScroll();
            document.addEventListener("keydown", onKeydown);
        } else {
            unlockBodyScroll();
            document.removeEventListener("keydown", onKeydown);
        }
    },
);

onBeforeUnmount(() => {
    document.removeEventListener("keydown", onKeydown);
    if (props.modelValue) unlockBodyScroll();
});
</script>

<template>
    <Teleport to="body">
        <Transition name="vibe-ui-dialog-fade">
            <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="onOverlayClick">
                <div class="flex max-h-[85vh] flex-col rounded-lg bg-white shadow-xl" :style="{ width: width ?? '480px' }">
                    <div class="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                        <h3 class="text-base font-semibold text-gray-900">
                            {{ title }}
                        </h3>
                        <button type="button" class="text-gray-400 hover:text-gray-600" aria-label="Закрыть" @click="close">
                            <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                    <div class="overflow-auto px-5 py-4 text-sm text-gray-700">
                        <slot />
                    </div>
                    <div v-if="$slots.footer" class="flex justify-end gap-2 border-t border-gray-100 px-5 py-3">
                        <slot name="footer" />
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style>
.vibe-ui-dialog-fade-enter-active,
.vibe-ui-dialog-fade-leave-active {
    transition: opacity 0.15s ease;
}
.vibe-ui-dialog-fade-enter-from,
.vibe-ui-dialog-fade-leave-to {
    opacity: 0;
}
</style>
