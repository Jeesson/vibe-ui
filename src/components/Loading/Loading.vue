<script setup lang="ts">
withDefaults(defineProps<{ loading: boolean; text?: string; fullscreen?: boolean }>(), { fullscreen: false });
</script>

<template>
    <div :class="!fullscreen && 'relative'">
        <slot />
        <Transition name="vibe-ui-tooltip-fade">
            <div
                v-if="loading"
                :class="[
                    'z-40 flex flex-col items-center justify-center gap-2 bg-white/70 backdrop-blur-[1px]',
                    fullscreen ? 'fixed inset-0' : 'absolute inset-0',
                ]">
                <svg class="text-primary-600 h-6 w-6 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="3" opacity="0.2" />
                    <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                </svg>
                <span v-if="text" class="text-xs text-gray-500">{{ text }}</span>
            </div>
        </Transition>
    </div>
</template>

<style>
.vibe-ui-tooltip-fade-enter-active,
.vibe-ui-tooltip-fade-leave-active {
    transition: opacity 0.15s ease;
}
.vibe-ui-tooltip-fade-enter-from,
.vibe-ui-tooltip-fade-leave-to {
    opacity: 0;
}
</style>
