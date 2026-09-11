<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = withDefaults(defineProps<{ offset?: number }>(), { offset: 0 });

const rootRef = ref<HTMLElement | null>(null);
const fixed = ref(false);
const width = ref<number | null>(null);
const height = ref<number | null>(null);

// Элемент прилипает к top: offset, пока не достигнут низ родительского блока —
// тогда «отлипает» и уезжает вместе с контентом (как в Element Plus).
// Ориентируемся на live getBoundingClientRect: не зависит от того, когда
// и где элемент оказался в DOM, и корректно работает при ресайзе.
function onScroll() {
    const el = rootRef.value;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const parentBottom = parent.getBoundingClientRect().bottom;
    const placeholderTop = el.getBoundingClientRect().top; // плейсхолдер (высота сохраняется, когда fixed)

    const shouldFix =
        placeholderTop <= props.offset &&
        parentBottom > props.offset + el.offsetHeight;
    if (shouldFix && !fixed.value) {
        width.value = el.offsetWidth;
        height.value = el.offsetHeight;
        fixed.value = true;
    } else if (!shouldFix && fixed.value) {
        fixed.value = false;
    }
}

onMounted(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
});
onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
});
</script>

<template>
    <div ref="rootRef" :style="fixed ? { height: height + 'px' } : undefined">
        <div
            :style="
                fixed
                    ? {
                          position: 'fixed',
                          top: offset + 'px',
                          width: width + 'px',
                          zIndex: 20,
                      }
                    : undefined
            "
        >
            <slot />
        </div>
    </div>
</template>
