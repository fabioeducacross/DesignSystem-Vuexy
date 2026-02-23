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
      <template #cell()="{ value, item }">
        <div
          style="min-width: 165px; min-height: 65px"
          class="d-flex align-items-center justify-content-center"
        >
          <div v-if="value.status === EExpeditionStageStatus.Block && value.canBeUnlocked">
            <b-button variant="success" @click="unlock(item, value)"> Desbloquear </b-button>
          </div>
          <CellStatusReadingExpedition
            v-else
            :value="value.status"
            enum="ExpeditionStageStatusEnum"
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
  getExpeditionStageStatusEnum,
} from '@/consts/ReadingExpeditionEnum.js'
import {
  getReadingExpeditionStudentsExcel,
  putReadingExpeditionStudent,
} from '@/services/shared/reading-expedition/reading-expedition.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import CellStatusReadingExpedition from '@/views/pages/reading-expedition/overview/components/CellStatusReadingExpedition.vue'
import { saveAs } from 'file-saver'
import { computed, getCurrentInstance, ref } from 'vue'

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

const selectedStage = computed(
  () => store.getters['readingExpeditionModuleOverviewStudentDetails/selectedStage'],
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
    Stage: selectedStage.value?.stage,
  }

  getReadingExpeditionStudentsExcel(params)
    .then(response => {
      const fileName = 'Relatório Expedição Leitura - Visão por Aluno - Engajamento.xlsx'
      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    })
}

const unlock = (item, value) => {
  putReadingExpeditionStudent(item.studentId, { stage: value.stage }).then(() => {
    vm.$toast({
      props: {
        title: 'Alteração realizada com sucesso!',
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })
    store.dispatch('readingExpeditionModuleOverviewStudentDetails/fetch')
  })
}
</script>