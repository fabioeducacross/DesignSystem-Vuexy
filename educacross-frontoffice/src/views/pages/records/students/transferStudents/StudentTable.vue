<template>
  <div class="d-flex flex-column h-100">
    <b-card>
      <b-row>
        <b-col v-if="transferFromInstitution" cols="12">
          <b-form-group :label="institutionLabel" label-for="institution">
            <ESelect
              id="institution"
              v-model="selectedInstitution"
              :options="institutionList"
              label="name"
              :placeholder="institutionPlaceholder"
              :clearable="false"
              :searchable="false"
              :loading="loadingInstitutions"
              :disabled="loadingInstitutions"
              @input="handleInstitutionChange"
            >
              <template #noOptions>
                <span>{{ $t('noResultsFound') }}</span>
              </template>
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group :label="classLabel" label-for="class">
            <ESelect
              id="class"
              v-model="selectedClass"
              :options="classOptions"
              label="name"
              :placeholder="classPlaceholder"
              :clearable="false"
              :searchable="false"
              :loading="loading"
              :disabled="loading || (transferFromInstitution && !selectedInstitution)"
              :paginated="true"
              :page="classPage"
              :total-pages="classListTotalPages"
              @input="handleClassChange"
              @nextPage="handleNextPageClass"
            >
              <template #selected-option="{ name, serieName }">
                <div class="d-flex align-items-center gap-1">
                  <span>{{ name }}</span>
                  <b-badge v-if="serieName" pill variant="light-primary">
                    {{ serieName }}
                  </b-badge>
                </div>
              </template>
              <template #option="{ name, serieName, id }">
                <div
                  class="d-flex align-items-center justify-content-between flex-1"
                  :class="{ 'text-muted cursor-not-allowed': classDisabled(id) }"
                >
                  <span>{{ name }}</span>
                  <b-badge
                    v-if="serieName"
                    pill
                    variant="light-primary"
                    :class="selectedClass && selectedClass.id === id ? 'bg-white text-primary' : ''"
                  >
                    {{ serieName }}
                  </b-badge>
                </div>
              </template>
              <template #noOptions>
                <span>{{ $t('noClassFound') }}</span>
              </template>
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <div class="d-flex">
            <b-form-checkbox
              v-model="showOnlyRegularStudents"
              class="custom-control-primary book-custom-switch"
              switch
            >
              <span class="switch-icon-left" style="top: 5px">
                <feather-icon icon="CheckIcon" />
              </span>
              <span class="switch-icon-right" style="top: 5px">
                <feather-icon icon="XIcon" class="text-muted" />
              </span>
            </b-form-checkbox>
            <span>Exibir somente alunos regulares</span>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <b-alert show variant="primary" class="p-2 mb-50">
      <span class="font-bold">Total de Alunos na Turma:</span> {{ formatNumber(rows) }}
    </b-alert>
    <b-card no-body class="flex-grow-1">
      <ListTableSelectLocal
        ref="refStudentsTable"
        v-model="selectedStudents"
        :data-table="filteredStudents"
        :table-columns="fields"
        :loading="loading"
        :force-resposive="true"
        card-class="mb-0"
        search-placeholder="searchForStudent"
        selected-label="Selecionados"
        sticky-header="545px"
      >
        <template #head(actions)="">
          <div class="d-flex justify-content-end">
            <span
              v-b-tooltip.top
              :title="cantTransferMessageTooltip"
              :disabled="!transferButtonDisabled"
            >
              <b-button
                variant="link"
                :class="[
                  isDestination ? 'text-danger' : 'text-primary',
                  'cursor-pointer d-flex align-items-center gap-1 p-0',
                ]"
                :disabled="transferButtonDisabled"
                @click="prepareTransfer([], true)"
              >
                <span class="underline">
                  {{ isDestination ? 'Desfazer migração' : 'Migrar selecionados' }}
                </span>

                <span class="material-symbols-outlined">
                  {{ isDestination ? 'undo' : 'arrow_forward' }}
                </span>
              </b-button>
            </span>
          </div>
        </template>
        <template #cell(actions)="data">
          <div v-if="!isDestination || data.item.isTransfered" class="d-flex justify-content-end">
            <span
              v-b-tooltip.top
              :title="cantTransferActionMessage"
              :class="{
                'text-primary cursor-pointer': !cantTransferActionDisabled,
                'text-muted cursor-default': cantTransferActionDisabled,
              }"
              class="material-symbols-outlined"
              @click.stop="prepareTransfer([data.item])"
            >
              {{ isDestination ? 'undo' : 'arrow_forward' }}
            </span>
          </div>
        </template>
        <template #cell(name)="{ item }">
          <span class="text-break font-weight-bolder">{{ item.name }}</span>
          <span
            v-if="item.isStandardOnDestination && !isDestination"
            v-b-tooltip.hover.html="studentClassTooltip"
            class="material-symbols-outlined text-danger tooltip-name-alert ml-50"
          >
            info
          </span>
        </template>

        <template #cell(status)="{ item }">
          <b-badge v-if="item.standard" variant="light-info">Regular</b-badge>
          <b-badge v-else variant="light-orange">Extra</b-badge>
        </template>

        <template v-slot:empty>
          <div
            v-if="selectedClass && selectedClass.id"
            class="d-flex flex-column align-items-center"
          >
            <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
            <span
              class="text-center text-primary font-bold"
              v-html="$t('noInformationFound')"
            ></span>
          </div>
          <div v-else class="d-flex flex-column align-items-center">
            <span class="material-symbols-outlined text-primary mb-2 mt-2" style="font-size: 42px">
              {{ emptyTableIcon }}
            </span>
            <span class="text-center" v-html="$t(emptyTableText)"></span>
          </div>
        </template>
      </ListTableSelectLocal>
    </b-card>
    <ModalConfirm
      v-model="openConfirmTransfer"
      :callback-confirm="() => transfer(tempPrepareTransfer, tempTransferSelected)"
      label-confirm="Continuar"
    >
      <h4>Desejar continuar?</h4>
      <p v-if="openConfirmTransfer" v-html="confirmText"></p>
    </ModalConfirm>
  </div>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import ListTableSelectLocal from '@/components/table/ListTableSelectLocal.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { formatNumber } from '@/filters/filters'
import { getStudentsLabel } from '@/services/admin-context/students/Students.service.js'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import { getInstitutions } from '@/services/shared/institution/Institutions.Service'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import { useTransferStudents } from '@/views/pages/records/students/transferStudents/useTransferStudents.js'
import { can } from '@core/libs/acl/utils'
import { computed, onMounted, ref, watch } from 'vue'

// Props
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  isDestination: {
    type: Boolean,
    default: false,
  },
  transferedStudents: {
    type: Array,
    default: () => [],
  },
  currentClass: {
    default: null,
  },
  destinationClass: {
    default: null,
  },
  transferFromInstitution: {
    type: Boolean,
    required: true,
  },
})

// Emits
const emit = defineEmits(['transfer', 'institutionChange', 'classChange'])

const PER_PAGE_DEFAULT = 10

const { students, filteredStudents, showOnlyRegularStudents } = useTransferStudents(
  props.isDestination,
)
const refStudentsTable = ref(null)
const selectedStudents = ref([])

const rows = computed(() => filteredStudents.value.length)

const fields = ref([
  {
    key: 'name',
    label: 'Aluno',
    searchable: true,
    sortable: true,
    thClass: 'position-sticky',
  },
  {
    key: 'status',
    label: 'Status',
    tooltip:
      'O <span class="font-bold">Status</span> indica a relação do aluno com a turma selecionada: ele pode estar matriculado como aluno <span class="font-bold">Regular</span> ou participar como aluno <span class="font-bold">Extra.</span>',
  },
  {
    key: 'actions',
    label: 'Ações',
    thStyle: { width: '215px' },
  },
])
const searchQuery = ref('')

const selectAll = ref(false)

const transferredStudents = ref(props.transferedStudents)
const loading = ref(false)

const selectedClass = ref(null)
const classListTotalPages = ref(1)
const classOptions = ref([])
const classPage = ref(1)

const selectedInstitution = ref(null)
const institutionList = ref([])
const loadingInstitutions = ref(false)

const openConfirmTransfer = ref(false)
const confirmText = computed(() => {
  if (tempPrepareTransfer.value.length === 1) {
    return `<span class="font-bold">Atenção:</span><span class="text-primary font-bold"> ${tempPrepareTransfer.value[0].name}</span> será desvinculada da turma <span class="text-primary font-bold">${selectedClass.value.name}</span>. Seu status como <span class="font-bold">Regular</span> na turma de destino permanecerá inalterado.`
  }
  return `<span class="font-bold">Atenção:</span><span class="text-primary font-bold"> ${tempPrepareTransfer.value.length} alunos</span> serão desvinculados da turma  <span class="text-primary font-bold">${selectedClass.value.name}</span>. Seus status como <span class="font-bold">Regular</span> na turma de destino permanecerão inalterados..`
})

const cantTransferMessage = computed(() => {
  if (!props.currentClass) {
    return 'Selecione a Turma de origem para transferir'
  }

  if (!props.destinationClass) {
    return 'Selecione a Turma de destino para transferir'
  }

  if (!selectedStudents.value.length) {
    return 'Selecione um Aluno para transferir'
  }

  return null
})

const studentClassTooltip =
  '<span class="font-bold">Atenção:</span> este(a) aluno(a) já é <span class="font-bold">Regular</span> na turma de destino selecionada. Ao realizar a migração, ele(a) deixará de ser <span class="font-bold">Extra</span> nesta turma, mas seu status como <span class="font-bold">Regular</span> na turma de destino permanecerá inalterado.'

const cantTransferMessageTooltip = computed(() => {
  if (props.isDestination && !props.currentClass) {
    return 'Ação bloqueada. Selecione a Turma de origem para transferir'
  }

  if (!props.destinationClass) {
    return 'Ação bloqueada. Selecione a turma destino para transferir.'
  }

  if (!selectedStudents.value.length) {
    return 'Selecione um ou mais aluno para transferir.'
  }

  return props.isDestination ? 'Desfazer migração' : 'Migrar selecionados'
})

const transferButtonDisabled = computed(() => cantTransferMessage.value !== null)

const cantTransferActionMessage = computed(() => {
  if (!props.destinationClass) {
    return 'Selecione a Turma de destino para transferir'
  }

  return 'Transferir'
})

const cantTransferActionDisabled = computed(() => {
  return !props.destinationClass || !props.currentClass
})

const emptyTableIcon = props.isDestination ? 'flight_land' : 'flight_takeoff'

const emptyTableText = computed(() => {
  if (props.isDestination) {
    if (!selectedClass.value?.id)
      return 'Escolha a  <strong class="text-primary"> Turma de destino </strong> para iniciar a transferência.'
    return 'Escolha os Alunos da <strong class="text-primary"> Turma de origem </strong> para iniciar a transferência.'
  }

  if (!selectedClass.value?.id) {
    return 'Escolha a  <strong class="text-primary"> Turma de origem </strong> para exibir os Alunos.'
  }

  if (selectedClass.value?.id && !filteredStudents.value.length) {
    return 'A <strong class="text-primary"> Turma de origem </strong> não possui Alunos cadastrados.'
  }

  return 'Escolha a  <strong class="text-primary"> Turma de origem </strong> para exibir os Alunos.'
})

const classLabel = props.isDestination ? 'Turma de Destino' : 'Turma de Origem'
const institutionLabel = props.isDestination ? 'Escola de destino' : 'Escola de origem'

const classPlaceholder = props.isDestination
  ? 'Seleciona a turma de destino'
  : 'Seleciona a turma de origem'
const institutionPlaceholder = props.isDestination
  ? 'Seleciona a escola de destino'
  : 'Seleciona a escola de origem'

const tempPrepareTransfer = ref([])
const tempTransferSelected = ref(false)

const prepareTransfer = (prepareTransfer, transferSelected = false) => {
  if (cantTransferActionDisabled.value) {
    return
  }
  if (props.isDestination) return transfer(prepareTransfer, transferSelected)

  if (transferSelected) {
    tempPrepareTransfer.value = selectedStudents.value
  } else {
    tempPrepareTransfer.value = prepareTransfer
  }

  const hasStandardStudent = tempPrepareTransfer.value.some(
    student => student.isStandardOnDestination,
  )

  if (hasStandardStudent) {
    openConfirmTransfer.value = true
    tempTransferSelected.value = transferSelected
  } else {
    transfer(prepareTransfer, transferSelected)
  }
}

const transfer = (studentsTransferred, transferSelected = false) => {
  if (cantTransferActionDisabled.value) {
    return
  }

  // Transfer students locally
  let transferred = studentsTransferred

  if (transferSelected) {
    transferred = selectedStudents.value
    selectedStudents.value = []
    refStudentsTable.value.reset()
  }

  transferredStudents.value = transferredStudents.value.concat(transferred)
  const transferedIndex = selectedStudents.value.findIndex(student => {
    return student.id === transferred[0].id
  })

  if (transferedIndex !== -1) selectedStudents.value.splice(transferedIndex, 1)

  // Emit event to parent component
  emit('transfer', transferred, props.isDestination)
  openConfirmTransfer.value = false
}

/**
 * Carrega proxima pagina de turmas (paginacao)
 * @param {Object} params - Parametros de paginacao
 * @param {number} params.page - Numero da pagina a carregar
 */
const handleNextPageClass = async ({ page }) => {
  if (props.transferFromInstitution && !selectedInstitution.value) {
    return
  }

  loading.value = true
  classPage.value = page

  try {
    const response = await getClassesV2Label({
      page: classPage.value,
      pageSize: PER_PAGE_DEFAULT,
      institutionId: selectedInstitution.value?.id,
    })

    classListTotalPages.value = response.data.totalPages

    // ESelect nao acumula automaticamente - fazer manual
    classOptions.value.push(...response.data.data)
  } catch (error) {
    console.error('Erro ao carregar turmas:', error)
  } finally {
    loading.value = false
  }
}

/**
 * Carrega primeira pagina de turmas
 */
const initialFetchClasses = async () => {
  if (props.transferFromInstitution && !selectedInstitution.value) {
    return
  }

  classPage.value = 1
  classOptions.value = []
  await handleNextPageClass({ page: 1 })
}

const classDisabled = id => {
  if (id === null) {
    return false
  }

  if (props.isDestination) {
    return id === props.currentClass?.id
  }

  return id === props.destinationClass?.id
}

const fetchInstitutionData = () => {
  if (!can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)) return
  loadingInstitutions.value = true
  getInstitutions()
    .then(response => {
      institutionList.value = response.data
    })
    .finally(() => {
      loadingInstitutions.value = false
    })
}

/**
 * Handler de mudanca de instituicao
 * @param {Object} institution - Instituicao selecionada
 */
const handleInstitutionChange = institution => {
  selectedInstitution.value = institution
  selectedClass.value = null

  // Reset manual ao inves de ref.reset()
  classOptions.value = []
  classPage.value = 1
  classListTotalPages.value = 1

  // Carregar turmas da nova instituicao
  if (institution) {
    initialFetchClasses()
  }

  emit('institutionChange', institution?.id || null, props.isDestination)
}

const fetchStudents = () => {
  if (!selectedClass.value?.id) {
    return
  }

  loading.value = true

  getStudentsLabel({
    classId: selectedClass.value.id,
  })
    .then(response => {
      students.value = response.data
    })
    .finally(() => {
      loading.value = false
    })
}

const handleClassChange = classe => {
  if (!classe) {
    return
  }
  if (classDisabled(classe.id)) {
    selectedClass.value = null
    return
  }

  reset()
  emit('classChange', selectedClass.value, props.isDestination)
  fetchStudents()
}

const reset = () => {
  students.value = []
  fetchStudents()
}

watch(selectedClass, (newVal, oldVal) => {
  if (!newVal || classDisabled(newVal.id)) {
    selectedClass.value = oldVal
    return
  }
})

onMounted(() => {
  fetchInstitutionData()

  // Se ja tem instituicao selecionada (props), carregar turmas
  if (selectedInstitution.value) {
    initialFetchClasses()
  }
})
</script>

<style scoped>
  .tooltip-name-alert {
    font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    font-size: 16px;
    vertical-align: text-top;
  }
</style>
