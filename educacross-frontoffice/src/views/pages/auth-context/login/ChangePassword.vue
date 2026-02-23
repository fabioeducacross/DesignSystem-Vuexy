<template>
  <div>
    <AuthLayout>
      <template v-slot:image>
        <b-img src="@/assets/images/pages/login/LogoLogin.svg" class="mx-auto mb-3" />
        <h1 class="text-center color-grayTheme">Redefinir sua senha.</h1>
        <p class="text-center mb-0">Digite sua nova senha nos campos.</p>
      </template>
      <div>
        <div class="mb-2">
          <router-link
            :to="{ name: 'login' }"
            class="text-link-login d-flex align-items-center gap-2"
          >
            <span class="material-symbols-outlined"> arrow_back </span>
            <span class="underline">Voltar</span>
          </router-link>
        </div>
        <section>
          <b-form @submit.prevent="submitNewPassword">
            <ValidationObserver ref="formRef">
              <b-form-group label="Senha*" label-for="password">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="Senha"
                  name="Senha"
                  rules="required|max:30|password"
                >
                  <b-input-group
                    :class="errors.length > 0 ? 'is-invalid' : ''"
                    class="input-group-merge"
                  >
                    <b-form-input
                      v-model="formChangePassword.password"
                      :state="errors.length > 0 ? false : null"
                      :type="showPasswordText ? 'text' : 'password'"
                      name="password"
                      placeholder="Digite uma senha"
                    />
                    <b-input-group-append is-text>
                      <span
                        class="material-symbols-outlined cursor-pointer"
                        style="font-size: 20px"
                        @click="showPassword"
                      >
                        {{ showPasswordText ? 'visibility' : 'visibility_off' }}
                      </span>
                    </b-input-group-append>
                  </b-input-group>
                  <small
                    v-if="errors.length"
                    class="text-danger d-flex align-items-center gap-1 mt-25"
                  >
                    <span class="material-symbols-outlined" style="font-size: 16px">
                      warning
                    </span>
                    {{ errors[0] }}
                  </small>
                </ValidationProvider>
              </b-form-group>
              <b-form-group label="Confirme sua senha*" label-for="passwordCheck">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Confirme sua senha"
                  rules="required|max:30|password|confirmed:@Senha"
                >
                  <b-input-group
                    :class="errors.length > 0 ? 'is-invalid' : ''"
                    class="input-group-merge"
                  >
                    <b-form-input
                      v-model="formChangePassword.passwordCheck"
                      :state="errors.length > 0 ? false : null"
                      :type="showPasswordCheckText ? 'text' : 'password'"
                      name="passwordCheck"
                      placeholder="Confirme sua senha"
                    />
                    <b-input-group-append is-text>
                      <span
                        class="material-symbols-outlined cursor-pointer"
                        style="font-size: 20px"
                        @click="showPasswordCheck"
                      >
                        {{ showPasswordCheckText ? 'visibility' : 'visibility_off' }}
                      </span>
                    </b-input-group-append>
                  </b-input-group>
                  <small
                    v-if="errors.length"
                    class="text-danger d-flex align-items-center gap-1 mt-25"
                  >
                    <span class="material-symbols-outlined" style="font-size: 16px">
                      warning
                    </span>
                    {{ errors[0] }}
                  </small>
                </ValidationProvider>
              </b-form-group>
              <div class="d-flex justify-content-end">
                <b-button
                  id="button-loading-changePassword"
                  ref="loadableButtonChangePassword"
                  block
                  variant="primary"
                  :disabled="loadingButton"
                  @click.prevent="submitNewPassword"
                >
                  Salvar
                  <b-spinner v-show="loadingButton" small variant="light" />
                </b-button>
              </div>
            </ValidationObserver>
          </b-form>
        </section>
      </div>
    </AuthLayout>
  </div>
</template>

<script setup>
import AuthLayout from './AuthLayout.vue'
import { confirmed, max, password, required } from '@/@core/utils/validations/validations'
import { putChangePassword } from '@/services/auth-context/login/Login.service'
import { BButton } from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

// Form reactive state
const formChangePassword = ref({
  password: '',
  passwordCheck: '',
})

const showPasswordText = ref(false)
const showPasswordCheckText = ref(false)
const loadingButton = ref(false)
const formRef = ref(null)
const loadableButtonChangePassword = ref(null)

const route = useRoute()
const router = useRouter()

const accountToken = ref('')

onMounted(() => {
  const { accountToken: token } = route.query
  if (token) {
    accountToken.value = token
  }
})

const submitNewPassword = async () => {
  const valid = await formRef.value.validate()
  if (!valid) return

  loadingButton.value = true

  putChangePassword(formChangePassword.value, accountToken.value)
    .then(() => {
      router.push({ name: 'passwordChangeSuccess' })
    })
    .catch(() => {
      router.push({ name: 'passwordChangeError' })
    })
    .finally(() => {
      loadingButton.value = false
    })
}

const showPassword = () => {
  showPasswordText.value = !showPasswordText.value
}

const showPasswordCheck = () => {
  showPasswordCheckText.value = !showPasswordCheckText.value
}
</script>