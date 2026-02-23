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
      <template #cell()="{ value, item, field }">
        <div
          style="min-width: 165px; min-height: 65px"
          class="d-flex align-items-center justify-content-center"
        >
          <div v-if="checkUnlockAvailability(item, value, field)">
            <b-button
              variant="success"
              :disabled="unlockingItems[`${item.studentId}-${value.stage}`]"
              @click="unlock(item, value)"
            >
              <div class="d-flex align-items-center gap-1">
                <b-spinner v-if="unlockingItems[`${item.studentId}-${value.stage}`]" small />
                <span>Desbloquear</span>
              </div>
            </b-button>
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
  getExpeditionStageStatusEnum,
  EExpeditionStageStatus,
} from '@/consts/ReadingExpeditionEnum.js'
import {
  getReadingExpeditionExcel,
  putReadingExpeditionStudent,
} from '@/services/shared/reading-expedition/reading-expedition.service.js'
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
const dataTable = computed(
  () => store.getters['readingExpeditionModuleOverviewTeacher/data'],
)
const totalData = computed(
  () => store.getters['readingExpeditionModuleOverviewTeacher/total'],
)

const firstStageKey = computed(() => {
  if (!tableColumns.value || tableColumns.value.length === 0) return null
  const col = tableColumns.value.find(c => c.key !== 'studentName')
  return col ? col.key : null
})

const checkUnlockAvailability = (item, value, field) => {
  if (value.status !== EExpeditionStageStatus.Block) return false

  if (value.canBeUnlocked) return true
  if (field.key === firstStageKey.value) return true

  const columns = tableColumns.value
  if (!columns) return false

  const currentIndex = columns.findIndex(c => c.key === field.key)

  if (currentIndex > 0) {
    const prevColumn = columns[currentIndex - 1]
    if (prevColumn && prevColumn.key !== 'studentName') {
      const prevValue = item[prevColumn.key]
      if (prevValue && prevValue.status === EExpeditionStageStatus.Finished) {
        return true
      }
    }
  }
  return false
}

const changeListTable = ({
  currentPage,
  perPage,
  sortBy,
  isSortDirDesc,
  searchQuery,
}) => {
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
const unlockingItems = ref({})

const exportToExcel = () => {
  generatingExcel.value = true

  const params = {
    ClassId: classe.value.ClassId,
    Search: store.getters['readingExpeditionModuleOverviewTeacher/search'],
    Filter: viewMode.value,
  }

  getReadingExpeditionExcel(params)
    .then(response => {
      const fileName = 'Expedicao Leitura - Visao Geral - Engajamento.xlsx'

      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    })
}

const unlock = (item, value) => {
  const key = `${item.studentId}-${value.stage}`
  unlockingItems.value[key] = true

  putReadingExpeditionStudent(item.studentId, { stage: value.stage })
    .then(() => {
      vm.$toast({
        props: {
          title: 'Alteracao realizada com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
      store.dispatch('readingExpeditionModuleOverviewTeacher/fetch')
    })
    .finally(() => {
      delete unlockingItems.value[key]
    })
}
</script>
