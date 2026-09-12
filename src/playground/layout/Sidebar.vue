<script setup lang="ts">
import { computed } from "vue";
import Menu from "../../components/Menu/Menu.vue";
import { useLocale } from "../composables/ui-locale";

defineProps<{ modelValue: string }>();
const emit = defineEmits<{
    "update:modelValue": [string];
    navigate: [page: string, anchor: string];
}>();

const { t } = useLocale();

/*
    Группы страниц с подссылками на компоненты.
    Ключ подссылки — "страница:якорь", по нему App.vue
    переключает страницу и скроллит к компоненту.
*/
const items = computed(() => [
    { key: "overview", label: t.value("nav.overview") },
    {
        key: "basic",
        label: t.value("nav.basic"),
        children: [
            { key: "basic:basic-button", label: "Button" },
            { key: "basic:basic-avatar", label: "Avatar / Badge" },
            { key: "basic:basic-tag", label: "Tag / Tooltip" },
            { key: "basic:basic-divider", label: "Divider" },
            { key: "basic:basic-progress", label: "Progress" },
        ],
    },
    {
        key: "form",
        label: t.value("nav.form"),
        children: [
            { key: "form:form-input", label: "Input / Select" },
            { key: "form:form-checkbox", label: "Checkbox / Radio / Switch" },
            { key: "form:form-slider", label: "Slider / Number / Rate" },
            { key: "form:form-validation", label: "Form" },
        ],
    },
    {
        key: "data",
        label: t.value("nav.data"),
        children: [
            { key: "data:data-card", label: "Card" },
            { key: "data:data-skeleton", label: "Skeleton" },
            { key: "data:data-collapse", label: "Collapse" },
            { key: "data:data-table", label: "Table" },
            { key: "data:data-timeline", label: "Timeline" },
            { key: "data:data-pagination", label: "Pagination" },
            { key: "data:data-empty", label: "Empty" },
        ],
    },
    {
        key: "navigation",
        label: t.value("nav.navigation"),
        children: [
            { key: "navigation:nav-menu", label: "Menu" },
            { key: "navigation:nav-popover", label: "Popover / Dropdown" },
        ],
    },
    {
        key: "feedback",
        label: t.value("nav.feedback"),
        children: [
            { key: "feedback:feedback-alert", label: "Alert" },
            { key: "feedback:feedback-toast", label: "Toast" },
            { key: "feedback:feedback-dialog", label: "Dialog / Drawer" },
            { key: "feedback:feedback-loading", label: "Loading" },
            { key: "feedback:feedback-messagebox", label: "MessageBox" },
        ],
    },
    {
        key: "misc",
        label: t.value("nav.misc"),
        children: [
            { key: "misc:misc-autocomplete", label: "Autocomplete" },
            { key: "misc:misc-inputtag", label: "InputTag" },
            { key: "misc:misc-inputotp", label: "InputOtp" },
            { key: "misc:misc-image", label: "Image" },
            { key: "misc:misc-scrollbar", label: "Scrollbar" },
        ],
    },
    {
        key: "datetime",
        label: t.value("nav.datetime"),
        children: [
            { key: "datetime:datetime-affix", label: "Affix" },
            { key: "datetime:datetime-cascader", label: "Cascader" },
            { key: "datetime:datetime-colorpicker", label: "ColorPicker" },
            { key: "datetime:datetime-datepicker", label: "DatePicker" },
            { key: "datetime:datetime-calendar", label: "Calendar" },
            { key: "datetime:datetime-upload", label: "Upload" },
            { key: "datetime:datetime-carousel", label: "Carousel" },
            { key: "datetime:datetime-mention", label: "Mention" },
        ],
    },
]);

function onSelect(key: string) {
    if (key.includes(":")) {
        const [page, anchor] = key.split(":");
        emit("navigate", page, anchor);
        return;
    }
    emit("update:modelValue", key);
}
</script>

<template>
    <aside
        class="sticky top-14 h-[calc(100vh-3.5rem)] w-52 shrink-0 overflow-y-auto border-r border-gray-100 bg-white p-3"
    >
        <Menu
            :items="items"
            :model-value="modelValue"
            @update:model-value="onSelect"
        />
    </aside>
</template>
