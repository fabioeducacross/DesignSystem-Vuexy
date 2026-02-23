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
              `<div class='text-left'>Não enviada: A avaliação nunca foi enviada aos alunos. Você poderá enviá-la a qualquer momento.<br /><br />
                  Para iniciar: A avaliação ainda não está no período de duração.<br /><br />
                  Em andamento: A avaliação está em andamento nas escolas.<br /><br />
                  Pausada: A avaliação já foi enviada pelo menos 1 vez, mas está indisponível temporariamente. Você poderá enviá-la novamente a qualquer momento.<br /><br />
                  Finalizada: O período de duração da avaliação acabou.<br /><br />
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
        <b-badge pill :variant="`light-${StatusEnum[item.status].variant}`" class="">
          {{ StatusEnum[item.status].label }}
        </b-badge>
      </template>

      <template #cell(startDate)="{ item }">
        <div class="text-nowrap">
          {{ item.startDate | formattedDate }}
        </div>
      </template>
      <template #cell(endDate)="{ item }">
        <div class="text-nowrap">
          {{ item.endDate | formattedDate }}
        </div>
      </template>
      <template #cell(progress)="{ value }">
        <div>
          <ProgressBarHorizontalV2
            show-values
            height="12px"
            :value="value.students"
            :max="value.totalStudents"
            enum="progress"
            values-divisor=" de "
          >
            <template v-slot:description>&nbsp;alunos</template>
          </ProgressBarHorizontalV2>
        </div>
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center justify-content-end gap-3">
          <span
            v-for="(action, index) in evaluationActions"
            v-show="action.show(item)"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip(action.isEnabled(item), item)"
            :class="
              action.isEnabled(item)
                ? `${action.color(item)} cursor-pointer`
                : 'cursor-not-allowed text-muted'
            "
            class="material-symbols-outlined"
            @click="action.isEnabled(item) ? action.action(item) : null"
          >
            {{ action.icon(item) }}
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
    <QuestionsListDetail
      v-model="openModalDetails"
      :evaluation-id="evaluationId"
      :subject-id="subject.id"
      :serie-id="serieId"
      :cancelled-evaluation="StatusEnum[0].value === evaluationStatus"
      @download="openDownload"
    />
    <b-modal
      v-if="selectedEvaluation"
      ref="toggleEnableModal"
      v-model="showEnableModal"
      hide-footer
      centered
      size="md"
      :title="
        selectedEvaluation.sendAction === StatusEvaluationButtonEnum.Send
          ? 'Enviar avaliação'
          : 'Pausar avaliação'
      "
      no-close-on-backdrop
      header-bg-variant="light-primary"
      @close="closeEnableModal"
    >
      <div>
        <div class="text-center px-lg-4 mb-2 d-flex flex-column gap-3">
          <span
            class="material-symbols-outlined mb-1"
            :class="
              selectedEvaluation.sendAction === StatusEvaluationButtonEnum.Send
                ? 'text-primary'
                : 'text-danger'
            "
            style="font-size: 63px"
            :style="{
              transform:
                selectedEvaluation.sendAction === StatusEvaluationButtonEnum.Send
                  ? 'rotate(-45deg)'
                  : 'rotate(0deg)',
            }"
          >
            {{
              selectedEvaluation.sendAction === StatusEvaluationButtonEnum.Send
                ? 'send'
                : 'pause_circle'
            }}
          </span>
          <h3>
            {{
              selectedEvaluation.sendAction === StatusEvaluationButtonEnum.Send
                ? 'Tudo pronto para começar!'
                : 'Avaliação será pausada'
            }}
          </h3>
          <span>{{
            selectedEvaluation.sendAction === StatusEvaluationButtonEnum.Send
              ? `Assim que confirmar, a avaliação será iniciada automaticamente para a turma
            selecionada. Os estudantes verão o novo desafio disponível na área deles.`
              : `Assim que confirmar, a avaliação será pausada automaticamente para a turma
            selecionada. Os estudantes não verão o desafio na área deles.`
          }}</span>
        </div>
        <b-row class="justify-content-center gap-1">
          <b-col cols="12" md="5">
            <b-button class="w-100" variant="outline-primary" @click="closeEnableModal">
              Cancelar
            </b-button>
          </b-col>

          <b-col cols="12" md="5">
            <b-button
              class="w-100"
              variant="primary"
              :disabled="busy"
              @click="toggleActivateEvaluation"
            >
              <b-spinner v-show="busy" small variant="light" class="mr-50" />
              {{
                selectedEvaluation.sendAction === StatusEvaluationButtonEnum.Send
                  ? 'Enviar'
                  : 'Pausar'
              }}
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </section>
</template>

<script setup>
import EvaluationsListFilter from './EvaluationsListFilter.vue'
import QuestionsListDetail from '@/components/evaluations/questionsListDetail/QuestionsListDetail.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import subject from '@/components/subjects/subjects.vue'
import ListTable from '@/components/table/ListTable.vue'
import { StatusEnum, EEvaluationActiveStatus } from '@/consts/evaluationsEnum.js'
import { ACTION, PERMISSION } from '@/consts/permissions.js'
import router from '@/router'
import {
  getEvaluationsV2,
  toggleEvaluationClass,
} from '@/services/shared/evaluations/Evaluation.Service'
import useFilters from '@/store/filters/useFilters.js'
import EvaluationCard from '@/views/pages/admin-context/evaluations/components/EvaluationCard.vue'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { getCurrentInstance, ref, watch } from 'vue'

// Props
const props = defineProps({
  filters: {
    type: Object,
    default: () => {},
  },
})

const StatusEvaluationButtonEnum = {
  None: 0,
  Send: 1,
  Pause: 2,
}

const vm = getCurrentInstance().proxy
const listTable = ref(null)

const { classe, subject: subjectFilter } = useFilters()
const busy = ref(false)
const serieId = ref(classe.value.SerieId)
const loading = ref(false)
const openModalDetails = ref(false)
const showEnableModal = ref(false)
const selectedEvaluation = ref(null)

const tableColumns = [
  { key: 'evaluationName', label: 'Avaliação', sortable: true },
  { key: 'startDate', label: 'Início', sortable: true },
  { key: 'endDate', label: 'Fim', sortable: true },
  { key: 'progress', label: 'Progresso' },
  { key: 'status', label: 'Status', sortable: false },
  { key: 'actions', label: 'Ações', sortable: false },
]

const evaluationActions = [
  {
    icon: data =>
      data.sendAction === StatusEvaluationButtonEnum.Send ? 'send' : 'pause_circle',
    tooltip: (isEnabled, data) => {
      return data.sendAction === StatusEvaluationButtonEnum.Send
        ? 'Enviar Avaliação'
        : 'Pausar Avaliação'
    },
    show: data => {
      const sendAction = data.sendAction
      return (
        sendAction === StatusEvaluationButtonEnum.Send ||
        sendAction === StatusEvaluationButtonEnum.Pause
      )
    },
    color: data =>
      data.sendAction === StatusEvaluationButtonEnum.Send ? 'text-success' : 'text-danger',
    isEnabled: () => true,
    action: data => {
      openEnableModal(data)
    },
  },
  {
    icon: () => 'visibility',
    tooltip: () => 'Ver Detalhes',
    isEnabled: data => enableAction([0, 3, 4], data),
    color: () => 'text-primary',
    show: () => vm.$can(ACTION.READ, PERMISSION.GENERAL.BETA_FEATURES),
    action: data => {
      openDetails(data.evaluationId, data.status)
    },
  },
  {
    icon: () => 'download',
    tooltip: isEnabled =>
      isEnabled ? 'Baixar Avaliação' : 'Ação Bloqueada, pois a Avaliação foi cancelada',
    isEnabled: data => enableAction([1, 2, 3, 4], data),
    color: () => 'text-primary',
    show: () => vm.$can(ACTION.READ, PERMISSION.GENERAL.BETA_FEATURES),
    action: data => {
      openDownload(data.evaluationId)
    },
  },
  {
    icon: () => 'rule',
    tooltip: isEnabled =>
      isEnabled ? 'Gabaritos' : 'A ação será liberada quando a avaliação começar',
    isEnabled: data =>
      enableAction(
        [
          EEvaluationActiveStatus.Canceled,
          EEvaluationActiveStatus.InProgress,
          EEvaluationActiveStatus.Finished,
        ],
        data,
      ),
    color: () => 'text-primary',
    show: () => vm.$can(ACTION.READ, PERMISSION.GENERAL.BETA_FEATURES),
    action: data => {
      router.push({
        name: 'evaluationsAnswerTeacher',
        params: {
          evaluationId: data.evaluationId,
        },
      })
    },
  },
  {
    icon: () => 'trending_up',
    tooltip: () => 'Relatório de andamento',
    isEnabled: data =>
      enableAction(
        [
          EEvaluationActiveStatus.Canceled,
          EEvaluationActiveStatus.InProgress,
          EEvaluationActiveStatus.Finished,
        ],
        data,
      ),
    color: () => 'text-primary',
    show: () => true,
    action: data => {
      openReport(data.evaluationId)
    },
  },
  {
    icon: () => 'pie_chart',
    tooltip: () => 'Relatório de resultados',
    isEnabled: data =>
      enableAction(
        [EEvaluationActiveStatus.InProgress, EEvaluationActiveStatus.Finished],
        data,
      ),
    color: () => 'text-primary',
    show: () => true,
    action: data => {
      openTCT(data.evaluationId)
    },
  },
]

const openEnableModal = evaluation => {
  selectedEvaluation.value = evaluation
  showEnableModal.value = true
}

const closeEnableModal = () => {
  showEnableModal.value = false
  selectedEvaluation.value = null
}

const toggleActivateEvaluation = () => {
  busy.value = true
  toggleEvaluationClass(selectedEvaluation.value.evaluationId, params.value.ClassId)
    .then(() => {
      vm.$toast({
        component: Toast,
        props: {
          title:
            selectedEvaluation.value.sendAction === StatusEvaluationButtonEnum.Send
              ? 'Avaliação enviada com sucesso'
              : 'Avaliação pausada com sucesso',
          text:
            selectedEvaluation.value.sendAction === StatusEvaluationButtonEnum.Send
              ? 'Avaliação enviada — os estudantes da turma já têm acesso. Você pode acompanhar o andamento nesta tela.'
              : 'Avaliação pausada — os estudantes da turma não têm mais acesso à avaliação.',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
      fetchData()
    })
    .finally(() => {
      busy.value = false
      closeEnableModal()
    })
}

const evaluationId = ref(null)
const evaluationStatus = ref(null)

const openDetails = (id, status) => {
  evaluationId.value = id
  evaluationStatus.value = status
  openModalDetails.value = true
}

const dataTable = ref([])
const totalData = ref(0)

const params = ref({
  Page: 1,
  pageSize: 10,
  OrderBy: 0,
  Ascending: 'true',
  Search: '',
  Status: null,
  SubjectId: subjectFilter.value.id,
  ClassId: classe.value.ClassId,
})

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  params.value = {
    Page: currentPage,
    PageSize: perPage,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Search: searchQuery,
    Status: props.filters.status,
    SubjectId: subjectFilter.value.id,
    ClassId: classe.value.ClassId,
  }
  fetchData()
}

const now = new Date()

const isDataBefore = dateValue => {
  const data = new Date(dateValue)
  return data < now
}

const enableAction = (actionStatus, { status, startDate }) =>
  actionStatus.includes(status) || (status === 2 && isDataBefore(startDate))

const openReport = evaluationId => {
  router.push({
    path: `/teacher/evaluations/${evaluationId}/students`,
  })
}

const openDownload = evaluationId => {
  router.push({
    name: 'evaluationDownload',
    query: {
      id: evaluationId,
      classId: classe.value.ClassId,
    },
  })
}

const openTCT = evaluationId => {
  router.push({
    name: 'evaluationsTCTListStudentsTeacher',
    params: {
      evaluationId,
    },
  })
}

const fetchData = () => {
  loading.value = true
  getEvaluationsV2(params.value)
    .then(({ data }) => {
      dataTable.value = data.data
      totalData.value = data.total
    })
    .finally(() => {
      loading.value = false
    })
}

watch(
  () => props.filters,
  () => {
    params.value.Status = props.filters.status != null ? `${props.filters.status}` : null
    params.value.SubjectId = subjectFilter.value.id
    params.value.ClassId = classe.value.ClassId
    params.value.Page = 1
    listTable.value.resetPage()
    fetchData()
  },
)

</script>

<style lang="scss" scoped>
.material-symbols-outlined.head-icon-info {
  font-size: 16px;
}
</style>