import { ref, computed } from "vue";

export type Locale = "ru" | "en";

const locale = ref<Locale>(
    (localStorage.getItem("complex-ui-locale") as Locale) || "ru",
);

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
        "overview.description":
            "Быстрый просмотр всех компонентов библиотеки на одной странице",
        "page.onPage": "На странице",
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
        "overview.description":
            "Quick preview of every library component on a single page",
        "page.onPage": "On this page",
    },
};

export function useLocale() {
    const t = computed(
        () => (key: string) => messages[locale.value][key] ?? key,
    );

    function setLocale(next: Locale) {
        locale.value = next;
        localStorage.setItem("complex-ui-locale", next);
        document.documentElement.lang = next;
    }

    return { locale, t, setLocale };
}
