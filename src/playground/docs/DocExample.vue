<script setup lang="ts">
withDefaults(
    defineProps<{
        title: string;
        source: string;
    }>(),
    { title: "Вариант" },
);
</script>

<template>
    <div>
        <h4 class="mb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-800">
            {{ title }}
        </h4>
        <section class="overflow-hidden rounded-md border border-gray-200 dark:border-gray-300">
            <div class="bg-white px-4 py-4 dark:bg-gray-50">
                <slot />
            </div>
            <details class="border-t border-gray-200 bg-gray-50 dark:border-gray-300 dark:bg-gray-100">
                <summary class="cursor-pointer px-4 py-2 text-[11px] font-semibold tracking-wide text-gray-500 uppercase transition-colors hover:bg-gray-100 dark:text-gray-700 dark:hover:bg-gray-200">
                    Показать код
                </summary>
                <pre class="overflow-x-auto border-t border-gray-200 px-4 py-4 text-xs leading-6 text-gray-700 dark:border-gray-300 dark:text-gray-800"><code>{{ source }}</code></pre>
            </details>
        </section>
    </div>
</template>