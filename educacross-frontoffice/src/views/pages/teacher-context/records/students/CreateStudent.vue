<template>
  <div>
    <steps :steps="steps" :current-step="step" :navigation="false" @go-to-step="goToStep($event)" />
    <card
      v-if="step === 0"
      :params="config"
      :button-right-spinner="secondCardConfig.buttonTwo.spinner"
      :button-right-activate="secondCardConfig.buttonTwo.submitted"
      @button-one-click="goStepBackward()"
      @button-two-click="goToSecondStep()"
    >
      <validation-observer ref="createFirstValidation">
        <b-form class="form-position" autocomplete="off">
          <!-- <label class="image-container" @click="selectImage">
            <img
              v-if="!previewImage"
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

          <b-form-group id="nome-group" label="Nome Completo*" label-for="nome">
            <validation-provider v-slot="{ errors }" name="Nome" rules="required">
              <b-form-input
                id="nome"
                v-model="form.name"
                type="text"
                placeholder="Digite o nome completo"
                autocomplete="off"
                required
                max-length="100"
              />
              <b-form-invalid-feedback id="nome-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </validation-provider>
          </b-form-group>

          <b-form-group id="userName-group" label="Nome de Usuário" label-for="login">
            <b-form-input
              id="userName"
              v-model="form.userName"
              minlength="0"
              maxlength="20"
              type="text"
              placeholder="Preencha com o nome de usuário"
              autocomplete="off"
              required
            />
          </b-form-group>

          <div class="d-flex w-100" style="gap: 8px">
            <b-form-group id="serie-group" label="Ano Escolar*" label-for="serie" class="w-50">
              <validation-provider v-slot="{ errors }" name="Ano Escolar" rules="required">
                <v-select
                  id="serie"
                  v-model="form.serieId"
                  label="text"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="series"
                  :selectable="option => option.value !== -1"
                  :reduce="val => val.value"
                  placeholder="Selecione um Ano Escolar"
                  :clearable="false"
                  class="w-100"
                />
                <b-form-invalid-feedback id="serie-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-form-group>

            <b-form-group id="turma-group" label="Turma*" label-for="turma" class="w-50">
              <validation-provider v-slot="{ errors }" name="Turma" rules="required">
                <v-select
                  id="turma"
                  v-model="form.classMentionId"
                  label="text"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="classMentions"
                  :selectable="option => option.value !== -1"
                  :reduce="val => val.value"
                  placeholder="Selecione a turma"
                  :clearable="false"
                  class="w-100"
                />
                <b-form-invalid-feedback id="turma-feedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
            </b-form-group>
          </div>

          <b-form-group id="institution-group" label="Escola" label-for="institution" class="w-50">
            <b-form-input
              id="institution"
              v-model="form.institution"
              type="text"
              placeholder="Preencha com o nome da escola"
              autocomplete="off"
              required
            />
          </b-form-group>

          <b-form-group id="state-group" label="Estado*" label-for="state" class="w-50">
            <validation-provider v-slot="{ errors }" name="Estado" rules="required">
              <v-select
                id="state"
                v-model="form.state"
                label="text"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="states"
                :selectable="option => option.value !== -1"
                :reduce="val => val.value"
                placeholder="Selecione um estado"
                :clearable="false"
                class="w-100"
              />
              <b-form-invalid-feedback id="state-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </validation-provider>
          </b-form-group>

          <b-form-group
            id="municipality-group"
            label="Município*"
            label-for="municipality"
            class="w-50"
          >
            <validation-provider v-slot="{ errors }" name="Município" rules="required">
              <v-select
                id="municipality"
                v-model="form.municipality"
                label="text"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="municipalities"
                :selectable="option => option.value !== -1"
                :reduce="val => val.value"
                placeholder="Selecione um município"
                :clearable="false"
                class="w-100"
              />
              <b-form-invalid-feedback id="municipality-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </validation-provider>
          </b-form-group>

          <b-form-group
            id="email-group"
            label="Email do Responsável"
            label-for="email"
            class="w-50"
          >
            <validation-provider
              v-slot="{ errors }"
              vid="email"
              name="Email"
              :rules="{ required: form.hasEmail }"
            >
              <b-form-input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="Digite o email do responsável"
                autocomplete="off"
                required
              />
              <b-form-invalid-feedback id="email-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </validation-provider>
          </b-form-group>

          <b-form-group
            id="password-group"
            label="Senha (OPCIONAL)"
            label-for="password"
            class="w-50"
          >
            <validation-provider
              v-slot="{ errors }"
              vid="password"
              name="Password"
              rules="min:4|max:12|notOneLowerCase|notOneUpperCase|notOneDigit|notOneSpecialCharacter"
            >
              <b-form-input
                id="password"
                v-model="form.password"
                type="password"
                placeholder="Digite a senha"
                autocomplete="off"
                required
              />
              <b-form-invalid-feedback id="password-feedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </validation-provider>
          </b-form-group>

          <b-form-group
            id="allowLogin-group"
            label="Esse aluno poderá fazer login?"
            label-for="allowLogin"
          >
            <b-form-checkbox v-model="form.allowLoginBool" switch>SIM</b-form-checkbox>
          </b-form-group>

          <section v-if="showPasswordRulesByType">
            <input-feedback
              v-for="(rule, i) in passwordRulesInfos"
              :key="i"
              :type="setTextType(rule)"
            >
              {{ rule.message }}
            </input-feedback>
          </section>
        </b-form>
      </validation-observer>
    </card>

    <!--step-2-card-->
    <card
      v-if="step === 1"
      :params="secondCardConfig"
      :button-right-activate="validatePasswordRules"
      :button-right-spinner="secondCardConfig.buttonTwo.spinner"
      @button-one-click="goToFirstStep()"
      @button-two-click="createUser()"
    >
      <div>
        <b-form-group id="tags" label="Tags (Opcional)" description="Digite tags para o aluno">
          <b-form-tags
            v-model="form.tagIds"
            add-button-variant="outline-primary"
            add-on-change
            remove-on-delete
            separator=",;| "
            placeholder="inserir tags"
            size="lg"
            tag-variant="primary"
            @input="addTag"
          />
        </b-form-group>

        <b-form-group id="addEmail-group" label="Esse aluno terá um email?" label-for="addEmail">
          <b-form-radio v-model="form.hasEmail" name="some-radios" :value="true">SIM</b-form-radio>
          <b-form-radio v-model="form.hasEmail" name="some-radios" :value="false">NÃO</b-form-radio>
        </b-form-group>

        <section v-if="form.hasEmail === false" class="mb-1">
          <b-alert show variant="warning">
            <div class="alert-body d-flex flex-wrap align-items-center" style="gap: 10px">
              <feather-icon icon="AlertTriangleIcon" class="mr-0" />
              <span
                >Você está criando um aluno sem email, nenhum email de ativação para a conta do
                aluno será enviado</span
              >
            </div>
          </b-alert>
        </section>

        <b-form-group
          id="emailChecker"
          label="Enviar email com login/senha do aluno para o responsável?"
          class="w-50"
        >
          <b-form-checkbox v-model="form.sendCredentialEmailToGuardianBool" switch>
            SIM
          </b-form-checkbox>
        </b-form-group>
        <b-button :to="{ name: 'Students' }" variant="warning"> Voltar </b-button>
      </div>
    </card>
  </div>
</template>

<script setup>
import Card from '../../../admin-context/shared/components/card/Card.vue'
import InputFeedback from '../../../admin-context/shared/components/form/InputFeedback.vue'
import Steps from '../../../admin-context/shared/components/steps/Steps.vue'
import { postStudents } from '@/services/admin-context/students/Students.service.js'
import { checkAccountByEmail } from '@/services/shared/account/Account.service.js'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service.js'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, email, required_if, min_value, max_value } from 'vee-validate/dist/rules'
import VSelect from 'vue-select'
import { ref, reactive, onMounted, nextTick } from 'vue'

const step = ref(0)
const image = ref(null)
const previewImage = ref(null)
const passwordRulesByType = ref('warning')
const applicationUserId = ref('')
const accountExists = ref(null)
const student = ref(new FormData())
const whitelabelName = ref('')
const emailMessage = ref('')
const classes = ref([])
const classesLoading = ref(false)
const form = reactive({
  sponsorEmail: '',
  name: '',
  classesIds: [],
  userName: '',
  serieId: null,
  classMentionId: null,
  institution: '',
  state: null,
  municipality: null,
  email: '',
  password: '',
  allowLoginBool: false,
  tagIds: [],
  hasEmail: true,
  sendCredentialEmailToGuardianBool: false,
})

const rules = { required, email, required_if, min_value, max_value }

const secondCardConfig = reactive({
  title: 'Validar o cadastro do aluno',
  subtitle: 'confira os dados e confirme seu cadastro',
  buttonOne: {
    title: 'Voltar',
  },
  buttonTwo: {
    title: 'Concluir',
    submitted: false,
    spinner: false,
  },
  pass: 1,
})

const steps = [
  {
    title: 'Dados do Aluno',
  },
  {
    title: 'Dados do Responsável',
  },
  {
    title: 'Cadastro Concluído',
  },
]

const config = reactive({
  title: 'Dados do Aluno',
  subtitle: 'Em poucos passos, crie um novo acesso de aluno.',
  buttonOne: {
    title: 'Voltar',
  },
  buttonTwo: {
    title: 'Continuar',
    submitted: false,
    spinner: false,
  },
  pass: 1,
})

const thirdCardConfig = reactive({
  buttonOne: {
    title: '',
  },
  buttonTwo: {
    title: 'Baixar Carta de Acesso',
    icon: 'PrinterIcon',
    submitted: false,
  },
  pass: 2,
})

// Dummy data for select options (replace with actual data fetching if needed)
const series = ref([])
const classMentions = ref([])
const states = ref([])
const municipalities = ref([])

// Password rules info dummy (replace as needed)
const showPasswordRulesByType = ref(false)
const passwordRulesInfos = ref([]) // Should be set as per actual password rule checking

const createFirstValidation = ref(null)

onMounted(() => {
  getWhitelabelInfos()
  // set series, classMentions, states, municipalities as needed, or fetch
})

function getWhitelabelInfos() {
  whitelabelName.value = getWhitelabelConfig('name')
}

function goToStep(val) {
  step.value = val
}

function goStepForward() {
  step.value += 1
}

function goToSecondStep() {
  createFirstValidation.value.validate().then(result => {
    if (result) {
      step.value += 1
    }
  })
}

function goStepBackward() {
  if (step.value === 0) {
    // $router.history.go(-1) not available in <script setup>, use router.push or window.history
    window.history.length > 1 ? window.history.back() : null
  } else {
    step.value--
  }
}

function goToStart() {
  secondCardConfig.buttonTwo.spinner = false
  secondCardConfig.buttonTwo.submitted = false
  step.value = 0
}

function goToList() {
  // must use vue-router composable in <script setup>, see architecture notes; not present in this code so fallback to window.location for now
  // If router instance needed:
  // import { useRouter } from 'vue-router/composables'
  // const router = useRouter()
  // router.push({ name: 'teacherStudents' })
  // Fallback:
  window.location.hash = '#/teacher/students'
}

const fileInput = ref(null)
function selectImage() {
  // fileInput is unused in this template because image handling is commented, but method included for parity with original
  fileInput.value && fileInput.value.click()
}

function previewFiles() {
  const input = fileInput.value
  const file = input && input.files
  if (file && file[0]) {
    const reader = new FileReader()
    reader.onload = e => {
      previewImage.value = e.target.result
      student.value.append('image', file[0])
    }
    reader.readAsDataURL(file[0])
    // If intended to emit 'input', must define emit
    // emit('input', file[0])
  }
}

function download() {
  generateAccessLetters(applicationUserId.value)
}

function generateAccessLetters(id) {
  // router.push, see above note
  window.location.hash = `#/accessLettersTeacher/${id}`
}

function verifyAccount() {
  accountExists.value = null
  // studentEmailValidate ref and logic not present in this migrated code; implement when field is available
}

function createStudent() {
  student.value = new FormData()
  student.value.append('Name', form.name)
  student.value.append('ClassId', form.classesIds)
  student.value.append('SponsorEmail', form.sponsorEmail)

  postStudents(student.value)
    .then(response => {
      applicationUserId.value = response.data.applicationUserId
      goStepForward()
    })
    .catch(() => {
      // eslint-disable-next-line no-console
      console.error('Erro ao criar o aluno')
    })
    .finally(() => {
      secondCardConfig.buttonTwo.submitted = false
      secondCardConfig.buttonTwo.spinner = false
    })
}

function validationForm() {
  // createSecondValidation ref not present in this code; include if needed.
}

function setTextType(rule) {
  // This should set color/type for password rules feedback, implement as needed
  return rule.type || 'info'
}

function addTag() {
  // Tag adding logic placeholder
}

function goToFirstStep() {
  step.value = 0
}

function createUser() {
  createStudent()
}

const validatePasswordRules = true
</script>

<style lang="scss" scoped>
  input[type='file'] {
    display: none !important;
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

  .class-badge {
    display: flex;
    align-items: center;

    .select-badge {
      margin-top: 3px;
      margin-left: 8px !important;
    }
  }
</style>