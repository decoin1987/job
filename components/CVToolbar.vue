<script lang="ts" setup>
// статичный компонент можно хранить данные прямо в компоненте
type ToolbarItem = {
  label: string
  icon: string
  click: () => {}
}

const toolbarButtons:ToolbarItem[] = [
  {
    label: 'Печать',
    icon: 'i-basil-printer-outline',
    click: () => window.print()
  }, {
    label: 'Сохранить в формате PDF',
    icon: 'i-lsicon-file-pdf-filled',
    click: () => {},
  }, {
    label: 'Сохранить в формате DOC',
    icon: 'i-lsicon-file-doc-filled',
    click: () => {},
  }, {
    label: 'Хмм... не читаемая иконка)',
    icon: 'i-mdi-file-document-edit-outline',
    click: () => {},
  }, {
    label: 'Удалить',
    icon: 'i-solar-trash-bin-trash-outline',
    click: () => {
      const res = confirm('Точно точно удалить?')
      if (res) alert('Карточка соискателя могла быть удалена, но это демо страничка.\n Попробуйте еще раз ;)')
    },
  }, {
    label: 'Переслать / поделиться',
    icon: 'i-stash-article-share',
    click: () => {},
  }, {
    label: 'Полюбить соискателя)))',
    icon: 'i-rivet-icons-heart-solid',
    click: () => {
      alert('Теперь вы любите соискателя)')
    },
  },
]

</script>

<template>
  <div class="cv-toolbar flex gap-2">
    <UTooltip v-for="btn in toolbarButtons"
              :delay-duration="300"
              :text="btn.label"
    >
      <UButton :icon="btn.icon"
               color="neutral"
               variant="soft"
               type="button"
               @click="btn.click"
               class="text-neutral-500 text-2xl"
      />
    </UTooltip>
  </div>
</template>

<style scoped>
@media print {
  .cv-toolbar {
    display: none;
  }
}
</style>