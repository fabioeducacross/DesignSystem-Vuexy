<template>
  <intermediate-redirect-login-deep-link />
</template>

<script setup>
import IntermediateRedirectLoginDeepLink from '../components/IntermediateRedirectLoginDeepLink.vue'
import lexService from '@/services/auth-context/login/integration/lexHttp'
import { mapGetters } from 'vuex'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'

const errors = ref('')

const route = useRoute()
const router = useRouter()

const codeVerifier = mapGetters(['codeVerifier']).codeVerifier(store.state)

onMounted(() => {
  const { code } = route.query

  if (code) {
    const payload = {
      code,
      code_verifier: codeVerifier,
    }

    lexService
      .requestLogin(payload, true)
      .then(res => {
        window.location.href = res.data.redirectUri
      })
      .catch(err => {
        const { ErrorMessage } = err.data
        router.push({
          name: 'ExternalLoginError',
          query: {
            goTo: import.meta.env.VITE_APP_LOGIN_LEX_PAGE,
            error: ErrorMessage,
          },
        })
      })
  } else {
    window.location.href = window.$utilTeacherService.generateLoginLexUri(true)
  }
})
</script>

<style></style>