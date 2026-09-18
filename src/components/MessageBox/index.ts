import { createApp, h } from "vue";
import MessageBoxDialog from "./MessageBoxDialog.vue";

export interface ConfirmOptions {
    title?: string;
    confirmText?: string;
    cancelText?: string;
    type?: "default" | "danger";
}

export function confirm(message: string, options: ConfirmOptions = {}): Promise<void> {
    return new Promise((resolve, reject) => {
        const el = document.createElement("div");
        document.body.appendChild(el);

        function destroy() {
            app.unmount();
            el.remove();
        }

        const app = createApp({
            render() {
                return h(MessageBoxDialog, {
                    title: options.title ?? "Подтвердите действие",
                    message,
                    confirmText: options.confirmText ?? "Ок",
                    cancelText: options.cancelText ?? "Отмена",
                    type: options.type ?? "default",
                    onConfirm: () => {
                        destroy();
                        resolve();
                    },
                    onCancel: () => {
                        destroy();
                        reject(new Error("cancel"));
                    },
                });
            },
        });

        app.mount(el);
    });
}

export const messageBox = { confirm };
