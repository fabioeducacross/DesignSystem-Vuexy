<script setup>
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import ListTablePagination from '@/components/table/ListTablePagination.vue'
import { formatNumber } from '@/filters/filters'
import { importStudentsV2 } from '@/services/teacher-context/students/Students.service'
import ImportStudentsEdit from '@/views/pages/records/students/import/edit/Index.vue'
import { useImportStudents } from '@/views/pages/records/students/import/useImportStudents'
import { required, max, email } from '@core/utils/validations/validations.js'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { computed, ref, watch } from 'vue'

const {
  availableLicensesQTD,
  isImportingMoreThanLimit,
  importUsersLimit,
  filesToImport,
  rawImportingUsers,
  importingUsers,
  fileName,
  editUser,
  cancelImport,
  gotoNextStepWizard,
} = useImportStudents()

const currentPage = ref(1)
const isSubmitting = ref(false)
const submissionError = ref(null)
const pageSize = ref(5)

// limpado variável filesToImport para não deixar os arquivos na memória
filesToImport.value = []

const sumImportingUsersFromValidation = computed(() => rawImportingUsers.value.length)

const haveInvalidUsers = computed(() => {
  return rawImportingUsers.value.some(user => !user.isValid)
})

const isImportingMoreThanAvailable = computed(() => {
  return sumImportingUsersFromValidation.value > availableLicensesQTD.value
})

const canSubmit = computed(() => {
  return (
    !isSubmitting.value &&
    importingUsers.value.length > 0 &&
    !haveInvalidUsers.value &&
    !isImportingMoreThanAvailable.value &&
    !isImportingMoreThanLimit.value
  )
})

const hasNoUsers = computed(() => {
  return importingUsers.value.length === 0
})

const tooltipMessage = computed(() => {
  if (isImportingMoreThanLimit.value && haveInvalidUsers.value) {
    return (
      'Atenção: foram encontrados dados inválidos \n' +
      'na planilha. Revise o arquivo para avançar.\n' +
      'Importe apenas 300 usuários por vez. '
    )
  }
  if (isImportingMoreThanLimit.value) {
    return `Importe apenas ${formatNumber(importUsersLimit)} usuários por vez.`
  }
  if (haveInvalidUsers.value) {
    return 'Atenção: foram encontrados dados inválidos na planilha. Revise o arquivo para avançar.'
  }

  return ''
})

const excludeUser = user => {
  const rawIndex = rawImportingUsers.value.findIndex(u => u.id === user.id)

  if (rawIndex !== -1) {
    rawImportingUsers.value.splice(rawIndex, 1)
  }
}

const handleSubmit = async () => {
  if (!canSubmit.value) return

  try {
    isSubmitting.value = true
    const params = {
      filename: fileName.value,
      studentAccess: rawImportingUsers.value.map(user => ({
        name: user.name,
        sponsorEmail: user.sponsorEmail,
        classId: user.class.id,
      })),
    }

    await importStudentsV2(params)
  } catch (err) {
    submissionError.value = 'Erro ao importar alunos. Tente novamente.'
    return
  } finally {
    isSubmitting.value = false
  }

  rawImportingUsers.value = []
  importingUsers.value = []

  gotoNextStepWizard()
}

// Reset to page 1 when sorting changes to ensure users see the invalid entries
watch(importingUsers, () => {
  currentPage.value = 1
})

const tableColumns = [
  {
    key: 'name',
    label: 'Nome do Aluno',
    sortable: false,
  },
  {
    key: 'sponsorEmail',
    label: 'E-MAIL DO RESPONSÁVEL',
    sortable: false,
  },
  {
    key: 'class',
    label: 'Turma',
    sortable: false,
  },
  {
    key: 'isValid',
    label: 'Status',
    sortable: false,
  },
  {
    key: 'actions',
    label: 'Ações',
    sortable: false,
  },
]
</script>

<template>
  <section>
    <div class="d-flex align-items-center gap-1">
      <b-alert show :variant="isImportingMoreThanAvailable ? 'danger' : 'primary'" class="flex-1">
        <div class="alert-body text-center">
          <span class="material-symbols-outlined align-middle">id_card</span>
          <span class="align-middle">
            Disponível:
            <b>{{ formatNumber(availableLicensesQTD) }} licenças. </b></span
          >
          <span
            v-show="!isImportingMoreThanAvailable"
            class="material-symbols-outlined text-success align-middle"
            >check_circle</span
          >
          <span
            v-show="isImportingMoreThanAvailable"
            v-b-tooltip.hover="
              'Atenção: o número de usuários encontrados excede a quantidade de licenças disponíveis. Revise o arquivo para avançar.'
            "
            class="material-symbols-outlined align-middle cursor-help"
            >error</span
          >
        </div>
      </b-alert>
      <b-alert
        show
        :variant="
          isImportingMoreThanLimit || haveInvalidUsers || sumImportingUsersFromValidation === 0
            ? 'danger'
            : 'primary'
        "
        class="flex-1"
      >
        <div class="alert-body text-center">
          <span class="material-symbols-outlined align-middle">group</span>
          <span class="align-middle">
            Importando: <b>{{ formatNumber(sumImportingUsersFromValidation) }} usuários. </b></span
          >

          <span
            v-show="
              !isImportingMoreThanLimit && !haveInvalidUsers && sumImportingUsersFromValidation > 0
            "
            class="material-symbols-outlined text-success align-middle"
            >check_circle</span
          >
          <span
            v-show="isImportingMoreThanLimit || haveInvalidUsers"
            v-b-tooltip.hover="tooltipMessage"
            class="material-symbols-outlined align-middle cursor-help"
            >error</span
          >
        </div>
      </b-alert>
    </div>

    <b-alert v-if="submissionError" show variant="danger" class="mt-2" dismissible>
      <div class="alert-body">
        <span class="material-symbols-outlined align-middle">error</span>
        <span class="align-middle">{{ submissionError }}</span>
      </div>
    </b-alert>

    <b-table
      :items="importingUsers"
      :fields="tableColumns"
      :per-page="pageSize"
      :current-page="currentPage"
      :show-empty="sumImportingUsersFromValidation === 0"
      responsive
    >
      <template v-slot:empty>
        <div class="d-flex flex-column align-items-center">
          <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
          <span class="text-center text-primary font-bold">
            Nenhum aluno encontrado para importar.
          </span>
          <b-button variant="primary">Importar</b-button>
        </div>
      </template>
      <template #cell(name)="{ item, value }">
        <div v-if="!item.isNameValid" class="text-nowrap">
          <span class="material-symbols-outlined align-middle text-danger">info</span>
          <b class="text-danger align-middle"> Nome inválido</b>
        </div>
        <span v-else class="text-nowrap">
          {{ value }}
        </span>
      </template>
      <template #cell(sponsorEmail)="{ item, value }">
        <div v-if="!item.isEmailValid" class="text-nowrap">
          <span class="material-symbols-outlined align-middle text-danger">info</span>
          <b class="text-danger align-middle"> Email inválido</b>
        </div>
        <span v-else class="text-nowrap">
          {{ value }}
        </span>
      </template>
      <template #cell(class)="{ item, value }">
        <div v-if="!item.isClassNameValid" class="text-nowrap">
          <span class="material-symbols-outlined align-middle text-danger">info</span>
          <b class="text-danger align-middle"> Turma inválida</b>
        </div>
        <span v-else class="text-nowrap">
          {{ value.name }}
        </span>
      </template>
      <template #cell(isValid)="{ value }">
        <b-badge :variant="value ? 'light-success' : 'light-danger'" pill>
          <b>{{ value ? 'Válido' : 'Inválido' }}</b>
        </b-badge>
      </template>
      <template #cell(actions)="{ item }">
        <div class="d-flex gap-1">
          <span
            v-b-tooltip="'Editar'"
            class="material-symbols-outlined text-primary font-weight-bold cursor-pointer"
            @click="editUser(item)"
            >edit</span
          >

          <span
            v-b-tooltip.hover="'Excluir'"
            class="material-symbols-outlined text-danger font-weight-bold cursor-pointer"
            @click="excludeUser(item)"
            >delete</span
          >
        </div>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="sumImportingUsersFromValidation"
      :per-page="pageSize"
      first-number
      last-number
      class="mb-0"
      prev-class="prev-item"
      next-class="next-item"
    >
      <template v-slot:prev-text>
        <feather-icon icon="ChevronLeftIcon" size="18" />
      </template>
      <template v-slot:next-text>
        <feather-icon icon="ChevronRightIcon" size="18" />
      </template>
    </b-pagination>

    <!-- Action Buttons -->
    <Portal to="footer-mass-import">
      <hr class="mb-0" />
      <div class="d-flex align-items-center justify-content-center gap-2 px-2 py-1">
        <b-button variant="outline-danger" :disabled="isSubmitting" @click="cancelImport(false)">
          Cancelar
        </b-button>

        <b-button
          variant="primary"
          :disabled="!canSubmit"
          :class="{ 'position-relative': isSubmitting }"
          @click="handleSubmit"
        >
          Avançar
        </b-button>
      </div>
    </Portal>
  </section>
</template>