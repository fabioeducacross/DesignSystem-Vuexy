import axios from '@/libs/axios'
import store from '@/store'
import { urlString } from '@/utils/utils'

const resource = '/v1/reports'
const resourceV2 = '/v2/reports'
const resourceDashboard = '/v1/dashboard'

const checkAttribute = data => data || ''

const checkOrderBy = data => data || 0

const checktableAscending = data => data || false

export const getUserAccessV2 = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resourceV2}/usersaccess?${parameters}`)
}

export const getUserAccessMonthlySchools = (
  { institutionId, pageSize, tableOrderBy, tableAscending },
  currentPageClasses,
) => {
  const searchClassList = `${institutionId ? `&institutionsId=${institutionId}` : ''}`
  return axios.get(
    `${resource}/access-report-institution?page=${checkAttribute(
      currentPageClasses,
    )}&pageSize=${checkAttribute(pageSize)}&orderBy=${checkOrderBy(
      tableOrderBy,
    )}&ascending=${checktableAscending(tableAscending)}${searchClassList}`,
  )
}

export const getUserAccessMonthlyClasses = (
  classId,
  institutionId,
  orderBy,
  ascending,
  page,
  pageSize,
) => {
  return axios.get(`/v1/reports/access-report-class`, {
    params: {
      ClassId: classId,
      InstitutionId: institutionId,
      OrderBy: orderBy || undefined,
      Ascending: ascending,
      Page: page,
      PageSize: pageSize,
    },
  })
}

export const getUserAccessMonthlyStudents = (
  { InstitutionId, classId, pageSize, tableOrderBy, tableAscending },
  currentPageStudents,
) => {
  const role = store.getters.accessRole
  if (role === 'NetworkManager') {
    return axios.get(
      `${resource}/access-report-student?page=${checkAttribute(
        currentPageStudents,
      )}&pageSize=${checkAttribute(pageSize)}&orderBy=${checkOrderBy(
        tableOrderBy,
      )}&ascending=${checktableAscending(tableAscending)}&classId=${checkAttribute(
        classId,
      )}&InstitutionId=${InstitutionId}`,
    )
  }
  return axios.get(
    `${resource}/access-report-student?page=${checkAttribute(
      currentPageStudents,
    )}&pageSize=${checkAttribute(pageSize)}&orderBy=${checkOrderBy(
      tableOrderBy,
    )}&ascending=${checktableAscending(tableAscending)}&classId=${checkAttribute(classId)}`,
  )
}

export const getEvidenceExcel = (subjectId, data) => {
  const parameters = urlString({ subjectId })
  return axios.post(`${resource}/evidence/excel?${parameters}`, data, {
    responseType: 'blob',
  })
}

export const getPDFInfos = (subjectId, data) => {
  const parameters = urlString({ subjectId })
  return axios.post(`${resource}/pdf?${parameters}`, data)
}

export const getPDFEducationSystemInfos = (subjectId, data) =>
  axios.post(`${resourceV2}/education-system-pdf-report`, {
    subjectId,
    ...data,
  })

export const getDashboardOverview = filters => {
  const path = `${resource}/overview?${urlString(filters)}`
  return axios.get(path)
}

export const getOverview = filters => {
  return axios.get(`${resourceV2}/overview?${urlString(filters)}`)
}

/**
 *
 * @param {object} params
 * @param {number} params.subjectId
 * @param {number} params.month
 * @param {number} params.institutionId
 * @returns {AxiosResponse}
 */
export const getEngagement = params => {
  return axios.get(resourceDashboard, { params })
}

export const getProficiencyData = filters => {
  return axios.get(`${resource}/proficiency?${urlString(filters)}`)
}

export const getSchoolEvidenceReport = ({
  ReportPeriod,
  subjectId,
  year,
  month,
  semester,
  InstitutionId,
}) => {
  let URL = ''

  ReportPeriod = ReportPeriod.id
  const role = store.getters.accessRole
  if (role === 'NetworkManager') {
    if (ReportPeriod === 2) {
      URL = `${resource}/managerial?ReportPeriod=${ReportPeriod}&subjectId=${checkAttribute(
        subjectId,
      )}&year=${checkAttribute(year)}&InstitutionId=${checkAttribute(InstitutionId)}`
    } else if (ReportPeriod === 1) {
      URL = `${resource}/managerial?ReportPeriod=${ReportPeriod}&subjectId=${checkAttribute(
        subjectId,
      )}&year=${checkAttribute(year)}&semester=${semester.id}&InstitutionId=${checkAttribute(
        InstitutionId,
      )}`
    } else if (ReportPeriod === 0) {
      URL = `${resource}/managerial?ReportPeriod=${ReportPeriod}&subjectId=${checkAttribute(
        subjectId,
      )}&year=${checkAttribute(year)}&month=${checkAttribute(month)}&InstitutionId=${checkAttribute(
        InstitutionId,
      )}`
    }
  } else if (ReportPeriod === 2) {
    URL = `${resource}/managerial?ReportPeriod=${ReportPeriod}&subjectId=${checkAttribute(
      subjectId,
    )}&year=${checkAttribute(year)}`
  } else if (ReportPeriod === 1) {
    URL = `${resource}/managerial?ReportPeriod=${ReportPeriod}&subjectId=${checkAttribute(
      subjectId,
    )}&year=${checkAttribute(year)}&semester=${semester.id}`
  } else if (ReportPeriod === 0) {
    URL = `${resource}/managerial?ReportPeriod=${ReportPeriod}&subjectId=${checkAttribute(
      subjectId,
    )}&year=${checkAttribute(year)}&month=${checkAttribute(month)}`
  }

  return axios.get(URL)
}

export const getMissionReport = ({ id, classId }) => {
  let parameters = ''

  if (classId) {
    parameters = `?classId=${classId}`
  }

  return axios.get(`${resourceV2}/guide/${id}${parameters}`)
}

export const getMissionActivities = ({ id, classId, institutionId }) => {
  let parameters = ''

  if (classId) {
    parameters = `?classId=${classId}`

    if (institutionId) {
      parameters += `&institutionId=${institutionId}`
    }
  }

  return axios.get(`${resourceV2}/guide/${id}/activities${parameters}`)
}

export const getMissionRanking = ({ id, classId, institutionId }) => {
  let parameters = ''

  if (classId) {
    parameters = `?classId=${classId}`

    if (institutionId) {
      parameters += `&institutionId=${institutionId}`
    }
  }

  return axios.get(`${resource}/guide/${id}/ranking${parameters}`)
}

export const getMissionRankingExcel = (id, params) => {
  const parameters = urlString(params)

  return axios.get(`${resource}/guide/${id}/ranking/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getMissionReportV2 = params => {
  const parameters = urlString(params)
  return axios.get(`${resourceV2}/guide/${params.id}?${parameters}`)
}

export const getMissionActivitiesV2 = params => {
  const parameters = urlString(params)

  return axios.get(`${resourceV2}/guide/${params.id}/activities?${parameters}`)
}

export const getMissionRankingV2 = params => {
  const parameters = urlString(params)
  return axios.get(`${resource}/guide/${params.id}/ranking?${parameters}`)
}

export const getMissionRankingExcelV2 = params => {
  const parameters = urlString(params)
  return axios.get(`${resource}/guide/${params.id}/ranking/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getTeacherDashboard = filters => {
  const parameters = urlString(filters)

  return axios.get(`${resourceDashboard}/teacher?${parameters}`)
}

export const getTeacherTimeline = filters => {
  const parameters = urlString(filters)

  return axios.get(`${resourceDashboard}/teacher?${parameters}`)
}

export const getDescriptorInfo = descriptorId => {
  const URL = `${resource}/descriptor?DescriptorId=${checkAttribute(descriptorId)}`

  return axios.get(URL)
}

export const getPerformanceActivities = (classId, descriptorId) => {
  const URL = `${resource}/class/performance/activities?ClassId=${checkAttribute(
    classId,
  )}&DescriptorId=${checkAttribute(descriptorId)}`

  return axios.get(URL)
}

export const getPerformanceStudents = (classId, descriptorId) => {
  const URL = `${resource}/class/performance/students?ClassId=${checkAttribute(
    classId,
  )}&DescriptorId=${checkAttribute(descriptorId)}`

  return axios.get(URL)
}

export const getMissionActivitiesById = (missionId, activityId, classId) => {
  let parameters = ''

  if (classId) {
    parameters = `?classId=${classId}`
  }

  return axios.get(`${resource}/guide/${missionId}/activities/${activityId}${parameters}`)
}

export const getMissionStudentsById = (missionId, studentId, classId) => {
  let parameters = ''

  if (classId) {
    parameters = `?classId=${classId}`
  }

  return axios.get(`${resource}/guide/${missionId}/student/${studentId}${parameters}`)
}

export const getLicenses = filters => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/licenses?${parameters}`)
}

export const getLicensesDashboard = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/licenses/dashboard?${parameters}`)
}

/**
 * Downloads the Monthly Active User (MAU) report for a specific class, as an Excel file.
 *
 * @param {Object} filters - The filters to apply when fetching the report.
 * @param {string} filters.classId - The ID of the class to fetch the report for.
 * @param {string} [filters.institutionId] - The ID of the institution to fetch the report for. Optional.
 * @param {string} fileName - The name to use for the downloaded file (without extension).
 * @param {Function} onDownloadProgress - Function that tracks the progress of the file download. Receives a ProgressEvent as its parameter.
 * @returns {Promise<void>} A Promise that resolves when the file has started downloading.
 *
 * @example
 * getMAUStudentClass({ classId: '123', institutionId: '456' }, 'myReport', progressEvent => {
 *   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
 *   console.log(`Download ${percentCompleted}% completed`);
 * });
 */
export const getMAUStudentClass = (filters, fileName, onDownloadProgress) => {
  const { classId, institutionId } = filters

  const url = `${resource}/access-report-class/excel`

  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        responseType: 'blob',
        params: {
          classId,
          institutionId,
        },
        onDownloadProgress,
        headers: {
          showErrorToast: false,
        },
      })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${fileName}.xlsx`)
        document.body.appendChild(link)
        link.click()

        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * Fetches the Monthly Active Users (MAU) report for the selected institutions and downloads the report as an Excel file.
 *
 * @param {Array.<number|string>} InstitutionsId - An array of institution IDs (either number or string).
 * @param {string} fileName - The desired name for the downloaded Excel file.
 * @param {function} onDownloadProgress - Callback function that tracks the progress of the file download.
 *
 * @returns {Promise} Returns a Promise which resolves when the download is successful and rejects when an error occurs.
 *
 * @throws Will throw an error if the Axios GET request fails.
 */
export const getMAUStudentInstitution = (InstitutionsId, fileName, onDownloadProgress) => {
  let url = `${resource}/access-report-institution/excel`

  const filteredInstitutionsId = InstitutionsId.filter(id => id)

  // Join institution ids into a string
  const institutionsIdParam = filteredInstitutionsId.map(id => `institutionsId=${id}`).join('&')

  url = url.concat(`?${institutionsIdParam}`)

  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        responseType: 'blob',
        onDownloadProgress,
        headers: {
          showErrorToast: false,
        },
      })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${fileName}.xlsx`)
        document.body.appendChild(link)
        link.click()

        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * Retrieves the Monthly Active User (MAU) data for a specific student and initiates a file download.
 *
 * @param {Object} params - The parameters for the request.
 * @param {string|number} params.classId - The ID of the class.
 * @param {string|number} params.institutionId - The ID of the institution.
 * @param {string} fileName - The name of the file to download without the extension.
 * @param {Function} onDownloadProgress - The callback to track the download progress.
 * @returns {Promise} A Promise that resolves when the file download is initiated, and rejects if an error occurs.
 *
 * @example
 * getMAUStudent({ classId: '123', institutionId: '456' }, 'myFile', progressEvent => {
 *   console.log(`Download progress: ${progressEvent.loaded / progressEvent.total * 100}%`);
 * });
 */
export const getMAUStudent = ({ classId, institutionId }, fileName, onDownloadProgress) => {
  const url = `${resource}/access-report-student/excel`

  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: {
          classId,
          institutionId,
        },
        responseType: 'blob',
        onDownloadProgress,
        headers: {
          showErrorToast: false,
        },
      })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${fileName}.xlsx`)
        document.body.appendChild(link)
        link.click()

        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
}
export const getNetworkManagerLicensesExcel = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/licenses/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getAdminPanelOverviewDashboard = filter => {
  const parameters = urlString(filter)
  return axios.get(`${resource}/overview/licenses?${parameters}`)
}

export const getAdminPanelOverviewClasses = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/overview/classes?${parameters}`)
}

export const getAdminPanelAccessDashboard = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/overview/access?${parameters}`)
}

export const getAdminPanelAccessClasses = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/overview/access/classes?${parameters}`)
}

export const getAdminPanelAccessExcel = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/overview/access/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getNetworkPanelAccessExcel = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/access/institutions/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getNetworkPanelAccessInstitutionsProfile = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/access/institutions/profile?${parameters}`)
}

export const getOverviewAccessProfile = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/overview/access/profile?${parameters}`)
}

export const getNetworkManagerAccessDashboard = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/access/dashboard?${parameters}`)
}

export const getNetworkManagerAccessInstitutions = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/access/institutions?${parameters}`)
}

export const getNetworkProficiency = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/network-proficiency?${parameters}`)
}

export const getNetworkProficiencyExcel = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/network-proficiency/excel?${parameters}`, {
    responseType: 'blob',
  })
}
export const getNetworkManagerPerformance = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/institutions/performance?${parameters}`)
}

export const getNetworkManagerPerformanceExcel = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/institutions/performance/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getNetworkManagerPerformanceReportClasses = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/classes/performance?${parameters}`)
}

export const getNetworkManagerPerformanceReportClassesExcel = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/classes/performance/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getSubjectModules = filters => {
  const parameters = urlString(filters)
  return axios.get(`/v1/institutions/modules/label?${parameters}`)
}

export const getReportStudentsMonitoring = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/students/monitoring?${parameters}`)
}

export const getReportStudentsMonitoringExcel = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/students/monitoring/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getReportStudentMonitoring = (filters, id) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/student/${id}/monitoring?${parameters}`)
}

export const getReportStudentMonitoringExcel = (filters, id) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/student/${id}/monitoring/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getReportStudentMonitoringActivityDetail = (filters, studentId, activityId) => {
  const parameters = urlString(filters)
  return axios.get(
    `${resource}/student/${studentId}/monitoring/activity/${activityId}?${parameters}`,
  )
}

export const getReportStudentMonitoringPlusActivityDetail = (filters, studentId) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/student/${studentId}/monitoring/plus/activity?${parameters}`)
}

export const getReportStudentMonitoringPlusQuizDetail = (filters, studentId) => {
  const parameters = urlString(filters)
  return axios.get(`${resourceV2}/student/${studentId}/monitoring/plus/quiz?${parameters}`)
}

export const getReportStudentMonitoringV2 = (filters, id) => {
  const parameters = urlString(filters)
  return axios.get(`${resourceV2}/student/${id}/monitoring?${parameters}`)
}

export const getReportStudentMonitoringV2Excel = (filters, id) => {
  const parameters = urlString(filters)
  return axios.get(`${resourceV2}/student/${id}/monitoring/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getReportStudentReportCard = data => {
  return axios.post(`${resourceV2}/student-report-card?`, data)
}
