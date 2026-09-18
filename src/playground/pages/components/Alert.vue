<script setup lang="ts">
import ComponentDoc from "../../docs/ComponentDoc.vue";
import DocExample from "../../docs/DocExample.vue";
import { components as docs } from "../../docs/component-docs";
import Alert from "../../../components/Alert/Alert.vue";
const doc = docs.alert;
const successSource = '<Alert type="success" title="Готово">Данные сохранены.</Alert>';
const infoSource = '<Alert type="info" title="Обновление">Доступна новая версия.</Alert>';
const warningSource = '<Alert type="warning">Осторожно, действие необратимо.</Alert>';
const dangerSource = '<Alert type="danger" closable>Ошибка сохранения.</Alert>';
</script>

<template>
    <ComponentDoc :doc="doc" structured-examples>
        <template #examples>
            <div class="flex max-w-sm flex-col gap-2">
                <DocExample title="Успешное уведомление" :source="successSource">
                    <Alert type="success" title="Готово">Данные сохранены.</Alert>
                </DocExample>
                <DocExample title="Информационное уведомление" :source="infoSource">
                    <Alert type="info" title="Обновление">Доступна новая версия.</Alert>
                </DocExample>
                <DocExample title="Предупреждение" :source="warningSource">
                    <Alert type="warning">Осторожно, действие необратимо.</Alert>
                </DocExample>
                <DocExample title="Закрываемая ошибка" :source="dangerSource">
                    <Alert type="danger" closable>Ошибка сохранения.</Alert>
                </DocExample>
            </div>
        </template>
    </ComponentDoc>
</template>
