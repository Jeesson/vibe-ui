<script setup lang="ts">
withDefaults(defineProps<{ maxHeight?: string }>(), { maxHeight: "240px" });
</script>

<template>
    <div class="complex-ui-scrollbar overflow-auto" :style="{ maxHeight }">
        <slot />
    </div>
</template>

<style>
/*
  ВАЖНО: в Chrome 121+ заданные scrollbar-width/scrollbar-color полностью
  отключают ::-webkit-scrollbar-* псевдоэлементы — браузер рисует системный
  скроллбар (на Windows — со стрелками), и display:none на кнопках не работает.
  Поэтому стандартные свойства применяем только в браузерах без поддержки
  webkit-псевдоэлементов (Firefox), а Chrome/Edge/Safari получают полностью
  кастомный тонкий скроллбар ниже — он изначально без стрелок.
*/
@supports not selector(::-webkit-scrollbar) {
    .complex-ui-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #d1d5db transparent;
    }
}
.complex-ui-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
.complex-ui-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.complex-ui-scrollbar::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 9999px;
    -webkit-appearance: none;
}
.complex-ui-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #9ca3af;
}
/* Стрелки-кнопки на Windows Chrome/Edge: без scroll lock стандартных свойств
   webkit-стилизация активна, поэтому достаточно одного правила на все кнопки. */
.complex-ui-scrollbar::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
}
.complex-ui-scrollbar::-webkit-scrollbar-corner {
    background: transparent;
}
</style>
