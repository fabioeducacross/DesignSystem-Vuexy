<template>
  <intermediate-redirect-login-deep-link />
</template>

<script setup>
  import IntermediateRedirectLoginDeepLink from '../../auth-context/login/components/IntermediateRedirectLoginDeepLink.vue'
  import { getSimulations } from '@/services/shared/simulations/Simulations.Service'
  import { useRouter } from 'vue-router/composables'
  import { onMounted } from 'vue'

  const router = useRouter()

  onMounted(async () => {
    try {
      const res = await getSimulations()
      const { data } = res

      if (data) {
        const redirect = data.resultAccessUrl

        if (redirect) {
          window.location.href = redirect
        }
      }
    } catch (error) {
      const { ErrorMessage } = error.data
      router.push({
        name: 'ExternalLoginError',
        query: {
          goTo: 'home',
          error: ErrorMessage,
        },
      })
    }
  })
</script>