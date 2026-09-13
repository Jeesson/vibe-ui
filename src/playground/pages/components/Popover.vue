<script setup lang="ts">
import ComponentDoc from "../../docs/ComponentDoc.vue";
import DocExample from "../../docs/DocExample.vue";
import { components as docs } from "../../docs/component-docs";
import Popover from "../../../components/Popover/Popover.vue";
import Button from "../../../components/Button/Button.vue";
const doc = docs.popover;
const source = '<Popover title="Заголовок"><template #trigger><Button variant="secondary">Открыть Popover</Button></template>Любой контент внутри попапа.</Popover>';
</script>

<template>
    <ComponentDoc :doc="doc" structured-examples>
        <template #examples>
            <DocExample title="Popover с триггером" :source="source">
                <Popover title="Заголовок">
                    <template #trigger><Button variant="secondary">Открыть Popover</Button></template>
                    Любой контент внутри попапа.
                </Popover>
            </DocExample>
        </template>
    </ComponentDoc>
</template>
