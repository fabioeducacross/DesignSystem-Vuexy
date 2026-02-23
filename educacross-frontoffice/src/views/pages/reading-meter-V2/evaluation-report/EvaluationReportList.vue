<template>
  <div class="evaluation-report-list">
    <ListTableLocalSorting
      ref="refList"
      :table-columns="setTableColumns"
      :data-table="students"
      :total-data="totalData"
      :loading="isLoading"
      search-placeholder="Pesquisar por aluno"
    >
      <template #cell(name)="{ item }">
        <div class="d-flex align-items-center gap-2">
          <span>{{ item.name }}</span>
          <b-badge
            v-if="item.audited"
            :variant="'light-success'"
            class="d-flex align-items-center justify-content-center px-2"
          >
            AUDITADO
          </b-badge>
        </div>
      </template>

      <template #cell(lastAccess)="{ item }">
        <span>{{ formatDate(item.lastAccess) }}</span>
      </template>

      <template #cell(recording)="{ item }">
        <div class="d-flex align-items-center justify-content-center">
          <div class="audio-player-container">
            <audio :src="item.audioUrl" controls preload="metadata" class="custom-audio"></audio>
          </div>
        </div>
      </template>

      <template #cell(proficiency)="{ item }">
        <div
          v-if="getProficiencyInfo(item)?.label === 'Em Andamento'"
          class="d-flex align-items-center justify-content-center"
        >
          <span
            :class="getProficiencyInfo(item).textClass"
            class="material-symbols-outlined"
            style="font-size: 24px"
          >
            {{ getProficiencyInfo(item).icon }}
          </span>
          <span class="font-bold text-uppercase" :class="getProficiencyInfo(item).textClass">{{
            getProficiencyInfo(item).label
          }}</span>
        </div>
        <div
          v-else-if="getProficiencyInfo(item)"
          class="d-flex justify-content-center align-items-center gap-2"
        >
          <b-badge
            v-b-tooltip.hover.top="setTooltipStatus(item)"
            :variant="getProficiencyInfo(item).variant"
            class="d-flex align-items-center justify-content-center gap-1"
            :class="
              getProficiencyInfo(item).border
                ? `border border-${getProficiencyInfo(item).variant.replace('light-', '')}`
                : ''
            "
            pill
          >
            <span
              v-if="
                getProficiencyInfo(item).label === 'Problema identificado' ||
                getProficiencyInfo(item).label === 'Analisando gravação'
              "
              :class="getProficiencyInfo(item).textClass"
              class="material-symbols-outlined"
              style="font-size: 15px"
            >
              {{ getProficiencyInfo(item).icon }}
            </span>
            {{ getProficiencyInfo(item).label }}
          </b-badge>
        </div>
        <div v-else>
          <span class="text-muted">-</span>
        </div>
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center justify-content-center gap-2">
          <span
            v-if="canCancelTest(item) && showColumnReapply(item)"
            v-b-tooltip.hover.top="'Cancelar teste'"
            class="material-symbols-outlined text-danger cursor-pointer"
            @click.stop="openModal('cancel', item)"
          >
            disabled_by_default
          </span>

          <span
            v-else-if="showColumnReapply(item)"
            v-b-tooltip.hover.top="getReapplyTooltip(item)"
            :class="getReapplyActionClass(item)"
            class="material-symbols-outlined"
            @click.stop="canReapplyTest(item) ? openModal('reapply', item) : null"
          >
            prompt_suggestion
          </span>

          <span
            v-b-tooltip.hover.top="getProficiencyTooltip(item)"
            :class="getProficiencyActionClass(item)"
            class="material-symbols-outlined"
            @click.stop="canShowReport(item) ? openStudentReport(item) : null"
          >
            pie_chart
          </span>
        </div>
      </template>
    </ListTableLocalSorting>

    <EvaluationActionModal
      :visible="modalState.isVisible"
      :action-type="modalState.actionType"
      :evaluation-info="modalState.evaluationInfo"
      @update:visible="modalState.isVisible = $event"
      @confirm="handleModalConfirm"
      @cancel="handleModalCancel"
    />
  </div>
</template>

<script setup>
import { useEvaluationReport } from './useEvaluationReport.js'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { getReadingFluencyStudentStatus } from '@/consts/ReadingFluencyStudentStatusEnum.js'
import { getVariantByRuleV2 } from '@/consts/ReadingMeterV2ProficiencyEnum'
import { getVariantByRule } from '@/consts/legends/index.js'
import router from '@/router'
import store from '@/store'
import formatDate from '@/utils/date'
import EvaluationActionModal from '@/views/pages/reading-meter-V2/overview/EvaluationActionModal.vue'
import { ref, computed } from 'vue'

const refList = ref(null)
const {
  students,
  test,
  reapplyEvaluation,
  cancelEvaluation,
  loadingAction,
  readingFluencyEvaluation,
  isLoading,
} = useEvaluationReport()

const modalState = ref({
  isVisible: false,
  actionType: 'reapply',
  evaluationInfo: {
    id: null,
    studentName: '',
    evaluationName: '',
  },
  evaluationData: null,
})

const totalData = computed(() => students.value.length)

const tableColumns = [
  {
    key: 'name',
    label: 'Aluno',
    sortable: true,
    searchable: true,
  },
  {
    key: 'lastAccess',
    label: 'Último Acesso',
    sortable: true,
    formatter: (value, key, item) => (item.lastAccess ? formatDate(item.lastAccess) : '-'),
  },
  {
    key: 'recording',
    label: 'Gravação',
  },
  {
    key: 'proficiency',
    label: 'Proficiência Leitora',
    class: 'position-relative',
    sortable: true,
    tooltip:
      'A média de proficiência da avaliação só será exibida quando todos os testes forem finalizados.',
    thStyle: { width: '220px' },
    tdClass: (value, key, item) => {
      const proficiencyInfo = getProficiencyInfo(item)
      if (proficiencyInfo && proficiencyInfo.border) {
        return `bg-light-${proficiencyInfo.variant.replace('light-', '')}`
      }
      return ''
    },
  },
  {
    key: 'actions',
    label: 'Ações',
    thStyle: { width: '120px' },
  },
]

const setTableColumns = computed(() => {
  if (test.value.id === null) {
    return tableColumns.filter(column => column.key !== 'recording')
  }
  return tableColumns
})

function getProficiencyInfo(item) {
  const studentStatus = getReadingFluencyStudentStatus(item.status)

  if (studentStatus && item.status === 0 && item.proficiency === 0) {
    return {
      id: studentStatus.id,
      label: studentStatus.label,
      variant: studentStatus.lightVariant,
      textClass: studentStatus.textClass,
      icon: studentStatus.icon,
    }
  }

  if (studentStatus && (studentStatus.id === 3 || studentStatus.id === 2)) {
    return {
      id: studentStatus.id,
      label: studentStatus.label,
      variant: studentStatus.lightVariant,
      textClass: studentStatus.textClass,
      icon: studentStatus.icon,
    }
  }

  const proficiencyData = getVariantByRuleV2(item.proficiency, 'proficiencyWithInProgress')

  if (!proficiencyData) return null

  return {
    id: proficiencyData.id || item.proficiency,
    label: proficiencyData.label || proficiencyData.text,
    variant: `light-${proficiencyData.variant}`,
    textClass: proficiencyData.textClass || '',
    icon: proficiencyData.icon || '',
    border: proficiencyData.label !== 'Em Andamento',
  }
}

function showColumnReapply(item) {
  const isTeacher = store.getters.accessRole === 'Teacher'
  if (!isTeacher) return false

  if (readingFluencyEvaluation.value.status !== 4) return false

  if (!readingFluencyEvaluation.value.teacherReapplyTest) return item.status === 3

  if (test.value.id === null) return false

  return true
}

function openModal(actionType, evaluationData) {
  modalState.value = {
    isVisible: true,
    actionType,
    evaluationInfo: {
      id: evaluationData.id,
      className: evaluationData.name,
      evaluationName: evaluationData.name,
    },
    evaluationData,
  }
}

function openStudentReport(item) {
  const { evaluationId, classId, institutionId } = router.currentRoute.params
  const role = store.getters.accessRole

  let routeName = 'AdminFluencyV2StudentReport'
  if (role === 'NetworkManager') {
    routeName = 'NetworkManagerFluencyV2StudentReport'
  } else if (role === 'Teacher') {
    routeName = 'TeacherFluencyV2StudentReport'
  }

  router.push({
    name: routeName,
    params: {
      evaluationId,
      classId,
      studentId: item.id,
      ...(institutionId && { institutionId }),
    },
  })
}

function canShowReport(item) {
  if (item.excluded) return false

  const studentStatus = getReadingFluencyStudentStatus(item.status)

  if (studentStatus && !studentStatus.canShowReport) return false

  return item.proficiency !== 0
}

function getProficiencyTooltip(item) {
  return canShowReport(item) ? 'Relatório do aluno' : setMsgTootip()
}

function setMsgTootip() {
  return readingFluencyEvaluation.value.hasAudit
    ? 'Nem todos os testes foram finalizados ou o teste está em auditoria.'
    : 'Nem todos os testes foram finalizados'
}

function getProficiencyActionClass(item) {
  if (item.excluded) {
    return 'text-muted cursor-not-allowed'
  }
  return canShowReport(item) ? 'text-primary cursor-pointer' : 'text-muted cursor-not-allowed'
}

function setTooltipStatus(item) {
  const studentStatus = getReadingFluencyStudentStatus(item.status)

  if (studentStatus && studentStatus.tooltip) {
    return studentStatus.tooltip
  }

  if (getProficiencyInfo(item)?.label === 'Em Andamento') {
    return 'Nem todos os testes foram finalizados ou o teste está em auditoria.'
  }

  return ''
}

function canReapplyTest(item) {
  if (item.excluded || test.value.id === null) return false

  const studentStatus = getReadingFluencyStudentStatus(item.status)
  return studentStatus ? studentStatus.canReapply : false
}

function getReapplyTooltip(item) {
  if (item.excluded) return 'Teste cancelado'
  return canReapplyTest(item) ? 'Reaplicar teste' : 'Nem todos os testes foram concluídos'
}

function getReapplyActionClass(item) {
  if (item.excluded) {
    return 'text-muted cursor-not-allowed'
  }
  if (loadingAction.value) {
    return 'text-muted cursor-wait'
  }
  return canReapplyTest(item)
    ? 'text-primary cursor-pointer'
    : 'text-muted cursor-not-allowed'
}

function canCancelTest(item) {
  if (item.excluded) return false

  const studentStatus = getReadingFluencyStudentStatus(item.status)
  return studentStatus ? studentStatus.canCancel : false
}

function getCancelActionClass(item) {
  if (item.excluded) {
    return 'text-muted cursor-not-allowed'
  }
  if (loadingAction.value) {
    return 'text-muted cursor-wait'
  }
  return canCancelTest(item) ? 'text-danger cursor-pointer' : 'text-muted cursor-not-allowed'
}

function handleModalConfirm() {
  const studentData = modalState.value.evaluationData
  if (modalState.value.actionType === 'reapply') {
    reapplyEvaluation(studentData)
  } else if (modalState.value.actionType === 'cancel') {
    cancelEvaluation(studentData)
  }
  modalState.value.isVisible = false
}

function handleModalCancel() {
  modalState.value.isVisible = false
}
</script>

<style lang="scss" scoped>
.audio-player-container {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 6px 12px;
  height: fit-content !important;

  .custom-audio {
    height: 30px;
    background: transparent;
    accent-color: #7367f0;
  }
}
</style>