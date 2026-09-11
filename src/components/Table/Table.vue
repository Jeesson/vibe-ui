<script setup lang="ts">
import { ref, computed } from "vue";

export interface TableColumn {
    key: string;
    label: string;
    sortable?: boolean;
    width?: string;
}

const props = defineProps<{
    columns: TableColumn[];
    data: Record<string, unknown>[];
}>();

const sortKey = ref<string | null>(null);
const sortDir = ref<"asc" | "desc">("asc");

function toggleSort(col: TableColumn) {
    if (!col.sortable) return;
    if (sortKey.value === col.key) {
        sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
    } else {
        sortKey.value = col.key;
        sortDir.value = "asc";
    }
}

const rows = computed(() => {
    if (!sortKey.value) return props.data;
    const key = sortKey.value;
    const dir = sortDir.value === "asc" ? 1 : -1;
    return [...props.data].sort((a, b) => {
        const av = a[key];
        const bv = b[key];
        if (av === bv) return 0;
        return av! > bv! ? dir : -dir;
    });
});
</script>

<template>
    <div class="overflow-auto rounded-md border border-gray-200">
        <table class="w-full text-sm">
            <thead class="bg-gray-50 text-left text-gray-500">
                <tr>
                    <th
                        v-for="col in columns"
                        :key="col.key"
                        :style="{ width: col.width }"
                        :class="[
                            'px-3 py-2 font-medium',
                            col.sortable &&
                                'cursor-pointer select-none hover:text-gray-700',
                        ]"
                        @click="toggleSort(col)"
                    >
                        <span class="inline-flex items-center gap-1">
                            {{ col.label }}
                            <span
                                v-if="col.sortable"
                                class="text-xs text-gray-300"
                            >
                                {{
                                    sortKey === col.key
                                        ? sortDir === "asc"
                                            ? "↑"
                                            : "↓"
                                        : "↕"
                                }}
                            </span>
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
                <tr v-for="(row, i) in rows" :key="i" class="hover:bg-gray-50">
                    <td
                        v-for="col in columns"
                        :key="col.key"
                        class="px-3 py-2 text-gray-700"
                    >
                        <slot :name="'cell-' + col.key" :row="row">{{
                            row[col.key]
                        }}</slot>
                    </td>
                </tr>
                <tr v-if="!rows.length">
                    <td
                        :colspan="columns.length"
                        class="px-3 py-6 text-center text-gray-400"
                    >
                        Нет данных
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
