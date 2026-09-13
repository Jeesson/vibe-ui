import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
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
});
