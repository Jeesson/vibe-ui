<script setup lang="ts">
import { ref } from "vue";
import { toast } from "vue-sonner";
import ComponentDoc from "../../docs/ComponentDoc.vue";
import { components as docs } from "../../docs/component-docs";
import InputOtp from "../../../components/InputOtp/InputOtp.vue";
const doc = docs.inputOtp;
const code = ref("");
</script>

<template>
    <ComponentDoc :doc="doc">
        <template #examples>
            <InputOtp
                v-model="code"
                :length="6"
                @complete="(v) => toast.success('Код: ' + v)"
            />
        </template>
    </ComponentDoc>
</template>
