<script setup lang="ts">
import ComponentDoc from "../../docs/ComponentDoc.vue";
import DocExample from "../../docs/DocExample.vue";
import { components as docs } from "../../docs/component-docs";
import Button from "../../../components/Button/Button.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import { ChevronRight } from "@lucide/vue";
const doc = docs.button;
const primarySource = '<Button variant="primary">Primary</Button>';
const secondarySource = '<Button variant="secondary">Secondary</Button>';
const ghostSource = '<Button variant="ghost">Ghost</Button>';
const disabledSource = "<Button disabled>Disabled</Button>";
const iconSource = '<Button :icon="PlusIcon">Добавить</Button>';
const iconRightSource = '<Button variant="secondary" :icon-right="ChevronRight">Далее</Button>';
</script>

<template>
    <ComponentDoc :doc="doc" structured-examples>
        <template #examples>
            <div class="flex flex-col gap-3">
                <DocExample title="Основная кнопка" :source="primarySource">
                    <Button variant="primary">Primary</Button>
                </DocExample>
                <DocExample title="Вторичная кнопка" :source="secondarySource">
                    <Button variant="secondary">Secondary</Button>
                </DocExample>
                <DocExample title="Ghost-кнопка" :source="ghostSource">
                    <Button variant="ghost">Ghost</Button>
                </DocExample>
                <DocExample title="Отключенная кнопка" :source="disabledSource">
                    <Button disabled>Disabled</Button>
                </DocExample>
            </div>
            <div class="mt-3 flex flex-col gap-3">
                <DocExample title="Кнопка с иконкой" :source="iconSource">
                    <Button :icon="PlusIcon">Добавить</Button>
                </DocExample>
                <DocExample title="Иконка справа" :source="iconRightSource">
                    <Button variant="secondary" :icon-right="ChevronRight">Далее</Button>
                </DocExample>
            </div>
        </template>
    </ComponentDoc>
</template>
