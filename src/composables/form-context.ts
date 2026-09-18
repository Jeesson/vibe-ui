import type { InjectionKey, Ref } from "vue";

export interface FormRule {
    required?: boolean;
    message?: string;
    pattern?: RegExp;
    min?: number;
    max?: number;
    validator?: (value: unknown) => string | true;
}

export interface FormItemContext {
    prop: string;
    validate: () => string | true;
}

export interface FormContext {
    model: Record<string, unknown>;
    rules: Record<string, FormRule[]>;
    labelWidth?: string;
    errors: Ref<Record<string, string | null>>;
    registerItem: (item: FormItemContext) => void;
    unregisterItem: (prop: string) => void;
}

export const FormContextKey: InjectionKey<FormContext> = Symbol("vibe-ui-form");

export function runRules(value: unknown, rules: FormRule[] = []): string | true {
    for (const rule of rules) {
        if (rule.required && (value === "" || value === null || value === undefined)) {
            return rule.message ?? "Обязательное поле";
        }
        if (rule.pattern && typeof value === "string" && !rule.pattern.test(value)) {
            return rule.message ?? "Неверный формат";
        }
        if (rule.min !== undefined && typeof value === "string" && value.length < rule.min) {
            return rule.message ?? `Минимум ${rule.min} символов`;
        }
        if (rule.max !== undefined && typeof value === "string" && value.length > rule.max) {
            return rule.message ?? `Максимум ${rule.max} символов`;
        }
        if (rule.validator) {
            const result = rule.validator(value);
            if (result !== true) return result;
        }
    }
    return true;
}
