<template>
  <intermediate-redirect-login-deep-link />
</template>

<script setup>
import IntermediateRedirectLoginDeepLink from '../components/IntermediateRedirectLoginDeepLink.vue'
import sasService from '@/services/auth-context/login/integration/sasHttp'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  const { token, opaquetoken } = route.query
  const { missionId } = route.params

  if (token && missionId) {
    sasService
      .loginSasProfessorES(missionId, token)
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
            goTo: import.meta.env.VITE_APP_LOGIN_SAS,
            error: ErrorMessage,
          },
        })
      })
  } else if (opaquetoken && missionId) {
    sasService
      .loginArcoProfessorES(missionId, opaquetoken)
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
})
</script>

<style lang="scss" scoped></style>