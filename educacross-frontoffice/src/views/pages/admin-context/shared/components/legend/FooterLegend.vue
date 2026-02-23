<template>
  <b-card>
    <div class="d-md-flex justify-content-center gap-3">
      <div
        v-for="(item, index) in legendArray"
        :key="index"
        class="d-flex align-items-center gap-2"
      >
        <SemaphoreStatus :status-enum="SemaphoreStatusEnum[item]" size="small" />
        <small>{{ SemaphoreStatusEnum[item].label }} {{ legendValuesLabel[item] }}</small>
      </div>
    </div>
  </b-card>
</template>

<script setup>
  import { SemaphoreStatusEnum } from '@/consts/StatusEnums.js'
  import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'

  const legendArray = Object.keys(SemaphoreStatusEnum).reverse()
  const legendValuesLabel = { 1: '≤ 49%', 2: '≥ 50%', 3: '≥ 80%', 4: '= 100%' }
</script>