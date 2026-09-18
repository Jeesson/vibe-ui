<script setup lang="ts">
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Badge from "../../../components/Badge/Badge.vue";
import Avatar from "../../../components/Avatar/Avatar.vue";
import Button from "../../../components/Button/Button.vue";
const doc = docs.badge;
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="flex flex-wrap items-center gap-6">
                <Badge :value="5"><Avatar initials="ДК" /></Badge>
                <Badge :value="120"><Avatar initials="ОК" /></Badge>
                <Badge dot><Avatar initials="МН" /></Badge>
                <Badge :value="3" type="success"><Button size="sm">Сообщения</Button></Badge>
            </div>
        </template>
    </ComponentDoc>
</template>
