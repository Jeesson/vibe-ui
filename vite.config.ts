import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// В dev-режиме (vite) — обычное приложение с превью компонентов.
// В build-режиме (vite build) — собирается как библиотека.
// Декларации (.d.ts) генерирует vue-tsc (см. tsconfig.build.json и скрипт build),
// поэтому vite build пишет только JS/CSS и НЕ очищает dist (emptyOutDir: false).
export default defineConfig(() => ({
    plugins: [vue(), tailwindcss()],
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
        emptyOutDir: false,
    },
}));
