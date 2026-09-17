<template>
    <div ref="anchorRef" :class="cls">
        <div
            v-if="marker"
            ref="markerRef"
            class="anchor-marker bg-primary-700 dark:bg-primary-400"
            :style="markerStyle"
        />
        <div
            :class="[
                'anchor-list',
                direction === 'horizontal'
                    ? 'flex items-center gap-1'
                    : 'flex flex-col gap-0.5',
            ]"
        >
            <template v-if="props.links?.length">
                <AnchorLink
                    v-for="link in props.links"
                    :key="link.href"
                    :href="link.href"
                    :title="link.title"
                />
            </template>
            <slot v-else />
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    provide,
    ref,
    shallowReactive,
    watch,
} from "vue";
import {
    animateScrollTo,
    getElement,
    getOffsetTopDistance,
    getScrollTop,
    getMaxScrollTop,
    resolveActiveHref,
    isWindow,
    throttleByRaf,
} from "./utils";
import AnchorLink from "./AnchorLink.vue";
import { anchorKey } from "./constants";
import type { AnchorLinkState } from "./constants";
import type { CSSProperties } from "vue";

defineOptions({ name: "Anchor" });

const props = withDefaults(
    defineProps<{
        links?: { href: string; title: string }[];
        container?: string | HTMLElement | Window | null;
        offset?: number;
        bound?: number;
        duration?: number;
        marker?: boolean;
        type?: "default" | "underline";
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
    change: [href: string];
    click: [e: MouseEvent, href?: string];
}>();

const currentAnchor = ref("");
const markerStyle = ref<CSSProperties>({});
const anchorRef = ref<HTMLElement | null>(null);
const markerRef = ref<HTMLElement | null>(null);
const containerEl = ref<HTMLElement | Window>();

const links = shallowReactive<Record<string, HTMLElement>>({});
let isScrolling = false;
let mounted = false;
let settledScrollTop: number | null = null;

const cls = computed(() => [
    "relative text-sm",
    props.type === "underline"
        ? "border-b border-gray-200 dark:border-gray-800"
        : "",
    props.direction === "horizontal"
        ? "flex items-center gap-1"
        : "flex flex-col gap-0.5 border-l border-gray-500/70 ",
]);

const addLink = (state: AnchorLinkState) => {
    links[state.href] = state.el;
};
const removeLink = (href: string) => {
    delete links[href];
};

const setCurrentAnchor = (href: string) => {
    const activeHref = currentAnchor.value;
    if (activeHref !== href) {
        currentAnchor.value = href;
        emit("change", href);
    }
};

let clearAnimate: (() => void) | null = null;
let currentTargetHref = "";

function cancelScroll() {
    clearAnimate?.();
    clearAnimate = null;
    isScrolling = false;
    currentTargetHref = "";
}

function getTarget(href: string) {
    if (!href.startsWith("#")) return null;
    const target = getElement(href);
    const container = containerEl.value;
    if (!container || !target || isWindow(target)) return null;
    if (!isWindow(container) && !container.contains(target)) return null;
    return target;
}

const scrollTo = (href?: string) => {
    if (!href || !containerEl.value) return;
    const target = getTarget(href);
    if (!target) return;
    if (isScrolling && currentTargetHref === href) return;
    cancelScroll();
    settledScrollTop = null;
    setCurrentAnchor(href);
    currentTargetHref = href;
    isScrolling = true;
    const container = containerEl.value;
    const distance = getOffsetTopDistance(target, container);
    const to = Math.max(
        0,
        Math.min(distance - props.offset, getMaxScrollTop(container)),
    );
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
        ? 0
        : props.duration;
    clearAnimate = animateScrollTo(
        container,
        getScrollTop(container),
        to,
        duration,
        () => {
            clearAnimate = null;
            isScrolling = false;
            currentTargetHref = "";
            // Несколько нижних ссылок могут вести в одну предельную позицию.
            // Сохраняем выбранную, пока пользователь действительно не прокрутит.
            settledScrollTop = getScrollTop(container);
        },
    );
};

const handleClick = (e: MouseEvent, href?: string) => {
    emit("click", e, href);
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey)
        return;
    if (!href || !getTarget(href)) return;
    e.preventDefault();
    scrollTo(href);
};

const handleScroll = throttleByRaf(() => {
    const container = containerEl.value;
    if (!mounted || !container || isScrolling) return;
    const top = getScrollTop(container);
    if (settledScrollTop !== null && Math.abs(top - settledScrollTop) <= 2)
        return;
    settledScrollTop = null;
    setCurrentAnchor(getCurrentHref());
});

const getCurrentHref = () => {
    const container = containerEl.value;
    if (!container) return "";
    const positions: { top: number; href: string }[] = [];
    for (const href of Object.keys(links)) {
        const target = getTarget(href);
        if (!target || !target.getClientRects().length) continue;
        positions.push({
            top:
                getOffsetTopDistance(target, container) -
                props.offset -
                props.bound,
            href,
        });
    }
    return resolveActiveHref(
        positions,
        getScrollTop(container),
        getMaxScrollTop(container),
        currentAnchor.value,
        props.selectScrollTop,
    );
};

const getContainer = () => {
    const el = getElement(props.container);
    if (!el || isWindow(el)) {
        containerEl.value = window;
    } else {
        containerEl.value = el;
    }
};

function interruptScroll() {
    cancelScroll();
    settledScrollTop = null;
    handleScroll();
}

function handleKeydown(e: KeyboardEvent) {
    const target = e.target as HTMLElement | null;
    if (target?.closest('input, textarea, select, [contenteditable="true"]'))
        return;
    if (
        [
            "ArrowUp",
            "ArrowDown",
            "PageUp",
            "PageDown",
            "Home",
            "End",
            " ",
        ].includes(e.key)
    ) {
        interruptScroll();
    }
}

function bindScrollListener() {
    const container = containerEl.value;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    container.addEventListener("wheel", interruptScroll, { passive: true });
    container.addEventListener("touchstart", interruptScroll, {
        passive: true,
    });
    container.addEventListener("pointerdown", interruptScroll, {
        passive: true,
    });
}
function unbindScrollListener() {
    const container = containerEl.value;
    if (!container) return;
    container.removeEventListener("scroll", handleScroll);
    container.removeEventListener("wheel", interruptScroll);
    container.removeEventListener("touchstart", interruptScroll);
    container.removeEventListener("pointerdown", interruptScroll);
}

const updateMarkerStyle = () => {
    nextTick(() => {
        if (!anchorRef.value || !markerRef.value || !currentAnchor.value) {
            markerStyle.value = { opacity: 0 };
            return;
        }
        const currentLinkEl = links[currentAnchor.value];
        if (!currentLinkEl) {
            markerStyle.value = { opacity: 0 };
            return;
        }
        const anchorRect = anchorRef.value.getBoundingClientRect();
        const markerRect = markerRef.value.getBoundingClientRect();
        const linkRect = currentLinkEl.getBoundingClientRect();

        if (props.direction === "horizontal") {
            const left = linkRect.left - anchorRect.left;
            markerStyle.value = {
                top: "auto",
                bottom: "-1px",
                height: "2px",
                left: `${left}px`,
                width: `${linkRect.width}px`,
                opacity: 1,
                transition: `left ${props.duration}ms cubic-bezier(0.22, 1, 0.36, 1), width ${props.duration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 150ms`,
            };
        } else {
            const top =
                linkRect.top -
                anchorRect.top +
                (linkRect.height - markerRect.height) / 2;
            markerStyle.value = {
                top: `${top}px`,
                opacity: 1,
                transition: `top ${props.duration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 150ms`,
            };
        }
    });
};

watch(currentAnchor, updateMarkerStyle);
watch(
    () => Object.keys(links),
    () => {
        if (!mounted) return;
        settledScrollTop = null;
        handleScroll();
        updateMarkerStyle();
    },
    { flush: "post" },
);
watch(
    () => [props.offset, props.bound, props.selectScrollTop],
    () => {
        settledScrollTop = null;
        handleScroll();
    },
);
watch(
    () => [props.direction, props.marker, props.duration],
    updateMarkerStyle,
    { flush: "post" },
);

function handleResize() {
    settledScrollTop = null;
    handleScroll();
    updateMarkerStyle();
}

let resizeObserver: ResizeObserver | undefined;

onMounted(() => {
    mounted = true;
    getContainer();
    bindScrollListener();
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("keydown", handleKeydown);
    if (typeof ResizeObserver !== "undefined" && anchorRef.value) {
        resizeObserver = new ResizeObserver(updateMarkerStyle);
        resizeObserver.observe(anchorRef.value);
    }
    // Начальную позицию URL восстанавливает браузер/роутер: не запускаем
    // конкурирующую анимацию, особенно у вложенного Anchor.
    handleScroll();
    updateMarkerStyle();
});

onBeforeUnmount(() => {
    mounted = false;
    cancelScroll();
    unbindScrollListener();
    handleScroll.cancel();
    resizeObserver?.disconnect();
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("keydown", handleKeydown);
});

watch(
    () => props.container,
    () => {
        if (!mounted) return;
        cancelScroll();
        settledScrollTop = null;
        unbindScrollListener();
        handleScroll.cancel();
        getContainer();
        bindScrollListener();
        handleScroll();
    },
    { flush: "post" },
);

provide(anchorKey, {
    direction: computed(() => props.direction),
    currentAnchor,
    addLink,
    removeLink,
    handleClick,
});

defineExpose({ scrollTo });
</script>

<style scoped>
.anchor-marker {
    position: absolute;
    left: -2px;
    width: 4px;
    height: 24px;
    border-radius: 9999px;
    opacity: 0;
    pointer-events: none;
}
</style>
