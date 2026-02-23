import { ACTION, PERMISSION } from '@/consts/permissions'

export default [
  {
    path: '/admin/reports/education-system',
    name: 'reportsEducationSystemList',
    component: () =>
      import(
        '@/views/pages/admin-context/reports/educationSystem/educationSystemList/EducationSystemReportList.vue'
      ),
    meta: {
      pageTitle: 'Sistema de Ensino',
      resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
      action: ACTION.READ,
      breadcrumb: [{ text: 'Sistema de Ensino', active: true }],
    },
  },
  {
    path: '/admin/reports/education-system/:educationSystemId',
    name: 'educationSystemReportTabs',
    component: () =>
      import(
        '@/views/pages/admin-context/reports/educationSystem/detail/EducationSystemReportRoot.vue'
      ),
    children: [
      {
        path: 'institutions',
        name: 'educationSystemReportInstitutionsList',
        redirect: '/admin/reports/education-system/:educationSystemId/institutions/general',
        component: () =>
          import(
            '@/views/pages/admin-context/reports/educationSystem/detail/educationSystemInstitutions/TabIndex.vue'
          ),
        // component: () =>
        //   import(
        //     '@/views/pages/admin-context/reports/educationSystem/detail/educationSystemInstitutions/general/Index.vue'
        //   ),
        meta: {
          // tabIndex: 0,
          pageTitle: '',
          resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
          action: ACTION.READ,
          navActiveLink: 'reportsEducationSystemList',
          breadcrumb: [
            { text: 'generalReports', active: true },
            { text: 'Sistema de Ensino', to: { name: 'reportsEducationSystemList' } },
            { text: 'Escolas', active: true },
          ],
        },
        children: [
          {
            path: 'general',
            name: 'educationSystemReportInstitutionsListGeneral',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/educationSystem/detail/educationSystemInstitutions/general/Index.vue'
              ),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              pageTitle: '',
              // tabIndex: 0,
              breadcrumb: [
                {
                  text: 'generalReports',
                  active: true,
                },
                {
                  text: 'Sistema de Ensino',
                  to: { name: 'reportsEducationSystemList' },
                },
                {
                  text: 'Escolas',
                  active: true,
                },
              ],
            },
          },
          /*  {
            path: 'ability',
            name: 'evaluationsTCTInstutionsAbility',
            component: () =>
              import(
                '@/views/pages/admin-context/evaluations/tct/institutions-list/ability/index.vue'
              ),
            meta: {
              navActiveLink: 'evaluations',
              resource: PERMISSION.MODULE.EVALUATIONS,
              action: ACTION.READ,
              pageTitle: 'Habilidades',
              tabIndex: 1,
              breadcrumb: [
                {
                  text: 'Avaliação Digital',
                  to: {
                    name: 'evaluations',
                  },
                },
                {
                  text: 'Escolas',
                  active: true,
                },
              ],
            },
          }, */
        ],
      },

      {
        path: 'institutions/:institutionId/classes',
        name: 'educationSystemReportInstitutionsClasses',
        redirect:
          '/admin/reports/education-system/:educationSystemId/institutions/:institutionId/classes/general',

        component: () =>
          import(
            '@/views/pages/admin-context/reports/educationSystem/detail/educationSystemClasses/TabIndex.vue'
          ),
        meta: {
          pageTitle: '',
          // tabIndex: 0,
          resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
          action: ACTION.READ,
          navActiveLink: 'reportsEducationSystemList',
          breadcrumb: [
            { text: 'generalReports', active: true },
            { text: 'Sistema de Ensino', to: { name: 'reportsEducationSystemList' } },
            { text: 'Escolas', to: { name: 'educationSystemReportInstitutionsList' } },
            { text: 'Turmas', active: true },
          ],
        },
        children: [
          {
            path: 'general',
            name: 'educationSystemReportInstitutionsClassesGeneral',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/educationSystem/detail/educationSystemClasses/general/Index.vue'
              ),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              pageTitle: '',
              // tabIndex: 0,
              breadcrumb: [
                {
                  text: 'generalReports',
                  active: true,
                },
                {
                  text: 'Sistema de Ensino',
                  to: { name: 'educationSystemReportInstitutionsList' },
                },
                { text: 'Escolas', to: { name: 'educationSystemReportInstitutionsList' } },
                { text: 'Turmas', active: true },
              ],
            },
          },
          {
            path: 'books',
            name: 'educationSystemReportInstitutionsClassesBook',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/educationSystem/detail/educationSystemBooks/Index.vue'
              ),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              pageTitle: '',
              // tabIndex: 1,
              breadcrumb: [
                {
                  text: 'generalReports',
                  active: true,
                },
                {
                  text: 'Sistema de Ensino',
                  to: { name: 'educationSystemReportInstitutionsList' },
                },
                { text: 'Escolas', to: { name: 'educationSystemReportInstitutionsList' } },
                { text: 'Turmas', active: true },
              ],
            },
          },
        ],
      },

      {
        path: 'books',
        name: 'educationSystemReportBooks',
        redirect: '/admin/reports/education-system/:educationSystemId/classes/general',
        component: () =>
          import(
            '@/views/pages/admin-context/reports/educationSystem/detail/educationSystemClasses/TabIndex.vue'
          ),
        meta: {
          // tabIndex: 0,
          pageTitle: '',
          resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
          action: ACTION.READ,
          navActiveLink: 'reportsEducationSystemList',
          breadcrumb: [
            { text: 'generalReports', active: true },
            { text: 'Sistema de Ensino', to: { name: 'reportsEducationSystemList' } },
            { text: 'Turmas', active: true },
          ],
        },
        children: [
          {
            path: 'list',
            name: 'educationSystemReportBooksList',

            component: () =>
              import(
                '@/views/pages/admin-context/reports/educationSystem/detail/educationSystemBooks/Index.vue'
              ),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              pageTitle: 'Análise TCT',
              // tabIndex: 1,
              breadcrumb: [
                { text: 'Sistema de Ensino', to: { name: 'reportsEducationSystemList' } },
                { text: 'Turmas', active: true },
              ],
            },
          },
          {
            path: 'classes',
            name: 'educationSystemReportBooksClasses',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/educationSystem/studentsTab/classes/Index.vue'
              ),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              pageTitle: '',
              breadcrumb: [
                {
                  text: 'Sistema de Ensino',
                  to: { name: 'reportsEducationSystemList' },
                },
                {
                  text: 'Missions',
                  plural: true,
                  active: true,
                },
              ],
              routeStudents: 'educationSystemReportBooksClassesStudents',
            },
            children: [],
          },
          {
            path: 'classes/:classId/students',
            name: 'educationSystemReportBooksClassesStudents',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/educationSystem/studentsTab/students/Index.vue'
              ),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              pageTitle: '',
              tabIndex: 1,
              breadcrumb: [
                {
                  text: 'Sistema de Ensino',
                  to: { name: 'reportsEducationSystemList' },
                },
                {
                  text: 'Missions',
                  plural: true,
                  active: true,
                },
              ],
              routeBack: 'educationSystemReportBooksClasses',
            },
          },
          {
            path: 'ranking',
            name: 'educationSystemReportBooksRanking',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/educationSystem/detail/educationSystemRanking/Index.vue'
              ),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              breadcrumb: [
                { text: 'Sistema de Ensino', to: { name: 'reportsEducationSystemList' } },
                { text: 'Ranking', active: true },
              ],
            },
          },
        ],
      },

      // missões
      {
        path: 'books/:bookId',
        name: 'EducationSystemReportMissions',
        component: () =>
          import(
            '@/views/pages/admin-context/reports/educationSystem/admin/missions/MissionsTabs.vue'
          ),
        meta: {
          // tabIndex: 0,
          resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
          action: ACTION.READ,
          navActiveLink: 'reportsEducationSystemList',
          breadcrumb: [
            { text: 'generalReports', active: true },
            { text: 'Sistema de Ensino', to: { name: 'reportsEducationSystemList' } },
            { text: 'Turmas', to: { name: 'educationSystemReportClasses' } },
            { text: 'Alunos', active: true },
          ],
        },
        children: [
          {
            path: 'missions',
            name: 'educationSystemReportMissionsBooks',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/educationSystem/admin/missions/Index.vue'
              ),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              pageTitle: '',
              // tabIndex: 0,
              breadcrumb: [
                {
                  text: 'Sistema de Ensino',
                  to: { name: 'reportsEducationSystemList' },
                },
                {
                  text: 'Missions',
                  plural: true,
                  active: true,
                },
              ],
            },
          },
          {
            path: 'classes',
            name: 'educationSystemReportMissionsClasses',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/educationSystem/studentsTab/classes/Index.vue'
              ),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              pageTitle: '',
              breadcrumb: [
                {
                  text: 'Sistema de Ensino',
                  to: { name: 'reportsEducationSystemList' },
                },
                {
                  text: 'Missions',
                  plural: true,
                  active: true,
                },
              ],
              routeStudents: 'educationSystemReportMissionsClassesStudents',
            },
            children: [],
          },
          {
            path: 'classes/:classId/students',
            name: 'educationSystemReportMissionsClassesStudents',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/educationSystem/studentsTab/students/Index.vue'
              ),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              pageTitle: '',
              tabIndex: 1,
              breadcrumb: [
                {
                  text: 'Sistema de Ensino',
                  to: { name: 'reportsEducationSystemList' },
                },
                {
                  text: 'Missions',
                  plural: true,
                  active: true,
                },
              ],
              routeBack: 'educationSystemReportMissionsClasses',
            },
          },
          {
            path: 'ranking',
            name: 'educationSystemReportMissionsRanking',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/educationSystem/detail/educationSystemRanking/Index.vue'
              ),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              pageTitle: '',
              // tabIndex: 0,
              breadcrumb: [
                {
                  text: 'Sistema de Ensino',
                  to: { name: 'reportsEducationSystemList' },
                },
                {
                  text: 'Missions',
                  plural: true,
                  active: true,
                },
              ],
            },
          },
        ],
      },

      // book report
      {
        path: 'books/:bookId/report',
        name: 'EducationSystemReportMissionsBookReport',
        component: () =>
          import('@/views/pages/admin-context/reports/educationSystem/admin/bookReport/Tabs.vue'),
        meta: {
          // tabIndex: 0,
          resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
          action: ACTION.READ,
          navActiveLink: 'reportsEducationSystemList',
          breadcrumb: [
            { text: 'generalReports', active: true },
            { text: 'Sistema de Ensino', to: { name: 'reportsEducationSystemList' } },
            { text: 'Turmas', to: { name: 'educationSystemReportClasses' } },
            { text: 'Alunos', active: true },
          ],
        },
        children: [
          {
            path: 'books',
            name: 'educationSystemReportMissionsBookReportBooks',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/educationSystem/admin/bookReport/index.vue'
              ),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              pageTitle: '',
              // tabIndex: 0,
              breadcrumb: [
                {
                  text: 'Sistema de Ensino',
                  to: { name: 'reportsEducationSystemList' },
                },
                {
                  text: 'Missions',
                  plural: true,
                  active: true,
                },
              ],
            },
          },
          {
            path: 'students',
            name: 'educationSystemReportMissionsBookReportStudents',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/educationSystem/admin/missions/Index.vue'
              ),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              pageTitle: '',
              // tabIndex: 0,
              breadcrumb: [
                {
                  text: 'Sistema de Ensino',
                  to: { name: 'reportsEducationSystemList' },
                },
                {
                  text: 'Missions',
                  plural: true,
                  active: true,
                },
              ],
            },
          },
          {
            path: 'ranking',
            name: 'educationSystemReportMissionsBookReportRanking',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/educationSystem/detail/educationSystemRanking/Index.vue'
              ),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              breadcrumb: [
                { text: 'Sistema de Ensino', to: { name: 'reportsEducationSystemList' } },
                { text: 'Ranking', active: true },
              ],
            },
          },
        ],
      },

      // mission plus
      {
        path: 'books/:bookId/mission-plus/:missionId',
        name: 'EducationSystemReportMissionPlus',
        component: () =>
          import('@/views/pages/admin-context/reports/educationSystem/admin/missionplus/Tabs.vue'),
        meta: {
          // tabIndex: 0,
          resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
          action: ACTION.READ,
          navActiveLink: 'reportsEducationSystemList',
          breadcrumb: [
            { text: 'generalReports', active: true },
            { text: 'Sistema de Ensino', to: { name: 'reportsEducationSystemList' } },
            { text: 'Turmas', to: { name: 'educationSystemReportClasses' } },
            { text: 'Alunos', active: true },
          ],
        },
        children: [
          {
            path: 'books',
            name: 'EducationSystemReportMissionPlusBooks',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/educationSystem/admin/missionplus/index.vue'
              ),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              pageTitle: '',
              // tabIndex: 0,
              breadcrumb: [
                {
                  text: 'Sistema de Ensino',
                  to: { name: 'reportsEducationSystemList' },
                },
                {
                  text: 'Missions',
                  plural: true,
                  active: true,
                },
              ],
            },
          },
          {
            path: 'classes',
            name: 'EducationSystemReportMissionPlusClasses',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/educationSystem/studentsTab/classes/Index.vue'
              ),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              pageTitle: '',
              breadcrumb: [
                {
                  text: 'Sistema de Ensino',
                  to: { name: 'reportsEducationSystemList' },
                },
                {
                  text: 'Missions',
                  plural: true,
                  active: true,
                },
              ],
              routeStudents: 'EducationSystemReportMissionPlusClassesStudents',
            },
            children: [],
          },
          {
            path: 'classes/:classId/students',
            name: 'EducationSystemReportMissionPlusClassesStudents',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/educationSystem/studentsTab/students/Index.vue'
              ),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              pageTitle: '',
              tabIndex: 1,
              breadcrumb: [
                {
                  text: 'Sistema de Ensino',
                  to: { name: 'reportsEducationSystemList' },
                },
                {
                  text: 'Missions',
                  plural: true,
                  active: true,
                },
              ],
              routeBack: 'educationSystemReportBooksClasses',
            },
          },
          {
            path: 'ranking',
            name: 'EducationSystemReportMissionPlusRanking',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/educationSystem/detail/educationSystemRanking/Index.vue'
              ),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              pageTitle: '',
              // tabIndex: 0,
              breadcrumb: [
                {
                  text: 'Sistema de Ensino',
                  to: { name: 'reportsEducationSystemList' },
                },
                {
                  text: 'Missions',
                  plural: true,
                  active: true,
                },
              ],
            },
          },
        ],
      },

      // mission
      {
        path: 'books/:bookId/mission/:missionId',
        name: 'EducationSystemReportMission',
        component: () =>
          import('@/views/pages/admin-context/reports/educationSystem/admin/mission/Tabs.vue'),
        meta: {
          // tabIndex: 0,
          resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
          action: ACTION.READ,
          navActiveLink: 'reportsEducationSystemList',
          breadcrumb: [
            { text: 'generalReports', active: true },
            { text: 'Sistema de Ensino', to: { name: 'reportsEducationSystemList' } },
            { text: 'Turmas', to: { name: 'educationSystemReportClasses' } },
            { text: 'Alunos', active: true },
          ],
        },
        children: [
          {
            path: 'books',
            name: 'EducationSystemReportMissionBooks',
            component: () =>
              import('@/views/pages/admin-context/reports/educationSystem/admin/mission/index.vue'),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              pageTitle: '',
              // tabIndex: 0,
              breadcrumb: [
                {
                  text: 'Sistema de Ensino',
                  to: { name: 'reportsEducationSystemList' },
                },
                {
                  text: 'Missions',
                  plural: true,
                  active: true,
                },
              ],
            },
          },
          {
            path: 'classes',
            name: 'EducationSystemReportMissionClasses',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/educationSystem/studentsTab/classes/Index.vue'
              ),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              pageTitle: '',
              breadcrumb: [
                {
                  text: 'Sistema de Ensino',
                  to: { name: 'reportsEducationSystemList' },
                },
                {
                  text: 'Missions',
                  plural: true,
                  active: true,
                },
              ],
              routeStudents: 'EducationSystemReportMissionClassesStudents',
            },
            children: [],
          },
          {
            path: 'classes/:classId/students',
            name: 'EducationSystemReportMissionClassesStudents',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/educationSystem/studentsTab/students/Index.vue'
              ),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              pageTitle: '',
              tabIndex: 1,
              breadcrumb: [
                {
                  text: 'Sistema de Ensino',
                  to: { name: 'reportsEducationSystemList' },
                },
                {
                  text: 'Missions',
                  plural: true,
                  active: true,
                },
              ],
              routeBack: 'educationSystemReportBooksClasses',
            },
          },
          {
            path: 'ranking',
            name: 'EducationSystemReportMissionRanking',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/educationSystem/detail/educationSystemRanking/Index.vue'
              ),
            meta: {
              navActiveLink: 'reportsEducationSystemList',
              resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
              action: ACTION.READ,
              pageTitle: '',
              // tabIndex: 0,
              breadcrumb: [
                {
                  text: 'Sistema de Ensino',
                  to: { name: 'reportsEducationSystemList' },
                },
                {
                  text: 'Missions',
                  plural: true,
                  active: true,
                },
              ],
            },
          },
        ],
      },
    ],
  },
]
