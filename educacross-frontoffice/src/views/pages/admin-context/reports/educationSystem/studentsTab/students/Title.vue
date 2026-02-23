<template>
  <b-card>
    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <b-skeleton type="text" class="w-100 mb-0" height="50px" />
      </template>
      <div class="d-flex flex-col flex-md-row align-items-center justify-content-between">
        <b-button variant="link" class="p-0" @click="redirectBack">
          <div class="d-flex align-items-center">
            <span class="material-icons-outlined">chevron_left</span>
            <span class="underline">Voltar</span>
          </div>
        </b-button>

        <div class="d-flex align-items-center justify-content-end gap-2 pr-2">
          <h5 class="mb-0">
            <span class="font-bold text-primary">{{ classe.name }}</span>
          </h5>
          <b-badge pill variant="light-primary">{{ serie.name }}</b-badge>
        </div>
      </div>
    </b-skeleton-wrapper>
  </b-card>
</template>

<script setup>
import Subjects from '@/components/subjects/subjects.vue'
import { useRoute, useRouter } from 'vue-router/composables'
import useFilters from '@/store/filters/useFilters'
import { useEducationSystemStudents } from '@/views/pages/admin-context/reports/educationSystem/studentsTab/students/useEducationSystemStudents.js'

const route = useRoute()
const router = useRouter()

const { subject, classe, serie, educationSystemId } = useFilters()
const { loading } = useEducationSystemStudents()

const redirectBack = () => {
  router.push({
    name: route.meta.routeBack,
    params: {
      educationSystemId: educationSystemId.value,
      bookId: route.params.bookId,
    },
  })
}
</script>

<style lang="scss" scoped>
  .point-circle {
    border-radius: 50%;
    background: #82868b;
    width: 4px;
    height: 4px;
  }
</style>