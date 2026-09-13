<script setup lang="ts">
import {
    ref,
    computed,
    nextTick,
    onMounted,
    onBeforeUnmount,
    isRef,
    useSlots,
    watch,
} from "vue";

export interface AnchorLink {
    href: string;
    title: string;
}

const props = withDefaults(
    defineProps<{
        links?: AnchorLink[];
        container?:
            | string
            | HTMLElement
            | Window
            | { value: HTMLElement | null }
            | null;
        offset?: number;
        bound?: number;
        duration?: number;
        marker?: boolean;
        type?: "default" | "dot";
        direction?: "vertical" | "horizontal";
        selectScrollTop?: boolean;
    }>(),
    {
        offset: 0,
        bound: 15,
        duration: 300,
        marker: true,
        type: "default",
        direction: "vertical",
        selectScrollTop: false,
    },
);

const emit = defineEmits<{
    click: [event: MouseEvent, href: string];
}>();

const slots = useSlots();
const slotLinks = computed<AnchorLink[]>(() => {
    const result: AnchorLink[] = [];
    const visit = (nodes: ReturnType<NonNullable<typeof slots.default>>): void => {
        for (const node of nodes) {
            const props = node.props;
            if (props?.href && props?.title) {
                result.push({ href: String(props.href), title: String(props.title) });
            }
            if (Array.isArray(node.children)) visit(node.children as typeof nodes);
        }
    };
    const nodes = slots.default?.() ?? [];
    visit(nodes);
    return result;
});
const anchorLinks = computed(() => props.links?.length ? props.links : slotLinks.value);
const activeLinks = ref<string[]>([]);
const linkElements = new Map<string, HTMLElement>();
const indicator = ref({ top: 0, height: 0 });
const visibility = new Map<string, boolean>();
let observer: IntersectionObserver | null = null;
let resizeObserver: ResizeObserver | null = null;
let scrollContainer: HTMLElement | Window = window;

function setLinkElement(href: string, element: unknown) {
    if (element instanceof HTMLElement) linkElements.set(href, element);
    else linkElements.delete(href);
}

function updateIndicator() {
    const visible = activeLinks.value
        .map((href) => linkElements.get(href))
        .filter((element): element is HTMLElement => Boolean(element));
    const first = visible[0];
    const last = visible[visible.length - 1];
    if (!first || !last) return;
    if (props.direction === "horizontal") {
        indicator.value = {
            top: first.offsetLeft,
            height: last.offsetLeft + last.offsetWidth - first.offsetLeft,
        };
        return;
    }
    indicator.value = {
        top: first.offsetTop,
        height: last.offsetTop + last.offsetHeight - first.offsetTop,
    };
}

function resolveContainer(): HTMLElement | Window {
    const container = props.container;
    if (!container) return window;
    if (typeof container === "string") {
        return document.querySelector<HTMLElement>(container) ?? window;
    }
    if (isRef(container)) {
        return (container.value as HTMLElement | null) ?? window;
    }
    if (container instanceof HTMLElement || container instanceof Window) {
        return container;
    }
    return window;
}

function getScrollTop(): number {
    return scrollContainer instanceof Window ? window.scrollY : scrollContainer.scrollTop;
}

function getTargetTop(target: Element): number {
    const rect = target.getBoundingClientRect();
    if (scrollContainer instanceof Window) return rect.top + window.scrollY;
    const containerRect = scrollContainer.getBoundingClientRect();
    return rect.top - containerRect.top + scrollContainer.scrollTop;
}

function scrollToTop(top: number) {
    const start = getScrollTop();
    const distance = top - start;
    if (!props.duration || Math.abs(distance) < 1) {
        if (scrollContainer instanceof Window) window.scrollTo(0, top);
        else scrollContainer.scrollTop = top;
        return;
    }

    const startedAt = performance.now();
    const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / props.duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = start + distance * eased;
        if (scrollContainer instanceof Window) window.scrollTo(0, value);
        else scrollContainer.scrollTop = value;
        if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
}

function onClick(e: MouseEvent, href: string) {
    emit("click", e, href);
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
        scrollToTop(Math.max(0, getTargetTop(target) - props.offset));
        if (props.selectScrollTop && scrollContainer instanceof HTMLElement) {
            scrollContainer.scrollTop = 0;
        }
    }
    activeLinks.value = [href];
}

watch(activeLinks, () => nextTick(updateIndicator));

onMounted(() => {
    scrollContainer = resolveContainer();
    const links = anchorLinks.value;
    activeLinks.value = links[0] ? [links[0].href] : [];
    const targets = links
        .map((l) => document.querySelector(l.href))
        .filter((el): el is Element => !!el);

    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                visibility.set(
                    `#${entry.target.id}`,
                    entry.isIntersecting && entry.intersectionRatio > 0,
                );
            });
            const visible = links
                .filter((link) => visibility.get(link.href))
                .map((link) => link.href);
            if (visible.length) activeLinks.value = visible;
        },
        {
            root: scrollContainer instanceof HTMLElement ? scrollContainer : null,
            rootMargin: `-${props.bound}px 0px -${Math.max(0, 100 - props.bound)}% 0px`,
            threshold: [0, 0.01],
        },
    );
    targets.forEach((el) => observer?.observe(el));
    resizeObserver = new ResizeObserver(updateIndicator);
    linkElements.forEach((el) => resizeObserver?.observe(el));
    nextTick(updateIndicator);
});
onBeforeUnmount(() => {
    observer?.disconnect();
    resizeObserver?.disconnect();
});
</script>

<template>
    <ul
        :class="[
            'relative text-sm',
            direction === 'horizontal'
                ? 'flex items-center gap-4 border-b border-gray-200'
                : 'flex flex-col gap-1 border-l border-gray-200',
        ]"
    >
        <span
            v-if="marker"
            aria-hidden="true"
            :class="[
                'pointer-events-none absolute rounded-full bg-primary-600 transition-[height,width,transform] duration-300 ease-out',
                direction === 'horizontal'
                    ? '-bottom-px left-0 h-0.5'
                    : 'top-0 -left-px w-0.5',
                type === 'dot' && 'h-2 w-2',
            ]"
            :style="{
                height: type === 'dot' ? '8px' : direction === 'horizontal' ? undefined : `${indicator.height}px`,
                width: type === 'dot' ? '8px' : direction === 'horizontal' ? `${indicator.height}px` : undefined,
                transform:
                    direction === 'horizontal'
                        ? `translateX(${indicator.top}px)`
                        : `translateY(${indicator.top}px)`,
            }"
        />
        <li v-for="link in anchorLinks" :key="link.href">
            <a
                :href="link.href"
                :ref="(element) => setLinkElement(link.href, element)"
                :class="[
                    'block px-3 py-1 transition-colors',
                    activeLinks.includes(link.href)
                        ? 'text-primary-700 font-medium'
                        : 'text-gray-500 hover:text-gray-700',
                ]"
                @click="onClick($event, link.href)"
                >{{ link.title }}</a
            >
        </li>
    </ul>
</template>
