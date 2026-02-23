<template>
  <intermediate-redirect-login-deep-link />
</template>

<script setup>
import IntermediateRedirectLoginDeepLink from '../components/IntermediateRedirectLoginDeepLink.vue'
import plurallService from '@/services/auth-context/login/integration/plurallHttp.js'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  const educationSystemId = route.params.id
  const { bookId } = route.params
  const { code } = route.query
  const { serieId, subjectId } = route.params
  const plurallRedirect = import.meta.env.VITE_APP_PLURALL_LINK

  if (code) {
    plurallService
      .educationSystem(educationSystemId, bookId, code, subjectId, serieId)
      .then(response => {
        const { redirectUri } = response.data
        window.location.href = redirectUri
      })
      .catch(err => {
        const { ErrorMessage } = err.data
        router.push({
          name: 'ExternalLoginError',
          query: {
            goTo: import.meta.env.VITE_APP_LOGIN_PLURALL_PAGE,
            error: ErrorMessage,
          },
        })
      })
    return
  }

  const clientId = import.meta.env.VITE_APP_PLURALL_CLIENT_ID
  const redirectUri = `${
    import.meta.env.VITE_APP_PLURALL_REDIRECT
  }/education-system/${educationSystemId}/books/${bookId}/subject/${subjectId}/serie/${serieId}`

  window.location.href = `${plurallRedirect}/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`
})
</script>