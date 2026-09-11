<script setup lang="ts">
import Avatar from "../../components/Avatar/Avatar.vue";
import Dropdown from "../../components/Dropdown/Dropdown.vue";
import { toast } from "vue-sonner";

defineProps<{ pageTitle?: string }>();
</script>

<template>
    <header
        class="sticky top-0 z-30 h-14 border-b border-gray-100 bg-white/80 backdrop-blur"
    >
        <div
            class="mx-auto flex h-full max-w-350 items-center justify-between px-5"
        >
            <div class="flex items-center gap-3">
                <div class="flex items-center gap-2">
                    <div
                        class="from-primary-500 to-primary-700 flex h-7 w-7 items-center justify-center rounded-md bg-linear-to-br text-sm font-bold text-white shadow-sm"
                    >
                        U
                    </div>
                    <span class="text-sm font-semibold text-gray-900"
                        >my-ui</span
                    >
                </div>

                <span class="text-gray-300">/</span>
                <span class="text-sm text-gray-500">{{ pageTitle }}</span>
            </div>

            <div class="flex items-center gap-3">
                <a
                    href="https://element-plus.org"
                    target="_blank"
                    rel="noopener"
                    class="hidden text-xs text-gray-400 hover:text-gray-600 sm:inline"
                >
                    вдохновлено Element Plus
                </a>

                <Dropdown
                    :items="[
                        { label: 'Профиль', value: 'profile' },
                        { label: 'Настройки', value: 'settings' },
                        { label: 'Выйти', value: 'logout', danger: true },
                    ]"
                    placement="bottom-end"
                    @select="(v) => toast.info('Меню: ' + v)"
                >
                    <Avatar
                        initials="JSN"
                        class="hover:ring-primary-100 cursor-pointer ring-2 ring-transparent transition-shadow"
                    />
                </Dropdown>
            </div>
        </div>
    </header>
</template>
