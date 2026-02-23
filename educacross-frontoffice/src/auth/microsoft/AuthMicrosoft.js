import { loginUser } from '../utils'
import { msalConfig, loginRequest } from './authConfig'
import callMSGraph from './graph'
import graphConfig from './graphConfig'
import axiosIns from '@/libs/axios'
import router from '@/router'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import * as msal from '@azure/msal-browser'
import { useToast } from 'vue-toastification/composition'

class AuthMicrosoft {
  msalInstance = null

  toast = null

  username = undefined

  constructor() {
    this.msalInstance = new msal.PublicClientApplication(msalConfig)
    this.toast = useToast()

    this.selectAccount()
  }

  signIn({ redirectToApp, redirectOnFail } = {}) {
    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    this.msalInstance.loginPopup(loginRequest).then(res => {
      this.handleResponse(res, { redirectToApp, redirectOnFail })
    })
  }

  signOut() {
    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    const logoutRequest = {
      account: this.msalInstance.getAccountByUsername(this.username),
      postLogoutRedirectUri: msalConfig.auth.redirectUri,
      mainWindowRedirectUri: msalConfig.auth.redirectUri,
    }

    this.msalInstance.logoutPopup(logoutRequest)
  }

  selectAccount() {
    /**
     * See here for more info on account retrieval:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */

    const currentAccounts = this.msalInstance.getAllAccounts()
    if (currentAccounts.length === 0) {
      return
    }

    if (currentAccounts.length > 1) {
      // Add choose account code here
    } else if (currentAccounts.length === 1) {
      this.username = currentAccounts[0].username
    }
  }

  handleResponse(res, { redirectToApp, redirectOnFail } = {}) {
    if (!res) {
      this.selectAccount()
      return
    }

    callMSGraph(graphConfig.graphMeEndpoint, res.accessToken, async res => {
      try {
        const data = {
          id: res.id,
          name: res.displayName,
          email: res.mail,
          redirectToApp,
        }
        const response = await axiosIns.post('v1/account/login/microsoft', data)

        if (!response.status || response.status !== 200) {
          throw new Error(response.data.message)
        }
        const { token, refreshToken } = response.data

        if (redirectToApp) {
          router.push({
            name: 'loginDeepLink',
            query: { accountToken: token, refreshToken },
          })
          return
        }

        loginUser(token, refreshToken).then(() => {
          router.push({ name: 'managerAccount' })
        })
      } catch (err) {
        if (redirectOnFail) {
          this.toast({
            component: Toast,
            props: {
              title: 'Erro',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
              text: 'Erro ao realizar login com a Microsoft.',
            },
          })
        }
      }
    })
  }

  getTokenPopup(request) {
    /**
     * See here for more info on account retrieval:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */
    request.account = this.msalInstance.getAccountByUsername(this.username)

    return this.msalInstance.acquireTokenSilent(request).catch(error => {
      if (error instanceof msal.InteractionRequiredAuthError) {
        // fallback to interaction when silent call fails
        return this.msalInstance.acquireTokenPopup(request).then(tokenResponse => {
          return tokenResponse
        })
      }
    })
  }

  seeProfile() {
    this.getTokenPopup(loginRequest).then(response => {
      callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, () => {})
    })
  }
}

export default AuthMicrosoft
