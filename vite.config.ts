import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

// В dev-режиме (vite) — обычное приложение с превью компонентов.
// В build-режиме (vite build) — собирается как библиотека.
export default defineConfig(({ command }) => ({
    plugins: [
        vue(),
        tailwindcss(),
        command === "build" &&
            dts({ include: ["src"], exclude: ["src/playground"] }),
    ].filter(Boolean),
    build: {
        lib: {
            entry: resolve(import.meta.dirname, "src/index.ts"),
            name: "ComplexUI",
            fileName: (format) => `complex-ui.${format}.js`,
            formats: ["es", "cjs"],
        },
        rollupOptions: {
            external: ["vue"],
            output: { globals: { vue: "Vue" } },
        },
        cssCodeSplit: false,
    },
}));
