<script setup lang="ts">
import ComponentDoc from "../../docs/ComponentDoc.vue";
import DocExample from "../../docs/DocExample.vue";
import { components as docs } from "../../docs/component-docs";
import Avatar from "../../../components/Avatar/Avatar.vue";
const doc = docs.avatar;
const initialsSource = '<Avatar initials="ДК" size="sm" />';
const squareSource = '<Avatar initials="ИИ" shape="square" />';
const imageSource = '<Avatar src="https://picsum.photos/seed/complex-ui-avatar/96/96" size="lg" />';
</script>

<template>
    <ComponentDoc :doc="doc" structured-examples>
        <template #examples>
            <div class="flex flex-col gap-3">
                <DocExample title="Инициалы" :source="initialsSource"><Avatar initials="ДК" size="sm" /></DocExample>
                <DocExample title="Квадратная форма" :source="squareSource"><Avatar initials="ИИ" shape="square" /></DocExample>
                <DocExample title="Изображение" :source="imageSource"><Avatar src="https://picsum.photos/seed/complex-ui-avatar/96/96" size="lg" /></DocExample>
            </div>
        </template>
    </ComponentDoc>
</template>
