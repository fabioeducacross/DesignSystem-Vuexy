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
          <span class="m-0 font-bold">{{ bookName }}</span>
        </div>
      </b-col>
      <b-col cols="12" md="3">
        <div class="d-flex align-items-center justify-content-md-end">
          <div class="d-flex align-items-center justify-content-end gap-2 pr-2">
            <span class="m-0 font-bold text-primary">{{ classe.Name }}</span>
            <b-badge pill variant="light-primary">{{ classe.SerieName }}</b-badge>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import Subjects from '@/components/subjects/subjects.vue'
import router from '@/router'
import useFilters from '@/store/filters/useFilters'
import { useEducationSystemBookReport } from '@/views/pages/teacher-context/educationSystem/bookReport/useEducationSystemBookReport.js'

const { educationSystemId, classe } = useFilters()
const { bookName, subjectId } = useEducationSystemBookReport()
const { bookId } = router.currentRoute.params

const redirectBack = () => {
  router.push({
    name: `EducationSystemMissions${educationSystemId.value}`,
    params: {
      educationSystemId: educationSystemId.value,
      bookId,
    },
  })
}
</script>

<style lang="scss" scoped></style>