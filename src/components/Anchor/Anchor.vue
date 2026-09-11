<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

export interface AnchorLink {
    href: string;
    title: string;
}

const props = defineProps<{ links: AnchorLink[] }>();

const active = ref(props.links[0]?.href ?? "");
let observer: IntersectionObserver | null = null;

function onClick(e: MouseEvent, href: string) {
    e.preventDefault();
    document
        .querySelector(href)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    active.value = href;
}

onMounted(() => {
    const targets = props.links
        .map((l) => document.querySelector(l.href))
        .filter((el): el is Element => !!el);

    observer = new IntersectionObserver(
        (entries) => {
            const visible = entries.find((e) => e.isIntersecting);
            if (visible) active.value = "#" + visible.target.id;
        },
        { rootMargin: "-20% 0px -70% 0px" },
    );
    targets.forEach((el) => observer?.observe(el));
});
onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
    <ul class="flex flex-col gap-1 border-l border-gray-200 text-sm">
        <li v-for="link in links" :key="link.href">
            <a
                :href="link.href"
                :class="[
                    '-ml-px block border-l-2 px-3 py-1 transition-colors',
                    active === link.href
                        ? 'border-primary-600 text-primary-700 font-medium'
                        : 'border-transparent text-gray-500 hover:text-gray-700',
                ]"
                @click="onClick($event, link.href)"
                >{{ link.title }}</a
            >
        </li>
    </ul>
</template>
