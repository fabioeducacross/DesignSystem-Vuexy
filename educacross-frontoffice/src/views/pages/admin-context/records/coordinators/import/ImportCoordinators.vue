<template>
  <div>
    <div v-if="!$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)" class="licenses color-grayTheme">
      <span>
        <b>Licenças Consumidas: {{ usedLicenses }}</b> de <b>{{ totalLicenses }}</b></span
      >
      <span
        ><b>{{ usedLicenses }}</b> acessos de coordenadores
      </span>
    </div>
    <div>
      <h1 class="export-title">Importar cadastro de Coordenadores</h1>
      <p class="export-description">
        Faça o download do modelo da planilha abaixo, preencha os dados necessários e anexe a
        planilha no campo "Upload da planilha". Dados obrigatórios: E-mail, Nome completo e Turmas.
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

      <!-- <b-button variant="outline-primary" @click="toListImports">
        Ver últimas importações
      </b-button> -->
    </div>
    <b-card class="export-content">
      <h1 class="export-title">Faça o upload da planilha</h1>
      <ul class="ml-2">
        <li class="export-description">
          Aceita apenas arquivos de extensão .xlsx e arquivos exportados por Excel 2010 ou superior;
        </li>
        <li class="export-description">O usuário e senha serão criados automaticamente</li>
        <li class="export-description">
          Só pode importar o cadastro de até 300 coordenadores por vez.
        </li>
      </ul>

      <div
        class="file-input-container"
        :class="isLoading ? 'input-disabled' : ''"
        @dragover.prevent="fileIn"
        @dragleave.prevent="fileOut"
        @drop.prevent="dropFile"
        @click="selectFile"
      >
        <input
          id="avatar"
          ref="fileInput"
          :disabled="isLoading"
          type="file"
          name="avatar"
          @change="uploadFile"
        />
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
      <div class="import-button-wrapper mb-2">
        <b-button :disabled="isLoading || !classes.length" variant="primary" @click="importFile">
          <b-spinner v-show="isLoading" small class="mr-50"></b-spinner>
          <span>Importar</span>
        </b-button>
      </div>
      <div>
        <div v-for="(error, key) in erros" :key="key">
          <b-alert v-if="error.length" show variant="danger">
            <div class="alert-body">Linha {{ key }}: {{ error.join(' ') }}</div>
          </b-alert>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script setup>
  import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
  import { ACTION, PERMISSION } from '@/consts/permissions'
  import {
    getCoordinators,
    postCoordinatorsImport,
  } from '@/services/admin-context/coordinators/Coordinators.service.js'
  import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
  import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
  import { BButton, BCard } from 'bootstrap-vue'
  import { ref, reactive, onMounted } from 'vue'

  // ExcelJS and XLSX must exist as global variables or import sources for downloadExample/onFileChange
  // For File download: saveAs global or from 'file-saver'
  const isLoading = ref(false)
  const erros = ref({})
  const coordinators = ref([])
  const classes = ref([])
  const totalLicenses = ref(0)
  const usedLicenses = ref(0)
  const files = ref([])
  const dragover = ref(false)
  const clean = ref(false)
  const fileInput = ref(null)

  const ACTION_CONST = ACTION
  const PERMISSION_CONST = PERMISSION

  const fileExample = [
    ['Nome do coordenador*', 'E-mail', 'Turma*'],
    ['João Silva', 'joaosilvaPai@hotmail.com', 'G2 A - Manhã'],
    ['Maria Silva', 'mariasilva@mail.com', '1º Ano CAM - Manhã'],
  ]

  // Fetch data on mount
  onMounted(async () => {
    await fetchCoordinators()
  })

  // Clean selected file and reset state
  const cleanFiles = () => {
    files.value = []
    coordinators.value = []
    dragover.value = false
    clean.value = true
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }

  // Set dragover true when hovering file input
  const fileIn = () => {
    dragover.value = true
  }

  // Set dragover false when leaving file input
  const fileOut = () => {
    dragover.value = false
  }

  // Fetch coordinators info and update license numbers, then classes
  const fetchCoordinators = async () => {
    await getCoordinators().then(response => {
      coordinators.value = response.data.coordinators.data
      totalLicenses.value = response.data.totalLicenses
      usedLicenses.value = response.data.usedLicenses
    })
    await getClasses()
  }

  // Fetch all classes for Turmas sheet and lookup
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

  // Select file from input, reset clean flag on next click
  const selectFile = () => {
    if (!clean.value) {
      fileInput.value && fileInput.value.click()
    } else {
      clean.value = false
    }
  }

  // User picked file via input
  const uploadFile = e => {
    files.value = e.target.files
    onFileChange()
  }

  // User dropped file
  const dropFile = e => {
    files.value = e.dataTransfer.files
    onFileChange()
  }

  // List navigation (disabled in template)
  const toListImports = () => {
    // For Vue Router in <script setup> with Options API pattern, inject $router via globalProperties if needed
    // Or use composables if available
    // Example: If using composables:
    // import { useRouter } from 'vue-router/composables'
    // const router = useRouter()
    // router.push({ name: 'coordinatorsLastImports' })
    // Else (in Options API), this.$router.push...
  }

  // Reads Excel file, parses to array, maps to coordinators
  const onFileChange = () => {
    erros.value = {}
    const reader = new FileReader()
    reader.onload = e => {
      const bstr = e.target.result
      // XLSX must be available as global or imported
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
      coordinators.value = []
      fileData.forEach(info => {
        coordinators.value.push({
          name: info[0],
          email: info[1],
          classes: info[2] ? [classes.value.find(classe => classe.name === info[2])?.id] : null,
        })
      })
    }
    if (files.value[0]) {
      reader.readAsBinaryString(files.value[0])
    }
  }

  // Submit coordinators import (API call)
  const importFile = () => {
    if (coordinators.value.length < 300 && coordinators.value.length > 0) {
      isLoading.value = true
      postCoordinatorsImport({
        coordinators: coordinators.value,
      })
        .then(() => {
          // Show toast (must be available as $toast in globalProperties, else use event bus/emitter)
          if (typeof window.$toast === 'function') {
            window.$toast({
              component: Toast,
              props: {
                title: 'Importação concluída!',
                icon: 'CheckIcon',
                variant: 'success',
              },
            })
          }
        })
        .catch(error => {
          if (error.response.data) erros.value = error.response.data
        })
        .finally(() => {
          cleanFiles()
          isLoading.value = false
        })
    } else {
      if (typeof window.$toast === 'function') {
        window.$toast({
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
  }

  // Download sample coordinators Excel file with classes list
  const downloadExample = async () => {
    // ExcelJS and saveAs must be available
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
    const subtitle1 = ws.addRow(['Nome do coordenador*', 'E-mail*', 'Turma*'])
    subtitle1.font = { bold: true, size: 12 }

    if (coordinators.value.length === 1) {
      ws.addRow([
        'João Silva',
        'joaosilvaPai@hotmail.com',
        coordinators.value[0].classes[0]?.className,
      ])
    } else if (coordinators.value.length > 1) {
      ws.addRow([
        'João Silva',
        'joaosilvaPai@hotmail.com',
        coordinators.value[1].classes[0]?.className,
      ])
      ws.addRow([
        'Maria Silva',
        'mariasilva@hotmail.com',
        coordinators.value[1].classes[0]?.className,
      ])
    } else {
      ws.addRow(['João Silva', 'joaosilvaPai@hotmail.com', classes.value[0]?.name || ''])
      ws.addRow(['Maria Silva', 'mariasilva@hotmail.com', classes.value[1]?.name || ''])
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
    }

    await wTurmas.protect('kldjwioçhdnççwajdqjiwemnklczjjiw', {
      spinCount: 5000,
    })

    const buf = await wb.xlsx.writeBuffer()
    saveAs(new Blob([buf]), 'Modelo de planilha.xlsx')
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

  .input-disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
</style>
