<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { componentKeyFromSlug, componentPages } from "../component-pages";

const route = useRoute();
const router = useRouter();

/* URL slug -> component page (validity pre-checked before render;
   null triggers redirect fallback). */
const page = computed(() => {
    const key = componentKeyFromSlug(String(route.params.slug ?? ""));
    return key ? componentPages[key] : null;
});

/* Unknown slug (e.g. legacy link) -> redirect to overview. */
if (!page.value) router.replace("/");
</script>

<template>
    <component :is="page" v-if="page" :key="route.fullPath" />
</template>
