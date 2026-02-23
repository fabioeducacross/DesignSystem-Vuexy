import { ACTION, PERMISSION } from '@/consts/permissions'

export default [
  {
    path: '/teacher/reports/evidence-report',
    name: 'TeacherEvidenceReport',
    component: () =>
      import('@/views/pages/teacher-context/reports/evidenceReport/EvidenceReport.vue'),
    meta: {
      pageTitle: 'Relatório de Evidências',
      resource: PERMISSION.MODULE.REPORTS,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'generalReports',
          active: true,
        },
        {
          text: 'Relatório de Evidências',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/student-evidences-pdf-view-teacher',
    name: 'studentEvidencesPDFViewTeacher',
    component: () =>
      import('@/views/pages/admin-context/reports/studentEvidence/pdf/EvidencePDFRoot.vue'),

    children: [
      {
        path: 'studentEvidencePDFTeacher',
        name: 'studentEvidencePDFTeacher',
        component: () =>
          import('@/components/student-evidence-report/StudentEvidenceReportPDF.vue'),
        meta: {
          layout: 'full',
          resource: PERMISSION.MODULE.REPORTS,
          action: ACTION.READ,
        },
      },
    ],
  },
  {
    path: '/teacher/reports/skill-report',
    name: 'TeacherSkillReport',
    component: () => import('@/views/reports/skills/SkillReport.vue'),
    meta: {
      pageTitle: 'Habilidades',
      resource: PERMISSION.MODULE.REPORTS,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'generalReports',
          active: true,
        },
        {
          text: 'Habilidades',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/reports/skill-report/details/:id',
    name: 'TeacherSkillReportDetails',
    component: () =>
      import('@/views/pages/teacher-context/reports/skillReport/details/SkillReportDetails.vue'),
    meta: {
      navActiveLink: 'TeacherSkillReport',
      pageTitle: 'generalReports',
      resource: PERMISSION.MODULE.REPORTS,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'generalReports',
          active: true,
        },
        {
          text: 'Habilidades',
          to: '/teacher/reports/skill-report',
        },
        {
          text: 'Detalhe da Habilidade',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/reports/student-access',
    name: 'studentAccess',
    component: () =>
      import('@/views/pages/teacher-context/reports/studentAccess/StudentAccess.vue'),
    meta: {
      pageTitle: 'Acesso dos Alunos',
      resource: PERMISSION.MODULE.REPORTS,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'generalReports',
          active: true,
        },
        {
          text: 'Acesso dos Alunos',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/records/classes',
    name: 'teacherClasses',
    component: () => import('@/views/pages/teacher-context/records/classes/Index.vue'),
    meta: {
      pageTitle: 'Turmas',
      resource: PERMISSION.GENERAL.TEACHER,
      action: ACTION.READ,

      navActiveLink: 'teacherClasses',
      breadcrumb: [
        {
          text: 'Turmas',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/records/students',
    name: 'teacherStudents',
    component: () => import('@/views/pages/teacher-context/records/students/Students.vue'),
    meta: {
      pageTitle: 'Alunos',
      resource: PERMISSION.GENERAL.TEACHER,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Alunos',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/records/students/import',
    name: 'importStudentTeacher',
    component: () => import('@/views/pages/records/students/import/old/ImportStudents.vue'),
    meta: {
      pageTitle: 'Importar Alunos',
      breadcrumb: [
        { text: 'Alunos', to: { name: 'teacherStudents' } },
        { text: 'Importar Alunos', active: true },
      ],
      navActiveLink: 'teacherStudents',
      resource: PERMISSION.GENERAL.MANAGE_STUDENTS,
      action: ACTION.CREATE,
    },
  },
  {
    path: '/teacher/records/students/importStudentsList',
    name: 'listImportStudentTeacher',
    component: () => import('@/views/pages/records/students/import/old/ListImports.vue'),
    meta: {
      pageTitle: 'Importar Cadastros',
      breadcrumb: [
        { text: 'Alunos', to: { name: 'teacherStudents' } },
        { text: 'Importar Cadastros', to: { name: 'importStudentTeacher' } },
        { text: 'Lista de Importações', active: true },
      ],
      navActiveLink: 'teacherStudents',
      resource: PERMISSION.GENERAL.MANAGE_STUDENTS,
      action: ACTION.CREATE,
    },
  },
  {
    path: '/teacher/records/students/listImportedStudents',
    name: 'listImportedStudentsTeacher',
    component: () => import('@/views/pages/records/students/import/old/ListImportedStudents.vue'),
    meta: {
      pageTitle: 'Lista de Alunos Importados',
      breadcrumb: [
        { text: 'Alunos', to: { name: 'teacherStudents' } },
        { text: 'Importar Cadastros', to: { name: 'importStudentTeacher' } },
        { text: 'Lista de Importações', to: { name: 'listImportStudentTeacher' } },
        { text: 'Lista de Alunos Importados', active: true },
      ],
      navActiveLink: 'teacherStudents',
      resource: PERMISSION.GENERAL.MANAGE_STUDENTS,
      action: ACTION.CREATE,
    },
  },
  {
    path: '/teacher/records/students/importStudentsView',
    name: 'listImportStudentViewTeacher',
    component: () => import('@/views/pages/records/students/import/old/importStudentsView.vue'),
    meta: {
      pageTitle: 'Visualizar Alunos Importados',
      breadcrumb: [
        { text: 'Alunos', to: { name: 'teacherStudents' } },
        { text: 'Importar Cadastros', to: { name: 'importStudentTeacher' } },
        { text: 'Lista de Importações', to: { name: 'listImportStudentTeacher' } },
        { text: 'Visualizar Alunos Importados', active: true },
      ],
      navActiveLink: 'teacherStudents',
      resource: PERMISSION.GENERAL.MANAGE_STUDENTS,
      action: ACTION.CREATE,
    },
  },
  {
    path: '/teacher/records/students/importStudentsResendEmail',
    name: 'listImportStudentsResendEmail',
    component: () =>
      import('@/views/pages/records/students/import/old/importStudentsResendEmail.vue'),
    meta: {
      pageTitle: 'Reenviar E-mails de Confirmação',
      breadcrumb: [
        { text: 'Alunos', to: { name: 'teacherStudents' } },
        { text: 'Importar Cadastros', to: { name: 'importStudentTeacher' } },
        { text: 'Reenviar E-mails de Confirmação', active: true },
      ],
      navActiveLink: 'listStudentAdmin',
      resource: PERMISSION.GENERAL.MANAGE_STUDENTS,
      action: ACTION.CREATE,
    },
  },
  {
    path: '/teacher/records/students/create',
    name: 'createStudentTeacher',
    component: () => import('@/views/pages/teacher-context/records/students/CreateStudent.vue'),
    meta: {
      navActiveLink: 'teacherStudents',
      resource: PERMISSION.GENERAL.MANAGE_STUDENTS,
      action: ACTION.CREATE,
    },
  },
  {
    path: '/teacher/records/students/edit/:studentId',
    name: 'editStudentTeacher',
    component: () => import('@/views/pages/teacher-context/records/students/EditStudent.vue'),
    meta: {
      navActiveLink: 'teacherStudents',
    },
    resource: PERMISSION.GENERAL.MANAGE_STUDENTS,
    action: ACTION.UPDATE,
  },
  {
    path: '/teacher/pdf/',
    component: () => import('@/components/PDFs/PDFRoot.vue'),
    children: [
      {
        path: '/accessLettersTeacher',
        name: 'accessLettersTeacher',
        component: () =>
          import('@/views/pages/teacher-context/records/students/PDF/AccessLetters.vue'),
        meta: {
          layout: 'full',
          resource: PERMISSION.GENERAL.TEACHER,
          action: ACTION.READ,
          breadcrumb: [
            { text: 'Cadastros', active: true },
            { text: 'Troca de turmas', active: true },
          ],
        },
      },
      {
        path: '/card',
        name: 'studentCardTeacher',
        component: () => import('@/components/PDFs/CardsList.vue'),
        meta: {
          layout: 'full',
        },
      },
      {
        path: '/studentReportTeacher',
        name: 'studentReportTeacher',
        component: () =>
          import('@/views/pages/teacher-context/records/students/PDF/report/StudentReport.vue'),
        meta: {
          /* resource: PERMISSION.GENERAL.TEACHER,
          action: ACTION.READ, */
          layout: 'full',
        },
      },
      {
        path: '/certificates',
        name: 'certificates',
        component: () => import('@/components/PDFs/certificate/CertificateList.vue'),
        meta: {
          layout: 'full',
          resource: PERMISSION.GENERAL.TEACHER,
          action: ACTION.READ,
        },
      },
    ],
  },
  {
    path: '/teacher/reports/highfive/missions',
    name: 'teacherHighFive',
    component: () => import('@/views/pages/teacher-context/reports/highFive/TeacherHighFive.vue'),
    meta: {
      resource: PERMISSION.MODULE.HIGH_FIVE,
      action: ACTION.READ,
      pageTitle: 'High Five',
      breadcrumb: [
        {
          text: 'High Five',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/reports/highfive/missions/:missionId',
    name: 'HighFiveMissionReport',
    component: () => import('@/views/pages/teacher-context/reports/missions/MissionReport.vue'),
    meta: {
      resource: PERMISSION.MODULE.HIGH_FIVE,
      action: ACTION.READ,
      pageTitle: 'Relatório da Missão',
      navActiveLink: 'teacherHighFive',
      breadcrumb: [
        {
          text: 'High Five',
          to: { name: 'teacherHighFive' },
        },
        {
          text: 'Relatório da Missão',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/reports/highfive/missions/:missionId/student/:studentId',
    name: 'HighFiveStudentDetailMissionReport',
    component: () =>
      import(
        '@/views/pages/teacher-context/reports/missions/studentDetailMission/StudentDetailMissionReport.vue'
      ),
    meta: {
      pageTitle: 'Detalhes do aluno',
      navActiveLink: 'teacherHighFive',
      resource: PERMISSION.MODULE.HIGH_FIVE,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'High Five',
          to: { name: 'teacherHighFive' },
        },
        {
          text: 'Relatório da Missão',
          to: { name: 'HighFiveMissionReport' },
        },
        {
          text: 'Detalhes do Aluno',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/reports/highfive/missions/:missionId/activity/:activityId',
    name: 'ActivityDetailMissionReportHighFive',
    component: () =>
      import('@/views/pages/teacher-context/reports/missions/ActivityDetailMissionReport.vue'),
    meta: {
      pageTitle: 'Detalhes da Atividade',
      navActiveLink: 'teacherHighFive',
      resource: PERMISSION.MODULE.HIGH_FIVE,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'High Five',
          to: { name: 'teacherHighFive' },
        },
        {
          text: 'Relatório da Missão',
          to: { name: 'HighFiveMissionReport' },
        },
        {
          text: 'Detalhes da Atividade',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/new-missions',
    name: 'newMissionsTeacher',
    component: () => import('@/views/pages/teacher-context/records/missions/NewMissions.vue'),
    meta: {
      pageTitle: 'Criar Missão',
      resource: PERMISSION.MODULE.SCHOOL_MISSIONS,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Missões da Escola',
          active: true,
        },
        {
          text: 'Criar Missão',
          active: true,
        },
      ],
    },
  },

  // Missões
  {
    path: '/teacher/missions',
    name: 'missionList',
    component: () => import('@/views/pages/missions/missions-list/MissionsTab.vue'),
    meta: {
      pageTitle: 'Missões',
      resource: PERMISSION.MODULE.CUSTOM_MISSIONS,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Missões da Escola',
          active: true,
        },
        {
          text: 'Missions',
          plural: true,
          active: true,
        },
      ],
    },
    children: [
      {
        path: 'active',
        name: 'activeMissions',
        component: () => import('@/views/pages/missions/missions-list/list/ListMissionsRoot.vue'),
        meta: {
          navActiveLink: 'activeMissions',
          pageTitle: 'Missões',
          resource: PERMISSION.MODULE.SCHOOL_MISSIONS,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Missões da Escola',
              active: true,
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
        path: 'archived',
        name: 'archivedMission',
        component: () =>
          import('@/views/pages/missions/missions-list/archived/ArchivedMissionsRoot.vue'),
        meta: {
          pageTitle: 'Missões',
          navActiveLink: 'activeMissions',
          resource: PERMISSION.MODULE.SCHOOL_MISSIONS,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Missões da Escola',
              active: true,
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
        name: 'rankingMissions',
        component: () =>
          import('@/views/pages/missions/missions-list/ranking/RankingMissinonsRoot.vue'),
        meta: {
          pageTitle: 'Ranking da missão',
          navActiveLink: 'activeMissions',
          resource: PERMISSION.MODULE.SCHOOL_MISSIONS_ACHIEVEMENT_RANKING,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Missões da Escola',
              active: true,
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

  /*  {
    path: '/teacher/missions-plus',
    name: 'missionListPlus',
    component: () => import('@/views/pages/missions/missions-list-plus/MissionsTab.vue'),
    meta: {
      pageTitle: 'Missões',
      resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Missões da Escola',
        },
        {
          text: 'Missions',
          plural: true,
          active: true,
        },
      ],
    },
    children: [
      {
        path: 'active',
        name: 'activeMissionsPlus',
        component: () =>
          import('@/views/pages/missions/missions-list-plus/list/ListMissionsRoot.vue'),
        meta: {
          navActiveLink: 'activeMissionsPlus',
          pageTitle: 'Missões Plus',
          resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Missões da Escola',
            },
            {
              text: 'Missões Plus',
              active: true,
            },
          ],
        },
      },
      {
        path: 'archived',
        name: 'archivedMissionPlus',
        component: () =>
          import('@/views/pages/missions/missions-list-plus/archived/ArchivedMissionsRoot.vue'),
        meta: {
          pageTitle: 'Missões Plus',
          navActiveLink: 'activeMissionsPlusfeat/EC-6997-mission-list-develop',
          resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Missões da Escola',
            },
            {
              text: 'Missões Plus',
              active: true,
            },
          ],
        },
      },
    ],
  }, */

  {
    path: '/teacher/custom-mission/type/:type',
    name: 'CreateCustomMission',
    component: () => import('@/views/pages/teacher-context/records/missions/CustomMission.vue'),
    meta: {
      navActiveLink: 'newMissionsTeacher',
      pageTitle: 'Missão personalizada',
      resource: PERMISSION.MODULE.CUSTOM_MISSIONS,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Missões da Escola',
          active: true,
        },
        {
          text: 'Criar missão',
          to: { name: 'newMissionsTeacher' },
        },
        {
          text: 'Missão personalizada',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/missions-plus/create',
    name: 'CreateCustomPlusMission',
    component: () =>
      import('@/views/pages/teacher-context/records/missions/customMissionV2/CustomMissionV2.vue'),
    meta: {
      navActiveLink: 'newMissionsTeacher',
      pageTitle: 'Missão plus',
      resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Missões da Escola',
          active: true,
        },
        {
          text: 'Criar Missão',
          to: { name: 'newMissionsTeacher' },
        },
        {
          text: 'Missão Personalizada Plus',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/missions-plus/create/:id',
    name: 'CreateCustomMissionPlusById',
    component: () =>
      import('@/views/pages/teacher-context/records/missions/customMissionV2/CustomMissionV2.vue'),
    meta: {
      navActiveLink: 'newMissionsTeacher',
      pageTitle: 'Missão plus',
      resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Missões da Escola',
          active: true,
        },
        {
          text: 'Criar Missão',
          to: { name: 'newMissionsTeacher' },
        },
        {
          text: 'Missão Personalizada Plus',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/custom-mission/:id',
    name: 'CreateCustomMissionById',
    component: () => import('@/views/pages/teacher-context/records/missions/CustomMission.vue'),
    meta: {
      pageTitle: 'Missão personalizada',
      breadcrumb: [],
      navActiveLink: 'newMissionsTeacher',
    },
    beforeEnter(to, _, next) {
      to.meta.breadcrumb = []
      to.meta.breadcrumb.push(
        {
          text: 'Missões da Escola',
          active: true,
        },
        {
          text: 'Criar missão',
          to: { name: 'newMissionsTeacher' },
        },
        {
          text: 'Missão personalizada',
          active: true,
        },
      )
      next()
    },
  },
  {
    path: '/teacher/missions-plus/edit/:id',
    name: 'EditCustomMissionPlus',
    component: () =>
      import('@/views/pages/teacher-context/records/missions/customMissionV2/CustomMissionV2.vue'),
    meta: {
      pageTitle: 'Missão personalizada',
      breadcrumb: [],
      navActiveLink: 'newMissionsTeacher',
      resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
      action: ACTION.READ,
    },
    beforeEnter(to, _, next) {
      to.meta.breadcrumb = []
      to.meta.breadcrumb.push(
        {
          text: 'Missões da Escola',
          active: true,
        },
        {
          text: 'Editar Missão',
          to: { name: 'newMissionsTeacher' },
        },
        {
          text: 'Missão Personalizada Plus',
          active: true,
        },
      )
      next()
    },
  },
  {
    path: '/teacher/educacross-mission',
    name: 'CreateEducacrossMission',
    component: () =>
      import(
        '@/views/pages/teacher-context/records/missions/educacrossMission/EducacrossMissionRoot.vue'
      ),
    meta: {
      pageTitle: 'Missão Educacross',
      resource: PERMISSION.MODULE.EDUCACROSS_MISSIONS,
      action: ACTION.READ,
      navActiveLink: 'newMissionsTeacher',
    },
    beforeEnter(to, _, next) {
      to.meta.breadcrumb = []
      to.meta.breadcrumb.push(
        {
          text: 'Missões da Escola',
          active: true,
        },
        {
          text: 'Criar missão',
          to: { name: 'newMissionsTeacher' },
        },
        {
          text: 'Missão Educacross',
          active: true,
        },
      )
      next()
    },
  },
  {
    path: '/teacher/inclusion-mission',
    name: 'CreateInclusionMission',
    component: () =>
      import('@/views/pages/teacher-context/records/missions/inclusion/InclusionMissionsRoot.vue'),
    meta: {
      pageTitle: 'Missão inclusiva',
      resource: PERMISSION.MODULE.INCLUSION_GUIDE,
      action: ACTION.READ,
      navActiveLink: 'newMissionsTeacher',
    },
    beforeEnter(to, _, next) {
      to.meta.breadcrumb = []
      to.meta.breadcrumb.push(
        {
          text: 'Missões da Escola',
          active: true,
        },
        {
          text: 'Criar missão',
          to: { name: 'newMissionsTeacher' },
        },
        {
          text: 'Missão inclusiva',
          active: true,
        },
      )
      next()
    },
  },
  {
    path: '/teacher/book-mission',
    name: 'CreateBookMission',
    component: () =>
      import('@/views/pages/teacher-context/records/missions/books/BooksMissionsRoot.vue'),
    meta: {
      pageTitle: 'Missão do livro',
      resource: PERMISSION.MODULE.BOOK_MISSIONS,
      action: ACTION.READ,
      navActiveLink: 'newMissionsTeacher',
    },
    beforeEnter(to, _, next) {
      to.meta.breadcrumb = []
      to.meta.breadcrumb.push(
        {
          text: 'Missões da Escola',
          active: true,
        },
        {
          text: 'Criar missão',
          to: { name: 'newMissionsTeacher' },
        },
        {
          text: 'Missão do livro',
          active: true,
        },
      )
      next()
    },
  },
  {
    path: '/teacher/shared-mission',
    name: 'CreateSharedMission',
    component: () =>
      import('@/views/pages/teacher-context/records/missions/shared/SharedMissionsRoot.vue'),
    meta: {
      pageTitle: 'Missão Compartilhada',
      resource: PERMISSION.MODULE.SHARED_MISSIONS,
      action: ACTION.READ,
      navActiveLink: 'newMissionsTeacher',
    },
    beforeEnter(to, _, next) {
      to.meta.breadcrumb = []
      to.meta.breadcrumb.push(
        {
          text: 'Missões da Escola',
          active: true,
        },
        {
          text: 'Criar missão',
          to: { name: 'newMissionsTeacher' },
        },
        {
          text: 'Missão Compartilhada',
          active: true,
        },
      )
      next()
    },
  },
  {
    path: '/teacher/library',
    name: 'Library',
    component: () => import('@/views/pages/teacher-context/library/LibraryRoot.vue'),
    meta: {
      pageTitle: 'Educateca',
      resource: PERMISSION.GENERAL.TEACHER,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Educateca',
          active: true,
        },
      ],
    },
    children: [
      {
        path: 'meet-games',
        name: 'MeetGames',
        component: () => import('@/views/pages/teacher-context/library/meet-games/MeetGames.vue'),
        meta: {
          pageTitle: 'Conhecer jogos',
          resource: PERMISSION.GENERAL.TEACHER,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Educateca',
              active: true,
            },
          ],
        },
      },
      {
        path: 'meet-books',
        name: 'MeetBooks',
        component: () => import('@/views/pages/teacher-context/library/meet-books/MeetBooks.vue'),
        meta: {
          navActiveLink: 'MeetGames',
          pageTitle: 'Conhecer Livros',
          resource: PERMISSION.MODULE.BOOKLIBRARY,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Educateca',
              active: true,
            },
          ],
        },
      },
      {
        path: 'meet-videos',
        name: 'MeetVideos',
        component: () => import('@/views/pages/teacher-context/library/meet-videos/MeetVideos.vue'),
        meta: {
          pageTitle: 'Conhecer Vídeos',
          resource: PERMISSION.MODULE.MEET_VIDEOS,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Educateca',
              active: true,
            },
          ],
        },
      },
      {
        path: 'meet-musics',
        name: 'MeetMusics',
        component: () => import('@/views/pages/teacher-context/library/meet-musics/MeetMusics.vue'),
        meta: {
          pageTitle: 'Conhecer Músicas',
          resource: PERMISSION.MODULE.MEET_SONGS,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Educateca',
              active: true,
            },
          ],
        },
      },
      {
        path: 'meet-karaoke',
        name: 'MeetKaraoke',
        component: () =>
          import('@/views/pages/teacher-context/library/meet-karaoke/MeetKaraoke.vue'),
        meta: {
          pageTitle: 'Conhecer Karaokê',
          resource: PERMISSION.MODULE.MEET_KARAOKE,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Educateca',
              active: true,
            },
          ],
        },
      },
    ],
  },

  {
    path: '/teacher/missions-plus/report/:guideId',
    name: 'reportMissionsPlus',
    component: () => import('@/views/reports/missionPlus/classe-report/ClasseTab.vue'),
    meta: {
      navActiveLink: 'activeMissions',
      pageTitle: 'Missões Plus',
      resource: PERMISSION.MODULE.SCHOOL_MISSIONS,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Missões da Escola',
          active: true,
        },
        {
          text: 'Missões',
          to: { name: 'activeMissions' },
        },
        {
          text: 'Missão',
          active: true,
        },
      ],
    },
    children: [
      {
        path: 'classe',
        name: 'reportMissionsPlusClasse',
        component: () =>
          import(
            '@/views/reports/missionPlus/classe-report/classe/ReportMissionPlusClasseIndex.vue'
          ),
        meta: {
          navActiveLink: 'activeMissions',
          pageTitle: 'Missões',
          resource: PERMISSION.MODULE.SCHOOL_MISSIONS,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Missões da Escola',
              active: true,
            },
            {
              text: 'Missões',
              to: { name: 'activeMissions' },
            },
            {
              text: 'Turmas',
              active: true,
            },
          ],
        },
      },
      {
        path: 'students',
        name: 'reportMissionsPlusStudents',
        component: () =>
          import(
            '@/views/reports/missionPlus/classe-report/students/ReportMissionPlusStudentsIndex.vue'
          ),
        meta: {
          navActiveLink: 'activeMissions',
          pageTitle: 'Missões Plus',
          resource: PERMISSION.MODULE.SCHOOL_MISSIONS,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Missões da Escola',
              active: true,
            },
            {
              text: 'Missões',
              to: { name: 'activeMissions' },
            },
            {
              text: 'Alunos',
              active: true,
            },
          ],
        },
      },
      {
        path: 'students/student/:studentId',
        name: 'reportMissionsPlusStudent',
        component: () =>
          import(
            '@/views/reports/missionPlus/classe-report/student/ReportMissionPlusStudentIndex.vue'
          ),
        meta: {
          navActiveLink: 'missionList',
          pageTitle: 'Missões Plus',
          resource: PERMISSION.MODULE.SCHOOL_MISSIONS,
          action: ACTION.READ,
          tabIndex: 1,
          breadcrumb: [
            {
              text: 'Missões da Escola',
              active: true,
            },
            {
              text: 'Missões',
              to: { name: 'activeMissions' },
            },
            {
              text: 'Alunos',
              active: true,
            },
          ],
        },
      },
      {
        path: 'ranking',
        name: 'reportMissionsPlusRanking',
        component: () =>
          import('@/views/reports/missionPlus/classe-report/ranking/RankingMissionsRoot.vue'),
        meta: {
          pageTitle: 'Ranking da missão',
          navActiveLink: 'rankingMissions',
          resource: PERMISSION.MODULE.SCHOOL_MISSIONS,
          action: ACTION.READ,
          breadcrumb: [
            {
              text: 'Missões da Escola',
              active: true,
            },
            {
              text: 'Missões',
              to: { name: 'activeMissions' },
            },
            {
              text: 'Ranking da missão',
              active: true,
            },
          ],
        },
      },
    ],
  },

  {
    path: '/teacher/reports/missions/:missionId',
    name: 'MissionReport',
    component: () => import('@/views/pages/teacher-context/reports/missions/MissionReport.vue'),
    meta: {
      navActiveLink: 'activeMissions',
      pageTitle: 'Relatório da Missão',
      resource: PERMISSION.MODULE.SCHOOL_MISSIONS,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Missions',
          plural: true,
          to: { name: 'activeMissions' },
        },
        {
          text: 'Relatório da Missão',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/reports/missions/:missionId/activity-detail/:activityId',
    name: 'ActivityDetailMissionReport',
    component: () =>
      import('@/views/pages/teacher-context/reports/missions/ActivityDetailMissionReport.vue'),
    meta: {
      navActiveLink: 'activeMissions',
      pageTitle: 'Relatório da Missão',
      resource: PERMISSION.MODULE.SCHOOL_MISSIONS,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Missions',
          plural: true,
          to: { name: 'activeMissions' },
        },
        {
          text: 'Relatório da Missão',
          to: { name: 'MissionReport' },
        },
        {
          text: 'Relatório da Atividade',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/reports/missions/:missionId/student-detail/:studentId',
    name: 'StudentDetailMissionReport',
    component: () =>
      import(
        '@/views/pages/teacher-context/reports/missions/studentDetailMission/StudentDetailMissionReport.vue'
      ),
    meta: {
      navActiveLink: 'activeMissions',
      pageTitle: 'Relatório da Missão',
      resource: PERMISSION.MODULE.SCHOOL_MISSIONS,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Missions',
          plural: true,
          to: { name: 'activeMissions' },
        },
        {
          text: 'Relatório da Missão',
          to: { name: 'MissionReport' },
        },
        {
          text: 'Relatório do Aluno',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/school-ranking',
    name: 'TeacherSchoolRanking',
    component: () => import('@/views/pages/teacher-context/reports/ranking/SchoolRanking.vue'),
    meta: {
      pageTitle: 'Ranking de Conquistas',
      resource: PERMISSION.MODULE.SCHOOL_MISSIONS_ACHIEVEMENT_RANKING,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Missões da Escola',
          active: true,
        },
        {
          text: 'Ranking de Conquistas',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/school-island-ranking',
    name: 'TeacherIslandSchoolRanking',
    component: () => import('@/views/pages/teacher-context/reports/ranking/IslandRanking.vue'),
    meta: {
      pageTitle: 'Ranking de Conquistas',
      resource: PERMISSION.MODULE.ISLANDS_ACHIEVEMENT_RANKING,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Explorar Jogos',
          active: true,
        },
        {
          text: 'Ranking de Conquistas',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/explore-games/configuration',
    name: 'TeacherExploreGamesConfiguration',
    component: () => import('@/views/pages/teacher-context/reports/explore-games/GamesConfig.vue'),
    meta: {
      pageTitle: 'Configurações',
      resource: PERMISSION.MODULE.ISLANDS,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Explorar Jogos',
          active: true,
        },
        {
          text: 'Configurações da Ilha',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/events',
    name: 'teacherEvents',
    redirect: '/teacher/events/',
    component: () => import('@/views/events/EventsRoot.vue'),
    children: [
      {
        path: '/',
        name: 'teacherEventsList',
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
        path: '/teacher/event/:eventId/',
        name: 'teacherEventClassReport',
        component: () => import('@/views/events/reports/classe-detail/index.vue'),
        meta: {
          resource: PERMISSION.MODULE.EVENTS,
          action: ACTION.READ,
          pageTitle: 'Relatório do evento na escola',
          breadcrumb: [
            {
              text: 'Eventos',
              to: { name: 'teacherEventsList' },
            },
            {
              text: 'Alunos',
              active: true,
            },
          ],
        },
      },
      {
        path: '/teacher/event/:eventId/results',
        name: 'teacherResultsReport',
        redirect: '/teacher/event/:eventId/results/participation',
        component: () => import('@/views/events/results-report/class-details/Index.vue'),
        meta: {
          resource: PERMISSION.MODULE.EVENTS,
          action: ACTION.READ,
          pageTitle: 'Relatório do evento na escola',
          breadcrumb: [
            {
              text: 'Eventos',
              to: { name: 'teacherEventsList' },
            },
            {
              text: 'Evento',
              active: true,
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
            name: 'teacherResultsReportParticipation',
            component: () =>
              import('@/views/events/results-report/class-details/participation/Index.vue'),
            meta: {
              navActiveLink: 'teacherEvents',
              resource: PERMISSION.MODULE.EVENTS,
              action: ACTION.READ,
              pageTitle: '',
              tabIndex: 0,
              breadcrumb: [
                {
                  text: 'Eventos',
                  to: { name: 'teacherEventsList' },
                },
                {
                  text: 'Evento',
                  active: true,
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
            name: 'teacherResultsReportPerformance',
            component: () =>
              import('@/views/events/results-report/class-details/performance/Index.vue'),
            meta: {
              navActiveLink: 'teacherEvents',
              resource: PERMISSION.MODULE.EVENTS,
              action: ACTION.READ,
              pageTitle: '',
              tabIndex: 1,
              breadcrumb: [
                {
                  text: 'Eventos',
                  to: { name: 'teacherEventsList' },
                },
                {
                  text: 'Evento',
                  active: true,
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
      {
        path: '/teacher/event/:eventId/ranking',
        name: 'teacherEventRankingStudents',
        component: () => import('@/views/events/ranking/students/EventsRankingStudenIndex.vue'),
        meta: {
          resource: PERMISSION.MODULE.EVENTS,
          action: ACTION.READ,
          pageTitle: '',
          breadcrumb: [
            {
              text: 'Eventos',
              to: { name: 'teacherEventsList' },
            },
            {
              text: 'Ranking',
              active: true,
            },
          ],
        },
      },
      {
        path: '/teacher/event/:eventId/certificates',
        name: 'teacherEventCertificates',
        component: () => import('@/views/events/certificate/list/CertificateListIndex.vue'),
        meta: {
          resource: PERMISSION.MODULE.EVENTS,
          action: ACTION.READ,
          pageTitle: 'Relatório do evento na Escola',
          breadcrumb: [
            {
              text: 'Eventos',
              to: { name: 'teacherEventsList' },
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
        path: '/teacher/events/:eventId/individual-report',
        name: 'individualReportTeacher',
        component: () => import('@/views/events/individual-report/Index.vue'),
        meta: {
          resource: PERMISSION.MODULE.EVENTS,
          action: ACTION.READ,
          pageTitle: 'Relatório do evento na Escola',
          breadcrumb: [
            {
              text: 'Eventos',
              to: { name: 'teacherEventsList' },
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
        path: '/teacher/events/:eventId/individual-report/student/:studentId',
        name: 'individualReportTeacherStudent',
        component: () => import('@/views/events/individual-report/student-report/Index.vue'),
        meta: {
          resource: PERMISSION.MODULE.EVENTS,
          action: ACTION.READ,
          pageTitle: 'Relatório do evento na Escola',
          breadcrumb: [
            {
              text: 'Eventos',
              to: { name: 'teacherEventsList' },
            },
            {
              text: 'Evento',
              active: true,
            },
            {
              text: 'Relatório Individual',
              to: { name: 'individualReportTeacher' },
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
  {
    path: '/teacher/evaluations',
    name: 'evaluationsTeacher',
    redirect: '/teacher/evaluations/',
    component: () => import('@/views/pages/admin-context/evaluations/EvaluationsRoot.vue'),
    meta: {
      resource: PERMISSION.MODULE.EVALUATIONS,
      action: ACTION.READ,
      pageTitle: 'Avaliação Digital',
      breadcrumb: [
        {
          text: 'Avaliações',
          active: true,
        },
        {
          text: 'Avaliação Digital',
          active: true,
        },
      ],
    },
    children: [
      {
        path: '/',
        name: 'evaluationsListTeacher',
        component: () =>
          import('@/views/pages/teacher-context/evaluations/list/EvaluationsList.vue'),
        meta: {
          resource: PERMISSION.MODULE.EVALUATIONS,
          action: ACTION.READ,
          text: 'Avaliação Digital',
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Avaliação Digital',
              active: true,
            },
          ],
        },
      },
      {
        path: '/teacher/evaluations/:evaluationId/students',
        name: 'evaluationsListStudentsTeacher',
        component: () =>
          import(
            '@/views/pages/admin-context/evaluations/students-list/EvaluationsStudentsList.vue'
          ),
        meta: {
          resource: PERMISSION.MODULE.EVALUATIONS,
          action: ACTION.READ,
          pageTitle: '',
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Avaliação Digital',
              to: {
                name: 'evaluationsListTeacher',
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
        path: '/teacher/evaluations/:evaluationId/result/students',
        name: 'evaluationsTCTListStudentsTeacher',
        redirect: '/teacher/evaluations/:evaluationId/result/students/tct',
        component: () =>
          import('@/views/pages/admin-context/evaluations/tct/students-list/index.vue'),
        meta: {
          resource: PERMISSION.MODULE.EVALUATIONS,
          action: ACTION.READ,
          pageTitle: '',
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Avaliação Digital',
              to: {
                name: 'evaluationsListTeacher',
              },
            },

            {
              text: 'Alunos',
              active: true,
            },
          ],
        },
        children: [
          {
            path: 'tct',
            name: 'evaluationsTCTStudentsAnalysisTeacher',
            component: () =>
              import(
                '@/views/pages/admin-context/evaluations/tct/students-list/analysis/EvaluationsTCTStudentsList.vue'
              ),
            meta: {
              navActiveLink: 'evaluations',
              resource: PERMISSION.MODULE.EVALUATIONS,
              action: ACTION.READ,
              pageTitle: 'Análise TCT',
              breadcrumb: [
                {
                  text: 'Avaliações',
                  active: true,
                },
                {
                  text: 'Avaliação Digital',
                  to: {
                    name: 'evaluationsListTeacher',
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
            path: 'tri',
            name: 'evaluationsTRIStudentsTeacher',
            component: () =>
              import(
                '@/views/pages/admin-context/evaluations/tct/students-list/tri/EvaluationsTRIStudentsList.vue'
              ),
            meta: {
              navActiveLink: 'evaluations',
              resource: PERMISSION.MODULE.EVALUATIONS,
              action: ACTION.READ,
              pageTitle: 'Análise TCT',
              breadcrumb: [
                {
                  text: 'Avaliações',
                  active: true,
                },
                {
                  text: 'Avaliação Digital',
                  to: {
                    name: 'evaluationsListTeacher',
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
            path: 'ability',
            name: 'evaluationsTCTStudentsAbilityTeacher',
            component: () =>
              import('@/views/pages/admin-context/evaluations/tct/students-list/ability/index.vue'),
            meta: {
              navActiveLink: 'evaluations',
              resource: PERMISSION.MODULE.EVALUATIONS,
              action: ACTION.READ,
              pageTitle: 'Habilidades',
              breadcrumb: [
                {
                  text: 'Avaliações',
                  active: true,
                },
                {
                  text: 'Avaliação Digital',
                  to: {
                    name: 'evaluationsListTeacher',
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
            path: 'questions',
            name: 'evaluationsTCTStudentsQuestionsTeacher',
            component: () =>
              import(
                '@/views/pages/admin-context/evaluations/tct/students-list/questions/QuestionsStudentsIndex.vue'
              ),
            meta: {
              navActiveLink: 'evaluations',
              resource: PERMISSION.MODULE.EVALUATIONS,
              action: ACTION.READ,
              pageTitle: 'Habilidades',
              breadcrumb: [
                {
                  text: 'Avaliações',
                  active: true,
                },
                {
                  text: 'Avaliação Digital',
                  to: {
                    name: 'evaluationsListTeacher',
                  },
                },
                {
                  text: 'Alunos',
                  active: true,
                },
              ],
            },
          },
        ],
      },
      {
        path: '/teacher/evaluations/:evaluationId/result/students/tct/:studentId',
        name: 'evaluationsTCTStudentsAnalysisDetailsTeacher',
        component: () =>
          import(
            '@/views/pages/admin-context/evaluations/tct/students-list/analysis-details/EvaluationsTCTStudentsDetailIndex.vue'
          ),
        meta: {
          navActiveLink: 'evaluations',
          returnTo: 'evaluationsTCTStudentsAnalysisTeacher',
          resource: PERMISSION.MODULE.EVALUATIONS,
          action: ACTION.READ,
          pageTitle: 'Análise TCT',
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Avaliação Digital',
              to: {
                name: 'evaluationsListTeacher',
              },
            },
            {
              text: 'Avaliação',
              to: {
                name: 'evaluationsTCTStudentsAnalysisTeacher',
              },
            },
            {
              text: 'Aluno',
              active: true,
            },
          ],
        },
      },
      {
        path: '/teacher/evaluations/:evaluationId/result/students/questions/:studentId',
        name: 'evaluationsTCTStudentsQuestionsDetailsTeacher',
        component: () =>
          import(
            '@/views/pages/admin-context/evaluations/tct/students-list/analysis-details/EvaluationsTCTStudentsDetailIndex.vue'
          ),
        meta: {
          navActiveLink: 'evaluations',
          returnTo: 'evaluationsTCTStudentsQuestionsTeacher',
          resource: PERMISSION.MODULE.EVALUATIONS,
          action: ACTION.READ,
          pageTitle: 'Análise TCT',
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Avaliação Digital',
              to: {
                name: 'evaluationsListTeacher',
              },
            },
            {
              text: 'Avaliação',
              to: {
                name: 'evaluationsTCTStudentsQuestionsTeacher',
              },
            },
            {
              text: 'Aluno',
              active: true,
            },
          ],
        },
      },
      {
        path: '/teacher/evaluations/download',
        name: 'evaluationDownload',
        component: () =>
          import(
            '@/views/pages/teacher-context/evaluations/evaluation-download/EvaluationDownload.vue'
          ),
        meta: {
          layout: 'full',
        },
      },
      {
        path: '/teacher/evaluations/:evaluationId/answerkey',
        name: 'evaluationsAnswerTeacher',
        component: () =>
          import('@/views/pages/admin-context/evaluations/answerkey/students/Index.vue'),
        meta: {
          navActiveLink: 'evaluations',
          resource: PERMISSION.GENERAL.BETA_FEATURES,
          action: ACTION.READ,
          pageTitle: 'Gabaritos',
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Avaliação Digital',
              to: {
                name: 'evaluationsListTeacher',
              },
            },

            {
              text: 'Gabaritos',
              active: true,
            },
          ],
        },
      },
      {
        path: '/teacher/evaluations/:evaluationId/answerkey/student/:studentId',
        name: 'evaluationsAnswerTeacherStudentAnswers',
        component: () =>
          import(
            '@/views/pages/admin-context/evaluations/answerkey/students/answer-keys/Index.vue'
          ),
        meta: {
          navActiveLink: 'evaluations',
          resource: PERMISSION.GENERAL.BETA_FEATURES,
          action: ACTION.READ,
          pageTitle: 'Gabaritos',
          breadcrumb: [
            {
              text: 'Avaliações',
              active: true,
            },
            {
              text: 'Avaliação Digital',
              to: {
                name: 'evaluationsListTeacher',
              },
            },

            {
              text: 'Gabaritos',
              to: {
                name: 'evaluationsAnswerTeacher',
              },
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
  {
    path: '/error-context',
    name: 'error-context',
    component: () => import('@/views/error/NoModule.vue'),
    meta: {},
  },
]
