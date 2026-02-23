<template>
  <SimpleTab>
    <b-card>
      <student-evidence-filter
        @filtersReady="handleFiltersReady"
        @setSubject="setSubject"
        @setClass="setClass"
        @setEducationSystem="setEducationSystem"
        @setEducationalOrganization="setEducationalOrganization"
        @setDataType="setDataType"
        @setStartMonth="setStartMonth"
        @setEndMonth="setFinalMonth"
        @setSerie="setSeries"
      />
    </b-card>

    <b-alert v-if="disabledBtnPDF" variant="primary" show>
      <div class="alert-body">
        <div class="d-flex justify-content-center align-items-center font-normal">
          <div class="d-flex flex-column flex-lg-row align-items-center gap-1">
            <span class="material-symbols-outlined"> info </span>

            Selecione uma turma para habilitar a exportação em PDF<span class="font-bold">.</span>
          </div>
        </div>
      </div>
    </b-alert>

    <b-card>
      <div>
        <div class="studentEvidence-report">
          <h3 class="text-body">Selecione as opções que serão exibidas no relatório</h3>
          <hr />

          <div class="studentEvidence-option">
            <b-form-checkbox v-model="filters.dashboard" class="studentEvidence-optionCheckbox" />
            <div class="studentEvidence-optionContent">
              <h2 class="studentEvidence-optionTitle">1 - Informação de dashboard</h2>
              <p class="studentEvidence-optionLegend">
                Selecionando essas informações os gráficos serão exibidos no relatório
              </p>
            </div>
          </div>
          <hr />
          <div class="studentEvidence-option">
            <b-form-checkbox
              v-model="filters.classProficiency"
              class="studentEvidence-optionCheckbox"
            />
            <div class="studentEvidence-optionContent">
              <h2 class="studentEvidence-optionTitle">2 - Habilidade da turma</h2>
              <p class="studentEvidence-optionLegend">Habilidade por Aluno</p>
            </div>
          </div>
          <hr />
          <div class="studentEvidence-option">
            <b-form-checkbox
              v-model="allSelected"
              :indeterminate="indeterminate"
              class="studentEvidence-optionCheckbox"
              aria-describedby="students"
              aria-controls="students"
              :disabled="disabledBtnPDF"
              @change="toggleAll"
            />

            <div id="tooltip-target-card" class="studentEvidence-optionContent">
              <h2 class="studentEvidence-optionTitle">3 - Habilidade por alunos</h2>
              <p class="studentEvidence-optionLegend">
                <strong
                  :class="
                    disabledBtnPDF ? 'studentEvidence-disabled' : 'studentEvidence-showStudents'
                  "
                  @click="changeShowStudents"
                  >Clique aqui</strong
                >
                para gerar os dados de habilidade de um aluno específico
              </p>
              <b-tooltip v-if="disabledBtnPDF" target="tooltip-target-card">
                {{ textTooltip }}
              </b-tooltip>
            </div>
          </div>
          <div v-if="showStudents" class="studentEvidence-students">
            <b-badge v-if="students.length === 0" variant="light-primary">
              Nenhum aluno na turma
            </b-badge>
            <b-form-checkbox-group
              id="students"
              v-model="selected"
              :options="students"
              class="student-group"
              value-field="studentId"
              text-field="studentName"
            />
          </div>
        </div>
      </div>
    </b-card>
    <b-card>
      <div class="studentEvidence-header">
        <div class="d-flex flex-column flex-md-row justify-content-center gap-2">
          <div id="tooltip-target-btn">
            <b-button
              class="button d-flex align-items-center justify-content-center gap-2"
              variant="primary"
              :disabled="disabledBtnPDFClass"
              @click="reportToPdf"
            >
              <b-spinner v-if="loadingReportPdf" small variant="light" />
              <span v-else class="material-symbols-outlined"> picture_as_pdf </span>
              Gerar relatório em PDF
              <b-tooltip v-if="disabledBtn" target="tooltip-target-btn">
                {{ textTooltipBtn }}
              </b-tooltip>
            </b-button>
          </div>

          <b-button
            class="button d-flex align-items-center justify-content-center gap-2"
            variant="outline-primary"
            :disabled="loadingReportExcel"
            @click="reportToExcel"
          >
            <b-spinner v-if="loadingReportExcel" small variant="light" />
            <span v-else class="material-symbols-outlined"> ios_share </span>
            Exportar em Excel
          </b-button>
        </div>
      </div>
    </b-card>
  </SimpleTab>
</template>

<script setup>
import StudentEvidenceFilter from '../../shared/components/student-evidence-filter/StudentEvidenceFilter.vue'
import SimpleTab from '@/components/tab/SimpleTab.vue'
import { proficiency } from '@/consts/legends/proficiencyEnum.js'
import { getStudentsByClass } from '@/services/shared/classes/Classes.service'
import { getPDFInfos, getEvidenceExcel } from '@/services/shared/reports/Report.service'
import useFilters from '@/store/filters/useFilters'
import { BButton, BFormCheckbox, BFormCheckboxGroup, BTooltip } from 'bootstrap-vue'
import { saveAs } from 'file-saver'
import { ref, computed, watch } from 'vue'
import store from '@/store'
import { useRouter } from 'vue-router/composables'

const { subject } = useFilters()
const router = useRouter()

const filters = ref({
  classId: null,
  subjectId: null,
  institutionId: store.getters.accessUserData?.InstitutionId,
  classProficiency: false,
  dashboard: false,
  dataType: null,
  educationalOrganizationId: null,
  startMonth: null,
  finalMonth: null,
  studentsProficiency: [],
  allStudents: false,
  seriesId: null,
})

const educationSystem = ref({ id: null })
const students = ref([])
const reportData = ref(null)
const showStudents = ref(false)
const selected = ref([])
const allSelected = ref(false)
const indeterminate = ref(false)
const loadingReportPdf = ref(false)
const loadingReportExcel = ref(false)
const disabledBtnPDF = ref(true)

// Computed properties
const disabledBtn = computed(() => {
  if (disabledBtnPDF.value) return true

  const hasAnyOptionSelected =
    filters.value.dashboard || filters.value.classProficiency || allSelected.value

  return !hasAnyOptionSelected
})

const disabledBtnPDFClass = computed(() => loadingReportPdf.value || disabledBtnPDF.value)

const textTooltipBtn = computed(() => {
  if (disabledBtnPDF.value) return 'Selecione uma turma para habilitar a exportação em PDF'
  return 'Selecione uma opção para habilitar a exportação em PDF.'
})

const textTooltip = computed(() => 'Selecione uma turma para habilitar a visualização de habilidades por aluno.')

// Watchers
watch(selected, (newValue) => {
  if (newValue.length === 0) {
    indeterminate.value = false
    allSelected.value = false
  } else if (newValue.length === students.value.length) {
    indeterminate.value = false
    allSelected.value = true
  } else {
    indeterminate.value = true
    allSelected.value = false
  }
})

// Methods
const handleFiltersReady = (filterState) => {
  filters.value.subjectId = filterState.subjectId
  filters.value.seriesId = filterState.seriesId
  filters.value.classId = filterState.classId
  filters.value.educationalOrganizationId = filterState.educationalOrganizationId
  filters.value.dataType = filterState.dataType
  filters.value.startMonth = filterState.startMonth
  filters.value.finalMonth = filterState.finalMonth

  if (filterState.educationSystemId) {
    educationSystem.value = { id: filterState.educationSystemId }
  }

  disabledBtnPDF.value = filterState.classId === null
}

const setSubject = (data) => {
  filters.value.subjectId = data.id
}

const setClass = async (data) => {
  disabledBtnPDF.value = data.id === null
  filters.value.classId = data.id

  await handleGetStudents()
}

const setEducationalOrganization = (data) => {
  filters.value.educationalOrganizationId = data.id
  if (data.id === 'all') {
    filters.value.classProficiency = false
    allSelected.value = false
    students.value.forEach(item => {
      selected.value = selected.value.filter(id => item.studentId !== id)
    })
  }
}

const setDataType = (data) => {
  filters.value.dataType = data.id
}

const setStartMonth = (data) => {
  filters.value.startMonth = data
}

const setFinalMonth = (data) => {
  filters.value.finalMonth = data
}

const setEducationSystem = (data) => {
  educationSystem.value = data
}

const changeShowStudents = () => {
  if (!filters.value.classId) return
  showStudents.value = !showStudents.value
}

const setSeries = (data) => {
  filters.value.seriesId = data.id
}

const toggleAll = (checked) => {
  selected.value = checked ? students.value.map(student => student.studentId) : []
}

const handleGetStudents = async () => {
  if (!filters.value.classId) {
    students.value = []
    selected.value = []
    allSelected.value = false
    indeterminate.value = false
    return
  }

  await getStudentsByClass(filters.value.classId).then(response => {
    students.value = []
    selected.value = []
    allSelected.value = false
    indeterminate.value = false
    students.value = response.data[0].students
    filters.value.studentsProficiency = []
  })
}

const handleGetReportData = async () => {
  const data = {
    classId: filters.value.classId,
    classProficiency: filters.value.classProficiency,
    dashboard: filters.value.dashboard,
    dataType: filters.value.dataType,
    finalMonth: filters.value.finalMonth,
    startMonth: filters.value.startMonth,
    studentsProficiency: selected.value,
  }

  if (filters.value.educationalOrganizationId !== 'all') {
    data.educationalOrganizationId = filters.value.educationalOrganizationId
  }
  if (filters.value.dataType === 4) {
    data.educationSystemId = educationSystem.value.id
  }

  try {
    const response = await getPDFInfos(filters.value.subjectId, data)
    reportData.value = response.data
  } finally {
    loadingReportPdf.value = false
    loadingReportExcel.value = false
  }
}

const getProficiencyFromPerformance = (value) => {
  return proficiency.find(i => i.rule && i.performanceRule(value)) || proficiency[0]
}

const reportToExcel = async () => {
  reportData.value = null
  loadingReportExcel.value = true
  const data = {
    SerieId: filters.value.seriesId,
    classId: filters.value.classId,
    classProficiency: filters.value.classProficiency,
    dashboard: filters.value.dashboard,
    dataType: filters.value.dataType,
    finalMonth: filters.value.finalMonth,
    startMonth: filters.value.startMonth,
    studentsProficiency: selected.value,
  }

  if (filters.value.educationalOrganizationId !== 'all') {
    data.educationalOrganizationId = filters.value.educationalOrganizationId
  }
  if (filters.value.dataType === 4) {
    data.educationSystemId = educationSystem.value.id
  }

  try {
    const response = await getEvidenceExcel(filters.value.subjectId, data)
    const fileName = 'Relatório de evidências alunos.xlsx'
    saveAs(response.data, fileName)
  } catch (error) {
    //
  } finally {
    loadingReportExcel.value = false
  }
}

const reportToPdf = async () => {
  reportData.value = null
  loadingReportPdf.value = true
  await handleGetReportData()
  if (reportData.value) {
    router.push({
      name: 'studentEvidencePDF',
      params: {
        pdfTitle: 'Evidências Alunos',
        reportData: reportData.value,
        subjectId: subject.value.id,
      },
    })
  }
}
</script>

<style lang="scss" scoped>
  .studentEvidence-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;

    color: #2c2c2c;

    margin: 0;
  }

  .studentEvidence-report {
    hr {
      margin-left: -1.5rem;
      margin-right: -1.5rem;
    }
  }

  .studentEvidence-reportOptions {
    background: white;

    border-radius: 10px;
  }

  .studentEvidence-reportOptionTitle {
    font-weight: 600;
    font-size: 15px;
    line-height: 24px;

    color: #2c2c2c;
  }

  .studentEvidence-optionTitle {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;

    color: #2c2c2c;

    margin: 0;
  }

  .studentEvidence-optionLegend {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #6e6b7b;

    margin: 0;
  }

  .studentEvidence-option {
    display: flex;
    align-items: center;

    padding: 1rem 0;

    &.disabledOpt {
      .studentEvidence-optionTitle {
        color: #b9b9c3 !important;
      }

      .studentEvidence-optionLegend {
        color: #6e6b7b;
      }
    }
  }

  .studentEvidence-optionContent {
    margin-left: 1.2rem;
  }

  .studentEvidence-students {
    // display: flex;
    padding: 0 3rem;
    // flex-wrap: wrap;
  }

  .studentEvidence-students .student-group {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }

  .studentEvidence-showStudents {
    color: var(--primary);
    text-decoration: underline;
    cursor: pointer;
  }

  .studentEvidence-disabled {
    color: var(--gray-500);
    text-decoration: none;
    cursor: not-allowed;
  }

  .evidence-info-message {
    padding-bottom: 1px;

    .info-box {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;

      padding: 12px 13px;
      margin-left: 88px;
      margin-bottom: 24px;

      max-width: 743px;
      min-height: 42px;
      width: 100%;

      @media (max-width: 908px) {
        width: 75%;
      }

      background: rgba(115, 103, 240, 0.12);
      border-radius: 10px;

      svg {
        color: #7367f0;
        margin-right: 10px;
        width: 20px;
        height: 20px;

        @media (max-width: 570px) {
          width: 40px;
          height: 40px;
        }
      }

      p {
        color: #7367f0;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        letter-spacing: 0;
        margin-bottom: 0;
      }
    }
  }

  @media (max-width: 660px) {
    .studentEvidence-header {
      margin-top: 16px;
      margin-bottom: 16px;
      flex-direction: column;
    }
  }

  hr {
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
</style>
