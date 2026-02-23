<template>
  <div>
    <AuthLayout>
      <template v-slot:image>
        <b-img src="@/assets/images/pages/login/LogoLogin.svg" class="mx-auto mb-3" />
        <h1 class="text-center color-grayTheme">Pronto!</h1>
        <p class="text-center mb-0">Nova senha criada com sucesso.</p>
      </template>
      <div class="text-center">
        <span class="material-symbols-outlined text-success mb-1" style="font-size: 80px">
          check_circle
        </span>

        <h1 class="text-success mb-1">Senha alterada com sucesso!</h1>
        <b-button
          variant="primary"
          block
          @click="goToLogin"
        >
          Acessar conta
        </b-button>
      </div>
    </AuthLayout>
  </div>
</template>

<script setup>
import AuthLayout from './AuthLayout.vue'
import { useRouter } from 'vue-router/composables'

const router = useRouter()

const goToLogin = () => {
  router.push({
    name: 'login',
  })
}
</script>