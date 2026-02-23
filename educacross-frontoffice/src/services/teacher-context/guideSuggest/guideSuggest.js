import { loginUser } from '@/auth/utils'
import axiosIns from '@/libs/axios'
import store from '@/store/index'
import axios from 'axios'

const axiosInstanceSuggest = axios.create({
  baseURL: import.meta.env.VITE_APP_MISSION_SUGGEST_URL,
})

let failedAccountQueue = []

axiosInstanceSuggest.interceptors.request.use(
  async request => {
    const { token } = store.state.access
    if (token) request.headers.key = `Bearer ${token}`

    return request
  },
  error => {
    return Promise.reject(error)
  },
)
const processAccessQueue = (error, token = null) => {
  failedAccountQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedAccountQueue = []
}

axiosInstanceSuggest.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const originalRequest = error.config

    if (error.response.status === 403) {
      const refreshTokenData = {
        token: store.state.access.token,
        refreshToken: store.getters.accessRefreshToken,
      }

      await axiosIns
        .post('v2/applicationusers/refresh-token', refreshTokenData, {
          headers: {
            showErrorToast: false,
          },
        })
        .then(async ({ data }) => {
          await loginUser(data.token, data.refreshToken).catch(err => {
            const name = err.message
            if (name) {
              this.$router.push({ name })
            }
          })

          axiosInstanceSuggest.defaults.headers.common.key = `Bearer ${data.token}`
          originalRequest.headers.key = `Bearer ${data.token}`
          processAccessQueue(null, data.token)
        })
      return axiosInstanceSuggest(originalRequest)
    }
    return Promise.reject(error)
  },
)

class SuggestGuideService {
  async getId() {
    try {
      const response = await axiosInstanceSuggest.post('id/create')
      const { id } = response.data

      store.commit('UPDATE_SUGGEST_GUIDE_ID', id)
      return id
    } catch (error) {
      return {
        error,
      }
    }
  }

  async getRecommendations(
    payload = {
      activities_id: [],
      amount: null,
      discipline: null,
      removed_activities: [],
    },
  ) {
    if (!store.state.teacherContext.suggestGuide.id) {
      await this.getId()
    }

    const removedActivities = store.state.teacherContext.suggestGuide.activitiesRemoved
    store.commit('UPDATE_SUGGEST_GUIDE_STEP', store.state.teacherContext.suggestGuide.step + 1)

    store.commit('UPDATE_SUGGEST_GUIDE_ACTIVITIES_USED_FOR_SUGGESTION', payload.activities_id)

    return new Promise((resolve, reject) => {
      axiosInstanceSuggest
        .get(
          `recommendation/content/recommend?activities_id=${payload.activities_id}&discipline=${payload.discipline}&removed_activities=${removedActivities}&amount=${payload.amount}`,
          payload,
        )
        .then(response => {
          const { recommendations } = response.data
          store.commit('UPDATE_SUGGEST_GUIDE_ACTIVITIES', recommendations)
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  async saveRecommendations(
    payload = {
      accepted_recommendations: [0],
      finalized: true,
    },
  ) {
    payload.id = store.state.teacherContext.suggestGuide.id
    payload.step = store.state.teacherContext.suggestGuide.step
    payload.sent_recommendations = store.state.teacherContext.suggestGuide.recommendations
    payload.rejected_recommendations = store.state.teacherContext.suggestGuide.activitiesRemoved
    payload.activities = store.state.teacherContext.suggestGuide.activitiesUsedForRecommendation

    return new Promise((resolve, reject) => {
      if (!payload.id) {
        resolve()
        return
      }

      axiosInstanceSuggest
        .post(`recommendation/content/save`, payload)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
        .finally(() => {
          this.resetsuggestGuide()
        })
    })
  }

  resetsuggestGuide() {
    store.commit('RESET_SUGGEST_GUIDE')
  }
}

export default new SuggestGuideService()
