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
        <h6 class="mb-0">{{ id ? 'Editar Coordenador' : 'Novo Coordenador' }}</h6>

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
        class="flex-grow-1 d-flex justify-content-center align-items-center flex-column mx-10 text-center"
      >
        <b-avatar variant="light-success" rounded="sm" size="68px" class="mb-2">
          <span class="material-symbols-outlined" style="font-size: 48px">check</span>
        </b-avatar>
        <h4 class="mb-4 text-body">Coordenador criado com sucesso</h4>

        <p>
          O acesso foi enviado para o e-mail
          <span class="font-bold text-primary">{{ form.email }}</span> com sucesso.
        </p>
        <div v-if="temporaryPassword">
          <p>
            Essa é a senha temporária:
            <span v-if="temporaryPassword" class="font-bold text-primary">
              {{ temporaryPassword }}
              <span
                id="temAccessKeyTooltipSuccess"
                v-b-tooltip.hover.top="'Copiar'"
                class="material-symbols-outlined cursor-pointer"
                style="font-size: 14px; vertical-align: middle; font-weight: 700"
                @click="copyTempPassword"
              >
                content_copy
              </span>
            </span>
            <b-tooltip
              custom-class="tooltip-container"
              target="temAccessKeyTooltipSuccess"
              :show.sync="showTooltipFeedback"
              placement="top"
              triggers="click"
              variant="success"
            >
              Copiado!
            </b-tooltip>
          </p>
          <p>
            Instruções para cadastrar a senha definitiva foram encaminhador ao e-mail cadastrado.
          </p>
          <p class="text-danger font-12">
            Atenção: a senha temporária expira em {{ converteMinutos(timeToExpire) }}, após esse
            período será necessário gerar uma nova senha temporária ou ativar o cadastro criando uma
            senha definitiva.
          </p>
        </div>

        <b-button block variant="primary" @click="closeSidebar"> Concluir</b-button>

        <b-button block variant="outline-primary" @click="resetSidebar">
          Criar outro Coordenador
        </b-button>
      </section>

      <section v-else class="p-2">
        <ValidationObserver ref="createValidation">
          <b-form autocomplete="off" @submit.prevent>
            <b-form-group label="Nome Completo*" label-for="class-name-input">
              <ValidationProvider v-slot="{ errors }" name="nome completo" rules="required|max:50">
                <b-form-input
                  id="class-name-input"
                  v-model="form.name"
                  type="text"
                  placeholder="Escreva aqui"
                  autocomplete="off"
                  required
                  minlength="1"
                  maxlength="50"
                />
                <small v-if="errors[0]" class="text-danger">* {{ errors[0] }}</small>
              </ValidationProvider>
            </b-form-group>

            <b-form-group label="E-mail*" label-for="class-email-input">
              <ValidationProvider
                v-slot="{ errors }"
                ref="coordinatorsEmailValidate"
                name="e-mail"
                rules="required|email|max:300"
              >
                <b-form-input
                  id="class-email-input"
                  v-model="form.email"
                  type="text"
                  placeholder="Digite o e-mail do coordenador"
                  autocomplete="off"
                  required
                  minlength="1"
                  maxlength="300"
                  @input="verifyAccount"
                />
                <small v-for="(error, index) in errors" :key="index" class="text-danger">
                  {{ error }}
                </small>
                <InputFeedback v-if="accountExists === false && form.email.length > 0">
                  <b>Esse e-mail não possui cadastro na {{ whitelabelName }}.</b>
                  <br />
                  <span>O usuário receberá um e-mail de acesso automaticamente.</span>
                </InputFeedback>
                <InputFeedback
                  v-if="accountExists === true && form.email.length > 0"
                  type="success"
                >
                  <b>Este e-mail já está cadastrado.</b>
                  <span> O usuário receberá um e-mail de acesso automaticamente.</span>
                </InputFeedback>
              </ValidationProvider>
            </b-form-group>

            <b-form-group id="turma-group" label="Turmas*">
              <ValidationProvider v-slot="{ errors }" name="turma" rules="required">
                <ESelect
                  id="classes"
                  v-model="form.classes"
                  label="name"
                  :options="classes"
                  :clearable="true"
                  :loading="classesLoading"
                  :disabled="classesLoading"
                  multiple
                  use-portal-on-modal
                  placeholder="Selecione a(s) Turma(s)"
                >
                  <template v-slot:no-options> Nenhuma turma encontrada</template>
                  <template v-slot:selected-option="{ name, serieName }">
                    <span class="d-flex class-badge">
                      {{ name }}
                      <SchoolYearBadge v-if="serieName" class="select-badge" :text="serieName" />
                    </span>
                  </template>
                  <template v-slot:option="{ name, serieName }">
                    <span class="d-flex">
                      <span style="margin-top: 1px">{{ name }}</span>
                      <SchoolYearBadge v-if="serieName" :text="serieName" />
                    </span>
                  </template>
                </ESelect>
                <small v-if="errors[0]" class="text-danger">Turma inválida</small>
              </ValidationProvider>
            </b-form-group>
          </b-form>
        </ValidationObserver>
        <div v-if="id && status === EApplicationUserStatus.Pending" class="text-justify">
          <div style="vertical-align: baseline">
            <label for="">Senha temporária: </label>

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
    </div>

    <b-overlay :show.sync="loading" no-wrap class="w-100 h-100"></b-overlay>

    <template v-if="!showSuccess" #footer="{}">
      <div id="footer" class="d-flex align-items-center p-2 gap-2 justify-content-center">
        <b-button variant="outline-danger" @click="closeSidebar"> Cancelar</b-button>
        <b-button variant="primary" :disabled="busy" @click="save">
          <b-spinner v-show="busy" small variant="light" class="mr-50" />
          {{ id ? 'Salvar alterações' : 'Criar Coordenador' }}
        </b-button>
      </div>
    </template>
  </b-sidebar>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { EApplicationUserStatus } from '@/consts/EApplicationUserStatus.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import '@/libs/clipboard'
import { getCoordinatorsById, postCoordinators, updateCoordinators } from '@/services/admin-context/coordinators/Coordinators.service'
import { checkAccountByEmail } from '@/services/shared/account/Account.service'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import { newTempPassword } from '@/services/shared/tempPassword/Temp.Service'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import { converteMinutos } from '@/utils/utils'
import InputFeedback from '@/views/pages/admin-context/shared/components/form/InputFeedback.vue'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import SchoolYearBadge from '@components/SchoolYearBadge'
import { required, max, email } from '@core/utils/validations/validations.js'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { ref, getCurrentInstance, watch, computed, nextTick } from 'vue'

const props = defineProps({
  value: {
    type: Boolean,
    required: true,
  },
  id: {
    type: [Number, null],
    required: false,
  },
})

const emit = defineEmits(['input', 'refresh'])

const vm = getCurrentInstance().proxy

const createValidation = ref(null)
const defaultForm = () => ({
  name: '',
  email: '',
  classes: [],
})

const loading = ref(false)
const busy = ref(false)
const form = ref(defaultForm())

const status = ref(null)
const temporaryPassword = ref(null)

const classesLoading = ref(true)
const classes = ref([])

const fetchClasses = async () => {
  let page = 1
  let totalPages = 1

  while (page <= totalPages) {
    // eslint-disable-next-line no-await-in-loop,no-loop-func
    const res = await getClassesV2Label({ pageSize: 99, page })

    const { data } = res
    classes.value.push(...data.data)
    totalPages = data.totalPages
    page++
  }
  classesLoading.value = false
}

const accountExists = ref(null)
const whitelabelName = computed(() => getWhitelabelConfig('name'))
const coordinatorsEmailValidate = ref(null)
const showTooltipFeedback = ref(false)
const timeToExpire = ref('')

const verifyAccount = value => {
  accountExists.value = null
  if (coordinatorsEmailValidate.value) {
    coordinatorsEmailValidate.value.validate().then(response => {
      if (response.valid) {
        checkAccountByEmail({ email: value }).then(response => {
          accountExists.value = response.data.haveAccount
        })
      }
    })
  }
}

const reloadTempPassword = async () => {
  if (props.id) {
    const res = await newTempPassword(props.id)
    temporaryPassword.value = res.data
  }
}

const copyTempPassword = () => {
  vm.$copyText(temporaryPassword.value)
  nextTick(() => {
    showTooltipFeedback.value = true
    setTimeout(() => {
      showTooltipFeedback.value = false
    }, 1500)
  })
}

const resetSidebar = () => {
  form.value = defaultForm()
  status.value = null
  temporaryPassword.value = null

  if (createValidation.value) createValidation.value.reset()
  showSuccess.value = false
}

const closeSidebar = () => {
  resetSidebar()
  emit('input', false)
}

const showSuccess = ref(false)

const save = async () => {
  if (createValidation.value) {
    createValidation.value.validate().then(async success => {
      if (!success) {
        return
      }
      const params = {
        name: form.value.name,
        email: form.value.email,
        classesIds: form.value.classes.map(classe => classe.id),
      }

      busy.value = true

      try {
        if (props.id) {
          await updateCoordinators(props.id, params)
          emit('input', false)
          vm.$toast({
            component: Toast,
            props: {
              title: 'Alteração salva com sucesso',
              icon: 'CheckCircleIcon',
              variant: 'success',
            },
          })
          closeSidebar()
        } else {
          const res = await postCoordinators(params)
          temporaryPassword.value = res.data.temporaryPassword
          timeToExpire.value = res.data.timeToExpire
          showSuccess.value = true
        }
        emit('refresh')
        busy.value = false
      } catch (error) {
        busy.value = false
      }
    })
  }
}

watch(
  () => props.value,
  async newValue => {
    if (newValue) {
      if (classesLoading.value) {
        await fetchClasses()
      }

      if (props.id) {
        loading.value = true
        getCoordinatorsById(props.id).then(({ data }) => {
          form.value.name = data.name
          form.value.email = data.email
          accountExists.value = null

          status.value = data.status
          temporaryPassword.value = data.temporaryPassword

          vm.$nextTick(() => {
            form.value.classes = classes.value.filter(classe =>
              data.classesIds.includes(classe.id),
            )
            loading.value = false
          })
        })
      }
    } else {
      loading.value = false
      form.value = defaultForm()

      status.value = null
      temporaryPassword.value = null

      vm.$nextTick(() => {
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