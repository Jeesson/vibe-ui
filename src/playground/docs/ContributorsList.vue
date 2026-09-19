<script setup lang="ts">
import { computed } from "vue";
import { avatarColors } from "../../composables/avatar-color";
import { useLocale } from "../composables/ui-locale";
import type { Contributor } from "./component-docs";

const props = defineProps<{ contributors?: Contributor[] }>();

const { t } = useLocale();

function initials(name: string): string {
    const parts = name.trim().split(/\s+/);
    return parts
        .map((p) => p[0] ?? "")
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

// Stable avatar palette per contributor (deterministic by name/github).
const colored = computed(() =>
    (props.contributors ?? []).map((c) => ({
        ...c,
        colors: avatarColors(c.github ?? c.name),
    })),
);
</script>

<template>
    <section id="component-contributors" class="mt-5 scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5">
        <h3 class="mb-4 text-xs font-semibold tracking-wide text-gray-400 uppercase">
            {{ t("docs.contributors") }}
        </h3>
        <ul class="flex flex-col gap-2">
            <li v-for="c in colored" :key="c.github ?? c.name" class="flex items-center gap-3">
                <span
                    class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium"
                    :style="{ backgroundColor: c.colors.bg, color: c.colors.fg }">
                    {{ initials(c.name) }}
                </span>
                <div>
                    <a
                        v-if="c.github"
                        :href="'https://github.com/' + c.github"
                        target="_blank"
                        rel="noopener"
                        class="hover:text-primary-700 text-sm font-medium text-gray-800">
                        {{ c.name }}
                        <span class="text-gray-400">@{{ c.github }}</span>
                    </a>
                    <p v-else class="text-sm font-medium text-gray-800">
                        {{ c.name }}
                    </p>
                    <p v-if="c.role" class="text-xs text-gray-400">{{ c.role }}</p>
                </div>
            </li>
        </ul>
    </section>
</template>
