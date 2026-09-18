<script setup lang="ts">
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Affix from "../../../components/Affix/Affix.vue";
import Tag from "../../../components/Tag/Tag.vue";
const doc = docs.affix;
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <div class="max-w-sm rounded-md border border-gray-100">
                <Affix :offset="56">
                    <div class="flex items-center gap-2 border-b border-gray-100 bg-white px-3 py-2">
                        <Tag type="primary">Affix</Tag>
                        <span class="text-xs text-gray-500"> Прилипающая панель </span>
                    </div>
                </Affix>
                <div class="h-72 overflow-hidden p-3 text-sm text-gray-500">
                    Прокрути страницу — панель прилипнет к верху окна, а в конце этого блока уедет вместе с ним.
                </div>
            </div>
        </template>
    </ComponentDoc>
</template>
