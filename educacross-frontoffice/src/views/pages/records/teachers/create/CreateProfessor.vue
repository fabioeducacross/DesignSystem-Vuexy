<template>
  <b-sidebar
    id="add-new-teacher-sidebar"
    :visible="isVisible"
    sidebar-class="sidebar-lg"
    bg-variant="white"
    body-class="d-flex flex-column"
    width="400px"
    shadow
    backdrop
    right
    no-close-on-backdrop
    no-close-on-esc
    header-class="px-0 pb-0 pt-1"
    @hidden="closeSidebar"
  >
    <template v-slot:header="{}">
      <div class="flex-1">
        <div class="px-1 flex-1 d-flex align-items-center justify-content-between">
          <h4 class="mb-0">{{ form.id ? 'Editar Professor' : 'Novo Professor' }}</h4>
          <span class="material-symbols-outlined text-body cursor-pointer" @click="closeSidebar"
            >close</span
          >
        </div>
        <hr class="flex-1" />
      </div>
    </template>

    <section v-show="!doneCreatingTeacher" class="px-1 pb-1">
      <ValidationObserver v-show="!doneCreatingTeacher" ref="refCreateValidation">
        <b-form autocomplete="off">
          <ValidationProvider v-slot="{ errors }" name="Nome" rules="required|max:50">
            <b-form-group id="nome-group" label="Nome completo*" label-for="nome">
              <b-form-input
                id="nome"
                v-model="form.name"
                type="text"
                placeholder="Escreva aqui"
                autocomplete="off"
                required
                :state="errors.length ? false : null"
                max-length="50"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors }"
            ref="refEmailField"
            name="E-mail"
            rules="required|email|max:100"
          >
            <b-form-group id="email-group" label="E-mail*" label-for="email">
              <b-form-input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="Digite o e-mail do professor"
                autocomplete="off"
                required
                :disabled="emailFieldDisabled"
                max-length="100"
                :state="errors.length ? false : null"
                @input="verifyAccount"
              />
              <small class="text-danger">{{ errors[0] }}</small>
              <InputFeedback v-if="accountExists === false && form.email.length > 0">
                <b>Esse e-mail não possui cadastro na {{ whitelabelName }}.</b>
                <br />
                <span>O usuário receberá um e-mail de acesso automaticamente.</span>
              </InputFeedback>
              <InputFeedback v-if="accountExists === true && form.email.length > 0" type="success">
                <b>Este e-mail já está cadastrado.</b>
                <span> O usuário receberá um e-mail de acesso automaticamente.</span>
              </InputFeedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" name="turma" rules="required">
            <b-form-group id="turma-group" label="Turmas*" label-for="turmas">
              <ESelect
                ref="refSelectClasses"
                v-model="form.classes"
                :options="classesOptions"
                label="name"
                placeholder="Selecione uma Turma"
                :loading="loadingClasses"
                :disabled="loadingClasses"
                track-by="id"
                multiple
                use-portal-on-modal
                clearable
                searchable
                :state="errors.length ? false : null"
                @change="updateSubjects"
              >
                <template v-slot:no-options> Nenhuma turma encontrada</template>
                <template v-slot:selected-option="{ name, serieName, id }">
                  <span class="d-flex class-badge gap-1">
                    {{ name }}
                    <SchoolYearBadge
                      v-if="serieName"
                      class="select-badge"
                      :text="serieName"
                      :selected="validateClass(id)"
                    />
                  </span>
                </template>
                <template v-slot:option="{ name, serieName, id }">
                  <span class="d-flex gap-1">
                    <span style="margin-top: 1px">{{ name }}</span>
                    <SchoolYearBadge
                      v-if="serieName"
                      :text="serieName"
                      :selected="validateClass(id)"
                    />
                  </span>
                </template>
              </ESelect>

              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </ValidationProvider>

          <div v-if="form.classes.length" class="text-muted">
            <small>Áreas de conhecimento por turma *</small>
            <p>Selecione as áreas de conhecimento que este professor irá lecionar em cada turma</p>
          </div>

          <ValidationProvider
            v-for="cls in form.classes"
            v-slot="{ errors }"
            :key="'class-subject-' + cls.id"
            :name="cls.name"
            rules="required"
          >
            <b-form-group :label-for="'classSubject-' + cls.id">
              <template v-slot:label>
                <div
                  style="width: 4px; height: 4px"
                  class="round bg-primary inline-block align-middle"
                />
                {{ cls.name }}*
              </template>
              <ESelect
                :value="getSubjectsByClassId(cls.id)"
                :options="getAvailableSubjectsBySerieId(getClassSerieId(cls))"
                label="name"
                multiple
                use-portal-on-modal
                clearable
                :state="errors.length ? false : null"
                @input="$set(form.subjectsByClass, cls.id, $event)"
              >
                <template v-slot:noOptions> Nenhuma área de conhecimento encontrada </template>
              </ESelect>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </ValidationProvider>
        </b-form>
      </ValidationObserver>
      <div v-if="form.id && userStatus === EApplicationUserStatus.Pending" class="text-justify">
        <div style="vertical-align: baseline">
          <label for="temp-password">Senha temporária: </label>

          <span v-if="temporaryPassword" class="font-semibold">
            {{ temporaryPassword }}
            <span
              id="temAccessKeyTooltip"
              v-b-tooltip.hover.top="'Copiar'"
              class="material-symbols-outlined cursor-pointer"
              style="font-size: 14px; vertical-align: middle; font-weight: 700"
              @click="copyTempPassword"
            >
              content_copy
            </span>
          </span>
          <b-link v-else class="font-semibold" @click="reloadTempPassword">
            gerar nova senha
            <span
              class="material-symbols-outlined"
              style="font-size: 14px; vertical-align: middle; font-weight: 700"
            >
              sync
            </span>
          </b-link>
        </div>

        <b-tooltip
          custom-class="tooltip-container"
          target="temAccessKeyTooltip"
          :show.sync="showTooltipFeedback"
          placement="top"
          triggers="click"
          variant="success"
        >
          Copiado!
        </b-tooltip>
      </div>
    </section>

    <div
      v-if="doneCreatingTeacher"
      class="flex-grow-1 d-flex justify-content-center align-items-center flex-column mx-10"
    >
      <div class="d-flex align-items-center flex-col text-center">
        <b-avatar variant="light-success" rounded="sm" size="68px" class="mb-2">
          <span class="material-symbols-outlined" style="font-size: 48px">check</span>
        </b-avatar>
        <h4 class="mb-4 text-body">Professor criado com sucesso!</h4>
        <p>
          O acesso foi enviado para o e-mail <b class="text-primary">{{ emailMessage }}</b> com
          sucesso.
        </p>
        <div v-if="temporaryPassword" class="text-center p-2">
          <p>
            Essa é a senha temporária:
            <span class="font-bold text-primary align-middle">{{ temporaryPassword }}</span>

            <span
              id="temAccessKeyTooltip"
              v-b-tooltip="tooltipText"
              class="material-symbols-outlined cursor-pointer align-middle text-primary"
              style="font-size: 14px; font-weight: 700; vertical-align: middle"
              @click="copyTempPassword"
              @mouseout="resetTooltip"
            >
              content_copy
            </span>
          </p>

          <p>
            Instruções para cadastrar a senha definitiva foram encaminhadas ao e-mail cadastrado.
          </p>

          <small class="text-danger">
            Atenção: a senha temporária expira em {{ converteMinutos(timeToExpire) }}, após esse
            período será necessário gerar uma nova senha temporária ou ativar o cadastro criando uma
            senha definitiva.
          </small>
        </div>

        <b-button block variant="primary" @click="closeSidebar">Concluir</b-button>
        <b-button block variant="outline-primary" @click="restoreToCreateProfessor">
          Criar outro Professor
        </b-button>
      </div>
    </div>

    <template v-slot:footer="{}">
      <div
        v-if="!doneCreatingTeacher"
        class="d-flex align-items-center justify-content-center gap-2 px-2 py-1"
      >
        <b-button variant="outline-danger" :disabled="loading" @click="closeSidebar">
          Cancelar
        </b-button>
        <b-button variant="primary" :disabled="loading || !formStatus" @click="submitForm">
          <b-spinner v-show="loading" small />
          {{ form.id ? 'Salvar Alterações' : 'Criar Professor' }}
        </b-button>
      </div>
    </template>
  </b-sidebar>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { EApplicationUserStatus } from '@/consts/EApplicationUserStatus'
import SchoolYearBadge from '@/layouts/components/SchoolYearBadge.vue'
import {
  getProfessorById,
  postTeacherV2,
  updateTeacherV2,
} from '@/services/admin-context/professor/Professor.service'
import { checkAccountByEmail } from '@/services/shared/account/Account.service'
import { getClassesV2 } from '@/services/shared/classes/Classes.service'
import { getSeriesWithSubject } from '@/services/shared/serie/Serie.Service'
import { newTempPassword } from '@/services/shared/tempPassword/Temp.Service.js'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import { converteMinutos } from '@/utils/utils'
import InputFeedback from '@/views/pages/admin-context/shared/components/form/InputFeedback.vue'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { useRecordsTeachers } from '@/views/pages/records/teachers/list/overview/useRecordsTeachers'
import { required, max } from '@validations'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { computed, getCurrentInstance, nextTick, reactive, ref } from 'vue'

// Constants
const CLASSES_PAGE_SIZE = 99

const { resetAndfetch } = useRecordsTeachers()

const refEmailField = ref(null)
const refCreateValidation = ref(null)
const refSelectClasses = ref(null)
const isVisible = ref(false)
const loading = ref(false)
const loadingClasses = ref(false)
const classesOptions = ref([])
const whitelabelName = getWhitelabelConfig('name')
const temporaryPassword = ref(null)
const emailMessage = ref(null)
const timeToExpire = ref(2)
const accountExists = ref(null)
const tooltipText = ref('Copiar')
const doneCreatingTeacher = ref(false)
const emailFieldDisabled = ref(false)
const userStatus = ref(null)
const showTooltipFeedback = ref(false)
const isInitializingTeacher = ref(false)

const formStatus = computed(() =>
  refCreateValidation.value ? refCreateValidation.value.flags.valid : false,
)
/**
 * @type {import('vue').Ref<[{serieId: number, subjects: Array<{id: number, name: string}>}]>}
 */
const serieIdsWithSubjects = ref([])

const { proxy } = getCurrentInstance()

const form = reactive({
  id: null,
  email: null,
  name: null,
  classes: [],
  subjectsByClass: {},
})

const updateSubjects = () => {
  if (isInitializingTeacher.value) return

  const selectedClassIds = new Set(form.classes.map(cls => cls.id))
  Object.keys(form.subjectsByClass).forEach(classId => {
    const classIdNum = Number(classId)
    if (!selectedClassIds.has(classIdNum)) {
      proxy.$delete(form.subjectsByClass, classId)
    }
  })

  form.classes.forEach(cls => {
    if (!(cls.id in form.subjectsByClass)) {
      proxy.$set(form.subjectsByClass, cls.id, [])
    }
  })
}

const fetchClasses = async () => {
  if (loadingClasses.value) return

  loadingClasses.value = true

  try {
    const params = {
      Page: 1,
      PageSize: CLASSES_PAGE_SIZE,
    }

    const { data } = await getClassesV2(params)
    classesOptions.value = data.data
  } finally {
    loadingClasses.value = false
  }
}

/**
 * Reloads temporary password for the teacher
 * @returns {Promise<void>}
 */
const reloadTempPassword = async () => {
  if (!form.id) return

  try {
    const res = await newTempPassword(form.id)
    temporaryPassword.value = res.data
  } catch (error) {
    proxy.$toast({
      component: Toast,
      props: {
        title: 'Erro ao gerar nova senha temporária',
        icon: 'AlertCircleIcon',
        variant: 'danger',
      },
    })
  }
}
/**
 * Copies temporary password to clipboard and shows feedback
 * @returns {Promise<void>}
 */
const copyTempPassword = async () => {
  try {
    await navigator.clipboard.writeText(temporaryPassword.value)
    await nextTick()
    showTooltipFeedback.value = true
    setTimeout(() => {
      showTooltipFeedback.value = false
    }, 1500)
  } catch (error) {
    proxy.$toast({
      component: Toast,
      props: {
        title: 'Erro ao copiar senha',
        icon: 'AlertCircleIcon',
        variant: 'danger',
      },
    })
  }
}

const resetTooltip = () => {
  if (tooltipText.value !== 'Copiar') {
    tooltipText.value = 'Copiar'
  }
}

const verifyAccount = async () => {
  accountExists.value = null
  try {
    const validationResponse = await refEmailField.value.validate()
    if (validationResponse.valid) {
      const response = await checkAccountByEmail({ email: form.email })
      accountExists.value = response.data.haveAccount
    }
  } catch (error) {
    proxy.$toast({
      component: Toast,
      props: {
        title: 'Erro ao verificar e-mail',
        icon: 'AlertCircleIcon',
        variant: 'danger',
      },
    })
  }
}

const validateClass = id => {
  return form.classes.some(cls => cls.id === id)
}

/**
 * Gets subjects for a specific class, with support for initialization mode
 * @param {number} classId
 * @returns {Array}
 */
const getSubjectsByClassId = classId => {
  if (isInitializingTeacher.value) {
    return form.subjectsByClass[classId] || []
  }

  if (!(classId in form.subjectsByClass)) {
    proxy.$set(form.subjectsByClass, classId, [])
  }
  return form.subjectsByClass[classId]
}

const getClassSerieId = classe => {
  if ('serie' in classe) {
    return classe.serie.id
  }
  return classe.serieId
}

const getAvailableSubjectsBySerieId = serieId => {
  if (!serieId) {
    return []
  }

  const serieSubject = serieIdsWithSubjects.value.find(s => s.serieId === serieId)
  if (serieSubject) {
    return serieSubject.subjects
  }

  return []
}

/**
 * Updates an existing teacher
 * @returns {Promise<void>}
 */
const updateProfessor = async () => {
  loading.value = true

  try {
    const classesSubjects = Object.entries(form.subjectsByClass).map(
      ([classId, subjects]) => {
        const sClasse = form.classes.find(c => c.id === +classId)
        const serieSubjects = getAvailableSubjectsBySerieId(getClassSerieId(sClasse))

        let subjectsIds = []
        if (serieSubjects.length !== subjects.length) {
          subjectsIds = subjects.map(s => s.id)
        }

        return {
          id: Number(classId),
          subjectsIds,
        }
      },
    )

    await updateTeacherV2(form.id, {
      name: form.name,
      email: form.email,
      classes: classesSubjects,
    })

    proxy.$toast({
      component: Toast,
      props: {
        title: `Alterações salvas com sucesso!`,
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })
    closeSidebar()
  } catch (error) {
    proxy.$toast({
      component: Toast,
      props: {
        title: 'Erro ao atualizar professor',
        icon: 'AlertCircleIcon',
        variant: 'danger',
      },
    })
  } finally {
    loading.value = false
  }
}

/**
 * Creates a new teacher
 * @returns {Promise<void>}
 */
const createProfessors = async () => {
  loading.value = true

  try {
    const classesSubjects = Object.entries(form.subjectsByClass).map(
      ([classId, subjects]) => ({
        id: Number(classId),
        subjectsIds: subjects.map(s => s.id),
      }),
    )

    const { data } = await postTeacherV2({
      name: form.name,
      email: form.email,
      classes: classesSubjects,
    })

    temporaryPassword.value = data.temporaryPassword
    timeToExpire.value = data.timeToExpire
    emailMessage.value = form.email
    doneCreatingTeacher.value = true
  } catch (error) {
    proxy.$toast({
      component: Toast,
      props: {
        title: 'Erro ao criar professor',
        icon: 'AlertCircleIcon',
        variant: 'danger',
      },
    })
  } finally {
    loading.value = false
  }
}

const submitForm = async () => {
  const valid = await refCreateValidation.value.validate()

  if (!valid) {
    return
  }

  if (form.id) {
    await updateProfessor()
  } else {
    await createProfessors()
  }

  resetAndfetch()
}

const fetchSerieIdsAndSubjects = async () => {
  const { data } = await getSeriesWithSubject()

  serieIdsWithSubjects.value = data
}

/**
 * Resets the form to its initial state
 * @param {boolean} [clearClassOptions=true] - Whether to clear the cached classes options
 * @returns {void}
 */
const resetForm = (clearClassOptions = true) => {
  form.id = null
  form.email = null
  form.name = null
  form.classes = []
  form.subjectsByClass = {}

  doneCreatingTeacher.value = false
  if (clearClassOptions) classesOptions.value = []
  loading.value = false
  loadingClasses.value = false
  temporaryPassword.value = null
  emailMessage.value = null
  timeToExpire.value = null
  accountExists.value = null
  emailFieldDisabled.value = false
  userStatus.value = null
  isInitializingTeacher.value = false

  if (refCreateValidation.value) {
    refCreateValidation.value.reset()
  }
}

const closeSidebar = () => {
  isVisible.value = false
  resetForm(true)
}

/**
 * Restores the form to allow creating another professor after successful creation
 * Keeps cached classes options to avoid refetching
 * @returns {void}
 */
const restoreToCreateProfessor = () => {
  resetForm(false)
  if (refSelectClasses.value) {
    refSelectClasses.value.scrollToTop()
  }
}

/**
 * Opens the create/edit teacher sidebar
 * @param {number} [teacherId] - If provided, loads teacher in edit mode
 * @returns {Promise<void>}
 */
const openSidebar = async teacherId => {
  form.id = teacherId
  isVisible.value = true

  await fetchClasses()
  await fetchSerieIdsAndSubjects()

  if (teacherId) {
    try {
      loading.value = true
      isInitializingTeacher.value = true
      const { data } = await getProfessorById(teacherId)

      form.name = data.name
      form.email = data.email

      data.classes.forEach(cls => {
        let cSubjects = data.classesSubject.filter(clsS => clsS.classId === cls.id)

        if (!cSubjects.length) {
          cSubjects = getAvailableSubjectsBySerieId(cls.serieId)
        } else {
          cSubjects = cSubjects.map(c => ({
            id: c.subjectId,
            name: c.subjectName,
          }))
        }

        proxy.$set(form.subjectsByClass, cls.id, cSubjects.length ? cSubjects : [])
      })

      form.classes = data.classes

      temporaryPassword.value = data.temporaryPassword
      timeToExpire.value = data.timeToExpire

      emailFieldDisabled.value = data.status === EApplicationUserStatus.Active
      userStatus.value = data.status
      accountExists.value = null
    } finally {
      loading.value = false
      await nextTick()
      isInitializingTeacher.value = false
    }
  }
}

</script>

<script>
export default {
  methods: {
    converteMinutos,
  },
}
</script>

<style lang="scss" scoped>
  .status-message {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 12px 16px;
    background: rgba(115, 103, 240, 0.12);
    border-radius: 10px;
    margin-top: 5px;

    .status-message-text {
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: #7367f0;
    }

    .status-message-name {
      font-weight: 700;
      font-size: 12px;
      line-height: 18px;
      color: #7367f0;
    }
  }

  .class-badge {
    display: flex;
    align-items: center;

    .select-badge {
      margin-top: 4px;
      margin-left: 8px !important;
    }
  }
</style>

<style lang="scss" scoped>
  .vs--searchable .vs__dropdown-toggle {
    height: auto !important;
  }
</style>