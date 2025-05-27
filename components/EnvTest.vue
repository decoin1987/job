<template>
  <div class="p-4 border ring-default rounded">
    <h2 class="text-xl font-bold mb-4">Тест переменных окружения</h2>
    <div class="space-y-2">
      <p><strong>WordPressApiUrl:</strong> {{ config.public.wordpressApiUrl }}</p>
      <p><strong>API Base:</strong> {{ config.public.apiBase }}</p>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
</script> 