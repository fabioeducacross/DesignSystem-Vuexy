<template>
  <div>
    <div class="d-flex align-items-center gap-2 mb-2">
      <span class="material-symbols-outlined cursor-pointer text-body" @click="close">
        arrow_back
      </span>
      <h3 class="text-body mb-0">Detalhes da Importação</h3>
    </div>

    <div class="mb-2">
      <div class="mb-50 d-flex align-items-center">
        <span class="font-bold mr-50 text-body">Nome do arquivo:</span>
        <b-skeleton v-if="loading" width="125px"></b-skeleton>
        <span v-else class="text-body">{{ data.fileName }}</span>
      </div>
      <div class="mb-50 d-flex align-items-center">
        <span class="font-bold mr-50 text-body">Data:</span>
        <b-skeleton v-if="loading" width="125px"></b-skeleton>
        <span v-else class="text-body"> {{ data.date | formatDate }}</span>
      </div>
      <div class="mb-50 d-flex align-items-center">
        <span class="font-bold mr-50 text-body">Autor:</span>
        <b-skeleton v-if="loading" width="125px"></b-skeleton>
        <span v-else class="text-body">
          <b-avatar variant="info" size="32px" :text="initials(data.authorName)" class="mr-50" />
          <span>{{ data.authorName }}</span>
        </span>
      </div>

      <div class="mb-50 d-flex align-items-center">
        <span class="font-bold mr-50 text-body">Status:</span>
        <b-skeleton v-if="loading" width="125px"></b-skeleton>
        <b-badge v-else pill :variant="`light-${getStatus(data.status).variant}`">
          {{ getStatus(data.status).text }}
        </b-badge>
      </div>

      <!--  <div class="mb-50">
        <span class="font-bold mr-50">Envio de e-mail:</span>
        <b-badge pill :variant="`light-${getEmailStatus(data.emailStatus).variant}`">
          {{ getEmailStatus(data.emailStatus).text }}
        </b-badge>
      </div> -->
    </div>

    <div class="overflow-hidden w-100">
      <b-skeleton-table :columns="tableColumns.length" :rows="5" :class="{ 'd-none': !loading }" />
    </div>
    <b-table
      id="list-table"
      ref="refListTable"
      :class="{ 'd-none': loading }"
      class="position-relative"
      thead-tr-class="thead-row"
      tbody-tr-class="tbody-row"
      :items="data.studentAccessList"
      responsive
      :fields="tableColumns"
      primary-key="id"
      show-empty
      no-local-sorting
    >
      <template v-slot:empty>
        <div class="d-flex flex-column align-items-center">
          <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
          <span class="text-center text-primary font-bold" v-html="$t('noInformationFound')"></span>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script setup>
import { getStatus, getEmailStatus } from '@/consts/EStudentWorksheetBatchModel.js'
import { initials } from '@/filters/filters.js'
import { getImportStudentListById } from '@/services/admin-context/students/Students.service'
import { ref } from 'vue'

// Props
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})

// Emits
const emit = defineEmits(['close'])

// Methods
const close = () => {
  emit('close')
}

// State
const loading = ref(true)
const data = ref({})

getImportStudentListById(props.id).then(response => {
  data.value = response.data
  loading.value = false
})

const tableColumns = [
  {
    key: 'studentName',
    label: 'Nome do Aluno',
  },
  {
    key: 'sponsorEmail',
    label: 'e-mail do responsável',
  },
  {
    key: 'className',
    label: 'Turma',
  },
]
</script>

<style lang="scss" scoped></style>