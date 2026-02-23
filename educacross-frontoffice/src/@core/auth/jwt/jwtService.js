import jwtDefaultConfig from './jwtDefaultConfig'
import { loginUser, logoutUser } from '@/auth/utils'
import router from '@/router'
import store from '@/store'

export default class JwtService {
  // Will be used by this service for making API calls
  axiosIns = null

  // jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // For Refreshing Token
  subscribers = []

  constructor(axiosIns, jwtOverrideConfig) {
    this.axiosIns = axiosIns
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // Request Interceptor
    this.axiosIns.interceptors.request.use(
      config => {
        const accessToken = store.state.access.token

        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`

        return config
      },
      error => Promise.reject(error),
    )

    // Add request/response interceptor
    this.axiosIns.interceptors.response.use(
      response => response,
      error => {
        const { config, response } = error
        const originalRequest = config

        // if (status === 401) {
        if (response && response.status === 401) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true

            this.refreshToken()
              .then(async r => {
                this.isAlreadyFetchingAccessToken = false

                await loginUser(r.data.token, r.data.refreshToken).catch(err => {
                  const name = err.message
                  if (name) {
                    this.$router.push({ name })
                  }
                })

                this.onAccessTokenFetched(r.data.token)
              })
              .catch(() => {
                logoutUser()
                router.push({ name: 'login' })
              })
          }

          const retryOriginalRequest = new Promise(resolve => {
            this.addSubscriber(accessToken => {
              // Make sure to assign accessToken according to your response.
              // Check: https://pixinvent.ticksy.com/ticket/2413870
              // Change Authorization header
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
              resolve(this.axiosIns(originalRequest))
            })
          })
          return retryOriginalRequest
        }
        return Promise.reject(error)
      },
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  static getToken() {
    return store.state.access.token
  }

  static getRefreshToken() {
    return store.state.access.refreshToken
  }

  static getLoggedAccess(id) {
    const loggedAccesses = store.getters.loggedAccess

    if (loggedAccesses.length > 0) {
      return loggedAccesses.find(x => x.UserId === id)
    }
    return null
  }

  refreshToken() {
    return this.axiosIns.post(this.jwtConfig.refreshEndpoint, {
      RefreshToken: this.getRefreshToken(),
      Token: this.getToken(),
    })
  }
}
