/**
 * Recognizes string union literals like `"top" | "bottom" | "left"` and returns
 * the values for the `enum [...]` badge tooltip.
 * For regular types (string, boolean, etc.) returns an empty array.
 */
export function enumValues(type?: string): string[] {
    if (!type) return [];
    const parts = type
        .split("|")
        .map((p) => p.trim())
        .filter(Boolean);
    if (parts.length < 2) return [];
    if (!parts.every((p) => /^["'][^"']+["']$/.test(p))) return [];
    return parts.map((p) => p.slice(1, -1));
}

/** Tooltip text for the enum badge: values in quotes joined by ` |`, e.g. `"top" | "bottom"`. */
export function enumTip(type?: string): string {
    return enumValues(type)
        .map((v) => `"${v}"`)
        .join(" | ");
}

export function isFunctionType(type?: string): boolean {
    return Boolean(type && /=>/.test(type));
}

export function functionTip(type?: string): string {
    return type?.trim() ?? "function";
}
