<template>
  <div class="w-full bg-white">
    <div
      class="flex items-center justify-center min-vh-100 flex-col py-1 px-2 lg:w-3/4 xl:w-1/2 mx-auto text-center"
    >
      <ErrorLogo />

      <ErrorImage :src="image" alt="O seu acesso à plataforma está limitado" />

      <ErrorTitle title="O seu acesso à plataforma está limitado" />

      <p>
        Professor, no momento você não possui turmas vinculadas ao seu perfil, por isso
        <strong class="text-danger">o seu acesso à plataforma está limitado</strong>. Para
        visualizar todas as funcionalidades, fale com o responsável pelo cadastro da sua Escola.
      </p>

      <div class="w-full">
        <b-row v-if="hasAccount">
          <b-col md="6">
            <div class="mb-1 mb-md-0">
              <b-overlay id="loading-logout" :show="isLogout">
                <b-button
                  :disabled="isDisabled"
                  variant="outline-primary"
                  class="d-flex align-items-center justify-content-center gap-2 w-100"
                  @click="logout"
                >
                  <span class="material-symbols-outlined btn-icon">{{ 'logout' }}</span>
                  <span class="footer-buttons">Sair</span>
                </b-button>
              </b-overlay>
            </div>
          </b-col>
          <b-col md="6">
            <div>
              <b-button
                :disabled="isDisabled"
                variant="primary"
                class="d-flex align-items-center justify-content-center gap-2 w-100"
                @click="goToAccount"
              >
                <span class="material-symbols-outlined btn-icon">{{ 'perm_identity' }}</span>
                <span class="footer-buttons">Ir para a conta</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
        <div v-else class="d-flex align-items-center justify-content-center">
          <b-overlay id="loading-logout" :show="isLogout">
            <b-button
              :disabled="isDisabled"
              class="d-flex align-items-center justify-content-center gap-2 w-100"
              variant="outline-primary"
              @click="logout"
            >
              <span class="material-symbols-outlined btn-icon">{{ 'logout' }}</span>
              <span class="footer-buttons">Sair</span>
            </b-button>
          </b-overlay>
        </div>
      </div>

      <hr class="w-full divider" />

      <ErrorContact />
    </div>
  </div>
</template>

<script setup>
import ErrorContact from './components/ErrorContact.vue'
import ErrorImage from './components/ErrorImage.vue'
import ErrorLogo from './components/ErrorLogo.vue'
import ErrorTitle from './components/ErrorTitle.vue'
import { logoutAccount, logoutUser } from '@/auth/utils'
import store from '@/store/index.js'
import { ref } from 'vue'

const image = new URL('@/assets/images/pages/warning.svg', import.meta.url).href

const isDisabled = ref(false)
const isLogout = ref(false)
const hasAccount = ref(store.state.account.hasAccount)

const goToAccount = () => {
  isDisabled.value = true
  logoutUser()
}

const logout = () => {
  isDisabled.value = true
  isLogout.value = true
  logoutAccount()
}
</script>

<style lang="scss" scoped>
.material-symbols-outlined.btn-icon {
  font-size: 18px;
}
.divider {
  border-color: #b9b9c3;
}
</style>