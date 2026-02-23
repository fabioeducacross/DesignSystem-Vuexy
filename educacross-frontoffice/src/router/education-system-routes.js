import { ACTION, PERMISSION } from '@/consts/permissions'
import store from '@/store'

const educationSystemRoutes = [
  // ==================== Book Mission ====================
  {
    path: '/teacher/education-system/:educationSystemId/books',
    name: 'EducationSystemModules',
    component: () => import('@/views/pages/teacher-context/educationSystem/books/Tab.vue'),
    meta: {
      pageTitle: 'booksAndMissions',
      // resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
      action: ACTION.READ,
      activeTabIndex: 0,
      breadcrumb: [
        {
          text: 'booksAndMissions',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/education-system/:educationSystemId/books/:bookId',
    name: 'EducationSystemMissions',
    component: () =>
      import('@/views/pages/teacher-context/educationSystem/missions/MissionsTabs.vue'),
    meta: {
      pageTitle: 'Missões',
      // resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
      action: ACTION.READ,
      navActiveLink: 'EducationSystemModules',
      breadcrumb: [
        {
          text: 'booksAndMissions',
          to: { name: 'EducationSystemModules' },
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
    path: '/teacher/education-system/:educationSystemId/books/:bookId/report',
    name: 'EducationSystemMissionsBookReport',
    component: () => import('@/views/pages/teacher-context/educationSystem/bookReport/index.vue'),
    meta: {
      pageTitle: 'Missões',
      // resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
      action: ACTION.READ,
      navActiveLink: 'EducationSystemModules',
      breadcrumb: [
        {
          text: 'booksAndMissions',
          to: { name: 'EducationSystemModules' },
        },
        {
          text: 'Missions',
          to: { name: 'EducationSystemMissions' },
        },
        {
          text: 'Relatório do livro',

          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/education-system/:educationSystemId/books/:bookId/mission-plus/:missionId',
    name: 'EducationSystemMissionsBookMissionPlus',
    component: () =>
      import('@/views/pages/teacher-context/educationSystem/missionplus/MissionTabs.vue'),
    meta: {
      pageTitle: 'Relatório da Missão',
      // resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
      action: ACTION.READ,
      navActiveLink: 'EducationSystemModules',
      breadcrumb: [
        {
          text: 'booksAndMissions',
          to: { name: 'EducationSystemModules' },
        },
        {
          text: 'Missions',
          plural: true,
          to: { name: 'EducationSystemMissions' },
        },
        {
          text: 'Relatório da Missão',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/education-system/:educationSystemId/books/:bookId/mission/:missionId',
    name: 'EducationSystemMissionsBookMission',
    component: () =>
      import('@/views/pages/teacher-context/educationSystem/mission/MissionTabs.vue'),
    meta: {
      pageTitle: 'Relatório da Missão',
      // resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
      action: ACTION.READ,
      navActiveLink: 'EducationSystemModules',
      breadcrumb: [
        {
          text: 'booksAndMissions',
          to: { name: 'EducationSystemModules' },
        },
        {
          text: 'Missions',
          plural: true,
          to: { name: 'EducationSystemMissions' },
        },
        {
          text: 'Relatório da Missão',
          active: true,
        },
      ],
    },
  },
  // old routes
  {
    path: '/teacher/education-system/:educationSystemId/books/:bookId/report/:missionId',
    name: 'MissionReportEducationSystemBookMission',
    component: () => import('@/views/pages/teacher-context/reports/missions/MissionReport.vue'),
    meta: {
      pageTitle: 'Relatório da Missão',
      // resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
      action: ACTION.READ,
      navActiveLink: 'EducationSystemModules',
      breadcrumb: [
        {
          text: 'booksAndMissions',
          to: { name: 'EducationSystemModules' },
        },
        {
          text: 'Missions',
          plural: true,
          to: { name: 'EducationSystemMissions' },
        },
        {
          text: 'Relatório da Missão',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/education-system/:educationSystemId/books/:bookId/report/:missionId/student/:studentId',
    name: 'StudentDetailMissionReportEducationSystem',
    component: () =>
      import(
        '@/views/pages/teacher-context/reports/missions/studentDetailMission/StudentDetailMissionReport.vue'
      ),
    meta: {
      pageTitle: 'Detalhes do aluno',
      // resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
      action: ACTION.READ,
      navActiveLink: 'EducationSystemModules',
      breadcrumb: [
        {
          text: 'booksAndMissions',
          to: { name: 'EducationSystemModules' },
        },
        {
          text: 'Missions',
          plural: true,
          to: { name: 'EducationSystemMissions' },
        },
        {
          text: 'Relatório da Missão',
          to: { name: 'MissionReportEducationSystemBookMission' },
        },
        {
          text: 'Detalhes do Aluno',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/education-system/:educationSystemId/books/:bookId/report/:missionId/activity/:activityId',
    name: 'ActivityDetailBookMissionReportEducationSystem',
    component: () =>
      import('@/views/pages/teacher-context/reports/missions/ActivityDetailMissionReport.vue'),
    meta: {
      pageTitle: 'Detalhes da Atividade',
      // resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
      action: ACTION.READ,
      navActiveLink: 'EducationSystemModules',
      breadcrumb: [
        {
          text: 'booksAndMissions',
          to: { name: 'EducationSystemModules' },
        },
        {
          text: 'Missions',
          plural: true,
          to: { name: 'EducationSystemMissions' },
        },
        {
          text: 'Relatório da Missão',
          to: { name: 'MissionReportEducationSystemBookMission' },
        },
        {
          text: 'Detalhes do Jogo',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/education-system/:bookId/missions/:missionId',
    name: 'missionsEducationSystemTeacher',
    component: () => import('@/views/pages/teacher-context/educationSystem/mission-only/Index.vue'),
    meta: {
      // resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
      action: ACTION.READ,
      breadcrumb: [{ text: 'booksAndMissions', active: true }],
      navActiveLink: 'EducationSystemModules',
      parent: 'modulesAndMissionsTeacher',
    },
  },

  // ==================== End Book Mission ====================

  // ==================== Reports ====================
  {
    path: '/teacher/education-system/:educationSystemId/reports',
    name: 'EducationSystemReports',
    component: () =>
      import('@/views/pages/teacher-context/educationSystem/EducationSystemReports.vue'),
    meta: {
      pageTitle: 'Reports',
      // resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Reports',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/education-system/:educationSystemId/reports/:missionId',
    name: 'MissionReportEducationSystem',
    component: () => import('@/views/pages/teacher-context/reports/missions/MissionReport.vue'),
    meta: {
      pageTitle: 'Relatório da Missão',
      // resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
      action: ACTION.READ,
      navActiveLink: 'EducationSystemReports',
      breadcrumb: [
        {
          text: 'Reports',
          to: { name: 'EducationSystemReports' },
        },
        {
          text: 'Relatório da Missão',
          active: true,
        },
      ],
    },
  },
  {
    path: '/teacher/education-system/:educationSystemId/reports/:missionId/student/:studentId',
    name: 'EducationSystemReportStudentDetail',
    component: () =>
      import(
        '@/views/pages/teacher-context/reports/missions/studentDetailMission/StudentDetailMissionReport.vue'
      ),
    meta: {
      pageTitle: 'Detalhes do aluno',
      // resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
      action: ACTION.READ,
      navActiveLink: 'EducationSystemReports',
      breadcrumb: [
        {
          text: 'Reports',
          to: { name: 'EducationSystemReports' },
        },
        {
          text: 'Relatório da Missão',
          to: { name: 'MissionReportEducationSystem' },
        },
        {
          text: 'Detalhes do Aluno',
          active: true,
        },
      ],
    },
  },

  {
    path: '/teacher/education-system/:educationSystemId/reports/:missionId/activity/:activityId',
    name: 'EducationSystemReportActivityDetail',
    component: () =>
      import('@/views/pages/teacher-context/reports/missions/ActivityDetailMissionReport.vue'),
    meta: {
      pageTitle: 'Detalhes da Atividade',
      // resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
      action: ACTION.READ,
      navActiveLink: 'EducationSystemReports',
      breadcrumb: [
        {
          text: 'Reports',
          to: { name: 'EducationSystemReports' },
        },
        {
          text: 'Relatório da Missão',
          to: { name: 'MissionReportEducationSystem' },
        },
        {
          text: 'Detalhes da Atividade',
          active: true,
        },
      ],
    },
  },

  {
    path: '/teacher/education-system/:educationSystemId/reports/:reportId/activity-detail/:activityId',
    name: 'ActivityDetailMissionReport',
    component: () =>
      import('@/views/pages/teacher-context/reports/missions/ActivityDetailMissionReport.vue'),
    meta: {
      pageTitle: 'Relatório da Missão',
      // resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Missions',
          plural: true,
        },
        {
          text: 'Relatório da Missão',
          active: true,
        },
      ],
    },
  },

  // ==================== End Reports ====================

  // ==================== Students ====================
  {
    path: '/student/education-system/:educationSystemId',
    name: 'studentEducationSystem',
    component: () => import('@/views/pages/responsible-context/EducationSystem.vue'),
    meta: {
      // resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
      action: ACTION.READ,
      breadcrumb: [
        {
          text: 'Missions',
          plural: true,
          active: true,
        },
      ],
    },
  },
]
/**
 * Gera as rotas para um sistema de ensino específico.
 * Adiciona o ID do sistema de ensino ao nome da rota e aos metadados.
 *
 * @param {Object} educationSystem - O objeto que representa o sistema de ensino.
 * @param {Array} routes - As rotas a serem percorridas e atualizadas.
 * @returns {Array} - Um array de objetos que representam as rotas atualizadas.
 */
const generateRoutesForEducationSystem = (educationSystem, routes) => {
  // extrai o ID e o nome do sistema de ensino
  const educationSystemId = educationSystem.id
  const educationSystemName = educationSystem.name

  /**
   * Atualiza os metadados da rota com o ID do sistema de ensino.
   *
   * @param {Object} meta - Os metadados da rota a serem atualizados.
   * @returns {Object} - Um objeto que contém os metadados atualizados com o ID do sistema de ensino.
   */
  const updateRouteMetadata = meta => {
    const navActiveLink = meta.navActiveLink
      ? `${meta.navActiveLink}${educationSystemId}`
      : undefined
    const breadcrumb = meta.breadcrumb.map(item => {
      if (item.to) {
        const to = { ...item.to, name: `${item.to.name}${educationSystemId}` }
        return { ...item, to }
      }
      return item
    })
    // adiciona o ID do sistema de ensino aos metadados para trocar a cor do menu
    meta.menuEducationSystemId = educationSystemId
    meta.resource = `${PERMISSION.MODULE.EDUCATION_SYSTEMS}-${educationSystemId}`

    return { ...meta, navActiveLink, breadcrumb }
  }

  /**
   * Atualiza uma rota com o ID do sistema de ensino e os metadados atualizados.
   *
   * @param {Object} route - A rota a ser atualizada.
   * @returns {Object} - Um objeto que representa a rota atualizada.
   */
  const updateRoute = route => {
    // sanitiza o nome do sistema de ensino
    const sanitizedEducationSystemName = educationSystemName
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
    // adiciona o ID do sistema de ensino ao nome da rota
    const name = `${route.name}${educationSystemId}`
    // atualiza os metadados da rota com o ID do sistema de ensino
    const meta = updateRouteMetadata(route.meta)

    return {
      ...route,
      path: route.path.replace('education-system', sanitizedEducationSystemName),
      name,
      meta,
    }
  }

  /**
   * Atualiza todas as rotas e filhos com o ID do sistema de ensino e os metadados atualizados.
   *
   * @param {Array} routes - As rotas a serem percorridas e atualizadas.
   * @returns {Array} - Um array de objetos que representam as rotas atualizadas.
   */
  const updateRoutes = r =>
    r.map(route => {
      if (route.children) {
        // atualiza as rotas filhas recursivamente
        return updateRoutes(route.children).flat()
      }
      // atualiza a rota atual
      return updateRoute(route)
    })

  // atualiza todas as rotas com o ID do sistema de ensino e os metadados atualizados
  return updateRoutes(routes).flat()
}

/**
Verifica se uma rota com o nome especificado existe no router fornecido.
@param {object} router - O router a ser verificado para a rota.
@param {string} routeName - O nome da rota a ser procurado.
@returns {boolean} - Verdadeiro se uma rota com o nome especificado existir, falso caso contrário.
*/
const routeExists = (router, routeName) =>
  router.getRoutes().some(route => route.name === routeName)

/**
 * Adiciona as rotas geradas para todos os sistemas de ensino ao router.
 *
 *
 * @param {Object} router - O objeto router a ser usado para adicionar as novas rotas.
 */
const generateEducationSystemRoutes = router => {
  // obtém todos os sistemas de ensino
  const educationSystems = store?.state.access?.educationSystems
  if (!educationSystems || educationSystems.length === 0) {
    // retorna se não há sistemas de ensino
    return
  }

  // gera as rotas para cada sistema de ensino e as concatena em um único array
  const newRoutes = educationSystems
    .map(educationSystem =>
      generateRoutesForEducationSystem(educationSystem, educationSystemRoutes),
    )
    .flat()

  // adiciona as rotas ao router
  newRoutes.forEach(route => {
    if (!routeExists(router, route.name)) {
      router.addRoute(route)
    }
  })
}

export default generateEducationSystemRoutes
