<template>
  <SimpleTab>
    <b-card>
      <b-form class="filters-form" autocomplete="off">
        <b-col cols="12" lg="4">
          <SelectSubject />
        </b-col>
        <b-col cols="12" lg="4">
          <b-form-group class="filters-form-items" label="Periodo" label-for="month">
            <ESelect
              v-model="selectedMonth"
              label="name"
              track-by="id"
              placeholder="Selecione um periodo"
              :options="months"
              :clearable="false"
              @change="setMonth"
            >
              <template #noOptions> Nenhum mes encontrado </template>
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col cols="12" lg="4">
          <b-form-group class="filters-form-items" label="Status" label-for="situation">
            <ESelect
              v-model="selectedSituation"
              label="name"
              track-by="id"
              placeholder="Selecione um status"
              :options="situation"
              :clearable="false"
              @change="setSituation"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <div
            v-if="$can(ACTION.READ, PERMISSION.GENERAL.BETA_FEATURES)"
            class="mt-1 w-100 d-flex flex-row justify-content-start gap-2 filters-form-items"
          >
            <span>Escolha o tipo de atividade:</span>
            <div class="d-flex align-items-center">
              <b-form-radio
                v-model="guideApplication"
                name="application"
                :value="1"
                class="radio-inline"
                @change="handleGetData"
              >
                <span class="text-body">Missoes da Escola</span>
              </b-form-radio>
            </div>
            <div class="d-flex align-items-center">
              <b-form-radio
                v-model="guideApplication"
                name="application"
                :value="2"
                class="radio-inline"
                @change="handleGetData"
              >
                <span class="text-body">Missoes para casa</span>
              </b-form-radio>
            </div>
          </div>
        </b-col>
      </b-form>
    </b-card>
    <ListTable
      :loading="busy"
      :table-columns="tableColumns"
      :data-table="missionList"
      :total-data="rows"
      search-placeholder="Pesquisar por missao"
      :per-page-default="filters.pageSize"
      @change="changeListTable"
    >
      <template #cell(guideName)="{ value }">
        <span class="font-bold">{{ value }}</span>
      </template>

      <template #cell(createdBy)="{ item }">
        <div class="d-flex align-items-center">
          <b-img-lazy v-b-tooltip="item.createdBy" v-bind="userProps" :src="item.imageUrl" />
        </div>
      </template>

      <template #cell(duration)="{ item }">
        <span v-if="item.start && item.expiration">
          {{ formatDate(item.start) }} - {{ formatDate(item.expiration) }}
        </span>
      </template>

      <template #cell(students)="{ value }">
        {{ formatNumber(value) }}
      </template>

      <template #cell(situation)="{ item }">
        <MissionStatus :content="item" />
      </template>

      <template #cell(progress)="{ value }">
        <ProgressBarHorizontalV2
          height="12px"
          :value="value"
          :get-variant="getProgressEnum"
          reverse
        />
      </template>

      <template #cell(rankingEnabled)="{ value }">
        {{ value ? 'Ativo' : 'Desabilitado' }}
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center justify-content-start gap-3">
          <span
            v-b-tooltip.hover.top="'Relatorio da Missao'"
            class="material-symbols-outlined text-primary cursor-pointer"
            @click="openReport(item)"
          >
            pie_chart
          </span>
        </div>
      </template>
    </ListTable>
  </SimpleTab>
</template>

<script setup>
import MissionStatus from '../../shared/table-columns-components/MissionStatus.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ESelect from '@/components/selects/ESelect.vue'
import SimpleTab from '@/components/tab/SimpleTab.vue'
import ListTable from '@/components/table/ListTable.vue'
import { getVariantByRule } from '@/consts/legends'
import { PERMISSION, ACTION } from '@/consts/permissions'
import { formatNumber } from '@/filters/filters'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import { getMissionsByClass } from '@/services/shared/missions/Missions.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { getMonthList } from '@/utils/date.js'
import { formatDate as formatDateUtil } from '@/utils/utils'
import { ref, getCurrentInstance, computed, watch } from 'vue'

const { classe, institution, subject } = useFilters()
const vm = getCurrentInstance().proxy

const routeParams = router.currentRoute?.params || vm.$route?.params || {}
const classIdParam = routeParams.classId || routeParams.id
const institutionIdParam = routeParams.institutionId

classe.value = { ClassId: classIdParam }
institution.value = { id: institutionIdParam }
const className = sessionStorage.getItem('className')

const isNetworkManager = store.getters.accessRole === 'NetworkManager'

const busy = ref(true)
const guideApplication = ref(vm.$can(ACTION.READ, PERMISSION.GENERAL.BETA_FEATURES) ? 1 : 0)
const months = getMonthList()
const monthSelected = store.state.adminContext.monthSelected
  ? store.state.adminContext.monthSelected
  : 1

const filters = ref({
  pageSize: 10,
  page: 1,
  situation: { id: null, name: 'Todos' },
  month: months.find(m => m.id === monthSelected) || months[0],
  OrderBy: null,
  Ascending: 'true',
  guideName: '',
})

const searchTerm = ref('')

const userProps = {
  blank: true,
  width: 45,
  height: 45,
  blankColor: '#bbb',
  rounded: 'circle',
}

const tableColumns = [
  { key: 'guideName', label: 'Missao', sortable: true },
  { key: 'createdBy', label: 'Autor', sortable: false },
  { key: 'duration', label: 'Periodo', sortable: false },
  { key: 'students', label: 'Alunos', sortable: true },
  { key: 'situation', label: 'Status', sortable: false },
  { key: 'progress', label: 'Progresso da turma', sortable: false },
  { key: 'rankingEnabled', label: 'Ranking', sortable: false },
  { key: 'actions', label: 'Acoes', sortable: false },
]

const missionList = ref([])
const rows = ref(0)

const situation = [
  {
    id: null,
    name: 'Todos',
  },
  {
    id: 0,
    name: 'Nao enviada',
  },
  {
    id: 1,
    name: 'Nao iniciada',
  },
  {
    id: 2,
    name: 'Iniciada',
  },
  {
    id: 3,
    name: 'Finalizada',
  },
  {
    id: 4,
    name: 'Cancelada',
  },
]

const selectedMonth = computed({
  get: () => filters.value.month,
  set: val => {
    filters.value.month = val
  },
})

const selectedSituation = computed({
  get: () => filters.value.situation,
  set: val => {
    filters.value.situation = val
  },
})

const openReport = item => {
  if (isNetworkManager) {
    router.push({
      name: 'listReportMissionsDetailInstitution',
      params: {
        guideId: item.guideId,
        institutionId: institution.value.id,
      },
    })
  } else {
    router.push({
      name: 'listReportMissionsDetail',
      params: {
        guideId: item.guideId,
      },
    })
  }
}

const getSituationVariant = situationId => {
  const variants = {
    0: 'secondary',
    1: 'info',
    2: 'success',
    3: 'warning',
    4: 'danger',
  }
  return variants[situationId] || 'secondary'
}

const getSituationLabel = situationId => {
  const found = situation.find(s => s.id === situationId)
  return found?.name || 'Desconhecido'
}

const getProgressEnum = value => {
  return getVariantByRule(value, 'progress')
}

const formatDate = date => formatDateUtil(date)

const handleGetData = () => {
  const params = {
    month: filters.value.month?.id,
    subjectId: filters.value.subjectId,
    page: filters.value.page,
    PageSize: filters.value.pageSize,
    OrderBy: filters.value.OrderBy,
    guideName: filters.value.guideName,
    Ascending: filters.value.Ascending,
    Application: guideApplication.value,
    Situation: filters.value.situation?.id !== null ? `${filters.value.situation?.id}` : null,
    SubjectId: subject.value.id,
  }

  if (isNetworkManager) {
    params.institutionId = institution.value.id
  }

  if (searchTerm.value !== '') params.guideName = searchTerm.value

  busy.value = true

  getMissionsByClass(classe.value.ClassId, params)
    .then(response => {
      rows.value = response.data.total
      missionList.value = response.data.data
    })
    .finally(() => {
      busy.value = false
    })
}

const setGuideName = () => {
  filters.value.guideName = searchTerm.value
  filters.value.page = 1
  handleGetData()
}

const setMonth = value => {
  filters.value.month = value
  filters.value.page = 1
  handleGetData()
}

const setSituation = value => {
  filters.value.situation = value
  filters.value.page = 1
  handleGetData()
}

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  filters.value.page = currentPage
  filters.value.pageSize = perPage
  filters.value.OrderBy = sortBy || null
  filters.value.Ascending = sortBy ? `${!isSortDirDesc}` : 'true'
  filters.value.guideName = searchQuery || ''
  handleGetData()
}

watch(subject, () => {
  filters.value.page = 1
  handleGetData()
})

// Carrega os dados ao montar o componente
handleGetData()
</script>

<style lang="scss" scoped>
  .filters-form {
    display: flex;
    flex-wrap: wrap;
    align-content: stretch;
  }
</style>
