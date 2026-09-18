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

// panelClass — класс корневого элемента телепортированной панели, по которому
// onClickOutside узнаёт "это клик внутри панели, а не снаружи" (панель живёt
// в body, а не внутри компонента, поэтому обычный rootRef.contains() её не видит).
//
// getPlacement — необязательный геттер явной позиционировки (6 вариантов
// из PanelPlacement). Если задан — позиция считается по computePlacementRect
// (с автопереворотом при нехватке места), иначе — прежний автопилл top/bottom.
export function useFloatingPanel(
    panelClass: string,
    panelHeight = 240,
    panelWidth?: number,
    getPlacement?: () => PanelPlacement,
): UseFloatingPanel {
    const open = ref(false);
    const triggerRef = ref<HTMLElement | null>(null);
    const rect = ref<FloatingRect | null>(null);

    function updateRect() {
        if (!triggerRef.value) return;
        const placement = getPlacement?.();
        rect.value = placement
            ? computePlacementRect(triggerRef.value, panelHeight, 4, panelWidth, placement)
            : computeFloatingRect(triggerRef.value, panelHeight, 4, panelWidth);
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
