<template>
  <div>
    <AuthLayout :show-logo="false">
      <div class="text-center">
        <b-img
          src="@/assets/images/belinha/confusion.svg"
          class="mx-auto mb-3"
          style="width: 140px"
        />
        <h1 class="text-center text-body">
          Parece que sua senha já foi alterada<br />ou esse link expirou.
        </h1>

        <h4 class="text-body mb-1">Tente acessar a sua conta novamente.</h4>
        <b-button
          variant="primary"
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