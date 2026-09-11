let lockCount = 0;

export function lockBodyScroll() {
    if (lockCount === 0) {
        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.overflow = "hidden";
        if (scrollbarWidth > 0) {
            document.documentElement.style.paddingRight = scrollbarWidth + "px";
        }
    }
    lockCount++;
}

export function unlockBodyScroll() {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
        document.documentElement.style.overflow = "";
        document.documentElement.style.paddingRight = "";
    }
}
