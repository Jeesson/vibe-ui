<script setup lang="ts">
import { provide } from "vue";
import { TabsKey } from "./context";

const props = defineProps<{
    modelValue: string;
    items: { name: string; label: string; disabled?: boolean }[];
}>();

const emit = defineEmits<{ "update:modelValue": [string] }>();

provide(TabsKey, { isActive: (name: string) => name === props.modelValue });
</script>

<template>
    <div>
        <div class="flex gap-1 border-b border-gray-200">
            <button
                v-for="item in items"
                :key="item.name"
                type="button"
                :disabled="item.disabled"
                :class="[
                    '-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors',
                    item.disabled
                        ? 'cursor-not-allowed border-transparent text-gray-300'
                        : item.name === modelValue
                          ? 'border-primary-600 text-primary-700'
                          : 'border-transparent text-gray-500 hover:text-gray-700',
                ]"
                @click="emit('update:modelValue', item.name)">
                {{ item.label }}
            </button>
        </div>
        <div class="pt-4">
            <slot />
        </div>
    </div>
</template>
