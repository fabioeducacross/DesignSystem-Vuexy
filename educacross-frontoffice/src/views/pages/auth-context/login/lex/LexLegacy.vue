<template>
  <section>
    <IntermediateRedirectLoginDeepLink v-if="users.length < 2" />
    <b-container v-else>
      <b-card class="mt-1" no-body>
        <b-card-body class="d-flex align-items-center justify-between flex-column flex-md-row">
          <h1 class="mb-0">Acessos</h1>
          <b-img :src="logo" width="200" />
        </b-card-body>
      </b-card>
      <b-card-group columns>
        <b-card v-for="(user, index) in users" :key="index" md="4" sm="6" no-body>
          <b-card-body>
            <span class="font-bold">
              {{ userType(user.profile) }}
            </span>
            <p>
              {{ user.institutionName }}
            </p>
          </b-card-body>
          <b-card-footer class="d-flex flex-column flex-md-row">
            <b-button
              variant="primary"
              class="mb-1 mb-md-0 mr-md-1"
              :disabled="loading"
              @click="accessLoginLex(user.profile, user.institutionId, false)"
            >
              Acessar Web
            </b-button>
            <b-button
              variant="outline-primary"
              :disabled="loading"
              @click="accessLoginLex(user.profile, user.institutionId, true)"
            >
              Acessar App
            </b-button>
          </b-card-footer>
        </b-card>
      </b-card-group>
    </b-container>
  </section>
</template>

<script setup>
import { logoutAccount, logoutUser } from '@/auth/utils'
import IntermediateRedirectLoginDeepLink from '@/components/deeplink/IntermediateRedirectLoginDeepLink.vue'
import router from '@/router'
import { postLoginLex, postLoginLexRedirect } from '@/services/auth-context/login/Login.service'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import { ref } from 'vue'

const { accessToken } = router.currentRoute.query
const users = ref([])
const loading = ref(false)
const logo = getWhitelabelConfig('SecondaryLogo')

logoutAccount(false)
logoutUser(false)

/**
 * Redirects the user to the LEX login page and logs them in using the provided access token.
 *
 * @param {string} profile - The user's profile.
 * @param {string} institutionId - The ID of the user's institution.
 * @param {boolean} redirectToApp - Whether to redirect the user to the app after login.
 */
const accessLoginLex = (profile, institutionId, redirectToApp) => {
  const data = {
    profile,
    institutionId,
    redirectToApp,
    accessToken,
  }

  postLoginLexRedirect(data)
    .then(response => {
      window.location.href = response.data.redirectUri
    })
    .catch(() => {
      router.push({
        name: 'ExternalLoginError',
        params: { goTo: 'lex' },
      })
    })
}

postLoginLex(accessToken).then(res => {
  users.value = res.data

  if (users.value.length === 1) {
    const user = users.value[0]
    const { redirectUri, profile, institutionId } = user

    if (redirectUri) {
      window.location.href = redirectUri
    } else {
      accessLoginLex(profile, institutionId, profile === 1)
    }
  }
})

/**
 * Returns the user type based on the provided profile.
 * @param {string} profile - The profile of the user.
 * @returns {string}
 */
const userType = profile => {
  switch (profile) {
    case 1:
      return 'Aluno'
    case 2:
      return 'Professor'
    case 5:
      return 'Coordenador'
    case 4:
      return 'Diretor'
    case 3:
      return 'Responsável'
    default:
      return ''
  }
}
</script>