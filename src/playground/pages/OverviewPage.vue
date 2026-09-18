<script setup lang="ts">
import { computed, ref } from "vue";
import { ArrowUpIcon, CalendarDaysIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { components } from "../docs/component-docs";
import { useRouter } from "vue-router";
import { pageKeyToPath } from "../component-pages";

const router = useRouter();
interface Item {
    name: string;
    key: string;
    page: string;
    mock: string;
}
interface Group {
    id: string;
    title: string;
    items: Item[];
}

/* ---------------------------------------------------------------------------
 * Обзор строится АВТОМАТИЧЕСКИ из док-движка (component-docs.ts):
 * новый компонент, добавленный туда, появится здесь сам.
 * Ниже — только уточнения: группа и превью-mock отдельных компонентов.
 * ------------------------------------------------------------------------- */

type PageId = "basic" | "form" | "data" | "navigation" | "feedback" | "misc" | "datetime";

/** Компоненты, которые в доках лежат в misc, но показываются на странице datetime. */
const DATETIME_KEYS = new Set([
    "cascader",
    "colorPicker",
    "datePicker",
    "timeSelect",
    "calendar",
    "upload",
    "carousel",
    "mention",
    "affix",
]);

/** Ручные уточнения по конкретным компонентам. */
interface Override {
    name?: string;
    page?: PageId;
    mock?: string;
}
const OVERRIDES: Record<string, Override> = {
    checkboxGroup: { mock: "check" },
    radioGroup: { mock: "check" },
    form: { mock: "form" },
    formItem: { mock: "form" },
    dropdown: { mock: "menu" },
    /* Демо Anchor/Backtop показываем в группе Navigation. */
    anchor: { page: "navigation", mock: "anchor" },
    backtop: { page: "navigation", mock: "backtop" },
    messageBox: { name: "MessageBox", mock: "dialog" },
    message: { name: "Message", mock: "toast" },
};

/** Превью-mock'и, отличные от дефолтного "input". */
const MOCKS: Record<string, string> = {
    button: "button",
    avatar: "avatar",
    badge: "avatar",
    tag: "tags",
    tooltip: "tooltip",
    divider: "divider",
    progress: "progress",
    checkbox: "check",
    switch: "switch",
    slider: "slider",
    rate: "rate",
    card: "card",
    skeleton: "skeleton",
    collapse: "collapse",
    tabs: "tabs",
    table: "table",
    timeline: "timeline",
    pagination: "pagination",
    empty: "empty",
    menu: "menu",
    popover: "popover",
    anchor: "anchor",
    backtop: "backtop",
    alert: "alert",
    toast: "toast",
    dialog: "dialog",
    loading: "loading",
    inputTag: "tags",
    inputOtp: "otp",
    image: "image",
    scrollbar: "scrollbar",
    colorPicker: "color",
    datePicker: "datepicker",
    calendar: "calendar",
    upload: "upload",
    carousel: "carousel",
};

const GROUP_META: { page: PageId; title: string }[] = [
    { page: "basic", title: "Basic" },
    { page: "form", title: "Form" },
    { page: "data", title: "Data" },
    { page: "navigation", title: "Navigation" },
    { page: "feedback", title: "Feedback" },
    { page: "misc", title: "Misc" },
    { page: "datetime", title: "Date and Time" },
];

function toItem(doc: (typeof components)[string]): Item {
    const page: PageId = OVERRIDES[doc.key]?.page ?? (DATETIME_KEYS.has(doc.key) ? "datetime" : doc.group);
    return {
        name: OVERRIDES[doc.key]?.name ?? doc.name,
        key: doc.key,
        page,
        mock: OVERRIDES[doc.key]?.mock ?? MOCKS[doc.key] ?? "input",
    };
}

const groups: Group[] = GROUP_META.map((meta) => ({
    id: `ov-group-${meta.page}`,
    title: meta.title,
    items: Object.values(components)
        .filter((doc) => toItem(doc).page === meta.page)
        .map(toItem),
}));

const total = computed(() => groups.reduce((n, g) => n + g.items.length, 0));
const search = ref("");
const filtered = computed(() => {
    const q = search.value.trim().toLowerCase();
    if (!q) return groups;
    return groups
        .map((g) => ({
            ...g,
            items: g.items.filter((i) => i.name.toLowerCase().includes(q)),
        }))
        .filter((g) => g.items.length > 0);
});
function go(item: Item) {
    router.push(pageKeyToPath("c-" + item.key));
}
</script>
<template>
    <div class="ov">
        <div class="ov-search">
            <div class="ov-search-box">
                <MagnifyingGlassIcon class="ov-search-icon" aria-hidden="true" />
                <input v-model="search" class="ov-search-input" type="text" autocomplete="off" placeholder="Search Components" />
                <button v-if="search" class="ov-search-clear" @click="search = ''" aria-label="Clear">
                    <XMarkIcon class="h-3.5 w-3.5" aria-hidden="true" />
                </button>
            </div>
            <span class="ov-total">{{ total }} components</span>
        </div>
        <div v-for="g in filtered" :key="g.id" :id="g.id" class="ov-group">
            <p class="ov-title">
                {{ g.title }} <span class="ov-count">{{ g.items.length }}</span>
            </p>
            <div class="ov-cards">
                <button v-for="item in g.items" :key="item.name" class="ov-card" @click="go(item)" :title="'Open ' + item.name">
                    <span class="ov-card-name">{{ item.name }}</span>
                    <span class="ov-preview">
                        <span v-if="item.mock === 'button'" class="mk mk-btn">Button</span>
                        <span v-else-if="item.mock === 'input'" class="mk mk-input"><i></i></span>
                        <span v-else-if="item.mock === 'check'" class="mk mk-check"><i></i><i class="on"></i></span>
                        <span v-else-if="item.mock === 'switch'" class="mk mk-switch"><i></i></span>
                        <span v-else-if="item.mock === 'slider'" class="mk mk-slider"><i></i></span>
                        <span v-else-if="item.mock === 'rate'" class="mk mk-rate">* * * *</span>
                        <span v-else-if="item.mock === 'avatar'" class="mk mk-avatar"><i></i><i></i></span>
                        <span v-else-if="item.mock === 'tags'" class="mk mk-tags"><i></i><i></i><i></i></span>
                        <span v-else-if="item.mock === 'tooltip'" class="mk mk-tip"><i></i><b>tip</b></span>
                        <span v-else-if="item.mock === 'divider'" class="mk mk-div"><i></i></span>
                        <span v-else-if="item.mock === 'progress'" class="mk mk-prog"><i></i></span>
                        <span v-else-if="item.mock === 'form'" class="mk mk-form"><i></i><i></i><b></b></span>
                        <span v-else-if="item.mock === 'card'" class="mk mk-card"><i></i><i></i></span>
                        <span v-else-if="item.mock === 'skeleton'" class="mk mk-skel"><i></i><i></i><i></i></span>
                        <span v-else-if="item.mock === 'collapse'" class="mk mk-col"><i></i><i></i></span>
                        <span v-else-if="item.mock === 'tabs'" class="mk mk-tabs"><i></i><i></i></span>
                        <span v-else-if="item.mock === 'table'" class="mk mk-table"><i></i><i></i><i></i></span>
                        <span v-else-if="item.mock === 'timeline'" class="mk mk-tl"><i></i><i></i></span>
                        <span v-else-if="item.mock === 'pagination'" class="mk mk-pg"><i></i><i></i><i></i></span>
                        <span v-else-if="item.mock === 'menu'" class="mk mk-menu"><i></i><i></i><i></i></span>
                        <span v-else-if="item.mock === 'popover'" class="mk mk-pop"><i></i><b></b></span>
                        <span v-else-if="item.mock === 'anchor'" class="mk mk-anchor"><i></i><i></i></span>
                        <span v-else-if="item.mock === 'backtop'" class="mk mk-backtop"><ArrowUpIcon aria-hidden="true" /></span>
                        <span v-else-if="item.mock === 'alert'" class="mk mk-alert"><i></i></span>
                        <span v-else-if="item.mock === 'toast'" class="mk mk-toast">Toast</span>
                        <span v-else-if="item.mock === 'dialog'" class="mk mk-dialog"><i></i><b></b></span>
                        <span v-else-if="item.mock === 'loading'" class="mk mk-load"><i></i></span>
                        <span v-else-if="item.mock === 'otp'" class="mk mk-otp"><i></i><i></i><i></i><i></i></span>
                        <span v-else-if="item.mock === 'image'" class="mk mk-img"><i></i></span>
                        <span v-else-if="item.mock === 'scrollbar'" class="mk mk-scroll"><i></i></span>
                        <span v-else-if="item.mock === 'color'" class="mk mk-color"><i></i><i></i><i></i></span>
                        <span v-else-if="item.mock === 'datepicker'" class="mk mk-datepicker">
                            <span>12.09.2026</span>
                            <CalendarDaysIcon aria-hidden="true" />
                        </span>
                        <span v-else-if="item.mock === 'calendar'" class="mk mk-cal">
                            <b>Сентябрь 2026</b><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
                        </span>
                        <span v-else-if="item.mock === 'upload'" class="mk mk-upload"><i></i></span>
                        <span v-else-if="item.mock === 'carousel'" class="mk mk-car"><i></i></span>
                        <span v-else-if="item.mock === 'empty'" class="mk mk-empty">empty</span>
                        <span v-else class="mk mk-empty">...</span>
                    </span>
                </button>
            </div>
        </div>
        <div v-if="filtered.length === 0" class="ov-empty">Nothing found</div>
    </div>
</template>
<style scoped>
.ov {
    display: flex;
    flex-direction: column;
    gap: 22px;
}
.ov-search {
    display: flex;
    align-items: center;
    gap: 12px;
}
.ov-search-box {
    position: relative;
    width: 100%;
    max-width: 420px;
}
.ov-search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    width: 16px;
    height: 16px;
    transform: translateY(-50%);
    color: #9ca3af;
}
.ov-search-input {
    width: 100%;
    height: 40px;
    padding: 0 34px 0 36px;
    font-size: 14px;
    color: #111827;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    outline: none;
}
.ov-search-input:focus {
    border-color: #6366f1;
}
.ov-search-clear {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    border-radius: 999px;
    border: none;
    background: #f3f4f6;
    color: #6b7280;
    cursor: pointer;
    line-height: 1;
}
.ov-total {
    font-size: 12px;
    color: #9ca3af;
}
.ov-group {
    scroll-margin-top: 64px;
}
.ov-title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 10px;
    font-size: 15px;
    font-weight: 650;
    color: #172033;
}
.ov-count {
    min-width: 22px;
    height: 20px;
    padding: 0 7px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    color: #fff;
    background: #6366f1;
    border-radius: 999px;
}
.ov-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(168px, 1fr));
    gap: 12px;
}
.ov-card {
    display: flex;
    flex-direction: column;
    text-align: left;
    background: #ffffff;
    border: 1px solid #e7eaf0;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    padding: 0;
    transition: border-color 0.15s;
}
.ov-card:hover {
    border-color: #a5b4fc;
}
.ov-card:focus-visible {
    outline: 3px solid rgba(99, 102, 241, 0.2);
    outline-offset: 2px;
}
.ov-card-name {
    padding: 10px 12px;
    font-size: 13px;
    font-weight: 600;
    color: #263247;
    background: #ffffff;
    border-bottom: 1px solid #edf0f5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.ov-preview {
    height: 108px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f6f8fc;
    padding: 12px;
}
.mk {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}
.mk i,
.mk b {
    display: block;
    background: #e2e8f0;
    border-radius: 4px;
}
.mk-btn {
    background: #6366f1;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    padding: 6px 22px;
    border-radius: 5px;
}
.mk-input {
    width: 120px;
    height: 24px;
    border: 1px solid #e2e8f0;
    border-radius: 5px;
    background: #fff;
    justify-content: flex-start;
    padding: 0 8px;
}
.mk-input i {
    width: 44px;
    height: 6px;
    background: #6366f1;
}
.mk-check i {
    width: 14px;
    height: 14px;
    border-radius: 4px;
    border: 1px solid #cbd5e1;
    background: #fff;
}
.mk-check i.on {
    background: #6366f1;
    border-color: #6366f1;
}
.mk-switch {
    width: 40px;
    height: 22px;
    border-radius: 999px;
    background: #e2e8f0;
    justify-content: flex-start;
    padding: 2px;
}
.mk-switch i {
    width: 18px;
    height: 18px;
    border-radius: 999px;
    margin-left: 18px;
    background: #6366f1;
}
.mk-slider i {
    width: 110px;
    height: 4px;
    background: linear-gradient(90deg, #6366f1 55%, #e2e8f0 55%);
}
.mk-rate {
    color: #f59e0b;
    letter-spacing: 2px;
    font-size: 14px;
}
.mk-avatar i:first-child {
    width: 34px;
    height: 34px;
    border-radius: 999px;
    background: #c7d2fe;
}
.mk-avatar i:last-child {
    width: 16px;
    height: 16px;
    border-radius: 999px;
    background: #ef4444;
    margin-left: -10px;
    margin-top: -22px;
}
.mk-tags i {
    height: 18px;
    border-radius: 999px;
}
.mk-tags i:nth-child(1) {
    width: 44px;
    background: #dbeafe;
}
.mk-tags i:nth-child(2) {
    width: 52px;
    background: #dcfce7;
}
.mk-tags i:nth-child(3) {
    width: 38px;
    background: #fef3c7;
}
.mk-tip i {
    width: 70px;
    height: 24px;
    background: #fff;
    border: 1px solid #e2e8f0;
}
.mk-tip b {
    background: #111827;
    color: #fff;
    font-size: 10px;
    padding: 3px 8px;
    border-radius: 6px;
}
.mk-div i {
    width: 120px;
    height: 2px;
}
.mk-prog i {
    width: 110px;
    height: 8px;
    background: linear-gradient(90deg, #6366f1 65%, #e2e8f0 65%);
    border-radius: 999px;
}
.mk-form {
    flex-direction: column;
    width: 110px;
    gap: 6px;
}
.mk-form i {
    width: 100%;
    height: 16px;
    background: #fff;
    border: 1px solid #e2e8f0;
}
.mk-form b {
    width: 56px;
    height: 14px;
    background: #6366f1;
    align-self: flex-start;
}
.mk-card {
    flex-direction: column;
    width: 110px;
    gap: 6px;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 8px;
}
.mk-card i {
    width: 100%;
}
.mk-card i:first-child {
    height: 28px;
    background: #eef2ff;
}
.mk-card i:last-child {
    height: 6px;
}
.mk-skel {
    flex-direction: column;
    width: 110px;
    gap: 6px;
}
.mk-skel i {
    width: 100%;
    height: 8px;
}
.mk-col {
    flex-direction: column;
    width: 120px;
    gap: 6px;
}
.mk-col i {
    width: 100%;
    height: 18px;
    background: #fff;
    border: 1px solid #e2e8f0;
}
.mk-tabs {
    width: 120px;
    flex-direction: column;
    gap: 6px;
}
.mk-tabs i:first-child {
    width: 80%;
    height: 10px;
    background: #6366f1;
}
.mk-tabs i:last-child {
    width: 100%;
    height: 30px;
    background: #fff;
    border: 1px solid #e2e8f0;
}
.mk-table {
    flex-direction: column;
    width: 126px;
    gap: 4px;
}
.mk-table i {
    width: 100%;
    height: 12px;
    background: #fff;
    border: 1px solid #e2e8f0;
}
.mk-table i:first-child {
    background: #f1f5f9;
}
.mk-tl i {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: #6366f1;
}
.mk-tl i:last-child {
    width: 70px;
    height: 26px;
    background: #fff;
    border: 1px solid #e2e8f0;
    margin-left: 8px;
}
.mk-pg i {
    height: 18px;
}
.mk-pg i:nth-child(1),
.mk-pg i:nth-child(3) {
    width: 18px;
    background: #fff;
    border: 1px solid #e2e8f0;
}
.mk-pg i:nth-child(2) {
    width: 26px;
    background: #6366f1;
}
.mk-menu {
    flex-direction: column;
    width: 110px;
    gap: 4px;
    align-items: stretch;
}
.mk-menu i {
    height: 14px;
    background: #fff;
    border: 1px solid #e2e8f0;
}
.mk-menu i:first-child {
    background: #eef2ff;
    border-color: #c7d2fe;
}
.mk-pop i {
    width: 60px;
    height: 22px;
    background: #fff;
    border: 1px solid #e2e8f0;
}
.mk-pop b {
    width: 70px;
    height: 30px;
    background: #fff;
    border: 1px solid #c7d2fe;
}
.mk-anchor {
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
}
.mk-anchor i {
    width: 70px;
    height: 6px;
}
.mk-anchor i:first-child {
    background: #6366f1;
    width: 44px;
}
.mk-backtop {
    width: 32px;
    height: 32px;
    color: #fff;
    background: #6366f1;
    border-radius: 999px;
}
.mk-backtop svg {
    width: 16px;
    height: 16px;
    stroke-width: 2.5;
}
.mk-alert i {
    width: 120px;
    height: 26px;
    background: #fef3c7;
    border: 1px solid #fde68a;
}
.mk-toast {
    background: #111827;
    color: #fff;
    font-size: 11px;
    padding: 6px 16px;
    border-radius: 8px;
}
.mk-dialog {
    flex-direction: column;
    width: 110px;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 8px;
    gap: 6px;
}
.mk-dialog i {
    width: 60%;
    height: 8px;
}
.mk-dialog b {
    width: 44px;
    height: 14px;
    background: #6366f1;
    align-self: flex-end;
}
.mk-load i {
    width: 26px;
    height: 26px;
    border-radius: 999px;
    border: 3px solid #e0e7ff;
    border-top-color: #6366f1;
}
.mk-otp i {
    width: 22px;
    height: 28px;
    background: #fff;
    border: 1px solid #cbd5e1;
}
.mk-img i {
    width: 64px;
    height: 44px;
    border: 1px solid #e2e8f0;
}
.mk-scroll {
    width: 110px;
    height: 44px;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    justify-content: flex-end;
    align-items: stretch;
    padding: 4px;
}
.mk-scroll i {
    width: 6px;
    background: #6366f1;
}
.mk-color i {
    width: 24px;
    height: 24px;
    border-radius: 6px;
}
.mk-color i:nth-child(1) {
    background: #e0e7ff;
}
.mk-color i:nth-child(2) {
    background: #6366f1;
}
.mk-color i:nth-child(3) {
    background: #22c55e;
}
.mk-datepicker {
    width: 112px;
    height: 26px;
    justify-content: space-between;
    padding: 0 7px;
    color: #64748b;
    background: #fff;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 10px;
}
.mk-datepicker svg {
    width: 13px;
    height: 13px;
    color: #6366f1;
}
.mk-cal {
    display: grid;
    grid-template-columns: repeat(7, 14px);
    gap: 3px;
    width: 116px;
}
.mk-cal b {
    grid-column: 1 / -1;
    height: 12px;
    color: #64748b;
    background: transparent;
    font-size: 8px;
    font-weight: 600;
    line-height: 12px;
    text-align: center;
}
.mk-cal i {
    width: 14px;
    height: 13px;
    background: #fff;
    border: 1px solid #e2e8f0;
}
.mk-cal i:nth-of-type(6) {
    background: #6366f1;
    border-color: #6366f1;
}
.mk-upload i {
    width: 110px;
    height: 34px;
    background: #fff;
    border: 1px dashed #a5b4fc;
}
.mk-car i {
    width: 70px;
    height: 40px;
    background: #eef2ff;
    border: 1px solid #c7d2fe;
}
.mk-empty {
    color: #94a3b8;
    font-size: 12px;
    border: 1px dashed #cbd5e1;
    padding: 8px 18px;
    border-radius: 8px;
}
.ov-empty {
    padding: 28px;
    text-align: center;
    color: #6b7280;
    background: #fff;
    border: 1px dashed #e5e7eb;
    border-radius: 12px;
}

.dark .ov-search-input {
    color: #f8fafc;
    background: #1e293b;
    border-color: #475569;
}
.dark .ov-search-input::placeholder {
    color: #94a3b8;
}
.dark .ov-search-clear {
    background: #334155;
    color: #e2e8f0;
}
.dark .ov-total,
.dark .ov-empty {
    color: #cbd5e1;
}
.dark .ov-title,
.dark .ov-card-name {
    color: #f8fafc;
}
.dark .ov-card {
    background: #1e293b;
    border-color: #334155;
}
.dark .ov-card:hover {
    border-color: #818cf8;
}
.dark .ov-card-name {
    background: #1e293b;
    border-bottom-color: #334155;
}
.dark .ov-preview {
    background: #0f172a;
}
.dark .ov-empty {
    background: #1e293b;
    border-color: #475569;
}
.dark .mk i,
.dark .mk b {
    background: #334155;
}
.dark .mk-input,
.dark .mk-check i,
.dark .mk-form i,
.dark .mk-card,
.dark .mk-col i,
.dark .mk-tabs i:last-child,
.dark .mk-table i,
.dark .mk-pg i:nth-child(1),
.dark .mk-pg i:nth-child(3),
.dark .mk-menu i,
.dark .mk-pop i,
.dark .mk-pop b,
.dark .mk-tip i,
.dark .mk-tl i:last-child,
.dark .mk-dialog,
.dark .mk-scroll,
.dark .mk-cal i,
.dark .mk-upload i {
    background: #1e293b;
    border-color: #475569;
}
.dark .mk-check i.on,
.dark .mk-menu i:first-child {
    background: #6366f1;
    border-color: #818cf8;
}

/* Preserve the visual identity of each overview mock in dark mode. */
.dark .mk-input i,
.dark .mk-switch i,
.dark .mk-form b,
.dark .mk-tabs i:first-child,
.dark .mk-pg i:nth-child(2),
.dark .mk-dialog b,
.dark .mk-scroll i,
.dark .mk-anchor i:first-child,
.dark .mk-tl i {
    background: #818cf8;
}

.dark .mk-slider i,
.dark .mk-prog i {
    background: linear-gradient(90deg, #818cf8 55%, #475569 55%);
}

.dark .mk-avatar i:first-child,
.dark .mk-card i:first-child,
.dark .mk-menu i:first-child {
    background: #3730a3;
    border-color: #6366f1;
}

.dark .mk-avatar i:last-child {
    background: #f87171;
}

.dark .mk-tip b {
    background: #020617;
    color: #f8fafc;
}

.dark .mk-car i {
    background: #312e81;
    border-color: #6366f1;
}

.dark .mk-tags i:nth-child(1) {
    background: #1e3a8a;
}
.dark .mk-tags i:nth-child(2) {
    background: #14532d;
}
.dark .mk-tags i:nth-child(3) {
    background: #713f12;
}

.dark .mk-alert i {
    background: #713f12;
    border-color: #f59e0b;
}

.dark .mk-datepicker {
    color: #cbd5e1;
    background: #1e293b;
    border-color: #475569;
}

.dark .mk-datepicker svg {
    color: #a5b4fc;
}

.dark .mk-cal b {
    color: #cbd5e1;
    background: transparent;
}

.dark .mk-cal i:nth-of-type(6) {
    background: #6366f1;
    border-color: #818cf8;
}

.dark .mk-color i:nth-child(1) {
    background: #3730a3;
}
.dark .mk-color i:nth-child(2) {
    background: #818cf8;
}
.dark .mk-color i:nth-child(3) {
    background: #22c55e;
}
</style>
