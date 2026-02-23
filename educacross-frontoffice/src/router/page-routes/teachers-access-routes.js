import { ACTION, PERMISSION } from '@/consts/permissions'
import store from '@/store'

export default [
  {
    path: 'teachersAccess',
    name: 'teachersAccess',
    component: () => import('@/views/reports/teachersAccess/TeachersAccessTabs.vue'),
    meta: {
      pageTitle: 'Acessos Professores',
      resource: PERMISSION.MODULE.REPORTS,
      action: ACTION.READ,
      navActiveLink: 'teachersAccess',
      breadcrumb: [
        { text: 'generalReports', active: true },
        { text: 'Acessos Professores', active: true },
      ],
    },
    children: [
      {
        path: 'network',
        name: 'teachersAccessNetwork',
        component: () => import('@/views/reports/teachersAccess/tabs/Network/NetworkIndex.vue'),
        meta: {
          resource: PERMISSION.MODULE.REPORTS,
          action: ACTION.READ,
          navActiveLink: 'teachersAccess',
          breadcrumb: [
            { text: 'generalReports', active: true },
            { text: 'Acessos Professores', active: true },
          ],
        },
        beforeEnter: (to, from, next) => {
          const isNetworkManager = store.getters.accessRole === 'NetworkManager'

          if (isNetworkManager) {
            next()
          } else {
            next({ name: 'teachersAccessSchool' })
          }
        },
      },
      {
        path: 'school',
        name: 'teachersAccessSchool',
        component: () => import('@/views/reports/teachersAccess/tabs/School/SchoolIndex.vue'),
        meta: {
          resource: PERMISSION.MODULE.REPORTS,
          action: ACTION.READ,
          navActiveLink: 'teachersAccessNetwork',
          breadcrumb: [
            { text: 'generalReports', active: true },
            { text: 'Acessos Professores', active: true },
          ],
        },
      },
      {
        path: 'teacher',
        name: 'teachersAccessTeacher',
        component: () => import('@/views/reports/teachersAccess/tabs/Teacher/TeacherIndex.vue'),
        props: true,
        meta: {
          resource: PERMISSION.MODULE.REPORTS,
          action: ACTION.READ,
          navActiveLink: 'teachersAccessNetwork',
          breadcrumb: [
            { text: 'generalReports', active: true },
            { text: 'Acessos Professores', active: true },
          ],
        },
      },
    ],
  },
]
