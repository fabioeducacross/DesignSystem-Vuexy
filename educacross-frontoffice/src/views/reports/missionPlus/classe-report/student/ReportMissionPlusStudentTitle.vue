<script setup>
import { useReportMissionPlusStudent } from '@/views/reports/missionPlus/classe-report/student/useReportMissionPlusStudent'

const { studentName } = useReportMissionPlusStudent()
</script>

<template>
  <b-card body-class="d-flex justify-content-between">
    <div>
      <span class="material-symbols-outlined text-primary font-12 align-middle"
        >arrow_back_ios
      </span>
      <b-link class="align-middle underline" @click="$router.back()">Voltar</b-link>
    </div>
    <b class="text-primary">{{ studentName }}</b>
  </b-card>
</template>