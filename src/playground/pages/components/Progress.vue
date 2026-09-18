<script setup lang="ts">
import ComponentDoc from "../../docs/ComponentDoc.vue";
import DocExample from "../../docs/DocExample.vue";
import { components as docs } from "../../docs/component-docs";
import Progress from "../../../components/Progress/Progress.vue";
const doc = docs.progress;
const basicSource = '<Progress :percentage="72" />';
const successSource = '<Progress :percentage="100" status="success" />';
const warningSource = '<Progress :percentage="55" status="warning" />';
const exceptionSource = '<Progress :percentage="35" status="exception" />';
const indeterminateSource = "<Progress indeterminate />";
const stripesSource = '<Progress indeterminate animation="stripes" />';
const pulseSource = '<Progress indeterminate animation="pulse" />';
const circleSource = '<Progress :percentage="45" type="circle" :size="64" />';
const dashboardSource = '<Progress :percentage="75" type="dashboard" :size="64" status="success" />';
</script>

<template>
    <ComponentDoc :doc="doc" structured-examples>
        <template #examples>
            <div class="flex max-w-md flex-col gap-3">
                <DocExample title="Обычный прогресс" :source="basicSource">
                    <Progress :percentage="72" />
                </DocExample>
                <DocExample title="Успешное состояние" :source="successSource">
                    <Progress :percentage="100" status="success" />
                </DocExample>
                <DocExample title="Предупреждение" :source="warningSource">
                    <Progress :percentage="55" status="warning" />
                </DocExample>
                <DocExample title="Ошибка" :source="exceptionSource">
                    <Progress :percentage="35" status="exception" />
                </DocExample>
                <DocExample title="Неопределенный прогресс" :source="indeterminateSource">
                    <Progress indeterminate />
                </DocExample>
                <DocExample title="Неопределенный прогресс — полоски" :source="stripesSource">
                    <Progress indeterminate animation="stripes" />
                </DocExample>
                <DocExample title="Неопределенный прогресс — пульс" :source="pulseSource">
                    <Progress indeterminate animation="pulse" />
                </DocExample>
                <div class="flex flex-col gap-3">
                    <DocExample title="Круговой прогресс" :source="circleSource">
                        <Progress :percentage="45" type="circle" :size="64" />
                    </DocExample>
                    <DocExample title="Dashboard" :source="dashboardSource">
                        <Progress :percentage="75" type="dashboard" :size="64" status="success" />
                    </DocExample>
                </div>
            </div>
        </template>
    </ComponentDoc>
</template>
