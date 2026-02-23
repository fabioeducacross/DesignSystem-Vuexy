<script>
export default {
  name: 'EducationSystemBooksFilter',
}
</script>

<script setup>
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import {useEducationSystemBooks} from '@/views/pages/teacher-context/educationSystem/books/useEducationSystemBooks'

const { onlyInProgress, loading } = useEducationSystemBooks()
</script>

<template>
  <b-card>
    <b-row class="align-items-center justify-content-between">
      <b-col cols="12" md="auto">
        <SelectSubject />
      </b-col>
      <b-col cols="12" md="auto">
        <b-form-checkbox
          v-model="onlyInProgress"
          :disabled="loading"
          switch
          inline
          button-variant="primary"
          class="align-self-end"
        >
          Exibir somente dados de missão em andamento.
        </b-form-checkbox>
      </b-col>
    </b-row>
  </b-card>
</template>
