<template>
  <div>
    <div v-if="!$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)" class="licenses color-grayTheme">
      <span>
        <b>Licenças Consumidas: {{ usedLicenses }}</b> de <b>{{ totalLicenses }}</b></span
      >
      <span
        ><b>{{ usedLicenses }}</b> acessos de alunos
      </span>
    </div>
    <div>
      <h1 class="export-title">Importar cadastro de alunos</h1>
      <p class="export-description">
        Faça o download do modelo da planilha abaixo, preencha os dados necessários e anexe a
        planilha no campo "Upload da planilha". Dados obrigatórios: Nome do aluno, e-mail do
        responsável, turma, identificador avatar.
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

      <b-button variant="outline-primary" @click="toListImports">
        Ver últimas importações
      </b-button>
    </div>
    <b-card class="export-content">
      <h1 class="export-title">Faça o upload da planilha</h1>
      <ul class="ml-2">
        <li class="export-description">
          Aceita apenas arquivos de extensão .xlsx e arquivos exportados por Excel 2010 ou superior;
        </li>
        <li class="export-description">O usuário e senha serão criados automaticamente</li>
        <li class="export-description">Só pode importar o cadastro de até 300 alunos por vez.</li>
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
      <div class="import-button-wrapper">
        <b-button variant="primary" @click="importFile"> Importar</b-button>
      </div>
    </b-card>
  </div>
</template>

<script setup>
import { ACTION, PERMISSION } from '@/consts/permissions'
import { getStudents } from '@/services/admin-context/students/Students.service'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
import { BButton, BCard } from 'bootstrap-vue'
import { saveAs } from 'file-saver'
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'

// State
const students = ref([])
const classes = ref([])
const totalLicenses = ref(0)
const usedLicenses = ref(0)
const files = ref([])
const dragover = ref(false)
const clean = ref(false)
const fileInput = ref(null)

const fileExample = [
  ['Nome do aluno*', 'E-mail do responsável', 'Turma*', 'Identificador do avatar*'],
  ['João Silva', 'joaosilvaPai@hotmail.com', 'G2 A - Manhã', 'Masculino'],
  ['Maria Silva', '', '1º Ano CAM - Manhã', 'Feminino'],
]

const instance = getCurrentInstance()
const $can = instance.appContext.config.globalProperties.$can
const $router = instance.appContext.config.globalProperties.$router
const $store = instance.appContext.config.globalProperties.$store
const $toast = instance.appContext.config.globalProperties.$toast

// Expose ACTION, PERMISSION, and fileInput for template
defineExpose({ ACTION, PERMISSION, fileInput })

const handleListStudents = async () => {
  if ($can(ACTION.READ, PERMISSION.GENERAL.TEACHER)) {
    const storeClasses = $store.getters.classes
    classes.value = storeClasses.map(({ Name, ClassId }) => ({ name: Name, classId: ClassId }))
    return
  }

  await getStudents().then(response => {
    totalLicenses.value = response.data.totalLicenses
    usedLicenses.value = response.data.usedLicenses
  })

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

onMounted(() => {
  handleListStudents()
})

const cleanFiles = () => {
  files.value = []
  students.value = []
  dragover.value = false
  clean.value = true
  if (fileInput.value) fileInput.value.value = ''
}

const fileIn = () => {
  dragover.value = true
}
const fileOut = () => {
  dragover.value = false
}

const selectFile = () => {
  if (!clean.value) {
    if (fileInput.value) fileInput.value.click()
  } else {
    clean.value = false
  }
}

const uploadFile = e => {
  files.value = e.target.files
  onFileChange()
}

const dropFile = e => {
  files.value = e.dataTransfer.files
  onFileChange()
}

const toListImports = () => {
  if ($can(ACTION.READ, PERMISSION.GENERAL.TEACHER)) {
    $router.push({
      name: 'listImportStudentTeacher',
    })
    return
  }
  $router.push({
    name: 'listImportStudentAdmin',
  })
}

const downloadExample = async () => {
  const Excel = await import('exceljs/dist/exceljs.min')
  const wb = new Excel.Workbook()

  const ws = wb.addWorksheet('Modelo de planilha')
  ws.properties.defaultColWidth = 35

  for (let i = 1; i <= 4; i += 1) {
    ws.getColumn(i).alignment = { horizontal: 'center' }
    ws.getColumn(i).width = 35
  }

  const wTurmas = wb.addWorksheet('Turmas')

  classes.value.forEach(element => {
    wTurmas.addRow([element.name])
  })

  const wSexos = wb.addWorksheet('Avatar')
  wSexos.addRow(['Feminino'])
  wSexos.addRow(['Masculino'])

  const subtitle1 = ws.addRow(['Nome do aluno*', 'E-mail do responsável', 'Turma*'])
  subtitle1.font = { bold: true, size: 12 }

  if (classes.value.length > 0) {
    ws.addRow(['João Silva', 'joaosilvaPai@hotmail.com', classes.value[0].name])
    ws.addRow(['Maria Silva', '', classes.value[0].name])
  } else {
    ws.addRow(['João Silva', 'joaosilvaPai@hotmail.com', ''])
    ws.addRow(['Maria Silva', '', ''])
  }

  for (let i = 2; i <= 300; i += 1) {
    ws.getCell(`C${i}`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`Turmas!$A$1:$A${classes.value.length}`],
      operator: 'equal',
      showErrorMessage: true,
      errorStyle: 'error',
      errorTitle: 'Erro',
      error: 'A turma informada não existe',
    }

    ws.getCell(`D${i}`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['Avatar!$A$1:$A$2'],
      operator: 'equal',
      showErrorMessage: true,
      errorStyle: 'error',
      errorTitle: 'Erro',
      error: 'O identificador informado não foi encontrado',
    }
  }

  await wTurmas.protect('kldjwioçhdnççwajdqjiwemnklczjjiw', {
    spinCount: 5000,
  })
  await wSexos.protect('kldjwioçhdnççwajdqjiwemnklczjjiw', {
    spinCount: 5000,
  })

  const buf = await wb.xlsx.writeBuffer()

  saveAs(new Blob([buf]), 'Modelo de planilha.xlsx')
}

const onFileChange = () => {
  const reader = new FileReader()
  reader.onload = async e => {
    const bstr = e.target.result
    const XLSX = await import('xlsx')
    const wb = XLSX.read(bstr, {
      type: 'binary',
      cellDates: true,
      cellNF: false,
      cellText: false,
    })
    const wsname = wb.SheetNames[0]
    const ws = wb.Sheets[wsname]

    const fileData = XLSX.utils.sheet_to_json(ws, {
      header: 1,
      raw: false,
      dateNF: 'dd/mm/yyyy',
      blankrows: false,
    })

    fileData.shift()

    students.value = []

    fileData.forEach(info => {
      students.value.push({
        name: info[0],
        sponsorEmail: info[1],
        class: classes.value.find(classe => classe.name === info[2]),
        avatarIdentifier: info[3],
      })
    })
  }

  reader.readAsBinaryString(files.value[0])
}

const importFile = () => {
  if (students.value.length < 300 && students.value.length > 0) {
    if ($can(ACTION.READ, PERMISSION.GENERAL.TEACHER)) {
      $router.push({
        name: 'listImportedStudentsTeacher',
        params: {
          fileName: files.value[0].name,
          students: students.value,
        },
      })
      return
    }
    $router.push({
      name: 'listImportedStudents',
      params: {
        fileName: files.value[0].name,
        students: students.value,
      },
    })
  } else {
    $toast({
      component: Toast,
      props: {
        title: 'Atenção',
        icon: 'AlertTriangleIcon',
        text: 'Arquivo incorreto!',
        variant: 'danger',
      },
    })
  }
}
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

    border: 2px solid #7367f0;
    border-style: dashed;
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
