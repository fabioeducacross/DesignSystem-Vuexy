<template>
  <section>
    <b-card>
      <b-row align-h="end">
        <b-col class="d-flex justify-content-end">
          <b-dropdown
            v-b-tooltip.hover.top="
              selectedStudents.value.length < 2 && selectedStudents.batchAction === 1
                ? 'Selecione 2 ou mais alunos para realizar essa ação.'
                : ''
            "
            variant="outline-primary"
            text="Ações em Lote"
            style="z-index: 500"
            right
            :disabled="selectedStudents.value.length < 2 && selectedStudents.batchAction === 1"
          >
            <b-dropdown-item class="item-drop-actions" @click="generateMassPerformance()">
              <div class="d-flex align-items-center">
                <span class="material-symbols-outlined cursor-pointer"> news </span>
                <span class="ml-1"> Gerar relatórios de desempenho </span>
              </div>
            </b-dropdown-item>
            <b-dropdown-item class="item-drop-actions" @click="generateMassParticipation()">
              <div class="d-flex align-items-center">
                <span class="material-symbols-outlined cursor-pointer"> workspace_premium </span>
                <span class="ml-1"> Gerar certificados de participação </span>
              </div>
            </b-dropdown-item>
          </b-dropdown>
        </b-col>
      </b-row>
    </b-card>

    <ListTableSelect
      ref="listTableRef"
      v-model="selectedStudents"
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="searchForStudent"
      selected-label="Alunos selecionados"
      @change="changeListTable"
    >
      <template #cell(studentName)="{ item }">
        <div>
          <span class="font-bold">{{ item.studentName }}</span>
          <b-badge v-if="item.progress === 0" pill variant="light-danger" class="ml-50">
            Não iniciou
          </b-badge>
        </div>
      </template>
      <template #cell(serieName)="{ item }">
        <div>
          <b-badge variant="light-primary" pill>{{ item.serieName }}</b-badge>
        </div>
      </template>
      <template #cell(progress)="{ value }">
        <SemaphoreStatus :status-enum="getVariantByRule(value, 'eventProgress')">
          <span class="whitespace-no-wrap">{{ value | formatNumber }}%</span>
        </SemaphoreStatus>
      </template>
      <template #cell(performance)="{ item }">
        <PerformanceCell :performance="item.performance" enum="eventLearningPerformance" />
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
    </ListTableSelect>
    <LegendEnum :legends="legends" />
  </section>
</template>

<script setup>
import PerformanceCell from '@/components/cells/PerformanceCell.vue'
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ListTableSelect from '@/components/table/ListTableSelect.vue'
import { getVariantByRule } from '@/consts/legends'
import { eventLearningPerformanceLegend } from '@/consts/legends/events/eventPerformanceEnum'
import { eventProgressLegend } from '@/consts/legends/events/eventProgressEnum.js'
import router from '@/router'
import store from '@/store'
import { useEvents } from '@/views/events/useEvents.js'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { ref, watch, computed, onMounted } from 'vue'

const listTableRef = ref(null)

const loading = computed(() => store.getters['eventsCertificate/loading'])

const dataTable = computed(() => store.getters['eventsCertificate/data'])
const totalData = computed(() => store.getters['eventsCertificate/total'])
const search = ref('')

const { classId, serieId } = useEvents()

const isTeacher = store.getters.accessRole === 'Teacher'

const teacherFieldsOnly = ['studentName', 'performance', 'progress', 'actions']

const fields = [
  { key: 'studentName', label: 'Aluno', sortable: true, searchable: true },
  { key: 'serieName', label: 'Ano Escolar', sortable: true },
  { key: 'className', label: 'Turma', sortable: true },
  { key: 'performance', label: 'Rendimento', sortable: true },
  {
    key: 'progress',
    label: 'Progresso',
    sortable: true,
    tooltip: 'Calcula-se o progresso com base na quantidade de jogos cumpridos pelo aluno.',
  },
  { key: 'actions', label: 'Ações', sortable: false },
]

const tableColumns = computed(() => {
  if (isTeacher) {
    return fields.filter(field => teacherFieldsOnly.includes(field.key))
  }
  return fields
})

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('eventsCertificate/setParams', {
    Search: searchQuery,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })
  search.value = searchQuery
  store.dispatch('eventsCertificate/fetch')
}

watch([classId, serieId], () => {
  store.commit('eventsCertificate/setParams', {
    Page: 1,
  })
  listTableRef.value.resetPage()
  store.dispatch('eventsCertificate/fetch')
})

const rowClass = (item, type) => {
  if (!item || type !== 'row') return
  if (item.position === 1) return 'tbody-row bg-light-primary'
  if (item.position === 2) return 'tbody-row bg-light-success'
  if (item.position === 3) return 'tbody-row bg-light-info'
  return 'tbody-row'
}

onMounted(() => {
  if (isTeacher || serieId.value) {
    store.dispatch('eventsCertificate/fetch')
  }
})

const selectedStudents = ref({
  value: [],
  batchAction: 1,
})

const openPerformance = studentId => {
  const { batchAction } = selectedStudents.value
  const institutionId = store.getters.getInstitutionId

  const student = dataTable.value.find(student => student.studentId === studentId)

  const studentName = student.studentName
  const className = student.className

  const pdfTitle = `${className}-${studentName}-Ficha-de-desempenho`

  router.push({
    name: 'eventCertificatesPDFPerformance',
    params: {
      studentsIds: [studentId],
      students: [student],
      serieId: serieId.value,
      classId: classId.value,
      search: search.value,
      batchAction,
      institutionId,
      pdfTitle,
    },
  })
}
const openParticipation = studentId => {
  const { batchAction } = selectedStudents.value
  const institutionId = store.getters.getInstitutionId

  const student = dataTable.value.find(student => student.studentId === studentId)

  const studentName = student.studentName
  const className = student.className

  const pdfTitle = `${className} ${studentName} Certificado do Evento`

  router.push({
    name: 'eventCertificatesPDFCertificate',
    params: {
      studentsIds: [studentId],
      students: [student],
      serieId: serieId.value,
      classId: classId.value,
      search: search.value,
      batchAction,
      institutionId,
      pdfTitle,
    },
  })
}

const generateMassPerformance = () => {
  const { batchAction, value } = selectedStudents.value
  const studentsIds = value.map(s => s.studentId)
  const institutionId = store.getters.getInstitutionId

  const pdfTitle = `Ficha de Desempenho do Evento`

  router.push({
    name: 'eventCertificatesPDFPerformance',
    params: {
      studentsIds,
      serieId: serieId.value,
      classId: classId.value,
      search: search.value,
      batchAction,
      institutionId,
      students: value,
      pdfTitle,
    },
  })
}
const generateMassParticipation = () => {
  const { batchAction, value } = selectedStudents.value
  const studentsIds = value.map(s => s.studentId)
  const institutionId = store.getters.getInstitutionId

  const pdfTitle = `Certificado do Evento`
  router.push({
    name: 'eventCertificatesPDFCertificate',
    params: {
      studentsIds,
      serieId: serieId.value,
      classId: classId.value,
      search: search.value,
      batchAction,
      institutionId,
      students: value,
      pdfTitle,
    },
  })
}

const tableActions = [
  {
    icon: 'news',
    tooltip: (data, isEnabled) => {
      return isEnabled
        ? 'Gerar relatório de desempenho.'
        : 'Ação desabilitada, pois o aluno não iniciou o evento.'
    },
    isEnabled: data => data.progress > 0,
    action: data => {
      openPerformance(data.studentId)
    },
  },
  {
    icon: 'workspace_premium',
    tooltip: (data, isEnabled) => {
      return isEnabled
        ? 'Gerar certificado de participação.'
        : 'Ação desabilitada, pois o aluno não iniciou o evento.'
    },
    isEnabled: data => data.progress > 0,
    action: data => {
      openParticipation(data.studentId)
    },
  },
]

const legends = [eventProgressLegend, eventLearningPerformanceLegend]
</script>