<template>
  <b-modal
    ref="Modal"
    :visible="value"
    title="Alunos neste nível de proficiência"
    size="xl"
    hide-footer
    centered
    static
    header-bg-variant="light-primary"
    @close="closeModal"
  >
    <div>
      <b-card
        body-class="p-1 d-flex flex-col flex-md-row justify-content-between gap-2"
        class="card-style border shadow-none"
      >
        <div class="d-flex text-primary font-bold gap-2 align-items-center">
          <span class="material-symbols-outlined">{{ proficiencyData.icon }}</span>
          {{ proficiencyData.name }}
        </div>
        <div class="d-flex align-items-center gap-1">
          Nível:
          <BadgeStatusReadingExpedition
            :value="proficiencyData.level"
            enum="ProficiencyTestStatusEnum"
          />
        </div>
      </b-card>
      <ListTableLocalSorting
        :loading="loading"
        :table-columns="tableColumns"
        :data-table="dataTable"
        :total-data="totalData"
        search-placeholder="searchForStudent"
        border
      >
        <template #cell(stagesComplete)="{ item }">
          <ProgressBarHorizontalV2
            show-values
            height="12px"
            :value="item.stagesComplete"
            :max="item.totalStages"
            :get-variant="getStudentProficiencyEnum"
            values-divisor=" de "
          >
          </ProgressBarHorizontalV2>
        </template>
        <template #cell(totalTime)="{ item }">
          <div class="d-flex align-items-center gap-2 justify-content-start">
            <span class="material-symbols-outlined" style="font-size: 16px">pace</span>
            <span class="font-semibold">{{ item.totalTime | formattedTime }}</span>
          </div>
        </template>
      </ListTableLocalSorting>
      <LegendEnum :legends="[legend]" border />
    </div>
  </b-modal>
</template>

<script setup>
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import {
  getStudentProficiencyEnum,
  StudentProficiencyEnum,
} from '@/consts/ReadingExpeditionEnum.js'
import store from '@/store'
import formatDate from '@/utils/date'
import CustomBadge from '@/views/pages/reading-expedition/components/CustomBadge.vue'
import BadgeStatusReadingExpedition from '@/views/pages/reading-expedition/overview/components/BadgeStatusReadingExpedition.vue'
import { computed } from 'vue'

// Props
const props = defineProps({
  proficiencyData: {
    type: Object,
  },
  value: {
    type: Boolean,
  },
})

// Emits
const emit = defineEmits(['input'])

// Loading state
const loading = computed(
  () => store.getters['readingExpeditionModuleOverviewAdmin/loadingStudents'],
)

// Table columns
const tableColumns = [
  { key: 'name', label: 'Aluno', sortable: true, searchable: true },
  { key: 'className', label: 'Turma', sortable: true },
  {
    label: 'ETAPAS CONCLUÍDAS',
    key: 'stagesComplete',
  },
  {
    key: 'totalTime',
    label: 'TEMPO TOTAL INVESTIDO',
    sortable: true,
  },
  {
    key: 'lastAccess',
    label: 'ÚLTIMO ACESSO',
    sortable: true,
    formatter: value => formatDate(value),
  },
]

// Table data and total
const dataTable = computed(
  () => store.getters['readingExpeditionModuleOverviewAdmin/students'],
)
const totalData = computed(() => dataTable.value.length || 0)

// Close modal handler
const closeModal = () => {
  emit('input', false)
}

// Legend
const legend = {
  text: '',
  enum: StudentProficiencyEnum,
}
</script>

<style lang="scss" scoped>
  .modal-icon {
    font-size: 80px;
  }
  .card-style {
    border-color: #d8d6de !important;
  }
</style>