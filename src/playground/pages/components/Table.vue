<script setup lang="ts">
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Table from "../../../components/Table/Table.vue";
import Tag from "../../../components/Tag/Tag.vue";
const doc = docs.table;
const cols = [
    { key: "name", label: "Имя", sortable: true },
    { key: "role", label: "Роль", sortable: true },
    { key: "status", label: "Статус" },
];
const data = [
    { name: "Аня", role: "Frontend", status: "Активен" },
    { name: "Игорь", role: "Backend", status: "Отпуск" },
    { name: "Марта", role: "Design", status: "Активен" },
];
const statusTag = (s: string) => (s === "Активен" ? "success" : "warning");
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <Table :columns="cols" :data="data">
                <template #cell-status="{ row }">
                    <Tag :type="statusTag(String(row.status))">{{ row.status }}</Tag>
                </template>
            </Table>
        </template>
    </ComponentDoc>
</template>
