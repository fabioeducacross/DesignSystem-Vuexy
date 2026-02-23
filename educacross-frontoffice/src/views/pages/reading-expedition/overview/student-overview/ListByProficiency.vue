<template>
  <div>
    <ListTable
      :table-columns="tableColumns"
      :data-table="dataTable"
      search-placeholder="searchForStudent"
      :loading="loading"
      :total-data="totalData"
      :generating-excel="generatingExcel"
      :export-to-excel="exportToExcel"
      @change="changeListTable"
    >
      <template #cell()="{ value }">
        <div style="min-width: 165px; min-height: 65px">
          <CellStatusReadingExpedition
            :value="value.status === EExpeditionStageStatus.Finished ? value.level : value.status"
            :enum="
              value.status === EExpeditionStageStatus.Finished
                ? 'ProficiencyTestStatusEnum'
                : 'ExpeditionStageStatusEnum'
            "
            :time="value.time"
            :pill="!value.changeLevel"
          />
        </div>
      </template>
      <template #cell(studentName)="{ item }">
        <div class="d-flex align-items-center gap-2 text-primary" style="min-width: 220px">
          <span class="material-icons-outlined cursor-pointer" @click="emitOpenModal(item)">
            airplane_ticket
          </span>
          <span class="font-bold cursor-pointer" @click="emitOpenModal(item)">
            {{ item.studentName }}
          </span>
        </div>
      </template>
    </ListTable>
  </div>
</template>

<script setup>
import ListTable from '@/components/table/ListTable.vue'
import {
  EExpeditionStageStatus,
  ProficiencyTestStatusEnum,
} from '@/consts/ReadingExpeditionEnum.js'
import { getReadingExpeditionStudentsExcel } from '@/services/shared/reading-expedition/reading-expedition.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import CellStatusReadingExpedition from '@/views/pages/reading-expedition/overview/components/CellStatusReadingExpedition.vue'
import { saveAs } from 'file-saver'
import { ref, computed, getCurrentInstance } from 'vue'

const vm = getCurrentInstance().proxy
const { classe, serie } = useFilters()

const loading = computed(
  () => store.getters['readingExpeditionModuleOverviewStudentDetails/loading'],
)
const viewMode = computed(
  () => store.getters['readingExpeditionModuleOverviewStudentDetails/viewMode'],
)

const tableColumns = computed(
  () => store.getters['readingExpeditionModuleOverviewStudentDetails/tableColumns'],
)
const dataTable = computed(
  () => store.getters['readingExpeditionModuleOverviewStudentDetails/data'],
)
const totalData = computed(
  () => store.getters['readingExpeditionModuleOverviewStudentDetails/total'],
)

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('readingExpeditionModuleOverviewStudentDetails/params', {
    Search: searchQuery,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })

  store.dispatch('readingExpeditionModuleOverviewStudentDetails/fetch')
}

const emitOpenModal = item => {
  vm.$bus.emit('openStudentPassportModal', item.studentId)
}

const generatingExcel = ref(false)

const exportToExcel = () => {
  generatingExcel.value = true

  const params = {
    SerieId: serie.value.id,
    ClassId: classe.value.id,
    Filter: viewMode.value,
  }

  getReadingExpeditionStudentsExcel(params)
    .then(response => {
      const fileName = 'Relatório Expedição Leitura - Visão por Aluno - Desempenho.xlsx'
      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    })
}
</script>