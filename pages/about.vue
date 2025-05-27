<template>
  <div>
    <UContainer v-if="resumeStatus === 'success'" class="py-16">
      <UCard>
        <template #header>
          <div class="flex gap-2">
            <UTooltip v-for="btn in headerButtons"
                      :delay-duration="300"
                      :text="btn.text"
            >
              <UButton :icon="btn.icon" size="xl" color="neutral" variant="soft" type="button" @click="btn.click"
                       class="text-neutral-500 text-2xl"/>
            </UTooltip>
          </div>
        </template>
        <div class="flex gap-5">
          <div class="image-wrapper">
            <img class="aspect-square" :src="`${publicBase}/${resume.photo}`" alt="">
          </div>
          <div class="main-info">
            <UButton variant="link" class="mb-3 text-lg" size="2xl" color="neutral"
                     trailing-icon="i-heroicons-outline-external-link" :to="`resume/${resume.id}`">
              {{ resume.name }}
            </UButton>
            <p class="mb-0">
              Кандидат на вакансию:
              <UButton variant="link" trailing-icon="i-heroicons-outline-external-link" :to="`vacancy/${resume.listing_id}`">Жадный
                благотворитель
              </UButton>
              <UButton variant="link" :to="`vacancy/${resume.listing_id}`">(14.08.2024 Отклик)</UButton>
            </p>
            <p class="mb-1">{{ statuses[resume.status] }}</p>
            <p class="mb-1">{{ resume?.age ? `Возраст: ${resume.age} лет` : `Возраст не указан` }}</p>
            <p class="mb-1">
              <UButton variant="link" icon="i-heroicons-outline-phone" class="pl-0 pr-2" :to="`tel:${resume.phone}`">
                {{ resume.phone }}
              </UButton>
              <UButton variant="link" size="xl" icon="i-fa6-brands-viber" class="text-xl pl-0 pr-2"/>
              <UButton variant="link" size="xl" icon="i-logos-whatsapp-icon" class="text-xl pl-0 pr-2"/>
              <UButton variant="link" size="xl" icon="i-logos-telegram" class="text-xl pl-0 pr-2"/>
            </p>
            <p class="mb-1">
              <UButton variant="link" icon="i-ic-outline-alternate-email" class="py-0 pl-0 pr-2" :to="`mailto:${resume.email}`">
                {{ resume.email }}
              </UButton>
            </p>
          </div>
        </div>
        <USeparator class="text-gray-200 my-5"/>
        <div class="section mb-5">
          <p class="text-lg mb-5">Дела:</p>
          <div class="flex gap-2">
            <UButton v-for="task in taskList" variant="solid" :disabled="!task.active" :color="task.checked ? 'success' : 'primary'" @click="task.toggle()" :key="task.id">
              {{ task.title }}
            </UButton>
          </div>

        </div>
        <div class="section rounded-lg bg-gray-100 p-5">
          <p class="text-lg mb-5">Статус рассмотрения:</p>
          <div class="flex flex-wrap gap-5">
            <Statuses :items="statuses" :active="active()"/>
          </div>
        </div>
        <USeparator class="text-gray-200 my-5"/>
        <div>
          <p class="text-lg">PIKABU отклик</p>
          <p>Отклик с портала picabu</p>
        </div>
        <USeparator class="text-gray-200 my-5"/>
        <div class="section">
          <p v-for="item in resume.description.split('\r\n')">{{ item }}</p>
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
    <UContainer v-if="resumeStatus === 'pending'" class="mt-20 items-center flex">
      <UProgress animation="swing"/>
    </UContainer>
    <UContainer v-if="error">
      <p class="text-red-500 mb-5">Ошибка: {{ error }}</p>
      <UButton type="button" @click="resumeRefresh">Попробуйте перезагрузить страницу</UButton>
    </UContainer>
  </div>

</template>

<script setup lang="ts">
import {useFetch} from "nuxt/app";

const config = useRuntimeConfig();
const apiBase = config.public.apiBase;
const publicBase = config.public.publicBase;

type resumeType = {
  id: number,
  name: string,
  description: string,
  date: string,
  status: statuses,
  portfolios: string,
  town: string,
  phone: string,
  age: number,
  birth_date: string,
  email: string,
  listing_id: number,
  photo: string,
}

enum statuses {
  'new' = 'Новое',
  'viewed' = 'Просмотрено',
  'send-invitation' = 'Отправлено приглашение',
  'schedule-interview' = 'Назначено собеседование',
  'not-arrive' = 'Не дошел',
  'conducted-interview' = 'Проведено собеседование',
  'wait-response' = 'Ожидание ответа соискателя',
  'arrival-decision' = 'Принятие решения',
  'accepted' = 'Принят',
  'rejected' = 'Отклонено/Отказ',
  'archived' = 'Архивировано',
}

const headerButtons = [
  {
    text: 'Печать',
    icon: 'i-basil-printer-outline',
    click: () => window.print()
  }, {
    text: 'Сохранить в формате PDF',
    icon: 'i-lsicon-file-pdf-filled',
    click: () => {},
  }, {
    text: 'Сохранить в формате DOC',
    icon: 'i-lsicon-file-doc-filled',
    click: () => {},
  }, {
    text: 'Хмм... не читаемая иконка)',
    icon: 'i-mdi-file-document-edit-outline',
    click: () => {},
  }, {
    text: 'Удалить',
    icon: 'i-solar-trash-bin-trash-outline',
    click: () => {
      alert('Вы точно хотите удалить резюме')
    },
  }, {
    text: 'Переслать / поделиться',
    icon: 'i-stash-article-share',
    click: () => {},
  }, {
    text: 'Полюбить соискателя)))',
    icon: 'i-rivet-icons-heart-solid',
    click: () => {},
  },
]

class Task {
  public id: number
  public title: string
  public active: Boolean
  public checked: Boolean

  constructor(id, title, active, checked) {
    this.id = id
    this.title = title
    this.active = active
    this.checked = checked
  }

  public toggle() {
    console.log('toggle')
    this.checked = !this.checked
  }
}

const taskList: Task[] = ref([
  new Task(1, 'Собеседование запланировано', true, true),
  new Task(2, 'Создать видеозвонок', true, false),
  new Task(3, 'Запланировать событие', false, false),
  new Task(4, 'Отправить запрос', true, false),
])

const {
  data: resume,
  status: resumeStatus,
  refresh: resumeRefresh,
  error: error
} = useFetch<resumeType>(`${apiBase}/test/v2/app`)

function active() {
  return Object.keys(statuses).indexOf(resume.value.status)
}
</script>