<template>
  <intermediate-redirect-login-deep-link-maple />
</template>

<script setup>
import { setLocale } from '@/libs/i18n/index.js'
import lexService from '@/services/auth-context/login/integration/lexHttp.js'
import IntermediateRedirectLoginDeepLinkMaple from '@/views/pages/auth-context/login/components/IntermediateRedirectLoginDeepLinkMaple.vue'
import { mapGetters } from 'vuex'
import { onMounted, ref } from 'vue'
import store from '@/store'
import { useRoute, useRouter } from 'vue-router/composables'

const errors = ref('')

const route = useRoute()
const router = useRouter()

const { codeVerifier } = mapGetters(['codeVerifier'])
const currentCodeVerifier = codeVerifier.call(store)

onMounted(() => {
  setLocale('en')

  const { code } = route.query

  if (code) {
    const payload = {
      code,
      code_verifier: currentCodeVerifier,
    }

    lexService
      .requestLoginLexMaple(payload)
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
    window.location.href = window.$utilTeacherService.generateLoginLexMapleUri()
  }
})
</script>

<style></style>