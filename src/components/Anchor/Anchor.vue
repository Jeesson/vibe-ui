<template>
    <div ref="anchorRef" :class="cls">
        <div v-if="marker" ref="markerRef" :class="['anchor-marker', markerBgCls]" :style="markerStyle" />
        <div :class="['anchor-list', direction === 'horizontal' ? 'flex items-center gap-1' : 'flex flex-col gap-0.5']">
            <template v-if="props.links?.length">
                <AnchorLink v-for="link in props.links" :key="link.href" :href="link.href" :title="link.title" />
            </template>
            <slot v-else />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, shallowReactive, watch } from "vue";
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
        type?: "default" | "fill" | "dot";
        direction?: "vertical" | "horizontal";
        selectScrollTop?: boolean;
        /** Fraction (0–1) of a section's height that must be visible to activate it. 0 disables. */
        visibleRatio?: number;
    }>(),
    {
        offset: 0,
        bound: 15,
        duration: 300,
        marker: true,
        type: "default",
        direction: "vertical",
        selectScrollTop: false,
        visibleRatio: 0,
    },
);

const emit = defineEmits<{
    change: [href: string];
    click: [e: MouseEvent, href?: string];
}>();

const currentAnchor = ref("");
// All active hrefs at once (visibleRatio mode highlights several links).
const activeHrefs = ref<Set<string>>(new Set());
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
    props.direction === "horizontal" ? "flex items-center gap-1" : "flex flex-col gap-0.5",
    // Card marker replaces the left border with a background highlight.
    props.direction === "vertical" && props.type !== "fill" ? "border-l border-gray-500/70" : "",
]);

// Tailwind 4 needs full literal classes per variant (no dynamic concat).
// "fill" hides the floating marker entirely: each active link gets its own
// pill highlight, rendered by AnchorLink.
const markerBgCls = computed(() => (props.type === "fill" ? "opacity-0" : "bg-primary-700 dark:bg-primary-400"));

const addLink = (state: AnchorLinkState) => {
    links[state.href] = state.el;
};
const removeLink = (href: string) => {
    delete links[href];
};

const applyActiveState = (state: { current: string; active: Set<string> }) => {
    const prev = activeHrefs.value;
    let activeChanged = prev.size !== state.active.size;
    if (!activeChanged) {
        for (const href of state.active) {
            if (!prev.has(href)) {
                activeChanged = true;
                break;
            }
        }
    }
    if (activeChanged) activeHrefs.value = state.active;
    if (currentAnchor.value !== state.current) {
        currentAnchor.value = state.current;
        emit("change", state.current);
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
    applyActiveState(computeActiveState(getScrollTop(containerEl.value), href));
    currentTargetHref = href;
    isScrolling = true;
    const container = containerEl.value;
    const distance = getOffsetTopDistance(target, container);
    const to = Math.max(0, Math.min(distance - props.offset, getMaxScrollTop(container)));
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : props.duration;
    clearAnimate = animateScrollTo(container, getScrollTop(container), to, duration, () => {
        clearAnimate = null;
        isScrolling = false;
        currentTargetHref = "";
        // Multiple bottom links can target the same maximum scroll position.
        // Keep the selected link active until the user scrolls away.
        settledScrollTop = getScrollTop(container);
    });
};

const handleClick = (e: MouseEvent, href?: string) => {
    emit("click", e, href);
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    if (!href || !getTarget(href)) return;
    e.preventDefault();
    scrollTo(href);
};

const handleScroll = throttleByRaf(() => {
    const container = containerEl.value;
    if (!mounted || !container || isScrolling) return;
    const top = getScrollTop(container);
    if (settledScrollTop !== null && Math.abs(top - settledScrollTop) <= 2) return;
    settledScrollTop = null;
    applyActiveState(computeActiveState(top));
});

/**
 * Resolves the active state for a scroll position.
 * Default mode (visibleRatio = 0): one active link, picked by top offsets.
 * visibleRatio mode: every section whose visible fraction >= visibleRatio is
 * active; `current` is the first (topmost) of them, used for change events.
 */
function computeActiveState(scrollTop: number, overrideCurrent?: string): { current: string; active: Set<string> } {
    const container = containerEl.value;
    if (!container) return { current: "", active: new Set() };
    // Client height of the scrolling element (viewport height for window).
    const viewportHeight = isWindow(container) ? window.innerHeight : container.clientHeight;

    const hrefs = Object.keys(links);
    if (!hrefs.length) return { current: "", active: new Set() };

    if (props.visibleRatio > 0 && props.visibleRatio <= 1 && viewportHeight > 0) {
        const active = new Set<string>();
        for (const href of hrefs) {
            const target = getTarget(href);
            if (!target || !target.getClientRects().length) continue;
            const targetTop = getOffsetTopDistance(target, container);
            const targetBottom = targetTop + target.offsetHeight;
            const visiblePx = Math.min(targetBottom, scrollTop + viewportHeight) - Math.max(targetTop, scrollTop);
            if (target.offsetHeight > 0 && visiblePx / target.offsetHeight >= props.visibleRatio) active.add(href);
        }
        if (overrideCurrent) active.add(overrideCurrent);
        // Topmost active href is the "current" one for change events / marker.
        const ordered = hrefs.filter((href) => active.has(href));
        return { current: overrideCurrent ?? ordered[0] ?? "", active };
    }

    const positions: { top: number; href: string }[] = [];
    for (const href of hrefs) {
        const target = getTarget(href);
        if (!target || !target.getClientRects().length) continue;
        positions.push({
            top: getOffsetTopDistance(target, container) - props.offset - props.bound,
            href,
        });
    }
    const current = resolveActiveHref(
        positions,
        scrollTop,
        getMaxScrollTop(container),
        overrideCurrent ?? currentAnchor.value,
        props.selectScrollTop,
    );
    return { current, active: current ? new Set([current]) : new Set() };
}

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
    if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) {
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
        if (!anchorRef.value || !markerRef.value || !activeHrefs.value.size) {
            markerStyle.value = { opacity: 0 };
            return;
        }
        // Range marker: from the first to the last active link. With a single
        // active link this collapses to the usual single-item marker.
        const ordered = Object.keys(links).filter((href) => activeHrefs.value.has(href) && links[href]);
        const firstEl = ordered[0] ? links[ordered[0]] : null;
        const lastEl = ordered.length > 1 ? links[ordered[ordered.length - 1]] : null;
        if (!firstEl) {
            markerStyle.value = { opacity: 0 };
            return;
        }
        const anchorRect = anchorRef.value.getBoundingClientRect();
        const firstRect = firstEl.getBoundingClientRect();

        if (props.type === "fill") {
            // Floating marker is hidden for "fill": AnchorLink draws its own
            // pill highlight per active link. Reset inline styles so a leftover
            // style from another marker type (e.g. inline opacity: 1) can't
            // keep the floating bar visible.
            markerStyle.value = { opacity: 0 };
            return;
        }

        if (props.type === "dot") {
            // Dot marker: a small circle pinned to the topmost active link.
            // Dots do not stretch over the active range.
            const dotSize = 10;
            if (props.direction === "horizontal") {
                markerStyle.value = {
                    top: "auto",
                    bottom: "-5px",
                    left: `${firstRect.left - anchorRect.left + firstRect.width / 2 - dotSize / 2}px`,
                    width: `${dotSize}px`,
                    height: `${dotSize}px`,
                    opacity: 1,
                    transition: `left ${props.duration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 150ms`,
                };
            } else {
                markerStyle.value = {
                    top: `${firstRect.top - anchorRect.top + firstRect.height / 2 - dotSize / 2}px`,
                    left: "-5px",
                    width: `${dotSize}px`,
                    height: `${dotSize}px`,
                    opacity: 1,
                    transition: `top ${props.duration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 150ms`,
                };
            }
            return;
        }

        if (props.direction === "horizontal") {
            const left = firstRect.left - anchorRect.left;
            const right = lastEl ? lastEl.getBoundingClientRect().right - anchorRect.left : left + firstRect.width;
            markerStyle.value = {
                top: "auto",
                bottom: "-1px",
                height: "2px",
                left: `${left}px`,
                width: `${Math.max(right - left, firstRect.width)}px`,
                opacity: 1,
                transition: `left ${props.duration}ms cubic-bezier(0.22, 1, 0.36, 1), width ${props.duration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 150ms`,
            };
        } else {
            // Base height of .anchor-marker (scoped style); inline height may
            // be stretched, so don't read it from the live rect.
            const markerHeight = 24;
            const top = firstRect.top - anchorRect.top + (firstRect.height - markerHeight) / 2;
            const end = lastEl ? lastEl.getBoundingClientRect().bottom : firstRect.bottom;
            const bottom = end - anchorRect.top - (lastEl ? (lastEl.getBoundingClientRect().height - markerHeight) / 2 : 0);
            markerStyle.value = {
                top: `${top}px`,
                height: `${Math.max(bottom - top, markerHeight)}px`,
                opacity: 1,
                transition: `top ${props.duration}ms cubic-bezier(0.22, 1, 0.36, 1), height ${props.duration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 150ms`,
            };
        }
    });
};

watch(activeHrefs, updateMarkerStyle);
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
    () => [props.offset, props.bound, props.selectScrollTop, props.visibleRatio],
    () => {
        settledScrollTop = null;
        handleScroll();
    },
);
watch(() => [props.direction, props.marker, props.duration, props.type], updateMarkerStyle, { flush: "post" });

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
    // Initial URL scroll position is handled by browser/router;
    // avoid conflicting animations, especially for nested Anchors.
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
    activeHrefs,
    markerType: computed(() => props.type),
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
