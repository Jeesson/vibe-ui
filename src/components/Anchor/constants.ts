import type { InjectionKey, Ref } from "vue";

export interface AnchorLinkState {
    href: string;
    el: HTMLElement;
}

export interface AnchorContext {
    direction: Ref<"vertical" | "horizontal">;
    currentAnchor: Ref<string>;
    addLink: (state: AnchorLinkState) => void;
    removeLink: (href: string) => void;
    handleClick: (e: MouseEvent, href?: string) => void;
}

export const anchorKey: InjectionKey<AnchorContext> = Symbol("anchor");
