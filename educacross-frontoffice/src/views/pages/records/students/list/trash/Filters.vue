<template>
  <section>
    <b-card>
      <b-row>
        <b-col cols="12" sm>
          <b-form-group label="Ano Escolar" label-for="schoolYear">
            <ESelect
              id="schoolYear"
              label="name"
              :value="serie"
              :options="schoolYears"
              :clearable="false"
              :loading="schoolYearsLoading"
              :disabled="schoolYearsLoading"
              @input="setschoolYear"
            >
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm>
          <b-form-group :label="$t('Turma')" label-for="classes">
            <ESelect
              id="classes"
              label="name"
              :value="classe"
              :options="classes"
              :clearable="false"
              :loading="classesLoading"
              :disabled="classesLoading"
              :page="classesPage"
              :total-pages="classesTotalpages"
              paginated
              @input="setclasses"
              @nextPage="fetchClasses"
            >
              <template v-slot:no-options> {{ $t('classesNotFound') }} </template>
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="auto">
          <b-form-group label-for="button">
            <template v-slot:label>
              <span class="d-none d-sm-inline-block"> &nbsp;</span>
            </template>
            <b-dropdown
              v-b-tooltip.hover.top="
                selectedData.batchAction === 1 && selectedData.value.length <= 1
                  ? 'Selecione 2 ou mais alunos para realizar essa ação'
                  : ''
              "
              block
              variant="outline-primary"
              text="Ações em Lote"
              :disabled="selectedData.batchAction === 1 && selectedData.value.length <= 1"
            >
              <b-dropdown-item variant="primary" @click="massUndoDelete">
                <span
                  class="material-symbols-outlined"
                  style="font-size: 14px; vertical-align: baseline"
                >
                  undo
                </span>
                Desfazer exclusão
              </b-dropdown-item>
            </b-dropdown>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
  </section>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { ACTION, PERMISSION } from '@/consts/permissions.js'
import { postStudentsExcluded } from '@/services/admin-context/students/Students.service.js'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import { getSeries } from '@/services/shared/serie/Serie.Service.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { useRecordsStudentsTrash } from '@/views/pages/records/students/list/trash/useRecordsStudentsTrash.js'
import { getCurrentInstance, computed, ref } from 'vue'

const vm = getCurrentInstance().proxy
const { selectedData, resetAndfetch, availableLicenses, serie, classe, params } =
  useRecordsStudentsTrash()

const schoolYears = ref([])
const schoolYearsLoading = ref(true)

classe.value = { name: 'Todas as turmas', id: null }
serie.value = { id: null, name: 'Todos os anos' }

const setschoolYear = value => {
  serie.value = value
  classe.value = { name: 'Todas as turmas', id: null }
  selectedData.value = {
    value: [],
    batchAction: 1,
  }
  fetchClasses()
  resetAndfetch()
}

getSeries()
  .then(response => {
    schoolYears.value = response.data.data
  })
  .finally(() => {
    schoolYears.value.unshift({ id: null, name: 'Todos os anos' })
    serie.value = schoolYears.value[0]
    schoolYearsLoading.value = false
  })

const classesLoading = ref(true)
const classes = ref([])
const classesPage = ref(1)
const classesTotalpages = ref(1)

const setclasses = value => {
  classe.value = value
  resetAndfetch()
}

const fetchClasses = async (ctx = {}) => {
  classesLoading.value = true

  const { page } = ctx
  classesPage.value = page || 1

  try {
    const { data } = await getClassesV2Label({
      Page: classesPage.value,
      SerieIds: [serie.value.id],
    })

    const options = data.data

    if (classesPage.value === 1) {
      classes.value = [{ name: 'Todas as turmas', id: null }]
      classe.value = classes.value[0]
    }

    classes.value.push(...options)
    classesTotalpages.value = data.totalPages
    classesLoading.value = false
  } catch (error) {
    classes.value = []
  }
}

const massUndoDelete = async () => {
  const data = []
  const batchAction = selectedData.value.batchAction

  if (batchAction === 1) {
    selectedData.value.value.forEach(classe => data.push(classe.id))
  }

  const formData = {
    classId: classe.value.id,
    studentsIds: data,
    serieId: serie.value.id,
    search: params.value.Search,
    batchAction,
  }

  postStudentsExcluded(formData).then(() => {
    vm.$toast({
      component: Toast,
      props: {
        title: 'Exclusão desfeita com sucesso!',
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })

    selectedData.value = {
      value: [],
      batchAction: 1,
    }
    resetAndfetch()
  })
}

const showAlert = computed(() => {
  return (
    selectedData.value.batchAction === 2 ||
    selectedData.value.value.some(item => item.isIntegrator || item.students)
  )
})
</script>

<style lang="scss" scoped></style>