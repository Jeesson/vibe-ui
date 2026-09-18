import type { InjectionKey } from "vue";

export interface CollapseContext {
    isActive: (name: string) => boolean;
    toggle: (name: string) => void;
}

export const CollapseKey: InjectionKey<CollapseContext> = Symbol("vibe-ui-collapse");
