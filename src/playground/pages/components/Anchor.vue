<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Anchor from "../../../components/Anchor/Anchor.vue";
import AnchorLink from "../../../components/Anchor/AnchorLink.vue";
const doc = docs.anchor;
const containerRef = ref<HTMLElement | null>(null);

function handleClick(event: MouseEvent) {
    event.preventDefault();
}
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_180px]">
                <div class="relative rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-950">
                    <div class="pointer-events-none absolute top-3 left-3 z-10 flex h-8 w-[70%] items-center rounded-md bg-gray-900 px-3 text-[11px] font-semibold tracking-wide text-white uppercase dark:bg-gray-700">
                        Fixed top block
                    </div>
                    <div ref="containerRef" class="mt-10 h-80 overflow-y-auto rounded-md border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
                        <section id="anchor-a" class="mt-4 flex h-64 items-start rounded-md border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200">
                            <span>part1</span>
                        </section>
                        <section id="anchor-b" class="mt-4 flex h-64 items-start rounded-md border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700 dark:border-green-900 dark:bg-green-950/50 dark:text-green-200">
                            <span>part2</span>
                        </section>
                        <section id="anchor-c" class="mt-4 flex h-64 items-start rounded-md border border-blue-200 bg-blue-50 p-4 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-200">
                            <span>part3</span>
                        </section>
                    </div>
                </div>
                <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                    <p class="mb-3 text-[11px] font-semibold tracking-wide text-gray-400 uppercase">
                        Sections
                    </p>
                    <Anchor
                        :container="containerRef"
                        direction="vertical"
                        type="default"
                        :offset="30"
                        @click="handleClick"
                    >
                        <AnchorLink href="#anchor-a" title="part1" />
                        <AnchorLink href="#anchor-b" title="part2" />
                        <AnchorLink href="#anchor-c" title="part3" />
                    </Anchor>
                    <p class="mt-5 text-xs leading-5 text-gray-500 dark:text-gray-400">
                        Click a section to scroll the panel smoothly.
                    </p>
                </div>
            </div>
        </template>
    </ComponentDoc>
</template>
