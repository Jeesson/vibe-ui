export function toISODate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}

export interface CalendarCell {
    date: Date;
    iso: string;
    inCurrentMonth: boolean;
    isToday: boolean;
}

// Monday-first grid covering the full weeks needed to show the given month.
export function buildMonthGrid(year: number, month: number): CalendarCell[] {
    const first = new Date(year, month, 1);
    const startOffset = (first.getDay() + 6) % 7; // 0 = Monday
    const gridStart = new Date(year, month, 1 - startOffset);
    const todayIso = toISODate(new Date());

    return Array.from({ length: 42 }, (_, i) => {
        const date = new Date(gridStart);
        date.setDate(gridStart.getDate() + i);
        return {
            date,
            iso: toISODate(date),
            inCurrentMonth: date.getMonth() === month,
            isToday: toISODate(date) === todayIso,
        };
    });
}

export const WEEKDAY_LABELS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
export const MONTH_LABELS = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
];
