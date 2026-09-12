<script setup lang="ts">
import { ref } from "vue";
import Autocomplete from "../../components/Autocomplete/Autocomplete.vue";
import InputTag from "../../components/InputTag/InputTag.vue";
import InputOtp from "../../components/InputOtp/InputOtp.vue";
import Image from "../../components/Image/Image.vue";
import Scrollbar from "../../components/Scrollbar/Scrollbar.vue";
import { toast } from "vue-sonner";

const autocompleteValue = ref("");
const tagsValue = ref<string[]>(["vue", "typescript"]);
const limitedTags = ref<string[]>(["a", "b"]);
const otpValue = ref("");

defineExpose({
    anchors: [
        { href: "#misc-autocomplete", title: "Autocomplete" },
        { href: "#misc-inputtag", title: "InputTag" },
        { href: "#misc-inputotp", title: "InputOtp" },
        { href: "#misc-image", title: "Image" },
        { href: "#misc-scrollbar", title: "Scrollbar" },
    ],
});
</script>

<template>
    <div class="flex flex-col gap-4">
        <section
            id="misc-autocomplete"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">
                Autocomplete
            </h2>
            <Autocomplete
                v-model="autocompleteValue"
                placeholder="Начни вводить город"
                :suggestions="[
                    'Киев',
                    'Каменское',
                    'Днепр',
                    'Харьков',
                    'Одесса',
                    'Львов',
                ]"
                class="max-w-sm"
            />
        </section>

        <section
            id="misc-inputtag"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">InputTag</h2>
            <p class="mb-2 text-xs text-gray-400">
                Разделители: <strong>Enter</strong> или
                <strong>запятая</strong>. Backspace на пустом поле удаляет
                последний тег.
            </p>
            <InputTag
                v-model="tagsValue"
                placeholder="Введи текст и Enter / запятую"
                class="max-w-sm"
            />

            <p class="mt-4 mb-2 text-xs text-gray-400">
                С лимитом (максимум 3 тега)
            </p>
            <InputTag
                v-model="limitedTags"
                :max="3"
                placeholder="Максимум 3 тега"
                class="max-w-sm"
            />
        </section>

        <section
            id="misc-inputotp"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">InputOtp</h2>
            <InputOtp
                v-model="otpValue"
                :length="6"
                @complete="(v) => toast.success('Код: ' + v)"
            />
        </section>

        <section
            id="misc-image"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">
                Image (ленивая загрузка + превью по клику)
            </h2>
            <Image
                src="https://picsum.photos/seed/complex-ui/320/180"
                class="h-48 w-64 rounded-md"
                previewable
            />
        </section>

        <section
            id="misc-scrollbar"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">Scrollbar</h2>
            <Scrollbar max-height="120px" class="max-w-sm">
                <p
                    v-for="i in 12"
                    :key="i"
                    class="border-b border-gray-50 px-3 py-1.5 text-sm text-gray-600"
                >
                    Строка списка №{{ i }}
                </p>
            </Scrollbar>
        </section>
    </div>
</template>
