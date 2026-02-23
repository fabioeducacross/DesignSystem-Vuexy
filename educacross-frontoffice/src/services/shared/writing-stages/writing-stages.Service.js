import axiosIns from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/writing-stages'

export const getWritingStagesClass = (id, filters) => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/class/${id}?${parameters}`)
}

export const getWritingStagesClassExcel = id => {
  return axiosIns.get(`${resource}/class/${id}/excel`, {
    responseType: 'blob',
  })
}

export const getWritingStagesTest = (id, filters) => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/test/${id}?${parameters}`)
}

export const putWritingStagesEnable = data => axiosIns.put(`${resource}/enable`, data)

export const putWritingStagesStudentEvaluate = data => {
  const config = {
    header: {
      'Content-Type': 'multipart/form-data',
    },
  }

  return axiosIns.put(`${resource}/student/evaluates`, data, config)
}

export const getWritingStagesNetworkOverview = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/network/overview?${parameters}`)
}

export const getWritingStagesNetworkOverviewInstitution = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/network/overview/institution?${parameters}`)
}

/**
 * Parameters for the API request.
 *
 * @typedef {Object} WritingPhaseClassesParams
 * @property {number} Apply - Apply filter (*).
 * @property {number} InstitutionId - The ID of the institution (minimum: 1).
 * @property {number[]} SeriesIds - An array of series IDs.
 * @property {string} [Search] - Search query (max length: 100).
 * @property {number} [OrderBy] - Order by field. Possible values:
 *   - 0 = Name
 *   - 1 = SerieName
 *   - 2 = Students
 * @property {boolean} [Ascending] - Whether to order results in ascending order.
 * @property {number} Page - The page number (minimum: 1).
 * @property {number} PageSize - The number of items per page (minimum: 1, maximum: 100).
 */

/**
 * API response structure.
 *
 * @typedef {Object} WritingPhaseClassesResponse
 * @property {Array<WritingPhaseClassesResponseSchoolData>} data - List of school data records.
 * @property {string[]} orderBy - List of orderBy fields.
 * @property {Object.<string, string>} orderByDescription - Mapping of orderBy fields to their descriptions.
 * @property {number} currentPage - The current page number.
 * @property {number} pageSize - The number of items per page.
 * @property {number} currentPageSize - The actual number of items returned on the current page.
 * @property {number} totalPages - The total number of pages.
 * @property {number} total - The total number of records.
 */

/**
 * Represents a single school data record.
 *
 * @typedef {Object} WritingPhaseClassesResponseSchoolData
 * @property {number} id - The unique identifier of the record.
 * @property {string} name - The name of the school or entity.
 * @property {string} serieName - The name of the series.
 * @property {number} students - Total number of students.
 * @property {number} studentsNotStart - Number of students who haven't started.
 * @property {number} studentsPreSyllabic - Number of pre-syllabic students.
 * @property {number} studentsSyllabicWithoutSoundValue - Number of syllabic students without sound value.
 * @property {number} studentsSyllabicWithSoundValue - Number of syllabic students with sound value.
 * @property {number} studentsSyllabicAlphabetic - Number of syllabic-alphabetic students.
 * @property {number} studentsAlphabetic - Number of alphabetic students.
 * @property {number} studentsOrthographi - Number of orthographic students.
 */

/**
 * @param {WritingPhaseClassesParams} data
 * @return {Promise<AxiosResponse<WritingPhaseClassesResponse>>}
 */
export const getWritingPhaseClasses = data => {
  const params = urlString(data)
  return axiosIns.get(`${resource}/institution/overview/classes?${params}`)
}

/**
 *
 * @typedef {Object} WritingStagesInstitutionOverview
 * @property {string} institutionName - The name of the institution.
 * @property {number} writingStagesTestId - The unique identifier for the writing stages test.
 * @property {number} apply - The apply identifier.
 * @property {string} applyName - The name associated with the apply identifier.
 * @property {boolean} blocked - Indicates if the test is blocked.
 * @property {boolean} enabled - Indicates if the test is enabled.
 * @property {number} students - The total number of students.
 * @property {number} studentsNotStart - Number of students who haven't started.
 * @property {number} studentsPreSyllabic - Number of pre-syllabic students.
 * @property {number} studentsSyllabicWithoutSoundValue - Number of syllabic students without sound value.
 * @property {number} studentsSyllabicWithSoundValue - Number of syllabic students with sound value.
 * @property {number} studentsSyllabicAlphabetic - Number of syllabic-alphabetic students.
 * @property {number} studentsAlphabetic - Number of alphabetic students.
 * @property {number} studentsOrthographi - Number of orthographic students.
 */

/**
 * @param {{institutionId: Number, seriesIds: Number[]}} data
 * @return {Promise<AxiosResponse<WritingStagesInstitutionOverview[]>>}
 */
export const getWritingPhaseInstitutionOverview = data => {
  const params = urlString(data)
  return axiosIns.get(`${resource}/institution/overview?${params}`)
}

/**
 * @param {number | string} classId
 * @param {number | string} studentId
 * @returns {Promise<AxiosResponse<StudentWritingAnalysis>>}
 */
export const getWritingStagesStudent = (classId, studentId) =>
  axiosIns.get(`${resource}/class/${classId}/student/${studentId}`)

/**
 * @returns {Promise<AxiosResponse<WritingStageAnalysis>>}
 */
export const getWritingStagesAnalysis = () => axiosIns.get(`${resource}/analisys`)

/**
 * @param {{NetworkGroupsIds: Number[], InstitutionsIds: Number[]}} filters
 * @returns {Promise<AxiosResponse<{id: Number, name: String }>>}
 */
export const getWritingStagesSeriesLabel = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/series/label?${parameters}`)
}
