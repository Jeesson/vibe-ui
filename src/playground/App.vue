<script setup lang="ts">
import { ref, computed, nextTick, type Component } from "vue";
import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";
import Navbar from "./layout/Navbar.vue";
import Sidebar from "./layout/Sidebar.vue";
import Backtop from "../components/Backtop/Backtop.vue";
import Anchor from "../components/Anchor/Anchor.vue";
import { useLocale } from "./composables/ui-locale";

import OverviewPage from "./pages/OverviewPage.vue";
import BasicPage from "./pages/BasicPage.vue";
import FormPage from "./pages/FormPage.vue";
import DataPage from "./pages/DataPage.vue";
import NavigationPage from "./pages/NavigationPage.vue";
import FeedbackPage from "./pages/FeedbackPage.vue";
import MiscPage from "./pages/MiscPage.vue";
import DateTimePage from "./pages/DateTimePage.vue";

const { t } = useLocale();

const currentPage = ref<string>("overview");

interface PageEntry {
    component: Component;
    titleKey: string;
    description: string;
    anchors: { href: string; title: string }[];
}

const pages: Record<string, PageEntry> = {
    overview: {
        component: OverviewPage,
        titleKey: "overview.title",
        description:
            "Все компоненты complex-ui: поиск, группы и мини-превью. Клик по карточке — переход к живым примерам.",
        anchors: [
            { href: "#ov-group-basic", title: "Basic" },
            { href: "#ov-group-form", title: "Form" },
            { href: "#ov-group-data", title: "Data" },
            { href: "#ov-group-navigation", title: "Navigation" },
            { href: "#ov-group-feedback", title: "Feedback" },
            { href: "#ov-group-misc", title: "Misc" },
            { href: "#ov-group-datetime", title: "Date & Time" },
        ],
    },
    basic: {
        component: BasicPage,
        titleKey: "nav.basic",
        description: "Button, Avatar, Badge, Tag, Tooltip, Divider, Progress",
        anchors: [
            { href: "#basic-button", title: "Button" },
            { href: "#basic-avatar", title: "Avatar / Badge" },
            { href: "#basic-tag", title: "Tag / Tooltip" },
            { href: "#basic-divider", title: "Divider" },
            { href: "#basic-progress", title: "Progress" },
        ],
    },
    form: {
        component: FormPage,
        titleKey: "nav.form",
        description:
            "Input, Select, Checkbox, Radio, Switch, Slider, Rate, Form",
        anchors: [
            { href: "#form-input", title: "Input / Select" },
            { href: "#form-checkbox", title: "Checkbox / Radio / Switch" },
            { href: "#form-slider", title: "Slider / Number / Rate" },
            { href: "#form-validation", title: "Form" },
        ],
    },
    data: {
        component: DataPage,
        titleKey: "nav.data",
        description:
            "Card, Skeleton, Collapse, Table, Timeline, Pagination, Empty",
        anchors: [
            { href: "#data-card", title: "Card" },
            { href: "#data-skeleton", title: "Skeleton" },
            { href: "#data-collapse", title: "Collapse" },
            { href: "#data-table", title: "Table" },
            { href: "#data-timeline", title: "Timeline" },
            { href: "#data-pagination", title: "Pagination" },
            { href: "#data-empty", title: "Empty" },
        ],
    },
    navigation: {
        component: NavigationPage,
        titleKey: "nav.navigation",
        description: "Menu, Popover, Dropdown",
        anchors: [
            { href: "#nav-menu", title: "Menu" },
            { href: "#nav-popover", title: "Popover / Dropdown" },
        ],
    },
    feedback: {
        component: FeedbackPage,
        titleKey: "nav.feedback",
        description: "Alert, Toast, Dialog, Drawer, Loading, MessageBox",
        anchors: [
            { href: "#feedback-alert", title: "Alert" },
            { href: "#feedback-toast", title: "Toast" },
            { href: "#feedback-dialog", title: "Dialog / Drawer" },
            { href: "#feedback-loading", title: "Loading" },
            { href: "#feedback-messagebox", title: "MessageBox" },
        ],
    },
    misc: {
        component: MiscPage,
        titleKey: "nav.misc",
        description: "Autocomplete, InputTag, InputOtp, Image, Scrollbar",
        anchors: [
            { href: "#misc-autocomplete", title: "Autocomplete" },
            { href: "#misc-inputtag", title: "InputTag" },
            { href: "#misc-inputotp", title: "InputOtp" },
            { href: "#misc-image", title: "Image" },
            { href: "#misc-scrollbar", title: "Scrollbar" },
        ],
    },
    datetime: {
        component: DateTimePage,
        titleKey: "nav.datetime",
        description:
            "Cascader, ColorPicker, DatePicker, Calendar, TimeSelect, Upload, Carousel, Mention, Affix",
        anchors: [
            { href: "#datetime-affix", title: "Affix" },
            { href: "#datetime-cascader", title: "Cascader" },
            { href: "#datetime-colorpicker", title: "ColorPicker" },
            { href: "#datetime-datepicker", title: "DatePicker / TimeSelect" },
            { href: "#datetime-calendar", title: "Calendar" },
            { href: "#datetime-upload", title: "Upload" },
            { href: "#datetime-carousel", title: "Carousel" },
            { href: "#datetime-mention", title: "Mention" },
        ],
    },
};
const active = computed(() => pages[currentPage.value] ?? pages.overview);

/* переход по подссылке из сайдбара: сменить страницу и проскроллить к якорю */
function navigate(page: string, anchor: string) {
    currentPage.value = page;
    nextTick(() =>
        setTimeout(() => {
            document
                .querySelector("#" + anchor)
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 60),
    );
}
</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Backtop :visibility-height="150" />

        <Navbar :page-title="t(active.titleKey)" />

        <div class="mx-auto flex max-w-350">
            <Sidebar v-model="currentPage" @navigate="navigate" />

            <main class="min-w-0 flex-1 px-8 py-8">
                <div class="mb-6">
                    <h1 class="text-lg font-semibold text-gray-900">
                        {{ t(active.titleKey) }}
                    </h1>
                    <p class="mt-0.5 text-sm text-gray-400">
                        {{ active.description }}
                    </p>
                </div>

                <OverviewPage
                    v-if="currentPage === 'overview'"
                    @navigate="navigate"
                />
                <component v-else :is="active.component" />
            </main>

            <!-- правая колонка — оглавление текущей страницы -->
            <aside class="hidden w-48 shrink-0 py-8 pr-6 lg:block">
                <div class="sticky top-20">
                    <p
                        class="mb-2 text-xs font-medium tracking-wide text-gray-400 uppercase"
                    >
                        {{ t("page.onPage") }}
                    </p>
                    <Anchor :key="currentPage" :links="active.anchors" />
                </div>
            </aside>
        </div>
    </div>
</template>
