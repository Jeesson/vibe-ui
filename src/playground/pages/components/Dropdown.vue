<script setup lang="ts">
import { toast } from "vue-sonner";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Dropdown from "../../../components/Dropdown/Dropdown.vue";
import Button from "../../../components/Button/Button.vue";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import type { PanelPlacement } from "../../../composables/floating";
const doc = docs.dropdown;
const actions = [
    { label: "Редактировать", value: "edit" },
    { label: "Дублировать", value: "duplicate" },
    { label: "Удалить", value: "delete", danger: true },
];
const placements: PanelPlacement[] = [
    "bottom-start",
    "bottom",
    "bottom-end",
    "top-start",
    "top",
    "top-end",
];
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="flex items-center gap-3">
                <Dropdown
                    :items="actions"
                    @select="(v) => toast.info('Выбрано: ' + v)"
                >
                    <Button variant="ghost" :icon-right="ChevronDownIcon"
                        >Действия</Button
                    >
                </Dropdown>
                <Dropdown
                    :items="[
                        { label: 'Отключено', value: 'x', disabled: true },
                    ]"
                >
                    <Button
                        variant="secondary"
                        :icon-right="ChevronDownIcon"
                        >С disabled-пунктом</Button
                    >
                </Dropdown>
            </div>
            <p class="mt-4 mb-2 text-xs text-gray-400">
                Все позиционки (<code>placement</code>):
            </p>
            <div class="flex flex-wrap items-center gap-2">
                <Dropdown
                    v-for="p in placements"
                    :key="p"
                    :placement="p"
                    :items="actions"
                    @select="(v) => toast.info(p + ' → ' + v)"
                >
                    <Button variant="secondary" size="sm">{{ p }}</Button>
                </Dropdown>
            </div>
        </template>
    </ComponentDoc>
</template>
