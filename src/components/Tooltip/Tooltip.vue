<script setup lang="ts">
import { ref } from "vue";

withDefaults(
    defineProps<{
        content: string;
        placement?: "top" | "bottom" | "left" | "right";
    }>(),
    { placement: "top" },
);

const visible = ref(false);

const placementClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
};
</script>

<template>
    <span
        class="relative inline-block"
        @mouseenter="visible = true"
        @mouseleave="visible = false"
    >
        <slot />
        <Transition name="complex-ui-tooltip-fade">
            <span
                v-if="visible"
                :class="[
                    'absolute z-20 rounded-md bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg',
                    placementClasses[placement],
                ]"
            >
                {{ content }}
            </span>
        </Transition>
    </span>
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
