<script setup>
import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ESelect from '@/components/selects/ESelect.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import router from '@/router'
import useFilters from '@/store/filters/useFilters'
import { sortString } from '@/utils/utils'
  import {useEducationSystemBooks} from '@/views/pages/teacher-context/educationSystem/books/useEducationSystemBooks'
import { computed, ref, watch, onMounted, getCurrentInstance } from 'vue'

const emit = defineEmits(['update:books'])

const refListTable = ref(null)
const { educationSystemId, subject } = useFilters()
const { books, loading, onlyInProgress, fetchData } = useEducationSystemBooks()

const search = ref('')
const perPage = ref(5)
const ascendingRadio = ref(true.toString())

const currentSortBy = ref('name')
      const currentSortDesc = ref(false)

      const sortedBooks = computed(() => {
        if (!books.value || books.value.length === 0) {
          return []
        }

        const sortBy = currentSortBy.value
        const sortDesc = currentSortDesc.value

        const shouldIgnorePriority = sortBy === 'name'

        const compareValues = (a, b) => {
          const aValue = a[sortBy]
          const bValue = b[sortBy]

          let result = 0

          if (typeof aValue === 'number' && typeof bValue === 'number') {
            result = aValue - bValue
          } else if (aValue == null && bValue == null) {
            result = 0
          } else if (aValue == null) {
            result = 1
          } else if (bValue == null) {
            result = -1
          } else {
            result = sortString(aValue, bValue)
          }

          // Reverse if descending is true
          return sortDesc ? -result : result
        }

        if (shouldIgnorePriority) {
          return [...books.value].sort(compareValues)
        }

        const withGuide = books.value.filter(book => book.hasGuideEnabled === true)
        const withoutGuide = books.value.filter(book => book.hasGuideEnabled !== true)

        const sortedWithGuide = [...withGuide].sort(compareValues)
        const sortedWithoutGuide = [...withoutGuide].sort(compareValues)

        return [...sortedWithGuide, ...sortedWithoutGuide]
      })

      const applySortWithPriority = () => {
        if (refListTable.value) {
          currentSortBy.value = refListTable.value.sortBy
          currentSortDesc.value = refListTable.value.sortDesc
        }
      }
const totalData = computed(() => books.value.length)

const tableColumns = [
  {
    key: 'name',
    label: 'Livro',
    searchable: true,
    sortable: true,
  },
  {
    key: 'progress',
    label: 'Progresso Médio',
    tooltip:
      'Percentual de turnos/jogos cumpridos dividido pela quantidade de turnos/jogos disponibilizados nas missões.',
    sortable: true,
  sortType: 'number',},
  {
    key: 'performance',
    label: 'Rendimento Médio',
    tooltip:
      'Calcula-se rendimento com base nos erros e acertos dos alunos em seus desafios (jogadas).',
    sortable: true,sortType: 'number',
  },
  {
    key: 'actions',
    label: 'AÇÕES',
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

const vm = getCurrentInstance().proxy

const tableActions = [
  {
    icon: 'pie_chart',
    tooltip: () => 'Ver Missões',
    isEnabled: () => true,
    action: data => {
      vm.$bus.emit('stopBooksTour')

      router.push({
        name: `EducationSystemMissions${educationSystemId.value}`,
        params: {
          educationSystemId: educationSystemId.value,
          bookId: data.id,
        },
      })
    },
  },
]

watch([subject, educationSystemId, onlyInProgress], async () => {
  if (refListTable.value) refListTable.value.resetPage()
  await fetchData()
  emit('update:books', totalData.value)
})

</script>

<template>
  <div>
    <ListTableLocalSorting
      ref="refListTable"
      :total-data="totalData"
      :data-table="sortedBooks"
      :table-columns="tableColumns"
      sort-by-default="name"
      :sort-desc-default="false"
      disable-internal-sort
      show-view-selection
      item-view-default="grid-view"
      :loading="loading"
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
            <b-img-lazy v-bind="tableImageConfig" :src="item.imageUrl" style="max-height: 40px" />
          </template>
          <div>
            <h6 class="mb-0 text-body font-bold">
              {{ item.name }}
            </h6>
          </div>
        </b-media>
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
  </div>
</template>

<style lang="css">
  .card-title-box {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-clamp: 3;
  }
</style>
