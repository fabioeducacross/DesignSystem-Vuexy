<template>
  <section>
    <ListTable
      ref="listTable"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="Pesquisar por treino"
      :loading="loading"
      @change="changeListTable"
    >
      <!-- header -->
      <template #head(performance)="item">
        <div class="d-flex align-items-center gap 1">
          {{ item.label }}
          <span
            v-b-tooltip.hover.top="
              `Calcula-se desempenho com base nos erros e acertos dos alunos em seus desafios (jogadas).`
            "
            class="material-symbols-outlined ml-1 head-icon-info"
          >
            info
          </span>
        </div>
      </template>

      <!-- cells -->
      <template #cell(name)="{ item }">
        <span class="font-bold">
          {{ item.guideName }}
        </span>
      </template>
      <template #cell(knowledgeAxesNames)="{ item }">
        <b-badge v-b-tooltip.html="formatAsList(item.knowledgeAxesNames)" variant="primary" pill>
          Passe o mouse
        </b-badge>
      </template>
      <template #cell(totalActivities)="{ item }">
        <span>
          {{ item.totalActivities | formatNumber }}
        </span>
      </template>
      <template #cell(performance)="{ item }">
        <SemaphoreStatus
          :status-enum="setRangeColor(formatDecimalPlace(item.performance))"
          :has-tooltip="formatDecimalPlace(item.performance) === 0"
          tooltip-text="Treino não iniciado"
        >
          <span>{{ item.performance ? item.performance : 0 | formatNumber }}%</span>
        </SemaphoreStatus>
      </template>
      <template #cell(status)="{ item }">
        <b-badge :variant="statusEnum[item.status].variant" pill>
          {{ statusEnum[item.status].label }}
        </b-badge>
      </template>
      <template #cell(actions)="{ item }">
        <div class="d-flex align-items-center gap-4">
          <span
            class="material-symbols-outlined cursor-pointer text-primary"
            @click="openModal(item)"
          >
            visibility
          </span>
          <b-button
            variant="primary"
            :disabled="statusEnum[item.status].buttonDisabled"
            @click.stop="useTrain(item.guideId, item.status, item.guideName)"
          >
            <span class="whitespace-nowrap">Usar treino</span>
          </b-button>
        </div>
      </template>
    </ListTable>

    <Legend />

    <b-modal ref="refModalMissionDetail" size="lg" scrollable hide-footer>
      <education-system-mission-detail
        :id="selectedGuide.guideId"
        :mission-info="selectedGuide"
        @close="closeModal()"
      />
    </b-modal>

    <b-modal ref="refActivateMisisonModal" centered no-close-on-backdrop hide-footer hide-header>
      <section v-if="selectedGuideStatus === 2">
        <h1>Reiniciar treino ao Aluno</h1>
        <p>
          O treino <span class="text-primary font-extrabold">{{ selectedGuideName }}</span> já foi
          finalizado, tem certeza que deseja atribuí-lo novamente?
        </p>
        <section class="d-flex justify-content-center gap-5">
          <b-button variant="outline-danger" @click="closeActivateMissionModal">
            Cancelar
          </b-button>
          <b-button variant="primary" :disabled="loadingButton" @click="activateMission">
            Sim, usar treino <b-spinner v-show="loadingButton" variant="light" small />
          </b-button>
        </section>
      </section>

      <section v-else class="text-center">
        <h1>Atribuir treino ao Aluno</h1>
        <p>
          Você realmente deseja atribuir o treino
          <span class="text-primary font-extrabold">{{ selectedGuideName }}</span
          >?
        </p>
        <section class="d-flex justify-content-center gap-5">
          <b-button variant="outline-danger" @click="closeActivateMissionModal">
            Cancelar
          </b-button>
          <b-button variant="primary" :disabled="loadingButton" @click="activateMission">
            Sim, usar treino <b-spinner v-show="loadingButton" variant="light" small />
          </b-button>
        </section>
      </section>
    </b-modal>
  </section>
</template>

<script setup>
import EducationSystemMissionDetail from '../shared/modals/EducationSystemMissionDetail.vue'
import Legend from './Legend.vue'
import ListTable from '@/components/table/ListTable.vue'
import familyMissionsLegendEnum from '@/consts/familyMissionsLegendEnum.js'
import { formatNumber } from '@/filters/filters'
import {
  activeMission,
  getMissions,
} from '@/services/shared/student-family-mission/studentFamilyMission.service.js'
import { formatDecimalPlace } from '@/utils/number.js'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { ref } from 'vue'

const tableColumns = [
  { key: 'name', sortable: true, label: 'NOME DO TREINO' },
  { key: 'knowledgeAxesNames', label: 'UNIDADE TEMÁTICA/CAMPO DE ATUAÇÃO' },
  { key: 'totalActivities', label: 'Número de jogos' },
  { key: 'performance', sortable: true, label: 'DESEMPENHO' },
  { key: 'status', sortable: true, label: 'STATUS' },
  { key: 'actions', label: 'AÇÕES' },
]

const statusEnum = {
  0: {
    label: 'Disponível',
    variant: 'light-info',
    buttonDisabled: false,
  },
  1: {
    label: 'Em andamento',
    variant: 'light-success',
    buttonDisabled: true,
  },
  2: {
    label: 'Finalizada',
    variant: 'light-primary',
    buttonDisabled: true,
  },
}

const actions = [
  {
    icon: 'trending_up',
    tooltip: () => 'Ver relatório',
    action: () => {},
  },
]

const params = ref({
  Page: 1,
  pageSize: 10,
  OrderBy: 0,
  Ascending: 'true',
  Search: '',
})
const dataTable = ref([])
const totalData = ref(0)
const loading = ref(false)
const refActivateMisisonModal = ref(null)
const selectedGuideId = ref(null)
const selectedGuideStatus = ref(null)
const selectedGuideName = ref(null)
const loadingButton = ref(false)

const fetchData = () => {
  loading.value = true
  getMissions(params.value)
    .then(({ data }) => {
      dataTable.value = data.data
      totalData.value = data.total
    })
    .finally(() => {
      loading.value = false
    })
}

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  params.value = {
    Page: currentPage,
    PageSize: perPage,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Search: searchQuery,
  }

  fetchData()
}

const setRangeColor = value => {
  let variant = {}

  switch (true) {
    case value >= 80:
      variant = familyMissionsLegendEnum[1]
      break
    case value >= 50:
      variant = familyMissionsLegendEnum[2]
      break
    case value <= 49:
      variant = familyMissionsLegendEnum[3]
      break
    default:
      variant = familyMissionsLegendEnum[3]
      break
  }

  return variant
}

const useTrain = (id, status, name) => {
  selectedGuideId.value = id
  selectedGuideStatus.value = status
  selectedGuideName.value = name
  refActivateMisisonModal.value.show()
}

const closeActivateMissionModal = () => {
  refActivateMisisonModal.value.hide()
}

const activateMission = () => {
  const guideId = selectedGuideId.value
  loadingButton.value = true

  activeMission(guideId)
    .then(() => {
      closeActivateMissionModal()
    })
    .finally(() => {
      loadingButton.value = false
      fetchData()
    })
}

const formatAsList = arr => {
  if (!Array.isArray(arr)) return ''

  // return a html list
  return `${arr.reduce((acc, item) => {
    return `${acc}<li>${item}</li>`
  }, '<ul>')}</ul>`
}

fetchData()

const selectedGuide = ref(0)
const refModalMissionDetail = ref(null)

const openModal = item => {
  refModalMissionDetail.value.show()
  selectedGuide.value = item
}

const closeModal = () => {
  refModalMissionDetail.value.hide()
}
</script>