<template>
  <b-card>
    <div class="d-flex flex-column flex-md-row justify-between">
      <b-link class="text-primary" :to="{ name: 'readingMeterTest' }">
        <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: middle">
          arrow_back_ios
        </span>
        <span class="underline">Voltar</span>
      </b-link>

      <div class="d-flex align-items-center gap-2">
        <span class="h4 mb-md-0 text-body">
          <span class="font-bold">{{ details.name }}</span>
        </span>
        <b-badge variant="light-primary" pill>{{ details.serieName }}</b-badge>
      </div>
      <span class="h4 mb-0 text-body">
        <span class="font-bold">{{ details.studentName }}</span>
      </span>
    </div>
  </b-card>
</template>

<script setup>
  import store from '@/store'
  import { computed } from 'vue'

  const details = computed(() => store.getters['ReadingMeterModule/readingDetail'])
</script>