<script lang="ts" setup>
const config = useRuntimeConfig();
const publicBase = config.public.publicBase;

import type {CVType} from '../types/types'

defineProps<{
  data: CVType,
  statuses: Record<string, string>,
}>()

</script>

<template>
  <div class="cv-main-info">
    <div class="flex gap-5">
      <div class="image-wrapper">
        <img class="aspect-square" :src="`${publicBase}/${data.photo}`" alt="">
      </div>

      <div class="main-info">
        <UButton variant="link"
                 class="mb-3 text-lg"
                 size="2xl"
                 color="neutral"
                 trailing-icon="i-heroicons-outline-external-link"
                 :to="`resume/${data.id}`"
        >
          {{ data.name }}
        </UButton>

        <p class="mb-0">
          Кандидат на вакансию:
          <UButton variant="link" trailing-icon="i-heroicons-outline-external-link" :to="`vacancy/${data.listing_id}`">
            Жадный
            благотворитель
          </UButton>
          <UButton variant="link" :to="`vacancy/${data.listing_id}`">(14.08.2024 Отклик)</UButton>
        </p>

        <p class="mb-1">{{ statuses[data.status] }}</p>

        <p class="mb-1">{{ data?.age ? `Возраст: ${data.age} лет` : `Возраст не указан` }}</p>

        <p class="mb-1">
          <UButton variant="link"
                   icon="i-heroicons-outline-phone"
                   class="pl-0 pr-2"
                   :to="`tel:+${data.phone}`"
          >
            {{ data.phone }}
          </UButton>
          <UButton variant="link"
                   size="xl"
                   icon="i-fa6-brands-viber"
                   class="text-xl pl-0 pr-2"
          />
          <UButton variant="link"
                   size="xl"
                   icon="i-logos-whatsapp-icon"
                   class="text-xl pl-0 pr-2"
          />
          <UButton variant="link"
                   size="xl"
                   icon="i-logos-telegram"
                   class="text-xl pl-0 pr-2"
          />
        </p>

        <p class="mb-1">
          <UButton variant="link"
                   icon="i-ic-outline-alternate-email"
                   class="py-0 pl-0 pr-2"
                   :to="`mailto:${data.email}`"
          >
            {{ data.email }}
          </UButton>
        </p>
      </div>
    </div>
    <USeparator class="text-gray-200 my-5"/>
  </div>

</template>

<style scoped></style>