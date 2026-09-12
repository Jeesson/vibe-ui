<script setup lang="ts">
import { computed, ref } from "vue";
const emit = defineEmits<{ navigate: [page: string, anchor: string] }>();
interface Item {
    name: string;
    page: string;
    anchor: string;
    mock: string;
}
interface Group {
    id: string;
    title: string;
    items: Item[];
}
const groups: Group[] = [
    {
        id: "ov-group-basic",
        title: "Basic",
        items: [
            {
                name: "Button",
                page: "basic",
                anchor: "basic-button",
                mock: "button",
            },
            {
                name: "Avatar",
                page: "basic",
                anchor: "basic-avatar",
                mock: "avatar",
            },
            {
                name: "Badge",
                page: "basic",
                anchor: "basic-avatar",
                mock: "avatar",
            },
            { name: "Tag", page: "basic", anchor: "basic-tag", mock: "tags" },
            {
                name: "Tooltip",
                page: "basic",
                anchor: "basic-tag",
                mock: "tooltip",
            },
            {
                name: "Divider",
                page: "basic",
                anchor: "basic-divider",
                mock: "divider",
            },
            {
                name: "Progress",
                page: "basic",
                anchor: "basic-progress",
                mock: "progress",
            },
        ],
    },
    {
        id: "ov-group-form",
        title: "Form",
        items: [
            {
                name: "Input",
                page: "form",
                anchor: "form-input",
                mock: "input",
            },
            {
                name: "Select",
                page: "form",
                anchor: "form-input",
                mock: "input",
            },
            {
                name: "Checkbox",
                page: "form",
                anchor: "form-checkbox",
                mock: "check",
            },
            {
                name: "Radio",
                page: "form",
                anchor: "form-checkbox",
                mock: "check",
            },
            {
                name: "Switch",
                page: "form",
                anchor: "form-checkbox",
                mock: "switch",
            },
            {
                name: "Slider",
                page: "form",
                anchor: "form-slider",
                mock: "slider",
            },
            {
                name: "InputNumber",
                page: "form",
                anchor: "form-slider",
                mock: "input",
            },
            { name: "Rate", page: "form", anchor: "form-slider", mock: "rate" },
            {
                name: "Form",
                page: "form",
                anchor: "form-validation",
                mock: "form",
            },
        ],
    },
    {
        id: "ov-group-data",
        title: "Data",
        items: [
            { name: "Card", page: "data", anchor: "data-card", mock: "card" },
            {
                name: "Skeleton",
                page: "data",
                anchor: "data-skeleton",
                mock: "skeleton",
            },
            {
                name: "Collapse",
                page: "data",
                anchor: "data-collapse",
                mock: "collapse",
            },
            {
                name: "Tabs",
                page: "data",
                anchor: "data-collapse",
                mock: "tabs",
            },
            {
                name: "Table",
                page: "data",
                anchor: "data-table",
                mock: "table",
            },
            {
                name: "Timeline",
                page: "data",
                anchor: "data-timeline",
                mock: "timeline",
            },
            {
                name: "Pagination",
                page: "data",
                anchor: "data-pagination",
                mock: "pagination",
            },
            {
                name: "Empty",
                page: "data",
                anchor: "data-empty",
                mock: "empty",
            },
        ],
    },
    {
        id: "ov-group-navigation",
        title: "Navigation",
        items: [
            {
                name: "Menu",
                page: "navigation",
                anchor: "nav-menu",
                mock: "menu",
            },
            {
                name: "Popover",
                page: "navigation",
                anchor: "nav-popover",
                mock: "popover",
            },
            {
                name: "Dropdown",
                page: "navigation",
                anchor: "nav-popover",
                mock: "menu",
            },
            {
                name: "Anchor",
                page: "overview",
                anchor: "ov-group-navigation",
                mock: "anchor",
            },
            {
                name: "Backtop",
                page: "overview",
                anchor: "ov-group-navigation",
                mock: "empty",
            },
        ],
    },
    {
        id: "ov-group-feedback",
        title: "Feedback",
        items: [
            {
                name: "Alert",
                page: "feedback",
                anchor: "feedback-alert",
                mock: "alert",
            },
            {
                name: "Toast",
                page: "feedback",
                anchor: "feedback-toast",
                mock: "toast",
            },
            {
                name: "Dialog",
                page: "feedback",
                anchor: "feedback-dialog",
                mock: "dialog",
            },
            {
                name: "Drawer",
                page: "feedback",
                anchor: "feedback-dialog",
                mock: "dialog",
            },
            {
                name: "Loading",
                page: "feedback",
                anchor: "feedback-loading",
                mock: "loading",
            },
            {
                name: "MessageBox",
                page: "feedback",
                anchor: "feedback-messagebox",
                mock: "dialog",
            },
        ],
    },
    {
        id: "ov-group-misc",
        title: "Misc",
        items: [
            {
                name: "Autocomplete",
                page: "misc",
                anchor: "misc-autocomplete",
                mock: "input",
            },
            {
                name: "InputTag",
                page: "misc",
                anchor: "misc-inputtag",
                mock: "tags",
            },
            {
                name: "InputOtp",
                page: "misc",
                anchor: "misc-inputotp",
                mock: "otp",
            },
            {
                name: "Image",
                page: "misc",
                anchor: "misc-image",
                mock: "image",
            },
            {
                name: "Scrollbar",
                page: "misc",
                anchor: "misc-scrollbar",
                mock: "scrollbar",
            },
        ],
    },
    {
        id: "ov-group-datetime",
        title: "Date and Time",
        items: [
            {
                name: "Cascader",
                page: "datetime",
                anchor: "datetime-cascader",
                mock: "input",
            },
            {
                name: "ColorPicker",
                page: "datetime",
                anchor: "datetime-colorpicker",
                mock: "color",
            },
            {
                name: "DatePicker",
                page: "datetime",
                anchor: "datetime-datepicker",
                mock: "calendar",
            },
            {
                name: "TimeSelect",
                page: "datetime",
                anchor: "datetime-datepicker",
                mock: "input",
            },
            {
                name: "Calendar",
                page: "datetime",
                anchor: "datetime-calendar",
                mock: "calendar",
            },
            {
                name: "Upload",
                page: "datetime",
                anchor: "datetime-upload",
                mock: "upload",
            },
            {
                name: "Carousel",
                page: "datetime",
                anchor: "datetime-carousel",
                mock: "carousel",
            },
            {
                name: "Mention",
                page: "datetime",
                anchor: "datetime-mention",
                mock: "input",
            },
            {
                name: "Affix",
                page: "datetime",
                anchor: "datetime-affix",
                mock: "anchor",
            },
        ],
    },
];
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
    emit("navigate", item.page, item.anchor);
}
</script>
<template>
    <div class="ov">
        <div class="ov-search">
            <div class="ov-search-box">
                <svg viewBox="0 0 1024 1024" class="ov-search-icon">
                    <path
                        fill="currentColor"
                        d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704"
                    />
                </svg>
                <input
                    v-model="search"
                    class="ov-search-input"
                    type="text"
                    autocomplete="off"
                    placeholder="Search Components"
                />
                <button
                    v-if="search"
                    class="ov-search-clear"
                    @click="search = ''"
                    aria-label="Clear"
                >
                    x
                </button>
            </div>
            <span class="ov-total">{{ total }} components</span>
        </div>
        <div v-for="g in filtered" :key="g.id" :id="g.id" class="ov-group">
            <p class="ov-title">
                {{ g.title }} <span class="ov-count">{{ g.items.length }}</span>
            </p>
            <div class="ov-cards">
                <button
                    v-for="item in g.items"
                    :key="item.name"
                    class="ov-card"
                    @click="go(item)"
                    :title="'Open ' + item.name"
                >
                    <span class="ov-card-name">{{ item.name }}</span>
                    <span class="ov-preview">
                        <span v-if="item.mock === 'button'" class="mk mk-btn"
                            >Button</span
                        >
                        <span
                            v-else-if="item.mock === 'input'"
                            class="mk mk-input"
                            ><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'check'"
                            class="mk mk-check"
                            ><i></i><i class="on"></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'switch'"
                            class="mk mk-switch"
                            ><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'slider'"
                            class="mk mk-slider"
                            ><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'rate'"
                            class="mk mk-rate"
                            >* * * *</span
                        >
                        <span
                            v-else-if="item.mock === 'avatar'"
                            class="mk mk-avatar"
                            ><i></i><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'tags'"
                            class="mk mk-tags"
                            ><i></i><i></i><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'tooltip'"
                            class="mk mk-tip"
                            ><i></i><b>tip</b></span
                        >
                        <span
                            v-else-if="item.mock === 'divider'"
                            class="mk mk-div"
                            ><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'progress'"
                            class="mk mk-prog"
                            ><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'form'"
                            class="mk mk-form"
                            ><i></i><i></i><b></b
                        ></span>
                        <span
                            v-else-if="item.mock === 'card'"
                            class="mk mk-card"
                            ><i></i><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'skeleton'"
                            class="mk mk-skel"
                            ><i></i><i></i><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'collapse'"
                            class="mk mk-col"
                            ><i></i><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'tabs'"
                            class="mk mk-tabs"
                            ><i></i><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'table'"
                            class="mk mk-table"
                            ><i></i><i></i><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'timeline'"
                            class="mk mk-tl"
                            ><i></i><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'pagination'"
                            class="mk mk-pg"
                            ><i></i><i></i><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'menu'"
                            class="mk mk-menu"
                            ><i></i><i></i><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'popover'"
                            class="mk mk-pop"
                            ><i></i><b></b
                        ></span>
                        <span
                            v-else-if="item.mock === 'anchor'"
                            class="mk mk-anchor"
                            ><i></i><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'alert'"
                            class="mk mk-alert"
                            ><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'toast'"
                            class="mk mk-toast"
                            >Toast</span
                        >
                        <span
                            v-else-if="item.mock === 'dialog'"
                            class="mk mk-dialog"
                            ><i></i><b></b
                        ></span>
                        <span
                            v-else-if="item.mock === 'loading'"
                            class="mk mk-load"
                            ><i></i
                        ></span>
                        <span v-else-if="item.mock === 'otp'" class="mk mk-otp"
                            ><i></i><i></i><i></i><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'image'"
                            class="mk mk-img"
                            ><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'scrollbar'"
                            class="mk mk-scroll"
                            ><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'color'"
                            class="mk mk-color"
                            ><i></i><i></i><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'calendar'"
                            class="mk mk-cal"
                            ><i></i><i></i><i></i><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'upload'"
                            class="mk mk-upload"
                            ><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'carousel'"
                            class="mk mk-car"
                            ><i></i
                        ></span>
                        <span
                            v-else-if="item.mock === 'empty'"
                            class="mk mk-empty"
                            >empty</span
                        >
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
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
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
    color: #111827;
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
    background: #fff;
    border: 1px solid #eef0f3;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    padding: 0;
    transition:
        border-color 0.15s,
        box-shadow 0.15s,
        transform 0.15s;
}
.ov-card:hover {
    border-color: #c7d2fe;
    box-shadow: 0 8px 20px -12px rgba(99, 102, 241, 0.45);
    transform: translateY(-1px);
}
.ov-card-name {
    padding: 10px 12px;
    font-size: 13px;
    font-weight: 600;
    color: #1f2937;
    border-bottom: 1px solid #f3f4f6;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.ov-preview {
    height: 108px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
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
    box-shadow: 0 6px 12px -6px rgba(99, 102, 241, 0.7);
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
.mk-cal {
    display: grid;
    grid-template-columns: repeat(4, 18px);
    gap: 4px;
}
.mk-cal i {
    width: 18px;
    height: 14px;
    background: #fff;
    border: 1px solid #e2e8f0;
}
.mk-cal i:nth-child(6) {
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
</style>
