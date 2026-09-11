<script setup lang="ts">
import { ref } from "vue";
import Alert from "../../components/Alert/Alert.vue";
import Button from "../../components/Button/Button.vue";
import Dialog from "../../components/Dialog/Dialog.vue";
import Drawer from "../../components/Drawer/Drawer.vue";
import Loading from "../../components/Loading/Loading.vue";
import { messageBox } from "../../components/MessageBox";
import { toast } from "vue-sonner";

const dialogVisible = ref(false);
const drawerVisible = ref(false);
const drawerPlacement = ref<"left" | "right" | "top" | "bottom">("right");
const loadingDemo = ref(false);

function openDrawer(placement: "left" | "right" | "top" | "bottom") {
    drawerPlacement.value = placement;
    drawerVisible.value = true;
}

function runLoadingDemo() {
    loadingDemo.value = true;
    setTimeout(() => (loadingDemo.value = false), 1500);
}

function askDelete() {
    messageBox
        .confirm("Это действие необратимо. Продолжить?", {
            title: "Удалить элемент?",
            type: "danger",
            confirmText: "Удалить",
        })
        .then(() => toast.success("Удалено"))
        .catch(() => toast.info("Отменено"));
}

defineExpose({
    anchors: [
        { href: "#feedback-alert", title: "Alert" },
        { href: "#feedback-toast", title: "Toast" },
        { href: "#feedback-dialog", title: "Dialog / Drawer" },
        { href: "#feedback-loading", title: "Loading" },
        { href: "#feedback-messagebox", title: "MessageBox" },
    ],
});
</script>

<template>
    <div class="flex flex-col gap-4">
        <section
            id="feedback-alert"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">Alert</h2>
            <div class="flex max-w-sm flex-col gap-2">
                <Alert type="info" title="Обновление"
                    >Доступна новая версия библиотеки.</Alert
                >
                <Alert type="danger" closable
                    >Ошибка сохранения. Попробуйте снова.</Alert
                >
            </div>
        </section>

        <section
            id="feedback-toast"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">
                Toast (vue-sonner)
            </h2>
            <div class="flex gap-2">
                <Button size="sm" @click="toast.success('Успешно!')"
                    >Success</Button
                >
                <Button size="sm" @click="toast.error('Что-то пошло не так')"
                    >Error</Button
                >
                <Button size="sm" @click="toast.warning('Осторожно')"
                    >Warning</Button
                >
            </div>
        </section>

        <section
            id="feedback-dialog"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">
                Dialog / Drawer
            </h2>
            <div class="flex flex-wrap gap-2">
                <Button @click="dialogVisible = true">Dialog</Button>
                <Button variant="secondary" @click="openDrawer('right')"
                    >Drawer справа</Button
                >
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
            <Dialog
                v-model="dialogVisible"
                title="Пример диалога"
                width="380px"
            >
                Простое содержимое диалога.
                <template #footer
                    ><Button @click="dialogVisible = false"
                        >Ок</Button
                    ></template
                >
            </Dialog>
            <Drawer
                v-model="drawerVisible"
                title="Боковая панель"
                :placement="drawerPlacement"
            >
                Контент выезжающей панели ({{ drawerPlacement }}).
                <template #footer
                    ><Button variant="ghost" @click="drawerVisible = false"
                        >Закрыть</Button
                    ></template
                >
            </Drawer>
        </section>

        <section
            id="feedback-loading"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">Loading</h2>
            <Loading :loading="loadingDemo" class="max-w-sm">
                <div
                    class="rounded-md border border-gray-100 p-6 text-center text-sm text-gray-500"
                >
                    Область с контентом
                </div>
            </Loading>
            <Button size="sm" class="mt-2" @click="runLoadingDemo"
                >Показать загрузку (1.5с)</Button
            >
        </section>

        <section
            id="feedback-messagebox"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">
                MessageBox (Promise-based confirm)
            </h2>
            <Button variant="ghost" @click="askDelete">Удалить элемент</Button>
        </section>
    </div>
</template>
