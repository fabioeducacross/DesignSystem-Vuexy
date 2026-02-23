<template>
  <intermediate-redirect-login-deep-link />
</template>

<script setup>
import IntermediateRedirectLoginDeepLink from '../components/IntermediateRedirectLoginDeepLink.vue'
import cocService from '@/services/auth-context/login/integration/cocHttp.js'
import { useRoute, useRouter } from 'vue-router/composables'

const route = useRoute()
const router = useRouter()

const { code, opaquetoken } = route.query

if (code) {
  cocService
    .requestLogin(code)
    .then(async response => {
      const { redirectUri } = response.data
      window.location.href = redirectUri
    })
    .catch(err => {
      const { ErrorMessage } = err.data
      router.push({
        name: 'ExternalLoginError',
        query: {
          goTo: import.meta.env.VITE_APP_LOGIN_COC_PAGE,
          error: ErrorMessage,
        },
      })
    })
} else if (opaquetoken) {
  cocService
    .requestLoginOpaqueToken(opaquetoken)
    .then(async response => {
      const { redirectUri } = response.data
      window.location.href = redirectUri
    })
    .catch(err => {
      const { ErrorMessage } = err.data
      router.push({
        name: 'ExternalLoginError',
        query: {
          goTo: import.meta.env.VITE_APP_LOGIN_ARCO_COC_PAGE,
          error: ErrorMessage,
        },
      })
    })
} else {
  window.location.href = import.meta.env.VITE_APP_LOGIN_ARCO_COC_PAGE_REDIRECT
}
</script>