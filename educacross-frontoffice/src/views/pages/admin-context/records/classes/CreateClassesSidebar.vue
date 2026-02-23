<template>
  <b-sidebar
    :visible="value"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    body-class="d-flex flex-column"
    width="400px"
    shadow
    no-close-on-backdrop
    no-close-on-esc
    backdrop
    no-header
    right
    @hidden="closeSidebar"
  >
    <div v-if="!loading" class="d-flex flex-column flex-grow-1">
      <div
        class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
      >
        <h6 class="mb-0">{{ classId ? 'Editar Turma' : 'Nova turma' }}</h6>

        <span
          class="material-symbols-outlined cursor-pointer"
          style="font-size: 16px"
          @click="closeSidebar"
        >
          close
        </span>
      </div>

      <section
        v-if="showSuccess"
        class="flex-grow-1 d-flex justify-content-center align-items-center flex-column mx-10"
      >
        <b-avatar variant="light-success" rounded="sm" size="68px" class="mb-2">
          <span class="material-symbols-outlined" style="font-size: 48px">check</span>
        </b-avatar>
        <h4 class="mb-4 text-body">Turma criada com sucesso</h4>

        <b-button block variant="primary" @click="closeSidebar"> Concluir</b-button>

        <b-button block variant="outline-primary" @click="resetSidebar">
          Criar outra Turma
        </b-button>
      </section>

      <section v-else class="p-2">
        <validation-observer ref="createValidation">
          <b-form autocomplete="off" @submit.prevent>
            <b-form-group label="Ano escolar*" label-for="schoolYear">
              <validation-provider v-slot="{ errors }" name="Ano escolar" rules="required">
                <ESelect
                  id="schoolYear"
                  v-model="form.serie"
                  label="name"
                  :options="schoolYearsList"
                  :clearable="false"
                  :loading="schoolYearLoading"
                  :disabled="schoolYearLoading"
                  placeholder="Selecione o ano escolar"
                >
                </ESelect>
                <small v-if="errors[0]" class="text-danger">* O ano escolar é obrigatório</small>
              </validation-provider>
            </b-form-group>

            <b-form-group label="Nome da turma*" label-for="class-name-input">
              <validation-provider v-slot="{ errors }" name="nome da turma" rules="required|max:30">
                <b-form-input
                  id="class-name-input"
                  v-model="form.name"
                  type="text"
                  placeholder="Escreva aqui"
                  autocomplete="off"
                  required
                  minlength="1"
                  maxlength="30"
                />
                <small v-if="errors[0]" class="text-danger">* {{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <b-form-group
              v-if="!$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)"
              label="Alunos (Opcional)"
              label-for="students"
            >
              <ESelect
                id="students"
                v-model="form.students"
                label="name"
                :options="studentsList"
                :clearable="true"
                :searchable="true"
                :loading="studentsLoading"
                :disabled="studentsLoading"
                multiple
                placeholder="Selecione o(s) aluno(s)"
                use-portal-on-modal
                search-placeholder="Pesquise o nome do aluno..."
              >
                <template v-slot:option="{ name, serieName, indeterminate }">
                  <span
                    class="d-flex justify-content-between flex-grow-1"
                    :class="{ 'text-gray': indeterminate }"
                  >
                    <span
                      >{{ name }}
                      <b-badge
                        v-if="indeterminate"
                        v-b-tooltip.hover.top="'Alunos regulares não podem ser excluídos da turma.'"
                        pill
                        :variant="'light-secondary'"
                      >
                        Aluno Regular
                      </b-badge></span
                    >
                    <div>
                      <b-badge pill :variant="indeterminate ? 'light-secondary' : 'light-primary'">
                        {{ serieName }}
                      </b-badge>
                    </div>
                  </span>
                </template>
              </ESelect>
            </b-form-group>

            <b-form-group label="Professor (Opcional)" label-for="teachers">
              <ESelect
                id="teachers"
                v-model="form.teachers"
                label="name"
                :options="teachers"
                :clearable="true"
                :loading="teachersLoading"
                :disabled="teachersLoading"
                :page="teachersPage"
                :total-pages="teachersTotalpages"
                paginated
                multiple
                use-portal-on-modal
                placeholder="Selecione o(s) Professor(es)"
                @nextPage="fetchTeachers"
              >
              </ESelect>
            </b-form-group>

            <b-form-group
              v-if="!$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)"
              label="Coordenadores (Opcional)"
              label-for="coordinators"
            >
              <ESelect
                id="coordinators"
                v-model="form.coordinators"
                label="name"
                :options="coordinators"
                :clearable="true"
                :loading="coordinatorsLoading"
                :disabled="coordinatorsLoading"
                :page="coordinatorsPage"
                :total-pages="coordinatorsTotalpages"
                paginated
                multiple
                use-portal-on-modal
                placeholder="Selecione o(s) Coordenador(es)"
                @nextPage="fetchCoordinators"
              >
              </ESelect>
            </b-form-group>
          </b-form>
        </validation-observer>
      </section>
    </div>

    <b-overlay :show.sync="loading" no-wrap class="w-100 h-100"></b-overlay>

    <template v-if="!showSuccess" #footer="{}">
      <div id="footer" class="d-flex align-items-center p-2 gap-2 justify-content-center">
        <b-button variant="outline-danger" @click="closeSidebar"> Cancelar</b-button>
        <b-button variant="primary" :disabled="busy" @click="save">
          <b-spinner v-show="busy" small variant="light" class="mr-50" />
          {{ classId ? 'Salvar alterações' : 'Criar Turma' }}
        </b-button>
      </div>
    </template>
  </b-sidebar>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { getCoordinatorsLabel } from '@/services/admin-context/coordinators/Coordinators.service.js'
import { getSeries } from '@/services/admin-context/series/Series.service'
import { getStudentsLabel } from '@/services/admin-context/students/Students.service.js'
import {
  getEditClassesById,
  postClasses,
  updateClasses,
} from '@/services/shared/classes/Classes.service'
import { getTeachersLabel } from '@/services/shared/teachers/Teachers.Service.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { required, max } from '@core/utils/validations/validations.js'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { ref, getCurrentInstance, watch, computed, nextTick } from 'vue'

const props = defineProps({
  value: {
    type: Boolean,
    required: true,
  },
  classId: {
    type: [Number, null],
    required: false,
  },
  series: {
    type: Array,
    required: false,
  },
})

const emit = defineEmits(['input', 'refresh'])

const vm = getCurrentInstance().proxy

const createValidation = ref(null)
const defaultForm = () => ({
  serie: null,
  name: '',
  students: [],
  coordinators: [],
  teachers: [],
})

const loading = ref(false)

const busy = ref(false)

const form = ref(defaultForm())

const schoolYears = ref([])
const schoolYearsList = computed(() => {
  if (!props.series) {
    return schoolYears.value
  }

  return props.series.filter(item => item.id !== null)
})

const schoolYearLoading = ref(false)

const fetchSeries = async () => {
  schoolYearLoading.value = true
  try {
    const { data } = await getSeries()
    schoolYears.value = [...data.data]
    schoolYearLoading.value = false
  } catch (error) {
    schoolYearLoading.value = false
  }
}

const students = ref([])
const studentsLoading = ref(true)

const studentsList = computed(() => {
  if (props.classId) {
    return students.value.map(item => {
      const isStandard = form.value.students.find(
        student => student.id === item.id && student.standard,
      )
      return {
        ...item,
        disabled: !!isStandard,
        indeterminate: !!isStandard,
        standard: !!isStandard,
      }
    })
  }
  return students.value
})

const fetchStudents = async () => {
  studentsLoading.value = true

  try {
    const { data } = await getStudentsLabel()

    students.value = data

    studentsLoading.value = false
  } catch (error) {
    students.value = []
  }
  nextTick(() => {
    form.value.students = []
  })
}

fetchStudents()

const coordinators = ref([])
const coordinatorsLoading = ref(true)
const coordinatorsPage = ref(1)
const coordinatorsTotalpages = ref(1)

const fetchCoordinators = async (ctx = {}) => {
  coordinatorsLoading.value = true

  const { page } = ctx
  if (page) {
    coordinatorsPage.value = page
  }

  try {
    const { data } = await getCoordinatorsLabel({
      Page: coordinatorsPage.value,
      pageSize: 15,
    })

    const options = data.data

    if (coordinatorsPage.value === 1) {
      coordinators.value = []
      if (!props.classId) {
        nextTick(() => {
          form.value.coordinators = []
        })
      }
    }

    coordinators.value.push(...options)
    coordinatorsTotalpages.value = data.totalPages
    coordinatorsLoading.value = false
  } catch (error) {
    coordinators.value = []
  }
}

const teachers = ref([])
const teachersLoading = ref(true)
const teachersPage = ref(1)
const teachersTotalpages = ref(1)

const fetchTeachers = async (ctx = {}) => {
  teachersLoading.value = true

  const { page } = ctx
  if (page) {
    teachersPage.value = page
  }

  try {
    const { data } = await getTeachersLabel({
      Page: teachersPage.value,
      pageSize: 15,
    })

    const options = data.data

    if (teachersPage.value === 1) {
      teachers.value = []
      if (!props.classId) {
        nextTick(() => {
          form.value.teachers = []
        })
      }
    }

    teachers.value.push(...options)
    teachersTotalpages.value = data.totalPages
    teachersLoading.value = false
  } catch (error) {
    teachers.value = []
  }
}

const resetSidebar = () => {
  form.value = defaultForm()
  if (createValidation.value) createValidation.value.reset()
  showSuccess.value = false
}

const closeSidebar = () => {
  resetSidebar()
  emit('input', false)
}

const showSuccess = ref(false)

const save = async () => {
  createValidation.value.validate().then(async success => {
    if (!success) {
      return
    }
    const params = {
      name: form.value.name,
      teachers: form.value.teachers.map(teacher => teacher.id),
    }
    if (!vm.$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)) {
      params.students = form.value.students.map(student => student.id)
      params.coordinators = form.value.coordinators.map(coordinator => coordinator.id)
    }

    busy.value = true

    try {
      if (props.classId) {
        await updateClasses(props.classId, params)
        emit('input', false)
        vm.$toast({
          component: Toast,
          props: {
            title: 'Alterações salvas com sucesso!',
            icon: 'CheckCircleIcon',
            variant: 'success',
          },
        })
        closeSidebar()
      } else {
        params.serieId = form.value.serie.id
        await postClasses(params)
        showSuccess.value = true
      }
      emit('refresh')
      busy.value = false
    } catch (error) {
      busy.value = false
    }
  })
}

watch(
  () => props.value,
  newValue => {
    if (newValue) {
      if (schoolYearsList.value.length === 0) {
        fetchSeries()
      }
      if (props.classId) {
        loading.value = true
        getEditClassesById(props.classId).then(({ data }) => {
          form.value.serie = schoolYearsList.value.find(
            schoolYear => schoolYear.id === data.serieId,
          )
          loading.value = false
          form.value.name = data.name
          nextTick(() => {
            form.value.coordinators = data.coordinators
            form.value.teachers = data.teachers
            form.value.students = data.students.map(student => {
              const serieName = students.value.find(s => s.id === student.id)?.serieName
              return {
                ...student,
                serieName,
                disabled: student.standard,
                indeterminate: student.standard,
              }
            })
          })
        })
      }
    } else {
      loading.value = false
      form.value = defaultForm()
      nextTick(() => {
        form.value.coordinators = []
        form.value.teachers = []
        form.value.students = []
      })
    }
  },
)

</script>

<style lang="scss" scoped>
  #footer {
    border-top: 1px #d3d3d3 solid;
  }
</style>