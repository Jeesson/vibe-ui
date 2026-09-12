import type { InjectionKey } from "vue";

export interface CheckboxGroupContext {
    isChecked: (value: string | number) => boolean;
    toggle: (value: string | number) => void;
}

export const CheckboxGroupKey: InjectionKey<CheckboxGroupContext> = Symbol(
    "complex-ui-checkbox-group",
);
