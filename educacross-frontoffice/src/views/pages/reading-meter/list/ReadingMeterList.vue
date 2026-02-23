<template>
  <b-row>
    <b-col cols="12">
      <ReadingMeterFilter />
    </b-col>
    <b-col cols="12">
      <ListTable
        ref="refList"
        :table-columns="tableColumns"
        :data-table="readings"
        :total-data="totalData"
        search-placeholder="Pesquisar por teste"
        :loading="loading"
        @change="changePage"
      >
        <template #cell(name)="{ item }">
          <div class="d-flex align-items-center gap-2">
            <b-img-lazy :src="item.imageUrl" v-bind="bookImgConfig" :alt="item.name" />
            <span class="font-bold">
              {{ item.name }}
            </span>
          </div>
        </template>

        <template #cell(serieName)="{ item }">
          <div>
            <b-badge variant="light-primary" pill>{{ item.serieName }}</b-badge>
          </div>
        </template>

        <template #cell(progress)="{ value }">
          <ProgressBarHorizontalV2
            v-if="value || value === 0"
            reverse
            height="12px"
            :value="value"
            :get-variant="getColorsEnum"
          />
          <span v-else>-</span>
        </template>

        <template #cell(status)="{ value }">
          <div>
            <b-badge :variant="`light-${getReadingMeterStatusEnum(value).variant}`" pill>
              {{ getReadingMeterStatusEnum(value).text }}
            </b-badge>
          </div>
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
      <LegendEnum :legends="legends" />

      <ModalConfirm
        v-model="confirmEnableIsOpen"
        :callback-confirm="enableItem"
        label-confirm="Aplicar teste"
        :busy="loadingAction"
      >
        <h4>Tem certeza que deseja aplicar?</h4>
        <p>
          O teste ficará disponível para
          <span class="text-primary font-bold">{{ classe.Name }}</span
          >. Você poderá cancelar a qualquer momento.
        </p>
      </ModalConfirm>
      <ModalConfirm
        v-model="confirmReEnableIsOpen"
        :callback-confirm="enableItem"
        label-confirm="Reaplicar teste"
        :busy="loadingAction"
      >
        <h4>Tem certeza que deseja reaplicar?</h4>
        <p>
          O teste ficará disponível novamente para
          <span class="text-primary font-bold">{{ classe.Name }}</span
          >. Você poderá cancelar a qualquer momento.
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
          O teste será cancelado e não estará mais disponível para
          <span class="text-primary font-bold">{{ classe.Name }}</span
          >.
        </p>
      </ModalConfirm>

      <b-modal
        ref="detailsModal"
        :visible="detailsIsOpen"
        hide-footer
        size="lg"
        no-close-on-backdrop
        centered
        static
        title="Detalhes do teste"
        header-bg-variant="light-primary"
        @close="detailsIsOpen = false"
      >
        <ReadingMeterDetails v-if="detailsIsOpen" :id="currentItem.id" />
      </b-modal>
    </b-col>
  </b-row>
</template>

<script setup>
import ReadingMeterFilter from './ReadingMeterFilter.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTable from '@/components/table/ListTable.vue'
import { getReadingMeterStatusEnum } from '@/consts/ReadingMeterEnum.js'
import { getVariantByRule } from '@/consts/legends/index.js'
import { progressLegend } from '@/consts/legends/progressEnum.js'
import { formatNumber } from '@/filters/filters'
import router from '@/router'
import { enableReading, cancelReading } from '@/services/shared/readingMeter/readingMeter.service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import ReadingMeterDetails from '@/views/pages/reading-meter/list/ReadingMeterDetails.vue'
import { ref, computed, watch } from 'vue'
import { useToast } from 'vue-toastification/composition'

const { classe } = useFilters()

const toast = useToast()
const refList = ref(null)

const pagination = computed(() => store.getters['ReadingMeterModule/pagination'])
const totalData = computed(() => pagination.value.totalData)
const readings = computed(() => store.getters['ReadingMeterModule/readings'])
const loading = computed(() => store.getters['ReadingMeterModule/loading'])
const schoolYear = computed(() => store.getters['ReadingMeterModule/schoolYear'])
const status = computed(() => store.getters['ReadingMeterModule/status'])
const tableColumns = [
  {
    key: 'name',
    label: 'Teste',
  },
  {
    key: 'students',
    label: 'TOTAL DE ALUNOS',
    formatter: value => formatNumber(value),
  },
  {
    key: 'serieName',
    label: 'Ano Escolar',
  },
  {
    key: 'progress',
    label: 'PROGRESSO DA TURMA',
    tooltip:
      'Percentual de testes cumpridos dividido pela quantidade de testes disponibilizados.',
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'actions',
    label: 'AÇÕES',
    thStyle: { width: '120px' },
  },
]

const tableActions = [
  {
    icon: 'disabled_by_default',
    tooltip: () => {
      return 'Cancelar aplicação'
    },
    isShow: data => data.status === 2,
    isEnabled: data => data.status === 2,
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
    isShow: data => data.status === 3 || data.status === 4,
    isEnabled: data => data.status === 3 || data.status === 4,
    color: 'text-success',
    action: data => {
      prepareReEnableItem(data)
    },
  },
  {
    icon: 'task_alt',
    tooltip: (data, isEnabled) => {
      return isEnabled
        ? 'Aplicar teste'
        : 'Esta função não está disponível, pois o teste está em andamento.'
    },
    isShow: data => data.status === 1,
    isEnabled: data => data.status === 1,
    color: 'text-success',
    action: data => {
      prepareEnableItem(data)
    },
  },
  {
    icon: 'pie_chart',
    tooltip: (data, isEnabled) => {
      return isEnabled
        ? 'Relatórios'
        : 'Esta função não está disponível, pois o teste está desabilitado.'
    },
    isShow: () => true,
    isEnabled: data => data.status !== 1,
    color: 'text-primary',
    action: data => {
      router.push({
        name: 'readingMeterTest',
        params: {
          testId: data.id,
          classId: classe.value.ClassId,
        },
      })
    },
  },
  {
    icon: 'visibility',
    tooltip: () => {
      return 'Ver detalhes'
    },
    isShow: () => true,
    isEnabled: () => true,
    color: 'text-primary',
    action: data => {
      openDetails(data)
    },
  },
]

const currentItem = ref({})
const loadingAction = ref(false)

const confirmEnableIsOpen = ref(false)
const prepareEnableItem = data => {
  currentItem.value = data
  confirmEnableIsOpen.value = true
}

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

const details = ref({
  referenceWords: [],
  type: 1,
})

const enableItem = async () => {
  loadingAction.value = true
  const { id } = currentItem.value

  try {
    const res = await enableReading({
      readingFluencyTestId: id,
      classId: classe.value.ClassId,
    })

    if (res.status === 200) {
      toast({
        component: Toast,
        props: {
          title: 'Teste aplicado com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
      store.dispatch('ReadingMeterModule/fetchData')
    }
  } finally {
    currentItem.value = {}
    confirmEnableIsOpen.value = false
    confirmReEnableIsOpen.value = false
    loadingAction.value = false
  }
}

const cancelItem = async () => {
  loadingAction.value = true
  const { id } = currentItem.value

  try {
    const res = await cancelReading({
      readingFluencyTestId: id,
      classId: classe.value.ClassId,
    })
    if (res.status === 200) {
      toast({
        component: Toast,
        props: {
          title: 'Aplicação cancelada com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
      store.dispatch('ReadingMeterModule/fetchData')
    }
  } finally {
    currentItem.value = {}
    confirmCancelIsOpen.value = false
    loadingAction.value = false
  }
}

const bookImgConfig = {
  blank: true,
  blankColor: '#bbb',
  width: 41,
  height: 54,
}

const sortEnum = {
  name: 0,
  serieName: 1,
  students: 2,
  progress: 3,
  status: 4,
}

const changePage = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('ReadingMeterModule/setParams', {
    Search: searchQuery,
    OrderBy: sortEnum[sortBy.value],
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
    ClassId: classe.value.ClassId,
  })
  store.dispatch('ReadingMeterModule/fetchData')
}

store.commit('ReadingMeterModule/reset')

watch([classe], () => {
  store.commit('ReadingMeterModule/setSchoolYear', {
    id: classe.value.SerieId,
    name: classe.value.SerieName,
  })
})

watch([schoolYear, status], () => {
  store.commit('ReadingMeterModule/setParams', {
    Search: '',
    OrderBy: null,
    Ascending: true,
    Page: 1,
    ClassId: classe.value.ClassId,
  })

  if (refList.value) refList.value.resetPage()

  store.dispatch('ReadingMeterModule/fetchData')
})

const getColorsEnum = value => {
  return getVariantByRule(value, 'progress')
}

const legends = [progressLegend]
</script>