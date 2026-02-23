<template>
  <div>
    <div class="licenses color-grayTheme">
      <span>
        <b>Licenças Consumidas: {{ usedLicenses }}</b> de <b>{{ totalLicenses }}</b></span
      >
      <span
        ><b>{{ usedLicenses }}</b> acessos de professores
      </span>
    </div>
    <div>
      <h1 class="export-title">Importar cadastro de professores</h1>
      <p class="export-description">
        Faça o download do modelo da planilha abaixo, preencha os dados necessários e anexe a
        planilha no campo "Upload da planilha". Dados obrigatórios: Nome completo, e-mail do
        professor, turma e áreas de conhecimento.
      </p>
    </div>
    <div class="export-buttons">
      <div class="export-download-button">
        <b-button class="download-button" variant="primary" @click="downloadExample">
          <feather-icon icon="DownloadIcon" class="downloadIcon" />

          <p>Baixar planilha</p>
        </b-button>

        <p class="button-legend">
          Os campos da planilha <br />
          com <strong>*</strong> são obrigatórios
        </p>
      </div>
    </div>
    <b-card class="export-content">
      <h1 class="export-title">Faça o upload da planilha</h1>
      <ul class="ml-2">
        <li class="export-description">
          Aceita apenas arquivos de extensão .xlsx e arquivos exportados por Excel 2010 ou superior;
        </li>
        <li class="export-description">O usuário e senha serão criados automaticamente</li>
        <li class="export-description">
          Só pode importar o cadastro de até 300 professores por vez.
        </li>
      </ul>

      <div
        class="file-input-container"
        @dragover.prevent="fileIn"
        @dragleave.prevent="fileOut"
        @drop.prevent="dropFile"
        @click="selectFile"
      >
        <input id="avatar" ref="fileInput" type="file" name="avatar" @change="uploadFile" />
        <div @drop="dropFile">
          <div v-if="files.length" class="file-name-container">
            <p class="file-input-legend">Arquivo selecionado</p>
            <div class="file-name">
              <p>
                {{ files[0].name }}
              </p>
              <div class="clean-file" @click="cleanFiles">
                <feather-icon icon="XIcon" class="cleanIcon" />
              </div>
            </div>
          </div>
          <p v-else-if="!dragover" class="file-input-legend">
            Arraste o arquivo ou clique para fazer o upload
          </p>
          <p v-else class="file-input-legend">Solte o arquivo</p>
        </div>
      </div>
      <div class="import-errors mt-2">
        <div v-for="(error, key) in erros" :key="key">
          <b-alert v-if="error.length" show variant="danger">
            <div class="alert-body">
              Linha {{ key }}:
              <ul style="list-style: disc">
                <li v-for="(errMsg, idx) in error" :key="idx" class="ml-2">{{ errMsg }}</li>
              </ul>
            </div>
          </b-alert>
        </div>
      </div>
      <div class="import-button-wrapper">
        <b-button
          :disabled="loading || !professors.length || hasErros"
          variant="primary"
          @click="importFile"
        >
          <b-spinner v-show="loading" small variant="light" />
          Importar
        </b-button>
      </div>
    </b-card>
  </div>
</template>

<script setup>
import { getProfessors } from '@/services/admin-context/professor/Professor.service'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import { getSeriesWithSubject } from '@/services/shared/serie/Serie.Service'
import { postTeachersImportV2 } from '@/services/shared/teachers/Teachers.Service.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
import { BButton, BCard } from 'bootstrap-vue'
import { saveAs } from 'file-saver'

import { ref, reactive, onMounted, toRefs, computed } from 'vue'

const professors = ref([])
const classes = ref([])
const serieIdsWithSubjects = ref([])
const subjectsBySerieId = reactive({})
const allSubjects = ref([])
const totalLicenses = ref(0)
const usedLicenses = ref(0)
const fileHeader = ['Nome completo*', 'E-mail do Professor*', 'Turmas*']
const fileExample = [
  ['João Silva', 'joaosilvaPai@hotmail.com'],
  ['Maria Silva', 'mariasilva@hotmail.com'],
]
const files = ref([])
const dragover = ref(false)
const clean = ref(false)
const erros = ref({})
const loading = ref(false)
const fileInput = ref(null)
const busy = ref(false)

// ---- Methods ----

const hasErros = computed(() => Object.keys(erros.value).length > 0)

const fetchSerieIdsAndSubjects = async () => {
  const { data } = await getSeriesWithSubject()
  serieIdsWithSubjects.value = data
  for (const key in subjectsBySerieId) {
    delete subjectsBySerieId[key]
  }
  const subjectsSet = new Map()
  data.forEach(serie => {
    subjectsBySerieId[serie.serieId] = serie.subjects
    serie.subjects.forEach(subject => {
      if (!subjectsSet.has(subject.id)) {
        subjectsSet.set(subject.id, subject)
      }
    })
  })
  allSubjects.value = Array.from(subjectsSet.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  )
}

const getClasses = async () => {
  let page = 1
  let totalPages = 1
  while (page <= totalPages) {
    // eslint-disable-next-line no-await-in-loop,no-loop-func
    const res = await getClassesV2Label({ pageSize: 99, page })
    const { data } = res
    classes.value.push(...data.data)
    totalPages = data.totalPages
    page++
  }
}

const cleanFiles = () => {
  files.value = []
  professors.value = []
  dragover.value = false
  clean.value = true
  erros.value = {}
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const fileIn = () => {
  dragover.value = true
}

const fileOut = () => {
  dragover.value = false
}

// --- Upload methods (no implementation given, keep as blank handlers) ----

const selectFile = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const uploadFile = (event) => {
  // Placeholder - implement import logic if needed
}

const dropFile = (event) => {
  // Placeholder - implement drag&drop logic if needed
}

const importFile = () => {
  // Placeholder: actual import logic not provided
}

// --- Professors listing for license info ---

const handleListProfessors = async ({ status, currentPage, searchTerm, orderBy, ascending }) => {
  busy.value = true
  getProfessors({
    PageSize: 10,
    Page: currentPage,
    Status: status,
    Search: searchTerm,
    OrderBy: orderBy,
    Ascending: ascending,
  }).then(response => {
    totalLicenses.value = response.data.totalLicenses
    usedLicenses.value = response.data.usedLicenses
  })
}

// --- Excel export logic ---
const downloadExample = async () => {
  const Excel = await import('exceljs/dist/exceljs.min')
  const wb = new Excel.Workbook()
  const ws = wb.addWorksheet('Modelo de planilha')
  ws.properties.defaultColWidth = 35

  const wTurmas = wb.addWorksheet('Turmas')
  wTurmas.state = 'hidden'
  classes.value.forEach(element => {
    wTurmas.addRow([element.name])
  })

  // Create auxiliary worksheet for subject availability mapping
  const wMapping = wb.addWorksheet('Mapeamento')
  wMapping.state = 'hidden'

  const mappingHeader = ['Turma']
  allSubjects.value.forEach(subject => {
    mappingHeader.push(`${subject.name}*`)
  })
  wMapping.addRow(mappingHeader)

  classes.value.forEach(cls => {
    const serieId = getClassSerieId(cls)
    const availableSubjects = getSubjectsBySerieId(serieId)
    const availableSubjectIds = new Set(availableSubjects.map(s => s.id))

    const rowData = [cls.name]
    allSubjects.value.forEach(subject => {
      rowData.push(availableSubjectIds.has(subject.id) ? 1 : 0)
    })
    wMapping.addRow(rowData)
  })

  const fixedColumns = 3
  const totalColumns = fixedColumns + allSubjects.value.length

  const header = ['Nome do Professor*', 'E-Mail do Professor*', 'Turma*']
  allSubjects.value.forEach(subject => {
    header.push(`${subject.name}*`)
  })

  // Add instruction row about grey cells (row 1)
  const instructionRow = ws.addRow([
    'INSTRUÇÕES: As células das áreas de conhecimento ficam cinzas quando não estão disponíveis para a turma selecionada. A célula da turma fica vermelha se você selecionar "Sim" para áreas indisponíveis (cinzas) ou se nenhuma área válida for selecionada. Selecione "Sim" apenas para as áreas disponíveis (células brancas).',
  ])
  instructionRow.font = { italic: true, size: 11, color: { argb: 'FF6E6B7B' } }
  ws.mergeCells(`A1:${getColumnLetter(totalColumns)}1`)
  instructionRow.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true }
  ws.getRow(1).height = 50

  const headerRow = ws.addRow(header)
  headerRow.font = { bold: true, size: 12 }

  for (let i = 1; i <= totalColumns; i += 1) {
    ws.getColumn(i).alignment = { horizontal: 'center' }
    ws.getColumn(i).width = 35
  }

  fileExample.forEach(element => {
    const rowData = [...element, classes.value.length > 0 ? classes.value[0].name : '']
    allSubjects.value.forEach(() => {
      rowData.push('Não')
    })
    ws.addRow(rowData)
  })

  // Data validation starts from row 3 (after instruction row 1 and header row 2)
  for (let i = 3; i <= 303; i += 1) {
    ws.getCell(`C${i}`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`Turmas!$A$1:$A${classes.value.length}`],
      showErrorMessage: true,
      errorStyle: 'error',
      errorTitle: 'Erro',
      error: 'A turma informada não existe',
    }

    for (let j = 0; j < allSubjects.value.length; j += 1) {
      const cell = ws.getCell(i, fixedColumns + j + 1)
      cell.dataValidation = {
        type: 'list',
        allowBlank: false,
        formulae: ['"Sim,Não"'],
        showErrorMessage: true,
        errorStyle: 'warning',
        errorTitle: 'Seleção inválida',
        error: 'Por favor, selecione "Sim" ou "Não".',
      }
    }
  }

  // Apply conditional formatting using VLOOKUP to check availability (rows 3-303, skipping header)
  for (let j = 0; j < allSubjects.value.length; j += 1) {
    const columnLetter = getColumnLetter(fixedColumns + j + 1)
    ws.addConditionalFormatting({
      ref: `${columnLetter}3:${columnLetter}303`,
      rules: [
        {
          type: 'expression',
          formulae: [`VLOOKUP($C3,Mapeamento!$A:$Z,${j + 2},FALSE)=0`],
          style: {
            fill: {
              type: 'pattern',
              pattern: 'solid',
              bgColor: { argb: 'FFD3D3D3' },
            },
          },
          priority: 1,
        },
      ],
    })
  }

  const subjectColumns = allSubjects.value
    .map((subject, index) => {
      const col = getColumnLetter(fixedColumns + index + 1)
      return `(VLOOKUP($C3,Mapeamento!$A:$Z,${index + 2},FALSE)=0)*(${col}3="Sim")`
    })
    .join('+')

  const validSubjectsCount = allSubjects.value
    .map((subject, index) => {
      const col = getColumnLetter(fixedColumns + index + 1)
      return `(VLOOKUP($C3,Mapeamento!$A:$Z,${index + 2},FALSE)=1)*(${col}3="Sim")`
    })
    .join('+')

  ws.addConditionalFormatting({
    ref: 'C3:C303',
    rules: [
      {
        type: 'expression',
        formulae: [`OR((${subjectColumns})>0,(${validSubjectsCount})=0)`],
        style: {
          fill: {
            type: 'pattern',
            pattern: 'solid',
            bgColor: { argb: 'FFFCA5A5' },
          },
          font: {
            color: { argb: 'FF7F1D1D' },
            bold: true,
          },
        },
        priority: 2,
      },
    ],
  })

  await wMapping.protect('kldjwioçhdnççwajdqjiwemnklczjjiw', {
    spinCount: 5000,
  })

  await wTurmas.protect('kldjwioçhdnççwajdqjiwemnklczjjiw', {
    spinCount: 5000,
  })
  const buf = await wb.xlsx.writeBuffer()
  saveAs(new Blob([buf]), 'Modelo de planilha de professores.xlsx')
}

function getColumnLetter(columnNumber) {
  let letter = ''
  while (columnNumber > 0) {
    const remainder = (columnNumber - 1) % 26
    letter = String.fromCharCode(65 + remainder) + letter
    columnNumber = Math.floor((columnNumber - 1) / 26)
  }
  return letter
}

function getClassSerieId(classe) {
  if (classe.serie && classe.serie.id) {
    return classe.serie.id
  }
  return classe.serieId
}

function getSubjectsBySerieId(serieId) {
  return subjectsBySerieId[serieId] || []
}

// --- Lifecycle ---

onMounted(() => {
  handleListProfessors({})
  getClasses()
  fetchSerieIdsAndSubjects()
})

// --- Expose for template ---
defineExpose({
  cleanFiles,
  fileIn,
  fileOut,
  selectFile,
  uploadFile,
  dropFile,
  importFile,
  downloadExample,
  hasErros,
  professors,
  classes,
  serieIdsWithSubjects,
  subjectsBySerieId,
  allSubjects,
  totalLicenses,
  usedLicenses,
  fileHeader,
  fileExample,
  files,
  dragover,
  clean,
  erros,
  loading,
  fileInput,
})
</script>

<style lang="scss" scoped>
  input[type='file'] {
    display: none !important;
  }

  .licenses {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1.5rem;
  }

  .export-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 24px;

    color: #2c2c2c;

    margin-bottom: 16px;
  }

  .export-description {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    color: #202223;
  }

  .export-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 24px;
  }

  .export-download-button {
    display: flex;
    align-items: center;
  }

  .button-legend {
    margin: 0 0 0 16px;

    font-weight: 400;
    font-size: 14px;
    line-height: 24px;

    color: #6e6b7b;
  }

  .download-button {
    display: flex;
    align-items: center;

    .downloadIcon {
      width: 18px;
      height: 18px;
    }

    p {
      margin: 0 0 0 8px;
    }
  }

  .file-input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 14rem;

    border: 2px dashed #7367f0;
    border-radius: 10px;
  }

  .file-input-legend {
    margin: 0;

    font-weight: 500;
    font-size: 21px;
    line-height: 25px;

    color: #7367f0;

    align-self: center;
  }

  .import-button-wrapper {
    margin-top: 16px;

    display: flex;
    justify-content: center;
  }

  .file-name {
    display: flex;
    align-items: center;

    margin: 10px;

    p {
      font-weight: 500;
      font-size: 24px;
      line-height: 30px;

      color: #5e5873;

      margin: 0;
    }
  }

  .file-name-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .clean-file {
    display: flex;
    align-items: center;
    justify-content: center;

    background: #c4c4c4;
    margin-left: 8px;

    width: 24px;
    height: 24px;

    border-radius: 15px;
  }

  .cleanIcon {
    color: #323232;
    width: 13px;
    height: 13px;
  }

  .clean-file:hover {
    opacity: 0.9;
  }
</style>