import { ACTION, PERMISSION } from '@/consts/permissions'

export default [
  {
    title: 'Painel Inicial',
    route: 'home',
    icon: 'grid_view',
    resource: PERMISSION.GENERAL.ADMIN,
    action: ACTION.READ,
    order: 10,
  },
  {
    title: 'generalReports',
    icon: 'pie_chart',
    order: 20,
    children: [
      {
        title: 'Visão Geral',
        route: 'adminEngagement',
        resource: PERMISSION.GENERAL.BETA_FEATURES,
        action: ACTION.READ,
      },
      {
        title: 'Volume de Acessos',
        route: 'listReportAccess',
        resource: PERMISSION.MODULE.REPORTS,
        action: ACTION.READ,
      },
      {
        title: 'Acessos Mensais Alunos',
        route: 'listReportAccessMonthlyStudents',
        resource: PERMISSION.MODULE.REPORTS,
        action: ACTION.READ,
      },
      {
        title: 'Acessos Professores',
        route: 'teachersAccessNetwork',
        resource: PERMISSION.MODULE.REPORTS,
        action: ACTION.READ,
      },
      /* {
        title: 'Missões e Jogos',
        route: 'missionsHome',

        resource: PERMISSION.MODULE.REPORTS,
        action: ACTION.READ,
      }, */
      {
        title: 'Evidências Escolas',
        route: 'listReportSchoolEvidence',
        resource: PERMISSION.MODULE.REPORTS,
        action: ACTION.READ,
      },
      {
        title: 'Evidências Alunos',
        route: 'listReportStudentEvidence',
        resource: PERMISSION.GENERAL.STUDENT_EVIDENCE,
        action: ACTION.READ,
      },
      {
        title: 'Habilidades',
        route: 'reportSkills',
        resource: PERMISSION.GENERAL.ABILITY_REPORT,
        action: ACTION.READ,
      },
      {
        title: 'Ranking de Conquistas',
        route: 'listReportHomeRanking',
        resource: PERMISSION.GENERAL.RANKING_CONQUEST,
        action: ACTION.READ,
      },
    ],
  },
  {
    title: 'Missões da Escola',
    icon: 'flag',
    order: 25,
    children: [
      {
        title: 'Missões',
        route: 'listMissionsSchool',
        resource: PERMISSION.MODULE.SCHOOL_MISSIONS,
        action: ACTION.READ,
      },
      {
        title: 'Missões Plus',
        route: 'missionsPlusClassesOverview',
        resource: PERMISSION.MODULE.CUSTOM_MISSIONS_PLUS,
        action: ACTION.READ,
      },
    ],
  },
  {
    title: 'Sistema de Ensino',
    route: 'reportsEducationSystemList',
    icon: 'auto_stories',
    resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
    action: ACTION.READ,
  },
  {
    title: 'Cadastros',
    icon: 'how_to_reg',
    order: 30,
    children: [
      {
        title: 'Alunos',
        route: 'listStudentAdminOverview',
        resource: PERMISSION.GENERAL.MANAGE_STUDENTS,
        action: ACTION.READ,
      },
      {
        title: 'Turmas',
        route: 'listClassesAdminOverview',
        resource: PERMISSION.GENERAL.MANAGE_CLASSES,
        action: ACTION.READ,
      },
      {
        title: 'Grupos',
        route: 'GroupsList',
        resource: PERMISSION.GENERAL.CLASS_GROUP,
        action: ACTION.READ,
      },
      {
        title: 'Professores',
        route: 'listProfessorAdminOverview',
        resource: PERMISSION.GENERAL.MANAGE_TEACHERS,
        action: ACTION.READ,
      },

      {
        title: 'Coordenadores',
        route: 'listCoordinatorsAdminOverview',
        resource: PERMISSION.GENERAL.MANAGE_COORDINATORS,
        action: ACTION.READ,
      },
      {
        title: 'Diretores',
        route: 'listDirectorAdminOverview',
        resource: PERMISSION.GENERAL.MANAGE_MANAGERS,
        action: ACTION.READ,
      },
    ],
  },
  {
    title: 'Gerenciador',
    icon: 'person_play',
    route: 'modulesManagement',
    order: 40,
    resource: PERMISSION.GENERAL.MODULE_MANAGEMENT,
    action: ACTION.READ,
  },
  {
    title: 'Eventos',
    icon: 'calendar_today',
    route: 'events',
    order: 50,
    resource: PERMISSION.MODULE.EVENTS,
    action: ACTION.READ,
  },

  {
    title: 'Avaliações',
    icon: 'quiz',
    order: 65,
    children: [
      {
        title: 'Complexidade Narrativa',
        route: 'narrativeComplexityClasses',
        resource: PERMISSION.MODULE.NARRATIVECOMPLEXITY,
        action: ACTION.READ,
      },
      {
        title: 'Fases da Escrita',
        route: 'WritingPhasesListClassesAdmin',
        resource: PERMISSION.MODULE.WRITING_STAGES,
        action: ACTION.READ,
      },
      {
        title: 'Fluência Leitora',
        route: 'readingFluencyAdminClasses',
        resource: PERMISSION.MODULE.READINGFLUENCY,
        action: ACTION.READ,
      },
      {
        title: 'Fluência Leitora',
        route: 'AdminFluencyV2Evaluations',
        resource: PERMISSION.MODULE.READING_FLUENCY_EVALUATION,
        action: ACTION.READ,
      },
      {
        title: 'Avaliação Digital',
        route: 'evaluations',
        resource: PERMISSION.MODULE.EVALUATIONS,
        action: ACTION.READ,
      },
      {
        title: 'Simulados',
        route: 'redirectSimulationsUrl',
        resource: PERMISSION.MODULE.EVOLUCIIONAL_SIMULATIONS,
        action: ACTION.READ,
      },
    ],
  },
  {
    title: 'Expedição Leitura',
    icon: 'book_5',
    route: 'readingExpeditionOverview',
    order: 66,
    resource: PERMISSION.MODULE.READING_EXPEDITION,
    action: ACTION.READ,
  },
  {
    title: 'Ajudas e Materiais',
    route: 'supportMaterials',
    icon: 'file_download',
    order: 70,
    resource: PERMISSION.GENERAL.SUPPORT_MATERIALS,
    action: ACTION.READ,
  },
]
