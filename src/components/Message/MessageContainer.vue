<script setup lang="ts">
import { messages, removeMessage } from "./store";

const typeClasses = {
    success: "bg-green-50 text-green-800 border-green-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    error: "bg-red-50 text-red-800 border-red-200",
    info: "bg-gray-50 text-gray-800 border-gray-200",
};
</script>

<template>
    <Teleport to="body">
        <div
            class="fixed top-4 left-1/2 z-100 flex -translate-x-1/2 flex-col items-center gap-2"
        >
            <TransitionGroup name="vibe-ui-message">
                <div
                    v-for="m in messages"
                    :key="m.id"
                    :class="[
                        'w-fit max-w-[calc(100vw-2rem)] cursor-pointer rounded-md border px-4 py-2 text-sm wrap-break-word shadow-md',
                        typeClasses[m.type],
                    ]"
                    @click="removeMessage(m.id)"
                >
                    {{ m.content }}
                </div>
            </TransitionGroup>
        </div>
    </Teleport>
</template>

<style>
.vibe-ui-message-enter-active,
.vibe-ui-message-leave-active {
    transition: all 0.2s ease;
}
.vibe-ui-message-enter-from,
.vibe-ui-message-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>
