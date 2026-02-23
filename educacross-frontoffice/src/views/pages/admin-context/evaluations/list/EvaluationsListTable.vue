<template>
  <section>
    <ListTable
      ref="listTable"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="Pesquisar por avaliação"
      show-view-selection
      :loading="loading"
      @change="changeListTable"
    >
      <template #head(status)="item">
        <div class="d-flex align-items-center gap 1">
          {{ item.label }}
          <span
            v-b-tooltip.hover.top.html="
              `<div class='text-left'>Para ativar: A Escola ainda não ativou a avaliação.<br /><br />
                  Para iniciar: A avaliação ainda não está no período de duração.<br /><br />
                  Em andamento: A avaliação está em andamento nas Escolas.<br /><br />
                  Finalizada: O período de duração da avaliação acabou.<br /><br />a
                  Cancelada: A avaliação foi cancelada.</div>`
            "
            class="material-symbols-outlined ml-1 head-icon-info"
          >
            info
          </span>
        </div>
      </template>

      <template #cell(evaluationName)="{ item }">
        <div class="text-wrap d-flex gap-1" style="min-width: 200px">
          <subject
            v-for="(sId, index) in item.subjectsIds"
            :key="index"
            :subject-id="sId"
            :size="24"
          />
          <span class="align-text-top font-bold">{{ item.evaluationName }}</span>
        </div>
      </template>
      <template #cell(status)="{ item }">
        <b-badge pill :variant="StatusEnum[item.status].variant" class="">
          {{ StatusEnum[item.status].label }}
        </b-badge>
      </template>

      <template #cell(startDate)="{ item }">
        <div class="text-nowrap">
          {{ formattedDate(item.startDate) }}
        </div>
      </template>
      <template #cell(endDate)="{ item }">
        <div class="text-nowrap">
          {{ formattedDate(item.endDate) }}
        </div>
      </template>
      <template #cell(totalInstitutions)="{ value }">
        <div class="text-center">
          {{ formatNumber(value, 0) }}
        </div>
      </template>
      <template #cell(totalStudents)="{ value }">
        <div class="text-center">
          {{ formatNumber(value, 0) }}
        </div>
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center gap-3">
          <span
            v-for="(action, index) in evaluationActions"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip(item)"
            :class="
              action.isEnabled(item)
                ? 'text-primary cursor-pointer'
                : 'cursor-not-allowed text-muted'
            "
            class="material-symbols-outlined"
            @click="action.isEnabled(item) ? action.action(item) : null"
          >
            {{ action.icon() }}
          </span>
        </div>
      </template>

      <template v-slot:card="{ data }">
        <EvaluationCard
          :data="data"
          :evaluation-actions="evaluationActions"
          :enable-action="enableAction"
        />
      </template>
    </ListTable>
    <b-modal
      ref="enableModal"
      v-model="showEnableModal"
      hide-footer
      centered
      size="sm"
      title="Ativar avaliação digital"
      no-close-on-backdrop
      header-bg-variant="light-primary"
      @close="closeEnableModal"
    >
      <EvaluationsModalEnable
        v-if="selectedEvaluation"
        :evaluation="selectedEvaluation"
        @close-modal="closeEnableModal"
        @close-modal-success="closeEnableModalSuccess"
      />
    </b-modal>
  </section>
</template>

<script setup>
import EvaluationCard from '../components/EvaluationCard.vue'
import EvaluationsListFilter from './EvaluationsListFilter.vue'
import EvaluationsModalEnable from './EvaluationsModalEnable.vue'
import subject from '@/components/subjects/subjects.vue'
import ListTable from '@/components/table/ListTable.vue'
import { StatusEnum } from '@/consts/evaluationsEnum.js'
import { ACTION, PERMISSION } from '@/consts/permissions.js'
import { formatNumber, formattedDate } from '@/filters/filters'
import router from '@/router'
import { getEvaluations } from '@/services/shared/evaluations/Evaluation.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import { computed, ref, toRef, watch } from 'vue'

// Props
const props = defineProps({
  filters: {
    type: Object,
    default: () => ({}),
  },
})

// Refs
const listTable = ref(null)
const showEnableModal = ref(false)
const selectedEvaluation = ref(null)
const dataTable = ref([])
const totalData = ref(0)
const loading = ref(true)

// Filters prop reactivity
const filters = toRef(props, 'filters')

// Subject from filter store
const { subject: subjectFilter } = useFilters()

// User role
const isNetworkManager = store.getters.accessRole === 'NetworkManager'
const isCoordinator = store.getters.accessRole === 'Coordinator'
const isSecretariat = computed(() => store.getters.accessRole === 'Secretariat')

// Fields
const networkManagerFieldsOnly = ['totalInstitutions']

const fields = [
  { key: 'evaluationName', label: 'Nome da avaliação', sortable: true },
  { key: 'startDate', label: 'Início', sortable: true },
  { key: 'endDate', label: 'Fim', sortable: true },
  {
    key: 'totalInstitutions',
    label: 'ESCOLAS PARTICIPANTES',
    sortable: true,
  },
  {
    key: 'totalStudents',
    label: 'ALUNOS PARTICIPANTES',
    sortable: true,
  },
  { key: 'status', label: 'Status', sortable: false },
  { key: 'actions', label: 'Ações', sortable: false },
]

const tableColumns = computed(() => {
  if (isNetworkManager) {
    return fields
  }
  return fields.filter(field => !networkManagerFieldsOnly.includes(field.key))
})

// Evaluation actions
const enableAction = (actionStatus, { status, startDate }) =>
  actionStatus.includes(status) ||
  (status === 2 && isDataBefore(startDate)) ||
  (status === 1 && isNetworkManager)

const openReport = evaluationId => {
  if (isNetworkManager) {
    router.push({
      name: 'evaluationsInstutionsList',
      params: { evaluationId },
    })
  } else {
    router.push({
      name: 'evaluationsClassesList',
      params: { evaluationId },
    })
  }
}

const openTCT = item => {
  const { evaluationId } = item
  if (isNetworkManager) {
    if (item.analysisTCT) {
      router.push({
        name: 'evaluationsTCTInstutionsAnalysis',
        params: { evaluationId },
      })
      return
    }
    if (item.analysisTRI) {
      router.push({
        name: 'evaluationsTRIInstutions',
        params: { evaluationId },
      })
      return
    }
    router.push({
      name: 'evaluationsTCTInstutionsAbility',
      params: { evaluationId },
    })
  } else {
    if (item.analysisTCT) {
      router.push({
        name: 'evaluationsTCTClassAnalysis',
        params: { evaluationId },
      })
      return
    }
    if (item.analysisTRI) {
      router.push({
        name: 'evaluationsTRIClass',
        params: { evaluationId },
      })
      return
    }
    if (isCoordinator) {
      router.push({
        name: 'evaluationsResultClassQuestions',
        params: { evaluationId },
      })
      return
    }
    router.push({
      name: 'evaluationsTCTClassAbility',
      params: { evaluationId },
    })
  }
}

const openEnableModal = evaluation => {
  selectedEvaluation.value = evaluation
  showEnableModal.value = true
}

const closeEnableModal = () => {
  showEnableModal.value = false
  selectedEvaluation.value = null
}

const closeEnableModalSuccess = () => {
  closeEnableModal()
  fetchData()
}

const evaluationActions = [
  {
    icon: () => 'trending_up',
    tooltip: () => 'Relatório de andamento',
    isEnabled: data => enableAction([0, 3, 4], data),
    color: () => 'text-primary',
    show: () => true,
    action: data => {
      openReport(data.evaluationId)
    },
  },
  {
    icon: () => 'pie_chart',
    tooltip: () => 'Relatório de resultados',
    isEnabled: data => enableAction([3, 4], data),
    color: () => 'text-primary',
    show: () => true,
    action: data => {
      openTCT(data)
    },
  },
]

if (isSecretariat.value) {
  evaluationActions.push({
    icon: () => 'task_alt',
    tooltip: () => 'Ativar Avaliação digital',
    isEnabled: data => data.status === 1,
    color: () => 'text-primary',
    show: () => true,
    action: data => {
      openEnableModal(data)
    },
  })
}

// Table params
const params = ref({
  Page: 1,
  pageSize: 10,
  OrderBy: 0,
  Ascending: 'true',
  Search: '',
  Status: null,
  SubjectId: subjectFilter.value.id,
})

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  params.value = {
    Page: currentPage,
    PageSize: perPage,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Search: searchQuery,
    Status: filters.value.status,
    SubjectId: subjectFilter.value.id,
  }

  fetchData()
}

const now = new Date()

const isDataBefore = dateValue => {
  const data = new Date(dateValue)
  return data < now
}

const fetchData = () => {
  loading.value = true
  getEvaluations(params.value)
    .then(({ data }) => {
      dataTable.value = data.data
      totalData.value = data.total
    })
    .finally(() => {
      loading.value = false
    })
}

watch(filters, () => {
  params.value.Status = filters.value.status != null ? `${filters.value.status}` : null
  params.value.SubjectId = subjectFilter.value.id
  params.value.Page = 1

  listTable.value && listTable.value.resetPage()
  fetchData()
})

// Initial fetch
fetchData()
</script>

<style lang="scss" scoped>
.material-symbols-outlined.head-icon-info {
  font-size: 16px;
}
</style>