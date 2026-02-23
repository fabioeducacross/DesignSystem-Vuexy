<template>
  <b-card>
    <div class="d-flex justify-between align-items-center">
      <b-link class="text-primary" :to="{ name: 'readingFluencySchools' }">
        <span class="material-symbols-outlined" style="font-size: 12px; vertical-align: middle">
          arrow_back_ios
        </span>
        <span class="underline"> Voltar </span>
      </b-link>
      <div class="d-flex align-items-center gap-2">
        <span class="text-primary h4 mb-0">
          <span class="font-bold">
            {{ data.institutionName }}
          </span>
        </span>
      </div>
    </div>
  </b-card>
</template>

<script setup>
import store from '@/store'
import { computed, watch, getCurrentInstance } from 'vue'

const vm = getCurrentInstance().proxy
const data = computed(() => store.getters['moduleReadingFluencyClasses/cards'])

watch([data], () => {
  if (data.value && data.value.institutionName) {
    vm.$bus.emit('setBreadcrumb', ['', '', data.value.institutionName])
  }
})
</script>

<style lang="scss" scoped></style>