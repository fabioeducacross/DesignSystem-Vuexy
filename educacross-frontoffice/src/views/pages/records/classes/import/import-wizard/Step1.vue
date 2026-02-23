<script setup>
import { postClassesImport } from '@/services/shared/classes/Classes.service'
import { getSeries } from '@/services/shared/serie/Serie.Service'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { useImportClasses } from '@/views/pages/records/classes/import/useImportClasses'
import * as Excel from 'exceljs/dist/exceljs.min'
import { saveAs } from 'file-saver'
import { computed, ref, getCurrentInstance } from 'vue'
import { formatNumber } from '@/filters/filters'

const { proxy } = getCurrentInstance()
const {
  filesToImport,
  sumImportingUsersFromFiles,
  rawImportingUsers,
  isLoading,
  fileName,
  schoolYears,
  getFileToImportInfo,
  gotoNextStepWizard,
  isValidUser,
  cancelImport,
} = useImportClasses()

const loadingExampleFile = ref(false)
const isHelpOpen = ref(false)
const fileInput = ref(null)
const isDragging = ref(false)
const isSubmitting = ref(false)

const haveInvalidUsers = computed(() => {
  if (rawImportingUsers.value.length === 0) return false
  return rawImportingUsers.value.some(item => {
    const { isValid } = item
    return !isValid
  })
})

const exceedsClassLimit = computed(() => {
  return rawImportingUsers.value.length > 300
})

const handleFileSelect = async event => {
  isLoading.value = true
  const files = event.target.files || event.dataTransfer.files

  if (files.length === 0) return

  const file = files[0]

  if (!file.name.toLowerCase().endsWith('.xlsx')) {
    proxy.$toast({
      component: Toast,
      props: {
        title: 'Atenção!',
        text: 'Selecione apenas arquivos com a extensão .XLSX',
        icon: 'AlertTriangleIcon',
        variant: 'danger',
      },
    })
    isDragging.value = false
    event.target.value = null
    isLoading.value = false
    return
  }

  if (schoolYears.value.length === 0) {
    await fetchAllSeries()
  }

  const res = await getFileToImportInfo(file)

  filesToImport.value = []
  fileName.value = file.name
  filesToImport.value.push({
    ...res,
    file,
  })

  verifyClasses()
  isDragging.value = false
  event.target.value = null
  isLoading.value = false
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleDragOver = event => {
  event.preventDefault()
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = event => {
  event.preventDefault()
  handleFileSelect(event)
}

const deleteFile = () => {
  filesToImport.value = []
  rawImportingUsers.value = []
}

const fetchAllSeries = async () => {
  if (schoolYears.value.length > 0) return

  isLoading.value = true

  let page = 1
  let totalPages = 1

  while (page <= totalPages) {
    // eslint-disable-next-line no-await-in-loop,no-loop-func
    const res = await getSeries({ pageSize: 99, page })

    const { data } = res
    schoolYears.value.push(...data.data)
    totalPages = data.totalPages
    page++
  }

  isLoading.value = false
}

const downloadExample = async () => {
  loadingExampleFile.value = true

  try {
    await fetchAllSeries()
  } catch (_error) {
    loadingExampleFile.value = false
    return
  }

  const wb = new Excel.Workbook()

  const ws = wb.addWorksheet('Modelo de planilha')
  ws.properties.defaultColWidth = 35

  for (let i = 1; i <= 3; i += 1) {
    ws.getColumn(i).alignment = { horizontal: 'center' }
    ws.getColumn(i).width = 35
  }

  const wSchoolYear = wb.addWorksheet('AnoEscolar')

  schoolYears.value.forEach(element => {
    wSchoolYear.addRow([element.name])
  })

  const subtitle1 = ws.addRow(['Ano escolar*', 'Nome da turma*'])
  subtitle1.font = { bold: true, size: 12 }

  ws.addRow([schoolYears.value[0].name, 'A'])
  ws.addRow([schoolYears.value[0].name, 'B'])

  for (let i = 2; i <= 300; i += 1) {
    ws.getCell(`A${i}`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`AnoEscolar!$A$1:$A${schoolYears.value.length}`],
      operator: 'equal',
      showErrorMessage: true,
      errorStyle: 'error',
      errorTitle: 'Erro',
      error: 'O ano escolar informado não existe',
    }
  }

  await wSchoolYear.protect('kldjwioçhdnççwajdqjiwemnklczjjiw', {
    spinCount: 5000,
  })

  const buf = await wb.xlsx.writeBuffer()

  saveAs(new Blob([buf]), 'Modelo de planilha.xlsx')
  loadingExampleFile.value = false
}

const verifyClasses = () => {
  rawImportingUsers.value = filesToImport.value
    .map(i => {
      const { users } = i

      return users.map(user => {
        const isValid = isValidUser(user)

        return { user, isValid }
      })
    })
    .flat()
}

const submitClasses = () => {
  if (haveInvalidUsers.value) return

  isSubmitting.value = true
  isLoading.value = true

  const users = filesToImport.value.map(i => {
    const { users } = i

    return users.map(user => {
      const { isValid, ...rest } = user

      return rest
    })
  })

  postClassesImport({ classes: users.flat() }).then(() => {
    gotoNextStepWizard()
  })
}
</script>

<template>
  <section>
    <div class="d-flex align-items-center justify-content-center mb-1">
      <b-button
        variant="primary"
        :disabled="isLoading || loadingExampleFile"
        @click="downloadExample()"
      >
        <span v-show="!loadingExampleFile" class="material-symbols-outlined align-middle"
          >download</span
        >
        <b-spinner v-show="loadingExampleFile" small />
        <span class="align-middle"> Baixar arquivo modelo</span>
      </b-button>
    </div>

    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1 border shadow-none" @click="() => (isHelpOpen = !isHelpOpen)">
        <b-card-header header-tag="header" class="px-1 py-50 border-bottom" role="tab">
          <div
            v-b-toggle.accordion-3
            class="d-flex align-items-center justify-content-between w-100"
          >
            <h6 class="mb-0">
              <span class="material-symbols-outlined text-primary align-middle">info</span>
              <span class="align-middle"> Instruções</span>
            </h6>

            <span class="material-symbols-outlined" :class="{ 'rotate-180': isHelpOpen }"
              >keyboard_arrow_up</span
            >
          </div>
        </b-card-header>

        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
          <b-card-body class="p-50">
            <b-card body-class="p-50" class="border">
              <div>
                <span class="material-symbols-outlined text-primary align-middle">download</span>
                <span class="align-middle"
                  ><b-link
                    class="font-weight-bolder align-middle"
                    :disabled="loadingExampleFile"
                    @click.capture.stop="downloadExample()"
                  >
                    Clique aqui</b-link
                  >
                  para baixar a planilha modelo.</span
                >
              </div>
            </b-card>
            <b-card body-class="p-50" class="border">
              <div>
                <span class="material-symbols-outlined text-primary align-middle">description</span>
                <span class="align-middle">
                  São aceitos apenas arquivos de extensão .XLSX e arquivos exportados por Excel 2010
                  ou superior.
                </span>
              </div>
            </b-card>
            <b-card body-class="p-50" class="border">
              <div>
                <span class="material-symbols-outlined text-primary align-middle">emergency</span>
                <span class="align-middle">
                  Os campos da planilha com * são obrigatórios: Ano Escolar e Turma.</span
                >
              </div>
            </b-card>

            <b-card body-class="p-50" class="border">
              <div>
                <span class="material-symbols-outlined text-primary align-middle">publish</span>
                <span class="align-middle">
                  Só é possível importar o cadastro de até 300 turmas por vez.</span
                >
              </div>
            </b-card>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>

    <b-alert :show="exceedsClassLimit" variant="danger">
      <div class="alert-body">
        <div class="d-flex align-items-center gap-1">
          <span class="material-symbols-outlined">error</span>
          <span> <b>Atenção:</b> O limite máximo é de 300 turmas por importação. </span>
        </div>
      </div>
    </b-alert>

    <b-alert :show="haveInvalidUsers" variant="danger">
      <div class="alert-body">
        <div class="d-flex align-items-center gap-1">
          <span class="material-symbols-outlined">gpp_maybe</span>
          <span>
            <b>Atenção:</b> foram encontrados dados inválidos na planilha. Revise o documento antes
            de avançar.
          </span>
        </div>
      </div>
    </b-alert>

    <section
      id="drop-area"
      class="border-secondary rounded-lg py-4 w-100 mb-1 cursor-pointer"
      :class="{ 'active-drop-zone': isDragging, 'disabled-drop-zone': isLoading }"
      style="border-style: dashed !important"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
      @click="triggerFileInput"
    >
      <input ref="fileInput" type="file" accept=".xlsx" class="d-none" @change="handleFileSelect" />

      <div class="text-center">
        <span class="material-symbols-outlined text-body" style="font-size: 36px">upload</span>
        <br />
        <h5>Arraste e solte ou <b class="text-primary">escolha um arquivo</b> para importar</h5>
        <small class="text-body">Apenas arquivos <b>.XLSX</b>.</small>
      </div>
    </section>

    <section>
      <transition-group name="file-list" tag="div">
        <b-alert
          v-for="(file, index) in filesToImport"
          :key="file.name + index"
          show
          variant="primary"
        >
          <div class="alert-body d-flex align-items-center justify-content-between gap-1">
            <div class="d-flex align-items-center gap-1">
              <span class="material-symbols-outlined" style="font-size: 48px">description</span>
              <div>
                <h6 class="text-truncate mb-0">{{ file.name }}</h6>
                <small class="text-black font-weight-light"
                  >{{ formatNumber(file.size) }} KB</small
                >
              </div>
            </div>
            <span
              class="material-symbols-outlined text-danger cursor-pointer"
              @click="deleteFile(index)"
              >delete</span
            >
          </div>
        </b-alert>
      </transition-group>
    </section>

    <Portal to="footer-mass-import">
      <hr class="mb-0" />
      <div class="d-flex align-items-center justify-content-center gap-2 px-2 py-1">
        <b-button variant="outline-danger" :disabled="isLoading" @click="cancelImport(false)">
          Cancelar
        </b-button>
        <b-button
          variant="primary"
          :disabled="isLoading || !filesToImport.length || haveInvalidUsers || exceedsClassLimit"
          @click="submitClasses()"
        >
          <b-spinner v-show="isSubmitting" small />
          Avançar
        </b-button>
      </div>
    </Portal>
  </section>
</template>