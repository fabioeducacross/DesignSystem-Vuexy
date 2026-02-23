<template>
  <section>
    <SimpleTab v-if="!$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)" />
    <b-card>
      <EventListFilter v-model="filter" :status-enum="EventStatusEnum" />
    </b-card>

    <ListTable
      ref="listTable"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="Pesquisar por evento"
      :loading="loading"
      show-view-selection
      @change="changeListTable"
    >
      <template #head(status)="item">
        <div class="d-flex align-items-center gap 1">
          {{ item.label }}
          <span
            v-b-tooltip.hover.top.html="
              `<div class='text-left'>Não enviado: O evento nunca foi enviado aos alunos. Você poderá enviá-lo a qualquer momento.<br /><br />
                  Para iniciar: O evento ainda não está no período de duração.<br /><br />
                  Em andamento: O evento está em andamento nas escolas.<br /><br />
                  Pausado: O evento já foi enviado pelo menos 1 vez, mas está indisponível temporariamente. Você poderá enviá-lo novamente a qualquer momento.<br /><br />
                  Finalizado: O período de duração do evento acabou.<br /><br />
                  Cancelado: O evento foi cancelado.</div>`
            "
            class="material-symbols-outlined ml-1 head-icon-info"
          >
            info
          </span>
        </div>
      </template>

      <template #cell(name)="{ item }">
        <div class="d-flex align-items-center">
          <b-avatar variant="primary" :src="item.imageUrl" class="mr-1" size="lg"></b-avatar>
          <span class="align-text-top text-wrap font-bold">{{ item.name }}</span>
        </div>
      </template>

      <template #cell(startDate)="{ item }">
        <span class="text-capitalize">
          {{ formatDate(item.startDate) }}
        </span>
      </template>
      <template #cell(endDate)="{ item }">
        <span class="text-capitalize">
          {{ formatDate(item.endDate) }}
        </span>
      </template>

      <template #cell(institutionsAmount)="{ item }">
        <div v-if="item.institutionsAmount">
          <span>{{ item.institutionsAmount | formatNumber }}</span>
        </div>
      </template>

      <template #cell(status)="data">
        <b-badge pill :variant="`light-${EventStatusEnum[data.item.status].variant}`">
          {{ EventStatusEnum[data.item.status].label }}
        </b-badge>
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center justify-content-end gap-3">
          <span
            v-for="(action, index) in actions"
            v-show="action.isShow(item)"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip(item)"
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
          <span
            :id="`inputWithClipboard${item.id}`"
            v-b-tooltip.hover.top="'Copiar link'"
            class="material-symbols-outlined"
            :class="
              enableCopy(item) ? 'text-primary cursor-pointer' : 'cursor-not-allowed text-muted'
            "
            :disabled="!enableCopy(item)"
            @click.stop="enableCopy(item) ? toClipboard(item) : false"
          >
            link
          </span>
        </div>
      </template>
      <template v-slot:card="{ data }">
        <EventListCard :data="data" :actions="actions" />
      </template>
    </ListTable>
    <b-tooltip
      custom-class="tooltip-container"
      :target="tooltipTarget"
      :show.sync="showTooltipFeedback"
      placement="top"
      triggers="click"
      variant="success"
    >
      Link copiado!
    </b-tooltip>

    <b-modal
      v-if="selectedEvent"
      ref="toggleEnableModal"
      v-model="showEnableModal"
      hide-footer
      centered
      size="md"
      :title="
        isTeacher
          ? selectedEvent.sendAction === StatusEventButtonSendEnum.Send
            ? 'Enviar evento'
            : 'Pausar evento'
          : 'Ativar evento'
      "
      no-close-on-backdrop
      header-bg-variant="light-primary"
      @close="closeEnableModal"
    >
      <div v-if="isTeacher">
        <div class="text-center px-lg-4 mb-2 d-flex flex-column gap-3">
          <span
            class="material-symbols-outlined mb-1"
            :class="
              selectedEvent.sendAction === StatusEventButtonSendEnum.Send
                ? 'text-primary'
                : 'text-danger'
            "
            style="font-size: 63px"
            :style="{
              transform:
                selectedEvent.sendAction === StatusEventButtonSendEnum.Send
                  ? 'rotate(-45deg)'
                  : 'rotate(0deg)',
            }"
          >
            {{
              selectedEvent.sendAction === StatusEventButtonSendEnum.Send ? 'send' : 'pause_circle'
            }}
          </span>
          <h3>
            {{
              selectedEvent.sendAction === StatusEventButtonSendEnum.Send
                ? 'Tudo pronto para começar!'
                : 'Evento será pausado'
            }}
          </h3>
          <span>{{
            selectedEvent.sendAction === StatusEventButtonSendEnum.Send
              ? `Assim que confirmar, o evento será iniciado automaticamente para a turma
            selecionada. Os estudantes verão o novo evento disponível na área deles.`
              : `Assim que confirmar, o evento será pausado automaticamente para a turma
            selecionada. Os estudantes não verão o evento na área deles.`
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
              @click="toggleActivateEvents"
            >
              <b-spinner v-show="busy" small variant="light" class="mr-50" />
              {{
                selectedEvent.sendAction === StatusEventButtonSendEnum.Send ? 'Enviar' : 'Pausar'
              }}
            </b-button>
          </b-col>
        </b-row>
      </div>
      <EventModalEnable
        v-else
        :event="selectedEvent"
        @close-modal="closeEnableModal"
        @close-modal-success="closeEnableModalSuccess"
      />
    </b-modal>
  </section>
</template>

<script setup>
import EventListCard from './EventListCard.vue'
import EventListFilter from './EventListFilter.vue'
import EventModalEnable from './EventModalEnable.vue'
import SimpleTab from '@/components/tab/SimpleTab.vue'
import ListTable from '@/components/table/ListTable.vue'
import { EventStatusEnum } from '@/consts/StatusEnums'
import EventStatus from '@/consts/eventsEnum.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { formatNumber } from '@/filters/filters'
import '@/libs/clipboard'
import router from '@/router'
import { getEventsActiveReport, toggleEventsClass } from '@/services/shared/events/Events.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import formatDate from '@/utils/date'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { getCurrentInstance, ref, watch, nextTick, computed } from 'vue'

store.dispatch('events/reset')
const { classe, subject } = useFilters()

const StatusEventButtonSendEnum = {
  None: 0,
  Send: 1,
  Pause: 2,
}

const institutionId = store.state.access.userData.InstitutionId
const listTable = ref(null)
const loading = ref(true)
const vm = getCurrentInstance().proxy

const isNetworkManager = store.getters.accessRole === 'NetworkManager'
const isTeacher = store.getters.accessRole === 'Teacher'

const isSecretariat = computed(() => store.getters.accessRole === 'Secretariat')

const showEnableModal = ref(false)
const selectedEvent = ref(null)
const busy = ref(false)

if (!isTeacher) {
  classe.value = {}
}

const baseColumns = [
  { key: 'name', sortable: true, label: 'NOME DO EVENTO' },
  { key: 'startDate', sortable: true, label: 'INÍCIO' },
  { key: 'endDate', sortable: true, label: 'FIM' },
  {
    key: 'studentsAmount',
    sortable: true,
    label: 'TOTAL DE ALUNOS',
    formatter: value => formatNumber(value),
  },
  { key: 'status', sortable: false, label: 'STATUS' },
  { key: 'actions', sortable: false, label: 'AÇÕES', thStyle: { width: '240px' } },
]

if (isNetworkManager) {
  baseColumns.splice(4, 0, {
    key: 'institutionsAmount',
    sortable: true,
    label: 'TOTAL DE ESCOLAS',
  })
}

const redirectToEventReport = eventId => {
  if (isNetworkManager) {
    router.push({
      name: 'eventReport',
      params: {
        eventId,
      },
    })
  } else if (isTeacher) {
    router.push({
      name: 'teacherEventClassReport',
      params: {
        eventId,
      },
    })
  } else {
    router.push({
      name: 'eventInstitutionNoId',
      params: {
        eventId,
      },
    })
  }
}

const openRanking = eventId => {
  if (isNetworkManager) {
    router.push({
      name: 'eventRankingInstitutionSchool',
      params: {
        eventId,
      },
    })
  } else {
    router.push({
      name: 'eventRankingStudents',
      params: {
        eventId,
      },
    })
  }
}

const openResultsReport = eventId => {
  if (isNetworkManager) {
    router.push({
      name: 'resultsReportNetworkManagerInstitutionsParticipation',
      params: {
        eventId,
      },
    })
  } else if (isTeacher) {
    router.push({
      name: 'teacherResultsReport',
      params: {
        eventId,
        institutionId,
      },
    })
  } else {
    router.push({
      name: 'resultsReportAdminClassesParticipation',
      params: {
        eventId,
        institutionId,
      },
    })
  }
}

const openIndividualReport = eventId => {
  router.push({
    name: isTeacher ? 'individualReportTeacher' : 'individualReport',
    params: {
      eventId,
      institutionId,
    },
  })
}

const actions = [
  {
    icon: () => 'trending_up',
    tooltip: () => 'Andamento do evento',
    isEnabled: () => true,
    isShow: () => true,
    color: () => 'text-primary',
    action: data => {
      redirectToEventReport(data.id)
    },
  },

  {
    icon: () => 'pie_chart',
    tooltip: item =>
      [EventStatus.InProgress, EventStatus.Finished].includes(item.status)
        ? 'Relatório de resultados.'
        : 'Relatório de resultados. Disponível para eventos Finalizados ou Em Andamento.',
    isEnabled: data => [EventStatus.InProgress, EventStatus.Finished].includes(data.status),
    isShow: data => data.eventActiveViewReports,
    color: () => 'text-primary',
    action: data => {
      openResultsReport(data.id)
    },
  },
]

if (isNetworkManager) {
  actions.push({
    icon: () => 'trophy',
    tooltip: () => 'Ranking',
    isEnabled: data => [EventStatus.Finished].includes(data.status),
    isShow: data => data.eventActiveViewReports,
    color: () => 'text-primary',
    action: data => {
      openRanking(data.id)
    },
  })
}

if (!isNetworkManager) {
  const action = {
    icon: () => 'person_search',
    tooltip: item =>
      [EventStatus.Finished].includes(item.status)
        ? 'Relatório individual.'
        : 'Relatório individual. Disponível para eventos Finalizados.',
    isEnabled: data => [EventStatus.Finished].includes(data.status),
    isShow: data => data.eventActiveViewReports,
    color: () => 'text-primary',
    action: data => {
      openIndividualReport(data.id)
    },
  }
  actions.splice(3, 0, action)

  actions.push(
    ...[
      {
        icon: () => 'trophy',
        tooltip: () => 'Ranking',
        isEnabled: data => [EventStatus.Finished].includes(data.status),
        isShow: data => data.eventActiveViewReports,
        color: () => 'text-primary',
        action: data => {
          router.push({
            name: isTeacher ? 'teacherEventRankingStudents' : 'eventRankingStudents',
            params: {
              eventId: data.id,
            },
          })
        },
      },
      {
        icon: () => 'social_leaderboard',
        tooltip: () => 'Certificados',
        isEnabled: data => [EventStatus.Finished].includes(data.status),
        isShow: data => data.eventActiveViewReports,
        color: () => 'text-primary',
        action: data => {
          router.push({
            name: isTeacher ? 'teacherEventCertificates' : 'eventCertificates',
            params: {
              eventId: data.id,
            },
          })
        },
      },
    ],
  )
}

if (isTeacher) {
  actions.unshift({
    icon: data =>
      data.sendAction === StatusEventButtonSendEnum.Send ? 'send' : 'pause_circle',
    tooltip: data => {
      return data.sendAction === StatusEventButtonSendEnum.Send
        ? 'Enviar Evento'
        : 'Pausar Evento'
    },
    isShow: data => {
      const sendAction = data.sendAction
      return (
        sendAction === StatusEventButtonSendEnum.Send ||
        sendAction === StatusEventButtonSendEnum.Pause
      )
    },
    color: data =>
      data.sendAction === StatusEventButtonSendEnum.Send ? 'text-success' : 'text-danger',
    isEnabled: () => true,
    action: data => {
      openEnableModal(data)
    },
  })
}

if (isSecretariat.value) {
  actions.push({
    icon: () => 'task_alt',
    tooltip: () => 'Ativar Evento',
    isEnabled: data => data.status === 1,
    color: () => 'text-primary',
    isShow: () => true,
    action: data => {
      openEnableModal(data)
    },
  })
}

const openEnableModal = event => {
  selectedEvent.value = event
  showEnableModal.value = true
}

const closeEnableModal = () => {
  showEnableModal.value = false
  selectedEvent.value = null
}

const closeEnableModalSuccess = () => {
  closeEnableModal()
  fetchData()
}

const toggleActivateEvents = () => {
  busy.value = true
  toggleEventsClass(selectedEvent.value.id, params.value.ClassId)
    .then(() => {
      vm.$toast({
        component: Toast,
        props: {
          title:
            selectedEvent.value.sendAction === StatusEventButtonSendEnum.Send
              ? 'Evento enviado com sucesso'
              : 'Evento pausado com sucesso',
          text:
            selectedEvent.value.sendAction === StatusEventButtonSendEnum.Send
              ? 'Evento enviado — os estudantes da turma já têm acesso. Você pode acompanhar o andamento nesta tela.'
              : 'Evento pausado — os estudantes da turma não têm mais acesso ao evento.',
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

const tableColumns = baseColumns

const dataTable = ref([])
const totalData = ref(0)
const filter = ref({
  status: null,
})

const params = ref({
  Page: 1,
  pageSize: 10,
  OrderBy: 0,
  Ascending: 'true',
  Search: '',
  SubjectId: subject.value.id,
  Status: null,
  ClassId: isTeacher ? classe.value?.ClassId : null,
})

const fetchData = () => {
  if (!subject.value.id) return
  loading.value = true

  getEventsActiveReport(params.value)
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
    SubjectId: subject.value.id,
    Status:
      filter.value.status !== undefined && filter.value.status !== null
        ? `${filter.value.status}`
        : null,
    ClassId: isTeacher ? classe.value?.ClassId : null,
  }

  fetchData()
}

watch(
  [subject, filter],
  () => {
    params.value.SubjectId = subject.value.id
    params.value.ClassId = isTeacher ? classe.value?.ClassId : null
    params.value.Status = filter.value.status !== null ? `${filter.value.status}` : null
    params.value.Page = 1
    listTable.value.resetPage()

    fetchData()
  },
  { deep: true },
)

const tooltipTarget = ref('')
const showTooltipFeedback = ref(false)

const enableCopy = event => {
  return event.status === EventStatus.InProgress
}

const toClipboard = event => {
  vm.$copyText(
    `${import.meta.env.VITE_APP_DEEPLINK_URL}dl/events/${event.id}
    }`,
  )
  tooltipTarget.value = `inputWithClipboard${event.id}`
  nextTick(() => {
    showTooltipFeedback.value = true
    setTimeout(() => {
      showTooltipFeedback.value = false
    }, 1500)
  })
}

</script>

<style lang="scss" scoped>
  .user-cell {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-width: 200px;

    .image-container {
      max-width: 80px;
      max-height: 80px;
    }

    span {
      margin-left: 5px;
      font-size: 14px;
      max-height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .material-symbols-outlined.head-icon-info {
    font-size: 16px;
  }
</style>