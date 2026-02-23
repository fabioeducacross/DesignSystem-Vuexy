import { ACTION, PERMISSION } from '@/consts/permissions'

export default [
  {
    path: 'reading-meter',
    component: () => import('@/views/pages/reading-meter/ReadingMeterRoot.vue'),
    meta: {
      resource: PERMISSION.MODULE.READINGFLUENCY,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Teste de fluência',
          active: true,
        },
      ],
    },
    children: [
      {
        path: '/',
        name: 'readingMeterTabs',
        /* component: () => import('@/views/pages/reading-meter/ReadingMeterTabs.vue'), */
        component: () => import('@/views/pages/reading-meter/list/ReadingMeterList.vue'),
        meta: {
          tabIndex: 1,
          resource: PERMISSION.MODULE.READINGFLUENCY,
          navActiveLink: 'readingMeterClassesOverview',
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Teste de fluência',
              active: true,
            },
          ],
        },
        children: [
          {
            path: 'test',
            name: 'readingMeterList',
            component: () => import('@/views/pages/reading-meter/list/ReadingMeterList.vue'),
            meta: {
              tabIndex: 1,
              resource: PERMISSION.MODULE.READINGFLUENCY,
              navActiveLink: 'readingMeterClassesOverview',
              action: ACTION.READ,
              breadcrumb: [
                {
                  text: 'Teste de fluência',
                  active: true,
                },
              ],
            },
          },
          {
            path: 'overview',
            name: 'readingMeterClassesOverview',
            component: () =>
              import('@/views/pages/teacher-context/library/general/GeneralIndex.vue'),
            meta: {
              navActiveLink: 'readingMeterClassesOverview',
              tabIndex: 0,
              resource: PERMISSION.MODULE.READINGFLUENCY,
              action: ACTION.READ,
              breadcrumb: [
                {
                  text: 'Avaliações',
                  active: true,
                },
                {
                  text: 'Fluência Leitora',
                  active: true,
                },
              ],
            },
          },
          // {
          //   path: 'library',
          //   name: 'readingMetherLibrary',
          //   component: () => import('@/views/pages/reading-meter/libary/list/LibraryList.vue'),
          //   meta: {
          //     navActiveLink: 'readingMeterClassesOverview',
          //     tabIndex: 2,
          //     resource: PERMISSION.MODULE.READINGFLUENCY,
          //     action: ACTION.READ,
          //     breadcrumb: [
          //       {
          //         text: 'Teste de fluência',
          //         active: true,
          //       },
          //     ],
          //   },
          // },
        ],
      },

      {
        path: 'test/:testId/class/:classId',
        name: 'readingMeterTest',
        component: () => import('@/views/pages/reading-meter/test/ReadingMeterTestList.vue'),
        meta: {
          tabIndex: 1,
          resource: PERMISSION.MODULE.READINGFLUENCY,
          action: ACTION.READ,
          navActiveLink: 'readingMeterClassesOverview',
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Fluência Leitora',
              to: { name: 'readingMeterClassesOverview' },
            },
            {
              text: 'Teste',
              active: true,
            },
          ],
        },
      },
      {
        path: 'test/:testId/class/:classId/student/:studentId',
        name: 'readingMetherDetail',
        component: () =>
          import('@/views/pages/reading-meter/test/reading/ReadingMeterDetailIndex.vue'),
        meta: {
          navActiveLink: 'readingMeterClassesOverview',
          tabIndex: 1,
          resource: PERMISSION.MODULE.READINGFLUENCY,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Fluência Leitora',
              to: { name: 'readingMeterClassesOverview' },
            },
            {
              text: 'Teste',
              to: { name: 'readingMeterTest' },
            },
            {
              text: 'Aluno',
              active: true,
            },
          ],
        },
      },

      {
        path: 'library/:bookId',
        name: 'readingMetherLibraryDetail',
        component: () => import('@/views/pages/reading-meter/libary/detail/LibraryListDetail.vue'),
        meta: {
          navActiveLink: 'readingMeterClassesOverview',
          tabIndex: 2,
          resource: PERMISSION.MODULE.READINGFLUENCY,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Teste de fluência',
              to: { name: 'readingMetherDetail' },
            },
            {
              text: 'Livro',
              active: true,
            },
          ],
        },
      },
    ],
  },
]

export const readingMeterAdminRoutes = [
  {
    path: '/reading-meter-overview',
    name: 'readingMeterOverview',

    component: () => import('@/views/pages/teacher-context/library/general/GeneralIndex.vue'),
    meta: {
      resource: PERMISSION.MODULE.READINGFLUENCY,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Teste de fluência',
          active: true,
        },
      ],
    },
  },
]
