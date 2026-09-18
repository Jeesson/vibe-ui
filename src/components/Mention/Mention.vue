<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
    modelValue: string;
    users: string[];
    placeholder?: string;
}>();
const emit = defineEmits<{ "update:modelValue": [string] }>();

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const showList = ref(false);
const query = ref("");
const mentionStart = ref(0);

const filtered = computed(() => props.users.filter((u) => u.toLowerCase().includes(query.value.toLowerCase())).slice(0, 6));

function onInput(e: Event) {
    const el = e.target as HTMLTextAreaElement;
    const value = el.value;
    emit("update:modelValue", value);

    const caret = el.selectionStart;
    const upToCaret = value.slice(0, caret);
    const match = upToCaret.match(/@(\w*)$/);
    if (match) {
        query.value = match[1];
        mentionStart.value = caret - match[0].length;
        showList.value = true;
    } else {
        showList.value = false;
    }
}

function pick(user: string) {
    const el = textareaRef.value;
    if (!el) return;
    const before = props.modelValue.slice(0, mentionStart.value);
    const after = props.modelValue.slice(el.selectionStart);
    const next = `${before}@${user} ${after}`;
    emit("update:modelValue", next);
    showList.value = false;
}
</script>

<template>
    <div class="relative">
        <textarea
            ref="textareaRef"
            :value="modelValue"
            :placeholder="placeholder"
            rows="3"
            class="focus:ring-primary-500 focus:border-primary-500 w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2"
            @input="onInput" />
        <ul v-if="showList && filtered.length" class="absolute z-10 mt-1 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
            <li v-for="user in filtered" :key="user" class="cursor-pointer px-3 py-1.5 text-sm hover:bg-gray-50" @click="pick(user)">
                @{{ user }}
            </li>
        </ul>
    </div>
</template>
