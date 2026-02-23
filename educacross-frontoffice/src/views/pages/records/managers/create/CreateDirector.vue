<template>
  <b-sidebar
    id="add-new-student-sidebar"
    :visible="isVisible"
    sidebar-class="sidebar-lg"
    body-class="d-flex flex-column"
    bg-variant="white"
    width="400px"
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
          <h4 class="mb-0">{{ form.id ? 'Editar Diretor' : 'Novo Diretor' }}</h4>
          <span class="material-symbols-outlined text-body cursor-pointer" @click="hide"
            >close</span
          >
        </div>
        <hr class="flex-1" />
      </div>
    </template>

    <section v-show="!doneCreatingTeacher" class="px-1 pb-1">
      <ValidationObserver ref="refCreateValidation">
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
                placeholder="Digite o e-mail do diretor"
                autocomplete="off"
                required
                max-length="100"
                :state="errors.length ? false : null"
                @input="verifyAccount"
              />
              <small class="text-danger">{{ errors[0] }}</small>
              <InputFeedback v-if="accountExists === false && form.email && form.email.length > 0">
                <b>Esse e-mail não possui cadastro na {{ whitelabelName }}.</b>
                <br />
                <span>O usuário receberá um e-mail de acesso automaticamente.</span>
              </InputFeedback>
              <InputFeedback v-if="accountExists === true && form.email && form.email.length > 0" type="success">
                <b>Este e-mail já está cadastrado.</b>
                <span> O usuário receberá um e-mail de acesso automaticamente.</span>
              </InputFeedback>
            </b-form-group>
          </ValidationProvider>
        </b-form>
      </ValidationObserver>
      <div v-if="form.id && userStatus === EApplicationUserStatus.Pending" class="text-justify">
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
    <!-- AFTER CREATE -->
    <div
      v-if="doneCreatingTeacher"
      class="flex-grow-1 d-flex justify-content-center align-items-center flex-column mx-10"
    >
      <div class="d-flex align-items-center flex-col text-center">
        <b-avatar variant="light-success" rounded="sm" size="68px" class="mb-2">
          <span class="material-symbols-outlined" style="font-size: 48px">check</span>
        </b-avatar>

        <h4 class="mb-4 text-body">Diretor criado com sucesso!</h4>
        <p>
          O acesso foi enviado para o e-mail <b>{{ emailMessage }}</b> com sucesso.
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
        <b-button block variant="outline-primary" @click="resetForm"> Criar outro Diretor</b-button>
      </div>
    </div>

    <template v-slot:footer="{ hide }">
      <div
        v-if="!doneCreatingTeacher"
        class="d-flex align-items-center justify-content-center gap-2 px-2 py-1"
      >
        <b-button variant="outline-danger" :disabled="loading" @click="hide"> Cancelar</b-button>
        <b-button variant="primary" :disabled="loading" @click="submitForm">
          <b-spinner v-show="loading" small />
          {{ form.id ? 'Salvar Alterações' : 'Criar Diretor' }}
        </b-button>
      </div>
    </template>
  </b-sidebar>
</template>

<script setup>
import { EApplicationUserStatus } from '@/consts/EApplicationUserStatus'
import SchoolYearBadge from '@/layouts/components/SchoolYearBadge.vue'
import { getManagerById, postManagers, updateManagers } from '@/services/admin-context/directors/Directors.service'
import { checkAccountByEmail } from '@/services/shared/account/Account.service'
import { newTempPassword } from '@/services/shared/tempPassword/Temp.Service.js'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import { converteMinutos } from '@/utils/utils'
import InputFeedback from '@/views/pages/admin-context/shared/components/form/InputFeedback.vue'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { useRecordsManagers } from '@/views/pages/records/managers/list/overview/useRecordsManagers'
import { required, max } from '@validations'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { getCurrentInstance, nextTick, reactive, ref } from 'vue'

const { resetAndfetch } = useRecordsManagers()

const refEmailField = ref(null)
const refCreateValidation = ref(null)
const isVisible = ref(false)
const loading = ref(false)

const whitelabelName = getWhitelabelConfig('name')
const temporaryPassword = ref(null)
const emailMessage = ref(null)
const timeToExpire = ref(2)
const accountExists = ref(null)
const tooltipText = ref('Copiar')
const doneCreatingDirector = ref(false)
const userStatus = ref(null)
const showTooltipFeedback = ref(false)

const { proxy } = getCurrentInstance()

const form = reactive({
  id: null,
  email: null,
  name: null,
})

const reloadTempPassword = async () => {
  if (!form.id) return

  const res = await newTempPassword(form.id)
  temporaryPassword.value = res.data
}

const copyTempPassword = () => {
  navigator.clipboard.writeText(temporaryPassword.value)
  nextTick(() => {
    showTooltipFeedback.value = true
    setTimeout(() => {
      showTooltipFeedback.value = false
    }, 1500)
  })
}

const resetTooltip = () => {
  if (tooltipText.value !== 'Copiar') {
    tooltipText.value = 'Copiar'
  }
}

const verifyAccount = () => {
  accountExists.value = null
  refEmailField.value.validate().then(response => {
    if (response.valid) {
      checkAccountByEmail({ email: form.email }).then(response => {
        accountExists.value = response.data.haveAccount
      })
    }
  })
}

const updateDirector = async () => {
  loading.value = true
  try {
    await updateManagers(form.id, {
      name: form.name,
      email: form.email,
    })
  } finally {
    loading.value = false
    proxy.$toast({
      component: Toast,
      props: {
        title: `Alterações salvas com sucesso!`,
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })
    closeSidebar()
  }
}

const createDirector = async () => {
  loading.value = true
  try {
    const { data } = await postManagers({
      name: form.name,
      email: form.email,
    })
    temporaryPassword.value = data.temporaryPassword
    timeToExpire.value = data.timeToExpire
    emailMessage.value = form.email
    doneCreatingDirector.value = true
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
    await updateDirector()
  } else {
    await createDirector()
  }
  resetAndfetch()
}

const resetForm = () => {
  form.id = null
  form.email = null
  form.name = null

  doneCreatingDirector.value = false
  loading.value = false
  temporaryPassword.value = null
  emailMessage.value = null
  timeToExpire.value = null
  accountExists.value = null
  userStatus.value = null

  if (refCreateValidation.value) {
    refCreateValidation.value.reset()
  }
}

const closeSidebar = () => {
  isVisible.value = false
  resetForm()
}

/**
 * @param {Number} managerId
 */
const openSidebar = async managerId => {
  form.id = managerId
  isVisible.value = true

  if (managerId) {
    try {
      loading.value = true
      const { data } = await getManagerById(managerId)

      form.name = data.name
      form.email = data.email

      temporaryPassword.value = data.temporaryPassword
      timeToExpire.value = data.timeToExpire
      userStatus.value = data.status

      accountExists.value = null
    } finally {
      loading.value = false
    }
  }
}

// Expose to parent if needed
// defineExpose({ openSidebar })

const doneCreatingTeacher = doneCreatingDirector

</script>