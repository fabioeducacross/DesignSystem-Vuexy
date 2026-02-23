<template>
  <intermediate-redirect-login-deep-link />
</template>

<script setup>
import IntermediateRedirectLoginDeepLink from '../components/IntermediateRedirectLoginDeepLink.vue'
import LayersHttpService from '@/services/auth-context/login/integration/layersHttp.js'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  const { code } = route.query

  if (code) {
    LayersHttpService.requestLogin(code)
      .then(async res => {
        const { redirectUri } = res.data
        const url = new URL(redirectUri)
        const uri = `${url.pathname}${url.search}`

        router.push(uri)
      })
      .catch(err => {
        const { ErrorMessage } = err.data
        router.push({
          name: 'ExternalLoginError',
          query: {
            goTo: import.meta.env.VITE_APP_LOGIN_LAYERS_PAGE,
            error: ErrorMessage,
          },
        })
      })
    return
  }

  const { layers_session, layers_user_id, layers_community_id } = route.query

  if (layers_session) {
    const payload = {
      session: layers_session,
      communityId: layers_community_id,
      userId: layers_user_id,
    }

    LayersHttpService.loginWithSessionId(payload)
      .then(async res => {
        const { redirectUri } = res.data
        window.location.href = redirectUri
      })
      .catch(err => {
        const { ErrorMessage } = err.data
        router.push({
          name: 'ExternalLoginError',
          query: {
            goTo: import.meta.env.VITE_APP_LOGIN_LAYERS_PAGE,
            error: ErrorMessage,
          },
        })
      })
    return
  }

  const layersRedirect = import.meta.env.VITE_APP_LAYERS_LINK
  const clientId = import.meta.env.VITE_APP_LAYERS_CLIENT_ID
  const redirectUri = import.meta.env.VITE_APP_LAYERS_REDIRECT

  window.location.href = `${layersRedirect}/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=related.communities email`
})
</script>