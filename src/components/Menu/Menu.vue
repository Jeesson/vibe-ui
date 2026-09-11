<script setup lang="ts">
import { ref } from "vue";

export interface MenuItem {
    key: string;
    label: string;
    children?: MenuItem[];
    disabled?: boolean;
}

defineOptions({ name: "MyUiMenu" });

const props = defineProps<{ items: MenuItem[]; modelValue: string }>();
const emit = defineEmits<{ "update:modelValue": [string] }>();

const openKeys = ref<Set<string>>(new Set());

function toggleOpen(key: string) {
    if (openKeys.value.has(key)) openKeys.value.delete(key);
    else openKeys.value.add(key);
}

function select(item: MenuItem) {
    if (item.disabled) return;
    if (item.children?.length) {
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
                @click="select(item)"
            >
                {{ item.label }}
                <span
                    v-if="item.children?.length"
                    class="text-gray-400 transition-transform"
                    :class="openKeys.has(item.key) && 'rotate-180'"
                    >▾</span
                >
            </button>
            <div
                v-if="item.children?.length && openKeys.has(item.key)"
                class="mt-0.5 ml-3 border-l border-gray-100 pl-2"
            >
                <MyUiMenu
                    :items="item.children"
                    :model-value="modelValue"
                    @update:model-value="emit('update:modelValue', $event)"
                />
            </div>
        </li>
    </ul>
</template>
