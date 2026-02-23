import {
  getReportStudentsMonitoring,
  getSubjectModules,
} from '@/services/shared/reports/Report.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { computed } from 'vue'

export function useDashboardStudents() {
  const module_name = 'moduleDashboardStudents'

  const { classe, subject, period, parentModule, childModule } = useFilters()

  const className = computed({
    get: () => store.getters[`${module_name}/className`],
    set: value => store.commit(`${module_name}/className`, value),
  })

  const institutionName = computed({
    get: () => store.getters[`${module_name}/institutionName`],
    set: value => store.commit(`${module_name}/institutionName`, value),
  })

  const serieName = computed({
    get: () => store.getters[`${module_name}/serieName`],
    set: value => store.commit(`${module_name}/serieName`, value),
  })

  const subjectModules = computed({
    get: () => store.getters[`${module_name}/subjectModules`],
    set: value => store.commit(`${module_name}/subjectModules`, value),
  })

  const institutionId = computed({
    get: () => store.getters[`${module_name}/institutionId`],
    set: value => store.commit(`${module_name}/institutionId`, value),
  })

  const viewMode = computed({
    get: () => store.getters[`${module_name}/viewMode`],
    set: value => store.commit(`${module_name}/viewMode`, value),
  })

  const loading = computed({
    get: () => store.getters[`${module_name}/loading`],
    set: value => store.commit(`${module_name}/loading`, value),
  })

  const loadingSubjectModules = computed({
    get: () => store.getters[`${module_name}/loadingSubjectModules`],
    set: value => store.commit(`${module_name}/loadingSubjectModules`, value),
  })

  const dashboard = computed({
    get: () => store.getters[`${module_name}/dashboard`],
    set: value => store.commit(`${module_name}/dashboard`, value),
  })

  const dataTable = computed({
    get: () => store.getters[`${module_name}/dataTable`],
    set: value => store.commit(`${module_name}/dataTable`, value),
  })

  const totalData = computed({
    get: () => store.getters[`${module_name}/totalData`],
    set: value => store.commit(`${module_name}/totalData`, value),
  })

  const params = computed({
    get: () => store.getters[`${module_name}/params`],
    set: value => store.commit(`${module_name}/params`, value),
  })

  const serieId = computed({
    get: () => store.getters[`${module_name}/serieId`],
    set: value => store.commit(`${module_name}/serieId`, value),
  })

  const reset = () => {
    store.commit(`${module_name}/reset`)
  }

  const fetchSubjectModules = () => {
    if (!subject.value.id) return
    loadingSubjectModules.value = true

    getSubjectModules({
      SubjectId: subject.value.id,
      SerieId: serieId.value,
      InstitutionId: institutionId.value,
    })
      .then(response => {
        const data = response.data.map(item => {
          if (item.details) {
            item.details.unshift({
              id: null,
              name: item.id === 1 ? 'Todas' : 'Todos',
            })
          }
          return item
        })

        if (data.length) {
          data.unshift({
            id: null,
            name: 'Todos os módulos',
          })
        }

        subjectModules.value = data
      })
      .finally(() => {
        loadingSubjectModules.value = false
      })
  }

  const setNoData = () => {
    className.value = null
    institutionName.value = null
    serieName.value = null
    subjectModules.value = []
    dashboard.value = {
      activitiesFinished: null,
      activitiesNotFinished: null,
      totalActivities: null,
      totalStudents: null,
      totalStudentsPlayed: null,
      challengesDone: null,
      totalTime: null,
      performance: null,
    }
    dataTable.value = []
    totalData.value = 0
  }

  const fetchDashboard = () => {
    if (!subject.value.id) {
      setNoData()
      loading.value = false
      loadingSubjectModules.value = false
      return
    }
    loading.value = true

    getReportStudentsMonitoring({
      ClassId: classe.value.ClassId,
      SubjectId: subject.value.id,
      Module: parentModule.value.id,
      ModuleDetailId: childModule.value?.id,
      Month: period.value.id,
    })
      .then(response => {
        const dashboardData = {
          activitiesFinished: response.data.activitiesFinished,
          activitiesNotFinished: response.data.activitiesNotFinished,
          totalActivities: response.data.totalActivities,
          totalStudents: response.data.totalStudents,
          totalStudentsPlayed: response.data.totalStudentsPlayed,
          challengesDone: response.data.challengesDone,
          totalTime: response.data.totalTime,
          performance: response.data.performance,
        }

        serieId.value = response.data.serieId
        className.value = response.data.className
        institutionName.value = response.data.institutionName
        serieName.value = response.data.serieName
        dashboard.value = dashboardData
        dataTable.value = response.data.students
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    module_name,
    className,
    institutionName,
    serieName,
    serieId,
    subjectModules,
    institutionId,
    viewMode,
    loading,
    loadingSubjectModules,
    dashboard,
    dataTable,
    totalData,
    params,
    reset,
    fetchSubjectModules,
    fetchDashboard,
  }
}