// axios
import { loginUser, logoutAccount } from '@/auth/utils'
import { ErrorMessageEnum } from '@/consts/errorMessageEnum.js'
import router from '@/router'
import store from '@/store'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import axios from 'axios'
import Vue from 'vue'

let isAlreadyFetchingAccessToken = false
let subscribers = []

const axiosInsAccount = axios.create({
  // You can add your headers here
  // ================================
  baseURL: import.meta.env.VITE_APP_BASE_URL_API,
})

axiosInsAccount.interceptors.request.use(config => {
  const { token } = store.state.account

  config.headers.Authorization = `Bearer ${token}`
  if (config.data instanceof FormData) {
    config.headers.Accept = '*/*'
  }
  return config
})

function onAccessTokenFetched(accessToken) {
  subscribers = subscribers.filter(callback => callback(accessToken))
}

function addSubscriber(callback) {
  subscribers.push(callback)
}

function getToken() {
  return store.state.account.token
}

function getRefreshToken() {
  return store.state.account.refreshToken
}

function refreshTokenAccount() {
  return axiosInsAccount.post(
    '/v2/account/refresh-token',
    {
      RefreshToken: getRefreshToken(),
      Token: getToken(),
    },
    {
      headers: {
        showErrorToast: false,
      },
    },
  )
}

// Add request/response interceptor
axiosInsAccount.interceptors.response.use(
  response => {
    const appVersion = response.headers['frontend-cache-version']
    store.dispatch('verifyAppVersion', appVersion)
    return response
  },
  error => {
    // const { config, response: { status } } = error
    const { config, response } = error
    const originalRequest = config

    // if (status === 401) {

    return new Promise((resolve, reject) => {
      if (response && response.status === 401) {
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true

          refreshTokenAccount()
            .then(async r => {
              await loginUser(r.data.token, r.data.refreshToken).catch(err => {
                const name = err.message
                if (name) {
                  this.$router.push({ name })
                } else {
                  this.$router.push({ name: 'login' })
                }
              })

              onAccessTokenFetched(r.data.token)
            })
            .catch(async error => {
              await logoutAccount()
              reject(error)
            })
            .finally(() => {
              isAlreadyFetchingAccessToken = false
            })
        }

        return addSubscriber(accessToken => {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          resolve(axiosInsAccount(originalRequest))
        })
      }

      if (response && response.status === 400) {
        const { ErrorMessage } = response.data
        const hasAccount = store.getters.accessUserData.HasAccount
        const currentRouteName = router.currentRoute.name

        if (
          ErrorMessage === ErrorMessageEnum.ExpiredUser &&
          currentRouteName !== 'managerAccount' &&
          hasAccount
        ) {
          router.push({ name: 'home' })
        }

        if (config.headers.showErrorToast !== false) {
          Vue.$toast({
            component: Toast,
            props: {
              title: 'Atenção',
              icon: 'AlertTriangleIcon',
              text: ErrorMessage || 'Opa, parece que ocorreu um erro. Contate o suporte.',
              variant: 'danger',
            },
          })
        }
      }

      reject(error)
    })
  },
)

Vue.prototype.$httpAccount = axiosInsAccount

export default axiosInsAccount
