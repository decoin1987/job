<script setup lang="ts">
import {useFetch} from "nuxt/app";
import type {CVType} from '../types/types'
import {statuses} from '../types/enums' // незнаю зачем enums просто решил статусы через enum сделать

const config = useRuntimeConfig();
const apiBase = config.public.apiBase;
const publicBase = config.public.publicBase;

const {
  data,
  status,
  refresh,
  error
} = useFetch<CVType>(`${apiBase}/test/v2/app`)

const activeStep = (): number => {
  return Object.keys(statuses).indexOf(data.value.status)
} // глупая функция что бы быстренько привязать страничку к апи

</script>
<template>
  <UContainer v-if="status === 'success'" class="py-16">
    <UCard>
      <template #header>
        <CVToolbar/>
      </template>

      <CVMainInformation :data="data" :statuses="statuses"/>

      <CVTask/>

      <CVStatuses :items="statuses" :active="activeStep()"/>

      <div>
        <p class="text-lg">PIKABU отклик</p>
        <p>Отклик с портала picabu</p>
      </div>

      <USeparator class="text-gray-200 my-5"/>

      <div class="section">
        <p v-for="item in data.description.split('\r\n')">{{ item }}</p>
      </div>

      <template #footer>
        <div class="flex gap-2 rounded-b-lg -my-4 -mx-6 p-5 bg-gray-100">
          <UIcon name="i-solar-info-circle-broken" class="text-5xl"></UIcon>
          <div class="">
            <p>Файлы портфолио</p>
            <p>Резюме:</p>
          </div>
        </div>
      </template>
    </UCard>
  </UContainer>

  <UContainer v-if="status === 'pending'" class="mt-20 items-center flex">
    <UProgress animation="swing"/>
  </UContainer>

  <UContainer v-if="error">
    <p class="text-red-500 mb-5">Ошибка: {{ error }}</p>
    <UButton type="button" @click="refresh">Попробуйте перезагрузить страницу</UButton>
  </UContainer>

</template>
<style>
@media print {
  .cv-card-header {
    display: none;
  }
}
</style>