<template>
  <div>
    <div v-if="!$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)" class="licenses color-grayTheme">
      <span>
        <b>Licenças Consumidas: {{ usedLicenses }}</b> de <b>{{ totalLicenses }}</b></span
      >
      <span
        ><b>{{ usedLicenses }}</b> acessos de diretores
      </span>
    </div>
    <div>
      <h1 class="export-title">Importar cadastro de diretores</h1>
      <p class="export-description">
        Faça o download do modelo da planilha abaixo, preencha os dados necessários e anexe a
        planilha no campo "Upload da planilha". Dados obrigatórios: Nome do diretor e E-mail.
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
          Só pode importar o cadastro de até 100 diretores por vez.
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
              <div class="clean-file" @click.stop="cleanFiles">
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
        <b-button
          variant="primary"
          :disabled="students.length === 0 || loadingImport"
          @click="importFile"
        >
          Importar
          <b-spinner v-if="loadingImport" small />
        </b-button>
      </div>
    </b-card>
  </div>
</template>

<script setup>
  import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
  import { ACTION, PERMISSION } from '@/consts/permissions'
  import {
    getManagers,
    importDirectors,
  } from '@/services/admin-context/directors/Directors.service'
  import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
  import { BButton, BCard } from 'bootstrap-vue'
  import * as Excel from 'exceljs/dist/exceljs.min'
  import { saveAs } from 'file-saver'
  import * as XLSX from 'xlsx'
  import { ref, reactive, computed, onMounted, nextTick } from 'vue'
  import store from '@/store'
  import { useRoute, useRouter } from 'vue-router/composables'

  const students = ref([])
  const classes = ref([])
  const totalLicenses = ref(0)
  const usedLicenses = ref(0)
  const fileExample = [
    ['Nome do diretor*', 'E-mail*'],
    ['João Silva', 'joaosilvaPai@hotmail.com'],
    ['Maria Silva', 'mariasilva@email.com'],
  ]
  const files = ref([])
  const dragover = ref(false)
  const clean = ref(false)
  const loadingImport = ref(false)

  const fileInput = ref(null)

  const router = useRouter()
  const route = useRoute()

  const valid = computed(() => {
    let res = true
    const studentLength = students.value.length
    for (let i = 0; i < studentLength && res; i++) {
      const student = students.value[i]
      res = verifyContent(student)
    }
    return res
  })

  function cleanFiles() {
    files.value = []
    students.value = []
    dragover.value = false
    clean.value = true
    nextTick(() => {
      if (fileInput.value) fileInput.value.value = ''
    })
  }

  function fileIn() {
    dragover.value = true
  }

  function fileOut() {
    dragover.value = false
  }

  async function handleListStudents() {
    if (proxy.$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)) {
      const c = store.getters.classes
      classes.value = c.map(({ Name, ClassId }) => ({ name: Name, classId: ClassId }))
      return
    }
    await getManagers().then(response => {
      totalLicenses.value = response.data.totalLicenses
      usedLicenses.value = response.data.usedLicenses
    })
  }

  function selectFile() {
    if (!clean.value) {
      if (fileInput.value) fileInput.value.click()
    } else {
      clean.value = false
    }
  }

  function uploadFile(e) {
    files.value = e.target.files
    onFileChange()
  }

  function dropFile(e) {
    files.value = e.dataTransfer.files
    onFileChange()
  }

  function toListImports() {
    router.push({ name: 'listImportedDirectors' })
  }

  async function onFileChange() {
    try {
      const file = files.value[0]
      if (!file) throw new Error('No file selected')

      const arrayBuffer = await file.arrayBuffer()
      const wb = XLSX.read(arrayBuffer, {
        type: 'array',
        cellDates: true,
        cellNF: false,
        cellText: false,
      })
      const firstSheetName = wb.SheetNames[0]
      const worksheet = wb.Sheets[firstSheetName]

      const data = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        raw: false,
        dateNF: 'dd/mm/yyyy',
        blankrows: false,
      })

      // Skip the header row
      const parsedData = data.slice(1).map(row => ({
        name: row[0],
        email: row[1],
      }))

      students.value = parsedData
    } catch (error) {
      return
    }
  }

  function importFile() {
    if (students.value.length > 100 || students.value.length === 0) {
      proxy.$toast({
        component: Toast,
        props: {
          title: 'Atenção',
          icon: 'AlertTriangleIcon',
          text: 'Arquivo incorreto!',
          variant: 'danger',
        },
      })
      return
    }
    importDirectorsFile()
  }

  async function downloadExample() {
    const wb = new Excel.Workbook()
    const ws = wb.addWorksheet('Modelo de planilha')
    ws.properties.defaultColWidth = 35

    for (let i = 1; i <= 4; i += 1) {
      ws.getColumn(i).alignment = { horizontal: 'center' }
      ws.getColumn(i).width = 35
    }

    const subtitle1 = ws.addRow(['Nome do diretor*', 'E-mail*'])
    subtitle1.font = { bold: true, size: 12 }

    ws.addRow(['João Silva', 'joaosilvaPai@hotmail.com'])

    ws.addRow(['Maria Silva', 'mariasilva@email.com'])

    const buf = await wb.xlsx.writeBuffer()

    saveAs(new Blob([buf]), 'Modelo de planilha.xlsx')
  }

  async function importDirectorsFile() {
    const studentsRequest = students.value

    if (!valid.value) {
      proxy.$toast({
        component: Toast,
        props: {
          title: 'Atenção',
          icon: 'AlertTriangleIcon',
          text: 'Cadastros inválidos',
          variant: 'danger',
        },
      })
      return
    }

    loadingImport.value = true

    try {
      await importDirectors({
        filename: fileName.value,
        managers: studentsRequest,
      })

      proxy.$toast({
        component: Toast,
        props: {
          icon: 'CheckCircleIcon',
          text: 'Cadastros importados',
          variant: 'success',
        },
      })

      router.push({ name: 'DirectorAdmin' })
    } finally {
      loadingImport.value = false
    }
  }

  function verifyContent(data) {
    if (!data.name || data.name === '') {
      return false
    }
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    if (data.email && !regex.test(data.email)) {
      return false
    }
    return true
  }

  const fileName = computed(() => {
    return files.value.length ? files.value[0].name : ''
  })

  // Grant access to $store, $can, $toast for Vue 2.7 Options API context
  import { getCurrentInstance } from 'vue'
  const proxy = getCurrentInstance().proxy

  onMounted(() => {
    handleListStudents()
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
