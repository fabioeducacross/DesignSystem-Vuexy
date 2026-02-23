<template>
  <b-row>
    <b-col cols="12">
      <b-card>
        <div class="d-flex justify-between align-items-center">
          <b-link class="text-primary" :to="{ name: 'readingMeterList' }">
            <span class="material-symbols-outlined" style="font-size: 12px; vertical-align: middle">
              arrow_back_ios
            </span>
            <span class="underline"> Voltar</span>
          </b-link>
          <div class="d-flex align-items-center gap-2">
            <span class="h4 mr-50 mb-0 text-body">
              <span class="font-bold">{{ dataReport.name }}</span>
            </span>
            <b-badge pill variant="light-primary">
              {{ dataReport.serieName }}
            </b-badge>
            <b-badge :variant="`${getReadingMeterStatusEnum(dataReport.status).variant}`" pill>
              {{ getReadingMeterStatusEnum(dataReport.status).text }}
            </b-badge>
          </div>
        </div>
      </b-card>
    </b-col>
    <b-col cols="12">
      <ReadingMeterTestFilter />
    </b-col>
    <b-col cols="12">
      <ReadingMeterTestDashboard />
    </b-col>
    <b-col cols="12">
      <ListTable
        :table-columns="tableColumns"
        :data-table="readings"
        :total-data="totalData"
        :loading="loading"
        search-placeholder="searchForStudent"
        @change="changePage"
      >
        <template #cell(name)="{ value, item }">
          <div class="d-flex flex-column gap-1">
            <span class="font-semibold text-nowrap text-body">
              {{ value }}
            </span>
            <div class="d-flex align-items-center">
              <b-badge
                v-if="!item.report || (!item.report.audioFileUrl && !item.report.excluded)"
                variant="light-danger"
                pill
              >
                Não enviou a gravação
              </b-badge>

              <span
                v-else-if="item.report && item.report.error"
                class="d-flex align-items-center gap-2 flex-nowrap"
              >
                <b-badge variant="light-danger" pill> Problema identificado </b-badge>
                <span
                  v-b-tooltip="'Entre em contato com o nosso suporte para solucionar o problema.'"
                  class="material-symbols-outlined text-danger"
                  style="font-size: 18px"
                >
                  info
                </span>
              </span>

              <b-badge
                v-else-if="item.report && !item.report.audioFileUrl && item.report.excluded"
                variant="light-danger"
                pill
              >
                Cancelado
              </b-badge>
              <b-badge
                v-else-if="item.report && item.report.audioFileUrl && !item.report.proficiency"
                variant="light-info"
                pill
                class="d-flex align-items-center gap-1"
              >
                <span class="material-symbols-outlined" style="font-size: 10px">
                  hourglass_top
                </span>
                Analisando gravação
              </b-badge>
            </div>
          </div>
        </template>

        <template #[`cell(report.proficiency)`]="{ value, item }">
          <CellStatus
            v-if="value"
            :value="value"
            enum="proficiency"
            :time="item.report.time"
            :pill="!item.report.changeProficiency"
          />
          <span v-else>-</span>
        </template>

        <template #cell(readingMaterial)="{ value }">
          <div class="d-flex align-items-center gap-1">
            <span>{{ value.name }}</span>
          </div>
        </template>

        <template #[`cell(report.audioFileUrl)`]="{ value }">
          <audio v-if="value" :src="value" controls></audio>
          <span v-else>-</span>
        </template>

        <template #cell(actions)="{ item }">
          <div class="text-nowrap d-flex align-items-center gap-3">
            <span
              v-for="(action, index) in tableActions"
              v-show="action.isShow(item)"
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
    </b-col>

    <ModalConfirm
      v-model="confirmReEnableIsOpen"
      :callback-confirm="enableItem"
      label-confirm="Aplicar teste"
      :busy="loadingAction"
    >
      <h4>Tem certeza que deseja reaplicar?</h4>
      <p>
        O teste ficará disponível novamente para
        <span class="text-primary font-bold">{{ currentItem.name }}.</span> Você poderá cancelar a
        qualquer momento.
      </p>
    </ModalConfirm>

    <ModalConfirm
      v-model="confirmCancelIsOpen"
      :callback-confirm="cancelItem"
      label-confirm="Cancelar aplicação"
      :busy="loadingAction"
    >
      <h4>Tem certeza que deseja cancelar?</h4>
      <p>
        O teste será finalizado e não estará mais disponível para
        <span class="text-primary font-bold">{{ currentItem.name }}</span
        >.
      </p>
    </ModalConfirm>

    <b-modal
      ref="detailsModal"
      :visible="detailsIsOpen"
      hide-footer
      size="xl"
      no-close-on-backdrop
      centered
      static
      title="Detalhes do aluno no teste"
      header-bg-variant="light-primary"
      @close="detailsIsOpen = false"
    >
      <div v-if="detailsIsOpen">
        <ReadingMeterTestDetails :current-item="currentItem" />
      </div>
    </b-modal>
  </b-row>
</template>

<script setup>
import ReadingMeterTestFilter from './ReadingMeterTestFilter.vue'
import CellStatus from '@/components/badge/CellStatus.vue'
import ListTable from '@/components/table/ListTable.vue'
import { getReadingMeterStatusEnum } from '@/consts/ReadingMeterEnum.js'
import router from '@/router'
import {
  enableStudentReading,
  cancelStudentReading,
} from '@/services/shared/readingMeter/readingMeter.service'
import store from '@/store'
import formatDate from '@/utils/date'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import ReadingMeterTestDashboard from '@/views/pages/reading-meter/test/ReadingMeterTestDashboard.vue'
import ReadingMeterTestDetails from '@/views/pages/reading-meter/test/ReadingMeterTestDetails.vue'
import { computed, ref, watch, getCurrentInstance } from 'vue'

const { testId, classId } = router.currentRoute.params
const vm = getCurrentInstance().proxy

const pagination = computed(() => store.getters['ReadingMeterModule/pagination'])
const totalData = computed(() => pagination.value.totalData)
const readings = computed(() => store.getters['ReadingMeterModule/readingsTest'])
const test = computed(() => readings.value[0] || {})
const loading = computed(() => store.getters['ReadingMeterModule/loading'])

const dataReport = computed(() => store.getters['ReadingMeterModule/readingsTestReport'])

const tableColumns = [
  {
    key: 'name',
    label: 'Aluno',
    sortable: true,
    searchable: true,
  },

  {
    key: 'LastTestDate',
    label: 'Data do último teste',
    sortable: true,
    formatter: (value, key, item) =>
      item.report ? formatDate(item.report.readingDate) : '-',
  },
  {
    key: 'report.audioFileUrl',
    label: 'Gravação',
    // thStyle: { width: '350px' },
  },
  {
    key: 'report.proficiency',
    label: 'Proficiência Leitora',
    class: 'position-relative',
    thStyle: { width: '220px' },
  },
  {
    key: 'actions',
    label: 'Ações',
    thStyle: { width: '120px' },
  },
]

const tableActions = [
  {
    icon: 'disabled_by_default',
    tooltip: () => {
      return 'Cancelar aplicação'
    },
    isShow: data =>
      !data.report || (data.report && !data.report.proficiency && !data.report.excluded),
    isEnabled: data =>
      !data.report || (data.report && !data.report.proficiency && !data.report.excluded),
    color: 'text-danger',
    action: data => {
      prepareCancelItem(data)
    },
  },
  {
    icon: 'prompt_suggestion',
    tooltip: (data, isEnabled) => {
      return isEnabled
        ? 'Reaplicar teste'
        : 'Esta função não está disponível, pois o teste está em andamento.'
    },
    isShow: data => data.report && (data.report.proficiency || data.report.excluded),
    isEnabled: data => data.report && (data.report.proficiency || data.report.excluded),
    color: 'text-success',
    action: data => {
      prepareReEnableItem(data)
    },
  },
  {
    icon: 'pie_chart',
    tooltip: (data, isEnabled) => {
      return isEnabled ? 'Relatório do aluno' : ''
    },
    isShow: () => true,
    isEnabled: data => data.report && data.report.proficiency,
    color: 'text-primary',
    action: data => {
      router.push({
        name: 'readingMetherDetail',
        params: {
          studentId: data.id,
          classId,
          testId,
        },
        query: { readingDate: data.report.readingDate },
      })
    },
  },
  {
    icon: 'visibility',
    tooltip: () => {
      return 'Ver detalhes'
    },
    isShow: () => true,
    isEnabled: data => data.hasHistory,
    color: 'text-primary',
    action: data => {
      openDetails(data)
    },
  },
]

const changePage = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('ReadingMeterModule/setParams', {
    Search: searchQuery,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })
  store.dispatch('ReadingMeterModule/fetchDataTest', { testId, classId })
}

store.commit('ReadingMeterModule/reset')
store.dispatch('ReadingMeterModule/fetchDataTest', { testId, classId })

watch(dataReport, () => {
  vm.$bus.emit('setBreadcrumb', ['', '', dataReport.value.name])
})

const currentItem = ref({})
const loadingAction = ref(false)

const confirmReEnableIsOpen = ref(false)
const prepareReEnableItem = data => {
  currentItem.value = data
  confirmReEnableIsOpen.value = true
}

const confirmCancelIsOpen = ref(false)
const prepareCancelItem = data => {
  currentItem.value = data
  confirmCancelIsOpen.value = true
}

const detailsIsOpen = ref(false)
const openDetails = data => {
  currentItem.value = data
  detailsIsOpen.value = true
}

const enableItem = async () => {
  try {
    loadingAction.value = true
    const { id } = currentItem.value

    const res = await enableStudentReading({
      readingFluencyTestId: testId,
      classId,
      studentId: id,
    })

    currentItem.value = {}
    confirmReEnableIsOpen.value = false

    if (res.status === 200) {
      vm.$toast({
        component: Toast,
        props: {
          title: 'Teste aplicado com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
    }

    store.commit('ReadingMeterModule/reset')
    store.dispatch('ReadingMeterModule/fetchDataTestReport', { testId, classId })
    store.dispatch('ReadingMeterModule/fetchDataTest', { testId, classId })
  } finally {
    loadingAction.value = false
  }
}

const cancelItem = async () => {
  loadingAction.value = true
  const { id } = currentItem.value

  const res = await cancelStudentReading({
    readingFluencyTestId: testId,
    classId,
    studentId: id,
  })

  currentItem.value = {}
  confirmCancelIsOpen.value = false

  if (res.status === 200) {
    vm.$toast({
      component: Toast,
      props: {
        title: 'Teste aplicado com sucesso!',
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })
  }

  loadingAction.value = false
  store.commit('ReadingMeterModule/reset')
  store.dispatch('ReadingMeterModule/fetchDataTestReport', { testId, classId })
  store.dispatch('ReadingMeterModule/fetchDataTest', { testId, classId })
}
</script>

<style lang="scss" scoped>
  audio {
    height: 30px;
  }
</style>