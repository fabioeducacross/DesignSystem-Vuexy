import { ACTION, PERMISSION } from '@/consts/permissions'
import ReadingMeterDetailsEvaluation from '@/views/pages/auditor-context/reading-meter/ReadingMeterDetailsEvaluation.vue'
import ReadingMeterList from '@/views/pages/auditor-context/reading-meter/list/ReadingMeterList.vue'
import ReadingMeterEvaluationRoot from '@/views/pages/reading-mether-evaluation/ReadingMeterEvaluationRoot.vue'

export default [
  {
    path: 'reading-meter-evaluation',
    component: ReadingMeterEvaluationRoot,
    meta: {
      resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
      action: ACTION.READ,
    },
    children: [
      {
        path: '',
        name: 'readingMeterListAuditor',
        component: ReadingMeterList,
        meta: {
          tabIndex: 1,
          resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
          navActiveLink: 'readingMeterListAuditor',
          action: ACTION.READ,
          breadcrumb: [{ text: 'Avaliações' }, { text: 'Fluência Leitora', active: true }],
        },
      },
      {
        path: ':evaluationId/detail',
        name: 'readingMeterDetailsAuditor',
        component: ReadingMeterDetailsEvaluation,
        meta: {
          tabIndex: 1,
          resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
          navActiveLink: 'readingMeterListAuditor',
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Fluência Leitora',
              to: { name: 'readingMeterListAuditor' },
            },
            {
              text: 'Avaliação',
              active: true,
            },
          ],
        },
      },
    ],
  },
  {
    path: '',
    component: () => import('@/views/pages/reading-meter-V2/ReadingMeterRootV2.vue'),
    meta: {
      resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
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
        path: 'reading-fluency-evaluation/:evaluationId/class/:classId/student/:studentId',
        name: 'auditorStudentReport',
        component: () =>
          import('@/views/pages/reading-meter-V2/student-report/StudentReportIndex.vue'),
        meta: {
          tabIndex: 1,
          resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
          navActiveLink: 'readingMeterListAuditor',
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Fluência Leitora',
              to: { name: 'readingMeterListAuditor' },
            },
            {
              text: 'Avaliação',
              to: { name: 'readingMeterDetailsAuditor' },
            },
            {
              text: 'Aluno',
              active: true,
            },
          ],
        },
      },
    ],
  },
]
