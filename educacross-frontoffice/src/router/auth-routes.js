import { ACTION, PERMISSION } from '@/consts/permissions.js'

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pages/auth-context/login/Login.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/login-access-update',
    name: 'loginAccessUpdate',
    component: () => import('@/views/pages/auth-context/login/LoginAccessUpdate.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/login-temp-access',
    name: 'loginTempAccess',
    component: () => import('@/views/pages/auth-context/login/LoginTempAccess.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/verify-email',
    name: 'verifyEmail',
    component: () => import('@/views/pages/auth-context/login/VerifyEmail.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/register',
    name: 'registerNewUser',
    component: () => import('@/views/pages/auth-context/login/Register.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: () => import('@/views/pages/auth-context/login/ForgotPassword.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/redefinepassword',
    name: 'redefinePassword',
    component: () => import('@/views/pages/auth-context/login/ChangePassword.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/password-changed',
    name: 'passwordChangeSuccess',
    component: () => import('@/views/pages/auth-context/login/PasswordChangeSuccess.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/password-changed-error',
    name: 'passwordChangeError',
    component: () => import('@/views/pages/auth-context/login/PasswordChangeError.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/validate-email',
    name: 'validateEmailByCode',
    component: () => import('@/views/pages/auth-context/login/ValidateEmailByCode.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/lex',
    name: 'loginLex',
    component: () => import('@/views/pages/auth-context/login/lex/Lex.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/lex/app',
    name: 'lexLoginApp',
    component: () => import('@/views/pages/auth-context/login/lex/LexApp.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/lex/legacy',
    name: 'lexLoginLegacy',
    component: () => import('@/views/pages/auth-context/login/lex/LexLegacy.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/lex-mbg',
    name: 'lexMapleLogin',
    component: () => import('@/views/pages/auth-context/login/lex/LexMaple.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/lex-mbg/app',
    name: 'lexMapleLoginApp',
    component: () => import('@/views/pages/auth-context/login/lex/LexMapleApp.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/error-partner',
    name: 'ExternalLoginError',
    component: () => import('@/views/pages/auth-context/login/LoginError.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },

  {
    path: '/el',
    name: 'externalLogin',
    component: () => import('@/views/pages/auth-context/login/ExternalLogin.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/coc',
    name: 'LoginCoc',
    component: () => import('@/views/pages/auth-context/login/coc/LoginCoc.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/plurall',
    name: 'LoginPlurall',
    component: () => import('@/views/pages/auth-context/login/plurall/Plurall.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/somosplay',
    name: 'LoginSomosPlay',
    component: () => import('@/views/pages/auth-context/login/somosplay/SomosPlay.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/plurall/education-system/:id/books/:bookId/subject/:subjectId/serie/:serieId',
    name: 'PlurallBookRedirect',
    component: () => import('@/views/pages/auth-context/login/plurall/PlurallBookRedirect.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/somosplay/education-system/:id/books/:bookId/subject/:subjectId/serie/:serieId',
    name: 'SomosPlayBookRedirect',
    component: () => import('@/views/pages/auth-context/login/somosplay/SomosPlayBookRedirect.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/sas',
    name: 'ArcoSas',
    component: () => import('@/views/pages/auth-context/login/sas/Sas.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/sas/login',
    name: 'Sas',
    component: () => import('@/views/pages/auth-context/login/sas/SasLogin.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/sas/gt/:guideId',
    name: 'sasGt',
    component: () => import('@/views/pages/auth-context/login/sas/SasGt.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/sas/gs/:guideId',
    name: 'sasGs',
    component: () => import('@/views/pages/auth-context/login/sas/SasGs.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/sas/app',
    name: 'sasApp',
    component: () => import('@/views/pages/auth-context/login/sas/SasApp.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/sas/login/app',
    name: 'sasLoginApp',
    component: () => import('@/views/pages/auth-context/login/sas/SasLoginApp.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/sas/t/es/:missionId',
    name: 'sasLoginWithEducationSystem',
    component: () => import('@/views/pages/auth-context/login/sas/SasGtEducationSystem.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/register/:token',
    name: 'registerWithToken',
    component: () => import('@/views/pages/auth-context/login/Register.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/login/seduc',
    name: 'microsoftLogin',
    component: () => import('@/views/pages/auth-context/login/seduc/Seduc.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/layers',
    name: 'loginLayers',
    component: () => import('@/views/pages/auth-context/login/layers/Layers.vue'),
    meta: {
      requireAuth: false,
      layout: 'full',
    },
  },
  {
    path: '/simulations',
    name: 'redirectSimulationsUrl',
    component: () => import('@/views/pages/admin-context/evaluations/Simulations.vue'),
    meta: {
      resource: PERMISSION.MODULE.EVOLUCIIONAL_SIMULATIONS,
      action: ACTION.READ,
      layout: 'full',
    },
  },
]
