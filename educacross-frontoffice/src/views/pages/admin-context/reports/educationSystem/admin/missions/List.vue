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
        <div>
          <div
            v-if="
              (classe.id &&
                (item.status === EEducationSystemGuideStatus.NotSent ||
                  item.status === EEducationSystemGuideStatus.NotStarted)) ||
              item.performance === undefined
            "
          >
            -
          </div>
          <PerformanceCell v-else :performance="item.performance" />
        </div>
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
            :key="index"
            v-b-tooltip.hover.top="action.tooltip(item, action.isEnabled(item))"
            :class="
              action.isEnabled(item)
                ? `text-primary cursor-pointer`
                : 'cursor-not-allowed text-muted'
            "
            class="material-symbols-outlined"
            @click.stop="action.isEnabled(item) ? action.action(item) : null"
          >
            {{ action.icon }}
          </span>
        </div>
      </template>
    </ListTableLocalSorting>

    <MissionBookDetails v-model="showDetailsMission" :guide-id="selectedGuide.guideId" />
    <HistoryModal ref="historyModalRef" />
  </section>
</template>

<script setup>
import HistoryModal from './historyModal.vue'
import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import MissionBookDetails from '@/components/mission-plus/MissionBookDetails.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { EEducationSystemGuideStatus } from '@/consts/EEducationSystemGuideStatus.js'
import { getVariantByRule } from '@/consts/legends'
import { formattedDate } from '@/filters/filters'
import '@/libs/clipboard'
import router from '@/router'
import useFilters from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable.js'
import { sortString } from '@/utils/utils'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import EducationSystemMissionsEnableModal from '@/views/pages/teacher-context/educationSystem/EducationSystemMissionsEnableModal.vue'
import { computed, onUnmounted, ref } from 'vue'
import customPlusIcon from '@/assets/images/teacher-context/new-mission/customplus-icon.svg'

const { classe, educationSystemId } = useFilters()
const { bookId } = router.currentRoute.params

const { loading, dataTable, reset, tableRef } = useTable()

const tableColumns = computed(() => {
  if (!classe.value.id) {
    return [
      {
        key: 'unityName',
        label: 'Unidade',
        class: 'font-bold',
        sortable: true,
        sortProperty: 'unityId',
      },
      { key: 'name', label: 'Missão', class: 'font-bold', sortable: true, searchable: true },

      {
        key: 'progress',
        label: 'PROGRESSO MÉDIO',
        sortable: true,
        tooltip:
          'Percentual de turnos/jogos cumpridos dividido pela quantidade de turnos/jogos disponibilizados nas missões.',
      },
      {
        key: 'performance',
        label: 'rendimento médio  ',
        sortable: true,
        tooltip:
          'Calcula-se rendimento com base nos erros e acertos dos alunos em seus desafios (jogadas).',
      },

      {
        key: 'actions',
        label: 'ações',
      },
    ]
  }
  return [
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
})

const tableActions = [
  {
    icon: 'visibility',
    tooltip: () => 'Detalhes da missão',
    isEnabled: () => true,
    action: item => {
      openDetailsMission(item)
    },
  },
  {
    icon: 'pie_chart',
    tooltip: () => 'Relatório da missão',

    isEnabled: item => {
      if (classe.value.id) {
        return (
          item.status === EEducationSystemGuideStatus.Started ||
          item.status === EEducationSystemGuideStatus.Finished ||
          item.status === EEducationSystemGuideStatus.Paused
        )
      }
      return item.progress
    },
    action: item => {
      if (item.isPlus) {
        router.push({
          name: `EducationSystemReportMissionPlusBooks`,
          params: {
            bookId,
            missionId: item.guideId,
            educationSystemId: educationSystemId.value,
          },
        })
      } else {
        router.push({
          name: `EducationSystemReportMissionBooks`,
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
    icon: 'history',
    tooltip: () => 'Histórico de ações',
    isEnabled: () => classe.value.id,
    action: item => {
      openHistoryModal(item)
    },
  },
]

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
    const column = tableColumns.value.find(col => col.key === sortBy.value)
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

const busy = ref(false)

onUnmounted(() => {
  reset()
})

const selectedGuide = ref({})

const showDetailsMission = ref(false)

const openDetailsMission = guide => {
  selectedGuide.value = guide
  showDetailsMission.value = true
}

const historyModalRef = ref(null)

/**
 * Opens the history modal
 * @param {Object} guide - Guide data to view history
 */
const openHistoryModal = guide => {
  historyModalRef.value.openModal(guide)
}
</script>
