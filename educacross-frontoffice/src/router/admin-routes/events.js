import { ACTION, PERMISSION } from '@/consts/permissions.js'

export default {
  path: '/events',
  name: 'events',
  redirect: '/events/',
  component: () => import('@/views/events/EventsRoot.vue'),
  children: [
    {
      path: '/',
      name: 'eventsList',
      component: () => import('@/views/events/list/EventsList.vue'),
      meta: {
        resource: PERMISSION.MODULE.EVENTS,
        action: ACTION.READ,
        pageTitle: 'Eventos',
        breadcrumb: [
          {
            text: 'Eventos',
            active: true,
          },
        ],
      },
    },
    {
      path: '/event/:eventId',
      name: 'eventReport',
      component: () => import('@/views/events/reports/event-report/index.vue'),
      meta: {
        resource: PERMISSION.MODULE.EVENTS,
        action: ACTION.READ,
        pageTitle: 'Relatório do Evento',
        breadcrumb: [
          {
            text: 'Eventos',
            to: { name: 'eventsList' },
          },
          {
            text: 'Escolas',
            active: true,
          },
        ],
      },
    },
    // for network manager
    {
      path: '/event/:eventId/institution/:institutionId',
      name: 'eventInstitution',
      component: () => import('@/views/events/reports/institution-detail/index.vue'),
      meta: {
        resource: PERMISSION.MODULE.EVENTS,
        action: ACTION.READ,
        pageTitle: 'Relatório do evento na Escola',
        breadcrumb: [
          {
            text: 'Eventos',
            to: { name: 'eventsList' },
          },
          {
            text: 'Escolas',
            to: {
              name: 'eventReport',
            },
          },
          {
            text: 'Turmas',
            active: true,
          },
        ],
      },
    },
    {
      path: '/event/:eventId/institution',
      name: 'eventInstitutionNoId',
      component: () => import('@/views/events/reports/institution-detail/index.vue'),
      meta: {
        resource: PERMISSION.MODULE.EVENTS,
        action: ACTION.READ,
        pageTitle: 'Relatório do evento na Escola',
        breadcrumb: [
          {
            text: 'Eventos',
            to: { name: 'eventsList' },
          },
          {
            text: 'Turmas',
            active: true,
          },
        ],
      },
    },
    // for network manager
    {
      path: '/event/:eventId/institution/:institutionId/class/:classId',
      name: 'eventClassReportNetwork',
      component: () => import('@/views/events/reports/classe-detail/index.vue'),
      meta: {
        resource: PERMISSION.MODULE.EVENTS,
        action: ACTION.READ,
        pageTitle: 'Relatório do evento na Escola',
        breadcrumb: [
          {
            text: 'Eventos',
            to: { name: 'eventsList' },
          },
          {
            text: 'Escolas',
            to: {
              name: 'eventReport',
            },
          },
          {
            text: 'Turmas',
            to: {
              name: 'eventInstitution',
            },
          },
          {
            text: 'Alunos',
            active: true,
          },
        ],
      },
    },
    {
      path: '/event/:eventId/institution/class/:classId',
      name: 'eventClassReport',
      component: () => import('@/views/events/reports/classe-detail/index.vue'),
      meta: {
        resource: PERMISSION.MODULE.EVENTS,
        action: ACTION.READ,
        pageTitle: 'Relatório do evento na Escola',
        breadcrumb: [
          {
            text: 'Eventos',
            to: { name: 'eventsList' },
          },
          {
            text: 'Turmas',
            to: { name: 'eventInstitutionNoId' },
          },
          {
            text: 'Alunos',
            active: true,
          },
        ],
      },
    },
    // RELATORIO DE RESULTADOS - ROTAS GESTOR DE REDE
    {
      path: '/event/:eventId/results/institutions',
      name: 'resultsReportRoot',
      component: () => import('@/views/events/results-report/institutions-list/Index.vue'),
      meta: {
        resource: PERMISSION.MODULE.EVENTS,
        action: ACTION.READ,
        pageTitle: '',
        breadcrumb: [
          {
            text: 'Eventos',
            to: { name: 'eventsList' },
          },
          {
            text: 'Evento',
            active: true,
          },
        ],
      },
      children: [
        {
          path: 'participation',
          name: 'resultsReportNetworkManagerInstitutionsParticipation',
          component: () =>
            import('@/views/events/results-report/institutions-list/participation/Index.vue'),
          meta: {
            navActiveLink: 'events',
            resource: PERMISSION.MODULE.EVENTS,
            action: ACTION.READ,
            pageTitle: '',
            tabIndex: 0,
            breadcrumb: [
              {
                text: 'Eventos',
                to: {
                  name: 'events',
                },
              },
              {
                text: 'Evento',
                active: true,
              },
            ],
          },
        },
        {
          path: 'performance',
          name: 'resultsReportNetworkManagerInstitutionsPerformance',
          component: () =>
            import('@/views/events/results-report/institutions-list/performance/Index.vue'),
          meta: {
            navActiveLink: 'events',
            resource: PERMISSION.MODULE.EVENTS,
            action: ACTION.READ,
            pageTitle: '',
            tabIndex: 1,
            breadcrumb: [
              {
                text: 'Eventos',
                to: {
                  name: 'events',
                },
              },
              {
                text: 'Evento',
                active: true,
              },
            ],
          },
        },
      ],
    },
    {
      path: '/event/:eventId/results/institutions/:institutionId/classes',
      name: 'resultsReportNetworkManagerClasses',
      component: () => import('@/views/events/results-report/institution-details/Index.vue'),
      meta: {
        resource: PERMISSION.MODULE.EVENTS,
        action: ACTION.READ,
        pageTitle: '',
        breadcrumb: [
          {
            text: 'Eventos',
            to: { name: 'eventsList' },
          },
          {
            text: 'Evento',
          },
          {
            text: 'Escola',
            active: true,
          },
        ],
      },
      children: [
        {
          path: 'participation',
          name: 'resultsReportNetworkManagerClassesParticipation',
          component: () =>
            import('@/views/events/results-report/institution-details/participation/Index.vue'),
          meta: {
            navActiveLink: 'events',
            resource: PERMISSION.MODULE.EVENTS,
            action: ACTION.READ,
            pageTitle: '',
            tabIndex: 0,
            breadcrumb: [
              {
                text: 'Eventos',
                to: {
                  name: 'events',
                },
              },
              {
                text: 'Evento',
                to: { name: 'resultsReportNetworkManagerInstitutionsParticipation' },
              },
              {
                text: 'Escola',
                active: true,
              },
            ],
          },
        },
        {
          path: 'performance',
          name: 'resultsReportNetworkManagerClassesPerformance',
          component: () =>
            import('@/views/events/results-report/institution-details/performance/Index.vue'),
          meta: {
            navActiveLink: 'events',
            resource: PERMISSION.MODULE.EVENTS,
            action: ACTION.READ,
            pageTitle: '',
            tabIndex: 1,
            breadcrumb: [
              {
                text: 'Eventos',
                to: {
                  name: 'events',
                },
              },
              {
                text: 'Evento',
                to: { name: 'resultsReportNetworkManagerInstitutionsParticipation' },
              },
              {
                text: 'Escola',
                active: true,
              },
            ],
          },
        },
      ],
    },
    {
      path: '/event/:eventId/results/institutions/:institutionId/classes/:classId/students',
      name: 'resultsReportNetworkManagerStudents',
      component: () => import('@/views/events/results-report/class-details/Index.vue'),
      meta: {
        resource: PERMISSION.MODULE.EVENTS,
        action: ACTION.READ,
        pageTitle: '',
        breadcrumb: [
          {
            text: 'Eventos',
            to: { name: 'eventsList' },
          },
          {
            text: 'Evento',
          },
          {
            text: 'Escola',
            active: true,
          },
        ],
      },
      children: [
        {
          path: 'participation',
          name: 'resultsReportNetworkManagerStudentsParticipation',
          component: () =>
            import('@/views/events/results-report/class-details/participation/Index.vue'),
          meta: {
            navActiveLink: 'events',
            resource: PERMISSION.MODULE.EVENTS,
            action: ACTION.READ,
            pageTitle: '',
            tabIndex: 0,
            breadcrumb: [
              {
                text: 'Eventos',
                to: {
                  name: 'events',
                },
              },
              {
                text: 'Evento',
                to: { name: 'resultsReportNetworkManagerInstitutionsParticipation' },
              },
              {
                text: 'Escola',
                to: { name: 'resultsReportNetworkManagerClassesParticipation' },
              },
              {
                text: 'Turma',
                active: true,
              },
            ],
          },
        },
        {
          path: 'performance',
          name: 'resultsReportNetworkManagerStudentsPerformance',
          component: () =>
            import('@/views/events/results-report/class-details/performance/Index.vue'),
          meta: {
            navActiveLink: 'events',
            resource: PERMISSION.MODULE.EVENTS,
            action: ACTION.READ,
            pageTitle: '',
            tabIndex: 1,
            breadcrumb: [
              {
                text: 'Eventos',
                to: {
                  name: 'events',
                },
              },
              {
                text: 'Evento',
                to: { name: 'resultsReportNetworkManagerInstitutionsParticipation' },
              },
              {
                text: 'Escola',
                to: { name: 'resultsReportNetworkManagerClassesParticipation' },
              },
              {
                text: 'Turma',
                active: true,
              },
            ],
          },
        },
      ],
    },
    // RELATORIO DE RESULTADOS - ROTAS ADMIN
    {
      path: '/event/:eventId/results/classes',
      name: 'resultsReportAdminClasses',
      component: () => import('@/views/events/results-report/institution-details/Index.vue'),
      meta: {
        resource: PERMISSION.MODULE.EVENTS,
        action: ACTION.READ,
        pageTitle: '',
        breadcrumb: [
          {
            text: 'Eventos',
            to: { name: 'eventsList' },
          },
          {
            text: 'Evento',
            active: true,
          },
        ],
      },
      children: [
        {
          path: 'participation',
          name: 'resultsReportAdminClassesParticipation',
          component: () =>
            import('@/views/events/results-report/institution-details/participation/Index.vue'),
          meta: {
            navActiveLink: 'events',
            resource: PERMISSION.MODULE.EVENTS,
            action: ACTION.READ,
            pageTitle: '',
            tabIndex: 0,
            breadcrumb: [
              {
                text: 'Eventos',
                to: {
                  name: 'events',
                },
              },
              {
                text: 'Evento',
                active: true,
              },
            ],
          },
        },
        {
          path: 'performance',
          name: 'resultsReportAdminClassesPerformance',
          component: () =>
            import('@/views/events/results-report/institution-details/performance/Index.vue'),
          meta: {
            navActiveLink: 'events',
            resource: PERMISSION.MODULE.EVENTS,
            action: ACTION.READ,
            pageTitle: '',
            tabIndex: 1,
            breadcrumb: [
              {
                text: 'Eventos',
                to: {
                  name: 'events',
                },
              },
              {
                text: 'Evento',
                active: true,
              },
            ],
          },
        },
      ],
    },
    {
      path: '/event/:eventId/results/classes/:classId/students',
      name: 'resultsReportAdminStudents',
      component: () => import('@/views/events/results-report/class-details/Index.vue'),
      meta: {
        resource: PERMISSION.MODULE.EVENTS,
        action: ACTION.READ,
        pageTitle: '',
        breadcrumb: [
          {
            text: 'Eventos',
            to: { name: 'eventsList' },
          },
          {
            text: 'Evento',
            to: { name: 'resultsReportAdminInstutionDetails' },
          },
          {
            text: 'Turma',
            active: true,
          },
        ],
      },
      children: [
        {
          path: 'participation',
          name: 'resultsReportAdminStudentsParticipation',
          component: () =>
            import('@/views/events/results-report/class-details/participation/Index.vue'),
          meta: {
            navActiveLink: 'events',
            resource: PERMISSION.MODULE.EVENTS,
            action: ACTION.READ,
            pageTitle: '',
            tabIndex: 0,
            breadcrumb: [
              {
                text: 'Eventos',
                to: {
                  name: 'events',
                },
              },
              {
                text: 'Evento',
                to: { name: 'resultsReportAdminClassesParticipation' },
              },
              {
                text: 'Turma',
                active: true,
              },
            ],
          },
        },
        {
          path: 'performance',
          name: 'resultsReportAdminStudentsPerformance',
          component: () =>
            import('@/views/events/results-report/class-details/performance/Index.vue'),
          meta: {
            navActiveLink: 'events',
            resource: PERMISSION.MODULE.EVENTS,
            action: ACTION.READ,
            pageTitle: '',
            tabIndex: 1,
            breadcrumb: [
              {
                text: 'Eventos',
                to: {
                  name: 'events',
                },
              },
              {
                text: 'Evento',
                to: { name: 'resultsReportAdminClassesParticipation' },
              },
              {
                text: 'Turma',
                active: true,
              },
            ],
          },
        },
      ],
    },
    // RANKING
    {
      path: '/event/:eventId/institution/ranking/',
      name: 'eventRanking',
      component: () => import('@/views/events/ranking/index.vue'),
      meta: {
        resource: PERMISSION.MODULE.EVENTS,
        action: ACTION.READ,
        pageTitle: '',
        breadcrumb: [
          {
            text: 'Eventos',
            to: { name: 'eventsList' },
          },
          {
            text: 'Evento',
            active: true,
          },
          {
            text: 'Ranking',
            active: true,
          },
        ],
      },
      children: [
        {
          path: 'schools',
          name: 'eventRankingInstitutionSchool',
          component: () => import('@/views/events/ranking/schools/EventsRankingSchoolsIndex.vue'),
          meta: {
            navActiveLink: 'events',
            resource: PERMISSION.MODULE.EVENTS,
            action: ACTION.READ,
            pageTitle: 'Escolas',
            tabIndex: 0,
            breadcrumb: [
              {
                text: 'Eventos',
                to: { name: 'eventsList' },
              },
              {
                text: 'Evento',
                active: true,
              },
              {
                text: 'Ranking',
                active: true,
              },
            ],
          },
        },
        {
          path: 'students',
          name: 'eventRankingInstitutionStudents',
          component: () => import('@/views/events/ranking/students/EventsRankingStudenIndex.vue'),
          meta: {
            navActiveLink: 'events',
            resource: PERMISSION.MODULE.EVENTS,
            action: ACTION.READ,
            pageTitle: 'Alunos',
            tabIndex: 1,
            breadcrumb: [
              {
                text: 'Eventos',
                to: { name: 'eventsList' },
              },
              {
                text: 'Evento',
                active: true,
              },
              {
                text: 'Ranking',
                active: true,
              },
            ],
          },
        },
      ],
    },
    // Relatório Individual
    {
      path: '/event/:eventId/ranking',
      name: 'eventRankingStudents',
      component: () => import('@/views/events/ranking/students/EventsRankingStudenIndex.vue'),
      meta: {
        resource: PERMISSION.MODULE.EVENTS,
        action: ACTION.READ,
        pageTitle: '',
        breadcrumb: [
          {
            text: 'Eventos',
            to: { name: 'eventsList' },
          },
          {
            text: 'Evento',
            active: true,
          },
          {
            text: 'Ranking',
            active: true,
          },
        ],
      },
    },
    {
      path: '/event/:eventId/certificates',
      name: 'eventCertificates',
      component: () => import('@/views/events/certificate/list/CertificateListIndex.vue'),
      meta: {
        resource: PERMISSION.MODULE.EVENTS,
        action: ACTION.READ,
        pageTitle: 'Relatório do evento na Escola',
        breadcrumb: [
          {
            text: 'Eventos',
            to: { name: 'eventsList' },
          },
          {
            text: 'Evento',
            active: true,
          },
          {
            text: 'Certificados',
            active: true,
          },
        ],
      },
    },
    {
      path: '/event/:eventId/certificates/performances',
      name: 'eventCertificatesPDFRoot',
      component: () => import('@/components/PDFs/PDFRoot.vue'),
      meta: {
        resource: PERMISSION.MODULE.EVENTS,
        action: ACTION.READ,
      },
      children: [
        {
          path: 'performance',
          name: 'eventCertificatesPDFPerformance',
          component: () => import('@/components/PDFs/event/performance/PerformancePDFList.vue'),
          meta: {
            layout: 'full',
          },
        },
        {
          path: 'certificate',
          name: 'eventCertificatesPDFCertificate',
          component: () => import('@/components/PDFs/event/certificate/CertificateList.vue'),
          meta: {
            layout: 'full',
          },
        },
      ],
    },
    {
      path: '/events/:eventId/individual-report',
      name: 'individualReport',
      component: () => import('@/views/events/individual-report/Index.vue'),
      meta: {
        resource: PERMISSION.MODULE.EVENTS,
        action: ACTION.READ,
        pageTitle: 'Relatório do evento na Escola',
        breadcrumb: [
          {
            text: 'Eventos',
            to: { name: 'eventsList' },
          },
          {
            text: 'Evento',
            active: true,
          },
          {
            text: 'Relatório Individual',
            active: true,
          },
        ],
      },
    },
    {
      path: '/events/:eventId/individual-report/student/:studentId',
      name: 'individualReportAdminStudent',
      component: () => import('@/views/events/individual-report/student-report/Index.vue'),
      meta: {
        resource: PERMISSION.MODULE.EVENTS,
        action: ACTION.READ,
        pageTitle: 'Relatório do evento na Escola',
        breadcrumb: [
          {
            text: 'Eventos',
            to: { name: 'eventsList' },
          },
          {
            text: 'Evento',
            active: true,
          },
          {
            text: 'Relatório Individual',
            to: { name: 'individualReport' },
          },
          {
            text: 'Aluno',
            active: true,
          },
        ],
      },
    },
  ],
}
