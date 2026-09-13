<script setup lang="ts">
import ComponentDoc from "../../docs/ComponentDoc.vue";
import DocExample from "../../docs/DocExample.vue";
import { components as docs } from "../../docs/component-docs";
import Divider from "../../../components/Divider/Divider.vue";
const doc = docs.divider;
const labeledSource = '<Divider>секция</Divider>';
const horizontalSource = '<Divider />';
const verticalSource = '<Divider direction="vertical" />';
</script>

<template>
    <ComponentDoc :doc="doc" structured-examples>
        <template #examples>
            <div class="flex max-w-sm flex-col gap-4">
                <DocExample title="С подписью" :source="labeledSource">
                    <div>
                        <p class="text-sm text-gray-600">Текст до разделителя</p>
                        <Divider>секция</Divider>
                        <p class="text-sm text-gray-600">Текст после разделителя</p>
                    </div>
                </DocExample>
                <DocExample title="Горизонтальный" :source="horizontalSource">
                    <Divider />
                </DocExample>
                <DocExample title="Вертикальный" :source="verticalSource">
                    <div class="flex items-center gap-3 text-sm text-gray-600">
                        <span>Левая</span>
                        <Divider direction="vertical" />
                        <span>Правая</span>
                    </div>
                </DocExample>
            </div>
        </template>
    </ComponentDoc>
</template>
