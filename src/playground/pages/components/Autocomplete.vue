<script setup lang="ts">
import { ref } from "vue";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import Autocomplete from "../../../components/Autocomplete/Autocomplete.vue";
const doc = docs.autocomplete;
const value = ref("");
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <Autocomplete
                v-model="value"
                placeholder="Начни вводить город"
                :suggestions="['Киев', 'Каменское', 'Днепр', 'Харьков', 'Одесса', 'Львов']"
                class="max-w-sm" />
        </template>
    </ComponentDoc>
</template>
