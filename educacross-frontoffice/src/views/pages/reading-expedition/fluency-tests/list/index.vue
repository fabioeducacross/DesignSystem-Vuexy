<template>
  <section>
    <b-card class="shadow-none" body-class="p-0" :class="currentItemClass">
      <b-skeleton-wrapper :loading="loading" class="w-100">
        <template v-slot:loading>
          <b-row class="p-1">
            <b-col v-for="index in 5" :key="index" cols="12" md>
              <b-skeleton type="card" height="175px" class="w-100 rounded" />
            </b-col>
          </b-row>
        </template>
        <b-row class="p-1">
          <b-col v-for="proficiency in proficiencyData" :key="proficiency.proficiency" cols="12" md>
            <b-card border-variant="gray" class="border h-100">
              <div class="text-center mb-1">
                <span>
                  <MediaCardIcon
                    :icon="getReadingProficiencyEnum(proficiency.proficiency).icon"
                    :variant="getReadingProficiencyEnum(proficiency.proficiency).variant"
                  /></span>
              </div>
              <div class="font-bold text-center mb-50">
                {{ getReadingProficiencyEnum(proficiency.proficiency).text }}
              </div>

              <div
                :class="`text-${getReadingProficiencyEnum(proficiency.proficiency).variant}`"
                class="font-bold text-center"
              >
                {{ $filters.formatNumber(proficiency.percentage) }}%
              </div>

              <ProgressBarHorizontalV2
                show-values
                height="6px"
                :value="proficiency.students"
                :max="totalStudents"
                :variant-object="getReadingProficiencyEnum(proficiency.proficiency)"
              >
                <template v-slot="{ item }"
                  >
                  <div class="d-flex justify-content-center">
                    <span class=""
                      ><span class="font-bold">{{ $filters.formatNumber(item.value) }}</span> de
                      {{ $filters.formatNumber(item.max) }} alunos</span
                    >
                  </div>
                </template>
              </ProgressBarHorizontalV2>
            </b-card>
          </b-col>
        </b-row>
      </b-skeleton-wrapper>

      <ListTable
        :table-columns="tableColumns"
        :data-table="dataTable"
        :loading="loading"
        :total-data="totalData"
        search-placeholder="searchForStudent"
        :export-to-excel="exportToExcel"
        :generating-excel="generatingExcel"
        @change="changeListTable"
      >
        <template #cell(name)="{ item }">
          <div class="d-flex align-items-center gap-2 text-primary" style="min-width: 220px">
            <span class="material-icons-outlined cursor-pointer" @click="emitOpenModal(item)">
              airplane_ticket
            </span>
            <span class="font-bold cursor-pointer" @click="emitOpenModal(item)">
              {{ item.name }}
            </span>
          </div>
        </template>

        <template #cell(proeficiency)="{ item }">
          <CellStatusReadingExpedition
            v-if="item.level !== 0"
            :value="item.level"
            enum="ProficiencyTestStatusEnum"
            :time="item.time"
            :pill="!item.changeLevel"
          />
          <b-badge v-else variant="outline-secondary" pill>NAO INICIADO</b-badge>
        </template>

        <template #cell(actions)="{ item }">
          <div class="text-nowrap d-flex align-items-center gap-3">
            <span
              v-for="(action, index) in tableActions"
              :key="index"
              v-b-tooltip.hover.top="action.tooltip(item, action.isEnabled(item))"
              :class="
                action.isEnabled(item)
                  ? `${action.color} cursor-pointer`
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
    </b-card>
    <div class="d-flex justify-content-end">
      <SidebarInfo />
    </div>
  </section>
</template>

<script setup>
import MediaCardIcon from '@/components/card/MediaCardIcon.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTable from '@/components/table/ListTable.vue'
import { getReadingProficiencyEnum } from '@/consts/ReadingExpeditionEnum.js'
import router from '@/router'
import { getReadingFluencyTestResultsExcel } from '@/services/shared/reading-expedition/reading-expedition.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import SidebarInfo from '@/views/pages/reading-expedition/components/SidebarInfo.vue'
import CellStatusReadingExpedition from '@/views/pages/reading-expedition/overview/components/CellStatusReadingExpedition.vue'
import { saveAs } from 'file-saver'
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue'

const vm = getCurrentInstance().proxy

const { classe } = useFilters()

const testId = computed(() => store.getters['ReadingExpeditionModule/testId'])

watch([testId], () => {
  if (testId.value) {
    store.commit('readingExpeditionFluencyTestModule/reset')
    store.dispatch('readingExpeditionFluencyTestModule/fetch')
    updateBreadcrumb()
  }
})

onMounted(() => {
  if (testId.value) {
    store.dispatch('readingExpeditionFluencyTestModule/fetch')
    updateBreadcrumb()
  }
})

const loading = computed(() => store.getters['readingExpeditionFluencyTestModule/loading'])

const tableColumns = [
  {
    key: 'name',
    label: 'Aluno',
    searchable: true,
    sortable: true,
  },

  {
    key: 'proeficiency',
    label: 'Proficiencia Leitora',
    thStyle: { width: '220px' },
    class: 'position-relative text-center',
    sortable: false,
    labelClass: 'justify-content-center',
  },

  {
    key: 'actions',
    label: 'Acoes',
    thStyle: { width: '120px' },
  },
]

const tableActions = [
  {
    icon: 'pie_chart',
    tooltip: () => {
      return ''
    },
    isEnabled: data => data.level,
    color: 'text-primary',
    action: data => {
      router.push({
        name: 'readingExpeditionFluencyTestStudent',
        params: {
          studentId: data.id,
          testId: testId.value,
        },
      })
    },
  },
]

const dataTable = computed(() => store.getters['readingExpeditionFluencyTestModule/data'])
const totalData = computed(() => store.getters['readingExpeditionFluencyTestModule/total'])

const proficiencyData = computed(
  () => store.getters['readingExpeditionFluencyTestModule/proficiency'],
)

const totalStudents = computed(
  () => store.getters['readingExpeditionFluencyTestModule/totalStudents'],
)

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('readingExpeditionFluencyTestModule/params', {
    Search: searchQuery,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })

  store.dispatch('readingExpeditionFluencyTestModule/fetch')
}

const generatingExcel = ref(false)

const exportToExcel = () => {
  getReadingFluencyTestResultsExcel({
    ClassId: classe.value.ClassId,
    Stage: testId.value,
    Search: store.getters['readingExpeditionFluencyTestModule/search'],
  })
    .then(response => {
      const fileName = 'Expedicao Leitura - Testes de Fluencia.xlsx'
      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    })
}

const updateBreadcrumb = () => {
  const test = store.getters['ReadingExpeditionModule/test']
  vm.$bus.emit('setBreadcrumb', [null, test?.test])
}

const currentItemClass = computed(
  () => store.getters['ReadingExpeditionModule/currentTestClass'],
)

const emitOpenModal = item => {
  vm.$bus.emit('openStudentPassportModal', item.id)
}

vm.$bus.emit('setTabTitle', 'VISAO DA TURMA')
store.commit('ReadingExpeditionModule/studentName', null)
</script>
