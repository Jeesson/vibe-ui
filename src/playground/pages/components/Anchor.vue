<script setup lang="ts">
import { computed, ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Anchor from "../../../components/Anchor/Anchor.vue";
import AnchorLink from "../../../components/Anchor/AnchorLink.vue";
import Scrollbar from "../../../components/Scrollbar/Scrollbar.vue";
const doc = docs.anchor;

// The actual scrolling element is the Scrollbar root (overflow-auto),
// not the inner div, so expose it as the Anchor container.
const scrollbarRef = ref<InstanceType<typeof Scrollbar> | null>(null);
const container = computed<HTMLElement | null>(() => scrollbarRef.value?.rootEl ?? null);

const markerTypes = ["default", "fill", "dot"] as const;

function handleClick(event: MouseEvent) {
    event.preventDefault();
}
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_240px]">
                <div class="relative">
                    <div
                        class="pointer-events-none absolute z-10 flex h-8 w-3/4 items-center rounded-md bg-gray-900 px-3 text-[11px] font-semibold tracking-wide text-white uppercase dark:bg-gray-100">
                        Fixed top block
                    </div>
                    <Scrollbar ref="scrollbarRef" max-height="640px" class="mt-10">
                        <div class="rounded-md">
                            <section
                                id="anchor-1"
                                class="flex h-64 items-start rounded-md border border-red-300 bg-red-200 p-4 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
                                <span>part1</span>
                            </section>
                            <section
                                id="anchor-2"
                                class="mt-4 flex h-64 items-start rounded-md border border-green-300 bg-green-200 p-4 text-sm font-medium text-green-700 dark:border-green-900 dark:bg-green-950/50 dark:text-green-300">
                                <span>part2</span>
                            </section>
                            <section
                                id="anchor-3"
                                class="mt-4 flex h-32 items-start rounded-md border border-blue-300 bg-blue-200 p-4 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
                                <span>part3</span>
                            </section>
                            <section
                                id="anchor-4"
                                class="mt-4 flex h-64 items-start rounded-md border border-amber-300 bg-amber-200 p-4 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
                                <span>part4</span>
                            </section>
                            <section
                                id="anchor-5"
                                class="mt-4 flex h-32 items-start rounded-md border border-cyan-300 bg-cyan-200 p-4 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
                                <span>part5</span>
                            </section>
                            <section
                                id="anchor-6"
                                class="mt-4 flex h-64 items-start rounded-md border border-fuchsia-300 bg-fuchsia-200 p-4 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
                                <span>part6</span>
                            </section>
                        </div>
                    </Scrollbar>
                </div>
                <div class="space-y-3">
                    <!-- All three marker types track the same scroll container
                         side by side, so the difference is visible at once. -->
                    <div
                        v-for="t in markerTypes"
                        :key="t"
                        class="rounded-md border border-zinc-200 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-900">
                        <p class="mb-1.5 text-[11px] font-semibold tracking-wide text-gray-400 uppercase">{{ t }}</p>
                        <Anchor
                            :container="container"
                            direction="vertical"
                            :type="t"
                            :offset="40"
                            :visible-ratio="0.5"
                            @click="handleClick">
                            <AnchorLink href="#anchor-1" title="part1" />
                            <AnchorLink href="#anchor-2" title="part2" />
                            <AnchorLink href="#anchor-3" title="part3" />
                            <AnchorLink href="#anchor-4" title="part4" />
                            <AnchorLink href="#anchor-5" title="part5" />
                            <AnchorLink href="#anchor-6" title="part6" />
                        </Anchor>
                    </div>
                    <p class="text-xs leading-5 text-gray-500 dark:text-gray-400">
                        Scroll the panel: sections visible ≥50% are active. <b>default</b> stretches the bar over the active range,
                        <b>fill</b> gives every active link a pill, <b>dot</b> pins a dot to the topmost active link.
                    </p>
                </div>
            </div>
        </template>
    </ComponentDoc>
</template>
