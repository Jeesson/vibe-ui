import type { InjectionKey } from "vue";

export interface RadioGroupContext {
    isSelected: (value: string | number) => boolean;
    select: (value: string | number) => void;
}

export const RadioGroupKey: InjectionKey<RadioGroupContext> = Symbol(
    "vibe-ui-radio-group",
);
