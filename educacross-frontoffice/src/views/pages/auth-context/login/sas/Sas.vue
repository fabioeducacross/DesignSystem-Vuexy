<template>
  <intermediate-redirect-login-deep-link />
</template>

<script setup>
  import IntermediateRedirectLoginDeepLink from '../components/IntermediateRedirectLoginDeepLink.vue'
  import sasService from '@/services/auth-context/login/integration/sasHttp'
  import { useRoute, useRouter } from 'vue-router/composables'

  const route = useRoute()
  const router = useRouter()

  // created hook logic - run immediately in <script setup>
  const { opaquetoken } = route.query

  if (opaquetoken) {
    sasService
      .loginArcoSas(opaquetoken)
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
            goTo: import.meta.env.VITE_APP_LOGIN_ARCO_SAS_PAGE,
            error: ErrorMessage,
          },
        })
      })
  } else {
    window.location.href = import.meta.env.VITE_APP_LOGIN_ARCO_SAS_PAGE_REDIRECT
  }
</script>