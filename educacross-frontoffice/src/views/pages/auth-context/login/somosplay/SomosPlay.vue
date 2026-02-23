<template>
  <intermediate-redirect-login-deep-link />
</template>
<script>
  import IntermediateRedirectLoginDeepLink from '../components/IntermediateRedirectLoginDeepLink.vue'
  import plurallService from '@/services/auth-context/login/integration/plurallHttp.js'

  export default {
    name: 'SomosPlay',
    components: {
      IntermediateRedirectLoginDeepLink,
    },
    created() {
      const { code } = this.$route.query
      const plurallRedirect = process.env.VUE_APP_PLURALL_LINK

      if (code) {
        plurallService
          .requestLogin(code)
          .then(async res => {
            const { redirectUri } = res.data
            window.location.href = redirectUri
          })
          .catch(err => {
            const { ErrorMessage } = err.data
            this.$router.push({
              name: 'ExternalLoginError',
              query: {
                goTo: process.env.VUE_APP_LOGIN_PLURALL_PAGE,
                error: ErrorMessage,
              },
            })
          })
        return
      }

      const clientId = process.env.VUE_APP_PLURALL_CLIENT_ID
      const redirectUri = process.env.VUE_APP_PLURALL_REDIRECT

      window.location.href = `${plurallRedirect}/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`
    },
  }
</script>
