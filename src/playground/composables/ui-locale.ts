import { ref, computed } from "vue";

export type Locale = "ru" | "en";

const locale = ref<Locale>((localStorage.getItem("vibe-ui-locale") as Locale) || "en");

const messages: Record<Locale, Record<string, string>> = {
    ru: {
        "nav.overview": "Обзор",
        "nav.basic": "Базовые",
        "nav.form": "Форма",
        "nav.data": "Данные",
        "nav.navigation": "Навигация",
        "nav.feedback": "Feedback",
        "nav.misc": "Разное",
        "nav.datetime": "Дата и время",
        "overview.title": "Обзор",
        "overview.description": "Быстрый просмотр всех компонентов библиотеки на одной странице",
        "page.onPage": "На странице",
        "docs.livePreview": "Живое превью",
        "docs.component": "Компонент",
        "docs.mainExample": "Основной пример",
        "docs.showCode": "Показать код",
        "docs.api": "API компонента",
        "docs.apiDescription": "Props, события, методы и слоты",
        "docs.props": "Props",
        "docs.events": "События",
        "docs.methods": "Методы",
        "docs.slots": "Слоты",
        "docs.name": "Имя",
        "docs.type": "Тип",
        "docs.default": "По умолчанию",
        "docs.description": "Описание",
        "docs.event": "Событие",
        "docs.params": "Параметры",
        "docs.method": "Метод",
        "docs.signature": "Сигнатура",
        "docs.slot": "Слот",
        "docs.contributors": "Авторы",
    },
    en: {
        "nav.overview": "Overview",
        "nav.basic": "Basic",
        "nav.form": "Form",
        "nav.data": "Data",
        "nav.navigation": "Navigation",
        "nav.feedback": "Feedback",
        "nav.misc": "Misc",
        "nav.datetime": "Date & Time",
        "overview.title": "Overview",
        "overview.description": "Quick preview of every library component on a single page",
        "page.onPage": "On this page",
        "docs.livePreview": "Live preview",
        "docs.component": "Component",
        "docs.mainExample": "Main example",
        "docs.showCode": "Show code",
        "docs.api": "Component API",
        "docs.apiDescription": "Props, events, methods, and slots",
        "docs.props": "Props",
        "docs.events": "Events",
        "docs.methods": "Methods",
        "docs.slots": "Slots",
        "docs.name": "Name",
        "docs.type": "Type",
        "docs.default": "Default",
        "docs.description": "Description",
        "docs.event": "Event",
        "docs.params": "Parameters",
        "docs.method": "Method",
        "docs.signature": "Signature",
        "docs.slot": "Slot",
        "docs.contributors": "Contributors",
    },
};

export function useLocale() {
    const t = computed(() => (key: string) => messages[locale.value][key] ?? key);

    function setLocale(next: Locale) {
        locale.value = next;
        localStorage.setItem("vibe-ui-locale", next);
        document.documentElement.lang = next;
    }

    return { locale, t, setLocale };
}
