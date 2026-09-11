<script setup lang="ts">
import { inject } from "vue";
import { CollapseKey } from "./context";

const props = defineProps<{ name: string; title: string }>();
const ctx = inject(CollapseKey, null);
</script>

<template>
    <div>
        <button
            type="button"
            class="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
            @click="ctx?.toggle(props.name)"
        >
            {{ title }}
            <span
                class="text-gray-400 transition-transform duration-200"
                :class="ctx?.isActive(props.name) && 'rotate-180'"
                >▾</span
            >
        </button>

        <!--
      Анимация высоты через CSS grid-template-rows (0fr -> 1fr).
      Контент никогда не размонтируется (в отличие от v-if), поэтому
      транзишн плавный и не зависит от JS-измерений scrollHeight.
    -->
        <div
            class="grid transition-[grid-template-rows] duration-300 ease-in-out"
            :style="{
                gridTemplateRows: ctx?.isActive(props.name) ? '1fr' : '0fr',
            }"
        >
            <div class="overflow-hidden">
                <div class="px-4 pb-3 text-sm text-gray-600">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
