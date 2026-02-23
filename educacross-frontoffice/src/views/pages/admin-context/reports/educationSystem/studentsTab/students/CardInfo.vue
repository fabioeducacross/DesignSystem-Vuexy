<template>
  <b-skeleton-wrapper :loading="loading">
    <template v-slot:loading>
      <b-skeleton type="text" height="64px" class="w-100" />
    </template>
    <b-card bg-variant="light-primary" text-variant="primary" body-class="p-1">
      <div class="d-flex flex-column flex-md-row justify-content-center align-items-stretch gap-6">
        <div class="d-flex align-items-center justify-content-center gap-1">
          <span class="material-symbols-outlined"> sentiment_satisfied </span>Total de alunos:
          <span class="font-bold">{{ totalStudents }}</span>
        </div>
        <div class="d-none d-md-block">
          <VerticalDivider variant="primary" />
        </div>
        <div class="d-flex align-items-center justify-content-center gap-2">
          Professores da turma:<ListInitialsTeacher :data="teachersNames" :light="false" />
        </div>
      </div>
    </b-card>
  </b-skeleton-wrapper>
</template>

<script setup>
  import VerticalDivider from '@/components/divider/VerticalDivider.vue'
  import ListInitialsTeacher from '@/components/teacher/listInitialsTeacher.vue'
  import useTable from '@/store/table/useTable.js'
  import { useEducationSystemStudents } from '@/views/pages/admin-context/reports/educationSystem/studentsTab/students/useEducationSystemStudents.js'

  const { totalStudents, teachersNames } = useEducationSystemStudents()
  const { loading } = useTable()
</script>

<style lang="scss" scoped></style>