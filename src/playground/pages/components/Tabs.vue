<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Tabs from "../../../components/Tabs/Tabs.vue";
import TabPane from "../../../components/Tabs/TabPane.vue";
const doc = docs.tabs;
const tab = ref("a");
const items = [
    { name: "a", label: "Вкладка A" },
    { name: "b", label: "Вкладка B" },
    { name: "c", label: "Вкладка C", disabled: true },
];
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="max-w-md">
                <Tabs v-model="tab" :items="items">
                    <TabPane name="a">Контент вкладки A.</TabPane>
                    <TabPane name="b">Контент вкладки B.</TabPane>
                </Tabs>
            </div>
        </template>
    </ComponentDoc>
</template>
