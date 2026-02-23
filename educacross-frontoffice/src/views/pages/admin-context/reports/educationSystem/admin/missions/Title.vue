<template>
  <b-card body-class="py-1">
    <b-row align-v="center">
      <b-col cols="12" md="3">
        <b-link @click="redirectBack">
          <div class="d-flex align-items-center">
            <span class="material-icons-outlined">chevron_left</span>
            <span class="underline">Voltar</span>
          </div>
        </b-link>
      </b-col>
      <b-col cols="12" md="6">
        <div class="d-flex align-items-center justify-content-center gap-2 my-2 my-md-0">
          <Subjects v-if="subjectId" :subject-id="subjectId" :size="24" />
          <span class="m-0 font-bold text-primary">{{ bookName }}</span>
          <b-badge pill variant="light-primary">{{ serieName }}</b-badge>
        </div>
      </b-col>
      <b-col cols="12" md="3">
        <div class="d-flex align-items-center justify-content-md-end">
          <b-button
            variant="primary"
            class="py-50 px-1 d-flex align-items-center gap-1"
            @click="goEducationSystemMissionsBookReport"
          >
            <span class="material-symbols-outlined" style="font-size: 16px">pie_chart</span>
            Relatório do livro
          </b-button>
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import Subjects from '@/components/subjects/subjects.vue'
import router from '@/router'
import useFilters from '@/store/filters/useFilters'
import { useEducationSystemMissions } from '@/views/pages/admin-context/reports/educationSystem/admin/missions/useEducationSystemMissions.js'

const { educationSystemId } = useFilters()
const { bookName, subjectId, serieName } = useEducationSystemMissions()
const { bookId } = router.currentRoute.params

const redirectBack = () => {
  router.push({
    name: `educationSystemReportBooksList`,
    params: {
      educationSystemId: educationSystemId.value,
    },
  })
}

const goEducationSystemMissionsBookReport = () => {
  router.push({
    name: `educationSystemReportMissionsBookReportBooks`,
    params: {
      educationSystemId: educationSystemId.value,
      bookId,
    },
  })
}
</script>

<style lang="scss" scoped></style>