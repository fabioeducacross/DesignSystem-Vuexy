<template>
  <section>
    <MissionReportStudentsCards
      :students-finished="missionReportStudents.studentsFinished"
      :total-students="missionReportStudents.totalStudents"
      :challenges-done="missionReportStudents.challengesDone"
      :performance="missionReportStudents.performance"
      :total-time="missionReportStudents.totalTime"
    />
    <ListTableLocalSorting
      ref="listTable"
      :table-columns="tableColumns"
      :data-table="dataTable"
      search-placeholder="searchForStudent"
      show-view-selection
      :loading="loading"
    >
      <template #cell(name)="{ item }">
        <div class="d-flex align-items-center">
          <span class="align-text-top text-wrap font-bold">{{ item.name }}</span>
        </div>
      </template>

      <template #cell(time)="{ item }">
        <div class="text-nowrap">
          {{ item.time | formattedTime('Não jogou') }}
        </div>
      </template>

      <template #cell(challengesDone)="{ item }">
        <div class="text-nowrap">
          {{ item.challengesDone | formatNumber }}
        </div>
      </template>

      <template #cell(progress)="{ item }">
        <SemaphoreStatus
          :status-enum="setRangeColor(formatDecimalPlace(item.progress))"
          has-tooltip
        >
          <span>{{ formatDecimalPlace(item.progress) | formatPercentToPtBr }}</span>
        </SemaphoreStatus>
      </template>
      <template #cell(performance)="{ item }">
        <SemaphoreStatus
          :status-enum="setRangeColor(formatDecimalPlace(item.performance))"
          has-tooltip
        >
          <span>{{ formatDecimalPlace(item.performance) | formatPercentToPtBr }}</span>
        </SemaphoreStatus>
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center gap-3">
          <span
            v-for="(action, index) in reportActions"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip(item)"
            class="material-symbols-outlined text-primary cursor-pointer"
            @click="action.action(item)"
          >
            {{ action.icon }}
          </span>
        </div>
      </template>

      <template v-slot:card="{ data }">
        <MissionReportStudentsCard
          :student="data"
          :report-actions="reportActions"
          :show-performance="showPerformanceCard"
        />
      </template>
    </ListTableLocalSorting>
  </section>
</template>

<script setup>
import MissionReportStudentsCards from './components/MissionReportStudentsCards.vue'
import MissionReportStudentsCard from './components/MissionReportStudentsTableCard.vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { SemaphoreStatusEnum } from '@/consts/StatusEnums.js'
import MissionTypeEnum from '@/consts/admin-context/enums/mission.js'
import { StatusEnum } from '@/consts/evaluationsEnum.js'
import router from '@/router'
import { getMissionReport } from '@/services/shared/reports/Report.service'
import useFilters from '@/store/filters/useFilters'
import { formatDecimalPlace } from '@/utils/number.js'
import UtilTeacherService from '@/utils/teacher-utils/utils'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { onMounted, ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  filters: {
    type: Object,
    default: () => {},
  },
})

// Emits
const emit = defineEmits(['mission-details'])

// State
const missionReportStudents = ref({})
const missionId = ref(router.currentRoute.params.missionId)
const { classe } = useFilters()
const educationSystemId = ref(router.currentRoute.params.educationSystemId)

const listTable = ref(null)
const loading = ref(false)

const isCollectiveFieldsOnly = ['performance']

const fields = [
  { key: 'name', label: 'Aluno', sortable: true, searchable: true },
  { key: 'challengesDone', label: 'Desafios realizados', sortable: true },
  { key: 'progress', label: 'Progresso do aluno', sortable: true },
  { key: 'performance', label: 'Desempenho do aluno', sortable: true },
  { key: 'time', label: 'Tempo de aprendizagem', sortable: true },
  { key: 'actions', label: 'Ações', sortable: false },
]

const tableColumns = computed(() => {
  if (UtilTeacherService.activityType.isCollective(missionReportStudents.value.type)) {
    return fields.filter(field => !isCollectiveFieldsOnly.includes(field.key))
  }
  return fields
})

const showPerformanceCard = computed(() => {
  return tableColumns.value.some(objeto => objeto.key === 'performance')
})

const dataTable = ref([])
const totalData = ref(0)

const missionDetails = ref({
  name: null,
  date: null,
  type: null,
  loading: true,
})

const breadcrumbRoot = router.currentRoute.meta.breadcrumb[0].text

const openDetails = studentsList => {
  if (breadcrumbRoot === 'High Five') {
    return {
      name: 'HighFiveStudentDetailMissionReport',
      params: {
        missionId: missionId.value,
        studentId: studentsList.id,
        from: 'highfive',
      },
    }
  }

  if (breadcrumbRoot === 'booksAndMissions') {
    return {
      name: `StudentDetailMissionReportEducationSystem${educationSystemId.value}`,
      params: {
        bookId: router.currentRoute.params.bookId,
        missionId: missionId.value,
        studentId: studentsList.id,
        educationSystemId: educationSystemId.value,
      },
    }
  }

  if (breadcrumbRoot === 'generalReports' || breadcrumbRoot === 'Reports') {
    return {
      name: `EducationSystemReportStudentDetail${educationSystemId.value}`,
      params: {
        missionId: missionId.value,
        studentId: studentsList.id,
        educationSystemId: educationSystemId.value,
      },
    }
  }

  return {
    name: 'StudentDetailMissionReport',
    params: {
      bookId: router.currentRoute.params.bookId,
      educationSystemId: educationSystemId.value,
      missionId: missionId.value,
      studentId: studentsList.id,
    },
  }
}

const reportActions = [
  {
    icon: 'visibility',
    tooltip: () => 'Ver detalhes',
    label: 'Ver detalhes',
    action: data => {
      router.push(openDetails(data))
    },
  },
]

const fetchData = () => {
  loading.value = true
  getMissionReport({ id: missionId.value, classId: classe.value.ClassId })
    .then(({ data }) => {
      missionReportStudents.value = data
      dataTable.value = data.students

      missionDetails.value.name = data.guideName
      missionDetails.value.date = data.date
      missionDetails.value.type = MissionTypeEnum[data.type] || data.type
      missionDetails.value.application = data.application
      missionDetails.value.loading = false
      emit('mission-details', missionDetails.value)
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  fetchData()
})

watch(
  [classe],
  () => {
    fetchData()
  },
  { deep: true },
)

const setRangeColor = value => {
  let variant = {}

  switch (true) {
    case value >= 70:
      variant = SemaphoreStatusEnum[3]
      break
    case value < 70 && value >= 30:
      variant = SemaphoreStatusEnum[2]
      break
    default:
      variant = SemaphoreStatusEnum[1]
      break
  }

  return variant
}
</script>