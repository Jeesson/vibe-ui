/**
 * component-docs.ts
 * -----------------------------------------------------------------------------
 * Единый дата-движок документации vibe-ui.
 *
 * Содержит для каждого компонента:
 *   - короткое описание (description),
 *   - пример использования (usage, сниппет кода),
 *   - API: props / events / methods / slots,
 *   - contributors (авторы компонента).
 *
 * Страница под каждый компонент строится шаблоном ComponentDoc.vue
 * на основе этой записи — добавлять новую документацию = добавить запись здесь.
 */

export type DocGroup =
    "basic" | "form" | "data" | "navigation" | "feedback" | "misc";

export interface PropDoc {
    name: string;
    type: string;
    default?: string;
    description?: string;
    /** true, если без значения компонент не работает (обязательный пропс) */
    required?: boolean;
}

export interface EventDoc {
    name: string;
    params?: string;
    description?: string;
}

export interface MethodDoc {
    name: string;
    params?: string;
    description?: string;
}

export interface SlotDoc {
    name: string;
    params?: string;
    description?: string;
}

export interface Contributor {
    name: string;
    github?: string;
    role?: string;
}

export interface ComponentDoc {
    key: string;
    name: string;
    group: DocGroup;
    /** кастомный регистрируемый тег (если компонент задаёт defineOptions name) */
    tag?: string;
    description: string;
    /** краткий сниппет использования (вставляется как код) */
    usage?: string;
    props?: PropDoc[];
    events?: EventDoc[];
    methods?: MethodDoc[];
    slots?: SlotDoc[];
    contributors: Contributor[];
}

/* ---------------------------------------------------------------------------
 * Contributors.
 * Список по умолчанию для всех компонентов. Наполнять из git-history:
 *   > git shortlog -sn -- src/components/<Name>
 * GitHub-API недоступен (репозиторий приватный), поэтому здесь — автор проекта.
 * ------------------------------------------------------------------------- */
const AUTHOR: Contributor[] = [
    {
        name: "Jeesson",
        github: "Jeesson",
        role: "Автор и мейнтейнер vibe-ui",
    },
];

const contributors = (extra: Contributor[] = []) => [...AUTHOR, ...extra];

/* ---------------------------------------------------------------------------
 * Группы соответствуют разделам сайдбара (basic/form/data/navigation/feedback/misc).
 * ------------------------------------------------------------------------- */
export const components: Record<string, ComponentDoc> = {
    /* ================================ BASIC ================================ */
    button: {
        key: "button",
        name: "Button",
        group: "basic",
        description:
            "Кнопка с тремя вариантами (primary/secondary/ghost) и тремя размерами. " +
            "Поддерживает иконки из heroicons или lucide слева и справа.",
        usage:
            '<Button variant="primary">Primary</Button>\n' +
            '<Button variant="secondary">Secondary</Button>\n' +
            '<Button variant="ghost">Ghost</Button>\n' +
            "<Button disabled>Disabled</Button>\n" +
            '<Button :icon="PlusIcon">Добавить</Button>\n' +
            '<Button variant="secondary" :icon-right="ChevronRight">Далее</Button>\n' +
            '<Button size="sm" :icon="PlusIcon">sm</Button>\n' +
            '<Button size="md">md</Button>\n' +
            '<Button size="lg">lg</Button>',
        props: [
            {
                name: "variant",
                type: '"primary" | "secondary" | "ghost"',
                default: '"primary"',
                description: "Стиль кнопки.",
            },
            {
                name: "size",
                type: '"sm" | "md" | "lg"',
                default: '"md"',
                description: "Размер кнопки.",
            },
            {
                name: "disabled",
                type: "boolean",
                default: "false",
                description: "Отключает кнопку.",
            },
            {
                name: "icon",
                type: "Component",
                description: "SVG-иконка слева (heroicons/lucide).",
            },
            {
                name: "iconRight",
                type: "Component",
                description: "SVG-иконка справа.",
            },
        ],
        events: [
            {
                name: "click",
                params: "MouseEvent",
                description: "Клик по кнопке.",
            },
        ],
        slots: [{ name: "default", description: "Контент (подпись) кнопки." }],
        contributors: contributors(),
    },
    avatar: {
        key: "avatar",
        name: "Avatar",
        group: "basic",
        description:
            "Аватар пользователя: картинка (src) или инициалы на стабильном цвете, " +
            "который выводится из строки (initials/src), а не выбирается случайно.",
        usage: '<Avatar initials="ДК" size="lg" />\n<Avatar src="https://example.com/photo.png" shape="square" />',
        props: [
            {
                name: "src",
                type: "string",
                description: "URL фото (перекрывает инициалы).",
            },
            {
                name: "initials",
                type: "string",
                description: "Инициалы, показываются без src.",
            },
            {
                name: "size",
                type: '"sm" | "md" | "lg"',
                default: '"md"',
                description: "Размер.",
            },
            {
                name: "shape",
                type: '"circle" | "square"',
                default: '"circle"',
                description: "Форма.",
            },
        ],
        contributors: contributors(),
    },
    badge: {
        key: "badge",
        name: "Badge",
        group: "basic",
        description:
            "Бейдж-счётчик поверх другого содержимого (классика — поверх аватара/иконки). " +
            "Превращает большие числа в «99+» и умеет режим точки.",
        usage: '<Badge :value="5"><Avatar initials="ДК" /></Badge>\n<Badge dot><Avatar initials="ОК" /></Badge>',
        props: [
            {
                name: "value",
                type: "number | string",
                description: "Число/текст бейджа.",
            },
            {
                name: "max",
                type: "number",
                default: "99",
                description: "Порог отображения «N+».",
            },
            {
                name: "dot",
                type: "boolean",
                default: "false",
                description: "Режим точки без значения.",
            },
            {
                name: "type",
                type: '"primary" | "danger" | "success" | "warning"',
                default: '"danger"',
                description: "Цвет бейджа.",
            },
            {
                name: "hidden",
                type: "boolean",
                default: "false",
                description: "Полностью скрыть бейдж.",
            },
        ],
        slots: [
            {
                name: "default",
                description: "Элемент, над которым позиционируется бейдж.",
            },
        ],
        contributors: contributors(),
    },

    tag: {
        key: "tag",
        name: "Tag",
        group: "basic",
        description: "Метка-тег в пяти цветах; умеет закрываться (closable).",
        usage: '<Tag type="success">Готово</Tag>\n<Tag type="danger" closable>Удалить</Tag>',
        props: [
            {
                name: "type",
                type: '"primary" | "success" | "warning" | "danger" | "info"',
                default: '"info"',
            },
            {
                name: "closable",
                type: "boolean",
                default: "false",
                description: "Показывать крестик закрытия.",
            },
        ],
        events: [{ name: "close", description: "Клик по крестику закрытия." }],
        slots: [{ name: "default", description: "Текст тега." }],
        contributors: contributors(),
    },
    tooltip: {
        key: "tooltip",
        name: "Tooltip",
        group: "basic",
        description:
            "Всплывающая подсказка по наведению, с выбором стороны (placement).",
        usage: '<Tooltip content="Подсказка сверху" placement="top">\n  <span>наведи сюда</span>\n</Tooltip>',
        props: [
            {
                name: "content",
                type: "string",
                required: true,
                description: "Текст подсказки.",
            },
            {
                name: "placement",
                type: '"top" | "bottom" | "left" | "right"',
                default: '"top"',
            },
        ],
        slots: [
            {
                name: "default",
                description:
                    "Якорь-элемент, при наведении показывается подсказка.",
            },
        ],
        contributors: contributors(),
    },
    divider: {
        key: "divider",
        name: "Divider",
        group: "basic",
        description:
            "Разделитель. По умолчанию — горизонтальная линия на всю ширину. " +
            "Если передать контент — линия с подписью по центру; есть вертикальный режим.",
        usage:
            "<Divider>секция</Divider>\n" +
            "<Divider />\n" +
            '<Divider direction="vertical" />',
        props: [
            {
                name: "direction",
                type: '"horizontal" | "vertical"',
                default: '"horizontal"',
            },
        ],
        slots: [
            {
                name: "default",
                description: "Необязательная подпись по центру линии.",
            },
        ],
        contributors: contributors(),
    },
    progress: {
        key: "progress",
        name: "Progress",
        group: "basic",
        description:
            "Индикатор прогресса: линейный, круговой и «dashboard» (дуга-спидометр 270° " +
            "со скруглёнными концами и градиентной заливкой). Поддерживает статусы, " +
            "индетерминантный режим и кастомный цвет.",
        usage: '<Progress :percentage="72" />\n<Progress :percentage="75" type="circle" :size="64" status="success" />',
        props: [
            {
                name: "percentage",
                type: "number",
                description: "Значение 0–100 (клампится).",
            },
            {
                name: "type",
                type: '"line" | "circle" | "dashboard"',
                default: '"line"',
            },
            {
                name: "status",
                type: '"normal" | "success" | "warning" | "exception"',
                default: '"normal"',
                description: "Цвет по статусу.",
            },
            {
                name: "indeterminate",
                type: "boolean",
                default: "false",
                description: "Индетерминантная анимация.",
            },
            {
                name: "animation",
                type: '"slide" | "stripes" | "pulse"',
                default: '"slide"',
                description:
                    "Вариант indeterminate-анимации (только для line): «slide» — движущийся сегмент, «stripes» — бегущие диагональные полоски, «pulse» — пульсирующая шкала.",
            },
            {
                name: "strokeColor",
                type: "string",
                description: "Кастомный цвет (перекрывает status).",
            },
            {
                name: "strokeWidth",
                type: "number",
                default: "6",
                description: "Толщина линии/дуги (круг).",
            },
            {
                name: "showText",
                type: "boolean",
                default: "true",
                description: "Показывать процент.",
            },
            {
                name: "size",
                type: "number",
                default: "80",
                description: "Диаметр круга в px.",
            },
        ],
        contributors: contributors(),
    },

    /* ================================= FORM ================================ */
    input: {
        key: "input",
        name: "Input",
        group: "form",
        description:
            "Текстовое поле с подписью (label), placeholder'ом, состоянием ошибки " +
            "и управлением через v-model.",
        usage: '<Input v-model="name" label="Имя" placeholder="Введите имя" />',
        props: [
            {
                name: "modelValue",
                type: "string",
                required: true,
                description: "Значение (v-model).",
            },
            {
                name: "label",
                type: "string",
                description: "Подпись над полем.",
            },
            { name: "placeholder", type: "string" },
            {
                name: "error",
                type: "string",
                description: "Текст ошибки — красит рамку в красный.",
            },
            { name: "disabled", type: "boolean", default: "false" },
        ],
        events: [
            {
                name: "update:modelValue",
                params: "string",
                description: "Срабатывает при вводе.",
            },
        ],
        contributors: contributors(),
    },
    select: {
        key: "select",
        name: "Select",
        group: "form",
        description:
            "Выпадающий список. Список рендерится через Teleport с fixed-позиционированием, " +
            "поэтому корректно работает внутри Dialog/Drawer. Есть clearable и disabled-опции.",
        usage:
            '<Select v-model="value" :options="roleOptions" />\n' +
            '<Select v-model="value" :options="roleOptions" placeholder="Роль" clearable />\n' +
            '<Select v-model="value" :options="roleOptions" placeholder="Отключено" disabled />',
        props: [
            {
                name: "modelValue",
                type: "string | number | null",
                required: true,
                description: "Выбранное значение (v-model).",
            },
            {
                name: "options",
                type: "SelectOption[]",
                required: true,
                description:
                    "Массив SelectOption: { label, value, disabled? }.",
            },
            { name: "placeholder", type: "string", default: '"Выберите"' },
            { name: "disabled", type: "boolean", default: "false" },
            {
                name: "clearable",
                type: "boolean",
                default: "false",
                description: "Показывать кнопку очистки выбранного значения.",
            },
        ],
        events: [
            {
                name: "update:modelValue",
                params: "string | number | null",
                description: "Изменение значения.",
            },
            {
                name: "change",
                params: "string | number | null",
                description: "Выбор опции или очистка.",
            },
        ],
        contributors: contributors(),
    },
    checkbox: {
        key: "checkbox",
        name: "Checkbox",
        group: "form",
        description:
            "Флажок. Один в standalone-режиме (modelValue) или внутри CheckboxGroup " +
            "(тогда используется prop value).",
        usage: '<Checkbox v-model="agree">Согласен</Checkbox>\n<CheckboxGroup v-model="arr"><Checkbox value="vue">Vue</Checkbox></CheckboxGroup>',
        props: [
            {
                name: "modelValue",
                type: "boolean",
                default: "false",
                description: "Состояние (standalone).",
            },
            {
                name: "value",
                type: "string | number",
                description: "Значение внутри CheckboxGroup.",
            },
            { name: "disabled", type: "boolean", default: "false" },
        ],
        events: [
            {
                name: "update:modelValue",
                params: "boolean",
                description: "Переключение в standalone-режиме.",
            },
        ],
        slots: [{ name: "default", description: "Подпись флажка." }],
        contributors: contributors(),
    },
    checkboxGroup: {
        key: "checkboxGroup",
        name: "CheckboxGroup",
        group: "form",
        description:
            "Группа флажков, собирает выбранные value в единый массив через v-model.",
        usage: '<CheckboxGroup v-model="selected">\n  <Checkbox value="a">A</Checkbox>\n  <Checkbox value="b">B</Checkbox>\n</CheckboxGroup>',
        props: [
            {
                name: "modelValue",
                type: "(string | number)[]",
                required: true,
                description: "Массив выбранных значений.",
            },
        ],
        events: [
            {
                name: "update:modelValue",
                params: "(string | number)[]",
                description: "Изменение набора.",
            },
        ],
        slots: [{ name: "default", description: "Экземпляры <Checkbox>." }],
        contributors: contributors(),
    },
    radio: {
        key: "radio",
        name: "Radio",
        group: "form",
        description:
            "Радио-кнопка. Одна в standalone-режиме или внутри RadioGroup через prop value. " +
            "Клик по всей подписи надёжно попадает в input по нативной семантике label.",
        usage: '<RadioGroup v-model="v">\n  <Radio value="a">A</Radio>\n  <Radio value="b">B</Radio>\n</RadioGroup>',
        props: [
            {
                name: "modelValue",
                type: "boolean",
                default: "false",
                description: "Выбрано (standalone).",
            },
            {
                name: "value",
                type: "string | number",
                description: "Значение внутри RadioGroup.",
            },
            { name: "disabled", type: "boolean", default: "false" },
        ],
        events: [
            {
                name: "update:modelValue",
                params: "boolean",
                description: "Выбор в standalone-режиме.",
            },
        ],
        slots: [{ name: "default", description: "Подпись кнопки." }],
        contributors: contributors(),
    },
    radioGroup: {
        key: "radioGroup",
        name: "RadioGroup",
        group: "form",
        description:
            "Группа радио-кнопок — одно значение из набора через v-model.",
        usage: '<RadioGroup v-model="v"><Radio value="a">A</Radio></RadioGroup>',
        props: [
            {
                name: "modelValue",
                type: "string | number | null",
                required: true,
                description: "Выбранное значение.",
            },
        ],
        events: [
            {
                name: "update:modelValue",
                params: "string | number",
                description: "Выбор значения.",
            },
        ],
        slots: [{ name: "default", description: "Экземпляры <Radio>." }],
        contributors: contributors(),
    },

    switch: {
        key: "switch",
        name: "Switch",
        group: "form",
        description: "Переключатель-тумблер (boolean).",
        usage: '<Switch v-model="on" />',
        props: [
            { name: "modelValue", type: "boolean", required: true },
            { name: "disabled", type: "boolean", default: "false" },
        ],
        events: [{ name: "update:modelValue", params: "boolean" }],
        contributors: contributors(),
    },
    slider: {
        key: "slider",
        name: "Slider",
        group: "form",
        description: "Слайдер (range) с отображаемым значением справа.",
        usage: '<Slider v-model="value" :min="0" :max="100" :step="1" />',
        props: [
            { name: "modelValue", type: "number", required: true },
            { name: "min", type: "number", default: "0" },
            { name: "max", type: "number", default: "100" },
            { name: "step", type: "number", default: "1" },
            { name: "disabled", type: "boolean", default: "false" },
        ],
        events: [{ name: "update:modelValue", params: "number" }],
        contributors: contributors(),
    },
    inputNumber: {
        key: "inputNumber",
        name: "InputNumber",
        group: "form",
        description:
            "Числовое поле со stepper'ом (+/−) и скрытыми нативными стрелками браузера.",
        usage: '<InputNumber v-model="n" :min="0" :max="10" :step="1" />',
        props: [
            { name: "modelValue", type: "number", required: true },
            { name: "min", type: "number", default: "-Infinity" },
            { name: "max", type: "number", default: "Infinity" },
            { name: "step", type: "number", default: "1" },
            { name: "disabled", type: "boolean", default: "false" },
            {
                name: "width",
                type: "string",
                default: '"4rem"',
                description: "Ширина текстовой части.",
            },
        ],
        events: [{ name: "update:modelValue", params: "number" }],
        contributors: contributors(),
    },
    rate: {
        key: "rate",
        name: "Rate",
        group: "form",
        description:
            "Рейтинг из звёзд с hover-превью и лёгкой «pop»-анимацией при смене значения.",
        usage: '<Rate v-model="rate" :count="5" />',
        props: [
            {
                name: "modelValue",
                type: "number",
                required: true,
                description: "Текущая оценка.",
            },
            {
                name: "count",
                type: "number",
                default: "5",
                description: "Число звёзд.",
            },
            { name: "disabled", type: "boolean", default: "false" },
        ],
        events: [{ name: "update:modelValue", params: "number" }],
        contributors: contributors(),
    },
    form: {
        key: "form",
        name: "Form",
        group: "form",
        description:
            "Контейнер формы с валидацией. Принимает model и rules, предоставляет методы " +
            "validate()/resetFields() через ref.",
        usage:
            '<Form ref="formRef" :model="model" :rules="rules" class="max-w-sm">\n' +
            '  <FormItem prop="email" label="Email">\n' +
            '    <Input v-model="model.email" placeholder="you@example.com" />\n' +
            "  </FormItem>\n" +
            '  <FormItem prop="role" label="Роль">\n' +
            '    <Select v-model="model.role" :options="roleOptions" placeholder="Выберите роль" />\n' +
            "  </FormItem>\n" +
            '  <Button @click="submit">Проверить</Button>\n' +
            "</Form>",
        props: [
            {
                name: "model",
                type: "Record<string, unknown>",
                required: true,
                description: "Объект значений полей.",
            },
            {
                name: "rules",
                type: "Record<string, FormRule[]>",
                description: "Правила по ключам полей.",
            },
            {
                name: "labelWidth",
                type: "string",
                description: "Ширина подписей FormItem.",
            },
        ],
        methods: [
            {
                name: "validate",
                params: "(): boolean",
                description:
                    "Проверяет поля, возвращает true, если форма валидна.",
            },
            {
                name: "resetFields",
                params: "(): void",
                description: "Сбрасывает ошибки.",
            },
        ],
        slots: [
            { name: "default", description: "Экземпляры <FormItem> и поля." },
        ],
        contributors: contributors(),
    },
    formItem: {
        key: "formItem",
        name: "FormItem",
        group: "form",
        description:
            "Пункт формы: подпись + поле + вывод ошибки валидации. Работает внутри Form.",
        usage: '<FormItem prop="email" label="Email"><Input v-model="model.email" /></FormItem>',
        props: [
            {
                name: "prop",
                type: "string",
                required: true,
                description: "Ключ поля в model/rules.",
            },
            { name: "label", type: "string", description: "Подпись." },
        ],
        slots: [{ name: "default", description: "Поле ввода/select и т.п." }],
        contributors: contributors(),
    },

    /* ================================= DATA ================================ */
    card: {
        key: "card",
        name: "Card",
        group: "data",
        description:
            "Карточка в четырёх вариантах (рамка/тень/плоская/заливка) со слотами " +
            "заголовка, контента и подвала.",
        usage: '<Card title="Заголовок" type="elevated">Контент</Card>',
        props: [
            {
                name: "title",
                type: "string",
                description: "Заголовок (при отсутствии слота header).",
            },
            {
                name: "type",
                type: '"bordered" | "elevated" | "flat" | "filled"',
                default: '"bordered"',
            },
        ],
        slots: [
            { name: "default", description: "Контент карточки." },
            { name: "header", description: "Кастомный заголовок." },
            { name: "footer", description: "Подвал." },
        ],
        contributors: contributors(),
    },
    skeleton: {
        key: "skeleton",
        name: "Skeleton",
        group: "data",
        description:
            "Скелетон-заглушка во время загрузки: строки + опциональный аватар. " +
            "Когда loading=false — показывает контент из слота.",
        usage: '<Skeleton :loading="loading" :rows="3" avatar>Контент</Skeleton>',
        props: [
            {
                name: "rows",
                type: "number",
                default: "3",
                description: "Число строк-скелетонов.",
            },
            {
                name: "avatar",
                type: "boolean",
                default: "false",
                description: "Круглый скелетон-аватар слева.",
            },
            {
                name: "loading",
                type: "boolean",
                default: "true",
                description: "Показывать скелетон или контент.",
            },
        ],
        slots: [
            {
                name: "default",
                description: "Контент, показываемый после загрузки.",
            },
        ],
        contributors: contributors(),
    },
    collapse: {
        key: "collapse",
        name: "Collapse",
        group: "data",
        description:
            "Аккордеон-контейнер. Управляет списком открытых секций (массив имён) и " +
            "анимирует высоту чисто через CSS grid (0fr → 1fr).",
        usage: '<Collapse v-model="active">\n  <CollapseItem name="a" title="A">Подробнее о разделе</CollapseItem>\n</Collapse>',
        props: [
            {
                name: "modelValue",
                type: "string[]",
                required: true,
                description: "Имена открытых секций.",
            },
        ],
        events: [{ name: "update:modelValue", params: "string[]" }],
        slots: [{ name: "default", description: "Экземпляры <CollapseItem>." }],
        contributors: contributors(),
    },
    collapseItem: {
        key: "collapseItem",
        name: "CollapseItem",
        group: "data",
        description:
            "Секция аккордеона: заголовок-кнопка и раскрывающийся контент.",
        usage: '<CollapseItem name="a" title="Раздел A">Содержимое</CollapseItem>',
        props: [
            {
                name: "name",
                type: "string",
                required: true,
                description: "Уникальный ключ секции.",
            },
            {
                name: "title",
                type: "string",
                required: true,
                description: "Текст заголовка.",
            },
        ],
        slots: [{ name: "default", description: "Контент секции." }],
        contributors: contributors(),
    },

    table: {
        key: "table",
        name: "Table",
        group: "data",
        description:
            "Таблица с данными. Клик по сортируемой колонке переключает ↑/↓. " +
            "Ячейки кастомизируются через слот #cell-<key>.",
        usage:
            '<Table :columns="cols" :data="rows">\n' +
            '  <template #cell-status="{ row }"><Tag>{{ row.status }}</Tag></template>\n' +
            "</Table>",
        props: [
            {
                name: "columns",
                type: "TableColumn[]",
                required: true,
                description:
                    "Описание колонок {key, label, sortable?, width?}.",
            },
            {
                name: "data",
                type: "Record<string, unknown>[]",
                required: true,
                description: "Строки данных.",
            },
        ],
        slots: [
            {
                name: "cell-<key>",
                params: "{ row }",
                description: "Кастомная ячейка для колонки.",
            },
        ],
        contributors: contributors(),
    },
    timeline: {
        key: "timeline",
        name: "Timeline",
        group: "data",
        description:
            "Вертикальная лента событий с точками и линиями. Точки раскрашиваются по типу, " +
            "поддерживаются «полые» точки и кастомный слот #dot.",
        usage: "<Timeline :items=\"[{ title: 'Заказ создан', time: '10:00', type: 'success' }]\" />",
        props: [
            {
                name: "items",
                type: "TimelineItem[]",
                required: true,
                description:
                    "События {title, time?, description?, type?, hollow?}.",
            },
        ],
        slots: [
            {
                name: "dot",
                params: "{ item, index }",
                description: "Кастомная точка.",
            },
        ],
        contributors: contributors(),
    },
    pagination: {
        key: "pagination",
        name: "Pagination",
        group: "data",
        description:
            "Пагинация со сжатием диапазона до соседних страниц (через siblingCount) " +
            "и многоточием.",
        usage: '<Pagination v-model="page" :total="120" :page-size="10" />',
        props: [
            {
                name: "modelValue",
                type: "number",
                required: true,
                description: "Текущая страница.",
            },
            {
                name: "total",
                type: "number",
                required: true,
                description: "Всего записей.",
            },
            { name: "pageSize", type: "number", default: "10" },
            {
                name: "siblingCount",
                type: "number",
                default: "1",
                description: "Сколько страниц показывать по бокам.",
            },
        ],
        events: [{ name: "update:modelValue", params: "number" }],
        contributors: contributors(),
    },
    empty: {
        key: "empty",
        name: "Empty",
        group: "data",
        description:
            "Пустое состояние с иконкой, подписью и необязательными действиями.",
        usage: '<Empty description="Список пуст"><Button>Добавить</Button></Empty>',
        props: [
            {
                name: "description",
                type: "string",
                default: '"Нет данных"',
                description: "Подпись под иконкой.",
            },
        ],
        slots: [{ name: "default", description: "Действия под подписью." }],
        contributors: contributors(),
    },

    /* ============================ NAVIGATION =============================== */
    menu: {
        key: "menu",
        name: "Menu",
        group: "navigation",
        description:
            "Меню с вложенным подменю (рекурсивное). Используется в сайдбаре документации. " +
            "Регистрирует свой тег <MyUiMenu> для рекурсии.",
        tag: "MyUiMenu",
        usage: '<Menu :items="items" v-model="active" />',
        props: [
            {
                name: "items",
                type: "MenuItem[]",
                required: true,
                description: "Пункты {key, label, children?, disabled?}.",
            },
            {
                name: "modelValue",
                type: "string",
                required: true,
                description: "Ключ активного пункта.",
            },
        ],
        events: [{ name: "update:modelValue", params: "string" }],
        contributors: contributors(),
    },
    popover: {
        key: "popover",
        name: "Popover",
        group: "navigation",
        description:
            "Попап с произвольным контентом, открывается по клику на #trigger. " +
            "Панель телепортируется в body и сама разворачивается вверх при нехватке места.",
        usage: '<Popover title="Заголовок"><template #trigger><Button>Открыть</Button></template>Контент попапа</Popover>',
        props: [
            { name: "title", type: "string", description: "Заголовок попапа." },
        ],
        methods: [
            {
                name: "close",
                params: "(): void",
                description: "Программно закрыть попап (через ref).",
            },
        ],
        slots: [
            { name: "default", description: "Контент попапа." },
            {
                name: "trigger",
                description: "Элемент-якорь, по клику открывается попап.",
            },
        ],
        contributors: contributors(),
    },
    dropdown: {
        key: "dropdown",
        name: "Dropdown",
        group: "navigation",
        description:
            "Выпадающее меню действий. Шесть позиционок (сторона × выравнивание), " +
            "авто-переворот при нехватке места. Поддерживает disabled и danger-пункты.",
        usage: "<Dropdown :items=\"[{ label: 'Удалить', value: 'delete', danger: true }]\" @select=\"handleSelect\"><Button>Действия</Button></Dropdown>",
        props: [
            {
                name: "items",
                type: "DropdownItem[]",
                required: true,
                description: "Пункты {label, value, disabled?, danger?}.",
            },
            {
                name: "placement",
                type: '"bottom-start" | "bottom" | "bottom-end" | "top-start" | "top" | "top-end"',
                default: '"bottom-start"',
            },
        ],
        events: [
            {
                name: "select",
                params: "string",
                description: "Выбор пункта (value).",
            },
        ],
        slots: [{ name: "default", description: "Кнопка/элемент-триггер." }],
        contributors: contributors(),
    },
    anchor: {
        key: "anchor",
        name: "Anchor",
        group: "navigation",
        description:
            "Оглавление страницы. Следит за прокруткой (IntersectionObserver) и подсвечивает " +
            "активный якорь.",
        usage:
            '<Anchor :container="containerRef" direction="vertical" type="default" :offset="30">\n' +
            '  <AnchorLink href="#part1" title="Part 1" />\n' +
            '  <AnchorLink href="#part2" title="Part 2" />\n' +
            "</Anchor>",
        props: [
            {
                name: "links",
                type: "AnchorLink[]",
                description:
                    "Legacy array of anchor links. Use AnchorLink children for the Element Plus-style API.",
            },
            {
                name: "container",
                type: "string | HTMLElement | Window",
                default: "window",
                description: "Прокручиваемый контейнер.",
            },
            {
                name: "offset",
                type: "number",
                default: "0",
                description: "Отступ прокрутки от верхнего края.",
            },
            {
                name: "bound",
                type: "number",
                default: "15",
                description: "Порог активации якоря в пикселях.",
            },
            {
                name: "duration",
                type: "number",
                default: "300",
                description: "Длительность прокрутки в миллисекундах.",
            },
            {
                name: "marker",
                type: "boolean",
                default: "true",
                description: "Показывать маркер активного якоря.",
            },
            {
                name: "type",
                type: '"default" | "dot"',
                default: '"default"',
                description: "Тип маркера.",
            },
            {
                name: "direction",
                type: '"vertical" | "horizontal"',
                default: '"vertical"',
                description: "Направление списка якорей.",
            },
            {
                name: "selectScrollTop",
                type: "boolean",
                default: "false",
                description:
                    "Прокручивать выбранный якорь к началу контейнера.",
            },
        ],
        events: [
            {
                name: "click",
                params: "(event: MouseEvent, href: string) => void",
                description: "Срабатывает при выборе якорной ссылки.",
            },
        ],
        contributors: contributors(),
    },
    tabs: {
        key: "tabs",
        name: "Tabs",
        group: "navigation",
        description:
            "Вкладки. Навигация по items, контент в <TabPane :name>. Активная — по v-model.",
        usage: "<Tabs v-model=\"tab\" :items=\"[{ name: 'a', label: 'A' }, { name: 'b', label: 'B' }]\"><TabPane name=\"a\">Содержимое вкладки</TabPane></Tabs>",
        props: [
            {
                name: "modelValue",
                type: "string",
                required: true,
                description: "Имя активной вкладки.",
            },
            {
                name: "items",
                type: "{ name: string; label: string; disabled?: boolean }[]",
                required: true,
            },
        ],
        events: [{ name: "update:modelValue", params: "string" }],
        slots: [{ name: "default", description: "Экземпляры <TabPane>." }],
        contributors: contributors(),
    },
    backtop: {
        key: "backtop",
        name: "Backtop",
        group: "navigation",
        description:
            "Плавающая кнопка «наверх», появляется после прокрутки на visibilityHeight " +
            "и плавно прокручивает окно (или target-элемент) к началу.",
        usage: '<Backtop :visibility-height="200" />',
        props: [
            {
                name: "visibilityHeight",
                type: "number",
                default: "200",
                description:
                    "Порог прокрутки, после которого появляется кнопка.",
            },
            {
                name: "target",
                type: "string",
                description:
                    "CSS-селектор скроллящегося контейнера (по умолчанию окно).",
            },
        ],
        contributors: contributors(),
    },

    /* ============================== FEEDBACK =============================== */
    alert: {
        key: "alert",
        name: "Alert",
        group: "feedback",
        description:
            "Уведомление-блок в четырёх статусах, с заголовком и опциональным закрытием.",
        usage: '<Alert type="success" title="Готово">Данные сохранены.</Alert>',
        props: [
            {
                name: "type",
                type: '"success" | "warning" | "danger" | "info"',
                default: '"info"',
            },
            { name: "title", type: "string", description: "Жирный заголовок." },
            {
                name: "closable",
                type: "boolean",
                default: "false",
                description: "Крестик закрытия.",
            },
        ],
        events: [{ name: "close", description: "Закрытие алерта." }],
        slots: [{ name: "default", description: "Текст сообщения." }],
        contributors: contributors(),
    },
    dialog: {
        key: "dialog",
        name: "Dialog",
        group: "feedback",
        description:
            "Модальное окно. Teleport в body, блокировка прокрутки, закрытие по Esc/оверлею " +
            "(настраивается) и слот #footer для действий.",
        usage: '<Dialog v-model="open" title="Заголовок" width="420px">Контент диалога<template #footer><Button>Ок</Button></template></Dialog>',
        props: [
            {
                name: "modelValue",
                type: "boolean",
                required: true,
                description: "Видимость (v-model).",
            },
            { name: "title", type: "string", description: "Заголовок окна." },
            {
                name: "width",
                type: "string",
                default: '"480px"',
                description: "Ширина окна.",
            },
            {
                name: "closeOnClickOverlay",
                type: "boolean",
                default: "true",
                description: "Закрывать по клику на оверлей.",
            },
        ],
        events: [
            { name: "update:modelValue", params: "boolean" },
            { name: "close", description: "Момент закрытия." },
        ],
        slots: [
            { name: "default", description: "Контент окна." },
            { name: "footer", description: "Нижняя панель действий." },
        ],
        contributors: contributors(),
    },
    drawer: {
        key: "drawer",
        name: "Drawer",
        group: "feedback",
        description:
            "Выезжающая панель с любой стороны (placement) и настраиваемым размером. " +
            "Закрытие по Esc и оверлею, есть слот #footer.",
        usage: '<Drawer v-model="open" title="Панель" placement="right" size="360px">Контент панели</Drawer>',
        props: [
            {
                name: "modelValue",
                type: "boolean",
                required: true,
                description: "Видимость (v-model).",
            },
            { name: "title", type: "string", description: "Заголовок панели." },
            {
                name: "placement",
                type: '"left" | "right" | "top" | "bottom"',
                default: '"right"',
            },
            {
                name: "size",
                type: "string",
                default: '"360px"',
                description: "Ширина (верт.) или высота (гориз.) панели.",
            },
        ],
        events: [
            { name: "update:modelValue", params: "boolean" },
            { name: "close", description: "Момент закрытия." },
        ],
        slots: [
            { name: "default", description: "Контент панели." },
            { name: "footer", description: "Нижняя панель действий." },
        ],
        contributors: contributors(),
    },
    loading: {
        key: "loading",
        name: "Loading",
        group: "feedback",
        description:
            "Оверлей загрузки поверх контента (или на весь экран при fullscreen). " +
            "Показывается, пока loading=true.",
        usage: '<Loading :loading="busy" text="Загрузка..."><div>Контент</div></Loading>',
        props: [
            {
                name: "loading",
                type: "boolean",
                required: true,
                description: "Показывать оверлей.",
            },
            {
                name: "text",
                type: "string",
                description: "Подпись под спиннером.",
            },
            {
                name: "fullscreen",
                type: "boolean",
                default: "false",
                description: "Оверлей на весь экран (fixed).",
            },
        ],
        slots: [{ name: "default", description: "Содержимое области." }],
        contributors: contributors(),
    },

    messageBox: {
        key: "messageBox",
        name: "messageBox",
        group: "feedback",
        description:
            "Promise-обёртка над диалогом подтверждения. resolve при подтверждении, " +
            "reject при отмене. Без шаблонов — просто вызови функцию.",
        usage:
            'messageBox.confirm("Точно удалить?", { type: "danger", confirmText: "Удалить" })\n' +
            '  .then(() => toast.success("Удалено"))\n' +
            "  .catch(() => {});",
        methods: [
            {
                name: "confirm",
                params: "(message: string, options?: { title?, confirmText?, cancelText?, type? })",
                description: "Показывает диалог, возвращает Promise<void>.",
            },
        ],
        contributors: contributors(),
    },
    message: {
        key: "message",
        name: "message",
        group: "feedback",
        description:
            "Всплывающие сообщения по центру верха экрана (программный API). " +
            "Не требует ни шаблонов, ни компонента — только функцию.",
        usage: 'message.success("Сохранено")\nmessage.error("Ошибка", 5000) // duration в мс',
        methods: [
            { name: "success", params: "(content: string, duration?: number)" },
            { name: "warning", params: "(content: string, duration?: number)" },
            { name: "error", params: "(content: string, duration?: number)" },
            { name: "info", params: "(content: string, duration?: number)" },
        ],
        contributors: contributors(),
    },
    toast: {
        key: "toast",
        name: "Toast",
        group: "feedback",
        description:
            "Тосты всплывающего уведомления. Реализованы на vue-sonner — в playground " +
            "экспортируются повторно как toast. Требуют <Toaster> один раз в корне приложения.",
        usage: 'import { toast, Toaster } from "@jeesson/vibe-ui";\n\n<Toaster position="top-right" />\ntoast.success("Успех");',
        contributors: contributors(),
    },

    /* ================================= MISC ================================ */
    autocomplete: {
        key: "autocomplete",
        name: "Autocomplete",
        group: "misc",
        description:
            "Автодополнение: фильтрует подсказки по введённому тексту (до 8 вариантов), " +
            "панель телепортируется и сама подстраивается под место на экране.",
        usage: "<Autocomplete v-model=\"city\" :suggestions=\"['Киев', 'Львов']\" />",
        props: [
            { name: "modelValue", type: "string", required: true },
            {
                name: "suggestions",
                type: "string[]",
                required: true,
                description: "Словарь подсказок.",
            },
            { name: "placeholder", type: "string" },
            { name: "disabled", type: "boolean", default: "false" },
        ],
        events: [
            {
                name: "update:modelValue",
                params: "string",
                description: "Изменение текста.",
            },
            {
                name: "select",
                params: "string",
                description: "Выбор подсказки.",
            },
        ],
        contributors: contributors(),
    },
    inputTag: {
        key: "inputTag",
        name: "InputTag",
        group: "misc",
        description:
            "Тег-инпут: ввод завершается Enter или запятой, Backspace на пустом поле " +
            "удаляет последний тег, есть лимит количества.",
        usage: '<InputTag v-model="tags" :max="5" placeholder="Enter / запятая" />',
        props: [
            {
                name: "modelValue",
                type: "string[]",
                required: true,
                description: "Список тегов.",
            },
            { name: "placeholder", type: "string" },
            { name: "disabled", type: "boolean", default: "false" },
            { name: "max", type: "number", description: "Максимум тегов." },
        ],
        events: [{ name: "update:modelValue", params: "string[]" }],
        contributors: contributors(),
    },
    inputOtp: {
        key: "inputOtp",
        name: "InputOtp",
        group: "misc",
        description:
            "Поле одноразового кода: авто-переход по ячейкам, вставка из буфера, " +
            "в ячейке — одна цифра.",
        usage: '<InputOtp v-model="code" :length="6" @complete="handleComplete" />',
        props: [
            {
                name: "modelValue",
                type: "string",
                required: true,
                description: "Собранный код.",
            },
            {
                name: "length",
                type: "number",
                default: "6",
                description: "Число ячеек.",
            },
        ],
        events: [
            {
                name: "update:modelValue",
                params: "string",
                description: "Изменение кода.",
            },
            {
                name: "complete",
                params: "string",
                description: "Код полностью заполнен.",
            },
        ],
        contributors: contributors(),
    },
    image: {
        key: "image",
        name: "Image",
        group: "misc",
        description:
            "Изображение с ленивой загрузкой (IntersectionObserver) и превью по клику. " +
            "Показывает заглушку/состояние ошибки.",
        usage: '<Image src="https://picsum.photos/320/200" class="h-48 w-64" previewable />',
        props: [
            { name: "src", type: "string", required: true },
            { name: "alt", type: "string" },
            {
                name: "fit",
                type: '"cover" | "contain" | "fill"',
                default: '"cover"',
                description: "object-fit.",
            },
            {
                name: "lazy",
                type: "boolean",
                default: "true",
                description: "Ленивая загрузка.",
            },
            {
                name: "previewable",
                type: "boolean",
                default: "false",
                description: "Открывать полноэкранный превью по клику.",
            },
        ],
        contributors: contributors(),
    },
    scrollbar: {
        key: "scrollbar",
        name: "Scrollbar",
        group: "misc",
        description:
            "Контейнер со стилизованным тонким скроллбаром, ограничением высоты и опциональным скрытием полосы прокрутки.",
        usage: '<Scrollbar max-height="120px" hide><p v-for="item in items" :key="item">{{ item }}</p></Scrollbar>',
        props: [
            {
                name: "maxHeight",
                type: "string",
                default: '"240px"',
                description: "Максимальная высота контейнера.",
            },
            {
                name: "hide",
                type: "boolean",
                default: "false",
                description:
                    "Скрыть визуальную полосу прокрутки, сохранив возможность прокрутки.",
            },
        ],
        slots: [
            {
                name: "default",
                description: "Содержимое, которое может скроллиться.",
            },
        ],
        contributors: contributors(),
    },

    carousel: {
        key: "carousel",
        name: "Carousel",
        group: "misc",
        description:
            "Карусель слайдов (любой контент) со стрелками, точками-индикаторами и " +
            "автопрокруткой.",
        usage: '<Carousel autoplay :interval="3000">\n  <div>Слайд 1</div>\n  <div>Слайд 2</div>\n</Carousel>',
        props: [
            {
                name: "autoplay",
                type: "boolean",
                default: "false",
                description: "Автоматическая смена слайдов.",
            },
            {
                name: "interval",
                type: "number",
                default: "3000",
                description: "Интервал автопрокрутки, мс.",
            },
        ],
        slots: [
            {
                name: "default",
                description: "Слайды (прямые дети, обычно через v-for).",
            },
        ],
        contributors: contributors(),
    },
    mention: {
        key: "mention",
        name: "Mention",
        group: "misc",
        description:
            "Текстовое поле с упоминаниями: ввод @имя открывает список пользователей, " +
            "клик вставляет @имя в текст.",
        usage: "<Mention v-model=\"text\" :users=\"['anna', 'igor']\" />",
        props: [
            {
                name: "modelValue",
                type: "string",
                required: true,
                description: "Текст сообщения.",
            },
            {
                name: "users",
                type: "string[]",
                required: true,
                description: "Список имён для упоминаний.",
            },
            { name: "placeholder", type: "string" },
        ],
        events: [
            {
                name: "update:modelValue",
                params: "string",
                description: "Изменение текста (в т.ч. вставка упоминания).",
            },
        ],
        contributors: contributors(),
    },
    upload: {
        key: "upload",
        name: "Upload",
        group: "misc",
        description:
            "Загрузка файлов: клик или drag&drop. Значение v-model — массив File[]. " +
            "Умеет принимать несколько файлов или один.",
        usage: '<Upload v-model="files" accept=".jpg,.png" />',
        props: [
            {
                name: "modelValue",
                type: "File[]",
                required: true,
                description: "Загруженные файлы.",
            },
            {
                name: "multiple",
                type: "boolean",
                default: "true",
                description: "Разрешить несколько файлов.",
            },
            {
                name: "accept",
                type: "string",
                description: "Атрибут accept (MIME/расширения).",
            },
        ],
        events: [{ name: "update:modelValue", params: "File[]" }],
        contributors: contributors(),
    },
    cascader: {
        key: "cascader",
        name: "Cascader",
        group: "misc",
        description:
            "Каскадный выбор в несколько колонок (дерево). Итоговое значение — массив key'ей " +
            "вдоль выбранного пути.",
        usage: '<Cascader v-model="path" :options="tree" placeholder="Область / город" />',
        props: [
            {
                name: "modelValue",
                type: "string[]",
                required: true,
                description: "Путь значения (массив ключей).",
            },
            {
                name: "options",
                type: "CascaderOption[]",
                required: true,
                description: "Дерево {label, value, children?}.",
            },
            { name: "placeholder", type: "string" },
        ],
        events: [{ name: "update:modelValue", params: "string[]" }],
        contributors: contributors(),
    },

    colorPicker: {
        key: "colorPicker",
        name: "ColorPicker",
        group: "misc",
        description:
            "Палитра цвета: нативный color input + hex-поле + пресеты. Значение — hex-строка.",
        usage: '<ColorPicker v-model="color" />',
        props: [
            {
                name: "modelValue",
                type: "string",
                required: true,
                description: "Цвет (hex).",
            },
        ],
        events: [{ name: "update:modelValue", params: "string" }],
        contributors: contributors(),
    },
    datePicker: {
        key: "datePicker",
        name: "DatePicker",
        group: "misc",
        description:
            "Выбор даты из календаря во всплывающем окне. Возвращает ISO-строку " +
            "(YYYY-MM-DD). Панель сама разворачивается вверх при нехватке места.",
        usage: '<DatePicker v-model="date" placeholder="Выберите дату" />',
        props: [
            {
                name: "modelValue",
                type: "string | null",
                required: true,
                description: "ISO-дата.",
            },
            { name: "placeholder", type: "string" },
        ],
        events: [{ name: "update:modelValue", params: "string" }],
        contributors: contributors(),
    },
    calendar: {
        key: "calendar",
        name: "Calendar",
        group: "misc",
        description:
            "Полноценный календарь месяца (не попап). Активная дата через v-model, " +
            "ячейки кастомизируются слотом #cell.",
        usage: '<Calendar v-model="date"><template #cell="{ cell }">{{ cell.date.getDate() }}</template></Calendar>',
        props: [
            {
                name: "modelValue",
                type: "Date",
                default: "new Date()",
                description: "Выбранная дата.",
            },
        ],
        slots: [
            {
                name: "cell",
                params: "{ cell }",
                description: "Кастомное содержимое ячейки.",
            },
        ],
        contributors: contributors(),
    },
    timeSelect: {
        key: "timeSelect",
        name: "TimeSelect",
        group: "misc",
        description:
            "Выбор времени из сетки слотов (start/end/step). Значение — строка «HH:MM».",
        usage: '<TimeSelect v-model="time" start="09:00" end="18:00" :step="30" />',
        props: [
            {
                name: "modelValue",
                type: "string | null",
                required: true,
                description: "«HH:MM».",
            },
            { name: "start", type: "string", default: '"09:00"' },
            { name: "end", type: "string", default: '"18:00"' },
            {
                name: "step",
                type: "number",
                default: "30",
                description: "Шаг в минутах.",
            },
            { name: "placeholder", type: "string" },
        ],
        events: [{ name: "update:modelValue", params: "string" }],
        contributors: contributors(),
    },
    affix: {
        key: "affix",
        name: "Affix",
        group: "misc",
        description:
            "«Прилипающий» блок: приклеивается к верху при скролле и «отлипает», " +
            "когда заканчивается родительский блок.",
        usage: '<Affix :offset="56" position="top"><Tag>Панель</Tag></Affix>',
        props: [
            {
                name: "offset",
                type: "number",
                default: "0",
                description: "Отступ от верха окна, px.",
            },
            {
                name: "position",
                type: '"top" | "bottom"',
                default: '"top"',
                description: "К какой стороне окна прилипает блок.",
            },
            {
                name: "target",
                type: "string",
                description: "CSS-селектор прокручиваемого контейнера.",
            },
            {
                name: "zIndex",
                type: "number",
                default: "1000",
                description: "Слой фиксированного блока.",
            },
        ],
        events: [
            {
                name: "change",
                params: "(fixed: boolean) => void",
                description: "Срабатывает при изменении состояния прилипания.",
            },
            {
                name: "scroll",
                params: "(value: { scrollTop: number; fixed: boolean }) => void",
                description:
                    "Срабатывает при прокрутке окна или target-контейнера.",
            },
        ],
        slots: [
            { name: "default", description: "Содержимое прилипающего блока." },
        ],
        contributors: contributors(),
    },
};

/** Порядок групп для сайдбара/оглавления. */
export const groupOrder: DocGroup[] = [
    "basic",
    "form",
    "data",
    "navigation",
    "feedback",
    "misc",
];

export const groupLabels: Record<DocGroup, string> = {
    basic: "Базовые",
    form: "Форма",
    data: "Данные",
    navigation: "Навигация",
    feedback: "Feedback",
    misc: "Разное",
};

export const componentDescriptionsEn: Record<string, string> = {
    button: "A button with variants, sizes, disabled state, and icon support.",
    avatar: "A user avatar rendered from an image or initials.",
    badge: "A compact counter or status dot displayed over content.",
    tag: "A colored label that can optionally be closed.",
    tooltip: "A contextual hint displayed around a target element.",
    divider: "A horizontal or vertical separator with optional centered text.",
    progress: "A linear, circular, or dashboard progress indicator.",
    input: "A text input with labels, validation errors, and disabled state.",
    select: "A custom dropdown select with clearable and disabled options.",
    checkbox: "A standalone checkbox with controlled and disabled states.",
    checkboxGroup: "A group of checkboxes bound to multiple selected values.",
    radio: "A standalone radio control for selecting one value.",
    radioGroup: "A group of radio controls for a single selected value.",
    switch: "A compact boolean toggle control.",
    slider: "A numeric slider with range, step, and disabled support.",
    inputNumber: "A numeric input with bounds and step controls.",
    rate: "A star rating control with custom count and disabled state.",
    form: "A form container with model-based validation and reset methods.",
    formItem: "A labeled form field wrapper that displays validation errors.",
    card: "A content card with configurable surface and header/footer slots.",
    skeleton: "A loading placeholder that can show rows and an avatar.",
    collapse: "An expandable panel group with animated sections.",
    collapseItem: "A single expandable section used inside Collapse.",
    table: "A data table with columns, sorting, and cell slots.",
    timeline: "A chronological list with statuses and custom markers.",
    pagination: "A pagination control for navigating through pages of data.",
    empty: "An empty-state illustration with description and content slot.",
    menu: "A navigational menu with nested items and active state.",
    popover: "A floating content panel opened by a custom trigger.",
    dropdown: "A positioned action menu with placement and disabled items.",
    anchor: "A list of links for navigating to sections on the page.",
    tabs: "A tabbed interface with active and disabled tabs.",
    backtop:
        "A floating control that appears after scrolling and returns to top.",
    alert: "A contextual message with status, title, and close action.",
    dialog: "A modal dialog with title, content, and footer slots.",
    drawer: "A slide-out panel with configurable placement and size.",
    loading: "A loading overlay for indicating work in progress.",
    messageBox: "A confirmation dialog for important user decisions.",
    message: "Short-lived notification messages for status feedback.",
    toast: "Toast notifications with success, error, and warning variants.",
    autocomplete: "A text field with filtered suggestions.",
    inputTag: "An input for editing a list of tags.",
    inputOtp: "A segmented one-time-password input.",
    image: "An image component with optional preview overlay.",
    scrollbar: "A scrollable container with a customizable local scrollbar.",
    carousel: "A slide carousel with autoplay and custom content.",
    mention: "A text input with user mention suggestions.",
    upload: "A file upload control bound to a list of files.",
    cascader: "A hierarchical selector for choosing a nested path.",
    colorPicker: "A color picker bound to a color value.",
    datePicker: "A date input with a calendar dropdown.",
    calendar: "A calendar view for browsing and selecting dates.",
    timeSelect: "A time selector with configurable range and step.",
    affix: "A block that sticks to the viewport while its container is visible.",
};

export const apiDescriptionsEn: Record<string, Record<string, string>> = {
    button: {
        variant: "Button visual style.",
        size: "Button size.",
        disabled: "Disables the button.",
        icon: "Left-side SVG icon from Heroicons or Lucide.",
        iconRight: "Right-side SVG icon.",
        click: "Emitted when the button is clicked.",
        default: "Button label or content.",
    },
    avatar: {
        src: "Image URL; takes precedence over initials.",
        initials: "Initials shown when no image is provided.",
        size: "Avatar size.",
        shape: "Avatar shape.",
    },
    badge: {
        value: "Badge number or text.",
        max: "Threshold at which the value is displayed as N+.",
        dot: "Display a dot without a value.",
        type: "Badge color.",
        hidden: "Hide the badge completely.",
        default: "Content displayed under the badge.",
    },
    tag: {
        type: "Tag color.",
        closable: "Show a close action.",
        close: "Emitted when the close action is clicked.",
        default: "Tag text.",
    },
    tooltip: {
        content: "Tooltip text.",
        placement: "Tooltip placement.",
        default: "Element that triggers the tooltip.",
    },
    divider: {
        direction: "Divider direction.",
        default: "Optional label centered on the divider.",
    },
    progress: {
        percentage: "Value from 0 to 100, clamped automatically.",
        type: "Progress presentation type.",
        status: "Status color.",
        indeterminate: "Show an indeterminate animation.",
        animation:
            "Indeterminate animation variant (line only): slide — moving segment, stripes — moving diagonal stripes, pulse — pulsing bar.",
        color: "Custom color that overrides status.",
        strokeWidth: "Line or arc thickness.",
        showText: "Show the percentage label.",
        size: "Circle diameter in pixels.",
    },
    input: {
        modelValue: "Input value.",
        label: "Label displayed above the field.",
        error: "Error text that highlights the field in red.",
        disabled: "Disables the input.",
        default: "Optional input content.",
    },
    select: {
        modelValue: "Selected value.",
        options: "Available options, including optional disabled entries.",
        placeholder: "Text shown when no option is selected.",
        disabled: "Disables the select.",
        clearable: "Show a button for clearing the selected value.",
        change: "Emitted when the selected value changes.",
    },
    checkbox: {
        modelValue: "Checked state in standalone mode.",
        value: "Value used inside CheckboxGroup.",
        disabled: "Disables the checkbox.",
        default: "Checkbox label.",
    },
    affix: {
        offset: "Distance from the viewport edge in pixels.",
        position: "Viewport edge where the block sticks.",
        target: "CSS selector of the scrollable container.",
        zIndex: "Stacking order of the fixed block.",
        change: "Emitted when the fixed state changes.",
        scroll: "Emitted while the window or target container scrolls.",
        default: "Content inside the affixed block.",
    },
    checkboxGroup: {
        modelValue: "Array of selected values.",
        disabled: "Disables the entire group.",
        default: "Checkbox instances in the group.",
    },
    radio: {
        modelValue: "Selected state in standalone mode.",
        value: "Value used inside RadioGroup.",
        disabled: "Disables the radio control.",
        default: "Radio label.",
    },
    radioGroup: {
        modelValue: "Selected value.",
        disabled: "Disables the entire group.",
        default: "Radio instances in the group.",
    },
    switch: {
        modelValue: "Boolean switch state.",
        disabled: "Disables the switch.",
    },
    slider: {
        modelValue: "Current numeric value.",
        min: "Minimum value.",
        max: "Maximum value.",
        step: "Step between values.",
        disabled: "Disables the slider.",
    },
    inputNumber: {
        modelValue: "Current numeric value.",
        min: "Minimum allowed value.",
        max: "Maximum allowed value.",
        step: "Increment between values.",
        disabled: "Disables the input.",
    },
    rate: {
        modelValue: "Current rating value.",
        count: "Number of rating items.",
        disabled: "Disables rating interaction.",
    },
    form: {
        model: "Object containing field values.",
        rules: "Validation rules keyed by field name.",
        labelWidth: "Width of field labels.",
        validate: "Validates the form and returns whether it is valid.",
        resetFields: "Resets field values and errors.",
        default: "Form items and fields.",
    },
    formItem: {
        prop: "Field name used for validation.",
        label: "Field label.",
        error: "Explicit validation error text.",
        default: "Form control content.",
    },
    card: {
        title: "Card title.",
        type: "Card surface style.",
        default: "Card content.",
        header: "Custom card header.",
        footer: "Custom card footer.",
    },
    table: {
        columns: "Column definitions.",
        data: "Rows displayed in the table.",
        rowKey: "Unique row key field.",
        default: "Table content and cell slots.",
    },
    pagination: {
        modelValue: "Current page number.",
        total: "Total number of records.",
        pageSize: "Number of records per page.",
        siblingCount: "Number of neighboring page buttons.",
    },
    empty: {
        description: "Empty-state description.",
        image: "Optional empty-state image.",
        default: "Optional empty-state actions.",
    },
    collapse: {
        modelValue: "Names of expanded sections.",
        accordion: "Allow only one section to stay open.",
        default: "Collapse items.",
    },
    collapseItem: {
        name: "Unique section name.",
        title: "Section title.",
        disabled: "Disables the section.",
        default: "Section content.",
    },
    timeline: {
        items: "Timeline item definitions.",
        reverse: "Display items in reverse order.",
        default: "Timeline content.",
        dot: "Custom timeline marker.",
    },
    menu: {
        items: "Nested menu item definitions.",
        modelValue: "Active menu item key.",
        default: "Menu content.",
    },
    popover: {
        title: "Popover title.",
        placement: "Popover placement.",
        default: "Popover content.",
        trigger: "Element that opens the popover.",
    },
    dropdown: {
        items: "Available action items.",
        placement: "Dropdown placement.",
        select: "Emitted when an action is selected.",
        default: "Dropdown trigger.",
    },
    anchor: {
        links: "Links to page sections.",
        container: "Scrollable container.",
        offset: "Scroll offset from the top edge.",
        bound: "Pixel threshold used to activate an anchor.",
        duration: "Scroll animation duration in milliseconds.",
        marker: "Show the active anchor marker.",
        type: "Marker style.",
        direction: "Anchor list direction.",
        selectScrollTop:
            "Scroll the selected anchor to the top of the container.",
    },
    tabs: {
        modelValue: "Active tab name.",
        items: "Tab definitions.",
        default: "Tab panels.",
    },
    backtop: {
        visibilityHeight: "Scroll distance before showing the control.",
        right: "Right offset in pixels.",
        bottom: "Bottom offset in pixels.",
    },
    alert: {
        type: "Alert status and color.",
        title: "Alert title.",
        closable: "Show a close action.",
        close: "Emitted when the alert is closed.",
        default: "Alert message.",
    },
    dialog: {
        modelValue: "Whether the dialog is open.",
        title: "Dialog title.",
        width: "Dialog width.",
        close: "Emitted when the dialog closes.",
        default: "Dialog content.",
        footer: "Dialog footer actions.",
    },
    drawer: {
        modelValue: "Whether the drawer is open.",
        title: "Drawer title.",
        placement: "Drawer placement.",
        size: "Drawer size.",
        close: "Emitted when the drawer closes.",
        default: "Drawer content.",
        footer: "Drawer footer actions.",
    },
    loading: {
        loading: "Whether the loading overlay is visible.",
        text: "Loading message.",
        default: "Content covered by the overlay.",
    },
    autocomplete: {
        modelValue: "Current input value.",
        suggestions: "Suggestions shown while typing.",
        placeholder: "Input placeholder.",
    },
    inputTag: {
        modelValue: "Current tag list.",
        max: "Maximum number of tags.",
        placeholder: "Input placeholder.",
    },
    inputOtp: {
        modelValue: "Current one-time-password value.",
        length: "Number of OTP fields.",
        complete: "Emitted when all fields are filled.",
    },
    image: {
        src: "Image URL.",
        previewable: "Enable full-size image preview.",
        alt: "Alternative text.",
    },
    scrollbar: {
        maxHeight: "Maximum scroll area height.",
        hide: "Hide the custom scrollbar chrome.",
        default: "Scrollable content.",
    },
    upload: {
        modelValue: "Current file list.",
        multiple: "Allow multiple files.",
        accept: "Accepted file types.",
        default: "Upload content.",
    },
    datePicker: {
        modelValue: "Selected date value.",
        placeholder: "Date input placeholder.",
        disabled: "Disables date selection.",
    },
    calendar: {
        modelValue: "Selected date.",
        disabledDate: "Function that marks dates as unavailable.",
    },
    timeSelect: {
        modelValue: "Selected time value.",
        start: "Start of the available time range.",
        end: "End of the available time range.",
        step: "Time interval in minutes.",
    },
    colorPicker: {
        modelValue: "Selected color value.",
        disabled: "Disables color selection.",
    },
    cascader: {
        modelValue: "Selected hierarchical path.",
        options: "Nested cascader options.",
        placeholder: "Cascader placeholder.",
    },
    messageBox: {
        title: "Dialog title.",
        message: "Message shown to the user.",
        type: "Message status and color.",
        confirmText: "Confirmation button label.",
        cancelText: "Cancellation button label.",
        confirm: "Emitted when the user confirms.",
        cancel: "Emitted when the user cancels.",
    },
    message: {
        type: "Message status.",
        duration: "Time in milliseconds before dismissal.",
        close: "Emitted when the message is closed.",
    },
    toast: {
        position: "Toast placement.",
        duration: "Time in milliseconds before dismissal.",
        close: "Emitted when the toast is closed.",
    },
    carousel: {
        autoplay: "Advance slides automatically.",
        interval: "Autoplay interval in milliseconds.",
        default: "Carousel slides.",
    },
    mention: {
        modelValue: "Current text value.",
        users: "Users available for mentions.",
        trigger: "Character that opens the mention list.",
        default: "Input content.",
    },
};

export function getDocs(): ComponentDoc[] {
    return Object.values(components);
}
