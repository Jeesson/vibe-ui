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
    top: "vibe-ui-tooltip--top bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "vibe-ui-tooltip--bottom top-full left-1/2 -translate-x-1/2 mt-2",
    left: "vibe-ui-tooltip--left right-full top-1/2 -translate-y-1/2 mr-2",
    right: "vibe-ui-tooltip--right left-full top-1/2 -translate-y-1/2 ml-2",
};
</script>

<template>
    <span
        class="relative inline-block"
        @mouseenter="visible = true"
        @mouseleave="visible = false"
    >
        <slot />
        <Transition name="vibe-ui-tooltip-fade">
            <span
                v-if="visible"
                :class="[
                    'vibe-ui-tooltip absolute z-20 rounded-md bg-gray-800 px-3 py-2 text-xs whitespace-nowrap text-white shadow-lg dark:bg-zinc-950 dark:text-white',
                    placementClasses[placement],
                ]"
            >
                {{ content }}
            </span>
        </Transition>
    </span>
</template>

<style>
.vibe-ui-tooltip-fade-enter-active,
.vibe-ui-tooltip-fade-leave-active {
    transition: opacity 0.1s ease;
}
.vibe-ui-tooltip-fade-enter-from,
.vibe-ui-tooltip-fade-leave-to {
    opacity: 0;
}

.vibe-ui-tooltip::after {
    position: absolute;
    content: "";
}
.vibe-ui-tooltip--top::after {
    right: 0;
    bottom: -0.5rem;
    left: 0;
    height: 0.5rem;
}
.vibe-ui-tooltip--bottom::after {
    top: -0.5rem;
    right: 0;
    left: 0;
    height: 0.5rem;
}
.vibe-ui-tooltip--left::after {
    top: 0;
    right: -0.5rem;
    bottom: 0;
    width: 0.5rem;
}
.vibe-ui-tooltip--right::after {
    top: 0;
    bottom: 0;
    left: -0.5rem;
    width: 0.5rem;
}
</style>
