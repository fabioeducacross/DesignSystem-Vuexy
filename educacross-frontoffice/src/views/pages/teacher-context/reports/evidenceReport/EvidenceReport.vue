<template>
  <section>
    <b-card>
      <student-evidence-filter
        @setEducationSystem="setEducationSystem"
        @setEducationalOrganization="setEducationalOrganization"
        @setDataType="setDataType"
        @setStartMonth="setStartMonth"
        @setEndMonth="setFinalMonth"
      />
    </b-card>
    <b-card>
      <b-overlay :show="loading">
        <div class="studentEvidence-report">
          <h3 class="text-body">Selecione as opções que serão exibidas no relatório</h3>
          <hr />

          <div class="studentEvidence-option">
            <b-form-checkbox v-model="filters.dashboard" class="studentEvidence-optionCheckbox" />
            <div class="studentEvidence-optionContent">
              <h2 class="studentEvidence-optionTitle">1 - Painel Geral</h2>
              <p class="studentEvidence-optionLegend">
                Veja o desempenho dos alunos por objetivo de aprendizagem e desenvolvimento da BNCC
                e a quantidade de jogos que cada um finalizou.
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
              <h2 class="studentEvidence-optionTitle">2 - Habilidades da Turma</h2>
              <p class="studentEvidence-optionLegend">
                Veja os objetivos de aprendizagem e desenvolvimento da turma.
              </p>
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
              @change="toggleAll"
            />
            <div class="studentEvidence-optionContent">
              <h2 class="studentEvidence-optionTitle">3 - Habilidades por Alunos</h2>
              <p class="studentEvidence-optionLegend">
                <strong class="studentEvidence-showStudents" @click="changeShowStudents"
                  >Clique aqui</strong
                >
                para gerar os dados de habilidade de um aluno específico.
              </p>
            </div>
          </div>
          <div v-if="showStudents" class="studentEvidence-students">
            <b-form-checkbox-group
              id="students"
              v-model="selected"
              :options="students"
              class="student-group"
              value-field="id"
              text-field="name"
            />
          </div>
        </div>
      </b-overlay>
    </b-card>
    <b-card>
      <div>
        <div class="d-flex flex-column flex-md-row justify-content-center gap-2">
          <span
            id="reportToPdf"
            v-b-tooltip="
              disableButton ? 'Selecione uma opção para habilitar a exportação em PDF' : ''
            "
            class="d-inline-block"
            tabindex="0"
          >
            <b-button
              class="button d-flex align-items-center justify-content-center gap-2"
              variant="primary"
              :disabled="disableButton || loading"
              tabindex="1"
              @click="reportToPdf"
            >
              <b-spinner v-if="loading" small variant="light" />
              <span v-else class="material-symbols-outlined"> picture_as_pdf </span>
              Gerar relatório em PDF
            </b-button>
          </span>
          <b-tooltip target="reportToPdf" triggers="hover" :disabled="hasStudents">
            A turma possui alunos
          </b-tooltip>
        </div>
      </div>
    </b-card>
  </section>
</template>

<script setup>
import { getLabelStudentsByClass } from '@/services/admin-context/students/Students.service.js'
import { getPDFInfos } from '@/services/shared/reports/Report.service'
import useFilters from '@/store/filters/useFilters'
import StudentEvidenceFilter from '@/views/pages/teacher-context/reports/evidenceReport/components/StudentEvidenceFilter.vue'
import { ref, computed, watch, onMounted } from 'vue'
import store from '@/store'
import { useRouter } from 'vue-router/composables'

// State
const loading = ref(false)
const filters = ref({
  classProficiency: false,
  dashboard: false,
  dataType: null,
  educationalOrganizationId: null,
  startMonth: null,
  finalMonth: null,
  studentsProficiency: [],
  allStudents: false,
})
const educationSystem = ref(null)
const students = ref([])
const reportData = ref(null)
const showStudents = ref(false)
const selected = ref([])
const allSelected = ref(false)
const indeterminate = ref(false)

// Composables
const router = useRouter()
const filtersStore = useFilters()

const hasStudents = computed(() => {
  const { classe } = filtersStore
  return classe.value.Students > 0
})

const globalClassId = computed(() => {
  return store.getters['filters/class']?.ClassId
})

const subjectId = computed(() => {
  return store.getters['filters/subject']?.id
})

const disableButton = computed(() => {
  return (
    !filters.value.dashboard && !filters.value.classProficiency && selected.value.length === 0
  )
})

// Watches
watch(globalClassId, (newVal) => {
  handleGetStudents(newVal)
}, { immediate: true, deep: true })

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
function setEducationalOrganization(data) {
  filters.value.educationalOrganizationId = data

  if (data === null) {
    filters.value.classProficiency = false
    allSelected.value = false
    toggleAll(false)
    // Remove all students from selected
    students.value.forEach(item => {
      selected.value = selected.value.filter(id => item.id !== id)
    })
  }
}

function setStartMonth(data) {
  filters.value.startMonth = data
}

function setFinalMonth(data) {
  filters.value.finalMonth = data
}

function setEducationSystem(data) {
  educationSystem.value = data
}

function setDataType(data) {
  filters.value.dataType = data
}

function changeShowStudents() {
  showStudents.value = !showStudents.value
}

function toggleAll(checked) {
  // The value passed from the event may be the event or a bool depending on source, normalize:
  let checkedValue = checked
  if (typeof checked === 'object' && checked !== null && 'target' in checked) {
    checkedValue = checked.target.checked
  }
  selected.value = checkedValue ? students.value.map(student => student.id) : []
}

async function handleGetStudents(classId) {
  loading.value = true
  if (classId) {
    await getLabelStudentsByClass(classId).then(response => {
      students.value = []
      selected.value = []
      allSelected.value = false
      indeterminate.value = false
      students.value = response.data
      filters.value.studentsProficiency = []
    })
  } else {
    students.value = []
    selected.value = []
    allSelected.value = false
    indeterminate.value = false
    filters.value.studentsProficiency = []
  }
  loading.value = false
}

async function handleGetReportData() {
  reportData.value = null
  const data = {
    classId: globalClassId.value,
    classProficiency: filters.value.classProficiency,
    dashboard: filters.value.dashboard,
    dataType: filters.value.dataType,
    finalMonth: filters.value.finalMonth,
    startMonth: filters.value.startMonth,
    studentsProficiency: selected.value,
  }
  if (filters.value.educationalOrganizationId !== null) {
    data.educationalOrganizationId = filters.value.educationalOrganizationId
  }
  if (filters.value.dataType === 4) {
    data.educationSystemId = educationSystem.value
  }
  await getPDFInfos(subjectId.value, data).then(response => {
    reportData.value = response.data
  })
}

async function reportToPdf() {
  loading.value = true
  await handleGetReportData()
  if (reportData.value) {
    router.push({
      name: 'studentEvidencePDFTeacher',
      params: {
        pdfTitle: 'Evidências Alunos',
        reportData: reportData.value,
        subjectId: subjectId.value,
      },
    })
  }
  loading.value = false
}
</script>

<style lang="scss" scoped>
  .studentEvidence-header {
    display: flex;
    justify-content: end;
  }

  .studentEvidence-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;

    color: #2c2c2c;
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

    padding-top: 19px;
    margin-left: 16px;
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
    padding: 0 3rem;
  }

  .studentEvidence-students .student-group {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }

  .studentEvidence-showStudents {
    color: #7367f0;
    text-decoration: underline;
    cursor: pointer;

    &.studentEvidence-disabled {
      color: #b9b9c3 !important;
      text-decoration: none;
      cursor: not-allowed;
    }
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
        margin-bottom: 0px;
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
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
</style>
