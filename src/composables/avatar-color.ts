// Deterministic "random" color derived from a string (name / initials / src):
// the same input always produces the same color. Shared by Avatar.vue (user
// avatars) and playground/docs/ContributorsList.vue (contributor avatars) —
// the palette + hash pair used to be duplicated in both places.
const BG_PALETTE = [
    "oklch(0.9 0.05 20)", // pink
    "oklch(0.9 0.05 60)", // orange
    "oklch(0.9 0.05 140)", // green
    "oklch(0.9 0.05 200)", // cyan
    "oklch(0.9 0.05 260)", // blue
    "oklch(0.9 0.05 300)", // purple
];
const TEXT_PALETTE = [
    "oklch(0.45 0.15 20)",
    "oklch(0.45 0.15 60)",
    "oklch(0.45 0.15 140)",
    "oklch(0.45 0.15 200)",
    "oklch(0.45 0.15 260)",
    "oklch(0.45 0.15 300)",
];

function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

/** Background/text pair for the given seed (empty seed falls back to "default"). */
export function avatarColors(seed: string): { bg: string; fg: string } {
    const index = hashString(seed || "default") % BG_PALETTE.length;
    return { bg: BG_PALETTE[index], fg: TEXT_PALETTE[index] };
}
