import { ACTION, PERMISSION } from '@/consts/permissions'

export default [
  {
    path: '/student/institution-missions',
    name: 'studentInstitutionMissions',
    component: () => import('@/views/pages/responsible-context/InstitutionMissions.vue'),
    meta: {
      breadcrumb: [
        {
          text: 'Missões da Escola',
          active: true,
        },
      ],
    },
  },

  {
    path: '/student/highfive',
    name: 'studentHighfive',
    component: () => import('@/views/pages/responsible-context/StudentHighfive.vue'),
    meta: {
      breadcrumb: [
        {
          text: 'High Five',
          active: true,
        },
      ],
    },
  },
  {
    path: '/student/family-missions',
    name: 'studentFamilyMissions',
    component: () =>
      import('@/views/pages/responsible-context/student-family-missions/StudentFamilyMissions.vue'),
    meta: {
      resource: PERMISSION.MODULE.SPECIAL_MISSIONS,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Treinos da Família',
          active: true,
        },
      ],
    },
  },
]
