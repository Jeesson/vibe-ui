export interface FloatingRect {
    top: number;
    left: number;
    width: number;
    placement: "top" | "bottom";
}

// Six floating panel placements: side (top/bottom) x alignment
// (start = left edge of trigger, center, end = right edge).
export type PanelPlacement = "bottom-start" | "bottom" | "bottom-end" | "top-start" | "top" | "top-end";

// Computes floating panel position relative to trigger in viewport coordinates
// (used with position: fixed after Teleport to body). Flips panel upwards if
// bottom space is insufficient and clamps left edge to fit within screen bounds.
export function computeFloatingRect(trigger: HTMLElement, panelHeight = 240, gap = 4, panelWidth?: number): FloatingRect {
    const rect = trigger.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const placement: "top" | "bottom" = spaceBelow < panelHeight && spaceAbove > spaceBelow ? "top" : "bottom";

    const width = panelWidth ?? rect.width;
    let left = rect.left;
    const overflowRight = left + width - window.innerWidth + 8;
    if (overflowRight > 0) left -= overflowRight;
    if (left < 8) left = 8;

    return {
        top: placement === "bottom" ? rect.bottom + gap : rect.top - gap,
        left,
        width,
        placement,
    };
}

// Computes position from an explicit placement. Requested side is kept if space
// permits; otherwise flips (bottom <-> top). Horizontal position is clamped to screen.
export function computePlacementRect(
    trigger: HTMLElement,
    panelHeight = 240,
    gap = 4,
    panelWidth?: number,
    placement: PanelPlacement = "bottom-start",
): FloatingRect {
    const rect = trigger.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    const wantsTop = placement.startsWith("top");
    const vertical: "top" | "bottom" = wantsTop
        ? spaceAbove < panelHeight && spaceBelow > spaceAbove
            ? "bottom"
            : "top"
        : spaceBelow < panelHeight && spaceAbove > spaceBelow
          ? "top"
          : "bottom";

    const width = panelWidth ?? rect.width;
    const align = placement.endsWith("-start") ? "start" : placement.endsWith("-end") ? "end" : "center";
    let left: number;
    if (align === "start") {
        left = rect.left;
    } else if (align === "end") {
        left = rect.right - width;
    } else {
        left = rect.left + rect.width / 2 - width / 2;
    }

    const overflowRight = left + width - window.innerWidth + 8;
    if (overflowRight > 0) left -= overflowRight;
    if (left < 8) left = 8;

    return {
        top: vertical === "bottom" ? rect.bottom + gap : rect.top - gap,
        left,
        width,
        placement: vertical,
    };
}
