<script setup lang="ts">
import Button from "../../components/Button/Button.vue";
import Avatar from "../../components/Avatar/Avatar.vue";
import Badge from "../../components/Badge/Badge.vue";
import Tag from "../../components/Tag/Tag.vue";
import Tooltip from "../../components/Tooltip/Tooltip.vue";
import Divider from "../../components/Divider/Divider.vue";
import Progress from "../../components/Progress/Progress.vue";
// Иконки: heroicons (@heroicons/vue/24/outline и др. каталоги)
import { PlusIcon, ArrowDownTrayIcon } from "@heroicons/vue/24/outline";
// Иконки: lucide (lucide-vue-next)
import { Trash2, ChevronRight } from "lucide-vue-next";

defineExpose({
    anchors: [
        { href: "#basic-button", title: "Button" },
        { href: "#basic-avatar", title: "Avatar / Badge" },
        { href: "#basic-tag", title: "Tag / Tooltip" },
        { href: "#basic-divider", title: "Divider" },
        { href: "#basic-progress", title: "Progress" },
    ],
});
</script>

<template>
    <div class="flex flex-col gap-4">
        <section
            id="basic-button"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">Button</h2>
            <div class="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button disabled>Disabled</Button>
            </div>

            <p class="mt-4 mb-2 text-xs text-gray-400">
                С иконками — подходит любой svg-компонент из
                <code>@heroicons/vue</code> или <code>lucide-vue-next</code>
            </p>
            <div class="flex flex-wrap items-center gap-3">
                <Button :icon="PlusIcon">Добавить</Button>
                <Button variant="secondary" :icon="Trash2">Удалить</Button>
                <Button variant="secondary" :icon="ArrowDownTrayIcon"
                    >Скачать</Button
                >
                <Button variant="ghost" :icon-right="ChevronRight"
                    >Далее</Button
                >
            </div>
            <div class="mt-3 flex flex-wrap items-center gap-3">
                <Button size="sm" :icon="PlusIcon">sm</Button>
                <Button size="md" :icon="PlusIcon">md</Button>
                <Button size="lg" :icon="PlusIcon">lg</Button>
            </div>
        </section>

        <section
            id="basic-avatar"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">
                Avatar / Badge
            </h2>
            <div class="flex items-center gap-4">
                <Avatar initials="ДК" size="lg" />
                <Badge :value="5"><Avatar initials="ДК" /></Badge>
                <Badge dot><Avatar initials="ОК" /></Badge>
            </div>
        </section>

        <section
            id="basic-tag"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">
                Tag / Tooltip
            </h2>
            <div class="flex items-center gap-2">
                <Tag type="primary">Primary</Tag>
                <Tag type="success">Success</Tag>
                <Tag type="danger" closable>Danger</Tag>
                <Tooltip content="Подсказка сверху">
                    <span
                        class="cursor-help text-sm underline decoration-dotted"
                        >наведи сюда</span
                    >
                </Tooltip>
            </div>
        </section>

        <section
            id="basic-divider"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">Divider</h2>
            <Divider>секция</Divider>
        </section>

        <section
            id="basic-progress"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">Progress</h2>
            <div class="flex max-w-md flex-col gap-3">
                <Progress :percentage="72" />
                <Progress :percentage="100" status="success" />
                <Progress :percentage="55" status="warning" />
                <Progress :percentage="35" status="exception" />
                <div class="flex items-center gap-6">
                    <div class="flex-1"><Progress indeterminate /></div>
                    <Progress :percentage="45" type="circle" :size="64" />
                    <Progress
                        :percentage="75"
                        type="dashboard"
                        :size="64"
                        status="success"
                    />
                </div>
            </div>
        </section>
    </div>
</template>
