<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = withDefaults(
    defineProps<{
        src: string;
        alt?: string;
        fit?: "cover" | "contain" | "fill";
        lazy?: boolean;
        previewable?: boolean;
    }>(),
    { fit: "cover", lazy: true, previewable: false },
);

const containerRef = ref<HTMLElement | null>(null);
const shouldLoad = ref(!props.lazy);
const loaded = ref(false);
const errored = ref(false);
const previewOpen = ref(false);

let observer: IntersectionObserver | null = null;

onMounted(() => {
    if (!props.lazy || !containerRef.value) return;
    observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                shouldLoad.value = true;
                observer?.disconnect();
            }
        },
        { rootMargin: "100px" },
    );
    observer.observe(containerRef.value);
});
onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
    <div
        ref="containerRef"
        class="relative inline-block overflow-hidden bg-gray-100"
    >
        <img
            v-if="shouldLoad && !errored"
            :src="src"
            :alt="alt"
            :style="{ objectFit: fit }"
            class="h-full w-full transition-opacity duration-300"
            :class="[
                loaded ? 'opacity-100' : 'opacity-0',
                previewable && 'cursor-zoom-in',
            ]"
            @load="loaded = true"
            @error="errored = true"
            @click="previewable && (previewOpen = true)"
        />
        <div
            v-if="!loaded || errored"
            class="absolute inset-0 flex items-center justify-center text-gray-300"
        >
            <span v-if="errored" class="text-xs">Не удалось загрузить</span>
            <svg
                v-else
                viewBox="0 0 24 24"
                class="h-6 w-6 animate-pulse"
                fill="currentColor"
            >
                <path
                    d="M4 5h16v14H4V5zm2 2v10h12V7H6zm2 8l3-4 2 2 3-4 3 6H8z"
                />
            </svg>
        </div>

        <Teleport to="body">
            <Transition name="my-ui-image-preview">
                <div
                    v-if="previewOpen"
                    class="fixed inset-0 z-100 flex items-center justify-center bg-black/80"
                    @click="previewOpen = false"
                >
                    <img
                        :src="src"
                        :alt="alt"
                        class="max-h-[90vh] max-w-[90vw] object-contain"
                    />
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style>
.my-ui-image-preview-enter-active,
.my-ui-image-preview-leave-active {
    transition: opacity 0.2s ease;
}
.my-ui-image-preview-enter-active img,
.my-ui-image-preview-leave-active img {
    transition: transform 0.2s ease;
}
.my-ui-image-preview-enter-from,
.my-ui-image-preview-leave-to {
    opacity: 0;
}
.my-ui-image-preview-enter-from img,
.my-ui-image-preview-leave-to img {
    transform: scale(0.96);
}
</style>
