<template>
  <ListTableLocalSorting
    :table-columns="tableColumns"
    :data-table="dataTable"
    search-placeholder="searchForStudent"
    :loading="loading"
    :generating-excel="generatingExcel"
    :export-to-excel="exportToExcel"
  >
    <template #cell(studentName)="{ item }">
      <div class="text-wrap" style="min-width: 200px">
        <span class="align-text-top font-bold">{{ item.studentName }}</span>
      </div>
    </template>

    <template #cell(progress)="{ item }">
      <SemaphoreStatus
        :status-enum="getVariantByRule(formatDecimalPlace(item.progress), 'progress')"
      >
        <span>{{ formatDecimalPlace(item.progress) | formatPercentToPtBr }}</span>
      </SemaphoreStatus>
    </template>

    <template #cell(activitiesFinished)="{ item }">
      <span>{{ item.activitiesFinished | formatNumber }}</span>
    </template>

    <template #cell(lastPlayData)="{ item }">
      {{ formatDate(item.lastPlayData) }}
    </template>

    <template #cell(totalTime)="{ item }">
      <span>{{ item.totalTime | formattedTime }}</span>
    </template>

    <template #cell(actions)="{ item }">
      <div class="text-nowrap d-flex align-items-center gap-1 cursor-pointer text-primary">
        <span
          v-for="(action, index) in actions"
          :key="index"
          v-b-tooltip.hover.top="action.tooltip(item)"
          class="material-symbols-outlined"
          @click="action.action(item)"
        >
          {{ action.icon }}
        </span>
      </div>
    </template>
  </ListTableLocalSorting>
</template>

<script setup>
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { getVariantByRule } from '@/consts/legends/index.js'
import SchoolYearBadge from '@/layouts/components/SchoolYearBadge.vue'
import { useRoute, useRouter } from 'vue-router/composables'
import { getEducationSystemStudentsExcel } from '@/services/shared/educationSystem/EducationSystem.Service.js'
import formatDate from '@/utils/date.js'
import { calcPercent, formatDecimalPlace } from '@/utils/number.js'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { saveAs } from 'file-saver'
import { ref, toRefs } from 'vue'

const props = defineProps({
  dataTable: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  params: {
    type: Object,
    default: () => {},
  },
  educationSystemName: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: '',
  },
})

const { params } = toRefs(props)
const route = useRoute()

const educationSystemId = route.params.educationSystemId

const tableColumns = [
  { key: 'studentName', label: 'Aluno', sortable: true, searchable: true },
  { key: 'progress', label: 'Progresso', sortable: true },
  {
    key: 'activitiesFinished',
    label: 'Jogos Finalizados',
    tooltip:
      'Jogos em que o aluno jogou todos os desafios propostos, seja os completando com sucesso ou perdendo. O aluno poderá jogar novamente um jogo finalizado sem alterar seu percentual de progresso.',
  },
  { key: 'lastPlayData', label: 'Última VEZ QUE JOGOU' },
  { key: 'totalTime', label: 'TEMPO DE APRENDIZAGEM' },
]

const generatingExcel = ref(false)

const exportToExcel = () => {
  generatingExcel.value = true
  getEducationSystemStudentsExcel(educationSystemId, {
    SubjectId: params.value.SubjectId,
    SerieId: params.value.SerieId,
    ClassId: params.value.ClassId,
  })
    .then(response => {
      const fileName = `Relatórios Gerais - Sistema de Ensino - ${props.educationSystemName} - ${props.className} - Visão Geral.xlsx`
      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    })
}

// Actions for the actions column (if present in the original context)
const actions = []

</script>