<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = withDefaults(
    defineProps<{
        offset?: number;
        position?: "top" | "bottom";
        target?: string;
        zIndex?: number;
    }>(),
    { offset: 0, position: "top", zIndex: 1000 },
);

const emit = defineEmits<{
    change: [fixed: boolean];
    scroll: [payload: { scrollTop: number; fixed: boolean }];
}>();

const rootRef = ref<HTMLElement | null>(null);
const fixed = ref(false);
const width = ref<number | null>(null);
const height = ref<number | null>(null);
const left = ref<number | null>(null);
let targetElement: HTMLElement | null = null;

// Элемент прилипает к top: offset, пока не достигнут низ родительского блока —
// тогда «отлипает» и уезжает вместе с контентом (как в Element Plus).
// Ориентируемся на live getBoundingClientRect: не зависит от того, когда
// и где элемент оказался в DOM, и корректно работает при ресайзе.
function getScrollTop(): number {
    return targetElement?.scrollTop ?? window.scrollY;
}

function getBoundaryRect(): DOMRect | null {
    if (targetElement) return targetElement.getBoundingClientRect();
    return rootRef.value?.parentElement?.getBoundingClientRect() ?? null;
}

function setFixed(next: boolean, rect: DOMRect) {
    if (next === fixed.value) return;
    width.value = rect.width;
    height.value = rect.height;
    left.value = rect.left;
    fixed.value = next;
    emit("change", next);
}

function onScroll() {
    const el = rootRef.value;
    const boundary = getBoundaryRect();
    if (!el || !boundary) return;

    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const boundaryTop = Math.max(boundary.top, 0);
    const boundaryBottom = Math.min(boundary.bottom, viewportHeight);
    const shouldFix =
        props.position === "bottom"
            ? rect.bottom >= viewportHeight - props.offset &&
              boundaryTop < viewportHeight - props.offset - rect.height
            : rect.top <= props.offset &&
              boundaryBottom > props.offset + rect.height;

    setFixed(shouldFix, rect);
    emit("scroll", { scrollTop: getScrollTop(), fixed: fixed.value });
}

onMounted(() => {
    targetElement = props.target
        ? document.querySelector<HTMLElement>(props.target)
        : null;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    targetElement?.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
});
onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    targetElement?.removeEventListener("scroll", onScroll);
});
</script>

<template>
    <div ref="rootRef" :style="fixed ? { height: height + 'px' } : undefined">
        <div
            :style="
                fixed
                    ? {
                          position: 'fixed',
                              top: position === 'top' ? offset + 'px' : undefined,
                              bottom: position === 'bottom' ? offset + 'px' : undefined,
                          width: width + 'px',
                              left: left + 'px',
                              zIndex,
                      }
                    : undefined
            "
        >
            <slot />
        </div>
    </div>
</template>
