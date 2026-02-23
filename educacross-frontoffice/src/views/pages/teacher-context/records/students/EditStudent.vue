<template>
  <div class="card p-3">
    <header class="header">
      <h3>Editar dados do Aluno</h3>
      <span>Em poucos passos, crie um novo acesso de aluno.</span>
    </header>

    <validation-observer ref="updateValidation">
      <b-form class="form-position" autocomplete="off">
        <!--  <label class="image-container" @click="selectImage">
          <img v-if="form.avatar && !previewImage" class="image" :src="form.avatar" alt="belinha" />
          <img
            v-else-if="!previewImage"
            class="image"
            src="@/assets/images/profile-corujinhas/belinha.png"
            alt="belinha"
          />
          <img v-else class="image" :src="previewImage" alt="image" />
        </label>
        <p class="image-legend" @click="selectImage">Adicionar Foto</p> -->
        <input
          id="avatar"
          ref="fileInput"
          type="file"
          name="avatar"
          accept=".jpg, .jpeg, .png"
          @change="previewFiles"
        />

        <b-form-group id="nome-group" label="Nome do Aluno*" label-for="nome">
          <validation-provider v-slot="{ errors }" name="Nome" rules="required">
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
          </validation-provider>
        </b-form-group>

        <b-form-group id="class-group" label="Turma*">
          <validation-provider v-slot="{ errors }" name="turma" rules="required">
            <select-infinity-scroll
              v-model="form.classesIds"
              class="style-chooser"
              :reduce="classes => classes.id"
              placeholder="Selecione uma turma"
              :set-selected="i => i.data[0]"
              :api="'v2/classes/label'"
            />
            <small v-if="errors[0]" class="text-danger">Turma inválida</small>
          </validation-provider>
        </b-form-group>

        <b-form-group id="user-name-group" label="Nome do usuário*" label-for="user-name">
          <validation-provider v-slot="{ errors }" name="user-name" rules="required">
            <b-form-input
              id="user-name"
              v-model="form.userName"
              type="text"
              placeholder="Digite o nome de usuário"
              autocomplete="off"
              required
              max-length="50"
            />
            <small v-if="errors[0]" class="text-danger">Nome inválido</small>
          </validation-provider>
        </b-form-group>

        <b-form-group id="password-group" label="Senha*" label-for="password">
          <validation-provider v-slot="{ errors }" name="password" rules="required">
            <b-input-group class="input-group-merge">
              <b-form-input
                id="password"
                v-model="form.password"
                :type="hasVisiblePassword ? 'text' : 'password'"
                name="currentPassword"
                placeholder="Digite sua senha"
                autocomplete="off"
              />
              <b-input-group-append is-text>
                <feather-icon
                  :icon="hasVisiblePassword ? 'EyeIcon' : 'EyeOffIcon'"
                  class="cursor-pointer"
                  @click="hasVisiblePassword = !hasVisiblePassword"
                />
              </b-input-group-append>
            </b-input-group>

            <small v-if="errors[0]" class="text-danger">Senha inválida</small>
          </validation-provider>
        </b-form-group>

        <b-form-group id="email-group" label="E-mail do responsável (Opcional)" label-for="email">
          <validation-provider
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
              @input="verifyAccount"
            />
            <small v-if="errors[0] && form.sponsorEmail && form.sponsorEmail.length > 0" class="text-danger"
              >E-mail inválido</small
            >
            <input-feedback v-if="accountExists === false && form.sponsorEmail && form.sponsorEmail.length > 0">
              <b>Esse e-mail não possui cadastro na {{ whitelabelName }}.</b>
              <br />
              <span>O usuário receberá um e-mail de acesso automaticamente.</span>
            </input-feedback>
            <input-feedback
              v-if="accountExists === true && form.sponsorEmail && form.sponsorEmail.length > 0"
              type="success"
            >
              <b>Este e-mail já está cadastrado.</b>
              <span>O usuário receberá um e-mail de acesso automaticamente.</span>
            </input-feedback>
          </validation-provider>
        </b-form-group>
      </b-form>
    </validation-observer>

    <div class="footer-c">
      <b-button variant="outline-primary" @click="returnPage()"> Cancelar </b-button>
      <b-button variant="primary" :disabled="submitted" @click="validationForm()">
        <b-spinner v-if="spinner" small /> Salvar
      </b-button>
    </div>
  </div>
</template>

<script setup>
import SelectInfinityScroll from '@/components/selects/SelectInfinityScroll.vue'
import {
  getStudentById,
  updateStudents,
} from '@/services/admin-context/students/Students.service'
import { checkAccountByEmail } from '@/services/shared/account/Account.service'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import InputFeedback from '@/views/pages/admin-context/shared/components/form/InputFeedback.vue'
import MultiSelectCheckbox from '@/views/pages/admin-context/shared/components/multi-select/MultiSelectCheckbox.vue'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import SchoolYearBadge from '@components/SchoolYearBadge'
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
import VSelect from 'vue-select'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'

const props = defineProps({
  // studentId: { type: Number, required: false },
  studentProps: { type: Object, required: false },
})

const updateValidation = ref(null)
const fileInput = ref(null)
const studentEmailValidate = ref(null)

// State variables (data)
const form = ref({
  sponsorEmail: null,
  name: null,
  classesIds: [],
  userName: null,
  password: null,
  avatar: null,
})
const previewImage = ref(null)
const accountExists = ref(null)
const submitted = ref(false)
const spinner = ref(false)
const whitelabelName = ref('')
const statusStudent = ref(1)
const enabledEmail = ref(false)
const hasVisiblePassword = ref(false)
const studentId = ref(null)
const classes = ref([])

const router = useRouter()
const route = useRoute()

// Load required and email rules for VeeValidate (registered globally)
required
email

const getWhitelabelInfos = () => {
  whitelabelName.value = getWhitelabelConfig('name')
}

const returnPage = () => {
  router.push({
    name: 'teacherStudents',
  })
}

const validationForm = () => {
  if (!updateValidation.value) {
    return
  }
  updateValidation.value.validate().then(result => {
    if (result) {
      submitted.value = true
      spinner.value = true
      if (studentId.value) {
        updateStudent()
      } else {
        editStudent()
      }
    }
  })
}

const updateStudent = () => {
  const student = new FormData()
  student.append('Name', form.value.name)
  student.append(
    'ClassId',
    form.value.classesIds instanceof Object ? form.value.classesIds.id : form.value.classesIds,
  )
  student.append('userName', form.value.userName)
  student.append('password', form.value.password)
  student.append('image', null)
  // student.append('image', form.value.avatar)

  if (form.value.sponsorEmail) {
    student.append('SponsorEmail', form.value.sponsorEmail)
  }

  updateStudents(studentId.value, student)
    .then(() => {
      form.value.name = null
      form.value.sponsorEmail = null
      form.value.classesIds = []
      form.value.userName = null
      form.value.password = null
      accountExists.value = null
      form.value.avatar = null

      // $toast is likely globally injected, access via window or globalProperties if using Vue 3,
      // for educational migration, Vue 2.7, keep as is:
      window?.$toast?.({
        component: Toast,
        props: {
          text: 'Aluno atualizado com sucesso',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      }) || (typeof this !== 'undefined' && this.$toast && this.$toast({
        component: Toast,
        props: {
          text: 'Aluno atualizado com sucesso',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      }))

      returnPage()
      store.dispatch('fetchClasses')
    })
    .catch(() => {
      submitted.value = false
      spinner.value = false
    })
}

const editStudent = () => {
  if (!props.studentProps) return
  props.studentProps.name = form.value.name
  if (form.value.sponsorEmail === undefined) {
    props.studentProps.sponsorEmail = ''
  } else {
    props.studentProps.sponsorEmail = form.value.sponsorEmail
  }
  props.studentProps.ClassId = form.value.classesIds
  props.studentProps.image = null // form.value.avatar
}

const verifyAccount = () => {
  accountExists.value = null
  if (!studentEmailValidate.value) {
    return
  }
  studentEmailValidate.value.validate().then(response => {
    if (response.valid && form.value.sponsorEmail && form.value.sponsorEmail.length > 0) {
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

const selectImage = () => {
  if (fileInput.value) fileInput.value.click()
}

const previewFiles = () => {
  const input = fileInput.value
  if (!input) return
  const file = input.files
  if (file && file[0]) {
    const reader = new FileReader()
    reader.onload = e => {
      previewImage.value = e.target.result
      form.value.avatar = file[0]
    }
    reader.readAsDataURL(file[0])
  }
}

const handleStudentInfo = async () => {
  if (studentId.value) {
    await getStudentById(studentId.value).then(response => {
      form.value.name = response.data.name
      form.value.classesIds = response.data.class
      form.value.sponsorEmail = response.data.sponsorEmail
      form.value.userName = response.data.userName
      form.value.password = response.data.password
      statusStudent.value = response.data.status
      if (statusStudent.value === 1) {
        enabledEmail.value = false
      } else if (statusStudent.value === 2) {
        enabledEmail.value = true
      } else if (statusStudent.value === 3) {
        enabledEmail.value = false
      }
      accountExists.value = null
      form.value.avatar = response.data.imageUrl
    })
  }
}

onMounted(() => {
  if (route.params && route.params.studentId) {
    studentId.value = route.params.studentId
  }
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

  .card {
    max-width: 455px;
    width: 100%;
    margin: 0 auto;
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