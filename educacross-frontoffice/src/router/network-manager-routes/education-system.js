import { ACTION, PERMISSION } from '@/consts/permissions.js'

export default [
  // ============================= education system ========================================
  {
    path: '/network-manager/education-system',
    name: 'educationSystemNetworkList',
    component: () =>
      import(
        '@/views/pages/admin-context/network-manager/education-system/EducationSystemReportList.vue'
      ),
    meta: {
      resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
      action: ACTION.READ,
      breadcrumb: [{ text: 'Sistema de Ensino', active: true }],
    },
  },
  {
    path: '/network-manager/education-system/:educationSystemId',
    name: 'networkManagerEducationSystemRoot',
    component: () =>
      import(
        '@/views/pages/admin-context/network-manager/education-system/EducationSystemnetworkManagerTabsRoot.vue'
      ),
    meta: {
      pageTitle: 'Sistema de Ensino',
      resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
      action: ACTION.READ,
      navActiveLink: 'educationSystemNetworkList',
    },
    children: [
      {
        path: 'books',
        name: 'networkManagerEducationSystemBooks',
        component: () =>
          import('@/views/pages/admin-context/network-manager/education-system/books/Index.vue'),
        meta: {
          pageTitle: 'Sistema de Ensino',
          resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
          action: ACTION.READ,
          breadcrumb: [{ text: 'Sistema de Ensino', active: true }],
          navActiveLink: 'educationSystemNetworkList',
        },
      },
      {
        path: 'schools',
        name: 'networkManagerEducationSystemSchools',
        component: () =>
          import(
            '@/views/pages/admin-context/network-manager/education-system/schools/institutions/Index.vue'
          ),
        meta: {
          pageTitle: 'Sistema de Ensino',
          resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
          action: ACTION.READ,
          breadcrumb: [{ text: 'Sistema de Ensino', active: true }],
          navActiveLink: 'educationSystemNetworkList',
          routeClasses: 'networkManagerEducationSystemSchoolsClasses',
        },
      },
      {
        path: 'schools/:institutionId/classes',
        name: 'networkManagerEducationSystemSchoolsClasses',
        component: () =>
          import(
            '@/views/pages/admin-context/network-manager/education-system/schools/classes/Index.vue'
          ),
        meta: {
          pageTitle: 'Sistema de Ensino',
          resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
          tabIndex: 1,
          action: ACTION.READ,
          breadcrumb: [{ text: 'Sistema de Ensino', active: true }],
          navActiveLink: 'educationSystemNetworkList',
          routeBack: 'networkManagerEducationSystemSchools',
        },
      },

      {
        path: 'ranking',
        name: 'networkManagerEducationSystemRanking',
        component: () =>
          import('@/views/pages/admin-context/network-manager/education-system/ranking/Index.vue'),
        meta: {
          pageTitle: 'Sistema de Ensino',
          resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
          action: ACTION.READ,
          breadcrumb: [{ text: 'Sistema de Ensino', active: true }],
          navActiveLink: 'educationSystemNetworkList',
        },
      },
    ],
  },
  {
    path: '/network-manager/education-system/:educationSystemId/books/:bookId',
    name: 'educationSystemNetworkBookTabs',
    component: () =>
      import(
        '@/views/pages/admin-context/network-manager/education-system/books/book/hability/Tabs.vue'
      ),
    meta: {
      resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
      action: ACTION.READ,
    },
    children: [
      {
        path: 'list',
        name: 'educationSystemNetworkBookDetails',
        component: () =>
          import(
            '@/views/pages/admin-context/network-manager/education-system/books/book/hability/index.vue'
          ),
        meta: {
          resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
          action: ACTION.READ,
          navActiveLink: 'educationSystemNetworkList',
          breadcrumb: [{ text: 'Sistema de Ensino', active: true }],
        },
      },
      {
        path: 'schools',
        name: 'educationSystemNetworkBookDetailsSchools',
        component: () =>
          import(
            '@/views/pages/admin-context/network-manager/education-system/schools/institutions/Index.vue'
          ),
        meta: {
          pageTitle: 'Sistema de Ensino',
          resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
          action: ACTION.READ,
          breadcrumb: [{ text: 'Sistema de Ensino', active: true }],
          navActiveLink: 'educationSystemNetworkList',
          routeClasses: 'educationSystemNetworkBookDetailsSchoolsClasses',
        },
      },
      {
        path: 'schools/:institutionId/classes',
        name: 'educationSystemNetworkBookDetailsSchoolsClasses',
        component: () =>
          import(
            '@/views/pages/admin-context/network-manager/education-system/schools/classes/Index.vue'
          ),
        meta: {
          pageTitle: 'Sistema de Ensino',
          resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
          tabIndex: 1,
          action: ACTION.READ,
          breadcrumb: [{ text: 'Sistema de Ensino', active: true }],
          navActiveLink: 'educationSystemNetworkList',
          routeBack: 'educationSystemNetworkBookDetailsSchools',
        },
      },

      {
        path: 'ranking',
        name: 'educationSystemNetworkBookDetailsRanking',
        component: () =>
          import('@/views/pages/admin-context/network-manager/education-system/ranking/Index.vue'),
        meta: {
          pageTitle: 'Sistema de Ensino',
          resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
          action: ACTION.READ,
          breadcrumb: [{ text: 'Sistema de Ensino', active: true }],
          navActiveLink: 'educationSystemNetworkList',
        },
      },
    ],
  },
]
