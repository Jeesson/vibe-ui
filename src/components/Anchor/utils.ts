export function isWindow(val: unknown): val is Window {
    return typeof window !== "undefined" && val === window;
}

export function isUndefined(val: unknown): val is undefined {
    return val === undefined;
}

export function getElement(selector?: string | HTMLElement | Window | null): HTMLElement | Window | null {
    if (!selector) return null;
    if (typeof selector === "string") {
        if (typeof document === "undefined") return null;
        try {
            if (selector.startsWith("#")) {
                return document.getElementById(decodeURIComponent(selector.slice(1)));
            }
            return document.querySelector<HTMLElement>(selector);
        } catch {
            return null;
        }
    }
    return selector;
}

// Originally resolves where to read scrollTop for target relative to container.
// Here container is already pre-resolved, so return it directly.
export function getScrollElement(_target: HTMLElement, container: HTMLElement | Window): HTMLElement | Window {
    return container;
}

export function getScrollTop(container: HTMLElement | Window): number {
    return isWindow(container) ? window.scrollY : container.scrollTop;
}

export function getMaxScrollTop(container: HTMLElement | Window): number {
    if (isWindow(container)) {
        const root = document.scrollingElement ?? document.documentElement;
        return Math.max(0, root.scrollHeight - document.documentElement.clientHeight);
    }
    return Math.max(0, container.scrollHeight - container.clientHeight);
}

/** Bottom threshold: enter at 2px, exit at 8px to prevent rounding flicker. */
export function resolveActiveHref(
    positions: { top: number; href: string }[],
    scrollTop: number,
    maxScrollTop: number,
    currentHref: string,
    selectScrollTop: boolean,
): string {
    const sorted = [...positions].sort((a, b) => a.top - b.top);
    if (!sorted.length) return "";
    const top = Math.max(0, Math.min(scrollTop, maxScrollTop));
    if (top <= 0) return selectScrollTop ? sorted[0].href : "";
    const last = sorted[sorted.length - 1];
    const bottomTolerance = currentHref === last.href ? 8 : 2;
    if (maxScrollTop > 0 && maxScrollTop - top <= bottomTolerance) return last.href;

    let candidate = -1;
    for (let i = 0; i < sorted.length; i++) {
        if (sorted[i].top <= top) candidate = i;
        else break;
    }
    const current = sorted.findIndex((item) => item.href === currentHref);
    // 2px hysteresis for regular section boundaries.
    if (current !== -1 && current !== candidate) {
        const boundary = candidate > current ? sorted[candidate].top : sorted[current].top;
        if (Math.abs(top - boundary) <= 2) return currentHref;
    }
    return candidate === -1 ? "" : sorted[candidate].href;
}

export function getOffsetTopDistance(target: HTMLElement, scrollContainer: HTMLElement | Window): number {
    const rect = target.getBoundingClientRect();
    if (isWindow(scrollContainer)) {
        return rect.top + window.scrollY;
    }
    const containerRect = scrollContainer.getBoundingClientRect();
    return rect.top - containerRect.top - scrollContainer.clientTop + scrollContainer.scrollTop;
}

// Throttles via rAF to cap execution at 1/frame and reduce scroll jitter.
export function throttleByRaf<T extends (...args: any[]) => void>(fn: T) {
    let rafId: number | null = null;
    const throttled = ((...args: Parameters<T>) => {
        if (rafId !== null) return;
        rafId = requestAnimationFrame(() => {
            rafId = null;
            fn(...args);
        });
    }) as T & { cancel: () => void };
    throttled.cancel = () => {
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    };
    return throttled;
}

// Returns cancel function to allow interrupting ongoing animation on repeated click.
export function animateScrollTo(
    container: HTMLElement | Window,
    from: number,
    to: number,
    duration: number,
    callback?: () => void,
): () => void {
    let rafId: number | null = null;
    let cancelled = false;
    const startedAt = performance.now();
    const setScrollTop = (value: number) => {
        // Prevent secondary smooth animation from CSS scroll-behavior.
        container.scrollTo({ top: value, behavior: "instant" });
    };
    const step = (now: number) => {
        rafId = null;
        if (cancelled) return;
        const progress = duration <= 0 ? 1 : Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setScrollTop(from + (to - from) * eased);
        if (progress < 1) {
            rafId = requestAnimationFrame(step);
        } else {
            callback?.();
        }
    };
    rafId = requestAnimationFrame(step);
    return () => {
        cancelled = true;
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = null;
    };
}
