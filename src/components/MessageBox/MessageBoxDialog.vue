<script setup lang="ts">
defineProps<{
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    type?: "default" | "danger";
}>();
defineEmits<{ confirm: []; cancel: [] }>();
</script>

<template>
    <Teleport to="body">
        <div
            class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40"
        >
            <div class="w-[360px] rounded-lg bg-white p-5 shadow-xl">
                <h3 class="text-base font-semibold text-gray-900">
                    {{ title }}
                </h3>
                <p class="mt-2 text-sm text-gray-600">{{ message }}</p>
                <div class="mt-5 flex justify-end gap-2">
                    <button
                        type="button"
                        class="rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
                        @click="$emit('cancel')"
                    >
                        {{ cancelText }}
                    </button>
                    <button
                        type="button"
                        :class="[
                            'rounded-md px-3 py-1.5 text-sm font-medium text-white',
                            type === 'danger'
                                ? 'bg-red-600 hover:bg-red-700'
                                : 'bg-primary-600 hover:bg-primary-700',
                        ]"
                        @click="$emit('confirm')"
                    >
                        {{ confirmText }}
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>
