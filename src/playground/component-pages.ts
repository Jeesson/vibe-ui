/**
 * component-pages.ts
 * -----------------------------------------------------------------------------
 * Registry of individual playground component pages.
 *
 * Each entry in docs/component-docs maps to a page in pages/components,
 * while ANCHORS configures the right column table of contents.
 * The router (router.ts) builds the /components/:slug route from this registry.
 * -----------------------------------------------------------------------------
 */
import type { Component } from "vue";

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

export const componentPages: Record<string, Component> = {
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

/** camelCase doc key -> kebab-slug URL: inputNumber -> input-number. */
export function toComponentSlug(key: string): string {
    return key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

/** URL slug -> doc key (or null if component not found). */
export function componentKeyFromSlug(slug: string): string | null {
    return Object.keys(componentPages).find((key) => toComponentSlug(key) === slug) ?? null;
}

/** Navigation key ("overview" | "c-<key>") -> router path (+ optional anchor). */
export function pageKeyToPath(page: string, anchor?: string): string {
    let path = "/";
    if (page.startsWith("c-")) {
        path = `/components/${toComponentSlug(page.slice(2))}`;
    }
    return anchor ? `${path}#${encodeURIComponent(anchor)}` : path;
}

/** Component page table of contents (ComponentDoc.vue section anchors). */
export const componentAnchors = [
    { href: "#component-examples", title: "Examples" },
    { href: "#component-api", title: "API" },
    { href: "#component-contributors", title: "Contributors" },
];
