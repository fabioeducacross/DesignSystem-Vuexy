import AdminRotes from './admin-routes'
import adminRoutes from './admin-routes/index.js'
import AdminReadingFluencyEvaluation from './admin-routes/reading-fluency-evaluation'
import AuthRoutes from './auth-routes'
import devRoutes from './dev-routes'
import homeRoute from './home-route'
import LayoutFullRoutes from './layoutFull-routes'
import NetworkManagerEducationSystemRoutes from './network-manager-routes/education-system'
import NetworkManagerReadingFluencyEvaluation from './network-manager-routes/reading-fluency-evaluation'
import MissionsPlusRoutes from './page-routes/missions-plus-routes'
import readingExpedition from './page-routes/reading-expedition'
import pagesRoutes from './pagesRoutes'
import ProfessorRoutes from './professor-routes'
import ProfessorReadingFluencyEvaluation from './professor-routes/reading-fluency-evaluation'
import StudentRoutes from './student-routes'
import { isAccountLoggedIn, isUserLoggedIn } from '@/auth/utils'
import { canNavigate } from '@/libs/acl/routeProtection'
import narrativeComplexity from '@/router/page-routes/narrative-complexity.js'
import ReadingFluency from '@/router/page-routes/reading-fluency.js'
import { readingMeterAdminRoutes } from '@/router/page-routes/reading-mether.js'
import WritingPhases from '@/router/page-routes/writing-phases'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import store from '@/store/index.js'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    ...devRoutes,
    ...LayoutFullRoutes,
    ...AdminRotes,
    ...AuthRoutes,
    ...ProfessorRoutes,
    ...StudentRoutes,
    ...adminRoutes,
    ...homeRoute,
    ...pagesRoutes,
    ...readingExpedition,
    ...readingMeterAdminRoutes,
    ...ReadingFluency,
    ...NetworkManagerReadingFluencyEvaluation,
    ...AdminReadingFluencyEvaluation,
    ...ProfessorReadingFluencyEvaluation,
    ...MissionsPlusRoutes,
    ...narrativeComplexity,
    ...NetworkManagerEducationSystemRoutes,
    ...WritingPhases,
  ],
})

const LoginUrl = process.env.VUE_APP_LOGIN_URL

const toLogin = (to, from, next) => {
  if (to.name === 'login') {
    if (LoginUrl) {
      window.location.href = LoginUrl
      return
    }
    next()
    return
  }

  next({ name: 'login' })
}

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth !== false) {
    if (to.name === 'managerAccount') {
      if (!isAccountLoggedIn()) {
        if (isUserLoggedIn()) {
          next({ name: 'home' })
          return
        }
        toLogin(to, from, next)
        return
      }
    } else if (!isUserLoggedIn()) {
      toLogin(to, from, next)
      return
    }
  } else if (to.name === 'login') {
    if (isUserLoggedIn()) {
      next({ name: 'home' })
      return
    }

    if (isAccountLoggedIn()) {
      next({ name: 'managerAccount' })
      return
    }

    toLogin(to, from, next)
    return
  }

  if (to.meta.resource) {
    if (!canNavigate(to)) {
      if (store.getters.accessRole === 'Teacher') {
        next({
          name: 'error-context',
          params: {
            action: to.meta.action,
            resource: to.meta.resource,
            toRoute: to,
            fromRoute: from,
          },
        })
        return
      }
      next({ name: 'error-403' })
      return
    }
  }

  next()
})

export default router
