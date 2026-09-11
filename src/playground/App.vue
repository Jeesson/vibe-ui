<script setup lang="ts">
import { ref, computed, type Component } from "vue";
import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";
import Navbar from "./layout/Navbar.vue";
import Sidebar from "./layout/Sidebar.vue";
import Backtop from "../components/Backtop/Backtop.vue";
import Anchor from "../components/Anchor/Anchor.vue";

import BasicPage from "./pages/BasicPage.vue";
import FormPage from "./pages/FormPage.vue";
import DataPage from "./pages/DataPage.vue";
import NavigationPage from "./pages/NavigationPage.vue";
import FeedbackPage from "./pages/FeedbackPage.vue";
import MiscPage from "./pages/MiscPage.vue";
import DateTimePage from "./pages/DateTimePage.vue";

const currentPage = ref("basic");

interface PageEntry {
    component: Component;
    title: string;
    description: string;
    anchors: { href: string; title: string }[];
}

const pages: Record<string, PageEntry> = {
    basic: {
        component: BasicPage,
        title: "Базовые",
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
        title: "Форма",
        description:
            "Input, Select, Checkbox, Radio, Switch, Slider, Rate, Form",
        anchors: [
            { href: "#form-input", title: "Input / Select" },
            { href: "#form-checkbox", title: "Checkbox / Radio / Switch" },
            { href: "#form-slider", title: "Slider / Number / Rate" },
            { href: "#form-validation", title: "Form с валидацией" },
        ],
    },
    data: {
        component: DataPage,
        title: "Данные",
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
        title: "Навигация",
        description: "Menu, Popover, Dropdown",
        anchors: [
            { href: "#nav-menu", title: "Menu" },
            { href: "#nav-popover", title: "Popover / Dropdown" },
        ],
    },
    feedback: {
        component: FeedbackPage,
        title: "Feedback",
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
        title: "Разное",
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
        title: "Дата и время",
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

const active = computed(() => pages[currentPage.value]);
</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Backtop :visibility-height="150" />

        <Navbar :page-title="active.title" />

        <div class="mx-auto flex max-w-[1400px]">
            <Sidebar v-model="currentPage" />

            <main class="min-w-0 flex-1 px-8 py-8">
                <div class="mb-6">
                    <h1 class="text-lg font-semibold text-gray-900">
                        {{ active.title }}
                    </h1>
                    <p class="mt-0.5 text-sm text-gray-400">
                        {{ active.description }}
                    </p>
                </div>

                <component :is="active.component" />
            </main>

            <!-- правая колонка — оглавление текущей страницы -->
            <aside class="hidden w-48 shrink-0 py-8 pr-6 lg:block">
                <div class="sticky top-20">
                    <p
                        class="mb-2 text-xs font-medium tracking-wide text-gray-400 uppercase"
                    >
                        На странице
                    </p>
                    <Anchor :key="currentPage" :links="active.anchors" />
                </div>
            </aside>
        </div>
    </div>
</template>
