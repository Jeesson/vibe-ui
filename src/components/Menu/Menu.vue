<script setup lang="ts">
import { ref, type Component } from "vue";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";

export interface MenuItem {
    key: string;
    label: string;
    children?: MenuItem[];
    disabled?: boolean;
    icon?: Component;
}

defineOptions({ name: "MyUiMenu" });

const props = withDefaults(
    defineProps<{
        items: MenuItem[];
        modelValue: string;
        expandAll?: boolean;
    }>(),
    { expandAll: false },
);
const emit = defineEmits<{ "update:modelValue": [string] }>();

const openKeys = ref<Set<string>>(new Set());

function toggleOpen(key: string) {
    if (openKeys.value.has(key)) openKeys.value.delete(key);
    else openKeys.value.add(key);
}

function select(item: MenuItem) {
    if (item.disabled) return;
    if (item.children?.length) {
        if (props.expandAll) return;
        toggleOpen(item.key);
        return;
    }
    emit("update:modelValue", item.key);
}
</script>

<template>
    <ul class="flex flex-col gap-0.5 text-sm">
        <li v-for="item in items" :key="item.key">
            <button
                type="button"
                :disabled="item.disabled"
                :class="[
                    'flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition-colors',
                    item.disabled
                        ? 'cursor-not-allowed text-gray-300'
                        : item.key === modelValue
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50',
                ]"
                @click="select(item)">
                <span class="flex min-w-0 items-center gap-2">
                    <component :is="item.icon" v-if="item.icon" class="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
                    <span class="truncate">{{ item.label }}</span>
                </span>
                <span
                    v-if="item.children?.length"
                    class="text-gray-400 transition-transform"
                    :class="(props.expandAll || openKeys.has(item.key)) && 'rotate-180'">
                    <ChevronDownIcon class="h-3 w-3" />
                </span>
            </button>
            <div
                v-if="item.children?.length && (props.expandAll || openKeys.has(item.key))"
                class="mt-0.5 ml-3 border-l border-gray-100 pl-2">
                <MyUiMenu
                    :items="item.children"
                    :model-value="modelValue"
                    :expand-all="props.expandAll"
                    @update:model-value="emit('update:modelValue', $event)" />
            </div>
        </li>
    </ul>
</template>
