<script setup lang="ts">
import { ref, onMounted } from "vue";
import Dropdown from "../../components/Dropdown/Dropdown.vue";
import { useLocale, type Locale } from "../composables/ui-locale";
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";

defineProps<{ pageTitle?: string }>();

const { locale, t, setLocale } = useLocale();

const langLabel: Record<Locale, string> = { ru: "RU", en: "EN" };

/* dark / light */
const dark = ref(false);

function applyDark(next: boolean) {
    dark.value = next;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("vibe-ui-theme", next ? "dark" : "light");
}

onMounted(() => {
    const saved = localStorage.getItem("vibe-ui-theme");
    applyDark(
        saved
            ? saved === "dark"
            : window.matchMedia("(prefers-color-scheme: dark)").matches,
    );
});
</script>

<template>
    <header
        class="vibe-ui-navbar sticky top-0 z-30 h-14 border-b border-gray-100 bg-white/80 backdrop-blur"
    >
        <div
            class="mx-auto flex h-full max-w-350 items-center justify-between px-5"
        >
            <div class="flex items-center gap-3">
                <div class="flex items-center gap-2">
                    <span class="text-sm font-semibold text-gray-900">
                        Vibe UI
                    </span>
                </div>

                <span class="text-gray-300">/</span>
                <span class="text-sm text-gray-500">{{ pageTitle }}</span>
            </div>

            <div class="flex items-center gap-1">
                <!-- переключение языка -->
                <Dropdown
                    :items="[
                        { label: 'Русский', value: 'ru' },
                        { label: 'English', value: 'en' },
                    ]"
                    placement="bottom-end"
                    @select="(v) => setLocale(v as Locale)"
                >
                    <button
                        type="button"
                        class="flex h-8 cursor-pointer items-center gap-1 rounded-md px-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            class="h-4 w-4"
                        >
                            <circle cx="12" cy="12" r="9" />
                            <path
                                d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z"
                            />
                        </svg>
                        {{ langLabel[locale] }}
                    </button>
                </Dropdown>

                <!-- dark / light -->
                <button
                    type="button"
                    class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-700"
                    :title="dark ? 'Light mode' : 'Dark mode'"
                    @click="applyDark(!dark)"
                >
                    <SunIcon v-if="dark" class="h-4.5 w-4.5" />
                    <MoonIcon v-else class="h-4.5 w-4.5" />
                </button>

                <!-- ссылка на GitHub -->
                <a
                    href="https://github.com/Jeesson/vibe-ui"
                    target="_blank"
                    rel="noopener"
                    title="GitHub"
                    class="flex h-8 w-8 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-700"
                >
                    <svg
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        aria-hidden="true"
                        class="h-4.5 w-4.5"
                    >
                        <path
                            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
                        />
                    </svg>
                </a>
            </div>
        </div>
    </header>
</template>

<style scoped>
/* Точечная «сетка» поверх blur-подложки. Прозрачные точки в 1px — цвет
   просвечивает из --bg-color (тот же, что у фона шапки). */
.vibe-ui-navbar {
    --bg-color: rgba(255, 255, 255, 0.8);
    background-image: radial-gradient(transparent 1px, var(--bg-color) 1px);
    background-size: 10px 10px;
}
.dark .vibe-ui-navbar,
.dark.vibe-ui-navbar {
    --bg-color: oklch(0.21 0.02 264 / 0.8);
}
</style>
