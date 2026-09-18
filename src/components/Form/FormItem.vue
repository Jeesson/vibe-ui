<script setup lang="ts">
import { inject, onBeforeUnmount, computed } from "vue";
import { FormContextKey, runRules } from "../../composables/form-context";

const props = defineProps<{
    prop: string;
    label?: string;
}>();

const form = inject(FormContextKey, null);

if (form) {
    form.registerItem({
        prop: props.prop,
        validate: () => runRules(form.model[props.prop], form.rules[props.prop]),
    });
    onBeforeUnmount(() => form.unregisterItem(props.prop));
}

const error = computed(() => (form ? form.errors.value[props.prop] : null));
</script>

<template>
    <div class="flex flex-col gap-1" :style="form?.labelWidth ? { '--label-width': form.labelWidth } : {}">
        <label v-if="label" class="text-sm font-medium text-gray-700">{{ label }}</label>
        <slot />
        <span v-if="error" class="text-xs text-red-600">{{ error }}</span>
    </div>
</template>
