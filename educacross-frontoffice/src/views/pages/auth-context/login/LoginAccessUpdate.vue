<template>
  <AuthLayout :image="UpdateAccount">
    <template v-slot:image>
      <b-img src="@/assets/images/images-educa/login/UpdateAccount.png" class="mx-auto" />
    </template>
    <div>
      <div>
        <router-link :to="{ name: 'login' }">
          <span class="font-bold underline" @click="clearEmailState()">Voltar</span>
        </router-link>
        <h1>Atualize seu cadastro!</h1>
        <div v-if="formUserData.students.length <= 1" class="mb-1">
          <p>Já existe um cadastro com este e-mail.</p>
          <div>
            <span>Nome de usuário:</span>
            <strong> {{ formUserData.username }} </strong> <br />
            <span>Escola:</span>
            <strong> {{ formUserData.institutionName }} </strong>
            <br />
            <span>Perfil:</span>
            <strong> {{ formUserData.role }} </strong> <br />
          </div>
        </div>
        <div v-else-if="formUserData.students.length > 1" class="mb-1">
          <p>Já existe um cadastro com este e-mail.</p>
          <div>
            <div>
              <div>
                <span>Alunos:</span>
              </div>
              <strong v-for="(student, index) of formUserData.students" :key="index">
                {{ student.Name }} <br />
              </strong>
            </div>
            <div>
              <span class="text-primary" @click="activePromptStudentsList = true"
                >Ver detalhes</span
              >
            </div>
          </div>
        </div>
        <form @submit.prevent="loginJWT()">
          <b-form-group label="E-mail*" label-for="email">
            <b-input-group class="input-group-merge">
              <b-input-group-prepend is-text>
                <feather-icon icon="UserIcon" />
              </b-input-group-prepend>
              <b-form-input
                v-model="formLogin.email"
                name="email"
                type="email"
                label="E-mail*"
                placeholder="Digite seu e-mail"
                @keydown="preventWhiteSpace($event)"
              />
            </b-input-group>
          </b-form-group>

          <b-form-group label="Senha*" label-for="password">
            <b-input-group class="input-group-merge">
              <b-input-group-prepend is-text>
                <feather-icon icon="LockIcon" />
              </b-input-group-prepend>
              <b-form-input
                v-model="formLogin.password"
                :type="showPasswordText ? 'text' : 'password'"
                name="password"
                label="Senha*"
                placeholder="Digite sua senha"
              />
              <b-input-group-append is-text>
                <feather-icon
                  :icon="showPasswordText ? 'EyeIcon' : 'EyeOffIcon'"
                  class="cursor-pointer"
                  @click="showPassword()"
                />
              </b-input-group-append>
            </b-input-group>
          </b-form-group>

          <div class="w-full mt-2">
            <b-button
              id="button-loading-login"
              ref="loadableButtonLogin"
              variant="primary"
              class="w-full"
              :disabled="!validFormLogin || loadingButton"
              @click.prevent="loginJWT()"
            >
              Atualizar cadastro e acessar
              <b-spinner v-show="loadingButton" small variant="light" />
            </b-button>
            <button
              type="submit"
              style="display: none"
              :disabled="!validFormLogin || loadingButton"
            />
          </div>
        </form>
      </div>
    </div>
    <b-modal
      :v-model="activePromptStudentsList"
      hide-footer
      @close="activePromptStudentsList = false"
    >
      <students-list :students="formUserData.students" />
    </b-modal>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from './AuthLayout.vue'
import StudentsList from './modals/StudentsList.vue'
import UpdateAccount from '@/assets/images/images-educa/login/UpdateAccount.png'
import { postLoginUpdateWithToken } from '@/services/auth-context/login/Login.service'
import UtilTeacherService from '@/utils/teacher-utils/utils'
import { BButton } from 'bootstrap-vue'
import store from '@/store'
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router/composables'

// State
const loadingButton = ref(false)
const showPasswordText = ref(false)
const activePromptStudentsList = ref(false)

const formLogin = reactive({
  email: '',
  password: '',
  checkboxRemember: false,
})

const formUserData = reactive({
  username: '',
  institutionName: '',
  role: '',
  students: [],
})

const UpdateAccountVar = UpdateAccount

// Refs for template
const loadableButtonLogin = ref(null)

const router = useRouter()

const validFormLogin = computed(() => {
  return formLogin.email.length > 0 && formLogin.password.length > 0
})

const emailVerified = computed(() => store.state.emailVerify)

const tokenParam = ref('')

onMounted(() => {
  tokenParam.value = store.state.access.token
  if (!tokenParam.value) return
  const decodedToken = UtilTeacherService.decodeToken(tokenParam.value)

  if (decodedToken.Role !== 'Sponsor') {
    formUserData.username = decodedToken.UserName
    formUserData.institutionName = decodedToken.InstitutionName
  } else if (decodedToken.Students.length > 1) {
    decodedToken.Students = JSON.parse(decodedToken.Students)
    formUserData.students = decodedToken.Students
  }

  if (decodedToken.Role === 'Teacher') {
    formUserData.role = 'Professor'
  } else if (decodedToken.Role === 'Coordinator') {
    formUserData.role = 'Coordenador'
  } else if (decodedToken.Role === 'Secretariat') {
    formUserData.role = 'Administrador Escolar'
  } else if (decodedToken.Role === 'Manager') {
    formUserData.role = 'Diretor'
  } else if (decodedToken.Role === 'Sponsor' && decodedToken.Students.length === 1) {
    formUserData.role = 'Aluno'
    formUserData.username = decodedToken.Students[0].UserName
    formUserData.institutionName = decodedToken.Students[0].SchoolName
  }

  if (emailVerified.value) {
    formLogin.email = emailVerified.value
  } else {
    router.push({ name: 'login' })
  }
})

const showPassword = () => {
  showPasswordText.value = !showPasswordText.value
}

const preventWhiteSpace = event => {
  const key = event.keyCode
  if (key === 32) event.preventDefault()
}

const clearEmailState = () => {
  store.state.emailVerify = ''
}

const loginJWT = () => {
  loadingButton.value = true

  postLoginUpdateWithToken(formLogin, store.state.access.token)
    .then(response => {
      UtilTeacherService.setClaimsAccount(
        response.data.token,
        response.data.decodedToken,
        response.data.refreshToken,
      )
      router.push({ name: 'managerAccount' })
      loadingButton.value = false
      store.state.emailVerify = ''
    })
    .catch(error => {
      if (error.status === 403 && error.data.accountId) {
        router.push({ name: 'validateEmailByCode' })
        store.state.accountId = error.data.accountId
        store.commit('totalCodeTimeValidateEmail', 0)
      } else {
        loadingButton.value = false
      }
    })
}
</script>

<style lang="scss" scoped>
  .img-register {
    width: 100%;
    width: -moz-available;
    width: -webkit-fill-available;
  }

  .title-register {
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 34px;
  }

  .text-register {
    font-size: 16px;
    line-height: 21px;
  }

  .subtitle-register {
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
  }

  .text-link-register {
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }

  .logo-register {
    width: 222.63px;
    height: 31px;
  }

  .logo-register-box {
    text-align: center;
    margin-bottom: 5%;
  }

  @media (min-width: 992px) {
    .logo-register-box,
    .logo-register {
      display: none;
    }
  }

  .title-login {
    font-weight: 600;
    font-size: 34px;
    line-height: 32px;
  }

  .text-login {
    font-size: 16px;
    line-height: 21px;
  }

  .accessButton {
    padding: 0.75rem 3rem !important;
  }

  .icon-password-login {
    align-self: center;
    position: relative;
    top: 3.65rem;
    right: 1.75rem;
    cursor: pointer;
    height: fit-content;
  }

  .text-link-login {
    line-height: 2.2;
    text-decoration: underline;
  }

  @media (max-width: 991px) {
    .accessButton {
      width: 100%;
    }
  }

  .image-login {
    display: flex;
  }

  @media (max-width: 767px) {
    .image-card-login {
      display: none;
    }
  }

  .heightControl {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1);
  }
</style>