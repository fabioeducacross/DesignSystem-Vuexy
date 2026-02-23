import { useRoute, useRouter } from 'vue-router/composables'
import {
  getReportStudentMonitoringV2,
  getSubjectModules,
  getReportStudentMonitoringV2Excel,
  getReportStudentMonitoringActivityDetail,
} from '@/services/shared/reports/Report.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable.js'
import sortObjectListByKey from '@/utils/sort'
import { saveAs } from 'file-saver'
import { computed, ref } from 'vue'

const moduleName = 'moduleDashboardStudentDetails'

const { resetPage, params } = useTable()
const { classe, subject, period, parentModule, childModule } = useFilters()

export function useStudentDetails() {
  const route = useRoute()
  const router = useRouter()

  const dashboard = computed({
    get: () => store.getters[`${moduleName}/dashboard`],
    set: value => store.commit(`${moduleName}/dashboard`, value),
  })
  const loadingDashboard = computed({
    get: () => store.getters[`${moduleName}/loadingDashboard`],
    set: value => store.commit(`${moduleName}/loadingDashboard`, value),
  })

  const loading = computed({
    get: () => store.getters[`${moduleName}/loading`],
    set: value => store.commit(`${moduleName}/loading`, value),
  })

  const loadingSubjectModules = computed({
    get: () => store.getters[`${moduleName}/loadingSubjectModules`],
    set: value => store.commit(`${moduleName}/loadingSubjectModules`, value),
  })

  const serieId = computed({
    get: () => store.getters[`${moduleName}/serieId`],
    set: value => store.commit(`${moduleName}/serieId`, value),
  })

  const subjectModules = computed({
    get: () => store.getters[`${moduleName}/subjectModules`],
    set: value => store.commit(`${moduleName}/subjectModules`, value),
  })

  const studentId = computed({
    get: () => store.getters[`${moduleName}/studentId`],
    set: value => store.commit(`${moduleName}/studentId`, value),
  })

  const institutionId = computed({
    get: () => store.getters[`${moduleName}/institutionId`],
    set: value => store.commit(`${moduleName}/institutionId`, value),
  })

  const institutionName = computed({
    get: () => store.getters[`${moduleName}/institutionName`],
    set: value => store.commit(`${moduleName}/institutionName`, value),
  })

  const className = computed({
    get: () => store.getters[`${moduleName}/className`],
    set: value => store.commit(`${moduleName}/className`, value),
  })

  const studentName = computed({
    get: () => store.getters[`${moduleName}/studentName`],
    set: value => store.commit(`${moduleName}/studentName`, value),
  })

  const dataTable = computed({
    get: () => store.getters[`${moduleName}/dataTable`],
    set: value => store.commit(`${moduleName}/dataTable`, value),
  })

  const currentPage = computed({
    get: () => params.value.Page,
    set: value => (params.value.Page = value),
  })

  const search = computed({
    get: () => params.value.Search,
    set: value => (params.value.Search = value),
  })

  const ascending = computed({
    get: () => params.value.Ascending,
    set: value => (params.value.Ascending = value),
  })

  const paramsOrderBy = computed({
    get: () => params.value.OrderBy,
    set: value => (params.value.OrderBy = value),
  })

  paramsOrderBy.value = 'name'

  const rounds = computed(() => {
    let filteredData = dataTable.value

    if (search.value) {
      const searchTerm = search.value.toLowerCase()
      filteredData = filteredData.filter(item => item.name.toLowerCase().includes(searchTerm))
    }
    const ordenedData = sortObjectListByKey(
      filteredData,
      paramsOrderBy.value,
      ascending.value === 'false',
    )

    return ordenedData.slice(
      (currentPage.value - 1) * params.value.PageSize,
      currentPage.value * params.value.PageSize,
    )
  })

  const totalData = computed(() => {
    if (search.value) {
      const searchTerm = search.value.toLowerCase()
      return dataTable.value.filter(item => item.name.toLowerCase().includes(searchTerm)).length
    }
    return dataTable.value.length
  })

  const perPage = computed({
    get: () => {
      const data = params.value.PageSize
      return {
        id: data,
        name: data,
      }
    },
    set: value => (params.value.PageSize = value.id),
  })

  const orderBy = ['name', 'performance', 'totalTime', 'topicId']

  const orderByDescription = {
    name: ' Nome do jogo',
    performance: 'Rendimento',
    totalTime: 'Tempo',
    topicId: 'Tópico',
  }

  const changePage = page => {
    currentPage.value = page
  }

  const studentDetailsModal = computed({
    get: () => store.getters[`${moduleName}/studentDetailsModal`],
    set: value => store.commit(`${moduleName}/studentDetailsModal`, value),
  })

  const loadingStudentDetailsModal = computed({
    get: () => store.getters[`${moduleName}/loadingStudentDetailsModal`],
    set: value => store.commit(`${moduleName}/loadingStudentDetailsModal`, value),
  })

  const fetchSubjectModules = () => {
    loadingSubjectModules.value = true
    getSubjectModules({
      SubjectId: subject.value.id,
      SerieId: serieId.value,
      InstitutionId: institutionId.value,
    })
      .then(response => {
        const list = response.data.map(item => {
          if (item.details) {
            item.details.unshift({
              id: null,
              name: item.id === 1 ? 'Todas' : 'Todos',
            })
          }

          return item
        })

        if (list.length) {
          list.unshift({
            id: null,
            name: 'Todos os módulos',
          })
        }

        subjectModules.value = list
      })
      .finally(() => {
        loadingSubjectModules.value = false
      })
  }

  const fetch = () => {
    loading.value = true
    loadingDashboard.value = true

    getReportStudentMonitoringV2(
      {
        ClassId: classe.value.ClassId,
        SubjectId: subject.value.id,
        Module: parentModule.value.id,
        ModuleDetailId: childModule.value?.id,
        Month: period.value.id,
      },
      studentId.value,
    )
      .then(({ data }) => {
        dashboard.value = {
          challengesDone: data.challengesDone,
          totalTime: data.totalTime,
          performance: data.performance,
          classTotalTime: data.classTotalTime,
          classPerformance: data.classPerformance,
        }
        institutionName.value = data.institutionName
        className.value = data.className
        studentName.value = data.studentName
        serieId.value = data.serieId

        dataTable.value = data.content || []
      })
      .finally(() => {
        loading.value = false
        loadingDashboard.value = false
      })
  }

  const resetAndfetch = () => {
    resetPage()
    fetch()
  }

  const fetchStudentDetails = item => {
    loadingStudentDetailsModal.value = true
    getReportStudentMonitoringActivityDetail(
      {
        ClassId: classe.value.ClassId,
        SubjectId: subject.value.id,
        Module: parentModule.value.id,
        ModuleDetailId: childModule.value?.id,
        Month: period.value.id,
      },
      studentId.value,
      item.activityId,
    )
      .then(response => {
        studentDetailsModal.value = response.data
      })
      .finally(() => {
        loadingStudentDetailsModal.value = false
      })
  }

  const generatingExcel = ref(false)

  const exportToExcel = () => {
    generatingExcel.value = true

    const classId = route.params.classId

    getReportStudentMonitoringV2Excel(
      {
        SubjectId: subject.value.id,
        Module: parentModule.value.id,
        ModuleDetailId: childModule.value?.id,
        Month: period.value.id,
        ClassId: classe.value.ClassId || classId,
      },
      studentId.value,
    )
      .then(response => {
        const fileName = 'Relatório do Aluno.xlsx'
        saveAs(response.data, fileName)
      })
      .finally(() => {
        generatingExcel.value = false
      })
  }

  return {
    dashboard,
    loadingDashboard,
    loading,
    loadingSubjectModules,
    serieId,
    subjectModules,
    studentId,
    parentModule,
    childModule,
    institutionId,
    institutionName,
    className,
    studentName,
    fetchSubjectModules,
    fetch,
    resetPage,
    resetAndfetch,
    exportToExcel,
    generatingExcel,
    dataTable,
    rounds,
    fetchStudentDetails,
    studentDetailsModal,
    loadingStudentDetailsModal,
    perPage,
    search,
    orderBy,
    orderByDescription,
    currentPage,
    ascending,
    paramsOrderBy,
    changePage,
    totalData,
  }
}