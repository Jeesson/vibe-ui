<script setup lang="ts">
import { computed } from "vue";
import type { ComponentDoc } from "./component-docs";
import { componentDescriptionsEn } from "./component-docs";
import { useLocale } from "../composables/ui-locale";
import { buildSourceExamples } from "./build-example-script";
import ApiTable from "./ApiTable.vue";
import ContributorsList from "./ContributorsList.vue";

const props = defineProps<{
    doc: ComponentDoc;
    structuredExamples?: boolean;
}>();
const { locale, t } = useLocale();

const localizedDescription = computed(() =>
    locale.value === "en" ? (componentDescriptionsEn[props.doc.key] ?? props.doc.description) : props.doc.description,
);

const sourceExamples = computed(() => buildSourceExamples(props.doc));

const hasApi = computed(() => !!props.doc.props || !!props.doc.events || !!props.doc.methods || !!props.doc.slots);
</script>

<template>
    <div class="flex flex-col gap-6">
        <!-- Header: name + tag + description -->
        <div>
            <div class="flex items-center gap-2">
                <h2 class="text-lg font-semibold text-gray-900">{{ doc.name }}</h2>
                <span v-if="doc.tag" class="bg-primary-50 text-primary-700 rounded px-1.5 py-0.5 font-mono text-[11px]"
                    >&lt;{{ doc.tag }}&gt;</span
                >
            </div>
            <p class="mt-1 text-sm text-gray-500">{{ localizedDescription }}</p>
        </div>

        <!-- Examples (live demo code from the component page) -->
        <section id="component-examples" class="scroll-mt-20 rounded-lg border border-gray-100 bg-white p-5">
            <div class="mb-2 flex items-center justify-between gap-3">
                <h3 class="text-xs font-semibold tracking-wide text-gray-400 uppercase">{{ t("docs.livePreview") }}</h3>
                <span class="text-[11px] text-gray-400">{{ t("docs.component") }}</span>
            </div>
            <div v-if="structuredExamples" class="mt-3">
                <slot name="examples" />
            </div>
            <div v-else>
                <h4 class="mb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-800">
                    {{ t("docs.mainExample") }}
                </h4>
                <section class="overflow-hidden rounded-md border border-gray-200 dark:border-gray-300">
                    <div class="bg-white px-4 py-4 dark:bg-gray-50">
                        <slot name="examples" />
                    </div>
                    <details class="border-t border-gray-200 bg-gray-50 dark:border-gray-300 dark:bg-gray-100">
                        <summary
                            class="cursor-pointer px-4 py-2 text-[11px] font-semibold tracking-wide text-gray-500 uppercase transition-colors hover:bg-gray-100 dark:text-gray-700 dark:hover:bg-gray-200">
                            {{ t("docs.showCode") }}
                        </summary>
                        <pre
                            class="overflow-x-auto border-t border-gray-200 px-4 py-4 text-xs leading-6 text-gray-700 dark:border-gray-300 dark:text-gray-800"><code>{{ sourceExamples.map((example) => example.source).join("\n\n") }}</code></pre>
                    </details>
                </section>
            </div>
        </section>

        <!-- API: Props / Events / Methods / Slots — shared table component per group -->
        <div v-if="hasApi">
            <section id="component-api" class="api-docs overflow-hidden rounded-lg border border-gray-100 bg-white">
                <div class="border-b border-gray-100 px-5 py-4">
                    <div class="flex items-center justify-between gap-3">
                        <div>
                            <h3 class="text-sm font-semibold text-gray-900">{{ t("docs.api") }}</h3>
                            <p class="mt-0.5 text-xs text-gray-500">{{ t("docs.apiDescription") }}</p>
                        </div>
                        <span
                            class="border-primary-100 bg-primary-50 text-primary-700 rounded-full border px-2 py-1 text-[10px] font-semibold tracking-wide uppercase"
                            >API</span
                        >
                    </div>
                </div>
                <div class="space-y-6 p-5">
                    <template v-if="doc.props?.length">
                        <h4 class="mb-2 text-sm font-medium text-gray-700">{{ t("docs.props") }}</h4>
                        <ApiTable variant="props" :rows="doc.props" :doc-key="doc.key" />
                    </template>
                    <template v-if="doc.events?.length">
                        <h4 class="mt-5 mb-2 text-sm font-medium text-gray-700">{{ t("docs.events") }}</h4>
                        <ApiTable variant="events" :rows="doc.events" :doc-key="doc.key" />
                    </template>
                    <template v-if="doc.methods?.length">
                        <h4 class="mt-5 mb-2 text-sm font-medium text-gray-700">{{ t("docs.methods") }}</h4>
                        <ApiTable variant="methods" :rows="doc.methods" :doc-key="doc.key" />
                    </template>
                    <template v-if="doc.slots?.length">
                        <h4 class="mt-5 mb-2 text-sm font-medium text-gray-700">{{ t("docs.slots") }}</h4>
                        <ApiTable variant="slots" :rows="doc.slots" :doc-key="doc.key" />
                    </template>
                </div>
            </section>

            <ContributorsList :contributors="doc.contributors" />
        </div>
    </div>
</template>

<style scoped>
.api-docs > div:last-child {
    overflow-x: auto;
}

.api-docs h4 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 0 0.5rem;
    color: var(--color-gray-700);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}
</style>
