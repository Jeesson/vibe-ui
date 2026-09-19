import { ref, onMounted, onBeforeUnmount, nextTick, type Ref } from "vue";
import { computeFloatingRect, computePlacementRect, type FloatingRect, type PanelPlacement } from "./floating";

export interface UseFloatingPanel {
    open: Ref<boolean>;
    triggerRef: Ref<HTMLElement | null>;
    rect: Ref<FloatingRect | null>;
    updateRect: () => void;
    openPanel: () => void;
    closePanel: () => void;
    togglePanel: () => void;
}

// panelClass — class of the teleported panel root element so onClickOutside
// recognizes clicks inside the panel (since it lives in body outside rootRef).
//
// panelWidth — fixed number, or a getter when the width depends on the current
// state (e.g. Cascader grows with the number of columns).
//
// getPlacement — optional getter for explicit placement (6 PanelPlacement options).
// When provided, position uses computePlacementRect with auto-flip; otherwise auto top/bottom.
export function useFloatingPanel(
    panelClass: string,
    panelHeight = 240,
    panelWidth?: number | (() => number),
    getPlacement?: () => PanelPlacement,
): UseFloatingPanel {
    const open = ref(false);
    const triggerRef = ref<HTMLElement | null>(null);
    const rect = ref<FloatingRect | null>(null);

    function updateRect() {
        if (!triggerRef.value) return;
        const width = typeof panelWidth === "function" ? panelWidth() : panelWidth;
        const placement = getPlacement?.();
        rect.value = placement
            ? computePlacementRect(triggerRef.value, panelHeight, 4, width, placement)
            : computeFloatingRect(triggerRef.value, panelHeight, 4, width);
    }

    function openPanel() {
        open.value = true;
        nextTick(updateRect);
    }
    function closePanel() {
        open.value = false;
    }
    function togglePanel() {
        if (open.value) closePanel();
        else openPanel();
    }

    function onClickOutside(e: MouseEvent) {
        const target = e.target as HTMLElement;
        if (triggerRef.value?.contains(target)) return;
        if (target.closest?.("." + panelClass)) return;
        closePanel();
    }

    onMounted(() => {
        document.addEventListener("click", onClickOutside);
        window.addEventListener("scroll", updateRect, true);
        window.addEventListener("resize", updateRect);
    });
    onBeforeUnmount(() => {
        document.removeEventListener("click", onClickOutside);
        window.removeEventListener("scroll", updateRect, true);
        window.removeEventListener("resize", updateRect);
    });

    return {
        open,
        triggerRef,
        rect,
        updateRect,
        openPanel,
        closePanel,
        togglePanel,
    };
}
