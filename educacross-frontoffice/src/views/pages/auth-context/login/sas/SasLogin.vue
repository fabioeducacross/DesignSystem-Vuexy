<template>
  <intermediate-redirect-login-deep-link />
</template>

<script setup>
import IntermediateRedirectLoginDeepLink from '../components/IntermediateRedirectLoginDeepLink.vue'
import sasService from '@/services/auth-context/login/integration/sasHttp'
import { useRoute, useRouter } from 'vue-router/composables'

const route = useRoute()
const router = useRouter()

const token = route.query.token

if (token) {
  sasService
    .loginSas(token)
    .then(res => {
      const { data } = res

      if (data) {
        const redirect = data.redirectUri

        if (redirect) {
          window.location.href = redirect
        }
      }
    })
    .catch(error => {
      const { ErrorMessage } = error.data
      router.push({
        name: 'ExternalLoginError',
        query: {
          goTo: import.meta.env.VITE_APP_LOGIN_SAS_PAGE,
          error: ErrorMessage,
        },
      })
    })
} else {
  window.location.href = import.meta.env.VITE_APP_LOGIN_SAS_PAGE_REDIRECT
}
</script>