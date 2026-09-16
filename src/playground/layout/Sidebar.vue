<script setup lang="ts">
import { computed } from "vue";
import {
    AdjustmentsHorizontalIcon,
    ChatBubbleLeftRightIcon,
    ClockIcon,
    CubeIcon,
    MapIcon,
    Squares2X2Icon,
    TableCellsIcon,
    WrenchScrewdriverIcon,
} from "@heroicons/vue/24/outline";
import Menu from "../../components/Menu/Menu.vue";
import { useLocale } from "../composables/ui-locale";
import { components as docs, groupOrder } from "../docs/component-docs";
import Scrollbar from "../../components/Scrollbar/Scrollbar.vue";

defineProps<{ modelValue: string }>();
const emit = defineEmits<{
    "update:modelValue": [string];
    navigate: [page: string, anchor: string];
}>();

const { t } = useLocale();

const groupIcons = {
    basic: CubeIcon,
    form: AdjustmentsHorizontalIcon,
    data: TableCellsIcon,
    navigation: MapIcon,
    feedback: ChatBubbleLeftRightIcon,
    misc: WrenchScrewdriverIcon,
    datetime: ClockIcon,
};

/*
    Сайдбар строится из единого дата-движка docs/component-docs:
    группы — groupOrder/groupLabels, внутри каждой — отдельные страницы
    компонентов ("c-<key>"), которыми управляет App.vue.
*/
const items = computed(() => {
    const groups = groupOrder.map((g) => ({
        key: "group-" + g,
        label: t.value(`nav.${g}`),
        icon: groupIcons[g],
        children: Object.values(docs)
            .filter((d) => d.group === g)
            .map((d) => ({ key: "c-" + d.key, label: d.name })),
    }));
    return [
        {
            key: "overview",
            label: t.value("nav.overview"),
            icon: Squares2X2Icon,
        },
        ...groups,
    ];
});

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
        class="sticky top-14 h-[calc(100vh-3.5rem)] w-52 shrink-0 border-r border-gray-100 bg-white p-3"
    >
        <Scrollbar max-height="calc(100vh - 3.5rem)" class="h-full" hide>
            <Menu
                :items="items"
                :model-value="modelValue"
                expand-all
                @update:model-value="onSelect"
            />
        </Scrollbar>
    </aside>
</template>
