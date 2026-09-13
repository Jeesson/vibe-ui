import type { InjectionKey } from "vue";

export interface TabsContext {
    isActive: (name: string) => boolean;
}

export const TabsKey: InjectionKey<TabsContext> = Symbol("vibe-ui-tabs");
