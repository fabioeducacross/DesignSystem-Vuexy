<template>
  <section>
    <b-card class="shadow-none" body-class="p-0" :class="currentItemClass">
      <ListTable
        :table-columns="tableColumns"
        :data-table="dataTable"
        :loading="loading"
        :total-data="totalData"
        search-placeholder="searchForStudent"
        :export-to-excel="exportToExcel"
        :generating-excel="generatingExcel"
        @change="changeListTable"
      >
        <template #cell()="{ value }">
          <div style="min-width: 165px; min-height: 65px">
            <CellStatusReadingExpedition
              :value="value.level ? value.level : value.status"
              :enum="value.level ? 'ProficiencyTestStatusEnum' : 'ExpeditionStageStatusEnum'"
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

        <template #cell(actions)="{ item }">
          <div class="text-nowrap d-flex align-items-center gap-3">
            <span
              v-for="(action, index) in tableActions"
              :key="index"
              v-b-tooltip.hover.top="action.tooltip(item, action.isEnabled(item))"
              :class="
                action.isEnabled(item)
                  ? `${action.color} cursor-pointer`
                  : 'cursor-not-allowed text-muted'
              "
              class="material-symbols-outlined"
              @click.stop="action.isEnabled(item) ? action.action(item) : null"
            >
              {{ action.icon }}
            </span>
          </div>
        </template>
      </ListTable>
    </b-card>
    <div class="d-flex justify-content-end">
      <SidebarInfo />
    </div>
  </section>
</template>

<script setup>
import MediaCardIcon from '@/components/card/MediaCardIcon.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTable from '@/components/table/ListTable.vue'
import {
  EExpeditionStageStatus,
  getReadingProficiencyEnum,
} from '@/consts/ReadingExpeditionEnum.js'
import router from '@/router'
import { getReadingUnitsResultsExcel } from '@/services/shared/reading-expedition/reading-expedition.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import readingExpeditionUnitModule from '@/store/pageModules/readingExpedition/readingExpeditionUnitModule.js'
import SidebarInfo from '@/views/pages/reading-expedition/components/SidebarInfo.vue'
import CellStatusReadingExpedition from '@/views/pages/reading-expedition/overview/components/CellStatusReadingExpedition.vue'
import { saveAs } from 'file-saver'
import { computed, getCurrentInstance, onMounted, onUnmounted, ref, watch } from 'vue'

const vm = getCurrentInstance().proxy
const moduleName = 'readingExpeditionUnitModule'
store.registerModule(moduleName, readingExpeditionUnitModule)

const { classe } = useFilters()

const unitId = computed(() => store.getters['ReadingExpeditionModule/unitId'])

watch([unitId], () => {
  if (unitId.value) {
    store.dispatch('readingExpeditionUnitModule/reset')
    store.dispatch('readingExpeditionUnitModule/fetch')
    updateBreadcrumb()
  }
})
onMounted(() => {
  if (unitId.value) {
    store.dispatch('readingExpeditionUnitModule/fetch')
    updateBreadcrumb()
  }
})

const loading = computed(() => store.getters['readingExpeditionUnitModule/loading'])
const tableColumns = computed(() => store.getters['readingExpeditionUnitModule/tableColumns'])

const tableActions = [
  {
    icon: 'pie_chart',
    tooltip: () => {
      return ''
    },
    isEnabled: data => data.enable,
    color: 'text-primary',
    action: data => {
      router.push({
        name: 'readingExpeditionUnitStudent',
        params: {
          studentId: data.studentId,
          testId: unitId.value,
        },
      })
    },
  },
]

const dataTable = computed(() => store.getters['readingExpeditionUnitModule/data'])
const totalData = computed(() => store.getters['readingExpeditionUnitModule/total'])

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('readingExpeditionUnitModule/params', {
    Search: searchQuery,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })

  store.dispatch('readingExpeditionUnitModule/fetch')
}

const generatingExcel = ref(false)

const exportToExcel = () => {
  generatingExcel.value = true
  getReadingUnitsResultsExcel({
    ClassId: classe.value.ClassId,
    Stage: unitId.value,
    Search: store.getters['readingExpeditionUnitModule/search'],
  })
    .then(response => {
      const fileName = 'Expedição Leitura - Unidades.xlsx'
      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    })
}

const updateBreadcrumb = () => {
  const unit = store.getters['ReadingExpeditionModule/unit']
  vm.$bus.emit('setBreadcrumb', ['', unit?.unitName])
}

const currentItemClass = computed(
  () => store.getters['ReadingExpeditionModule/currentUnitClass'],
)

onUnmounted(() => {
  store.dispatch('readingExpeditionUnitModule/reset')
  store.unregisterModule(moduleName)
})

const emitOpenModal = item => {
  vm.$bus.emit('openStudentPassportModal', item.studentId)
}

vm.$bus.emit('setTabTitle', 'VISÃO DA TURMA')
store.commit('ReadingExpeditionModule/studentName', null)
</script>