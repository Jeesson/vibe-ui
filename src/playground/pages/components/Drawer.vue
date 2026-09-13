<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Drawer from "../../../components/Drawer/Drawer.vue";
import Button from "../../../components/Button/Button.vue";
const doc = docs.drawer;
const open = ref(false);
const placement = ref<"left" | "right" | "top" | "bottom">("right");
function openDrawer(p: "left" | "right" | "top" | "bottom") {
    placement.value = p;
    open.value = true;
}
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="flex flex-wrap gap-2">
                <Button @click="openDrawer('right')">Drawer справа</Button>
                <Button variant="secondary" @click="openDrawer('left')"
                    >слева</Button
                >
                <Button variant="secondary" @click="openDrawer('top')"
                    >сверху</Button
                >
                <Button variant="secondary" @click="openDrawer('bottom')"
                    >снизу</Button
                >
            </div>
            <Drawer
                v-model="open"
                title="Боковая панель"
                :placement="placement"
            >
                Контент выезжающей панели ({{ placement }}).
                <template #footer>
                    <Button variant="ghost" @click="open = false"
                        >Закрыть</Button
                    >
                </template>
            </Drawer>
        </template>
    </ComponentDoc>
</template>
