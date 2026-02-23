<template>
  <div class="modal-wrapper">
    <header class="header">
      <h3>Editar dados do Aluno</h3>
      <span>Em poucos passos, crie um novo acesso de aluno.</span>
    </header>

    <ValidationObserver ref="updateValidation">
      <b-form class="form-position" autocomplete="off">
        <b-form-group id="nome-group" label="Nome do Aluno*" label-for="nome">
          <ValidationProvider v-slot="{ errors }" name="Nome" rules="required">
            <b-form-input
              id="nome"
              v-model="form.name"
              type="text"
              placeholder="Digite o nome do aluno"
              autocomplete="off"
              required
              max-length="50"
            />
            <small v-if="errors[0]" class="text-danger">Nome inválido</small>
          </ValidationProvider>
        </b-form-group>

        <b-form-group id="class-group" label="Turma*">
          <ValidationProvider v-slot="{ errors }" name="turma" rules="required">
            <ESelect
              v-model="selectedClass"
              label="name"
              track-by="id"
              :options="classes"
              :state="errors[0] ? false : null"
              placeholder="Selecione uma turma"
              :clearable="false"
              class="mb-0"
            >
              <template #noOptions>
                <span>Nenhuma turma encontrada</span>
              </template>
            </ESelect>
            <small v-if="errors[0]" class="text-danger">Turma inválida</small>
          </ValidationProvider>
        </b-form-group>

        <b-form-group id="email-group" label="E-mail do responsável (Opcional)" label-for="email">
          <ValidationProvider
            v-slot="{ errors }"
            ref="studentEmailValidate"
            name="E-mail"
            rules="email"
          >
            <b-form-input
              id="email"
              v-model="form.sponsorEmail"
              type="email"
              placeholder="Digite o e-mail do responsável"
              autocomplete="off"
              max-length="50"
              :disabled="enabledEmail"
              class="mb-1"
              @input="verifyAccount"
            />
            <small v-if="errors[0] && form.sponsorEmail.length > 0" class="text-danger"
              >E-mail inválido</small
            >
            <InputFeedback v-if="accountExists === false && form.sponsorEmail.length > 0">
              <b>Esse e-mail não possui cadastro na {{ whitelabelName }}.</b>
              <br />
              <span>O usuário receberá um e-mail de acesso automaticamente.</span>
            </InputFeedback>
            <InputFeedback
              v-if="accountExists === true && form.sponsorEmail.length > 0"
              type="success"
            >
              <b>Este e-mail já está cadastrado.</b>
              <span>O usuário receberá um e-mail de acesso automaticamente.</span>
            </InputFeedback>
          </ValidationProvider>
        </b-form-group>
      </b-form>
    </ValidationObserver>

    <div class="footer-c">
      <b-button variant="outline-primary" @click="closeModal"> Cancelar</b-button>
      <b-button variant="primary" :disabled="submitted" @click="validationForm">
        <b-spinner v-if="spinner" small />
        Salvar
      </b-button>
    </div>
  </div>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import {
  getStudentById,
  updateStudents,
} from '@/services/admin-context/students/Students.service'
import { checkAccountByEmail } from '@/services/shared/account/Account.service'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import store from '@/store'
import InputFeedback from '@/views/pages/admin-context/shared/components/form/InputFeedback.vue'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { email, required } from '@core/utils/validations/validations.js'
import {
  BForm,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupText,
  BSpinner,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { onMounted, ref, computed, getCurrentInstance } from 'vue'

const props = defineProps({
  studentId: { type: Number, required: false },
  studentProps: { type: Object, required: false },
})

const emit = defineEmits(['close-modal', 'edit-student'])

const form = ref({
  sponsorEmail: '',
  name: '',
  classesIds: null,
})

const student = ref(new FormData())
const classes = ref([])
const accountExists = ref(null)
const submitted = ref(false)
const spinner = ref(false)
const whitelabelName = ref('')
const statusStudent = ref(1)
const enabledEmail = ref(false)
const hasVisiblePassword = ref(false)

const updateValidation = ref(null)
const studentEmailValidate = ref(null)

// Computed para compatibilidade com ESelect (objeto completo)
const selectedClass = computed({
  get() {
    if (!form.value.classesIds) return null
    // Buscar o objeto completo baseado no ID (suporta 'id' e 'classId')
    return (
      classes.value.find(
        c => c.id === form.value.classesIds || c.classId === form.value.classesIds,
      ) || null
    )
  },
  set(value) {
    // ESelect retorna o objeto completo, extrair o ID
    if (!value) {
      form.value.classesIds = null
      return
    }
    // Extrair o ID do objeto (suportar ambas propriedades)
    form.value.classesIds = value.id || value.classId || null
  },
})

const getWhitelabelInfos = () => {
  whitelabelName.value = getWhitelabelConfig('name')
}

const closeModal = () => {
  emit('close-modal', 'edit-student')
}

const validationForm = () => {
  updateValidation.value.validate().then(result => {
    if (result) {
      submitted.value = true
      spinner.value = true
      if (props.studentId) {
        updateStudent()
      } else {
        editStudent()
      }
    }
  })
}

const updateStudent = () => {
  student.value = new FormData()
  student.value.append('Name', form.value.name)
  student.value.append('ClassId', form.value.classesIds)

  if (form.value.sponsorEmail) {
    student.value.append('SponsorEmail', form.value.sponsorEmail)
  }

  updateStudents(props.studentId, student.value)
    .then(() => {
      form.value.name = ''
      form.value.sponsorEmail = ''
      form.value.classesIds = null
      accountExists.value = null

      const { proxy } = getCurrentInstance()
      proxy.$toast({
        component: Toast,
        props: {
          text: 'Aluno atualizado com sucesso',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })

      emit('close-modal', 'edit-student')
    })
    .catch(() => {})
    .finally(() => {
      spinner.value = false
      submitted.value = false
    })
}

const editStudent = () => {
  props.studentProps.name = form.value.name
  if (form.value.sponsorEmail === undefined) {
    props.studentProps.sponsorEmail = ''
  } else {
    props.studentProps.sponsorEmail = form.value.sponsorEmail
  }
  // Buscar por 'id' ou 'classId' para compatibilidade
  props.studentProps.class = classes.value.find(
    c => c.id === form.value.classesIds || c.classId === form.value.classesIds,
  )
  props.studentProps.ClassId = form.value.classesIds
  emit('edit-student', props.studentProps)
  emit('close-modal', 'edit-student')
}

const verifyAccount = () => {
  accountExists.value = null
  studentEmailValidate.value.validate().then(response => {
    if (response.valid && form.value.sponsorEmail.length > 0) {
      submitted.value = false
      checkAccountByEmail({ email: form.value.sponsorEmail })
        .then(response => {
          accountExists.value = response.data.haveAccount
        })
        .catch(() => {
          if (form.value.sponsorEmail !== '') {
            submitted.value = true
          } else {
            submitted.value = false
          }
        })
    }
  })
}

const handleStudentInfo = async () => {
  const { proxy } = getCurrentInstance()

  if (proxy.$can && proxy.$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)) {
    const classesList = store.getters.classes
    // Normalizar: garantir que tenha 'id' e 'classId'
    classes.value = classesList.map(({ Name, ClassId }) => ({
      name: Name,
      id: ClassId,
      classId: ClassId,
    }))
  } else {
    let page = 1
    let totalPages = 1

    while (page <= totalPages) {
      // eslint-disable-next-line no-await-in-loop,no-loop-func
      const res = await getClassesV2Label({ pageSize: 99, page })

      const { data } = res
      // Normalizar: garantir que cada item tenha 'id' e 'classId'
      const normalizedClasses = data.data.map(classe => ({
        ...classe,
        id: classe.id || classe.classId,
        classId: classe.classId || classe.id,
      }))
      classes.value.push(...normalizedClasses)
      totalPages = data.totalPages
      page++
    }
  }

  if (props.studentId) {
    await getStudentById(props.studentId).then(response => {
      form.value.name = response.data.name
      form.value.classesIds = response.data.classId
      form.value.sponsorEmail = response.data.sponsorEmail
      statusStudent.value = response.data.status
      if (statusStudent.value === 1) {
        enabledEmail.value = false
      } else if (statusStudent.value === 2) {
        enabledEmail.value = true
      } else if (statusStudent.value === 3) {
        enabledEmail.value = false
      }
      accountExists.value = null
    })
  } else {
    form.value.name = props.studentProps?.name || ''
    form.value.classesIds = props.studentProps?.class?.id
    form.value.sponsorEmail = props.studentProps?.sponsorEmail || ''
    accountExists.value = null
  }
}

onMounted(() => {
  getWhitelabelInfos()
  handleStudentInfo()
})
</script>

<style lang="scss" scoped>
  .w-full {
    width: 100%;
  }

  input[type='file'] {
    display: none !important;
  }

  .modal-wrapper {
    padding: 30px;
  }

  .form-position {
    display: flex;
    flex-direction: column;
  }

  .image-container {
    width: 116px;
    height: 116px;
    border-radius: 20px;
    border-width: 1px;
    border-style: solid;
    border-color: #d8d6de;

    align-self: center;

    align-items: center;
    justify-content: center;
    display: flex;

    cursor: pointer;
  }

  .image {
    width: 72px;
    height: 66px;
    border-radius: 20px;
  }

  .image-legend {
    color: #7367f0;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;

    align-self: center;

    cursor: pointer;
  }

  .header {
    text-align: center;
    margin-bottom: 1.25rem;

    & h3 {
      margin: 0 auto;
      font-size: 1.3125rem;
      font-weight: 500;
    }

    & span {
      font-size: 0.875rem;
      font-weight: 400;
      white-space: nowrap;
    }
  }

  .footer-c {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.25 0rem;

    & button {
      flex: 1;

      &:first-child {
        margin-right: 0.25rem;
      }

      &:last-child {
        margin-left: 0.25rem;
      }
    }
  }
</style>
