<script lang="ts" setup>
defineProps<{
  items: {},
  activeStep: number,
}>()


</script>

<template>
  <div class="section rounded-lg bg-gray-100 p-5">
    <p class="text-lg mb-5">Статус рассмотрения:</p>
    <div class="flex flex-wrap gap-5">
      <div v-for="(value, key, index) in items" class="timeline-item px-4 flex items-center rounded-l-sm mr-2"
           :class="index <= activeStep ? 'active' : ''">
        <span>{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-item {
  cursor: default;
  border-radius: 6px;
  height: 41px;
  background-color: var(--ui-color-neutral-300);
  position: relative;
  z-index: 1;
}

.active {
  color: white;
  background-color: var(--ui-color-info-400);
}

.timeline-item.active:after {
  border-bottom: 15px solid var(--ui-color-info-400);
}

.timeline-item::after {
  content: "";
  position: absolute;
  transform: rotate(90deg);
  width: 0;
  height: 0;
  top: 13px;
  right: -24.3px;
  border-bottom: 15px solid var(--ui-color-neutral-300);
  border-left: 18px solid transparent;
  border-right: 18px solid transparent;
}
</style>