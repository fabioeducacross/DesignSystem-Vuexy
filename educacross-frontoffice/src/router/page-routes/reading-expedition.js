import { ACTION, PERMISSION } from '@/consts/permissions'

export default [
  {
    path: '/reading-expedition',
    component: () => import('@/views/pages/reading-expedition/ReadingExpeditionRoot.vue'),
    meta: {
      resource: PERMISSION.MODULE.READING_EXPEDITION,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Leiturômetro',
          active: true,
        },
      ],
    },
    children: [
      {
        path: '/',
        name: 'readingExpeditionTabs',
        component: () => import('@/views/pages/reading-expedition/ReadingExpeditionTabs.vue'),
        meta: {
          tabIndex: 1,
          resource: PERMISSION.MODULE.READING_EXPEDITION,
          navActiveLink: 'readingExpeditionOverview',
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Leiturômetro',
              active: true,
            },
          ],
        },
        children: [
          {
            path: 'overview',
            name: 'readingExpeditionOverview',
            component: () => import('@/views/pages/reading-expedition/overview/index.vue'),
            meta: {
              navActiveLink: 'readingExpeditionOverview',
              tabIndex: 0,
              resource: PERMISSION.MODULE.READING_EXPEDITION,
              action: ACTION.READ,
              breadcrumb: [
                {
                  text: 'Expedição Leitura',
                  active: true,
                },
              ],
            },
          },
          {
            path: 'student-overview',
            name: 'readingExpeditionStudentOverview',
            component: () =>
              import('@/views/pages/reading-expedition/overview/student-overview/index.vue'),
            meta: {
              navActiveLink: 'readingExpeditionOverview',
              tabIndex: 1,
              resource: PERMISSION.MODULE.READING_EXPEDITION,
              action: ACTION.READ,
              breadcrumb: [
                {
                  text: 'Expedição Leitura',
                  active: true,
                },
              ],
            },
          },
          {
            path: 'fluency-tests',
            name: 'readingExpeditionFluencyTests',
            component: () => import('@/views/pages/reading-expedition/fluency-tests/Index.vue'),
            meta: {
              tabIndex: 1,
              resource: PERMISSION.MODULE.READING_EXPEDITION,
              navActiveLink: 'readingExpeditionOverview',
              action: ACTION.READ,
              breadcrumb: [
                {
                  text: 'Expedição Leitura',
                  active: true,
                },
                {
                  text: 'Teste',
                  active: true,
                },
              ],
            },
            children: [
              {
                path: ':testId',
                name: 'readingExpeditionFluencyTest',
                component: () =>
                  import('@/views/pages/reading-expedition/fluency-tests/list/index.vue'),
                meta: {
                  tabIndex: 1,
                  resource: PERMISSION.MODULE.READING_EXPEDITION,
                  navActiveLink: 'readingExpeditionOverview',
                  action: ACTION.READ,
                  breadcrumb: [
                    {
                      text: 'Expedição Leitura',
                      active: true,
                    },
                    {
                      text: 'Teste',
                      active: true,
                    },
                  ],
                },
              },
              {
                path: ':testId/student/:studentId',
                name: 'readingExpeditionFluencyTestStudent',
                component: () =>
                  import('@/views/pages/reading-expedition/fluency-tests/student/Index.vue'),
                meta: {
                  tabIndex: 1,
                  resource: PERMISSION.MODULE.READING_EXPEDITION,
                  navActiveLink: 'readingExpeditionOverview',
                  action: ACTION.READ,
                  breadcrumb: [
                    {
                      text: 'Expedição Leitura',
                      active: true,
                    },
                    {
                      text: 'Teste',
                      active: true,
                    },
                    {
                      text: 'Aluno',
                      active: true,
                    },
                  ],
                },
              },
              {
                path: 'notFound',
                name: 'readingExpeditionFluencyTestsNotFound',
                component: () => import('@/views/pages/reading-expedition/components/NotFound.vue'),
                meta: {
                  tabIndex: 1,
                  resource: PERMISSION.MODULE.READING_EXPEDITION,
                  navActiveLink: 'readingExpeditionOverview',
                  action: ACTION.READ,
                  breadcrumb: [
                    {
                      text: 'Expedição Leitura',
                      active: true,
                    },
                    {
                      text: 'Teste',
                      active: true,
                    },
                  ],
                },
              },
            ],
          },

          {
            path: 'units',
            name: 'readingExpeditionUnits',
            component: () => import('@/views/pages/reading-expedition/units/index.vue'),
            meta: {
              navActiveLink: 'readingExpeditionOverview',
              tabIndex: 2,
              resource: PERMISSION.MODULE.READING_EXPEDITION,
              action: ACTION.READ,
              breadcrumb: [
                {
                  text: 'Expedição Leitura',
                  active: true,
                },
                {
                  text: 'Unidade',
                  active: true,
                },
              ],
            },
            children: [
              {
                path: ':unitId',
                name: 'readingExpeditionUnit',
                component: () => import('@/views/pages/reading-expedition/units/list/index.vue'),
                meta: {
                  tabIndex: 2,
                  resource: PERMISSION.MODULE.READING_EXPEDITION,
                  navActiveLink: 'readingExpeditionOverview',
                  action: ACTION.READ,
                  breadcrumb: [
                    {
                      text: 'Expedição Leitura',
                      active: true,
                    },
                    {
                      text: 'Unidade',
                      active: true,
                    },
                  ],
                },
              },
              {
                path: ':unitId/student/:studentId',
                name: 'readingExpeditionUnitStudent',
                component: () => import('@/views/pages/reading-expedition/units/student/index.vue'),
                meta: {
                  tabIndex: 2,
                  resource: PERMISSION.MODULE.READING_EXPEDITION,
                  navActiveLink: 'readingExpeditionOverview',
                  action: ACTION.READ,
                  breadcrumb: [
                    {
                      text: 'Expedição Leitura',
                      active: true,
                    },
                    {
                      text: 'Unidade',
                      active: true,
                    },
                    {
                      text: 'Aluno',
                      active: true,
                    },
                  ],
                },
              },
              {
                path: 'notFound',
                name: 'readingExpeditionUnitsNotFound',
                component: () => import('@/views/pages/reading-expedition/components/NotFound.vue'),
                meta: {
                  tabIndex: 2,
                  resource: PERMISSION.MODULE.READING_EXPEDITION,
                  navActiveLink: 'readingExpeditionOverview',
                  action: ACTION.READ,
                  breadcrumb: [
                    {
                      text: 'Expedição Leitura',
                      active: true,
                    },
                    {
                      text: 'Teste',
                      active: true,
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  },
]
