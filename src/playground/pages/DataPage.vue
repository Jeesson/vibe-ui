<script setup lang="ts">
import { ref } from "vue";
import Card from "../../components/Card/Card.vue";
import Switch from "../../components/Switch/Switch.vue";
import Skeleton from "../../components/Skeleton/Skeleton.vue";
import Collapse from "../../components/Collapse/Collapse.vue";
import CollapseItem from "../../components/Collapse/CollapseItem.vue";
import Pagination from "../../components/Pagination/Pagination.vue";
import Empty from "../../components/Empty/Empty.vue";
import Table from "../../components/Table/Table.vue";
import Timeline from "../../components/Timeline/Timeline.vue";

const skeletonLoading = ref(true);
const collapseActive = ref<string[]>(["a"]);
const page = ref(3);

const tableColumns = [
    { key: "name", label: "Имя", sortable: true },
    { key: "role", label: "Роль", sortable: true },
    { key: "status", label: "Статус" },
];
const tableData = [
    { name: "Аня", role: "Frontend", status: "Активен" },
    { name: "Игорь", role: "Backend", status: "Отпуск" },
    { name: "Марта", role: "Design", status: "Активен" },
];

const timelineItems = [
    {
        title: "Заказ создан",
        time: "10:00",
        type: "default" as const,
        hollow: true,
    },
    { title: "Оплата получена", time: "10:05", type: "success" as const },
    {
        title: "Ожидает подтверждения",
        time: "12:30",
        type: "warning" as const,
        hollow: true,
    },
    {
        title: "Ошибка доставки",
        time: "14:20",
        type: "danger" as const,
        description: "Не удалось связаться с курьером",
    },
];

defineExpose({
    anchors: [
        { href: "#data-card", title: "Card" },
        { href: "#data-skeleton", title: "Skeleton" },
        { href: "#data-collapse", title: "Collapse" },
        { href: "#data-table", title: "Table" },
        { href: "#data-timeline", title: "Timeline" },
        { href: "#data-pagination", title: "Pagination" },
        { href: "#data-empty", title: "Empty" },
    ],
});
</script>

<template>
    <div class="flex flex-col gap-4">
        <section
            id="data-card"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">
                Card — типы
            </h2>
            <div class="grid grid-cols-2 gap-3">
                <Card title="Bordered" type="bordered"
                    >Стандартная, с рамкой.</Card
                >
                <Card title="Elevated" type="elevated"
                    >С тенью, без рамки.</Card
                >
                <Card title="Flat" type="flat"
                    >Без рамки и тени — для вложенных блоков.</Card
                >
                <Card title="Filled" type="filled">Залитый серый фон.</Card>
            </div>
        </section>

        <section
            id="data-skeleton"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">Skeleton</h2>
            <Switch v-model="skeletonLoading" />
            <Skeleton
                :loading="skeletonLoading"
                :rows="3"
                avatar
                class="mt-2 max-w-sm"
            >
                <p class="text-sm text-gray-700">
                    Контент, когда загрузка завершена.
                </p>
            </Skeleton>
        </section>

        <section
            id="data-collapse"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">Collapse</h2>
            <Collapse v-model="collapseActive" class="max-w-sm">
                <CollapseItem name="a" title="Раздел A"
                    >Плавная CSS-анимация высоты без единой строчки JS для
                    измерений.</CollapseItem
                >
                <CollapseItem name="b" title="Раздел B"
                    >Содержимое раздела B</CollapseItem
                >
            </Collapse>
        </section>

        <section
            id="data-table"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">
                Table (клик по заголовку — сортировка)
            </h2>
            <Table :columns="tableColumns" :data="tableData" />
        </section>

        <section
            id="data-timeline"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">
                Timeline — цвета и полые точки
            </h2>
            <Timeline :items="timelineItems" />

            <p class="mt-5 mb-2 text-xs text-gray-400">
                Кастомная точка через слот <code>#dot</code>
            </p>
            <Timeline
                :items="[
                    { title: 'Заявка подтверждена', time: '09:00' },
                    { title: 'Курьер назначен', time: '09:15' },
                ]"
            >
                <template #dot>
                    <span
                        class="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[9px] text-white"
                        >✓</span
                    >
                </template>
            </Timeline>
        </section>

        <section
            id="data-pagination"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">Pagination</h2>
            <Pagination v-model="page" :total="120" :page-size="10" />
        </section>

        <section
            id="data-empty"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">Empty</h2>
            <Empty description="Список пуст" />
        </section>
    </div>
</template>
