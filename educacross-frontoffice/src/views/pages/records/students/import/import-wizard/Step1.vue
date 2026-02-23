<script setup>
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { useImportStudents } from '@/views/pages/records/students/import/useImportStudents'
import * as Excel from 'exceljs/dist/exceljs.min'
import { saveAs } from 'file-saver'
import { getCurrentInstance, nextTick, ref, watch } from 'vue'

const { proxy } = getCurrentInstance()
const {
  filesToImport,
  availableLicensesQTD,
  isImportingMoreThanAvailable,
  sumImportingUsersFromFiles,
  classes,
  rawImportingUsers,
  isLoading,
  fileName,
  showHistory,
  getFileToImportInfo,
  gotoNextStepWizard,
  isValidUser,
  cancelImport,
  findUserClass,
} = useImportStudents()

const loadingExampleFile = ref(false)

const isHelpOpen = ref(false)
const fileInput = ref(null)
const isDragging = ref(false)

const handleFileSelect = event => {
  if (isImportingMoreThanAvailable.value) return

  const files = event.target.files || event.dataTransfer.files
  const filesArray = Array.from(files)
  const xlsxFiles = filesArray.filter(file => file.name.toLowerCase().endsWith('.xlsx'))

  if (filesArray.length > xlsxFiles.length) {
    proxy.$toast({
      component: Toast,
      props: {
        title: 'Atenção!',
        text: `Selecione apenas arquivos com a extensão .XLSX`,
        icon: 'AlertTriangleIcon',
        variant: 'danger',
      },
    })
  }

  if (filesToImport.value.length === 0 && xlsxFiles.length > 0) {
    fileName.value = xlsxFiles[0].name
  }

  if (xlsxFiles.length > 0) {
    xlsxFiles.forEach(async file => {
      const res = await getFileToImportInfo(file)

      filesToImport.value.push({
        ...res,
        file,
      })
    })
  }

  // Reset drag state
  isDragging.value = false
  event.target.value = null
}

const triggerFileInput = () => {
  if (isImportingMoreThanAvailable.value) return
  fileInput.value.click()
}

const handleDragOver = event => {
  if (isImportingMoreThanAvailable.value) return
  event.preventDefault()
  isDragging.value = true
}

const handleDragLeave = () => {
  if (isImportingMoreThanAvailable.value) return
  isDragging.value = false
}

const handleDrop = event => {
  if (isImportingMoreThanAvailable.value) return
  event.preventDefault()
  handleFileSelect(event)
}

const deleteFile = index => {
  filesToImport.value.splice(index, 1)
}

const fetchAllClasses = async () => {
  if (classes.value.length > 0) return

  isLoading.value = true

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

  isLoading.value = false
}

const downloadExample = async () => {
  loadingExampleFile.value = true

  try {
    await fetchAllClasses()
  } catch (_error) {
    loadingExampleFile.value = false
    return
  }

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

  ws.addRow(['João Silva', 'joaosilvaPai@hotmail.com', classes.value[0].name])

  ws.addRow(['Maria Silva', '', classes.value[0].name])

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
  loadingExampleFile.value = false
}

watch(isImportingMoreThanAvailable, () => {
  if (isImportingMoreThanAvailable.value) {
    nextTick(() => {
      proxy.$root.$emit('bv::show::tooltip', 'licenses-warning')
    })
  } else {
    proxy.$root.$emit('bv::hide::tooltip', 'licenses-warning')
  }
})

const nextStep = async () => {
  await fetchAllClasses()

  let userId = 1
  rawImportingUsers.value = filesToImport.value
    .map(i => {
      const { users } = i

      return users.map(user => {
        user.class = findUserClass(user.className, classes.value)
        delete user.className

        const isValid = isValidUser(user)

        // eslint-disable-next-line no-underscore-dangle
        const _rowVariant = isValid.isValid ? '' : 'danger'

        return {
          id: userId++,
          ...user,
          ...isValid,
          _rowVariant,
        }
      })
    })
    .flat()

  gotoNextStepWizard()
}
</script>

<template>
  <section>
    <div class="d-flex align-items-center justify-content-between mb-1">
      <b-button variant="primary" :disabled="loadingExampleFile" @click="downloadExample">
        <span v-show="!loadingExampleFile" class="material-symbols-outlined align-middle"
          >download</span
        >
        <b-spinner v-show="loadingExampleFile" small />
        <span class="align-middle"> Baixar arquivo modelo</span>
      </b-button>
      <b-button variant="outline-primary" @click="() => (showHistory = true)">
        <span class="material-symbols-outlined align-middle">history</span>
        <span class="align-middle"> Ver importações</span>
      </b-button>
    </div>

    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1 border" @click="() => (isHelpOpen = !isHelpOpen)">
        <b-card-header header-tag="header" class="p-50 border-bottom" role="tab">
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
                    @click.capture.stop="downloadExample"
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
                  Os campos da planilha com * são obrigatórios: nome do Aluno e Turma.</span
                >
              </div>
            </b-card>
            <b-card body-class="p-50" class="border">
              <div>
                <span class="material-symbols-outlined text-primary align-middle">
                  account_circle
                </span>
                <span class="align-middle"> O usuário e senha serão criados automaticamente.</span>
              </div>
            </b-card>
            <b-card body-class="p-50" class="border">
              <div>
                <span class="material-symbols-outlined text-primary align-middle">publish</span>
                <span class="align-middle">
                  Só é possível importar o cadastro de até 300 usuários por vez.</span
                >
              </div>
            </b-card>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>

    <b-alert :variant="isImportingMoreThanAvailable ? 'danger' : 'primary'" show>
      <div class="alert-body text-center">
        <span class="material-symbols-outlined align-middle">id_card</span>
        <span class="align-middle">
          Disponível: <b>{{ availableLicensesQTD | formatNumber }} licenças. </b></span
        >
        <span
          v-show="!isImportingMoreThanAvailable"
          class="material-symbols-outlined align-middle text-success"
          >check_circle</span
        >
        <span
          v-show="isImportingMoreThanAvailable"
          id="licenses-warning"
          v-b-tooltip.hover="
            'Atenção: o número de usuários encontrados excede a quantidade de licenças disponíveis. Revise o arquivo ou exclua usuários na próxima etapa.'
          "
          class="material-symbols-outlined align-middle text-danger cursor-help"
          >error</span
        >
      </div>
    </b-alert>

    <section
      id="drop-area"
      class="border-secondary rounded-lg py-4 w-100 mb-1"
      style="border-style: dashed !important"
      :class="{
        'active-drop-zone': isDragging && !isImportingMoreThanAvailable,
        'disabled-drop-zone': isImportingMoreThanAvailable,
      }"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        multiple
        accept=".xlsx"
        class="d-none"
        @change="handleFileSelect"
      />

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
                  >{{ file.size | formatNumber }} KB</small
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
          :disabled="sumImportingUsersFromFiles === 0 || isLoading"
          @click="nextStep"
        >
          <b-spinner v-show="isLoading" small />
          Avançar
        </b-button>
      </div>
    </Portal>
  </section>
</template>

<style scoped>
  #drop-area {
    cursor: pointer;
    transition: all 0.2s ease;
  }

  #drop-area:hover:not(.disabled-drop-zone) {
    background-color: rgba(115, 103, 240, 0.04);
  }

  .active-drop-zone {
    background-color: rgba(var(--primary), 0.12) !important;
    border-color: var(--primary) !important;
  }

  .disabled-drop-zone {
    opacity: 0.6;
    cursor: not-allowed !important;
    background-color: rgba(0, 0, 0, 0.05) !important;
    border-color: #ccc !important;
  }

  /* File list transition effects */
  .file-list-enter-active {
    transition: all 0.5s ease;
  }

  .file-list-leave-active {
    transition: all 0.5s ease;
    position: absolute;
    width: 100%;
  }

  .file-list-enter {
    opacity: 0;
    transform: translateY(-30px);
  }

  .file-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .file-list-move {
    transition: transform 0.5s ease;
  }
</style>