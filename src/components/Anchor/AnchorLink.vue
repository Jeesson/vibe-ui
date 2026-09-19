<script setup lang="ts">
import { inject, onBeforeUnmount, ref, computed, watch } from "vue";
import { anchorKey } from "./constants";

const props = defineProps<{
    href: string;
    title: string;
}>();

const anchor = inject(anchorKey);
const linkRef = ref<HTMLElement | null>(null);

const isActive = computed(() => anchor?.activeHrefs.value.has(props.href) ?? false);
// "fill" variant: the link itself draws the pill highlight.
const isFilled = computed(() => anchor?.markerType.value === "fill");

function onClick(e: MouseEvent) {
    anchor?.handleClick(e, props.href);
}

watch(
    [() => props.href, linkRef],
    ([href, el], [oldHref]) => {
        if (oldHref) anchor?.removeLink(oldHref);
        if (el) anchor?.addLink({ href, el });
    },
    { flush: "post" },
);
onBeforeUnmount(() => {
    anchor?.removeLink(props.href);
});
</script>

<template>
    <div :class="anchor?.direction.value === 'horizontal' ? 'inline-block' : 'block'">
        <a
            ref="linkRef"
            :href="href"
            :aria-current="isActive ? 'location' : undefined"
            :class="[
                'relative block rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200',
                isFilled && isActive
                    ? 'bg-primary-50 text-primary-700 ring-primary-500/20 dark:bg-primary-800 dark:text-primary-400 dark:ring-primary-400/30 ring-1 ring-inset'
                    : isActive
                      ? 'text-primary-700 dark:text-primary-400'
                      : 'text-gray-500 hover:text-gray-800 dark:text-gray-400',
            ]"
            @click="onClick">
            {{ title }}
        </a>
        <div v-if="$slots.default" :class="anchor?.direction.value === 'horizontal' ? 'inline-block' : 'ml-3'">
            <slot />
        </div>
    </div>
</template>
