<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";
import Navbar from "./layout/Navbar.vue";
import Sidebar from "./layout/Sidebar.vue";
import Backtop from "../components/Backtop/Backtop.vue";
import Anchor from "../components/Anchor/Anchor.vue";
import { useLocale } from "./composables/ui-locale";
import {
    componentAnchors,
    componentKeyFromSlug,
    pageKeyToPath,
} from "./component-pages";
import { components as componentDocs } from "./docs/component-docs";

const { t } = useLocale();
const route = useRoute();
const router = useRouter();

/* Оглавление страницы обзора (якоря групп OverviewPage). */
const overviewAnchors = [
    { href: "#ov-group-basic", title: "Basic" },
    { href: "#ov-group-form", title: "Form" },
    { href: "#ov-group-data", title: "Data" },
    { href: "#ov-group-navigation", title: "Navigation" },
    { href: "#ov-group-feedback", title: "Feedback" },
    { href: "#ov-group-misc", title: "Misc" },
    { href: "#ov-group-datetime", title: "Date & Time" },
];

/* Ключ дока текущего компонента (если активен маршрут /components/:slug). */
const componentKey = computed(() =>
    route.name === "component"
        ? componentKeyFromSlug(String(route.params.slug ?? ""))
        : null,
);

/* Заголовок в Navbar: имя компонента или перевод «Обзор». */
const pageTitle = computed(() =>
    componentKey.value
        ? componentDocs[componentKey.value].name
        : t.value("overview.title"),
);

/* Оглавление справа для текущего маршрута. */
const anchors = computed(() =>
    componentKey.value ? componentAnchors : overviewAnchors,
);

/* Активный пункт сайдбара ("overview" | "c-<key>"). */
const currentPage = computed(() =>
    componentKey.value ? `c-${componentKey.value}` : "overview",
);

/* Клик по сайдбару/карточке обзора → vue-router. */
function navigate(page: string, anchor?: string) {
    router.push(pageKeyToPath(page, anchor));
}
</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Backtop :visibility-height="150" />

        <Navbar :page-title="pageTitle" />

        <div class="mx-auto flex max-w-350">
            <Sidebar
                :model-value="currentPage"
                @update:model-value="navigate"
                @navigate="navigate"
            />

            <main class="min-w-0 flex-1 px-8 py-8">
                <RouterView />
            </main>

            <!-- правая колонка — оглавление текущей страницы -->
            <aside
                v-if="anchors.length"
                class="hidden w-48 shrink-0 py-8 pr-6 lg:block"
            >
                <div class="sticky top-20">
                    <p
                        class="mb-2 text-xs font-medium tracking-wide text-gray-400 uppercase"
                    >
                        {{ t("page.onPage") }}
                    </p>
                    <Anchor
                        :key="route.path"
                        :links="anchors"
                        :offset="80"
                        :bound="20"
                    />
                </div>
            </aside>
        </div>
    </div>
</template>
