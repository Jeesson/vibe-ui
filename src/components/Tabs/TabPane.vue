<script setup lang="ts">
import { inject } from "vue";
import { TabsKey } from "./context";

const props = defineProps<{ name: string }>();
const tabs = inject(TabsKey, null);
</script>

<template>
    <div v-if="tabs?.isActive(props.name)">
        <slot />
    </div>
</template>
