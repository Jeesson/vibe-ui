<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/24/outline";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Timeline from "../../../components/Timeline/Timeline.vue";
const doc = docs.timeline;
const items = [
    {
        title: "Заказ создан",
        time: "10:00",
        type: "default" as const,
        hollow: true,
    },
    { title: "Оплата получена", time: "10:05", type: "success" as const },
    {
        title: "Ошибка доставки",
        time: "14:20",
        type: "danger" as const,
        description: "Не удалось связаться с курьером.",
    },
];
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="max-w-xs">
                <Timeline :items="items" />
            </div>
            <p class="mt-4 mb-2 text-xs text-gray-400">
                Кастомная точка через слот <code>#dot</code>:
            </p>
            <div class="max-w-xs">
                <Timeline
                    :items="[
                        { title: 'Заявка подтверждена', time: '09:00' },
                        { title: 'Курьер назначен', time: '09:15' },
                    ]"
                >
                    <template #dot>
                        <span
                            class="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[9px] text-white"
                        >
                            <CheckIcon class="size-2 stroke-5" />
                        </span>
                    </template>
                </Timeline>
            </div>
        </template>
    </ComponentDoc>
</template>
