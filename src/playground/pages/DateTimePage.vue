<script setup lang="ts">
import { ref } from "vue";
import Cascader from "../../components/Cascader/Cascader.vue";
import ColorPicker from "../../components/ColorPicker/ColorPicker.vue";
import DatePicker from "../../components/DatePicker/DatePicker.vue";
import Calendar from "../../components/Calendar/Calendar.vue";
import TimeSelect from "../../components/TimeSelect/TimeSelect.vue";
import Upload from "../../components/Upload/Upload.vue";
import Carousel from "../../components/Carousel/Carousel.vue";
import Mention from "../../components/Mention/Mention.vue";
import Affix from "../../components/Affix/Affix.vue";
import Tag from "../../components/Tag/Tag.vue";

const cascaderValue = ref<string[]>([]);
const cascaderOptions = [
    {
        label: "Франция",
        value: "fr",
        children: [
            {
                label: "Иль-де-Франс",
                value: "ile-de-france",
                children: [{ label: "Париж", value: "paris" }],
            },
            {
                label: "Овернь — Рона — Альпы",
                value: "auvergne-rhone-alpes",
                children: [{ label: "Лион", value: "lyon" }],
            },
        ],
    },
    {
        label: "Германия",
        value: "de",
        children: [
            {
                label: "Берлин",
                value: "berlin-region",
                children: [{ label: "Берлин", value: "berlin" }],
            },
            {
                label: "Бавария",
                value: "bavaria",
                children: [{ label: "Мюнхен", value: "munich" }],
            },
        ],
    },
    {
        label: "Италия",
        value: "it",
        children: [
            {
                label: "Лацио",
                value: "lazio",
                children: [{ label: "Рим", value: "rome" }],
            },
            {
                label: "Ломбардия",
                value: "lombardy",
                children: [{ label: "Милан", value: "milan" }],
            },
        ],
    },
    {
        label: "Испания",
        value: "es",
        children: [
            {
                label: "Мадрид",
                value: "madrid-region",
                children: [{ label: "Мадрид", value: "madrid" }],
            },
            {
                label: "Каталония",
                value: "catalonia",
                children: [{ label: "Барселона", value: "barcelona" }],
            },
        ],
    },
    {
        label: "Польша",
        value: "pl",
        children: [
            {
                label: "Мазовецкое воеводство",
                value: "masovia",
                children: [{ label: "Варшава", value: "warsaw" }],
            },
            {
                label: "Малопольское воеводство",
                value: "lesser-poland",
                children: [{ label: "Краков", value: "krakow" }],
            },
        ],
    },
    {
        label: "Чехия",
        value: "cz",
        children: [
            {
                label: "Прага",
                value: "prague-region",
                children: [{ label: "Прага", value: "prague" }],
            },
        ],
    },
];

const color = ref("#185FA5");
const date = ref<string | null>(null);
const time = ref<string | null>(null);
const files = ref<File[]>([]);
const mentionText = ref("Привет, ");

const users = ["dodik", "anna_dev", "igor", "marta_design"];

const slideColors = [
    "bg-primary-50 text-primary-700",
    "bg-green-50 text-green-700",
    "bg-amber-50 text-amber-700",
    "bg-rose-50 text-rose-700",
    "bg-violet-50 text-violet-700",
];

defineExpose({
    anchors: [
        { href: "#datetime-affix", title: "Affix" },
        { href: "#datetime-cascader", title: "Cascader" },
        { href: "#datetime-colorpicker", title: "ColorPicker" },
        { href: "#datetime-datepicker", title: "DatePicker / TimeSelect" },
        { href: "#datetime-calendar", title: "Calendar" },
        { href: "#datetime-upload", title: "Upload" },
        { href: "#datetime-carousel", title: "Carousel" },
        { href: "#datetime-mention", title: "Mention" },
    ],
});
</script>

<template>
    <div class="flex flex-col gap-4">
        <section
            id="datetime-affix"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">Affix</h2>
            <p class="mb-2 text-xs text-gray-400">
                Панель прилипает к верху экрана при скролле и «отлипает», когда
                её родительский блок заканчивается (уезжает вместе с ним).
            </p>
            <div class="max-w-sm rounded-md border border-gray-100">
                <Affix :offset="56">
                    <div
                        class="flex items-center gap-2 border-b border-gray-100 bg-white px-3 py-2"
                    >
                        <Tag type="primary">Affix</Tag>
                        <span class="text-xs text-gray-500"
                            >Прилипающая панель</span
                        >
                    </div>
                </Affix>
                <div class="h-72 overflow-hidden p-3 text-sm text-gray-500">
                    Прокрути страницу — панель прилипнет к верхнему краю, а в
                    конце блока уедет вместе с ним.
                </div>
            </div>
        </section>

        <section
            id="datetime-cascader"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">Cascader</h2>
            <Cascader
                v-model="cascaderValue"
                :options="cascaderOptions"
                placeholder="Область / город"
                class="max-w-sm"
            />
        </section>

        <section
            id="datetime-colorpicker"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">
                ColorPicker
            </h2>
            <ColorPicker v-model="color" />
        </section>

        <section
            id="datetime-datepicker"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">
                DatePicker / TimeSelect
            </h2>
            <p class="mb-2 text-xs text-gray-400">
                Попап сам разворачивается вверх, если снизу не хватает места на
                экране.
            </p>
            <div class="flex max-w-sm gap-3">
                <DatePicker v-model="date" />
                <TimeSelect v-model="time" />
            </div>
        </section>

        <section
            id="datetime-calendar"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">Calendar</h2>
            <Calendar class="max-w-sm" />
        </section>

        <section
            id="datetime-upload"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">Upload</h2>
            <Upload v-model="files" class="max-w-sm" />
        </section>

        <section
            id="datetime-carousel"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">Carousel</h2>
            <Carousel class="h-40 max-w-sm" autoplay :interval="2500">
                <div
                    v-for="(cls, i) in slideColors"
                    :key="i"
                    :class="[
                        'flex h-40 items-center justify-center text-lg font-medium',
                        cls,
                    ]"
                >
                    Слайд {{ i + 1 }}
                </div>
            </Carousel>
        </section>

        <section
            id="datetime-mention"
            class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5"
        >
            <h2 class="mb-4 text-sm font-semibold text-gray-900">Mention</h2>
            <p class="mb-2 text-xs text-gray-400">
                Введи символ <strong>@</strong> прямо в тексте — появится список
                пользователей (доступны: {{ users.join(", ") }}). Выбор из
                списка вставит <code>@имя</code> и закроет подсказку.
            </p>
            <Mention
                v-model="mentionText"
                :users="users"
                placeholder="Напиши что-нибудь и добавь @имя"
                class="max-w-sm"
            />
        </section>
    </div>
</template>
