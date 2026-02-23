<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import {
  getStudentById,
  postStudentV2,
  putStudentV2,
} from '@/services/admin-context/students/Students.service'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { useRecordStudents } from '@/views/pages/records/students/list/useRecordStudents'
import { required, max } from '@validations'
import { cloneDeep } from 'lodash'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { computed, getCurrentInstance, nextTick, reactive, ref } from 'vue'

const { proxy } = getCurrentInstance()

const { resetAndFetch } = useRecordStudents()

const createdStudentId = ref(null)
const extraClassesFromEditing = ref([])
const showPasswordText = ref(false)

const classOptions = ref([])
const extraClassesOptionsApi = ref([])
const classPage = ref(1)
const classTotalPages = ref(1)
const loadingClasses = ref(false)
const loadingExtraClasses = ref(false)
const loadingEditingOrCreating = ref(false)
const loadingStudentInfo = ref(false)
const form = reactive({
  id: null,
  name: null,
  sponsorEmail: null,
  class: null,
  extraClasses: [],
  userName: null,
  password: null,
})
const extraClassesPage = ref(1)
const extraClassesTotalPages = ref(1)

const doneCreatingStudent = ref(false)

const isVisible = ref(false)

const extraClassesOptions = computed(() => {
  return extraClassesOptionsApi.value.map(i => {
    return {
      ...i,
      disabled: form.class && form.class.id === i.id,
      indeterminate: form.class && form.class.id === i.id,
    }
  })
})

/**
 * @param {Number} [studentId]
 */
const openSidebar = async studentId => {
  isVisible.value = true

  // Fetch classes when opening the sidebar
  await fetchClasses({ page: 1 })

  if (studentId) {
    form.id = studentId

    await fetchStudentInfo()
  }
}

const closeSidebar = () => {
  resetForm()
  isVisible.value = false
}

const resetForm = () => {
  form.id = null
  form.name = null
  form.sponsorEmail = null
  form.class = null
  form.extraClasses = []
  form.userName = null
  form.password = null

  createdStudentId.value = null
  extraClassesFromEditing.value = []
  doneCreatingStudent.value = false

  classOptions.value = []
  classPage.value = 1
  classTotalPages.value = 1

  if (validationObserver.value) {
    validationObserver.value.reset()
  }
}

// Ref for the validation observer
const validationObserver = ref(null)

// Submit function that validates the form and processes the submission
const handleSubmit = async () => {
  const valid = await validationObserver.value.validate()

  if (!valid) return

  loadingEditingOrCreating.value = true

  const formData = new FormData()
  formData.append('Name', form.name)
  if (form.sponsorEmail) {
    formData.append('SponsorEmail', form.sponsorEmail)
  }
  formData.append('ClassId', form.class.id)

  for (let i = 0; i < form.extraClasses.length; i++) {
    formData.append(`ExtraClassesIds[${i}]`, form.extraClasses[i].id)
  }

  try {
    if (form.id) {
      formData.append('UserName', form.userName)
      formData.append('Password', form.password)

      await putStudentV2(form.id, formData)

      proxy.$toast({
        component: Toast,
        props: {
          title: 'Alterações salvas com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
      resetAndFetch()
      isVisible.value = false
      resetForm()
    } else {
      const response = await postStudentV2(formData)
      createdStudentId.value = response.data.applicationUserId
      doneCreatingStudent.value = true
    }
  } finally {
    loadingEditingOrCreating.value = false
  }
}

const fetchExtraClasses = async (ctx = {}) => {
  if (loadingExtraClasses.value) return

  loadingExtraClasses.value = true
  const { search, page } = ctx

  extraClassesPage.value = page || 1

  try {
    const { data } = await getClassesV2Label({
      page: extraClassesPage.value,
      search,
      pageSize: 10,
    })

    extraClassesTotalPages.value = data.totalPages

    if (extraClassesPage.value === 1) {
      extraClassesOptionsApi.value = []
    }

    extraClassesOptionsApi.value.push(...data.data)
  } finally {
    loadingExtraClasses.value = false
  }
}

const fetchClasses = async (ctx = {}) => {
  if (loadingClasses.value) return

  loadingClasses.value = true
  const { search, page } = ctx

  classPage.value = page || 1

  try {
    const { data } = await getClassesV2Label({
      page: classPage.value,
      search,
      pageSize: 10,
    })

    classTotalPages.value = data.totalPages

    if (classPage.value === 1) {
      classOptions.value = []
    }

    classOptions.value.push(...data.data)

    if (classPage.value === 1) {
      nextTick().then(() => {
        if (!form.id) {
          form.extraClasses = []
        } else {
          form.extraClasses = cloneDeep(extraClassesFromEditing.value)
          extraClassesFromEditing.value = []
        }
      })
    }
  } finally {
    loadingClasses.value = false
  }
}

const fetchStudentInfo = async () => {
  loadingStudentInfo.value = true

  try {
    const { data } = await getStudentById(form.id)
    form.userName = data.userName
    form.password = data.password
    form.sponsorEmail = data.sponsorEmail
    form.name = data.name
    form.class = data.class
    form.extraClasses = data.extraClasses.map(i => {
      return {
        ...i,
        disabled: form.class && form.class.id === i.id,
        indeterminate: form.class && form.class.id === i.id,
      }
    })

    extraClassesFromEditing.value = cloneDeep(form.extraClasses)
  } finally {
    loadingStudentInfo.value = false
  }
}

// Expose methods to parent component
defineExpose({
  openSidebar,
})
</script>

<template>
  <b-sidebar
    id="add-new-student-sidebar"
    :visible="isVisible"
    sidebar-class="sidebar-lg"
    bg-variant="white"
    shadow
    backdrop
    right
    no-close-on-backdrop
    no-close-on-esc
    header-class="px-0 pb-0 pt-1"
    @hidden="closeSidebar"
  >
    <template v-slot:header="{ hide }">
      <div class="flex-1">
        <div class="px-1 flex-1 d-flex align-items-center justify-content-between">
          <h4 class="mb-0">{{ form.id ? 'Editar Aluno' : 'Novo Aluno' }}</h4>
          <span class="material-symbols-outlined text-body cursor-pointer" @click="hide"
            >close</span
          >
        </div>
        <hr class="flex-1" />
      </div>
    </template>
    <template>
      <section
        v-if="doneCreatingStudent"
        class="d-flex align-items-center justify-content-center flex-col gap-2 h-100 px-5"
      >
        <div
          class="bg-light-success rounded d-flex align-items-center justify-content-center"
          style="width: 68px; height: 68px"
        >
          <span class="material-symbols-outlined text-success" style="font-size: 48px">check</span>
        </div>
        <h4 class="text-body">Aluno criado com sucesso</h4>
        <b-button
          variant="primary"
          block
          @click="
            $router.push({
              name: 'accessLetters',
              params: {
                studentsIds: [createdStudentId],
                batchAction: 1,
                pdfTitle: 'Cartas de acesso',
              },
            })
          "
        >
          <span class="material-symbols-outlined align-middle" style="font-size: 20px">print</span>
          <span class="align-middle"> Baixar Carta de Acesso</span>
        </b-button>
        <b-button variant="outline-primary" block @click="resetForm"> Criar outro aluno</b-button>
      </section>
      <section v-else class="px-1 pb-1">
        <ValidationObserver ref="validationObserver">
          <b-form>
            <b-row>
              <!-- Nome Completo* Input -->
              <b-col cols="12">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Nome Completo"
                  rules="required|max:50"
                >
                  <b-form-group label="Nome Completo*" label-for="full-name">
                    <b-form-input
                      id="full-name"
                      v-model="form.name"
                      :state="errors.length ? false : null"
                      placeholder="Nome Completo"
                      minlength="1"
                      maxlength="50"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </ValidationProvider>
              </b-col>

              <!-- UserName -->
              <b-col v-if="form.id" cols="12">
                <ValidationProvider v-slot="{ errors }" name="Nome de usuário" rules="required">
                  <b-form-group label="Nome de usuário*" label-for="student-username">
                    <b-form-input
                      id="student-username"
                      v-model="form.userName"
                      type="text"
                      :state="errors.length ? false : null"
                      placeholder="Nome de usuário do aluno"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </ValidationProvider>
              </b-col>

              <!-- Password -->
              <b-col v-if="form.id" cols="12">
                <ValidationProvider v-slot="{ errors }" name="Senha do aluno" rules="required">
                  <b-form-group label="Senha do aluno*" label-for="student-password">
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid' : ''"
                    >
                      <b-form-input
                        id="student-password"
                        v-model="form.password"
                        :type="showPasswordText ? 'text' : 'password'"
                        :state="errors.length ? false : null"
                        placeholder="Senha do aluno"
                      />
                      <b-input-group-append is-text>
                        <span
                          class="material-symbols-outlined cursor-pointer color-patternFour"
                          style="font-size: 20px"
                          @click="() => (showPasswordText = !showPasswordText)"
                        >
                          {{ showPasswordText ? 'visibility' : 'visibility_off' }}
                        </span>
                      </b-input-group-append>
                    </b-input-group>

                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </ValidationProvider>
              </b-col>

              <!-- Turma Regular* Selector -->
              <b-col cols="12">
                <ValidationProvider v-slot="{ errors }" name="Turma Regular" rules="required">
                  <b-form-group label="Turma Regular*" label-for="regular-class">
                    <ESelect
                      v-model="form.class"
                      :options="classOptions"
                      label="name"
                      placeholder="Selecione uma Turma"
                      :loading="loadingClasses"
                      :total-pages="classTotalPages"
                      :disabled="loadingClasses"
                      :page="classPage"
                      paginated
                      :state="errors.length ? false : null"
                      @nextPage="fetchClasses"
                    >
                      <template v-slot:selected-option="{ name, serieName }">
                        <div
                          v-if="form.class"
                          class="flex-1 d-flex align-items-center justify-content-between mr-50"
                        >
                          <span>
                            {{ name }}
                          </span>
                          <b-badge v-if="serieName" pill variant="light-primary">
                            {{ serieName }}
                          </b-badge>
                        </div>
                      </template>
                      <template v-slot:option="{ name, serieName, id, indeterminate }">
                        <div class="flex-1 d-flex align-items-center justify-content-between">
                          <span :class="{ 'text-gray': indeterminate }">
                            {{ name }}
                          </span>
                          <b-badge
                            pill
                            :variant="indeterminate ? 'light-secondary' : 'light-primary'"
                            :class="
                              form.class && form.class.id === id ? 'bg-white text-primary' : ''
                            "
                          >
                            {{ serieName }}
                          </b-badge>
                        </div>
                      </template>
                    </ESelect>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </ValidationProvider>
              </b-col>

              <!-- Turma(s) Extra(s) Selector (Optional) -->
              <b-col cols="12">
                <ValidationProvider v-slot="{ errors }" name="Turma(s) Extra(s)">
                  <b-form-group label-for="extra-classes">
                    <template v-slot:label>
                      <div class="d-flex align-items-center justify-content-between">
                        Turma(s) Extra(s) (Opcional)
                        <span
                          v-b-tooltip="
                            'Turmas extras são aquelas em que o aluno participa adicionalmente à sua turma regular.'
                          "
                          class="material-symbols-outlined text-primary font-14 cursor-help"
                          >help</span
                        >
                      </div>
                    </template>
                    <ESelect
                      v-model="form.extraClasses"
                      label="name"
                      placeholder="Selecione uma Turma"
                      :options="extraClassesOptions"
                      :loading="loadingExtraClasses"
                      :total-pages="extraClassesTotalPages"
                      :page="extraClassesPage"
                      :state="errors.length ? false : null"
                      :clearable="true"
                      paginated
                      multiple
                      use-portal-on-modal
                      @nextPage="fetchExtraClasses"
                    >
                      <template v-slot:selected-option="{ name, serieName }">
                        <div>
                          <span>
                            {{ name }}
                          </span>
                          <b-badge v-if="serieName" pill variant="light-primary">
                            {{ serieName }}
                          </b-badge>
                        </div>
                      </template>
                      <template v-slot:option="{ name, serieName, id, indeterminate }">
                        <div class="flex-1 d-flex align-items-center justify-content-between">
                          <span :class="{ 'text-gray': indeterminate }">
                            {{ name }}
                          </span>
                          <b-badge
                            v-if="serieName"
                            pill
                            :variant="indeterminate ? 'light-secondary' : 'light-primary'"
                            :class="
                              form.class && form.class.id === id ? 'bg-white text-primary' : ''
                            "
                          >
                            {{ serieName }}
                          </b-badge>
                        </div>
                      </template>
                    </ESelect>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </ValidationProvider>
              </b-col>

              <!-- E-mail do responsável Input (Optional, with email rule) -->
              <b-col cols="12">
                <ValidationProvider v-slot="{ errors }" name="E-mail do responsável" rules="email">
                  <b-form-group
                    label="E-mail do responsável (Opcional)"
                    label-for="responsible-email"
                  >
                    <b-form-input
                      id="responsible-email"
                      v-model="form.sponsorEmail"
                      type="email"
                      :state="errors.length ? false : null"
                      placeholder="Email do responsável"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </ValidationProvider>
              </b-col>
            </b-row>
          </b-form>
        </ValidationObserver>
      </section>
    </template>
    <template v-slot:footer="{ hide }">
      <hr v-if="!doneCreatingStudent" class="mb-0" />
      <div
        v-if="!doneCreatingStudent"
        class="d-flex align-items-center justify-content-center gap-2 px-2 py-1"
      >
        <b-button variant="outline-danger" :disabled="loadingEditingOrCreating" @click="hide">
          Cancelar
        </b-button>
        <b-button variant="primary" :disabled="loadingEditingOrCreating" @click="handleSubmit">
          <b-spinner v-show="loadingEditingOrCreating" small />
          {{ form.id ? 'Salvar Alterações' : 'Criar Aluno' }}
        </b-button>
      </div>
    </template>
  </b-sidebar>
</template>
