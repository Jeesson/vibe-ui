<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, onUpdated } from "vue";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/vue/24/outline";

const props = withDefaults(defineProps<{ autoplay?: boolean; interval?: number }>(), { autoplay: false, interval: 3000 });

// Slide count is computed from real DOM children: if slides are passed via
// v-for, the slot yields a single Fragment vnode resulting in count = 1.
const trackRef = ref<HTMLElement | null>(null);
const count = ref(0);

function measure() {
    if (trackRef.value) count.value = trackRef.value.children.length;
}

const active = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

function go(i: number) {
    if (!count.value) return;
    active.value = (i + count.value) % count.value;
}
function next() {
    go(active.value + 1);
}
function prev() {
    go(active.value - 1);
}

onMounted(() => {
    measure();
    if (props.autoplay) timer = setInterval(next, props.interval);
});
onUpdated(measure);
onBeforeUnmount(() => timer && clearInterval(timer));
</script>

<template>
    <div class="relative overflow-hidden rounded-md">
        <div
            ref="trackRef"
            class="flex transition-transform duration-300 ease-in-out *:w-full *:shrink-0"
            :style="{ transform: `translateX(-${active * 100}%)` }">
            <slot />
        </div>

        <button
            type="button"
            class="absolute top-1/2 left-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-600 shadow hover:bg-white"
            @click="prev">
            <ChevronLeftIcon class="h-3 w-3" />
        </button>
        <button
            type="button"
            class="absolute top-1/2 right-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-600 shadow hover:bg-white"
            @click="next">
            <ChevronRightIcon class="h-3 w-3" />
        </button>

        <div class="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            <button
                v-for="i in count"
                :key="i"
                type="button"
                class="h-1.5 rounded-full transition-all"
                :class="active === i - 1 ? 'w-4 bg-white' : 'w-1.5 bg-white/60'"
                @click="go(i - 1)" />
        </div>
    </div>
</template>
