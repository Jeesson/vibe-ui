<script setup lang="ts">
import { watch, onBeforeUnmount, computed } from "vue";
import {
    lockBodyScroll,
    unlockBodyScroll,
} from "../../composables/scroll-lock";

const props = withDefaults(
    defineProps<{
        modelValue: boolean;
        title?: string;
        placement?: "left" | "right" | "top" | "bottom";
        size?: string;
    }>(),
    { placement: "right", size: "360px" },
);

const emit = defineEmits<{ "update:modelValue": [boolean]; close: [] }>();

function close() {
    emit("update:modelValue", false);
    emit("close");
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

// Реактивно — placement может меняться, пока Drawer остаётся смонтированным
// (например, демо переключает стороны одной и той же панелью).
const isVertical = computed(
    () => props.placement === "top" || props.placement === "bottom",
);

const panelPosition = {
    left: "left-0 top-0 h-full",
    right: "right-0 top-0 h-full",
    top: "top-0 left-0 w-full",
    bottom: "bottom-0 left-0 w-full",
};
</script>

<template>
    <Teleport to="body">
        <!-- Один Transition: вложенный Transition не анимируется, если он
         монтируется одновременно со своим ребёнком (оба v-if по modelValue) —
         enter-хуки внутреннего просто не вызываются. Анимация панели
         описана в CSS через потомков (.my-ui-drawer-panel). -->
        <Transition name="my-ui-drawer">
            <div
                v-if="modelValue"
                class="fixed inset-0 z-50 bg-black/40"
                @click.self="close"
            >
                <div
                    class="my-ui-drawer-panel fixed flex flex-col bg-white shadow-xl will-change-transform"
                    :data-placement="placement"
                    :class="panelPosition[placement]"
                    :style="isVertical ? { height: size } : { width: size }"
                >
                    <div
                        class="flex items-center justify-between border-b border-gray-100 px-5 py-4"
                    >
                        <h3 class="text-base font-semibold text-gray-900">
                            {{ title }}
                        </h3>
                        <button
                            type="button"
                            class="text-gray-400 hover:text-gray-600"
                            aria-label="Закрыть"
                            @click="close"
                        >
                            ✕
                        </button>
                    </div>
                    <div
                        class="flex-1 overflow-auto px-5 py-4 text-sm text-gray-700"
                    >
                        <slot />
                    </div>
                    <div
                        v-if="$slots.footer"
                        class="flex justify-end gap-2 border-t border-gray-100 px-5 py-3"
                    >
                        <slot name="footer" />
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style>
.my-ui-drawer-enter-active,
.my-ui-drawer-leave-active {
    transition: opacity 0.28s ease;
}
.my-ui-drawer-enter-from,
.my-ui-drawer-leave-to {
    opacity: 0;
}

.my-ui-drawer-enter-active .my-ui-drawer-panel,
.my-ui-drawer-leave-active .my-ui-drawer-panel {
    transition: transform 0.28s cubic-bezier(0.32, 0.72, 0, 1);
}
.my-ui-drawer-enter-from .my-ui-drawer-panel[data-placement="right"],
.my-ui-drawer-leave-to .my-ui-drawer-panel[data-placement="right"] {
    transform: translateX(100%);
}
.my-ui-drawer-enter-from .my-ui-drawer-panel[data-placement="left"],
.my-ui-drawer-leave-to .my-ui-drawer-panel[data-placement="left"] {
    transform: translateX(-100%);
}
.my-ui-drawer-enter-from .my-ui-drawer-panel[data-placement="top"],
.my-ui-drawer-leave-to .my-ui-drawer-panel[data-placement="top"] {
    transform: translateY(-100%);
}
.my-ui-drawer-enter-from .my-ui-drawer-panel[data-placement="bottom"],
.my-ui-drawer-leave-to .my-ui-drawer-panel[data-placement="bottom"] {
    transform: translateY(100%);
}
</style>
