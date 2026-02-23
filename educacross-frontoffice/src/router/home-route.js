import router from '.'
import adminDashboardRoutes from './admin-routes/dashboard-routes.js'
import readingMether from './page-routes/reading-mether'
import { ACCESS_ROLE_ENUM } from '@/consts/accessRoleEnum.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import AuditorRoutes from '@/router/auditor-routes/index.js'
import networkManagerDashboardRoutes from '@/router/network-manager-routes/dashboard-routes.js'
import teacherDashboardRoutes from '@/router/professor-routes/dashboard-routes.js'
import store from '@/store'
// Replace eager imports with lazy-loaded components
const Home = () => import('@/views/Home.vue')
const AdminRoot = () => import('@/views/pages/admin-context/AdminRoot.vue')
const NetworkManagerRoot = () => import('@/views/pages/admin-context/NetworkManagerRoot.vue')
const AuditorRoot = () => import('@/views/pages/auditor-context/AuditorRoot.vue')
const HomeResponsible = () => import('@/views/pages/responsible-context/dashboard/Home.vue')
const TeacherRoot = () => import('@/views/pages/teacher-context/TeacherRoot.vue')

export function getRoleHomeRouteName() {
  const userRole = store.getters.accessRole

  return ACCESS_ROLE_ENUM[userRole.toUpperCase()].home
}

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      rightButton: {
        text: '+ Nova missão',
        click: () => router.push({ name: 'newMissionsTeacher' }),
      },
    },
    beforeEnter: (to, from, next) => {
      const roleHomeRouteName = getRoleHomeRouteName()

      const toRouteName = to.name

      if (toRouteName === roleHomeRouteName) {
        next()
        return
      }

      // Check if any of the matched routes have the name that corresponds to the role's home.
      const matchedHomeRoute = to.matched.some(route => route.name === roleHomeRouteName)

      if (matchedHomeRoute) {
        next()
      } else {
        next({ name: roleHomeRouteName })
      }
    },
  },
  {
    path: '/admin',
    name: 'adminRoot',
    component: AdminRoot,
    children: adminDashboardRoutes,
    meta: {
      resource: PERMISSION.GENERAL.ADMIN,
      action: ACTION.READ,
    },
  },
  {
    path: '/network-manager',
    name: 'networkManagerRoot',
    component: NetworkManagerRoot,
    children: networkManagerDashboardRoutes,
    meta: {
      resource: PERMISSION.GENERAL.NETWORK_MANAGER,
      action: ACTION.READ,
    },
  },
  {
    path: '/teacher',
    name: 'homeTeacher',
    component: TeacherRoot,
    meta: {
      resource: PERMISSION.GENERAL.TEACHER,
      action: ACTION.READ,
    },
    children: [...teacherDashboardRoutes, ...readingMether],
  },
  {
    path: '/auditor',
    name: 'homeAuditor',
    component: AuditorRoot,
    meta: {
      resource: PERMISSION.GENERAL.AUDITOR,
      action: ACTION.READ,
    },
    children: AuditorRoutes,
  },
  {
    path: '/responsible',
    name: 'homeResponsible',
    meta: {
      resource: PERMISSION.GENERAL.STUDENT,
      action: ACTION.READ,
    },
    component: HomeResponsible,
  },
]
