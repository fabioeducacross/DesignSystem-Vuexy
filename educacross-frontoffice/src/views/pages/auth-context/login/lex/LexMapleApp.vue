<template>
  <intermediate-redirect-login-deep-link-maple />
</template>

<script setup>
import { setLocale } from '@/libs/i18n/index.js'
import lexService from '@/services/auth-context/login/integration/lexHttp'
import IntermediateRedirectLoginDeepLinkMaple from '@/views/pages/auth-context/login/components/IntermediateRedirectLoginDeepLinkMaple.vue'
import { mapGetters } from 'vuex'
import store from '@/store'
import { useRoute, useRouter } from 'vue-router/composables'

const route = useRoute()
const router = useRouter()

setLocale('en')

const { code } = route.query

const { codeVerifier } = mapGetters(['codeVerifier'])(store)

if (code) {
  const payload = {
    code,
    code_verifier: codeVerifier,
  }

  lexService
    .requestLoginLexMaple(payload, true)
    .then(res => {
      window.location.href = res.data.redirectUri
    })
    .catch(err => {
      const { ErrorMessage } = err.data
      router.push({
        name: 'ExternalLoginError',
        query: {
          goTo: import.meta.env.VITE_APP_LOGIN_LEX_MAPLE_PAGE,
          error: ErrorMessage,
        },
      })
    })
} else {
  window.location.href = store.state.utilTeacherService.generateLoginLexMapleUri(true)
}
</script>

<style></style>