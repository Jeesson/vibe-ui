import { reactive } from "vue";

export interface MessageItem {
    id: number;
    type: "success" | "warning" | "error" | "info";
    content: string;
}

export const messages = reactive<MessageItem[]>([]);

let uid = 0;

export function pushMessage(
    type: MessageItem["type"],
    content: string,
    duration = 3000,
) {
    const id = ++uid;
    messages.push({ id, type, content });
    if (duration > 0) {
        setTimeout(() => removeMessage(id), duration);
    }
    return id;
}

export function removeMessage(id: number) {
    const index = messages.findIndex((m) => m.id === id);
    if (index !== -1) messages.splice(index, 1);
}
