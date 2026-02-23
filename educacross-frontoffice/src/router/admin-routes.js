import teachersAccessRoutes from './page-routes/teachers-access-routes'
import { ACTION, PERMISSION } from '@/consts/permissions.js'
import router from '@/router'
import store from '@/store'

const setBreadcrumbSelectedRanking = () => {
  const selectedRanking = store.state.access.selectedRanking
  const navigate = {
    breadcrumb: {
      text: '',
    },
    to: {
      name: '',
      params: {
        id: null,
      },
    },
  }

  if (selectedRanking.name) {
    navigate.breadcrumb.text = 'Sistema de Ensino'
    navigate.to.name = 'educationSystemRanking'
    navigate.to.params.id = selectedRanking.id
  } else {
    navigate.breadcrumb.text = selectedRanking.rankingName
    navigate.to.name = selectedRanking.routeName
  }

  return {
    navigate,
  }
}

export default [
  {
    path: '/reports/engagement',
    name: 'engagementReport',
    component: () => import('@/views/pages/admin-context/reports/engagement/List.vue'),
    meta: {
      navActiveLink: 'adminEngagement',
      pageTitle: 'Engajamento das Turmas',
      breadcrumb: [
        {
          text: 'generalReports',
          active: true,
        },
        {
          text: 'Visão Geral',
          to: { name: 'adminEngagement' },
        },
        {
          text: 'Engajamento das Turmas',
          active: true,
        },
      ],
    },
  },
  {
    path: '/reports/engagementClasses',
    name: 'engagementReportNetWorkManager',
    component: () => import('@/views/pages/admin-context/reports/engagement/List.vue'),
    meta: {
      pageTitle: 'Engajamento das Turmas',
      breadcrumb: [
        {
          text: 'Painel Inicial',
          to: '/',
        },
        {
          text: 'Engajamento das Escolas',
          to: '/reports/engagementSchools',
        },
        {
          text: 'Engajamento das Turmas',
          active: true,
        },
      ],
    },
  },
  {
    path: '/reports/engagementSchools',
    name: 'engagementSchoolReport',
    component: () =>
      import('@/views/pages/admin-context/reports/engagement/EngagementSchoolsList.vue'),
    meta: {
      navActiveLink: 'adminEngagement',
      pageTitle: 'Engajamento das Escolas',
      breadcrumb: [
        {
          text: 'generalReports',
          active: true,
        },
        {
          text: 'Visão Geral',
          to: { name: 'adminEngagement' },
        },
        {
          text: 'Engajamento das Escolas',
          active: true,
        },
      ],
    },
  },
  {
    path: '/admin/records',
    name: 'second-page',
    component: () => import('@/views/pages/admin-context/records/RecordsRoot.vue'),
    children: [
      {
        path: 'student',
        name: 'StudentAdmin',
        redirect: '/admin/records/student/list',
        component: () => import('@/views/pages/records/students/StudentRoot.vue'),
        children: [
          {
            path: 'list',
            name: 'listStudentAdmin',
            component: () => import('@/views/pages/records/students/list/Index.vue'),
            meta: {
              tabIndex: 0,
              importButton: {
                text: 'Importar Cadastros',
                click: () => router.push({ name: 'importStudentAdmin' }),
              },
              pageTitle: 'Alunos',
              breadcrumb: [
                { text: 'Cadastros', active: true },
                { text: 'Alunos', active: true },
              ],
              resource: PERMISSION.GENERAL.MANAGE_STUDENTS,
              action: ACTION.READ,
            },
            children: [
              {
                path: 'overview',
                name: 'listStudentAdminOverview',
                component: () => import('@/views/pages/records/students/list/StudentsIndex.vue'),
                meta: {
                  resource: PERMISSION.GENERAL.MANAGE_TEACHERS,
                  action: ACTION.READ,
                  pageTitle: 'Turmas',
                  breadcrumb: [
                    { text: 'Cadastros', active: true },
                    { text: 'Alunos', active: true },
                  ],
                },
              },
              {
                path: 'trash',
                name: 'listStudentAdminTrash',
                component: () => import('@/views/pages/records/students/list/trash/Index.vue'),
                meta: {
                  navActiveLink: 'listStudentAdminOverview',
                  resource: PERMISSION.GENERAL.MANAGE_TEACHERS,
                  action: ACTION.READ,
                  pageTitle: 'Turmas',
                  breadcrumb: [
                    { text: 'Cadastros', active: true },
                    { text: 'Alunos', active: true },
                  ],
                },
              },
              {
                path: 'changeStudentFromClass',
                name: 'changeStudentFromClassAdmin',
                component: () =>
                  import('@/views/pages/records/students/transferStudents/Index.vue'),
                meta: {
                  navActiveLink: 'listStudentAdminOverview',
                  pageTitle: 'Migrar Alunos',
                  breadcrumb: [
                    { text: 'Cadastros', active: true },
                    { text: 'Migrar aluno', active: true },
                  ],
                  resource: PERMISSION.GENERAL.MIGRATE_CLASS_STUDENTS,
                  action: ACTION.READ,
                },
              },
            ],
          },
          {
            path: 'import',
            name: 'importStudentAdmin',
            component: () => import('@/views/pages/records/students/import/old/ImportStudents.vue'),
            meta: {
              pageTitle: 'Importar Cadastros',
              tabIndex: 0,
              breadcrumb: [
                { text: 'Cadastros', active: true },
                { text: 'Alunos', to: { name: 'listStudentAdminOverview' } },
                { text: 'Importar Cadastros', active: true },
              ],
              navActiveLink: 'listStudentAdminOverview',
              resource: PERMISSION.GENERAL.MANAGE_STUDENTS,
              action: ACTION.CREATE,
            },
          },
          {
            path: 'importStudentsList',
            name: 'listImportStudentAdmin',
            component: () => import('@/views/pages/records/students/import/old/ListImports.vue'),
            meta: {
              pageTitle: 'Importar Cadastros',
              tabIndex: 0,
              breadcrumb: [
                { text: 'Cadastros', active: true },
                { text: 'Alunos', to: { name: 'listStudentAdminOverview' } },
                { text: 'Importar Cadastros', active: true },
              ],
              navActiveLink: 'listStudentAdminOverview',
              resource: PERMISSION.GENERAL.MANAGE_STUDENTS,
              action: ACTION.CREATE,
            },
          },
          {
            path: 'listImportedStudents',
            name: 'listImportedStudents',
            component: () =>
              import('@/views/pages/records/students/import/old/ListImportedStudents.vue'),
            meta: {
              pageTitle: 'Importar Cadastros',
              tabIndex: 0,
              breadcrumb: [
                { text: 'Cadastros', active: true },
                { text: 'Alunos', to: { name: 'listStudentAdminOverview' } },
                { text: 'Importar Cadastros', active: true },
              ],
              navActiveLink: 'listStudentAdminOverview',
              resource: PERMISSION.GENERAL.MANAGE_STUDENTS,
              action: ACTION.CREATE,
            },
          },
          {
            path: 'importStudentsView',
            name: 'listImportStudentView',
            component: () =>
              import('@/views/pages/records/students/import/old/importStudentsView.vue'),
            meta: {
              pageTitle: 'Importar Cadastros',
              tabIndex: 0,
              breadcrumb: [
                { text: 'Cadastros', active: true },
                { text: 'Alunos', active: true },
                {
                  text: 'Importar Cadastros',
                  active: true,
                },
              ],
              navActiveLink: 'listStudentAdminOverview',
              resource: PERMISSION.GENERAL.MANAGE_STUDENTS,
              action: ACTION.CREATE,
            },
          },
          {
            path: 'importStudentsResendEmail',
            name: 'listImportStudentsResendEmail',
            component: () =>
              import('@/views/pages/records/students/import/old/importStudentsResendEmail.vue'),
            meta: {
              pageTitle: 'Importar Cadastros',
              breadcrumb: [
                { text: 'Cadastros', active: true },
                { text: 'Alunos', active: true },
                {
                  text: 'Importar Cadastros',
                  active: true,
                },
              ],
              navActiveLink: 'listStudentAdminOverview',
              resource: PERMISSION.GENERAL.MANAGE_STUDENTS,
              action: ACTION.CREATE,
            },
          },
        ],
      },
      {
        path: 'professor',
        name: 'ProfessorAdmin',
        redirect: '/admin/records/professor',
        component: () => import('@/views/pages/records/teachers/ProfessorRoot.vue'),
        children: [
          {
            path: 'list',
            name: 'listProfessorAdmin',
            component: () => import('@/views/pages/records/teachers/list/Index.vue'),
            meta: {
              importButton: {
                text: 'Importar Cadastros',
                click: () => router.push({ name: 'importProfessorAdmin' }),
                permissions: {
                  resource: PERMISSION.GENERAL.BETA_FEATURES,
                  action: ACTION.CREATE,
                },
              },
              pageTitle: 'Professores',
              breadcrumb: [
                { text: 'Cadastros', active: true },
                { text: 'Professores', active: true },
              ],
              resource: PERMISSION.GENERAL.MANAGE_TEACHERS,
              action: ACTION.READ,
            },
            children: [
              {
                path: 'overview',
                name: 'listProfessorAdminOverview',
                component: () => import('@/views/pages/records/teachers/list/overview/Index.vue'),
                meta: {
                  resource: PERMISSION.GENERAL.MANAGE_TEACHERS,
                  action: ACTION.READ,
                  pageTitle: 'Professores',
                  breadcrumb: [
                    { text: 'Cadastros', active: true },
                    { text: 'Professores', active: true },
                  ],
                },
              },
              {
                path: 'trash',
                name: 'listProfessorAdminTrash',
                component: () => import('@/views/pages/records/teachers/list/trash/Index.vue'),
                meta: {
                  resource: PERMISSION.GENERAL.MANAGE_TEACHERS,
                  action: ACTION.READ,
                  pageTitle: 'Professores',
                  breadcrumb: [
                    { text: 'Cadastros', active: true },
                    { text: 'Professores', active: true },
                  ],
                },
              },
            ],
          },
          {
            path: 'create',
            name: 'createProfessorAdmin',
            component: () => import('@/views/pages/records/teachers/create/CreateProfessor.vue'),
            meta: {
              navActiveLink: 'listProfessorAdminOverview',
              resource: PERMISSION.GENERAL.MANAGE_TEACHERS,
              action: ACTION.CREATE,
            },
          },
          {
            path: 'edit/:teacherId',
            name: 'editProfessorAdmin',
            component: () => import('@/views/pages/records/teachers/create/CreateProfessor.vue'),
            meta: {
              navActiveLink: 'listProfessorAdminOverview',
              resource: PERMISSION.GENERAL.MANAGE_TEACHERS,
              action: ACTION.UPDATE,
            },
          },
          {
            path: 'import',
            name: 'importProfessorAdmin',
            component: () => import('@/views/pages/records/teachers/import/ImportProfessors.vue'),
            meta: {
              pageTitle: 'Importar Cadastros',
              breadcrumb: [
                { text: 'Cadastros', active: true },
                { text: 'Professores', to: { name: 'listProfessorAdminOverview' } },
                { text: 'Importar Cadastros', active: true },
              ],
              navActiveLink: 'listProfessorAdminOverview',
              resource: PERMISSION.GENERAL.BETA_FEATURES,
              action: ACTION.CREATE,
            },
          },
        ],
      },
      {
        path: 'director',
        name: 'DirectorAdmin',
        redirect: '/admin/records/director/list',
        component: () => import('@/views/pages/admin-context/records/directors/DirectorsRoot.vue'),
        children: [
          {
            path: 'list',
            name: 'listDirectorAdmin',
            component: () => import('@/views/pages/records/managers/list/Index.vue'),
            meta: {
              importButton: {
                text: 'Importar Cadastros',
                click: () => router.push({ name: 'importDirectorAdmin' }),
                permissions: {
                  resource: PERMISSION.GENERAL.BETA_FEATURES,
                  action: ACTION.CREATE,
                },
              },
              pageTitle: 'Diretores',
              breadcrumb: [
                { text: 'Cadastros', active: true },
                { text: 'Diretores', active: true },
              ],
              resource: PERMISSION.GENERAL.MANAGE_MANAGERS,
              action: ACTION.READ,
            },
            children: [
              {
                path: 'overview',
                name: 'listDirectorAdminOverview',
                component: () => import('@/views/pages/records/managers/list/overview/Index.vue'),
                meta: {
                  resource: PERMISSION.GENERAL.MANAGE_MANAGERS,
                  action: ACTION.READ,
                  pageTitle: 'Diretores',
                  breadcrumb: [
                    { text: 'Cadastros', active: true },
                    { text: 'Diretores', active: true },
                  ],
                },
              },
              {
                path: 'trash',
                name: 'listDirectorAdminTrash',
                component: () => import('@/views/pages/records/managers/list/trash/Index.vue'),
                meta: {
                  resource: PERMISSION.GENERAL.MANAGE_MANAGERS,
                  action: ACTION.READ,
                  pageTitle: 'Turmas',
                  navActiveLink: 'listDirectorAdminOverview',
                  breadcrumb: [
                    { text: 'Cadastros', active: true },
                    { text: 'Diretores', active: true },
                  ],
                },
              },
            ],
          },

          {
            path: 'import',
            name: 'importDirectorAdmin',
            component: () =>
              import('@/views/pages/admin-context/records/directors/import/ImportDirector.vue'),
            meta: {
              pageTitle: 'Importar Cadastros',
              breadcrumb: [
                { text: 'Cadastros', active: true },
                { text: 'Diretores', to: { name: 'listDirectorAdminOverview' } },
                { text: 'Importar Cadastros', active: true },
              ],
              navActiveLink: 'listDirectorAdminOverview',
              resource: PERMISSION.GENERAL.BETA_FEATURES,
              action: ACTION.CREATE,
            },
          },

          {
            path: 'import/check',
            name: 'listImportedDirectors',
            component: () =>
              import(
                '@/views/pages/admin-context/records/directors/import/ListImportedDirector.vue'
              ),
            meta: {
              pageTitle: 'Importar Cadastros',
              breadcrumb: [
                { text: 'Cadastros', active: true },
                { text: 'Diretores', to: { name: 'listDirectorAdminOverview' } },
                { text: 'Importar Cadastros', to: { name: 'importDirectorAdmin' } },
                { text: 'Check', active: true },
              ],
              navActiveLink: 'listDirectorAdminOverview',
              resource: PERMISSION.GENERAL.BETA_FEATURES,
              action: ACTION.CREATE,
            },
          },
          {
            path: 'importDirectorView',
            name: 'listImportDirectorView',
            component: () =>
              import('@/views/pages/admin-context/records/directors/import/importDirectorView.vue'),
            meta: {
              pageTitle: 'Importar Cadastros',
              breadcrumb: [
                { text: 'Cadastros', active: true },
                { text: 'Diretores', to: { name: 'listDirectorAdminOverview' } },
                {
                  text: 'Importar Cadastros',
                  active: true,
                },
              ],
              navActiveLink: 'listDirectorAdminOverview',
              resource: PERMISSION.GENERAL.BETA_FEATURES,
              action: ACTION.CREATE,
            },
          },
        ],
      },
      {
        path: 'classes',
        name: 'ClassesAdmin',
        redirect: '/admin/records/classes/list',
        component: () => import('@/views/pages/admin-context/records/classes/ClassesRoot.vue'),
        children: [
          {
            path: 'list',
            name: 'listClassesAdmin',
            component: () => import('@/views/pages/records/classes/list/index.vue'),
            meta: {
              resource: PERMISSION.GENERAL.MANAGE_CLASSES,
              action: ACTION.READ,
              pageTitle: 'Turmas',
              breadcrumb: [
                { text: 'Cadastros', active: true },
                { text: 'Turmas', active: true },
              ],
            },
            children: [
              {
                path: 'overview',
                name: 'listClassesAdminOverview',
                component: () => import('@/views/pages/records/classes/list/overview/Index.vue'),
                meta: {
                  resource: PERMISSION.GENERAL.MANAGE_CLASSES,
                  action: ACTION.READ,
                  pageTitle: 'Turmas',
                  breadcrumb: [
                    { text: 'Cadastros', active: true },
                    { text: 'Turmas', active: true },
                  ],
                },
              },
              {
                path: 'trash',
                name: 'listClassesAdminTrash',
                component: () => import('@/views/pages/records/classes/list/trash/Index.vue'),
                meta: {
                  resource: PERMISSION.GENERAL.MANAGE_CLASSES,
                  action: ACTION.READ,
                  navActiveLink: 'listClassesAdminOverview',
                  pageTitle: 'Turmas',
                  breadcrumb: [
                    { text: 'Cadastros', active: true },
                    { text: 'Turmas', active: true },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        path: 'coordinators',
        name: 'CoordinatorAdmin',
        redirect: '/admin/records/coordinators/list',
        component: () =>
          import('@/views/pages/admin-context/records/coordinators/CoordinatorsRoot.vue'),
        children: [
          {
            path: 'list',
            name: 'listCoordinatorsAdmin',
            component: () => import('@/views/pages/records/coordinators/list/Index.vue'),
            meta: {
              pageTitle: 'Coordenadores',
              breadcrumb: [
                { text: 'Cadastros', active: true },
                { text: 'Coordenadores', active: true },
              ],
              resource: PERMISSION.GENERAL.MANAGE_COORDINATORS,
              action: ACTION.READ,
            },
            children: [
              {
                path: 'overview',
                name: 'listCoordinatorsAdminOverview',
                component: () =>
                  import('@/views/pages/records/coordinators/list/overview/Index.vue'),
                meta: {
                  resource: PERMISSION.GENERAL.MANAGE_COORDINATORS,
                  action: ACTION.READ,
                  pageTitle: 'Coordenadores',
                  breadcrumb: [
                    { text: 'Cadastros', active: true },
                    { text: 'Coordenadores', active: true },
                  ],
                },
              },
              {
                path: 'trash',
                name: 'listCoordinatorsAdminTrash',
                component: () => import('@/views/pages/records/coordinators/list/trash/Index.vue'),
                meta: {
                  resource: PERMISSION.GENERAL.MANAGE_COORDINATORS,
                  action: ACTION.READ,
                  navActiveLink: 'listCoordinatorsAdminOverview',
                  pageTitle: 'Coordenadores',
                  breadcrumb: [
                    { text: 'Cadastros', active: true },
                    { text: 'Coordenadores', active: true },
                  ],
                },
              },
            ],
          },
          {
            path: 'import',
            name: 'importCoordinatorsAdmin',
            component: () =>
              import(
                '@/views/pages/admin-context/records/coordinators/import/ImportCoordinators.vue'
              ),
            meta: {
              pageTitle: 'Importar Cadastros',
              breadcrumb: [
                { text: 'Cadastros', active: true },
                { text: 'Coordenadores', to: { name: 'listCoordinatorsAdminOverview' } },
                { text: 'Importar Cadastros', active: true },
              ],
              navActiveLink: 'listCoordinatorsAdminOverview',
              resource: PERMISSION.GENERAL.MANAGE_STUDENTS,
              action: ACTION.CREATE,
            },
          },
        ],
      },

      {
        path: '/transfer-students',
        name: 'transferStudent',
        component: () => import('@/views/pages/records/students/transferStudents/Index.vue'),
        meta: {
          pageTitle: 'Transferir Alunos',
          breadcrumb: [
            { text: 'Cadastros', active: true },
            { text: 'Transferir Alunos', active: true },
          ],
          resource: PERMISSION.GENERAL.MANAGE_INSTITUTIONS,
          action: ACTION.READ,
        },
      },
      {
        path: 'pdf',
        name: 'recordPDF',
        redirect: '/admin/records/pdf',
        component: () => import('@/components/PDFs/PDFRoot.vue'),
        children: [
          {
            path: 'accessLetters',
            name: 'accessLetters',
            component: () =>
              import('@/views/pages/admin-context/records/PDFGeneration/AccessLetters.vue'),
            meta: {
              layout: 'full',
              pageTitle: 'Troca de Turmas',
              breadcrumb: [
                { text: 'Cadastros', active: true },
                { text: 'Troca de Turmas', active: true },
              ],
              resource: PERMISSION.GENERAL.PDF,
              action: ACTION.READ,
            },
          },
          {
            path: 'studentCard',
            name: 'studentCard',
            component: () => import('@/components/PDFs/CardsList.vue'),
            meta: {
              layout: 'full',
              pageTitle: 'Troca de Turmas',
              breadcrumb: [
                { text: 'Cadastros', active: true },
                { text: 'Troca de Turmas', active: true },
              ],
              resource: PERMISSION.GENERAL.PDF,
              action: ACTION.READ,
            },
          },
          {
            path: 'certificates',
            name: 'certificatesAdmin',
            component: () => import('@/components/PDFs/certificate/CertificateList.vue'),
            meta: {
              layout: 'full',
              pageTitle: 'Troca de Turmas',
              breadcrumb: [
                { text: 'Cadastros', active: true },
                { text: 'Troca de Turmas', active: true },
              ],
              resource: PERMISSION.GENERAL.PDF,
              action: ACTION.READ,
            },
          },
        ],
      },
    ],
  },
  {
    path: '/admin/reports',
    name: 'Reports',
    component: () => import('@/views/pages/admin-context/reports/ReportsRoot.vue'),
    children: [
      {
        path: 'engagement',
        name: 'adminEngagement',
        component: () =>
          import('@/views/pages/admin-context/reports/admin-engagement/AdminEngagement.vue'),
        meta: {
          pageTitle: '',
          resource: PERMISSION.GENERAL.BETA_FEATURES,
          action: ACTION.READ,
          breadcrumb: [
            { text: 'generalReports', active: true },
            { text: 'Visão Geral', active: true },
          ],
        },
      },
      {
        path: 'skills',
        name: 'reportSkills',
        component: () => import('@/views/reports/skills/SkillReportTab.vue'),
        meta: {
          pageTitle: 'Habilidades',
          resource: PERMISSION.GENERAL.ABILITY_REPORT,
          action: ACTION.READ,
          breadcrumb: [
            { text: 'generalReports', active: true },
            { text: 'Habilidades', active: true },
          ],
        },
      },
      {
        path: 'access',
        name: 'Access',
        redirect: '/admin/reports/access',
        component: () => import('@/views/pages/admin-context/reports/access/AccessRoot.vue'),
        children: [
          {
            path: 'list',
            name: 'listReportAccess',
            component: () => import('@/views/pages/admin-context/reports/access/Access.vue'),
            meta: {
              pageTitle: 'Volume de Acessos',
              resource: PERMISSION.MODULE.REPORTS,
              action: ACTION.READ,
              breadcrumb: [
                { text: 'generalReports', active: true },
                { text: 'Volume de Acessos', active: true },
              ],
            },
          },
        ],
      },
      {
        path: 'ranking',
        name: 'RankingOfInsignias',
        redirect: '/admin/reports/ranking',
        component: () => import('@/views/pages/admin-context/reports/ranking/RankingRoot.vue'),
        children: [
          {
            path: 'home',
            name: 'listReportHomeRanking',
            component: () => import('@/views/pages/admin-context/reports/ranking/Ranking.vue'),
            meta: {
              pageTitle: 'Ranking de Conquistas',
              resource: PERMISSION.GENERAL.RANKING_CONQUEST,
              action: ACTION.READ,
              breadcrumb: [
                { text: 'generalReports', active: true },
                { text: 'Ranking de Conquistas', active: true },
              ],
            },
          },
          {
            path: 'islandRanking',
            name: 'islandRanking',
            component: () =>
              import('@/views/pages/admin-context/reports/ranking/IslandRanking.vue'),
            meta: {
              pageTitle: 'Ilhas',
              resource: PERMISSION.GENERAL.RANKING_CONQUEST,
              action: ACTION.READ,
              breadcrumb: [
                { text: 'generalReports', active: true },
                {
                  text: 'Ranking de Conquistas',
                  to: { name: 'listReportHomeRanking' },
                },
                { text: 'Ilhas', active: true },
              ],
              navActiveLink: 'listReportHomeRanking',
            },
          },
          {
            path: 'schoolRanking',
            name: 'schoolRanking',
            component: () =>
              import('@/views/pages/admin-context/reports/ranking/SchoolRanking.vue'),
            meta: {
              pageTitle: 'Missões da Escola',
              resource: PERMISSION.GENERAL.RANKING_CONQUEST,
              action: ACTION.READ,
              breadcrumb: [
                { text: 'generalReports', active: true },
                {
                  text: 'Ranking de Conquistas',
                  to: { name: 'listReportHomeRanking' },
                },
                { text: 'Missões da Escola', active: true },
              ],
              navActiveLink: 'listReportHomeRanking',
            },
          },
          {
            path: 'configSchool',
            name: 'configSchoolRankingSchoolMission',
            component: () =>
              import('@/views/pages/admin-context/reports/ranking/config/RankingConfigSchool.vue'),
            meta: {
              pageTitle: 'Configurar Ranking',
              resource: PERMISSION.GENERAL.RANKING_CONQUEST,
              action: ACTION.READ,
              breadcrumb: [],
              navActiveLink: 'listReportHomeRanking',
            },
            beforeEnter(to, _, next) {
              to.meta.breadcrumb = []

              const { navigate } = setBreadcrumbSelectedRanking()

              to.meta.breadcrumb.push(
                { text: 'generalReports', active: true },
                {
                  text: 'Ranking de Conquistas',
                  to: { name: 'listReportHomeRanking' },
                },
                {
                  text: navigate.breadcrumb.text,
                  to: {
                    name: navigate.to.name,
                    params: { educationSystemId: navigate.to.params.id || null },
                  },
                },
                { text: 'Configurar Ranking', active: true },
              )
              next()
            },
          },
          {
            path: 'configClass',
            name: 'configClassRankingSchoolMision',
            component: () =>
              import('@/views/pages/admin-context/reports/ranking/config/RankingConfigClass.vue'),
            meta: {
              pageTitle: 'Configurar Ranking',
              resource: PERMISSION.GENERAL.RANKING_CONQUEST,
              action: ACTION.READ,
              breadcrumb: [],
              navActiveLink: 'listReportHomeRanking',
            },
            beforeEnter(to, _, next) {
              to.meta.breadcrumb = []

              const { navigate } = setBreadcrumbSelectedRanking()

              to.meta.breadcrumb.push(
                { text: 'generalReports', active: true },
                {
                  text: 'Ranking de Conquistas',
                  to: { name: 'listReportHomeRanking' },
                },
                {
                  text: navigate.breadcrumb.text,
                  to: {
                    name: navigate.to.name,
                    params: { educationSystemId: navigate.to.params.id || null },
                  },
                },
                { text: 'Configurar Ranking', active: true },
              )
              next()
            },
          },
          {
            path: 'educationSystemRanking/:educationSystemId',
            name: 'educationSystemRanking',
            component: () =>
              import('@/views/pages/admin-context/reports/ranking/EducationSystemRanking.vue'),
            meta: {
              pageTitle: 'Sistema de Ensino',
              resource: PERMISSION.GENERAL.RANKING_CONQUEST,
              action: ACTION.READ,
              breadcrumb: [
                { text: 'generalReports', active: true },
                {
                  text: 'Ranking de Conquistas',
                  to: { name: 'listReportHomeRanking' },
                },
                { text: 'Sistema de Ensino', active: true },
              ],
              navActiveLink: 'listReportHomeRanking',
            },
          },
          {
            path: 'configSchool',
            name: 'configSchoolRankingEsducationSystem',
            component: () =>
              import('@/views/pages/admin-context/reports/ranking/config/RankingConfigSchool.vue'),
            meta: {
              pageTitle: 'Configurar Ranking',
              resource: PERMISSION.GENERAL.RANKING_CONQUEST,
              action: ACTION.READ,
              breadcrumb: [],
              navActiveLink: 'listReportHomeRanking',
            },
            beforeEnter(to, _, next) {
              to.meta.breadcrumb = []
              to.meta.breadcrumb.push(
                { text: 'generalReports', active: true },
                {
                  text: 'Ranking de Conquistas',
                  to: { name: 'listReportHomeRanking' },
                },
                { text: 'Sistema de Ensino', to: { name: 'educationSystemRanking' } },
                { text: 'Configurar Ranking', active: true },
              )
              next()
            },
          },
          {
            path: 'configClass',
            name: 'configClassRankingEducationSystem',
            component: () =>
              import('@/views/pages/admin-context/reports/ranking/config/RankingConfigClass.vue'),
            meta: {
              pageTitle: 'Configurar Ranking',
              resource: PERMISSION.GENERAL.RANKING_CONQUEST,
              action: ACTION.READ,
              breadcrumb: [],
              navActiveLink: 'listReportHomeRanking',
            },
            beforeEnter(to, _, next) {
              to.meta.breadcrumb = []
              to.meta.breadcrumb.push(
                { text: 'generalReports', active: true },
                {
                  text: 'Ranking de Conquistas',
                  to: '/admin/reports/ranking/home',
                },
                { text: 'Sistema de Ensino', to: { name: 'educationSystemRanking' } },
                { text: 'Configurar Ranking', active: true },
              )
              next()
            },
          },
          {
            path: 'configSchool',
            name: 'configSchoolRanking',
            component: () =>
              import('@/views/pages/admin-context/reports/ranking/config/RankingConfigSchool.vue'),
            meta: {
              pageTitle: 'Configurar Ranking',
              resource: PERMISSION.GENERAL.RANKING_CONQUEST,
              action: ACTION.READ,
              breadcrumb: [
                { text: 'generalReports', active: true },
                {
                  text: 'Ranking de Conquistas',
                  to: '/admin/reports/ranking/home',
                },
                {
                  text: 'Ilhas',
                  to: { name: 'islandRanking' },
                },
                { text: 'Configurar Ranking', active: true },
              ],
              navActiveLink: 'listReportHomeRanking',
            },
          },
          {
            path: 'configClass',
            name: 'configClassRanking',
            component: () =>
              import('@/views/pages/admin-context/reports/ranking/config/RankingConfigClass.vue'),
            meta: {
              pageTitle: 'Configurar Ranking',
              resource: PERMISSION.GENERAL.RANKING_CONQUEST,
              action: ACTION.READ,
              breadcrumb: [
                { text: 'generalReports', active: true },
                {
                  text: 'Ranking de Conquistas',
                  to: '/admin/reports/ranking/home',
                },
                {
                  text: 'Ilhas',
                  to: { name: 'islandRanking' },
                },
                { text: 'Configurar Ranking', active: true },
              ],
              navActiveLink: 'listReportHomeRanking',
            },
          },
        ],
      },
      {
        path: 'accessMonthly',
        name: 'AccessMonthly',
        redirect: '/admin/reports/accessMonthly',
        component: () =>
          import('@/views/pages/admin-context/reports/accessMonthly/AccessMonthlyRoot.vue'),
        children: [
          {
            path: 'list',
            name: 'listReportAccessMonthlyStudents',
            component: () =>
              import('@/views/pages/admin-context/reports/accessMonthly/AccessMonthly.vue'),
            meta: {
              pageTitle: 'Acessos Mensais Alunos',
              resource: PERMISSION.MODULE.REPORTS,
              action: ACTION.READ,
              breadcrumb: [
                { text: 'generalReports', active: true },
                { text: 'Acessos Mensais Alunos', active: true },
              ],
            },
          },
        ],
      },
      {
        path: 'missions',
        name: 'missions',
        redirect: '/admin/reports/missions',
        component: () => import('@/views/pages/admin-context/reports/missions/MissionsRoot.vue'),
        children: [
          {
            path: 'home',
            name: 'missionsHome',
            component: () => import('@/views/pages/admin-context/reports/missions/Missions.vue'),
            meta: {
              pageTitle: 'Missões e Jogos',
              resource: PERMISSION.MODULE.REPORTS,
              action: ACTION.READ,
              breadcrumb: [
                { text: 'generalReports', active: true },
                { text: 'Missões e Jogos', active: true },
              ],
            },
          },
          {
            path: 'list',
            name: 'listMissionsSchool',
            component: () =>
              import('@/views/pages/admin-context/reports/missions/ListMissions.vue'),
            meta: {
              pageTitle: 'Missões da Escola',
              resource: PERMISSION.MODULE.REPORTS,
              action: ACTION.READ,
              breadcrumb: [
                {
                  text: 'Missões da Escola',
                  active: true,
                },
                {
                  text: 'Missões',
                  active: true,
                },
              ],
              navActiveLink: 'listMissionsSchool',
            },
          },
          {
            path: 'list/institution/',
            name: 'listMissionsSchoolNM',

            component: () =>
              import('@/views/pages/admin-context/reports/missions/ListMissions.vue'),
            meta: {
              pageTitle: 'Missões da Escola',
              resource: PERMISSION.MODULE.REPORTS,
              action: ACTION.READ,
              breadcrumb: [
                {
                  text: 'Missões da Escola',
                  active: true,
                },
                {
                  text: 'Missões',
                  active: true,
                },
              ],
              navActiveLink: 'listMissionsSchool',
            },
          },
          {
            path: 'classes/:classId',
            name: 'listMissionsSchoolByClass',
            component: () =>
              import('@/views/pages/admin-context/reports/missions/ClassesMissions.vue'),
            meta: {
              pageTitle: 'Missões da Classe',
              resource: PERMISSION.MODULE.REPORTS,
              action: ACTION.READ,
              breadcrumb: [
                {
                  text: 'Missões da Escola',
                  active: true,
                },
                {
                  text: 'Missões',
                  to: {
                    name: 'listMissionsSchool',
                  },
                },

                { text: 'Missões da Classe', active: true },
              ],
              navActiveLink: 'listMissionsSchool',
            },
          },
          {
            path: 'classes/:classId/institution/:institutionId',
            name: 'listMissionsSchoolByClassInstitution',
            component: () =>
              import('@/views/pages/admin-context/reports/missions/ClassesMissions.vue'),
            meta: {
              pageTitle: 'Missões da Classe',
              resource: PERMISSION.MODULE.REPORTS,
              action: ACTION.READ,
              breadcrumb: [],
              navActiveLink: 'listMissionsSchoolNM',
            },
            beforeEnter(to, _, next) {
              to.meta.breadcrumb = []
              to.meta.breadcrumb.push(
                {
                  text: 'Missões da Escola',
                  active: true,
                },
                {
                  text: 'Missões',
                  to: {
                    name: 'listMissionsSchoolNM',
                  },
                },

                { text: 'Missões da Classe', active: true },
              )
              next()
            },
          },
          {
            path: 'classes/:classId/guides/:guideId',
            name: 'listReportMissionsDetail',
            component: () =>
              import('@/views/pages/admin-context/reports/missions/ReportMissionsDetail.vue'),
            meta: {
              pageTitle: 'Relatório da Missão',
              resource: PERMISSION.MODULE.REPORTS,
              action: ACTION.READ,
              breadcrumb: [
                {
                  text: 'Missões da Escola',
                  active: true,
                },
                {
                  text: 'Missões',
                  to: {
                    name: 'listMissionsSchool',
                  },
                },

                { text: 'Missões da Classe', to: { name: 'listMissionsSchoolByClass' } },
                { text: 'Relatório da Missão', active: true },
              ],
              navActiveLink: 'listMissionsSchool',
            },
          },
          {
            path: 'classes/:classId/guides/:guideId/institution/:institutionId',
            name: 'listReportMissionsDetailInstitution',
            component: () =>
              import('@/views/pages/admin-context/reports/missions/ReportMissionsDetail.vue'),
            meta: {
              pageTitle: 'Relatório da Missão',
              resource: PERMISSION.MODULE.REPORTS,
              action: ACTION.READ,
              breadcrumb: [],
              navActiveLink: 'listMissionsSchoolNM',
            },
            beforeEnter(to, _, next) {
              to.meta.breadcrumb = []
              to.meta.breadcrumb.push(
                {
                  text: 'Missões da Escola',
                  active: true,
                },
                {
                  text: 'Missões',
                  to: {
                    name: 'listMissionsSchoolNM',
                  },
                },
                {
                  text: 'Missões da Classe',
                  to: {
                    name: 'listMissionsSchoolByClassInstitution',
                  },
                },
                { text: 'Relatório da Missão', active: true },
              )
              next()
            },
          },
          {
            path: 'educationSystem',
            name: 'educationSystemRoot',
            redirect: '/admin/reports/missions/educationSystem/list',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/missions/educationSystem/EducationSystemRoot.vue'
              ),
            children: [
              {
                path: 'list/:EducationSystemId',
                name: 'listEducationSystemMissions',
                component: () =>
                  import(
                    '@/views/pages/admin-context/reports/missions/educationSystem/EducationSystemMissions.vue'
                  ),
                meta: {
                  pageTitle: 'Sistema de Ensino',
                  resource: PERMISSION.MODULE.REPORTS,
                  action: ACTION.READ,
                  breadcrumb: [
                    { text: 'generalReports', active: true },
                    {
                      text: 'Missões e Jogos',
                      to: '/admin/reports/missions/home',
                    },
                    { text: 'Sistema de Ensino', active: true },
                  ],
                  navActiveLink: 'listMissionsSchool',
                },
              },
              {
                path: 'list/:EducationSystemId/institution/:InstitutionId',
                name: 'listEducationSystemMissionsNM',
                component: () =>
                  import(
                    '@/views/pages/admin-context/reports/missions/educationSystem/EducationSystemMissions.vue'
                  ),
                meta: {
                  pageTitle: 'Sistema de Ensino',
                  resource: PERMISSION.MODULE.REPORTS,
                  action: ACTION.READ,
                  breadcrumb: [
                    { text: 'generalReports', active: true },
                    {
                      text: 'Missões e Jogos',
                      to: '/admin/reports/missions/home',
                    },
                    { text: 'Sistema de Ensino', active: true },
                  ],
                  navActiveLink: 'listMissionsSchool',
                },
              },
              {
                path: 'list/:EducationSystemId/class/:classId/institution/:institutionId',
                name: 'educationSystemClassPageNM',
                component: () =>
                  import(
                    '@/views/pages/admin-context/reports/missions/educationSystem/EducationSystemClassPage.vue'
                  ),
                meta: {
                  pageTitle: 'Livros',
                  resource: PERMISSION.MODULE.REPORTS,
                  action: ACTION.READ,
                  breadcrumb: [],
                  navActiveLink: 'listMissionsSchool',
                },
                beforeEnter(to, _, next) {
                  to.meta.breadcrumb = []
                  to.meta.breadcrumb.push(
                    { text: 'generalReports', active: true },
                    {
                      text: 'Missões e Jogos',
                      to: '/admin/reports/missions/home',
                    },
                    {
                      text: 'Sistema de Ensino',
                      to: `/admin/reports/missions/educationSystem/list/${to.params.EducationSystemId}/institution/${to.params.institutionId}`,
                    },
                    { text: 'Livros', active: true },
                  )
                  next()
                },
              },
              {
                path: 'list/:EducationSystemId/class/:classId',
                name: 'educationSystemClassPage',
                component: () =>
                  import(
                    '@/views/pages/admin-context/reports/missions/educationSystem/EducationSystemClassPage.vue'
                  ),
                meta: {
                  pageTitle: 'Livros',
                  resource: PERMISSION.MODULE.REPORTS,
                  action: ACTION.READ,
                  breadcrumb: [],
                  navActiveLink: 'listMissionsSchool',
                },
                beforeEnter(to, _, next) {
                  to.meta.breadcrumb = []
                  to.meta.breadcrumb.push(
                    { text: 'generalReports', active: true },
                    {
                      text: 'Missões e Jogos',
                      to: '/admin/reports/missions/home',
                    },
                    {
                      text: 'Sistema de Ensino',
                      to: `/admin/reports/missions/educationSystem/list/${to.params.EducationSystemId}`,
                    },
                    {
                      text: 'Livros',
                      active: true,
                    },
                  )
                  next()
                },
              },
              {
                path: 'list/:EducationSystemId/class/:classId/book/:bookId',
                name: 'educationSystemBookPage',
                component: () =>
                  import(
                    '@/views/pages/admin-context/reports/missions/educationSystem/EducationSystemBookPage.vue'
                  ),
                meta: {
                  pageTitle: 'Missões',
                  resource: PERMISSION.MODULE.REPORTS,
                  action: ACTION.READ,
                  breadcrumb: [],
                  navActiveLink: 'listMissionsSchool',
                },
                beforeEnter(to, _, next) {
                  to.meta.breadcrumb = []
                  to.meta.breadcrumb.push(
                    { text: 'generalReports', active: true },
                    {
                      text: 'Missões e Jogos',
                      to: '/admin/reports/missions/home',
                    },
                    {
                      text: 'Sistema de Ensino',
                      to: `/admin/reports/missions/educationSystem/list/${to.params.EducationSystemId}`,
                    },
                    {
                      text: 'Livros',
                      to: {
                        name: 'educationSystemClassPage',
                        params: {
                          EducationSystemId: to.params.EducationSystemId,
                          classId: to.params.classId,
                          subjects: to.params.subjects,
                          subjectId: to.params.subjectId,
                        },
                        query: {
                          classTitle: _.query.classTitle,
                          subjectId: _.query.subjectId,
                        },
                      },
                    },
                    {
                      text: 'Missions',
                      plural: true,
                      active: true,
                    },
                  )
                  next()
                },
              },
              {
                path: 'list/:EducationSystemId/class/:classId/book/:bookId/institution/:institutionId',
                name: 'educationSystemBookPageNM',
                component: () =>
                  import(
                    '@/views/pages/admin-context/reports/missions/educationSystem/EducationSystemBookPage.vue'
                  ),
                meta: {
                  pageTitle: 'Missões',
                  resource: PERMISSION.MODULE.REPORTS,
                  action: ACTION.READ,
                  breadcrumb: [],
                  navActiveLink: 'listMissionsSchool',
                },
                beforeEnter(to, _, next) {
                  to.meta.breadcrumb = []
                  to.meta.breadcrumb.push(
                    { text: 'generalReports', active: true },
                    {
                      text: 'Missões e Jogos',
                      to: '/admin/reports/missions/home',
                    },
                    {
                      text: 'Sistema de Ensino',
                      to: `/admin/reports/missions/educationSystem/list/${to.params.EducationSystemId}/institution/${to.params.institutionId}`,
                    },
                    {
                      text: 'Livros',
                      to: `/admin/reports/missions/educationSystem/list/${to.params.EducationSystemId}/class/${to.params.classId}/institution/${to.params.institutionId}`,
                    },
                    { text: 'Missions', plural: true, active: true },
                  )
                  next()
                },
              },
              {
                path: 'list/:EducationSystemId/classes/:classId/book/:bookId/guides/:guideId',
                name: 'educationSytemReportMissionDetail',
                component: () =>
                  import('@/views/pages/admin-context/reports/missions/ReportMissionsDetail.vue'),
                meta: {
                  pageTitle: 'Relatórios da Missão',
                  resource: PERMISSION.MODULE.REPORTS,
                  action: ACTION.READ,
                  breadcrumb: [],
                  navActiveLink: 'listMissionsSchool',
                },
                beforeEnter(to, _, next) {
                  to.meta.breadcrumb = []
                  to.meta.breadcrumb.push(
                    { text: 'generalReports', active: true },
                    {
                      text: 'Missões e Jogos',
                      to: '/admin/reports/missions/home',
                    },
                    {
                      text: 'Sistema de Ensino',
                      to: `/admin/reports/missions/educationSystem/list/${to.params.EducationSystemId}`,
                    },
                    {
                      text: 'Livros',
                      to: `/admin/reports/missions/educationSystem/list/${to.params.EducationSystemId}/class/${to.params.classId}?classTitle=${_.query.classTitle}`,
                    },
                    {
                      text: 'Missions',
                      plural: true,
                      to: `/admin/reports/missions/educationSystem/list/${to.params.EducationSystemId}/class/${to.params.classId}/book/${to.params.bookId}?classTitle=${_.query.classTitle}&subjectId=${_.query.subjectId}`,
                    },
                    { text: 'Relatórios da Missão', active: true },
                  )
                  next()
                },
              },
              {
                path: 'list/:EducationSystemId/classes/:classId/book/:bookId/guides/:guideId/institution/:institutionId',
                name: 'educationSytemReportMissionDetailNM',
                component: () =>
                  import('@/views/pages/admin-context/reports/missions/ReportMissionsDetail.vue'),
                meta: {
                  pageTitle: 'Relatórios da Missão',
                  resource: PERMISSION.MODULE.REPORTS,
                  action: ACTION.READ,
                  breadcrumb: [],
                  navActiveLink: 'listMissionsSchool',
                },
                beforeEnter(to, _, next) {
                  to.meta.breadcrumb = []
                  to.meta.breadcrumb.push(
                    { text: 'generalReports', active: true },
                    {
                      text: 'Missões e Jogos',
                      to: '/admin/reports/missions/home',
                    },
                    {
                      text: 'Sistema de Ensino',
                      to: `/admin/reports/missions/educationSystem/list/${to.params.EducationSystemId}/institution/${to.params.institutionId}`,
                    },
                    {
                      text: 'Livros',
                      to: `/admin/reports/missions/educationSystem/list/${to.params.EducationSystemId}/class/${to.params.classId}/institution/${to.params.institutionId}`,
                    },
                    {
                      text: 'Missions',
                      plural: true,
                      to: `/admin/reports/missions/educationSystem/list/${to.params.EducationSystemId}/class/${to.params.classId}/book/${to.params.bookId}/institution/${to.params.institutionId}`,
                    },
                    { text: 'Relatórios da Missão', active: true },
                  )
                  next()
                },
              },
            ],
          },
        ],
      },
      {
        path: 'studentEvidence',
        name: 'StudentEvidence',
        redirect: '/admin/reports/studentEvidence',
        component: () =>
          import('@/views/pages/admin-context/reports/studentEvidence/StudentEvidenceRoot.vue'),
        children: [
          {
            path: 'filter',
            name: 'listReportStudentEvidence',
            component: () =>
              import('@/views/pages/admin-context/reports/studentEvidence/StudentEvidence.vue'),
            meta: {
              pageTitle: 'Relatórios Alunos',
              resource: PERMISSION.GENERAL.STUDENT_EVIDENCE,
              action: ACTION.READ,
              breadcrumb: [
                { text: 'generalReports', active: true },
                { text: 'Evidências Alunos', active: true },
              ],
            },
          },
          {
            path: 'studentEvidencesPDFView',
            name: 'studentEvidencesPDFView',
            component: () =>
              import('@/views/pages/admin-context/reports/studentEvidence/pdf/EvidencePDFRoot.vue'),
            children: [
              {
                path: 'studentEvidencePDF',
                name: 'studentEvidencePDF',
                component: () =>
                  import('@/components/student-evidence-report/StudentEvidenceReportPDF.vue'),
                meta: {
                  resource: PERMISSION.GENERAL.STUDENT_EVIDENCE,
                  action: ACTION.READ,
                  layout: 'full',
                },
              },
            ],
          },
        ],
      },
      {
        path: 'schoolEvidence',
        name: 'schoolEvidence',
        redirect: '/admin/reports/schoolEvidence',
        component: () =>
          import('@/views/pages/admin-context/reports/schoolEvidence/SchoolEvidenceRoot.vue'),
        children: [
          {
            path: 'filter',
            name: 'listReportSchoolEvidence',
            component: () =>
              import('@/views/pages/admin-context/reports/schoolEvidence/SchoolEvidence.vue'),
            meta: {
              pageTitle: 'Evidências Escolas',
              resource: PERMISSION.MODULE.REPORTS,
              action: ACTION.READ,
              breadcrumb: [
                { text: 'generalReports', active: true },
                { text: 'Evidências Escolas', active: true },
              ],
            },
          },
          {
            path: 'schoolEvidencesPDFView',
            name: 'schoolEvidencesPDFView',
            component: () =>
              import(
                '@/views/pages/admin-context/reports/schoolEvidence/pdf/SchoolEvidencePDFRoot.vue'
              ),
            children: [
              {
                path: 'schoolEvidencePDF',
                name: 'schoolEvidencePDF',
                component: () =>
                  import(
                    '@/views/pages/admin-context/reports/schoolEvidence/pdf/SchoolEvidencePDF.vue'
                  ),
                meta: {
                  resource: PERMISSION.MODULE.REPORTS,
                  action: ACTION.READ,
                  layout: 'full',
                },
              },
            ],
          },
        ],
      },
      ...teachersAccessRoutes,
    ],
  },

  {
    path: '/supportMaterials',
    name: 'supportMaterials',
    component: () => import('@/views/SupportMaterials.vue'),
    meta: {
      pageTitle: 'Ajudas e Materiais',
      resource: PERMISSION.GENERAL.SUPPORT_MATERIALS,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Ajudas e Materiais',
          active: true,
        },
      ],
    },
  },
  {
    path: '/management',
    name: 'managementIndex',
    component: () => import('@/views/management/ManagementIndex.vue'),
    meta: {
      navActiveLink: 'modulesManagement',
      resource: PERMISSION.GENERAL.MODULE_MANAGEMENT,
      action: ACTION.READ,
      pageTitle: 'Gerenciador',
    },
    children: [
      {
        path: 'modules',
        name: 'modulesManagement',
        component: () => import('@/views/management/modules/Index.vue'),
        meta: {
          navActiveLink: 'modulesManagement',
          resource: PERMISSION.GENERAL.MODULE_MANAGEMENT,
          action: ACTION.READ,
          pageTitle: 'Módulos',
          tabIndex: 0,
          breadcrumb: [
            {
              text: 'Gerenciador',
              active: true,
            },
          ],
        },
      },
    ],
  },
]
