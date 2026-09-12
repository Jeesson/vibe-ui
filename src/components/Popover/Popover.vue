<script setup lang="ts">
import { useFloatingPanel } from "../../composables/use-floating-panel";

withDefaults(defineProps<{ title?: string }>(), {});

const { open, triggerRef, rect, togglePanel, closePanel } = useFloatingPanel(
    "complex-ui-popover-panel",
    160,
    220,
);

defineExpose({ close: closePanel });
</script>

<template>
    <span ref="triggerRef" class="inline-block" @click="togglePanel">
        <slot name="trigger" />
    </span>
    <Teleport to="body">
        <Transition name="complex-ui-tooltip-fade">
            <div
                v-if="open && rect"
                class="complex-ui-popover-panel fixed z-70 min-w-50 rounded-md border border-gray-200 bg-white p-3 text-sm shadow-lg"
                :style="{
                    top: rect.top + 'px',
                    left: rect.left + 'px',
                    transform:
                        rect.placement === 'top'
                            ? 'translateY(-100%)'
                            : undefined,
                }"
            >
                <p v-if="title" class="mb-1 font-medium text-gray-900">
                    {{ title }}
                </p>
                <slot />
            </div>
        </Transition>
    </Teleport>
</template>

<style>
.complex-ui-tooltip-fade-enter-active,
.complex-ui-tooltip-fade-leave-active {
    transition: opacity 0.1s ease;
}
.complex-ui-tooltip-fade-enter-from,
.complex-ui-tooltip-fade-leave-to {
    opacity: 0;
}
</style>
