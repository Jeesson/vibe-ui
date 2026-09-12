let lockCount = 0;

export function lockBodyScroll() {
    if (lockCount === 0) {
        // Прокрутку фона блокируем, но НЕ прячем скроллбар и не сдвигаем
        // контент: `scrollbar-gutter: stable` на <html> (см. styles/main.css)
        // постоянно резервирует место под скроллбар, поэтому переключение
        // overflow не вызывает скачка страницы.
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
