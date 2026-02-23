import { loginUser, logoutUser } from '@/auth/utils'
import router from '@/router'
import store from '@/store'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import axios from 'axios'
import Vue from 'vue'

// Flag to avoid multiple access token refresh requests
let isAlreadyFetchingAccessToken = false
// List of subscribers waiting for a new access token
let subscribers = []

// Event bus for global events
const GlobalEvents = new Vue()

/**
 * Notify all subscribers that a new access token is available.
 *
 * @param {string} accessToken - The new access token.
 */
function onAccessTokenFetched(accessToken) {
  subscribers.reverse().forEach(callback => {
    callback(accessToken)
  })
  subscribers = []
}

/**
 * Add a callback function to the list of subscribers waiting for a new access token.
 *
 * @param {Function} callback - The callback function to add to the list of subscribers.
 */
function addSubscriber(callback) {
  subscribers.push(callback)
}

/**
 * Get the current access token from the store.
 *
 * @returns {string} - The current access token.
 */
function getToken() {
  return store.state.access.token
}

/**
 * Get the current refresh token from the store.
 *
 * @returns {string} - The current refresh token.
 */
function getRefreshToken() {
  return store.state.access.refreshToken
}

/**
 * Request a new access token using the current refresh token.
 *
 * @returns {Promise} - A Promise that resolves with the new access token data.
 */
function refreshTokenAccess(instance) {
  return instance.post(
    'v2/applicationusers/refresh-token',
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

// Axios instance with a custom base URL
const axiosIns = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL_API,
})

// Request interceptor to add Authorization header
axiosIns.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${store.state.access.token}`
  return config
})

// Response interceptor to handle app version and refresh tokens
axiosIns.interceptors.response.use(
  response => {
    store.dispatch('verifyAppVersion', response.headers['frontend-cache-version'])
    return response
  },
  error => {
    const { config, response } = error
    const originalRequest = config

    return new Promise((resolve, reject) => {
      if (response && response.status === 401) {
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true

          refreshTokenAccess(axiosIns)
            .then(async r => {
              await loginUser(r.data.token, r.data.refreshToken, false).catch(err => {
                const name = err.message
                if (name) {
                  this.$router.push({ name })
                } else {
                  this.$router.push({ name: 'login' })
                }
              })

              GlobalEvents.$bus.emit('getNotifications')
              onAccessTokenFetched(r.data.token)
            })
            .catch(error => {
              logoutUser()
              reject(error?.response?.data.ErrorMessage || '')
            })
            .finally(() => {
              isAlreadyFetchingAccessToken = false
            })
        }

        // Retry the request when the new access token is fetched

        return addSubscriber(accessToken => {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          resolve(axiosIns(originalRequest))
        })
      }
      if (response && response.status === 400) {
        const { ErrorMessage } = response.data
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

      if (response && response.status === 403) {
        router.push({ name: 'error-403' })
      }

      reject(error)
    })
  },
)

// Add the axios instance to Vue prototype
Vue.prototype.$http = axiosIns

export default axiosIns
