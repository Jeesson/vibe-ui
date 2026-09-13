<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { ArrowUpIcon } from "@heroicons/vue/24/outline";

const props = withDefaults(
    defineProps<{ visibilityHeight?: number; target?: string }>(),
    {
        visibilityHeight: 200,
    },
);

const visible = ref(false);

function getScrollEl(): HTMLElement | Window {
    if (props.target)
        return (
            (document.querySelector(props.target) as HTMLElement | null) ??
            window
        );
    return window;
}

function getScrollTop(el: HTMLElement | Window) {
    return el === window ? window.scrollY : (el as HTMLElement).scrollTop;
}

function onScroll() {
    visible.value = getScrollTop(getScrollEl()) >= props.visibilityHeight;
}

function scrollToTop() {
    const el = getScrollEl();
    if (el === window) window.scrollTo({ top: 0, behavior: "smooth" });
    else (el as HTMLElement).scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => getScrollEl().addEventListener("scroll", onScroll));
onBeforeUnmount(() => getScrollEl().removeEventListener("scroll", onScroll));
</script>

<template>
    <Transition name="vibe-ui-tooltip-fade">
        <button
            v-if="visible"
            type="button"
            aria-label="Наверх"
            class="hover:text-primary-600 fixed right-6 bottom-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-lg"
            @click="scrollToTop"
        >
            <ArrowUpIcon class="h-4 w-4" aria-hidden="true" />
        </button>
    </Transition>
</template>

<style>
.vibe-ui-tooltip-fade-enter-active,
.vibe-ui-tooltip-fade-leave-active {
    transition: opacity 0.15s ease;
}
.vibe-ui-tooltip-fade-enter-from,
.vibe-ui-tooltip-fade-leave-to {
    opacity: 0;
}
</style>
