<template>
  <IntermediateRedirectLoginDeepLink />
</template>

<script setup>
import { decodeToken, loginUser, revokeAccount } from '@/auth/utils'
import router from '@/router'
import IntermediateRedirectLoginDeepLink from '@/views/pages/auth-context/login/components/IntermediateRedirectLoginDeepLink.vue'
import { mapGetters } from 'vuex'

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import store from '@/store'

const decodedToken = ref(undefined)
const access = ref({})

const loggedAccess = computed(() => store.getters['loggedAccess'])

const route = useRoute()
const vueRouter = useRouter()

onMounted(async () => {
  try {
    await revokeAccount()
  } catch (error) {
    // Caso de algum erro, não fazer nada e continuar o processo de login
  }

  const { accessToken, refreshToken, redirect, accountToken } = route.query
  const token = accessToken || accountToken

  decodedToken.value = decodeToken(token)

  if (decodedToken.value.Role === 'Student') {
    vueRouter.push({
      name: 'loginDeepLink',
      query: { accessToken: token, refreshToken },
    })
  } else {
    loginUser(token, refreshToken)
      .then(() => {
        if (redirect) {
          window.location.href = redirect
          return
        }
        const { Role } = decodedToken.value

        if (Role === 'Account') {
          router.push({ name: 'managerAccount' })
        } else {
          router.push({ name: 'home' })
        }
      })
      .catch(err => {
        const name = err.message
        if (name) {
          vueRouter.push({ name })
        }
      })
  }
})
</script>