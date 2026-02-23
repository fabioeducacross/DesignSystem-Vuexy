<template>
  <div class="reading-meter-v2-list">
    <ListTable
      ref="refList"
      :table-columns="tableColumns"
      :data-table="filteredData"
      :total-data="filteredData.length"
      :loading="isLoading"
      :show-view-selection="true"
      :columns="3"
      search-placeholder="Pesquisar por avaliação"
      @change="changeListTable"
    >
      <template #cell(name)="{ item }">
        <div class="d-flex align-items-center gap-2">
          <div class="avaliacao-icons d-flex align-items-center">
            <span
              v-if="getEvaluationIcons(item.types)[0]"
              v-b-tooltip.hover.top="getEvaluationIcons(item.types)[0].tooltip"
              :class="[
                getEvaluationIcons(item.types)[0].color,
                getEvaluationIcons(item.types)[0].bgColor,
              ]"
              class="material-symbols-outlined icon-slot"
            >
              {{ getEvaluationIcons(item.types)[0].icon }}
            </span>
            <span v-else class="icon-slot"></span>

            <span
              v-if="getEvaluationIcons(item.types)[1]"
              v-b-tooltip.hover.top="getEvaluationIcons(item.types)[1].tooltip"
              :class="[
                getEvaluationIcons(item.types)[1].color,
                getEvaluationIcons(item.types)[1].bgColor,
              ]"
              class="material-symbols-outlined icon-slot"
            >
              {{ getEvaluationIcons(item.types)[1].icon }}
            </span>
            <span v-else class="icon-slot"></span>
          </div>
          <div>
            <div class="font-bold">{{ item.name }}</div>
            <b-badge
              pill
              variant="light-primary"
              class="d-none d-md-block"
              style="width: fit-content"
            >
              <span class="font-12"> {{ item.serieName }}</span>
            </b-badge>
          </div>
        </div>
      </template>

      <template #cell(startDate)="{ item }">
        <span>{{ formatDate(item.startDate) }}</span>
      </template>

      <template #cell(endDate)="{ item }">
        <span>{{ formatDate(item.endDate) }}</span>
      </template>

      <template #head(studentsFinished)="item">
        <div class="d-flex align-items-center gap-1">
          {{ item.label }}
          <span
            v-b-tooltip.hover.top="
              'Total de testes finalizados dividido pela quantidade total de testes.'
            "
            class="material-symbols-outlined ml-1 head-icon-info"
          >
            info
          </span>
        </div>
      </template>

      <template #cell(studentsFinished)="{ item }">
        <div class="progress-cell">
          <ProgressBarHorizontalV2
            v-if="getProgressPercentage(item) || getProgressPercentage(item) === 0"
            show-values
            :value="item.studentsFinished"
            height="12px"
            :get-variant="getColorsEnum"
            :max="item.students"
            values-divisor=" de "
          />
        </div>
      </template>

      <template #head(status)="item">
        <div class="d-flex align-items-center gap-1">
          {{ item.label }}
          <span
            v-b-tooltip.hover.top.html="
              `<div class='text-left'>Para ativar: A escola ainda não ativou a avaliação.<br />
                  Para iniciar: A avaliação ainda não está no período de aplicação.<br />
                  Em andamento: A avaliação está em andamento na(s) escola(s).<br />
                  Finalizada: O período de aplicação da avaliação acabou.<br />
                  Cancelada: A avaliação foi cancelada.</div>`
            "
            class="material-symbols-outlined ml-1 head-icon-info"
          >
            info
          </span>
        </div>
      </template>

      <template #cell(status)="{ item }">
        <div>
          <b-badge :variant="getStatusBadgeVariant(item.status)" pill>
            {{ getStatusBadgeText(item.status) }}
          </b-badge>
        </div>
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center gap-3">
          <span
            v-for="(action, index) in getActionsForItem(item)"
            :key="index"
            v-b-tooltip.hover.top="typeof action.tooltip === 'function' ? action.tooltip() : action.tooltip"
            :class="[action.color, action.isEnabled ? 'cursor-pointer' : 'cursor-not-allowed']"
            class="material-symbols-outlined"
            @click.stop="action.isEnabled ? action.action(item) : null"
          >
            {{ action.icon }}
          </span>
        </div>
      </template>

      <!-- Slot para cards -->
      <template v-slot:card="{ data }">
        <b-card class="evaluation-card">
          <div class="text-center mb-1">
            <b-badge
              :variant="`light-${getVariantByRule(data.status, 'ReadingFluencyV2StatusEnum').variant}`"
              pill
            >
              {{ getVariantByRule(data.status, 'ReadingFluencyV2StatusEnum').text }}
            </b-badge>
          </div>

          <div class="text-center text-muted mb-1">
            <small class="date-range-text"
              >{{ formatDate(data.startDate) }} a {{ formatDate(data.endDate) }}</small
            >
          </div>

          <div class="text-center mb-1">
            <div class="card-title font-weight-bold text-dark">
              {{ data.name }}
              <b-badge pill variant="light-primary" class="ml-1 font-12">
                {{ data.serieName }}
              </b-badge>
            </div>
          </div>

          <div class="evaluation-icons text-center mb-1">
            <div class="d-flex justify-content-center align-items-center gap-2">
              <div
                v-if="getEvaluationIcons(data.types)[0]"
                class="icon-container"
                :class="getEvaluationIcons(data.types)[0].bgColor"
              >
                <span
                  :class="getEvaluationIcons(data.types)[0].color"
                  class="material-symbols-outlined"
                >
                  {{ getEvaluationIcons(data.types)[0].icon }}
                </span>
              </div>
              <div
                v-if="getEvaluationIcons(data.types)[1]"
                class="icon-container"
                :class="getEvaluationIcons(data.types)[1].bgColor"
              >
                <span
                  :class="getEvaluationIcons(data.types)[1].color"
                  class="material-symbols-outlined"
                >
                  {{ getEvaluationIcons(data.types)[1].icon }}
                </span>
              </div>
            </div>
          </div>

          <div class="progress-section mb-1">
            <div class="d-flex align-items-center justify-content-between mb-1">
              <span class="font-weight-bold text-dark" style="font-size: 0.85rem">Progresso</span>
              <span
                v-b-tooltip.hover.top="
                  'Total de testes finalizados dividido pela quantidade total de testes.'
                "
                class="material-symbols-outlined"
                style="font-size: 14px"
                >info</span
              >
            </div>
            <div class="progress-bar-custom mb-1">
              <ProgressBarHorizontalV2
                show-values
                :value="data.studentsFinished"
                height="12px"
                :get-variant="getColorsEnum"
                :max="data.students"
                values-divisor=" de "
              >
              </ProgressBarHorizontalV2>
            </div>
          </div>

          <div class="card-actions text-center mt-auto">
            <div class="d-flex justify-content-center align-items-center">
              <span
                v-for="(action, index) in getActionsForItem(data)"
                :key="index"
                v-b-tooltip.hover.top="typeof action.tooltip === 'function' ? action.tooltip() : action.tooltip"
                :class="[
                  action.color,
                  action.isEnabled ? 'cursor-pointer' : 'cursor-not-allowed',
                ]"
                class="material-symbols-outlined action-icon"
                @click.stop="action.isEnabled ? action.action(data) : null"
              >
                {{ action.icon }}
              </span>
              <span v-if="getActionsForItem(data).length === 0" class="text-muted">
                Nenhuma ação disponível
              </span>
            </div>
          </div>
        </b-card>
      </template>
    </ListTable>

    <LegendEnum :legends="legends" />

    <EvaluationActionModal
      :visible="modalState.isVisible"
      :action-type="modalState.actionType"
      :evaluation-info="modalState.evaluationInfo"
      @update:visible="modalState.isVisible = $event"
      @confirm="handleModalConfirm"
      @cancel="handleModalCancel"
    />

    <EvaluationDetailsModal
      :visible="detailsModalState.isVisible"
      :evaluation-data="detailsModalState.evaluationData"
      :get-evaluation-icons="getEvaluationIcons"
      @update:visible="detailsModalState.isVisible = $event"
      @download="handleDetailsDownload"
      @close="handleDetailsModalClose"
    />

    <DateRangeModal
      :visible.sync="dateRangeModalState.isVisible"
      :serie-name="dateRangeModalState.evaluation.serieName || ''"
      @apply="handleDateRangeApply"
    />
  </div>
</template>

<script setup>
import DateRangeModal from './DateRangeModal.vue'
import EvaluationActionModal from './EvaluationActionModal.vue'
import EvaluationDetailsModal from './EvaluationDetailsModal.vue'
import { useReadingMeterV2 } from './useReadingMeterV2.js'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTable from '@/components/table/ListTable.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import { progressLegend } from '@/consts/legends/progressEnum.js'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import { formatDate } from '@/utils/utils'
import { ref, computed } from 'vue'

const {
  isLoading,
  readingsTest,
  getEvaluationDetails,
  getEvaluationStudents,
  changeStatusEvaluation,
  changeListTable,
  enabledEvaluation,
  changeToastMsg,
} = useReadingMeterV2()
const refList = ref(null)
const { classe } = useFilters()

const dateRangeModalState = ref({
  isVisible: false,
  evaluation: { id: null, serieName: '' },
  selectedDates: [],
})

const handleDateRangeApply = date => {
  enabledEvaluation(dateRangeModalState.value.evaluation.id, date)
  dateRangeModalState.value = {
    isVisible: false,
    evaluation: { id: null, serieName: '' },
    selectedDates: [],
  }
}

const openDateRangeModal = evaluation => {
  dateRangeModalState.value = {
    isVisible: true,
    evaluation,
    selectedDates: [],
  }
}

const searchQuery = ref('')

const modalState = ref({
  isVisible: false,
  actionType: 'pause',
  evaluationInfo: {
    className: '',
    evaluationName: '',
  },
})

const detailsModalState = ref({
  isVisible: false,
  evaluationData: null,
})

const tableColumns = [
  {
    key: 'name',
    label: 'AVALIAÇÃO',
    sortable: true,
  },
  {
    key: 'startDate',
    label: 'INÍCIO',
    sortable: true,
  },
  {
    key: 'endDate',
    label: 'FIM',
    sortable: true,
  },
  {
    key: 'studentsFinished',
    label: 'PROGRESSO',
  },
  {
    key: 'status',
    label: 'STATUS',
  },
  {
    key: 'actions',
    label: 'AÇÕES',
    thStyle: { width: '120px' },
  },
]

const getProgressPercentage = item => {
  if (!item.students || item.students === 0) return 0
  return Math.round((item.studentsFinished / item.students) * 100)
}

const getColorsEnum = value => {
  return getVariantByRule(value, 'progress')
}

const getEvaluationIcons = types => {
  const icons = []

  if (!types || !Array.isArray(types)) {
    icons.push({
      icon: 'quiz',
      color: 'text-secondary',
      bgColor: 'bg-secondary',
      tooltip: 'Avaliação',
    })
    return icons
  }

  const hasText = types.includes(2)
  const hasWords = types.includes(1)

  if (hasText && hasWords) {
    icons.push(
      {
        icon: 'book_6',
        color: 'text-book',
        bgColor: 'bg-book',
        tooltip: 'Avaliação com texto',
      },
      {
        icon: 'format_list_numbered',
        color: 'text-list',
        bgColor: 'bg-list',
        tooltip: 'Avaliação com lista de palavras',
      },
    )
  } else if (hasText) {
    icons.push({
      icon: 'book_6',
      color: 'text-book',
      bgColor: 'bg-book',
      tooltip: 'Avaliação apenas com texto',
    })
  } else if (hasWords) {
    icons.push({
      icon: 'format_list_numbered',
      color: 'text-list',
      bgColor: 'bg-list',
      tooltip: 'Avaliação apenas com lista de palavras',
    })
  } else {
    icons.push({
      icon: 'quiz',
      color: 'text-secondary',
      bgColor: 'bg-secondary',
      tooltip: 'Avaliação',
    })
  }

  return icons
}

const getActionsForItem = item => {
  const actions = []
  const role = store.getters.accessRole
  const canApplyTest = item.status === 2
  const isFinished = item.status === 5
  const hasAudit = item.hasAudit

  if (role !== 'Teacher') {
    actions.push({
      icon: 'task_alt',
      tooltip: canApplyTest ? 'Aplicar avaliação' : '',
      color: canApplyTest ? 'text-success' : 'text-muted',
      isEnabled: canApplyTest,
      action: data => {
        openDateRangeModal(data)
      },
    })
  }

  if (role === 'Teacher') {
    if (item.status === 4) {
      actions.push({
        icon: 'pause_circle',
        tooltip: 'Pausar avaliação',
        color: 'text-danger',
        isEnabled: true,
        action: data => {
          changeToastMsg.value = 'Avaliação pausada com sucesso!'
          openModal('pause', data)
        },
      })
    } else if (item.status === 1) {
      actions.push({
        icon: 'play_circle',
        tooltip: 'Retomar avaliação',
        color: 'text-success',
        isEnabled: true,
        action: data => {
          changeToastMsg.value = 'Avaliação retomada com sucesso!'
          openModal('resume', data)
        },
      })
    } else {
      actions.push({
        icon: 'pause_circle',
        tooltip: 'Pausar desabilitado',
        color: 'text-muted',
        isEnabled: false,
        action: () => {},
      })
    }
  }

  actions.push({
    icon: 'visibility',
    tooltip: 'Ver detalhes',
    color: 'text-primary',
    isEnabled: true,
    action: data => {
      openDetailsModal(data)
    },
  })

  if (role === 'NetworkManager') {
    actions.push({
      icon: 'document_search',
      tooltip: () => {
        if (hasAudit) {
          return isFinished
            ? 'Vincular auditoria'
            : 'Disponível quando a avaliação for finalizada'
        }
        return 'Essa avaliação não possui auditoria'
      },
      color: isFinished && hasAudit ? 'text-primary' : 'text-muted',
      isEnabled: isFinished && hasAudit,
      action: data => {
        router.push({
          name: 'NetworkManagerLinkingAuditorReadingFluency',
          params: { evaluationId: data.id },
        })
      },
    })
  }

  const canDownload = item.evaluationPrint === true
  actions.push({
    icon: 'download',
    tooltip: canDownload ? 'Baixar avaliação' : 'Baixar avaliação desabilitado',
    color: canDownload ? 'text-primary' : 'text-muted',
    isEnabled: canDownload,
    action: async data => {
      if (canDownload) {
        await downloadEvaluationPDF(data)
      }
    },
  })

  actions.push({
    icon: 'pie_chart',
    tooltip: item.status !== 2 && item.status !== 3 ? 'Relatório' : 'Relatório desabilitado',
    color: item.status !== 2 && item.status !== 3 ? 'text-primary' : 'text-muted',
    isEnabled: item.status !== 2 && item.status !== 3,
    action: data => {
      if (item.status !== 2 && item.status !== 3) {
        if (role === 'NetworkManager') {
          router.push({
            name: 'NetworkManagerFluencyV2Institutions',
            params: {
              evaluationId: data.id,
            },
          })
        } else if (role === 'Teacher') {
          router.push({
            name: 'TeacherFluencyV2Students',
            params: {
              evaluationId: data.id,
              classId: classe.value.ClassId,
            },
          })
        } else {
          router.push({
            name: 'AdminFluencyV2Classes',
            params: {
              evaluationId: data.id,
            },
          })
        }
      }
    },
  })

  return actions
}

const openModal = (actionType, evaluationData) => {
  modalState.value = {
    isVisible: true,
    actionType,
    evaluationInfo: {
      id: evaluationData.id,
      className: evaluationData.serieName,
      evaluationName: evaluationData.name,
    },
    evaluationData,
  }
}

const handleModalConfirm = ({ evaluationInfo }) => {
  changeStatusEvaluation(evaluationInfo)
  modalState.value.isVisible = false
}

const handleModalCancel = () => {
  modalState.value.isVisible = false
}

const openDetailsModal = async evaluationData => {
  detailsModalState.value = {
    isVisible: true,
    evaluationData: null,
  }

  try {
    const evaluationDetails = await getEvaluationDetails(evaluationData.id)

    detailsModalState.value = {
      isVisible: true,
      evaluationData: {
        ...evaluationData,
        ...evaluationDetails,
      },
    }
  } catch (error) {
    detailsModalState.value = {
      isVisible: true,
      evaluationData,
    }
  }
}

const handleDetailsDownload = () => {
  changeStatusEvaluation()
}

const handleDetailsModalClose = () => {
  detailsModalState.value = {
    isVisible: false,
    evaluationData: null,
  }
}

const downloadEvaluationPDF = async evaluationData => {
  const students = await getEvaluationStudents(evaluationData.id)

  router.push({
    name: 'readingMeterPDFView',
    params: {
      evaluationId: evaluationData.id,
      students,
      startDate: evaluationData.startDate,
      endDate: evaluationData.endDate,
    },
  })
}

const legends = [progressLegend]

const statusBadgeCache = new Map()

const computeStatusBadge = status => {
  const key = String(status ?? 'null')
  if (statusBadgeCache.has(key)) return statusBadgeCache.get(key)

  const result = getVariantByRule(status, 'ReadingFluencyV2StatusEnum') || {}
  const variantBase = result.variant || 'secondary'
  const badge = {
    variant: `light-${variantBase}`,
    text: result.text || '',
  }

  statusBadgeCache.set(key, badge)
  return badge
}

const getStatusBadgeVariant = status => {
  return computeStatusBadge(status).variant
}

const getStatusBadgeText = status => {
  return computeStatusBadge(status).text
}

const filteredData = computed(() => {
  const data = readingsTest.value || []

  if (!searchQuery.value) return data

  return data.filter(
    item =>
      item.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.serieName?.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})
</script>

<style lang="scss" scoped>
  .reading-meter-v2-list {
    .evaluation-card {
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 20px;
      display: flex;
      flex-direction: column;

      .card-body {
        padding: 0.75rem;
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        height: 100%;
      }

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      }

      .status-badge-top {
        .badge {
          font-size: 0.75rem;
          font-weight: 600;
        }
      }

      .card-title {
        font-family: Montserrat;
        font-weight: 700;
        font-style: Bold;
        font-size: 16px;
        line-height: 21px;
        letter-spacing: 0px;
        text-align: center;
      }

      .date-range-text {
        font-family: Montserrat;
        font-weight: 400;
        font-style: Regular;
        font-size: 14px;
        line-height: 21px;
        letter-spacing: 0px;
        text-align: center;
      }

      .evaluation-icons {
        .icon-container {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;

          &.bg-warning {
            background-color: #fff3cd;
          }

          &.bg-success {
            background-color: #d4edda;
          }

          &.bg-secondary {
            background-color: #e2e6ea;
          }

          &.bg-book {
            background-color: #8bc728 !important;
          }

          &.bg-list {
            background-color: #ffb443 !important;
          }

          .material-symbols-outlined {
            font-size: 24px;

            &.text-book {
              color: #304e00 !important;
            }

            &.text-list {
              color: #5d3903 !important;
            }
          }
        }
      }

      .progress-section {
        .progress-bar-custom {
          .progress {
            border-radius: 10px;
            background-color: #e9ecef;
          }
        }
      }

      .card-actions {
        margin-top: auto;

        .action-icon {
          transition: all 0.2s ease;
          font-size: 24px !important;
          padding: 4px;
          display: inline-flex !important;
          align-items: center;
          justify-content: center;
          min-width: 32px;
          min-height: 32px;
          border-radius: 4px;

          &:hover {
            transform: scale(1.1);
          }

          &.cursor-not-allowed {
            opacity: 0.5;
          }

          &.cursor-pointer:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }
        }
      }
    }

    .avaliacao-icons {
      gap: 4px;

      .icon-slot {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;

        &.bg-book {
          background-color: #8bc728 !important;
        }

        &.bg-list {
          background-color: #ffb443 !important;
        }

        &.material-symbols-outlined {
          font-size: 20px;
          transition: color 0.2s ease;

          &.text-primary {
            color: #1976d2;
          }

          &.text-success {
            color: #388e3c;
          }

          &.text-secondary {
            color: #757575;
          }

          &.text-book {
            color: #304e00 !important;
          }

          &.text-list {
            color: #5d3903 !important;
          }
        }
      }
    }

    .progress-cell {
      min-width: 200px;

      .progress-students {
        font-size: 0.75rem;
        color: #6c757d;
        line-height: 1.2;
        white-space: nowrap;
      }
    }

    .evaluation-card {
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }

      .card-content {
        .card-title {
          font-size: 1rem;
          color: #2c3e50;
        }

        .date-range {
          .text-sm {
            font-size: 0.875rem;
          }
        }

        .progress-section {
          .font-weight-bold {
            font-weight: 600;
          }
        }
      }

      .status-badge {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
      }

      .action-icon {
        font-size: 20px;
        transition: color 0.2s ease, transform 0.2s ease;

        &.cursor-pointer:hover {
          transform: scale(1.1);
        }
      }
    }

    .material-symbols-outlined.cursor-pointer {
      transition: color 0.2s ease;

      &:hover {
        opacity: 0.7;
      }
    }

    .material-symbols-outlined.head-icon-info {
      font-size: 16px;
    }
  }
</style>