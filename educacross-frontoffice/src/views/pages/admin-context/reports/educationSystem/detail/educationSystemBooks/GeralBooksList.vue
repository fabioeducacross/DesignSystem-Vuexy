<template>
  <ListTableLocalSorting
    ref="refListTable"
    :loading="loading"
    :table-columns="tableColumns"
    :data-table="sortedDataTable"
    sort-by-default="serieName"
    :sort-desc-default="false"
    disable-internal-sort
    show-view-selection
    item-view-default="grid-view"
    :per-page-default="12"
    :columns="3"
    :per-page-options="[4, 12, 24, 50, 100]"
    search-placeholder="Pesquisar por livro"
    @update:sortBy="applySortWithPriority"
    @update:sortDesc="applySortWithPriority"
  >
    <template v-slot:card="{ data }">
      <b-card body-class="d-flex flex-col gap-2 justify-content-between education-system-card">
        <div class="flex-2">
          <div class="mb-1 d-flex justify-content-center">
            <b-badge pill variant="light-primary">
              {{ data.serieName }}
            </b-badge>
          </div>
          <div class="d-flex justify-content-center">
            <div
              v-b-tooltip="tableActions[0].tooltip()"
              class="cursor-pointer"
              @click.stop="tableActions[0].action(data)"
            >
              <b-img-lazy
                v-bind="cardImageConfig"
                :src="data.imageUrl"
                fluid-grow
                class="mb-1"
                style="max-width: 150px"
              />
            </div>
          </div>

          <div class="card-title-box">
            <h3 class="text-center text-body">{{ data.name }}</h3>
          </div>

          <div v-if="data.hasGuideEnabled">
            <div>
              <span class="align-middle font-medium">Progresso médio </span>
              <span
                v-b-tooltip="
                  'Percentual de turnos/jogos cumpridos dividido pela quantidade de turnos/jogos disponibilizados nas missões.'
                "
                class="material-symbols-outlined font-14 align-middle"
                >info</span
              >
            </div>
            <ProgressBarHorizontalV2 :value="data.progress" enum="progress" class="mb-1">
              <template v-slot="{ item }">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="font-bold" :class="item.variant.textClass"
                    >{{ item.percent | formatNumber }}%</span
                  >
                  <b-badge
                    pill
                    :variant="`light-${item.variant.variant}`"
                    :class="`border-${item.variant.variant}`"
                    class="uppercase"
                  >
                    {{ $t(item.variant.badgeLabel) }}
                  </b-badge>
                </div>
              </template>
            </ProgressBarHorizontalV2>

            <div>
              <span class="align-middle font-medium">Rendimento médio </span>
              <span
                v-b-tooltip="
                  'Calcula-se rendimento com base nos erros e acertos dos alunos em seus desafios (jogadas).'
                "
                class="material-symbols-outlined font-14 align-middle"
                >info</span
              >
            </div>
            <ProgressBarHorizontalV2
              :value="data.performance"
              enum="accuracyPerformance"
              class="mb-1"
            >
              <template v-slot="{ item }">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="font-bold" :class="item.variant.textClass">
                    {{ item.percent | formatNumber }}%
                  </span>
                  <b-badge
                    pill
                    :variant="`light-${item.variant.variant}`"
                    :class="`border-${item.variant.variant}`"
                    class="uppercase"
                  >
                    {{ item.variant.badgeLabel }}
                  </b-badge>
                </div>
              </template>
            </ProgressBarHorizontalV2>
          </div>
        </div>
        <div
          v-if="!data.hasGuideEnabled"
          class="d-flex align-items-center justify-content-center mb-4"
        >
          <b-badge pill variant="light-secondary"> Nenhuma missão em andamento</b-badge>
        </div>
        <div class="d-flex align-items-center justify-content-center">
          <b-button
            size="sm"
            class="d-flex align-items-center justify-content-center gap-2"
            variant="primary"
            @click="tableActions[0].action(data)"
          >
            <span class="material-symbols-outlined" style="font-size: 18px"> visibility </span>Ver
            Missões
          </b-button>
        </div>
      </b-card>
    </template>

    <!--    inicio tabela-->

    <template #cell(name)="{ item }">
      <b-media vertical-align="center" class="align-items-center">
        <template v-slot:aside>
          <b-img-lazy
            v-bind="tableImageConfig"
            :src="item.imageUrl"
            rounded="circle"
            style="height: 40px; width: 40px"
          />
        </template>
        <div>
          <h6 class="mb-0 text-body font-bold">
            {{ item.name }}
          </h6>
        </div>
      </b-media>
    </template>
    <template #cell(serieName)="{ value }">
      <b-badge pill variant="light-primary">{{ value }}</b-badge>
    </template>
    <template #cell(progress)="{ item }">
      <div>
        <b-badge v-if="!item.hasGuideEnabled" pill variant="light-secondary">
          <span class="text-body">Nenhuma missão em andamento</span>
        </b-badge>
        <ProgressBarHorizontalV2
          v-else
          height="12px"
          enum="progress"
          :value="item.progress"
          reverse
        />
      </div>
    </template>
    <template #cell(performance)="{ item }">
      <PerformanceCell v-if="item.hasGuideEnabled" :performance="item.performance" />
    </template>
    <template #cell(actions)="{ item }">
      <div class="text-nowrap d-flex align-items-center justify-content-start gap-3">
        <span
          v-for="(action, index) in tableActions"
          :key="index"
          v-b-tooltip.hover.top="action.tooltip"
          class="material-symbols-outlined text-primary cursor-pointer"
          :class="
            action.isEnabled(item)
              ? `${action.color} cursor-pointer`
              : 'cursor-not-allowed text-muted'
          "
          @click.stop="action.isEnabled(item) ? action.action(item) : null"
        >
          {{ action.icon }}
        </span>
      </div>
    </template>
  </ListTableLocalSorting>
</template>

<script setup>
import EducationSystemReportBookCard from '../../components/EducationSystemReportBookCard.vue'
import MissionLiga from '@/assets/icons/mission-icons/MissionLiga.vue'
import MissionMath from '@/assets/icons/mission-icons/MissionMath.vue'
import MissionMathIng from '@/assets/icons/mission-icons/MissionMathIng.vue'
import MissionPort from '@/assets/icons/mission-icons/MissionPort.vue'
import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTable from '@/components/table/ListTable.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import SchoolYearBadge from '@/layouts/components/SchoolYearBadge.vue'
import router from '@/router'
import { calcPercent, formatDecimalPlace } from '@/utils/number.js'
import { sortString } from '@/utils/utils'
import { computed, ref, toRef } from 'vue'

const props = defineProps({
  dataTable: {
    type: Array,
  },
  totalData: {
    type: Number,
  },
  loading: {
    type: Boolean,
  },
  params: {
    type: Object,
    default: () => {},
  },
  educationSystemName: {
    type: String,
    default: '',
  },
  institutionName: {
    type: String,
    default: '',
  },
})

const educationSystemId = router.currentRoute.params.educationSystemId
const refListTable = ref(null)
const dataTableProp = toRef(props, 'dataTable')

const currentSortBy = ref('serieName')
const currentSortDesc = ref(false)

const sortedDataTable = computed(() => {
  const sourceData = dataTableProp.value

        if (!sourceData || sourceData.length === 0) {
    return []
  }

  const sortBy = currentSortBy.value
  const sortDesc = currentSortDesc.value

  const shouldIgnorePriority = sortBy === 'name' || sortBy === 'serieName'

  const compareValues = (a, b) => {
    const aValue = a[sortBy]
    const bValue = b[sortBy]

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return aValue - bValue
    }

    if (aValue == null && bValue == null) return 0
    if (aValue == null) return 1
    if (bValue == null) return -1

    return sortString(aValue, bValue)
  }

  if (shouldIgnorePriority) {
    const sorted = [...sourceData].sort(compareValues)

    if (sortDesc) {
      sorted.reverse()
    }

    return sorted
  }

  const withGuide = sourceData.filter(book => book.hasGuideEnabled === true)
  const withoutGuide = sourceData.filter(book => book.hasGuideEnabled !== true)

  const sortedWithGuide = [...withGuide].sort(compareValues)
  const sortedWithoutGuide = [...withoutGuide].sort(compareValues)

  if (sortDesc) {
    sortedWithGuide.reverse()
    sortedWithoutGuide.reverse()
  }

  return [...sortedWithGuide, ...sortedWithoutGuide]
})

const applySortWithPriority = () => {
  if (refListTable.value) {
    currentSortBy.value = refListTable.value.sortBy
    currentSortDesc.value = refListTable.value.sortDesc
  }
}

const tableColumns = [
  {
    key: 'name',
    label: 'Livro',
    searchable: true,
    sortable: true,
  },
  {
    key: 'serieName',
    label: 'Ano Escolar',
    sortable: true,
  },
  {
    key: 'progress',
    label: 'Progresso Médio',
    tooltip:
      'Percentual de turnos/jogos cumpridos dividido pela quantidade de turnos/jogos disponibilizados nas missões.',
    sortable: true,
    sortType: 'number',
  },
  {
    key: 'performance',
    label: 'Rendimento Médio',
    tooltip:
      'Calcula-se rendimento com base nos erros e acertos dos alunos em seus desafios (jogadas).',
    sortable: true,
    sortType: 'number',
  },
  {
    key: 'actions',
    label: 'AÇÕES',
  },
]

const SubjectEnum = {
  1: {
    name: 'Matemática',
    path: '@/assets/icons/mission-icons/MissionMath.vue',
  },
  2: {
    name: 'Português',
    path: '@/assets/icons/mission-icons/MissionPort.vue',
  },
  3: {
    name: 'Liga das Corujinhas',
    path: '@/assets/icons/mission-icons/MissionLiga.vue',
  },
  4: {
    name: 'Math',
    path: '@/assets/icons/mission-icons/MissionMathIng.vue',
  },
}

const generatingExcel = ref(false)

const tableActions = [
  {
    icon: 'pie_chart',
    tooltip: () => 'Ver Missões',
    isEnabled: () => true,
    action: data => {
      router.push({
        name: `educationSystemReportMissionsBooks`,
        params: {
          educationSystemId,
          bookId: data.id,
        },
      })
    },
  },
]

const cardImageConfig = {
  blank: true,
  blankColor: '#bbb',
}

const tableImageConfig = {
  blank: true,
  blankColor: '#bbb',
}
</script>

<style lang="scss" scoped>
  .material-symbols-outlined.head-icon-info {
    font-size: 16px;
  }

  .user-cell {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-width: 200px;

    .image-container {
      max-width: 40px;
      max-height: 40px;
      border-radius: 8px;
    }

    span {
      margin-left: 5px;
      font-size: 14px;
      max-height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
