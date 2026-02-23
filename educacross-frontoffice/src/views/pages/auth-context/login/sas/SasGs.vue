<template>
  <intermediate-redirect-login-deep-link />
</template>

<script setup>
  import IntermediateRedirectLoginDeepLink from '../components/IntermediateRedirectLoginDeepLink.vue'
  import sasService from '@/services/auth-context/login/integration/sasHttp'
  import { useRoute, useRouter } from 'vue-router/composables'

  const route = useRoute()
  const router = useRouter()

  // Migration of "created" lifecycle: run immediately in <script setup>
  const { token } = route.query
  const { opaquetoken } = route.query
  const { guideId } = route.params

  if (token && guideId) {
    sasService
      .loginSasAluno(guideId, token)
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
  } else if (opaquetoken && guideId) {
    sasService
      .loginArcoAluno(guideId, opaquetoken)
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
    router.push({
      name: 'ExternalLoginError',
      query: { goTo: import.meta.env.VITE_APP_LOGIN_ARCO_SAS_PAGE_REDIRECT },
    })
  }
</script>