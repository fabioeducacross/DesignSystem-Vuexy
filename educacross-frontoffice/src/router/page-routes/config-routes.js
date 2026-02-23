import { ACTION, PERMISSION } from '@/consts/permissions'

export default [
  {
    path: '/config/schoolLogo',
    name: 'schoolLogo',
    component: () => import('@/views/pages/admin-context/records/SchoolLogo.vue'),
    meta: {
      navActiveLink: 'home',
      pageTitle: 'Logotipo da Escola',
      breadcrumb: [{ text: 'Configurações', active: true }],
      resource: PERMISSION.GENERAL.CHANGE_INSTITUTION_LOGO,
      action: ACTION.READ,
    },
  },
]
