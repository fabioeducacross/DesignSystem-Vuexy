import axiosIns from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/reading-expedition'
const resourceV2 = '/v2/reading-expedition'

// ########################### inicio Enums ###########################

/**
 * Enum representing the status of a student test.
 * @readonly
 * @enum {number}
 */
export const TestStatusEnum = {
  toStart: 1,
  started: 2,
  finished: 3,
  locked: 4,
}

// ########################### fim Enums ###########################

// ########################### inicio aba visao geral ###########################

/**
 * Represents the list of students and their test results.
 * @typedef {Object} StudentTestResults
 * @property {number} id - The ID of the student.
 * @property {string} name - The name of the student.
 * @property {Array<StudentTest>} data - The test results of the student.
 */

/**
 * Represents the test results of a student.
 * @typedef {Object} StudentTest
 * @property {number} id - The ID of the test.
 * @property {TestStatusEnum} status - The status of the test.
 */

/**
 * Represents the list of tests and their results.
 * @typedef {Object} TestResultsList
 * @property {boolean} autoUnlock - Indicates if the tests are automatically unlocked.
 * @property {Array<string>} table - The table of tests.
 * @property {Array<StudentTestResults>} students - The list of students and their test results.
 */

/**
 * Represents the list of students and their test results.
 * @typedef {Object} StudentTestResults
 * @property {number} id - The ID of the student.
 * @property {string} name - The name of the student.
 */

/**
 * Represents the test results of a student.
 * @typedef {Object} StudentTest
 * @property {number} time - The time taken for the test.
 * @property {TestProficiencyEnum} proficiency - The proficiency level of the test.
 * @property {boolean} proeficiencyByAI - The proficiency level of the test as determined by AI.
 * @property {TestStatusEnum} status - The status of the test.
 *
 */

/**
 * Represents the list of tests and their results.
 * @typedef {Object} TestResultsPerformanceList
 * @property {boolean} autoUnlock - Indicates if the tests are automatically unlocked.
 * @property {Array<string>} table - The table of tests.
 * @property {Array<StudentTestResults>} students - The list of students and their test results.
 *
 */

/**
 * Represents a passport object containing information about a student's reading expedition.
 *
 * @typedef {Object} Passport
 * @property {string} studentName - The name of the student.
 * @property {string} className - The class name of the student.
 * @property {FluencyTest[]} fluencyTests - An array of fluency tests.
 * @property {Unity[]} unities - An array of unities.
 */

/**
 * Represents a fluency test.
 *
 * @typedef {Object} FluencyTest
 * @property {string} name - The name of the fluency test.
 * @property {TestStatusEnum} status - The status of the fluency test.
 * @property {number} time - The time taken for the fluency test.
 * @property {TestProficiencyEnum} proficiency - The proficiency level of the fluency test.
 * @property {TestProficiencyEnum} proeficiencyByAI - The proficiency level determined by AI for the fluency test.
 */

/**
 * Represents a unity.
 *
 * @typedef {Object} Unity
 * @property {string} name - The name of the unity.
 * @property {string} imageUrl - The URL of the unity's image.
 * @property {boolean} unlocked - Indicates if the unity is unlocked.
 * @property {ReadingChallenge} readingChallenge - The reading challenge of the unity.
 * @property {WritingChallenge} writingChallenge - The writing challenge of the unity.
 * @property {CompreehensionChallenge} compreehensionChallenge - The comprehension challenge of the unity.
 * @property {GamesTrail} gamesTrail - The games trail of the unity.
 */

/**
 * Represents a reading challenge.
 *
 * @typedef {Object} ReadingChallenge
 * @property {TestStatusEnum} status - The status of the reading challenge.
 * @property {TestProficiencyEnum} proficiency - The proficiency level of the reading challenge.
 * @property {TestProficiencyEnum} proeficiencyByAI - The proficiency level determined by AI for the reading challenge.
 * @property {number} time - The time taken for the reading challenge.
 */

/**
 * Represents a writing challenge.
 *
 * @typedef {Object} WritingChallenge
 * @property {TestProficiencyEnum} proficiency - The proficiency level of the writing challenge.
 * @property {TestProficiencyEnum} proeficiencyByAI - The proficiency level determined by AI for the writing challenge.
 * @property {number} time - The time taken for the writing challenge.
 */

/**
 * Represents a comprehension challenge.
 *
 * @typedef {Object} CompreehensionChallenge
 * @property {TestProficiencyEnum} proficiency - The proficiency level of the comprehension challenge.
 * @property {TestProficiencyEnum} proeficiencyByAI - The proficiency level determined by AI for the comprehension challenge.
 * @property {number} time - The time taken for the comprehension challenge.
 */

/**
 * Represents a games trail.
 *
 * @typedef {Object} GamesTrail
 * @property {TestProficiencyEnum} proficiency - The proficiency level of the games trail.
 * @property {TestProficiencyEnum} proeficiencyByAI - The proficiency level determined by AI for the games trail.
 * @property {number} time - The time taken for the games trail.
 */

// ########################### fim aba visao geral ###########################

// ########################### inicio aba testes de fluencia ###########################

/**
 * Represents the test results for a reading expedition.
 * @typedef {Object} TestResults
 * @property {number} totalStudents - The total number of students.
 * @property {number} studentsNotStarted - The number of students who have not started the expedition.
 * @property {number} studentsUnderBasics - The number of students who are under the basics level.
 * @property {number} studentsAtAverage - The number of students who are at the average level.
 * @property {number} studentsAboveAverage - The number of students who are above the average level.
 * @property {number} studentsAdvanced - The number of students who are at the advanced level.
 * @property {Array<Student>} students - The list of students and their information.
 */

/**
 * Represents a student.
 * @typedef {Object} Student
 * @property {number} id - The ID of the student.
 * @property {string} name - The name of the student.
 * @property {number} playTime - The play time of the student.
 * @property {TestProficiencyEnum} proeficiency - The proficiency level of the student.
 * @property {TestProficiencyEnum} proeficiencyByAI - The proficiency level of the student as determined by AI.
 */

/**
 * @typedef {Object} accuracy
 * @property {number} correctWords - The number of correct words.
 * @property {number} pronuncedWords - The number of pronounced words.
 *
 * @typedef {Object} referenceWords
 * @property {string} word - The word.
 *
 * @typedef {Object} transcription
 * @property {string} word - The word.
 * @property {WordStatusEnum} reading - The reading.
 *
 * @typedef {Object} indicators
 * @property {TestProficiencyEnum} type - The type of indicator.
 * @property {string} label - The label.
 * @property {number} startValue - The start value.
 * @property {number} endValue - The end value.
 *
 * @typedef {Object} report
 * @property {string} readingDate - The reading date.
 * @property {string} audioFileUrl - The URL of the audio file.
 * @property {TestProficiencyEnum} proficiency - The proficiency.
 * @property {TestProficiencyEnum} proeficiencyByAI - The proficiency by AI.
 * @property {number} correctWordsProficiency - The number of correct words proficiency.
 * @property {number} wordsPerMinutes - The number of words per minute.
 * @property {accuracy} accuracy - The accuracy.
 * @property {number} completeness - The completeness.
 * @property {number} omittedWords - The omitted words.
 * @property {referenceWords[]} referenceWords - The reference words.
 * @property {transcription[]} transcription - The transcription.
 *
 * @typedef {Object} reading_fluency
 * @property {ReadingFluencyTypesEnum} type - The type of reading fluency.
 * @property {string} name - The name.
 * @property {string} imageUrl - The URL of the image.
 * @property {string} studentName - The name of the student.
 * @property {report} report - The report.
 * @property {indicators[]} indicators - The indicators.
 *
 * @type {reading_fluency}
 */

// ########################### fim aba testes de fluencia ###########################

// ########################### inicio unidades ###########################

/**
 * type Unity
 * @typedef {Object} Unity
 * @property {number} id - The ID of the unity.
 * @property {string} title - The title of the unity.
 * @property {Book} book - The book of the unity.
 *
 * type Book
 * @typedef {Object} Book
 * @property {string} name - The name of the book.
 * @property {string} imageUrl - The URL of the book image.
 * @property {string} author - The author of the book.
 */

/**
 * type UnityStudents
 * @typedef {Object} UnityStudents
 * @property {number} id - The ID of the student.
 * @property {string} name - The name of the student.
 * @property {Challenges} challenges - The challenges of the student.
 *
 * type Challenges
 * @typedef {Object} Challenges
 * @property {ReadingChallenge} readingChallenge - The reading challenge of the student.
 * @property {WritingChallenge} writingChallenge - The writing challenge of the student.
 * @property {CompreehensionChallenge} compreehensionChallenge - The comprehension challenge of the student.
 * @property {GamesTrail} gamesTrail - The games trail of the student.
 *
 * type ReadingChallenge
 * @typedef {Object} ReadingChallenge
 * @property {TestStatusEnum} status - The status of the reading challenge.
 * @property {TestProficiencyEnum} proficiency - The proficiency level of the reading challenge.
 * @property {TestProficiencyEnum} proeficiencyByAI - The proficiency level determined by AI for the reading challenge.
 * @property {number} time - The time taken for the reading challenge.
 *
 * type WritingChallenge
 * @typedef {Object} WritingChallenge
 * @property {TestProficiencyEnum} proficiency - The proficiency level of the writing challenge.
 * @property {TestProficiencyEnum} proeficiencyByAI - The proficiency level determined by AI for the writing challenge.
 * @property {number} time - The time taken for the writing challenge.
 *
 * type CompreehensionChallenge
 * @typedef {Object} CompreehensionChallenge
 * @property {TestProficiencyEnum} proficiency - The proficiency level of the comprehension challenge.
 * @property {TestProficiencyEnum} proeficiencyByAI - The proficiency level determined by AI for the comprehension challenge.
 * @property {number} time - The time taken for the comprehension challenge.
 *
 * type GamesTrail
 * @typedef {Object} GamesTrail
 * @property {TestProficiencyEnum} proficiency - The proficiency level of the games trail.
 * @property {TestProficiencyEnum} proeficiencyByAI - The proficiency level determined by AI for the games trail.
 * @property {number} time - The time taken for the games trail.
 */

/**
 * @typedef {Object} question
 * @property {number} questionId - The ID of the question.
 * @property {number} subjectId - The ID of the subject.
 * @property {number} templateId - The ID of the template.
 * @property {number} totalTime - The total time taken.
 * @property {number} level - The level of the question.
 * @property {number} rightAlternative - The right alternative.
 * @property {number} awnser - The answer.
 * @property {string} educationalOrganizationName - The name of the educational organization.
 * @property {Array<content>} content - The content of the question.
 *
 * @typedef {Object} content
 * @property {number} questionType - The type of the question.
 * @property {number} questionContentType - The content type of the question.
 * @property {string} value - The value of the question.
 *
 * @typedef {Object} knowledgeAxes
 * @property {string} knowledgeAxisName - The name of the knowledge axis.
 * @property {Array<string>} descriptors - The descriptors of the knowledge axis.
 *
 */

/**
 * Represents the data
 * @typedef {Object} Guides
 * @property {number} id - The ID of the guide.
 * @property {string} name - The title of the guide.
 * @property {string} imageUrl - The URL of the guide image.
 * @property {number} qtdMission - The quantity of missions.
 * @property {number} qtdChallenge - The quantity of challenges.
 * @property {number} time - The time taken.
 * @property {number} performance - The performance in %.
 *
 *
 * Represents a list of games trails.
 *
 * @typedef {Object} GamesTrailList
 * @property {string} orderBy - The order by field.
 * @property {number} currentPage - The current page number.
 * @property {number} pageSize - The page size.
 * @property {number} currentPageSize - The current page size.
 * @property {number} totalPages - The total number of pages.
 * @property {number} total - The total number of games trails.
 * @property {Array<Guides>} data - The array of games trails.
 */

/**
 * Represents the details of a game trail list.
 *
 * @typedef {Object} GamesTrailListDetails
 * @property {string} name - The name of the game.
 * @property {number} challengesDone - The number of challenges done in the game.
 * @property {number} attempts - The number of attempts made in the game.
 * @property {string} studentName - The name of the student.
 * @property {Array<ActivityAttempt>} activityAttempt - The list of activity attempts made in the game.
 */

/**
 * Represents an activity attempt made in a game.
 *
 * @typedef {Object} ActivityAttempt
 * @property {number} attempt - The attempt number.
 * @property {string} date - The date and time of the attempt.
 * @property {number} hits - The number of hits in the attempt.
 * @property {number} errors - The number of errors in the attempt.
 * @property {boolean} finish - Indicates if the attempt was finished.
 * @property {number} totalTime - The total time taken for the attempt.
 */

export const getReadingFluencyTests = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/reading-fluencies?${parameters}`)
}

export const getReadingFluencyTestResults = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/reading-fluency?${parameters}`)
}

export const getReadingFluencyTestResultsExcel = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/reading-fluency/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const putReadingExpeditionClassStage = (id, data) =>
  axiosIns.put(`${resource}/class/${id}/stage/enable`, data)

export const getReadingUnits = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/units?${parameters}`)
}

export const getReadingUnitsResults = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/unit?${parameters}`)
}

export const getReadingUnitsResultsExcel = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/unit/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getCompreehensionChallenge = (id, filters) => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resourceV2}/unit/student/${id}/understanding-challenge?${parameters}`)
}

export const getReadingChallenge = (id, filters) => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/unit/student/${id}/reading-challenge?${parameters}`)
}

export const getWritingChallenge = (id, filters) => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/unit/student/${id}/writing-challenge?${parameters}`)
}

export const getReadingFluency = (id, filters) => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/reading-fluency/student/${id}?${parameters}`)
}

/**
 * Parameters for retrieving a list of game trails.
 * @typedef {Object} GetGamesTrailListParams
 * @property {number} guideId - The ID of the guide.
 * @property {string} [search] - Optional search term used in the query.
 * @property {Stage} stage - The stage (unit) to be used in the query.
 */

/**
 * Fetches a list of game trails for a student using specified filters.
 * @param {number} studentId - The ID of the student.
 * @param {GetGamesTrailListParams} filters - The filters to apply in the fetch request.
 * @returns {AxiosPromise} - A promise that resolves with the API response.
 */
export const getGamesTrailList = (studentId, filters) => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/unit/student/${studentId}/guide?${parameters}`)
}

/**
 * Parameters for retrieving a list of game trails.
 * @typedef {Object} GetGamesTrailActivityDetailParams
 * @property {number} guideId - The ID of the guide.
 * @property {number} activityId - The ID of the activity.
 */

/**
 * Fetches a list of game trails for a student using specified filters.
 * @param {number} studentId - The ID of the student.
 * @param {GetGamesTrailActivityDetailParams} filters - The filters to apply in the fetch request.
 * @returns {AxiosPromise} - A promise that resolves with the API response.
 */
export const getGamesTrailListDetails = (studentId, filters) => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/unit/student/${studentId}/guide/activity?${parameters}`)
}

/**
 * Parameters for retrieving a list of game trails.
 * @typedef {Object} GetGamesTrailMissionsListParams
 * @property {Stage} stage - The stage (unit) to be used in the query.
 */

/**
 * Fetches a list of game trails for a student using specified filters.
 * @param {number} studentId - The ID of the student.
 * @param {GetGamesTrailMissionsListParams} filters - The filters to apply in the fetch request.
 * @returns {AxiosPromise} - A promise that resolves with the API response.
 */
export const getGamesTrailMissionsList = (studentId, filters) => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/unit/student/${studentId}/guide/label?${parameters}`)
}

/**
 * download the game trail's  report.
 * @param {number} studentId - The ID of the student.
 * @param {GetGamesTrailListParams} filters - The filters to apply in the fetch request.
 * @param {string} fileName - The file name for the file.
 */
export const gamesTrailExportExcel = (studentId, filters) => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/unit/student/${studentId}/guide/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getReadingExpedition = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}?${parameters}`)
}

export const getReadingExpeditionExcel = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const putReadingExpeditionStudent = (id, data) =>
  axiosIns.put(`${resource}/student/${id}/enable`, data)

export const putReadingExpeditionClass = (id, data) =>
  axiosIns.put(`${resource}/class/${id}/enable`, data)

export const getReadingExpeditionStudentsPassport = id => {
  return axiosIns.get(`${resource}/student/${id}/passport`)
}

export const putReadingExpeditionStudentChangeLevel = (id, data) => {
  return axiosIns.put(`${resource}/student/${id}/change-level`, data)
}

export const getReadingExpeditionUnitChallenges = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/unit/challenges?${parameters}`)
}

export const getReadingExpeditionOverview = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/overview?${parameters}`)
}

export const getReadingExpeditionOverviewStudents = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/overview/students?${parameters}`)
}

export const getReadingExpeditionSeries = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/serie?${parameters}`)
}

export const getReadingExpeditionStudents = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/students?${parameters}`)
}

export const getReadingExpeditionStudentsExcel = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/students/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getReadingExpeditionStudentsDashboard = filters => {
  const parameters = urlString(filters)
  return axiosIns.get(`${resource}/students/dashboard?${parameters}`)
}

export const getReadingExpeditionProficiency = () => {
  return axiosIns.get(`${resource}/proficiency`)
}
