<template>
  <section>
    <ListTableLocalSorting
      ref="tableRef"
      :data-table="sortedMissions"
      :loading="loading"
      :table-columns="tableColumns"
      search-placeholder="Pesquisar por missão"
      :disable-internal-sort="true"
      @update:sortBy="val => (sortBy = val)"
      @update:sortDesc="val => (sortDesc = val)"
    >
      <template #cell(name)="{ item }">
        <div style="min-width: 150px">
          <span class="font-bold">{{ item.name }}</span>
          <div v-if="item.isPlus" class="flex gap-1">
            <b-badge variant="light-primary" pill class="d-flex align-items-center gap-1">
              <img
                class="d-inline-block v-align-middle"
                alt="Missão Plus"
                width="16"
                height="16"
                :src="customPlusIcon"
              />
              Missão Plus
            </b-badge>
          </div>
        </div>
      </template>

      <template #cell(progress)="{ item }">
        <div>
          <ProgressBarHorizontalV2 reverse height="12px" :value="item.progress" enum="progress" />
        </div>
      </template>
      <template #cell(performance)="{ item }">
        <div
          v-if="
            item.status === EEducationSystemGuideStatus.NotSent ||
            item.status === EEducationSystemGuideStatus.NotStarted ||
            item.performance === undefined
          "
        >
          -
        </div>
        <PerformanceCell v-else :performance="item.performance" />
      </template>
      <template #cell(status)="{ value }">
        <b-badge pill :variant="'light-' + (getVariantByRule(value, 'guideStatus').variant || '')">
          {{ getVariantByRule(value, 'guideStatus').label }}
        </b-badge>
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center justify-content-start gap-3">
          <span
            v-for="(action, index) in tableActions"
            v-show="action.isShow(item)"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip"
            class="material-symbols-outlined text-primary cursor-pointer"
            :class="action.class"
            @click.stop="action.isShow(item) ? action.action(item) : null"
          >
            {{ action.icon }}
          </span>
          <span
            v-if="item.guideLinkUrl && item.status === EEducationSystemGuideStatus.Started"
            :id="`inputWithClipboard${item.missionId}`"
            v-b-tooltip.hover.top="$t('CopyLink')"
            class="material-symbols-outlined text-primary cursor-pointer"
            :class="
              item.guideLinkUrl ? 'text-primary cursor-pointer' : 'cursor-not-allowed text-muted'
            "
            @click.stop="item.guideLinkUrl ? toClipboard(item) : false"
          >
            link
          </span>
        </div>
      </template>
    </ListTableLocalSorting>

    <b-modal
      v-model="enableModal"
      hide-footer
      centered
      size="sm"
      title="Habilitar missão"
      no-close-on-backdrop
      static
      @close="showEnableModal = false"
    >
      <EducationSystemMissionsEnableModal
        v-if="enableModal"
        @close-modal="showEnableModal = false"
        @close-modal-success="enableModalSuccess"
      />
    </b-modal>

    <ModalConfirm
      v-model="pauseModal"
      :callback-confirm="disableMission"
      :busy="busy"
      label-cancel="Cancelar"
      label-confirm="Pausar missão"
    >
      <h4>Tem certeza que deseja pausar?</h4>
      <div>
        <p>
          A missão será ocultada para
          <span class="font-bold text-primary">{{ classe.Name }}.</span> Você poderá retomar a
          missão a qualquer momento.
        </p>
      </div>
    </ModalConfirm>
    <b-tooltip
      custom-class="tooltip-container"
      :target="tooltipTarget"
      :show.sync="showTooltipFeedback"
      placement="top"
      triggers="click"
      variant="success"
    >
      {{ $t('LinkCopied') }}
    </b-tooltip>

    <MissionBookDetails v-model="showDetailsMission" :guide-id="selectedGuide.guideId" />
  </section>
</template>

<script setup>
import customPlusIcon from '@/assets/images/teacher-context/new-mission/customplus-icon.svg'
import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import MissionBookDetails from '@/components/mission-plus/MissionBookDetails.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { EEducationSystemGuideStatus } from '@/consts/EEducationSystemGuideStatus.js'
import { getVariantByRule } from '@/consts/legends'
import { formattedDate } from '@/filters/filters'
import '@/libs/clipboard'
import router from '@/router'
import { enableDisableEducationSystemBooks } from '@/services/teacher-context/educationSystem/EducationSystem.Service'
import useFilters from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable.js'
import { sortString } from '@/utils/utils'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import EducationSystemMissionsEnableModal from '@/views/pages/teacher-context/educationSystem/EducationSystemMissionsEnableModal.vue'
import { useEducationSystemMissions } from '@/views/pages/teacher-context/educationSystem/missions/useEducationSystemMissions.js'
import { computed, getCurrentInstance, onUnmounted, ref, nextTick } from 'vue'

const vm = getCurrentInstance().proxy

const { fetch } = useEducationSystemMissions()
const { classe, educationSystemId } = useFilters()
const { bookId } = router.currentRoute.params

const { loading, dataTable, reset, tableRef, resetPage } = useTable()

const tableColumns = [
  {
    key: 'unityName',
    label: 'Unidade',
    class: 'font-bold',
    sortable: true,
    sortProperty: 'unityId',
  },
  { key: 'name', label: 'Missão', class: 'font-bold', sortable: true, searchable: true },
  {
    key: 'startDate',
    label: 'INÍCIO',
    sortable: true,
    formatter: value => `${formattedDate(value)}`,
  },
  {
    key: 'finishDate',
    label: 'FIM',
    sortable: true,
    formatter: value => `${formattedDate(value)}`,
  },
  {
    key: 'progress',
    label: 'Progresso da Turma',
    sortable: true,
    tooltip:
      'Percentual de turnos/jogos cumpridos dividido pela quantidade de turnos/jogos disponibilizados nas missões.',
  },
  {
    key: 'performance',
    label: 'rendimento médio',
    sortable: true,
    tooltip:
      'Calcula-se rendimento com base nos erros e acertos dos alunos em seus desafios (jogadas).',
  },
  {
    key: 'status',
    label: 'Status',
    tooltip: `
            <div class="text-left">
              • Não enviada: A missão nunca foi enviada aos alunos. Você poderá enviá-la a qualquer momento.
            <br />
            <br />
            • Pausada: A missão já foi enviada pelo menos 1 vez, mas está indisponível temporariamente. Você poderá enviá-la novamente a qualquer momento.
            <br />
            <br />
            • Iniciada: A missão está sendo exibida e realizada pelos alunos e você poderá ver o relatório.
            <br />
            <br />
            • Não iniciada: A missão já foi enviada aos alunos, mas só ficará disponível quando a data de início chegar.
            <br />
            <br />
            • Finalizada: A missão foi finalizada e você poderá ver o relatório. Missões finalizadas podem ser reenviadas sem perda do histórico de engajamento e desempenho.
              </div>
            `,
  },
  {
    key: 'actions',
    label: 'ações',
  },
]

const tableActions = computed(() => {
  return [
    {
      icon: 'send',
      tooltip: () => 'Enviar missão',
      class: 'text-success',
      isShow: item =>
        item.status === EEducationSystemGuideStatus.NotSent ||
        item.status === EEducationSystemGuideStatus.Finished ||
        item.status === EEducationSystemGuideStatus.Paused,
      action: item => {
        confirmEnable(item)
      },
    },

    {
      icon: 'pause_circle',
      tooltip: () => 'Pausar missão',
      class: 'text-danger',
      isShow: item =>
        item.status === EEducationSystemGuideStatus.NotStarted ||
        item.status === EEducationSystemGuideStatus.Started,
      action: item => {
        confirmPause(item)
      },
    },

    {
      icon: 'pie_chart',
      tooltip: () => 'Relatório da Missão',
      class: 'text-primary',
      isShow: item =>
        item.status === EEducationSystemGuideStatus.Started ||
        item.status === EEducationSystemGuideStatus.Finished ||
        item.status === EEducationSystemGuideStatus.Paused,
      isEnabled: item =>
        item.status === EEducationSystemGuideStatus.Started ||
        item.status === EEducationSystemGuideStatus.Finished ||
        item.status === EEducationSystemGuideStatus.Paused,
      action: item => {
        if (item.isPlus) {
          router.push({
            name: `EducationSystemMissionsBookMissionPlus${educationSystemId.value}`,
            params: {
              bookId,
              missionId: item.guideId,
              educationSystemId: educationSystemId.value,
            },
          })
        } else {
          router.push({
            name: `EducationSystemMissionsBookMission${educationSystemId.value}`,
            params: {
              bookId,
              missionId: item.guideId,
              educationSystemId: educationSystemId.value,
            },
          })
        }
      },
    },

    {
      icon: 'visibility',
      tooltip: () => 'Detalhes',
      class: 'text-primary',
      isShow: () => true,
      isEnabled: () => true,
      action: item => {
        openDetailsMission(item)
      },
    },
  ]
})

const selectedMission = ref(null)
const busy = ref(false)

const enableModal = ref(false)
const pauseModal = ref(false)

const confirmEnable = item => {
  enableModal.value = true
  selectedMission.value = item
}

const confirmPause = item => {
  pauseModal.value = true
  selectedMission.value = item
}
const disableMission = () => {
  enableAndDisableMission()
}

const enableModalSuccess = data => {
  enableAndDisableMission(data.startDate, data.endDate)
}

const enableAndDisableMission = (startDate = null, finishDate = null) => {
  busy.value = true
  enableDisableEducationSystemBooks({
    missionId: selectedMission.value.guideId,
    classId: classe.value.ClassId,
    startDate,
    finishDate,
  })
    .then(() => {
      vm.$toast({
        component: Toast,
        props: {
          title: `Missão ${enableModal.value ? 'enviada' : 'pausada'} com sucesso!`,
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
      enableModal.value = false
      pauseModal.value = false
      resetPage()
      fetch()
    })

    .finally(() => {
      busy.value = false
    })
}

onUnmounted(() => {
  reset()
})

const tooltipTarget = ref(() => {})
const showTooltipFeedback = ref(false)

const toClipboard = mission => {
  vm.$copyText(`${import.meta.env.VITE_APP_DEEPLINK_URL}${mission.guideLinkUrl}`)
  tooltipTarget.value = `inputWithClipboard${mission.missionId}`
  nextTick(() => {
    showTooltipFeedback.value = true
    setTimeout(() => {
      showTooltipFeedback.value = false
    }, 1500)
  })
}

const selectedGuide = ref({})

const showDetailsMission = ref(false)

const openDetailsMission = guide => {
  selectedGuide.value = guide
  showDetailsMission.value = true
}

// For the enable modal close (used in @close and @close-modal)
const showEnableModal = ref(false)

// Logic for manual sorting
const sortBy = ref(null)
const sortDesc = ref(false)

function compareValues(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b
  }

  if (a == null && b == null) return 0
  if (a == null) return 1
  if (b == null) return -1

  return sortString(a, b)
}

const sortedMissions = computed(() => {
  if (!sortBy.value) return dataTable.value

  const data = [...dataTable.value]
  return data.sort((a, b) => {
    const column = tableColumns.find(col => col.key === sortBy.value)
    const sortProperty = column && column.sortProperty ? column.sortProperty : sortBy.value

    const aValue = a[sortProperty]
    const bValue = b[sortProperty]

    const result = compareValues(aValue, bValue)

    // Secondary sort by name if values are equal and we are not already sorting by name
    if (result === 0 && sortBy.value !== 'name') {
      return sortString(a.name, b.name)
    }

    return sortDesc.value ? result * -1 : result
  })
})
</script>
