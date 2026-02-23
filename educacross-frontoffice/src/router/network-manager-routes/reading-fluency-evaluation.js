import { ACTION, PERMISSION } from '@/consts/permissions'

export default [
  {
    path: '/network-manager/reading-fluency-evaluation',
    component: () => import('@/views/pages/reading-meter-V2/ReadingMeterRootV2.vue'),
    meta: {
      resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
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
    children: [
      // List Evaluations
      {
        path: '',
        name: 'NetworkManagerFluencyV2Evaluations',
        component: () => import('@/views/pages/reading-meter-V2/overview/ReadingMeterV2Index.vue'),
        meta: {
          navActiveLink: 'NetworkManagerFluencyV2Evaluations',
          resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
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
      // Evaluation Institutions
      {
        path: ':evaluationId',
        name: 'NetworkManagerFluencyV2Institutions',
        component: () =>
          import('@/views/pages/reading-meter-V2/schools-report/SchoolsReportIndex.vue'),
        meta: {
          navActiveLink: 'NetworkManagerFluencyV2Evaluations',
          resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Fluência Leitora',
              to: { name: 'NetworkManagerFluencyV2Evaluations' },
            },
            {
              text: 'Avaliação',
              active: true,
            },
          ],
        },
      },
      // Evaluation Classes
      {
        path: ':evaluationId/institution/:institutionId',
        name: 'NetworkManagerFluencyV2Classes',
        component: () => import('@/views/pages/reading-meter-V2/class-report/classReportIndex.vue'),
        meta: {
          navActiveLink: 'NetworkManagerFluencyV2Evaluations',
          resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Fluência Leitora',
              to: { name: 'NetworkManagerFluencyV2Evaluations' },
            },
            {
              text: 'Avaliação',
              to: { name: 'NetworkManagerFluencyV2Institutions' },
            },
            {
              text: 'Escola',
              active: true,
            },
          ],
        },
      },
      // Evaluation Students
      {
        path: ':evaluationId/institution/:institutionId/class/:classId',
        name: 'NetworkManagerFluencyV2Students',
        component: () =>
          import('@/views/pages/reading-meter-V2/evaluation-report/EvaluationReportIndex.vue'),
        meta: {
          navActiveLink: 'NetworkManagerFluencyV2Evaluations',
          resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Fluência Leitora',
              to: { name: 'NetworkManagerFluencyV2Evaluations' },
            },
            {
              text: 'Avaliação',
              to: { name: 'NetworkManagerFluencyV2Institutions' },
            },
            {
              text: 'Escola',
              to: { name: 'NetworkManagerFluencyV2Classes' },
            },
            {
              text: 'Turma',
              active: true,
            },
          ],
        },
      },
      // Evaluation Student Report
      {
        path: ':evaluationId/institution/:institutionId/class/:classId/student/:studentId',
        name: 'NetworkManagerFluencyV2StudentReport',
        component: () =>
          import('@/views/pages/reading-meter-V2/student-report/StudentReportIndex.vue'),
        meta: {
          navActiveLink: 'NetworkManagerFluencyV2Evaluations',
          resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Fluência Leitora',
              to: { name: 'NetworkManagerFluencyV2Evaluations' },
            },
            {
              text: 'Avaliação',
              to: { name: 'NetworkManagerFluencyV2Institutions' },
            },
            {
              text: 'Escola',
              to: { name: 'NetworkManagerFluencyV2Classes' },
            },
            {
              text: 'Turma',
              to: { name: 'NetworkManagerFluencyV2Students' },
            },
            {
              text: 'Aluno',
              active: true,
            },
          ],
        },
      },
      // Auditor Link
      {
        path: 'linkAuditor/:evaluationId',
        name: 'NetworkManagerLinkingAuditorReadingFluency',
        component: () => import('@/views/pages/reading-meter-V2/auditor/EvaluationAuditorList.vue'),
        meta: {
          navActiveLink: 'NetworkManagerFluencyV2Evaluations',
          resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Fluência Leitora',
              to: { name: 'NetworkManagerFluencyV2Evaluations' },
            },
            {
              text: 'Auditoria',
              active: true,
            },
            {
              text: 'Avaliação',
              active: true,
            },
          ],
        },
      },
      // PDF View
      {
        path: 'test',
        component: () => import('@/views/pages/reading-meter-V2/pdf/PDFRoot.vue'),
        meta: {
          resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
          action: ACTION.READ,
          navActiveLink: 'NetworkManagerFluencyV2Evaluations',
        },
        children: [
          {
            path: 'evaluation/:evaluationId',
            name: 'NetworkManagerReadingMeterPDFView',
            component: () =>
              import('@/views/pages/reading-meter-V2/pdf/ReadingMeterPDFContent.vue'),
            meta: {
              layout: 'full',
              resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
              action: ACTION.READ,
              navActiveLink: 'NetworkManagerFluencyV2Evaluations',
              breadcrumb: [
                {
                  text: 'Avaliações',
                  to: { name: 'NetworkManagerFluencyV2Evaluations' },
                },
                {
                  text: 'Visualização do PDF',
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
