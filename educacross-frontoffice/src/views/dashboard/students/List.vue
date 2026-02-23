<template>
  <section>
    <ListTableSelectLocal
      ref="listTableRef"
      v-model="selectedData"
      :loading="loading"
      :table-columns="columns"
      :data-table="dataTable"
      :per-page-options="[5, 10, 50, 100]"
      :generating-excel="generatingExcel"
      :export-to-excel="exportToExcel"
      search-placeholder="searchForStudent"
    >
      <template #head(challengesDone)="item">
        <div class="d-flex align-items-center gap 1">
          {{ item.label }}
          <span
            v-b-tooltip.hover="$t('challengesDone')"
            class="material-symbols-outlined ml-1 head-icon-info"
            style="font-size: 16px"
          >
            info
          </span>
        </div>
      </template>
      <template #head(progress)="item">
        <div class="d-flex align-items-center gap 1">
          {{ item.label }}
          <span
            v-b-tooltip.hover="
              'Calcula-se rendimento com base nos erros e acertos dos alunos em seus desafios.'
            "
            class="material-symbols-outlined ml-1 head-icon-info"
            style="font-size: 16px"
          >
            info
          </span>
        </div>
      </template>
      <template #cell(studentName)="{ item }">
        <div class="d-flex align-items-center justify-content-start gap-2">
          <span class="font-bold">{{ item.studentName }}</span>
          <b-badge v-if="!item.studentAccess" pill variant="light-danger" class="ml-50">
            Não acessou
          </b-badge>
        </div>
      </template>
      <template #cell(performance)="{ item }">
        <PerformanceCell :performance="item.performance" />
      </template>

      <template #cell(challengesDone)="{ item }">
        <ConditionalValueDisplay :value="item.challengesDone" :layout="'badge'">
          {{ item.challengesDone | formatNumber }}
        </ConditionalValueDisplay>
      </template>

      <template #cell(totalTime)="{ item }">
        <ConditionalValueDisplay :value="item.totalTime" :layout="'badge'">
          {{ item.totalTime | formattedTime }}
        </ConditionalValueDisplay>
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center gap-3">
          <span
            v-for="(action, index) in tableActions"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip(item, action.isEnabled(item))"
            :class="
              action.isEnabled(item)
                ? 'text-primary cursor-pointer'
                : 'cursor-not-allowed text-muted'
            "
            class="material-symbols-outlined"
            @click.stop="action.isEnabled(item) ? action.action(item) : null"
          >
            {{ action.icon }}
          </span>
        </div>
      </template>
    </ListTableSelectLocal>
  </section>
</template>

<script setup>
import {useDashboardStudents} from '../useDashboardStudents.js'
import ConditionalValueDisplay from '@/components/badge/ConditionalValueDisplay.vue'
import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import ListTableSelectLocal from '@/components/table/ListTableSelectLocal.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import ability from '@/libs/acl/ability'
import { useRoute, useRouter } from 'vue-router/composables'
import { getReportStudentsMonitoringExcel } from '@/services/shared/reports/Report.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import SemaphoreStatusV2 from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatusV2.vue'
import { saveAs } from 'file-saver'
import { ref } from 'vue'

const role = store.getters.accessRole
const listTableRef = ref(null)
const generatingExcel = ref(false)
const { classe, subject, period, parentModule, childModule } = useFilters()
const { loading, dataTable, className } = useDashboardStudents()
const selectedData = ref([])

const route = useRoute()
const router = useRouter()

const routeNameEnum = {
  Teacher: 'dashboardStudentsDetailsTeacher',
  Secretariat: 'dashboardStudentsDetailsAdmin',
  NetworkManager: 'dashboardStudentsDetailsNetworkManager',
  Manager: 'dashboardStudentsDetailsAdmin',
  Coordinator: 'dashboardStudentsDetailsAdmin',
}

const columns = ref([
  { key: 'studentName', label: 'ALUNO', sortable: true, searchable: true },
  {
    key: 'challengesDone',
    label: 'DESAFIOS REALIZADOS',
    sortable: true,
  },
  {
    key: 'totalTime',
    label: 'TEMPO INVESTIDO',
    sortable: true,
  },
  {
    key: 'performance',
    label: 'RENDIMENTO MÉDIO',
    sortable: true,
    tooltip:
      'Calcula-se rendimento com base nos erros e acertos dos alunos em seus desafios.',
  },
])

if (!ability.can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)) {
  columns.value.push({ key: 'actions', label: 'AÇÕES', sortable: false })
}

const tableActions = [
  {
    icon: 'pie_chart',
    tooltip: (data, isEnabled) => {
      return isEnabled
        ? 'Relatório do aluno'
        : 'Ação desabilitada, pois o aluno não acessou a plataforma.'
    },
    isEnabled: data => data.totalTime,
    action: data => {
      openReport(data.studentId)
    },
  },
]

const openReport = studentId => {
  router.push({
    name: routeNameEnum[role],
    params: {
      studentId,
    },
  })
}

const exportToExcel = () => {
  generatingExcel.value = true

  const params = {
    SubjectId: subject.value.id,
    ClassId: route.params.classId || classe.value.ClassId,
    Module: parentModule.value?.id,
    ModuleDetail: childModule.value?.id,
    Month: period.value.id,
    StudentsIds: selectedData.value.map(student => student.studentId),
  }

  getReportStudentsMonitoringExcel(params)
    .then(response => {
      let cName = classe.value.Name
      if (!classe.value?.Name) {
        cName = className.value
      }

      const subjectName = subject.value.name || 'Disciplina'
      const fileName = `Relatório da Turma • ${cName} • ${subjectName}.xlsx`
      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    })
}
</script>