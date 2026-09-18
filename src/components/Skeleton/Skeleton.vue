<script setup lang="ts">
withDefaults(
    defineProps<{
        rows?: number;
        avatar?: boolean;
        loading?: boolean;
    }>(),
    { rows: 3, avatar: false, loading: true },
);
</script>

<template>
    <div v-if="loading" class="flex animate-pulse gap-3">
        <div v-if="avatar" class="h-10 w-10 shrink-0 rounded-full bg-gray-200" />
        <div class="flex flex-1 flex-col gap-2">
            <div v-for="i in rows" :key="i" class="h-3 rounded bg-gray-200" :style="{ width: i === rows ? '60%' : '100%' }" />
        </div>
    </div>
    <slot v-else />
</template>
