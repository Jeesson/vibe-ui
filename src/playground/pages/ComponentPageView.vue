<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { componentKeyFromSlug, componentPages } from "../component-pages";

const route = useRoute();
const router = useRouter();

/* Slug из URL → страница компонента (валидность slug уже проверена
   в ComponentPageView до рендера, null — fallback на редирект). */
const page = computed(() => {
    const key = componentKeyFromSlug(String(route.params.slug ?? ""));
    return key ? componentPages[key] : null;
});

/* Неизвестный slug (например, старая ссылка) → на обзор. */
if (!page.value) router.replace("/");
</script>

<template>
    <component :is="page" v-if="page" :key="route.fullPath" />
</template>
