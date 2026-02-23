<template>
  <b-card>
    <b-row>
      <b-col cols="12" md>
        <b-form-group label="Ano Escolar" label-for="schoolYear">
          <ESelect
            :disabled="schoolYearLoading"
            :value="serie"
            :options="schoolYearOptions"
            :page="schoolYearPage"
            :total-pages="schoolYearTotalpages"
            :loading="schoolYearLoading"
            name="schoolYear"
            paginated
            placeholder="selectOneSchoolYearLabel"
            label="name"
            @nextPage="fetchSchoolYear"
            @input="setSchoolYear"
          >
            <template v-slot:no-options> {{ $t('schoolYearNotFound') }}</template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" md>
        <b-form-group :label="$t('Turma')" label-for="classes">
          <ESelect
            :disabled="classesLoading"
            :value="classe"
            :options="classesOptions"
            :page="classesPage"
            :total-pages="classesTotalpages"
            :loading="classesLoading"
            paginated
            name="classes"
            label="name"
            @nextPage="fetchClasses"
            @input="setclasses"
            @change="resetAndFetch"
          >
            <template v-slot:no-options> {{ $t('classesNotFound') }}</template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col v-if="$can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT)" cols="12" md="auto">
        <b-form-group label-for="button">
          <template v-slot:label>
            <span class="d-none d-md-inline-block"> &nbsp;</span>
          </template>
          <span v-b-tooltip.hover="totalLicenses ? '' : tooltipText" label-for="button">
            <b-button
              variant="primary"
              size="sm"
              block
              :disabled="totalLicenses <= 0"
              @click="openSideBarCreateStudent"
            >
              <span class="material-symbols-outlined align-middle" style="font-size: 21px">
                add_circle
              </span>
              <span class="align-middle"> Novo aluno</span>
            </b-button>
          </span>
        </b-form-group>
      </b-col>
      <b-col v-if="$can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT)" cols="12" md="auto">
        <b-form-group label-for="button">
          <template v-slot:label>
            <span class="d-none d-md-inline-block"> &nbsp;</span>
          </template>
          <span v-b-tooltip.hover="totalLicenses ? '' : tooltipText" label-for="button">
            <b-button
              variant="primary"
              size="sm"
              block
              :disabled="totalLicenses <= 0"
              @click="showImport(totalLicenses)"
            >
              <span class="material-symbols-outlined align-middle" style="font-size: 21px">
                upload_file
              </span>
              <span class="align-middle"> Importar</span>
            </b-button>
          </span>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="auto">
        <b-form-group label-for="button">
          <template v-slot:label>
            <span class="d-none d-md-inline-block"> &nbsp;</span>
          </template>
          <b-dropdown
            v-b-tooltip.hover.top="
              disabledMassActions ? 'Selecione 2 ou mais alunos para realizar essa ação.' : ''
            "
            right
            variant="outline-primary"
            text="Ações em lote"
            block
            :disabled="disabledMassActions"
          >
            <b-dropdown-item
              v-for="(action, index) in dropdownActions"
              :key="index"
              @click.stop="action.action(action.isEnabled())"
            >
              <div
                v-b-tooltip.hover.top="action.tooltip(action.isEnabled())"
                :class="action.isEnabled() ? `${action.class}` : 'cursor-not-allowed text-muted'"
              >
                <span class="material-symbols-outlined align-middle" style="font-size: 18px">
                  {{ action.icon }}
                </span>
                <span class="align-middle"> {{ action.label }}</span>
                <span v-if="!action.isEnabled()" class="badge-disable">Desabilitado</span>
              </div>
            </b-dropdown-item>
          </b-dropdown>
        </b-form-group>
      </b-col>
    </b-row>

    <CreateStudentIndex ref="refSideBarCreateStudent" />
    <ImportStudentsIndex />

    <ModalConfirm
      v-model="confirmDeleteIsOpen"
      :callback-confirm="deleteStudent"
      :busy="loadingDelete"
      label-confirm="Excluir"
      icon="delete"
      icon-variant="danger"
      cancel-variant="outline-primary"
      confirm-variant="danger"
    >
      <h4>Tem certeza que deseja excluir?</h4>

      <p>
        Os
        <span class="text-primary font-bold"> {{ massDeleteMessage }}</span> serão excluídos
        permanentemente.
      </p>
      <b-alert :show="showAlert" variant="danger">
        <div class="alert-body font-normal d-flex align-items-center gap-2">
          <span class="material-symbols-outlined" style="font-size: 16px"> info </span>
          <span class="text-left"> Atenção! Os alunos integrados não serão excluídos.</span>
        </div>
      </b-alert>
    </ModalConfirm>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { ACTION, PERMISSION } from '@/consts/permissions.js'
import router from '@/router'
import { deleteMassStudentds } from '@/services/admin-context/students/Students.service'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import { getSeries } from '@/services/shared/serie/Serie.Service.js'
import store from '@/store'
import { havePermissionOnSerie } from '@/utils/utils'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import ImportStudentsIndex from '@/views/pages/records/students/import/Index.vue'
import { useImportStudents } from '@/views/pages/records/students/import/useImportStudents'
import CreateStudentIndex from '@/views/pages/records/students/list/create/CreateStudentIndex.vue'
import { useRecordStudents } from '@/views/pages/records/students/list/useRecordStudents'
import { computed, getCurrentInstance, onUnmounted, ref } from 'vue'

const vm = getCurrentInstance().proxy
const { showImport } = useImportStudents()
const {
  selectedStudents,
  params,
  classe,
  serie,
  refSideBarCreateStudent,
  totalLicenses,
  total,
  resetAndFetch,
  resetTable,
} = useRecordStudents()

const tooltipText =
  'Não há licenças disponíveis. Libere cadastro excluindo alunos ou contate o nosso suporte.'

serie.value = { id: null, name: 'Todos os anos' }
classe.value = {
  name: 'Todas as turmas',
  id: null,
}

const showAlert = computed(() => {
  return (
    selectedStudents.value.batchAction === 2 ||
    selectedStudents.value.value.some(item => item.isIntegrator)
  )
})

const selectedSerie = computed(() => {
  return !!serie.value.id
})

const schoolYearLoading = ref(true)
const schoolYearOptions = ref([])
const schoolYearPage = ref(1)
const schoolYearTotalpages = ref(1)

const setSchoolYear = value => {
  classe.value = {
    name: 'Todas as turmas',
    id: null,
  }
  serie.value = value
  fetchClasses()
  resetAndFetch()
}

const fetchSchoolYear = async (ctx = {}) => {
  schoolYearLoading.value = true

  const { page } = ctx
  schoolYearPage.value = page || 1

  try {
    const { data } = await getSeries({
      Page: schoolYearPage.value,
    })

    const options = data.data

    if (schoolYearPage.value === 1 && !options.length) {
      setNoClasses(true)
      schoolYearLoading.value = false

      return
    }

    if (schoolYearPage.value === 1) {
      options.unshift({ id: null, name: 'Todos os anos' })
      schoolYearOptions.value = []
    }

    schoolYearOptions.value.push(...options)
    schoolYearTotalpages.value = data.totalPages
  } catch (error) {
    setNoClasses(true)
  }

  schoolYearLoading.value = false
}

const setNoClasses = noSchoolYear => {
  if (noSchoolYear) {
    schoolYearOptions.value = [
      {
        id: false,
        name: 'Nenhum ano escolar encontrado',
      },
    ]

    serie.value = schoolYearOptions.value[0]
  }
  classesOptions.value = [
    {
      id: false,
      name: 'Nenhuma Turma encontrada',
    },
  ]
  classe.value = classesOptions.value[0]

  resetTable()
}

const classesLoading = ref(true)
const classesOptions = ref([])
const classesPage = ref(1)
const classesTotalpages = ref(1)

const setclasses = value => {
  classe.value = value
}

const fetchClasses = async (ctx = {}) => {
  classesLoading.value = true

  const { page } = ctx
  classesPage.value = page || 1

  try {
    const { data } = await getClassesV2Label({
      SerieIds: [serie.value.id],
      Page: classesPage.value,
    })

    const options = data.data

    if (classesPage.value === 1) {
      if (!options.length) {
        classesLoading.value = false
        setNoClasses()
        return
      }
      classesOptions.value = [{ name: 'Todas as turmas', id: null }]
    }

    classesOptions.value.push(...options)
    classesTotalpages.value = data.totalPages
    classesLoading.value = false
  } catch (error) {
    setNoClasses()
  }
}

/** @type {import('vue').ComputedRef<Boolean>} */
const disabledMassActions = computed(() => {
  return selectedStudents.value.value.length <= 1 && selectedStudents.value.batchAction === 1
})

const dropdownActions = [
  {
    icon: 'feed',
    label: 'Gerar Boletins',
    class: 'text-primary',
    tooltip: isEnabled => {
      if (!selectedSerie.value)
        return 'Filtre 1 (um) ano escolar específico para liberar a geração de boletins em lote.'
      if (!isEnabled) {
        return 'A funcionalidade Boletim do Aluno não está habilitada para esse ano escolar. Contate o suporte para saber mais.'
      }

      return ''
    },
    isEnabled: () => {
      return havePermissionOnSerie(serie.value.id, PERMISSION.MODULE.CARD_REPORT)
    },
    action: isEnabled => {
      if (!isEnabled) return
      vm.$bus.emit('reportStudent', {
        classId: classe.value.id,
        studentsIds: selectedStudents.value.value.map(student => student.id),
        batchAction: selectedStudents.value.batchAction,
        serieId: serie.value.id,
        serieName: serie.value.name,
      })
    },
  },
  {
    icon: 'workspace_premium',
    label: 'Gerar certificado',
    class: 'text-primary',
    isEnabled: () => true,
    tooltip: () => {
      return ''
    },
    action: () => {
      vm.$bus.emit('generateCertificate', {
        classId: classe.value.id,
        studentsIds: selectedStudents.value.value.map(student => student.id),
        batchAction: selectedStudents.value.batchAction,
        serieId: serie.value.id,
        serieName: serie.value.name,
      })
    },
  },
  {
    icon: 'badge',
    label: 'Gerar carteirinhas',
    class: 'text-primary',
    tooltip: () => {
      return ''
    },
    isEnabled: () => true,
    action: () => {
      const studentsIds = selectedStudents.value.value.map(student => student.id)

      router.push({
        name: 'studentCard',
        query: {
          studentsIds,
          pdfTitle: 'Carteirinhas',
          batchAction: selectedStudents.value.batchAction,
          searchTerm: params.value.search,
          classId: classe.value.id,
          serieId: serie.value.id,
        },
      })
    },
  },
  {
    icon: 'mail_lock',
    label: 'Gerar carta de acesso',
    class: 'text-primary',
    isEnabled: () => true,
    tooltip: () => {
      return ''
    },
    action: () => {
      const studentsIds = selectedStudents.value.value.map(student => student.id)

      router.push({
        name: 'accessLetters',
        params: {
          studentsIds,
          pdfTitle: 'Cartas de acesso',
          batchAction: selectedStudents.value.batchAction,
          searchTerm: params.value.search,
          classId: classe.value.id,
        },
      })
    },
  },
]

if (vm.$can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT)) {
  dropdownActions.push({
    icon: 'delete',
    label: 'Excluir alunos',
    class: 'text-danger',
    isEnabled: () => true,
    tooltip: () => {
      return ''
    },
    action: () => {
      showModalConfirmDelete()
    },
  })
}

const confirmDeleteIsOpen = ref(false)
const massDeleteMessage = ref('')

const showModalConfirmDelete = () => {
  confirmDeleteIsOpen.value = true
  massDeleteMessage.value = `${
    selectedStudents.value.batchAction === 1
      ? selectedStudents.value.value.length
      : total.value
  } aluno(s)`
}

const loadingDelete = ref(false)
const deleteStudent = () => {
  loadingDelete.value = true

  const studentsIds = selectedStudents.value.value.map(student => student.id)

  deleteMassStudentds(
    studentsIds,
    selectedStudents.value.batchAction,
    params.value.search,
    classe.value.id,
    serie.value.id,
  )
    .then(() => {
      confirmDeleteIsOpen.value = false
      vm.$bus.emit('resetAndFetch')
      vm.$toast({
        component: Toast,
        props: {
          title: 'Usuário(s) excluído(s) com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
    })
    .finally(() => {
      loadingDelete.value = false
      resetAndFetch()
    })
}

const openSideBarCreateStudent = () => {
  refSideBarCreateStudent.value.openSidebar()
}

onUnmounted(() => {
  store.dispatch('filters/reset')
})
</script>
<style scoped lang="scss">
  .badge-disable {
    background-color: #6c757d1f;
    color: #6e6b7b;
    font-size: 10px;
    border-radius: 16px;
    padding: 2px 8px;
    margin-left: 8px;
  }
</style>
