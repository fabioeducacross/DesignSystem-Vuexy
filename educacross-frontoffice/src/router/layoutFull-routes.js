export default [
  {
    path: '/manage-account',
    name: 'managerAccount',
    component: () => import('@/views/pages/auth-context/manage-account/ManageAccount.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/l',
    name: 'loginDeepLink',
    component: () => import('@/views/pages/deeplink/LoginDeepLink.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/g/:token',
    name: 'guideDeepLink',
    component: () => import('@/views/pages/deeplink/GuideDeepLink.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/dl/events/:eventId',
    name: 'eventDeepLink',
    component: () => import('@/views/pages/deeplink/EventDeepLink.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/activeaccesskey/:token',
    name: 'activeAccessKey',
    component: () => import('@/views/pages/auth-context/login/ActiveAccessKey.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/jogar',
    name: 'jogar',
    component: () => import('@/views/pages/jogar/Jogar.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/jogar-lite',
    name: 'jogar-lite',
    component: () => import('@/views/pages/jogar/JogarLite.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/error-no-classes',
    name: 'noClassesError',
    component: () => import('@/views/error/NoClasses.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  // ******************************
  // ******************************
  // ** COMEÇO DAS ROTAS DE ERRO **
  // ******************************
  // ******************************
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/error/Error404.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '*',
    name: 'error-404',
    redirect: 'error-404',
    component: () => import('@/views/error/Error404.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/error-403',
    name: 'error-403',
    component: () => import('@/views/error/Error403.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
]
