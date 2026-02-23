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
import { getReadingExpeditionExcel } from '@/services/shared/reading-expedition/reading-expedition.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import CellStatusReadingExpedition from '@/views/pages/reading-expedition/overview/components/CellStatusReadingExpedition.vue'
import { saveAs } from 'file-saver'
import { computed, ref, getCurrentInstance } from 'vue'

const vm = getCurrentInstance().proxy

const { classe } = useFilters()

const loading = computed(
  () => store.getters['readingExpeditionModuleOverviewTeacher/loading'],
)
const viewMode = computed(
  () => store.getters['readingExpeditionModuleOverviewTeacher/viewMode'],
)

const tableColumns = computed(
  () => store.getters['readingExpeditionModuleOverviewTeacher/tableColumns'],
)
const dataTable = computed(() => store.getters['readingExpeditionModuleOverviewTeacher/data'])
const totalData = computed(
  () => store.getters['readingExpeditionModuleOverviewTeacher/total'],
)

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('readingExpeditionModuleOverviewTeacher/params', {
    Search: searchQuery,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })

  store.dispatch('readingExpeditionModuleOverviewTeacher/fetch')
}

const emitOpenModal = item => {
  vm.$bus.emit('openStudentPassportModal', item.studentId)
}

const generatingExcel = ref(false)

const exportToExcel = () => {
  generatingExcel.value = true

  const params = {
    ClassId: classe.value.ClassId,
    Search: store.getters['readingExpeditionModuleOverviewTeacher/search'],
    Filter: viewMode.value,
  }

  getReadingExpeditionExcel(params)
    .then(response => {
      const fileName = 'Expedição Leitura - Visão Geral - Desempenho.xlsx'
      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    })
}
</script>