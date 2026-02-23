import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = 'v1/evaluations'
const resourceV2 = 'v2/evaluations'

export const getEvaluations = filters => {
  const parameters = urlString(filters)

  return axios.get(`${resource}?${parameters}`)
}

export const getEvaluationsV2 = filters => {
  const parameters = urlString(filters)

  return axios.get(`${resourceV2}?${parameters}`)
}

export const getEvaluationDetails = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/details?${parameters}`)
}

export const getEvaluationInstitutionsDashboard = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/dashboard?${parameters}`)
}

export const getEvaluationInstitutions = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/institutions?${parameters}`)
}

export const getEvaluationClassDashboard = (id, classId, institutionId = '') =>
  axios.get(`${resource}/${id}/class/dashboard?&ClassId=${classId}&InstitutionId=${institutionId}`)

export const getEvaluationStudents = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/students?${parameters}`)
}

export const getEvaluationInstitutionsClasses = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/classes?${parameters}`)
}

export const getEvaluationInstitutionsClassesDashboard = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/institution/dashboard?${parameters}`)
}

export const getEvaluationTCTDashboard = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/tct/dashboard?${parameters}`)
}

export const getEvaluationTCTInstitutions = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/tct/institutions?${parameters}`)
}

export const getEvaluationTCTInstitutionsExcel = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/tct/institutions/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getEvaluationTCTInstitutionsReportPDF = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/tct/institutions/pdf?${parameters}`, {
    responseType: 'blob',
  })
}

export const getEvaluationTCTReportPDF = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/tct/class/pdf?${parameters}`, {
    responseType: 'blob',
  })
}

export const getEvaluationTCTClassDashboard = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/tct/class/dashboard?${parameters}`)
}
export const getEvaluationTCTStudents = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/tct/students?${parameters}`)
}

export const getEvaluationTCTStudentsExcel = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/tct/students/excel?${parameters}`, {
    responseType: 'blob',
  })
}
export const getEvaluationTCTClasses = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/tct/classes?${parameters}`)
}

export const getEvaluationTCTClassesExcel = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/tct/classes/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getEvaluationTCTClassesReportPDF = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/tct/classes/pdf?${parameters}`, {
    responseType: 'blob',
  })
}

export const getEvaluationTCTInstitutionDashboard = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/tct/institution/dashboard?${parameters}`)
}

export const getEvaluationTCTInstitutionsAbility = (id, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${id}/descriptors?${parameters}`)
}

export const getEvaluationTCTInstitutionsAbilityExcel = (id, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${id}/descriptors/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getEvaluationTCTClassesAbility = (id, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${id}/descriptors/institution?${parameters}`)
}

export const getEvaluationTCTClassesAbilityExcel = (id, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${id}/descriptors/institution/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getEvaluationTCTStudentsAbility = (id, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${id}/descriptors/class?${parameters}`)
}

export const getEvaluationTCTStudentsAbilityExcel = (id, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${id}/descriptors/class/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getEvaluationEducationalOrganization = (id, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${id}/educational-organization/label?${parameters}`)
}

export const getEvaluationQuestionsInstitutions = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/questions/institutions?${parameters}`)
}

export const getEvaluationQuestionsInstitutionsExcel = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/questions/institutions/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getEvaluationQuestionsClasses = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/questions/classes?${parameters}`)
}

export const getEvaluationQuestionsClassesExcel = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/questions/classes/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getEvaluationQuestions = (id, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${id}/questions?${parameters}`)
}

export const getEvaluationStudentsQuestions = (id, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${id}/students/questions?${parameters}`)
}

export const getEvaluationStudentsQuestion = (id, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resourceV2}/${id}/students/question?${parameters}`)
}

export const getEvaluationTestsLabel = (id, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${id}/tests/label?${parameters}`)
}

export const postEvaluationsActivate = (id, parameters) => {
  return axios.post(`${resource}/${id}/activate`, parameters)
}

export const postEvaluationsclassesEnable = (id, classId) => {
  return axios.post(`${resource}/${id}/classes/${classId}/enable`)
}

export const toggleEvaluationClass = (id, classId) => {
  return axios.post(`${resource}/${id}/classes/${classId}/toggle`)
}

export const getEvaluationStudentsLabel = (id, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${id}/students/label?${parameters}`)
}

export const getEvaluationTRIDashboard = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/tri/dashboard?${parameters}`)
}

export const getEvaluationTRIInstitutions = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/tri/institutions?${parameters}`)
}

export const getEvaluationTRIInstitutionsExcel = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/tri/institutions/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getEvaluationTRIClasses = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/tri/classes?${parameters}`)
}

export const getEvaluationTRIClassesExcel = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/tri/classes/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getEvaluationTRIInstitutionDashboard = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/tri/institution/dashboard?${parameters}`)
}

export const getEvaluationTRIClassDashboard = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/tri/class/dashboard?${parameters}`)
}
export const getEvaluationTRIStudents = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/tri/students?${parameters}`)
}

export const getEvaluationTRIStudentsExcel = (id, filters) => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/${id}/tri/students/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getEvaluationInstitutionsOptions = (id, params) => {
  return axios.get(`${resource}/${id}/institutions/label`, { params })
}
export const getEvaluationDetailsV2 = (id, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${id}/questions-details?${parameters}`)
}

export const getEvaluationAnswerKey = (id, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${id}/answer-key?${parameters}`)
}

export const getEvaluationAnswerKeyStudentQuestions = (id, studentId, filters) => {
  const parameters = urlString(filters)

  return axios.get(`${resource}/${id}/answer-key/student/${studentId}/questions?${parameters}`)
}

/**
 * @typedef {object} DigitalEvaluation
 * @property {string} name - The name of the report, in this case, "SWIM".
 * @property {string} logoUrl - The URL of the logo associated with the report.
 * @property {number[]} subjectsIds - An array of IDs for the subjects covered in the report.
 * @property {string} startDate - The start date and time of the assessment period in ISO 8601 format.
 * @property {string} endDate - The end date and time of the assessment period in ISO 8601 format.
 * @property {Student[]} students - An array of student objects, each containing their assessment data.
 */

/**
 * Represents a student's data within the report.
 * It includes personal information and a summary of their test performance.
 *
 * @typedef {object} Student
 * @property {number} id - The unique identifier for the student.
 * @property {number} totalTests - The total number of tests taken by the student.
 * @property {string} name - The full name of the student.
 * @property {string} className - The name of the student's class.
 * @property {string} institutionName - The name of the educational institution.
 * @property {string} serieName - The name of the student's grade or series.
 * @property {Test[]} tests - An array of tests taken by the student.
 */

/**
 * Represents a single test taken by a student.
 * It details the subject and the questions included in the test.
 *
 * @typedef {object} Test
 * @property {number} notebook - The notebook number associated with the test.
 * @property {number} subjectId - The unique identifier for the subject of the test.
 * @property {string} subjectName - The name of the subject.
 * @property {number} totalQuestions - The total number of questions in the test.
 * @property {Question[]} questions - An array of question objects that make up the test.
 */

/**
 * Represents a single question within a test.
 * Each question has a unique ID and a set of contents that form the question and its options.
 *
 * @typedef {object} Question
 * @property {number} id - The unique identifier for the question.
 * @property {Content[]} contents - An array of content objects that describe the various parts of the question.
 */

/**
 * Represents a piece of content for a question.
 * This can be the question text, an image, or one of the answer options.
 *
 * @typedef {object} Content
 * @property {number} questionType - An identifier for the type of content (e.g., 1 for question text, 2 for image, 4-8 for options).
 * @property {number} questionContentType - An identifier for the nature of the content's value (e.g., 1 for text, 2 for a URL).
 * @property {string} value - The actual content, which could be text or a URL to an image.
 */

/**
 *
 * @param id
 * @param classId
 * @returns {Promise<AxiosResponse<DigitalEvaluation>>}
 */
export const getEvaluationInfoToDownload = (id, classId) => {
  return axios.get(`${resource}/${id}/download?ClassId=${classId}`)
}

/**
 * @typedef {Object} Content
 * @property {number} questionType - The type of the question.
 * @property {number} questionContentType - The content type of the question.
 * @property {string} value - The content value of the question.
 */

/**
 * @typedef {Object} Question
 * @property {number} id - The unique identifier for the question.
 * @property {Content[]} contents - An array of content objects for the question.
 */

/**
 * @typedef {Object} Test
 * @property {number} notebook - The notebook identifier.
 * @property {number} subjectId - The subject identifier.
 * @property {string} subjectName - The name of the subject.
 * @property {number} totalQuestions - The total number of questions in the test.
 * @property {Question[]} questions - An array of questions in the test.
 */

/**
 * @typedef {Object} Student
 * @property {number} id - The unique identifier for the student.
 * @property {number} totalTests - The total number of tests for the student.
 * @property {string} name - The name of the student.
 * @property {string} className - The name of the student's class.
 * @property {string} institutionName - The name of the student's institution.
 * @property {string} serieName - The name of the student's series.
 * @property {Test[]} tests - An array of tests associated with the student.
 */

/**
 * @typedef {Object} Course
 * @property {string} name - The name of the course.
 * @property {string} logoUrl - The URL of the course logo.
 * @property {number[]} subjectsIds - An array of subject identifiers.
 * @property {string} startDate - The start date of the course (ISO 8601 format).
 * @property {string} endDate - The end date of the course (ISO 8601 format).
 * @property {Student[]} students - An array of students enrolled in the course.
 */

/**
 * Get evaluation information for download (version 2).
 * @param id
 * @param classId
 * @returns {Promise<axios.AxiosResponse<Course>>}
 */
export const getEvaluationInfoToDownloadV2 = (id, classId) => {
  return axios.get(`${resourceV2}/${id}/download?ClassId=${classId}`)
}

export const postEvaluationAnswerKeyStudentQuestions = (id, studentId, params) => {
  return axios.post(`${resource}/${id}/answer-key/student/${studentId}/questions`, params)
}
