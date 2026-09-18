import { createApp } from "vue";
import { pushMessage } from "./store";
import MessageContainer from "./MessageContainer.vue";

let mounted = false;

function ensureMounted() {
    if (mounted) return;
    const el = document.createElement("div");
    document.body.appendChild(el);
    createApp(MessageContainer).mount(el);
    mounted = true;
}

function show(type: "success" | "warning" | "error" | "info", content: string, duration?: number) {
    ensureMounted();
    return pushMessage(type, content, duration);
}

export const message = {
    success: (content: string, duration?: number) => show("success", content, duration),
    warning: (content: string, duration?: number) => show("warning", content, duration),
    error: (content: string, duration?: number) => show("error", content, duration),
    info: (content: string, duration?: number) => show("info", content, duration),
};
