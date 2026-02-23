<template>
  <b-alert variant="primary" show>
    <div class="alert-body">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-md-flex align-items-center gap-6">
          <span class="d-flex align-items-center gap-1">
            <span class="material-symbols-outlined font-24"> group </span>
            <span class="font-normal">Usuários cadastrados:</span>
            <span class="font-bold">{{ totalUsers }}</span>
          </span>
          <span class="d-none d-md-block">|</span>
          <span class="d-flex align-items-center gap-1">
            <span class="material-symbols-outlined font-24"> id_card </span>
            <span class="font-normal">Licenças disponíveis:</span>
            <span class="font-bold">{{ availableLicenses }}</span>
          </span>
        </div>

        <span
          v-b-tooltip.hover="
            'Licenças disponíveis são o número de usuários que podem ser cadastrados.'
          "
          class="material-symbols-outlined"
        >
          help
        </span>
      </div>
    </div>
  </b-alert>
</template>

<script setup>
import { useRecordsTeachers } from '@/views/pages/records/teachers/list/overview/useRecordsTeachers.js'

const { totalUsers, availableLicenses } = useRecordsTeachers()
</script>

<style lang="scss" scoped></style>