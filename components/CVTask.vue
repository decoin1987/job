<script lang="ts" setup>
import { Task } from '../types/classes' // таски сделал статичными ну и класс потому что хотелось тогглов навешать немножка

const taskList = ref<Task[]>([
  new Task(1, 'Собеседование запланировано', true, true),
  new Task(2, 'Создать видеозвонок', true, false),
  new Task(3, 'Запланировать событие', false, false),
  new Task(4, 'Отправить запрос', true, false),
])
</script>

<template>
  <div class="cv-task section mb-5">
    <p class="text-lg mb-5">Дела:</p>
    <div class="flex gap-2">
      <UButton v-for="task in taskList" variant="solid" :disabled="!task.active" :color="task.checked ? 'success' : 'primary'" @click="task.taskHandler()" :key="task.id">
        {{ task.title }}
      </UButton>
    </div>
    <USeparator class="text-gray-200 my-5"/>
  </div>

</template>

<style scoped>
@media print {
  .cv-task {
    display: none;
  }
}
</style>