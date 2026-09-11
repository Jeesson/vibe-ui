<script setup lang="ts">
import { provide, ref, reactive } from "vue";
import {
    FormContextKey,
    runRules,
    type FormRule,
    type FormItemContext,
} from "../../composables/form-context";

const props = defineProps<{
    model: Record<string, unknown>;
    rules?: Record<string, FormRule[]>;
    labelWidth?: string;
}>();

const errors = ref<Record<string, string | null>>({});
const items = reactive<Map<string, FormItemContext>>(new Map());

function registerItem(item: FormItemContext) {
    items.set(item.prop, item);
}
function unregisterItem(prop: string) {
    items.delete(prop);
    delete errors.value[prop];
}

function validate(): boolean {
    let valid = true;
    for (const [prop, rules] of Object.entries(props.rules ?? {})) {
        const result = runRules(props.model[prop], rules);
        errors.value[prop] = result === true ? null : result;
        if (result !== true) valid = false;
    }
    return valid;
}

function resetFields() {
    errors.value = {};
}

provide(FormContextKey, {
    model: props.model,
    rules: props.rules ?? {},
    labelWidth: props.labelWidth,
    errors,
    registerItem,
    unregisterItem,
});

defineExpose({ validate, resetFields });
</script>

<template>
    <form class="flex flex-col gap-4" @submit.prevent>
        <slot />
    </form>
</template>
