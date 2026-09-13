<script setup lang="ts">
import {
    ref,
    computed,
    nextTick,
    onMounted,
    onBeforeUnmount,
    type Component,
} from "vue";
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

/* --- отдельные страницы компонентов (наполняются из docs/component-docs) --- */
import C_button from "./pages/components/Button.vue";
import C_avatar from "./pages/components/Avatar.vue";
import C_badge from "./pages/components/Badge.vue";
import C_tag from "./pages/components/Tag.vue";
import C_tooltip from "./pages/components/Tooltip.vue";
import C_divider from "./pages/components/Divider.vue";
import C_progress from "./pages/components/Progress.vue";
import C_input from "./pages/components/Input.vue";
import C_select from "./pages/components/Select.vue";
import C_checkbox from "./pages/components/Checkbox.vue";
import C_checkboxGroup from "./pages/components/CheckboxGroup.vue";
import C_radio from "./pages/components/Radio.vue";
import C_radioGroup from "./pages/components/RadioGroup.vue";
import C_switch from "./pages/components/Switch.vue";
import C_slider from "./pages/components/Slider.vue";
import C_inputNumber from "./pages/components/InputNumber.vue";
import C_rate from "./pages/components/Rate.vue";
import C_form from "./pages/components/Form.vue";
import C_formItem from "./pages/components/FormItem.vue";
import C_card from "./pages/components/Card.vue";
import C_skeleton from "./pages/components/Skeleton.vue";
import C_collapse from "./pages/components/Collapse.vue";
import C_collapseItem from "./pages/components/CollapseItem.vue";
import C_table from "./pages/components/Table.vue";
import C_timeline from "./pages/components/Timeline.vue";
import C_pagination from "./pages/components/Pagination.vue";
import C_empty from "./pages/components/Empty.vue";
import C_menu from "./pages/components/Menu.vue";
import C_popover from "./pages/components/Popover.vue";
import C_dropdown from "./pages/components/Dropdown.vue";
import C_anchor from "./pages/components/Anchor.vue";
import C_tabs from "./pages/components/Tabs.vue";
import C_backtop from "./pages/components/Backtop.vue";
import C_alert from "./pages/components/Alert.vue";
import C_dialog from "./pages/components/Dialog.vue";
import C_drawer from "./pages/components/Drawer.vue";
import C_loading from "./pages/components/Loading.vue";
import C_messageBox from "./pages/components/MessageBox.vue";
import C_message from "./pages/components/Message.vue";
import C_toast from "./pages/components/Toast.vue";
import C_autocomplete from "./pages/components/Autocomplete.vue";
import C_inputTag from "./pages/components/InputTag.vue";
import C_inputOtp from "./pages/components/InputOtp.vue";
import C_image from "./pages/components/Image.vue";
import C_scrollbar from "./pages/components/Scrollbar.vue";
import C_carousel from "./pages/components/Carousel.vue";
import C_mention from "./pages/components/Mention.vue";
import C_upload from "./pages/components/Upload.vue";
import C_cascader from "./pages/components/Cascader.vue";
import C_colorPicker from "./pages/components/ColorPicker.vue";
import C_datePicker from "./pages/components/DatePicker.vue";
import C_calendar from "./pages/components/Calendar.vue";
import C_timeSelect from "./pages/components/TimeSelect.vue";
import C_affix from "./pages/components/Affix.vue";

import { components as componentDocs } from "./docs/component-docs";

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
            "All vibe-ui components with search, groups, and mini previews. Click a card to open its live examples.",
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
/* --- регистрация отдельных страниц компонентов --- */
const componentEntry: Record<string, Component> = {
    button: C_button,
    avatar: C_avatar,
    badge: C_badge,
    tag: C_tag,
    tooltip: C_tooltip,
    divider: C_divider,
    progress: C_progress,
    input: C_input,
    select: C_select,
    checkbox: C_checkbox,
    checkboxGroup: C_checkboxGroup,
    radio: C_radio,
    radioGroup: C_radioGroup,
    switch: C_switch,
    slider: C_slider,
    inputNumber: C_inputNumber,
    rate: C_rate,
    form: C_form,
    formItem: C_formItem,
    card: C_card,
    skeleton: C_skeleton,
    collapse: C_collapse,
    collapseItem: C_collapseItem,
    table: C_table,
    timeline: C_timeline,
    pagination: C_pagination,
    empty: C_empty,
    menu: C_menu,
    popover: C_popover,
    dropdown: C_dropdown,
    anchor: C_anchor,
    tabs: C_tabs,
    backtop: C_backtop,
    alert: C_alert,
    dialog: C_dialog,
    drawer: C_drawer,
    loading: C_loading,
    messageBox: C_messageBox,
    message: C_message,
    toast: C_toast,
    autocomplete: C_autocomplete,
    inputTag: C_inputTag,
    inputOtp: C_inputOtp,
    image: C_image,
    scrollbar: C_scrollbar,
    carousel: C_carousel,
    mention: C_mention,
    upload: C_upload,
    cascader: C_cascader,
    colorPicker: C_colorPicker,
    datePicker: C_datePicker,
    calendar: C_calendar,
    timeSelect: C_timeSelect,
    affix: C_affix,
};

/* Каждая запись в docs/component-docs получает свою страницу "c-<key>". */
for (const [key, doc] of Object.entries(componentDocs)) {
    pages["c-" + key] = {
        component: componentEntry[key],
        titleKey: doc.name,
        description: doc.description,
        anchors: [
            { href: "#component-examples", title: "Examples" },
            { href: "#component-api", title: "API" },
            { href: "#component-contributors", title: "Contributors" },
        ],
    };
}

const active = computed(() => pages[currentPage.value] ?? pages.overview);

function toComponentSlug(key: string): string {
    return key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function pagePath(page: string): string {
    if (page === "overview") return "/";
    if (page.startsWith("c-")) {
        return `/components/${toComponentSlug(page.slice(2))}`;
    }
    return `/${page}`;
}

function pageFromPath(pathname: string): string {
    const path = pathname.replace(/\/+$/, "") || "/";
    if (path === "/") return "overview";

    const componentMatch = path.match(/^\/components\/([^/]+)$/);
    if (componentMatch) {
        const key = Object.keys(componentDocs).find(
            (candidate) => toComponentSlug(candidate) === componentMatch[1],
        );
        if (key) return `c-${key}`;
    }

    return pages[path.slice(1)] ? path.slice(1) : "overview";
}

function scrollToAnchor(anchor?: string) {
    if (!anchor) return;
    nextTick(() =>
        setTimeout(() => {
            document
                .querySelector(`#${CSS.escape(anchor)}`)
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 60),
    );
}

/* Переходы меняют URL, поэтому работают с прямыми ссылками и Back/Forward. */
function navigate(page: string, anchor?: string) {
    currentPage.value = page;
    const hash = anchor ? `#${encodeURIComponent(anchor)}` : "";
    const nextUrl = `${pagePath(page)}${hash}`;
    if (`${window.location.pathname}${window.location.hash}` !== nextUrl) {
        window.history.pushState({ page }, "", nextUrl);
    }
    scrollToAnchor(anchor);
}

function syncRoute() {
    currentPage.value = pageFromPath(window.location.pathname);
    scrollToAnchor(decodeURIComponent(window.location.hash.slice(1)) || undefined);
}

onMounted(() => {
    syncRoute();
    window.addEventListener("popstate", syncRoute);
});

onBeforeUnmount(() => {
    window.removeEventListener("popstate", syncRoute);
});
</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Backtop :visibility-height="150" />

        <Navbar :page-title="t(active.titleKey)" />

        <div class="mx-auto flex max-w-350">
            <Sidebar
                :model-value="currentPage"
                @update:model-value="navigate"
                @navigate="navigate"
            />

            <main class="min-w-0 flex-1 px-8 py-8">
                <OverviewPage
                    v-if="currentPage === 'overview'"
                    @navigate="navigate"
                />
                <component v-else :is="active.component" />
            </main>

            <!-- правая колонка — оглавление текущей страницы (только для страниц с якорями) -->
            <aside
                v-if="active.anchors.length"
                class="hidden w-48 shrink-0 py-8 pr-6 lg:block"
            >
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
