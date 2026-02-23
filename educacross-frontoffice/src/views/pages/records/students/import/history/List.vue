<template>
  <section>
    <div v-show="!selectedItemId">
      <Title />
      <p>Os status de importações são atualizados a cada 1 minuto.</p>
      <ListTable
        ref="tableRef"
        :loading="loading"
        :table-columns="tableColumns"
        :data-table="dataTable"
        :total-data="totalData"
        :show-controls="false"
        @change="changeListTable"
      >
        <template #cell(authorName)="{ item }">
          <div class="d-flex align-items-center">
            <b-avatar variant="info" :text="initials(item.authorName)" />
          </div>
        </template>

        <template #cell(status)="{ item }">
          <b-badge pill :variant="`light-${getStatus(item.status).variant}`">
            {{ getStatus(item.status).text }}
          </b-badge>
        </template>

        <template #cell(emailStatus)="{ item }">
          <div class="d-flex align-items-center justify-content-between gap-2">
            <b-badge pill :variant="`light-${getEmailStatus(item.emailStatus).variant}`">
              {{ getEmailStatus(item.emailStatus).text }}
            </b-badge>

            <span class="material-symbols-outlined cursor-pointer" @click="openDetails(item)">
              chevron_right
            </span>
          </div>
        </template>
      </ListTable>
    </div>
    <Details v-if="selectedItemId" :id="selectedItemId" @close="closeDetails" />
  </section>
</template>

<script setup>
import ListTable from '@/components/table/ListTable.vue'
import { getStatus, getEmailStatus } from '@/consts/EStudentWorksheetBatchModel.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { initials } from '@/filters/filters.js'
import { formatDate } from '@/utils/utils'
import Details from '@/views/pages/records/students/import/history/Details.vue'
import Title from '@/views/pages/records/students/import/history/Title.vue'
import { useImportHistory } from '@/views/pages/records/students/import/history/useImportHistory.js'
import { computed, ref } from 'vue'

const { params, loading, totalData, tableRef, dataTable, resetAndfetch, fetch } = useImportHistory()

const selectedItemId = ref(null)

const tableColumns = computed(() => {
  return [
    {
      key: 'fileName',
      label: 'Arquivo',
    },
    {
      key: 'date',
      label: 'Data',
      formatter: value => formatDate(value),
    },
    { key: 'authorName', label: 'Autor' },
    { key: 'status', label: 'Status' },
    { key: 'emailStatus', label: 'Envio de e-mail' },
  ]
})

const changeListTable = data => {
  params.value = data
  fetch()
}

resetAndfetch()

const openDetails = item => {
  selectedItemId.value = item.id
}

const closeDetails = () => {
  selectedItemId.value = null
}
</script>