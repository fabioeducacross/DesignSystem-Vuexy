<template>
  <intermediate-redirect-login-deep-link />
</template>
<script>
  import IntermediateRedirectLoginDeepLink from '../components/IntermediateRedirectLoginDeepLink.vue'
  import plurallService from '@/services/auth-context/login/integration/plurallHttp.js'

  export default {
    name: 'SomosPlayBookRedirect',
    components: {
      IntermediateRedirectLoginDeepLink,
    },
    created() {
      const educationSystemId = this.$route.params.id
      const { bookId } = this.$route.params

      const { code } = this.$route.query
      const { serieId, subjectId } = this.$route.params
      const plurallRedirect = process.env.VUE_APP_PLURALL_LINK

      if (code) {
        plurallService
          .educationSystem(educationSystemId, bookId, code, subjectId, serieId)
          .then(response => {
            const { redirectUri } = response.data
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
      const redirectUri = `${process.env.VUE_APP_PLURALL_REDIRECT}/education-system/${educationSystemId}/books/${bookId}/subject/${subjectId}/serie/${serieId}`

      window.location.href = `${plurallRedirect}/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`
    },
  }
</script>
