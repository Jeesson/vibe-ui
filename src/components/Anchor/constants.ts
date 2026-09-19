import type { InjectionKey, Ref } from "vue";

export interface AnchorLinkState {
    href: string;
    el: HTMLElement;
}

export interface AnchorContext {
    direction: Ref<"vertical" | "horizontal">;
    /** All currently active hrefs (several can be active in visibleRatio mode). */
    activeHrefs: Ref<Set<string>>;
    /** Current marker type, so AnchorLink can draw the "fill" pill itself. */
    markerType: Ref<"default" | "fill" | "dot">;
    addLink: (state: AnchorLinkState) => void;
    removeLink: (href: string) => void;
    handleClick: (e: MouseEvent, href?: string) => void;
}

export const anchorKey: InjectionKey<AnchorContext> = Symbol("anchor");
