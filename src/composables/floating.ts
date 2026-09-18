export interface FloatingRect {
    top: number;
    left: number;
    width: number;
    placement: "top" | "bottom";
}

// Шесть позиционок плавающей панели: сторона (top/bottom) × выравнивание
// (start = по левому краю триггера, center, end = по правому).
export type PanelPlacement = "bottom-start" | "bottom" | "bottom-end" | "top-start" | "top" | "top-end";

// Считает позицию плавающей панели относительно триггера в viewport-координатах
// (используется с position: fixed после Teleport в body). Разворачивает панель
// вверх, если снизу не хватает места, но сверху его больше, и поджимает левый
// край, если панель шире триггера и вылезает за правый край экрана.
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

// Позиционирование по явному placement из шести. Запрошенная сторона
// сохраняется, если панели хватает места; иначе — автопереворот на
// противоположную (bottom ⇄ top). Горизонталь всегда поджимается в экран.
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
