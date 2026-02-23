<template>
  <section>
    <!-- LIST -->
    <ListTable
      ref="listTableRef"
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="Pesquisar por missão"
      @change="changeListTable"
    >
      <template #cell(name)="{ item }">
        <p>{{ item.name }}</p>
        <b-badge :variant="`light-${missionStatusEnum[item.situation].variant}`" pill>
          {{ missionStatusEnum[item.situation].label }}
        </b-badge>
      </template>

      <template #cell(createdBy)="{ item }">
        <b-img-lazy
          v-if="item.teacherPicture"
          v-b-tooltip="item.teacherName"
          :src="item.teacherPicture"
          v-bind="userProps"
        />

        <b-avatar
          v-else
          v-b-tooltip.hover.top="item.teacherName"
          :text="getInitials(item.teacherName)"
          v-bind="userProps"
        />
      </template>

      <template #cell(serieName)="{ value }">
        <b-badge pill variant="light-primary">
          {{ value }}
        </b-badge>
      </template>
      <template #cell(progress)="{ item }">
        <span v-if="shouldShowItem(item)">-</span>
        <ProgressBarHorizontalV2
          v-else
          height="12px"
          :value="item.progress"
          :get-variant="getProgressEnum"
          reverse
        >
        </ProgressBarHorizontalV2>
      </template>

      <template #cell(performance)="{ item }">
        <span v-if="shouldShowItem(item)">-</span>
        <PerformanceCell v-else :performance="item.performance" />
      </template>
      <template #cell(time)="{ item }">
        <span v-if="shouldShowItem(item)">-</span>
        <div v-else class="d-flex align-items-center gap-2 justify-content-start">
          <span class="material-symbols-outlined" style="font-size: 16px">pace</span>
          <span class="font-semibold">{{ item.time | formattedTime }}</span>
        </div>
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center justify-content-start gap-3">
          <!-- <span
            v-for="(action, index) in tableActions"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip"
            class="material-symbols-outlined text-primary cursor-pointer"
            @click="action.action(item)"
          >
            {{ action.icon }}
          </span> -->

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
    </ListTable>
    <b-modal
      v-model="showDetailsMission"
      centered
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      size="lg"
      static
      title="Detalhes da Missão"
      @close="showDetailsMission = false"
    >
      <MissionDetails v-if="showDetailsMission" :guide-id="selectedGuide.id" />
    </b-modal>
  </section>
</template>

<script setup>
import useInitials from '@/@core/mixins/ui/avatar.js'
import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTable from '@/components/table/ListTable.vue'
import { getVariantByRule } from '@/consts/legends'
import { proficiencyWithNotCompleted } from '@/consts/legends/proficiencyEnum.js'
import { EGuideSituation, missionStatusEnum } from '@/consts/missionsEnum.js'
import { formattedDate } from '@/filters/filters'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import { formatDecimalPlace } from '@/utils/number.js'
import { computed, getCurrentInstance, ref, onMounted, onUnmounted } from 'vue'

const vm = getCurrentInstance().proxy
const listTableRef = ref(null)
const { classe } = useFilters()
const { getInitials } = useInitials()

const loading = computed(
  () => store.getters['moduleMissionsPlusReportAdminMissionsOverview/loading']
)

const dataTable = computed(
  () => store.getters['moduleMissionsPlusReportAdminMissionsOverview/data']
)
const totalData = computed(
  () => store.getters['moduleMissionsPlusReportAdminMissionsOverview/total']
)

const userProps = {
  blank: true,
  width: 45,
  height: 45,
  blankColor: '#bbb',
  rounded: 'circle',
}

const tableColumns = [
  { key: 'name', label: 'MISSÃO', sortable: true, searchable: true, tdClass: 'font-bold' },
  {
    key: 'createdBy',
    label: 'Autor',
  },
  {
    key: 'startTime',
    label: 'Início',
    sortable: true,
    formatter: value => formattedDate(value),
  },
  {
    key: 'expirationTime',
    label: 'Fim',
    sortable: true,
    formatter: value => formattedDate(value),
  },

  {
    key: 'progress',
    label: 'Progresso Médio',
    sortable: true,
    tooltip:
      'Percentual de turnos/jogos cumpridos dividido pela quantidade de turnos/ jogos disponibilizados nas missões.',
  },
  {
    key: 'performance',
    label: 'Rendimento Médio',
    sortable: true,
    tooltip:
      'Calcula-se rendimento com base nos erros e acertos dos alunos em seus desafios (jogadas).',
  },

  {
    key: 'time',
    label: 'TEMPO MÉDIO INVESTIDO',
    sortable: true,
    tooltip: 'Tempo médio por aluno',
  },
  { key: 'actions', label: 'Ações', sortable: false, thStyle: { width: '120px' } },
]

const openDetailsMission = guide => {
  showDetailsMission.value = true
  selectedGuide.value = guide
}

const openReport = guideId => {
  router.push({
    name: 'missionsPlusClassesMissionOverview',
    params: { guideId, classId: classe.value.id },
  })
}

const tableActions = [
  {
    icon: 'visibility',
    isEnabled: () => true,
    tooltip: () => 'Detalhes da missão',
    action: data => {
      openDetailsMission(data)
    },
  },
  {
    icon: 'pie_chart',
    isEnabled: data =>
      data.situation !== EGuideSituation.NotStarted &&
      data.situation !== EGuideSituation.NotSent,
    tooltip: (data, isEnabled) =>
      isEnabled ? 'Relatório da missão' : 'Relatório indisponível',
    action: data => {
      openReport(data.id)
    },
  },
]

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('moduleMissionsPlusReportAdminMissionsOverview/setParams', {
    Search: searchQuery,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })

  store.dispatch('moduleMissionsPlusReportAdminMissionsOverview/fetch')
}

const selectedGuide = ref(null)
const showDetailsMission = ref(false)

const closeDetailsMissionPrompt = () => {
  showDetailsMission.value = false
}

const shouldShowItem = item => {
  return (
    item.situation === EGuideSituation.NotSent ||
    item.situation === EGuideSituation.NotStarted
  )
}

onMounted(() => {
  vm.$bus.on('resetPage', () => {
    listTableRef.value.resetPage()
  })
})

onUnmounted(() => {
  vm.$bus.off('resetPage')
})

const getPerformanceEnum = value => {
  return getVariantByRule(value, 'accuracyPerformance')
}

const getProgressEnum = value => {
  return getVariantByRule(value, 'progress')
}
</script>

<script>
export default {
  components: {
    PerformanceCell,
    ListTable,
    ProgressBarHorizontalV2,
    MissionDetails: () => import('@/components/mission-plus/MissionDetailsPlus.vue'),
  },
}
</script>

<style lang="scss">
  .th-head-arrow-white {
    background-image: url(@/assets/images/arrows/arrows-white.svg) !important;
  }
</style>