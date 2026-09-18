<script setup lang="ts">
withDefaults(defineProps<{ maxHeight?: string; hide?: boolean }>(), {
    maxHeight: "240px",
    hide: false,
});
</script>

<template>
    <div class="vibe-ui-scrollbar overflow-auto" :class="hide && 'vibe-ui-scrollbar--hidden'" :style="{ maxHeight }">
        <slot />
    </div>
</template>

<style>
/*
  IMPORTANT: in Chrome 121+, scrollbar-width/scrollbar-color disable
  ::-webkit-scrollbar-* pseudo-elements, showing the system scrollbar with buttons.
  Standard properties are applied only in browsers without webkit pseudo-elements (Firefox),
  while Chrome/Edge/Safari use the custom thin scrollbar below without buttons.
*/
@supports not selector(::-webkit-scrollbar) {
    .vibe-ui-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #d1d5db transparent;
    }
}
.vibe-ui-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
.vibe-ui-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.vibe-ui-scrollbar::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 9999px;
    -webkit-appearance: none;
    appearance: none;
}
.vibe-ui-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #9ca3af;
}
/* Scrollbar buttons on Windows Chrome/Edge: hide all buttons via a single rule. */
.vibe-ui-scrollbar::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
}
.vibe-ui-scrollbar::-webkit-scrollbar-corner {
    background: transparent;
}
.vibe-ui-scrollbar--hidden::-webkit-scrollbar {
    width: 0;
    height: 0;
}
@supports not selector(::-webkit-scrollbar) {
    .vibe-ui-scrollbar--hidden {
        scrollbar-width: none;
    }
}
</style>
