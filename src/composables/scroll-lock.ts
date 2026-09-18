let lockCount = 0;

export function lockBodyScroll() {
    if (lockCount === 0) {
        // Lock background scroll without hiding scrollbar or shifting content:
        // `scrollbar-gutter: stable` on <html> reserves scrollbar space so
        // toggling overflow causes no layout shift.
        document.documentElement.style.overflow = "hidden";
    }
    lockCount++;
}

export function unlockBodyScroll() {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
        document.documentElement.style.overflow = "";
    }
}
