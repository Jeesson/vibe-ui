<script setup lang="ts">
import { ref } from "vue";
import Menu from "../../components/Menu/Menu.vue";
import Button from "../../components/Button/Button.vue";
import Popover from "../../components/Popover/Popover.vue";
import Dropdown from "../../components/Dropdown/Dropdown.vue";
import { toast } from "vue-sonner";
import type { PanelPlacement } from "../../composables/floating";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";

// Все 6 позиционок Dropdown для демонстрации
const placements: PanelPlacement[] = [
    "bottom-start",
    "bottom",
    "bottom-end",
    "top-start",
    "top",
    "top-end",
];

const menuActive = ref("overview");
const menuItems = [
    { key: "overview", label: "Обзор" },
    {
        key: "components",
        label: "Компоненты",
        children: [
            { key: "form-components", label: "Форма" },
            { key: "data-components", label: "Данные" },
        ],
    },
    { key: "settings", label: "Настройки" },
];

defineExpose({
    anchors: [
        { href: "#nav-menu", title: "Menu" },
        { href: "#nav-popover", title: "Popover / Dropdown" },
    ],
});
</script>

<template>
    <div class="flex flex-col gap-4">
        <section
            id="nav-menu"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">
                Menu (со вложенным подменю)
            </h2>
            <p class="mb-2 text-xs text-gray-400">
                Тот же компонент, что используется в сайдбаре слева.
            </p>
            <div class="max-w-xs rounded-md bg-gray-50 p-2">
                <Menu :items="menuItems" v-model="menuActive" />
            </div>
        </section>

        <section
            id="nav-popover"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">
                Popover / Dropdown
            </h2>
            <div class="flex items-center gap-3">
                <Popover title="Заголовок">
                    <template #trigger
                        ><Button variant="secondary">Popover</Button></template
                    >
                    Любой контент внутри попапа.
                </Popover>
                <Dropdown
                    :items="[
                        { label: 'Редактировать', value: 'edit' },
                        { label: 'Дублировать', value: 'duplicate' },
                        { label: 'Удалить', value: 'delete', danger: true },
                    ]"
                    @select="(v) => toast.info('Выбрано: ' + v)"
                >
                    <Button variant="ghost" :icon-right="ChevronDownIcon"
                        >Действия</Button
                    >
                </Dropdown>
            </div>

            <p class="mt-4 mb-2 text-xs text-gray-400">
                Dropdown — 6 позиционок (<code>placement</code>): сторона
                top/bottom × выравнивание start/центр/end. Если выбранной
                стороне не хватает места — панель переворачивается сама.
            </p>
            <div class="flex flex-wrap items-center gap-3">
                <Dropdown
                    v-for="p in placements"
                    :key="p"
                    :placement="p"
                    :items="[
                        { label: 'Редактировать', value: 'edit' },
                        { label: 'Дублировать', value: 'duplicate' },
                        { label: 'Удалить', value: 'delete', danger: true },
                    ]"
                    @select="(v) => toast.info(p + ' → ' + v)"
                >
                    <Button variant="secondary" size="sm">{{ p }}</Button>
                </Dropdown>
            </div>
        </section>
    </div>
</template>
