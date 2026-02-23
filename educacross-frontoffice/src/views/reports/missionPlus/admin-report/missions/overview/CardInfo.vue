<template>
  <b-card bg-variant="light-primary" text-variant="primary" body-class="p-1">
    <div class="d-flex flex-column flex-md-row justify-content-center align-items-stretch gap-6">
      <div class="d-flex align-items-center justify-content-center gap-1">
        <span class="material-symbols-outlined"> sentiment_satisfied </span>Total de alunos:
        <span class="font-bold">{{ cards.totalStudents }}</span>
      </div>
      <div class="d-none d-md-block">
        <VerticalDivider variant="primary" />
      </div>
      <div class="d-flex align-items-center justify-content-center gap-2">
        Professores da turma:<ListInitialsTeacher :data="teachersNames" :light="false" />
      </div>
    </div>
  </b-card>
</template>

<script setup>
  import VerticalDivider from '@/components/divider/VerticalDivider.vue'
  import ListInitialsTeacher from '@/components/teacher/listInitialsTeacher.vue'
  import store from '@/store'
  import { computed } from 'vue'

  const cards = computed(
    () => store.getters['moduleMissionsPlusReportAdminMissionsOverview/cards'],
  )

  const teachersNames = computed(() => {
    if (!cards.value || !cards.value.teachersNames) return []
    return cards.value.teachersNames.map(teacher => {
      return {
        name: teacher,
      }
    })
  })
</script>

<style lang="scss" scoped></style>