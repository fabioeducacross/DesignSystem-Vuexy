import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/ranking'
const resourceV2 = '/v2/ranking'
const resourceEducation = '/v1/educationsystems'

const checkAttribute = (data, label) => {
  if (Array.isArray(data)) {
    let string = ''

    data.forEach(classe => {
      string += `${label}=${classe}&`
    })

    return string
  }
  return data === 0 || data ? `${label}=${data}` : ''
}

export const getRankingByClass = (id, subjectId = null) => {
  const params = subjectId ? `?SubjectId=${subjectId}` : ''
  return axios.get(`${resource}/class/${id}${params}`)
}

export const getSchoolRanking = ({ subjectId, serieId, classIds, timePeriod, month }) => {
  if (timePeriod === null) {
    return axios.get(
      `${resource}/guide?${checkAttribute(subjectId, 'SubjectId')}&${checkAttribute(
        serieId,
        'SerieId',
      )}&${checkAttribute(classIds, 'ClassIds')}${checkAttribute(timePeriod, 'TimePeriod')}`,
    )
  }
  return axios.get(
    `${resource}/guide?${checkAttribute(subjectId, 'SubjectId')}&${checkAttribute(
      serieId,
      'SerieId',
    )}&${checkAttribute(classIds, 'ClassIds')}&${checkAttribute(month, 'Month')}&TimePeriod=0`,
  )
}

/**
 * @deprecated
 */
export const getEducationSystemRanking = ({
  subjectId,
  serieId,
  classIds,
  timePeriod,
  month,
  educationSystemId,
}) => {
  if (timePeriod === null) {
    return axios.get(
      `${resource}/education-system?${checkAttribute(subjectId, 'SubjectId')}&${checkAttribute(
        serieId,
        'SerieId',
      )}&${checkAttribute(classIds, 'ClassIds')}&${checkAttribute(
        timePeriod,
        'TimePeriod',
      )}&${checkAttribute(educationSystemId, 'EducationSystemId')}`,
    )
  }
  return axios.get(
    `${resource}/education-system?${checkAttribute(subjectId, 'SubjectId')}&${checkAttribute(
      serieId,
      'SerieId',
    )}&${checkAttribute(classIds, 'ClassIds')}&${checkAttribute(month, 'Month')}&${checkAttribute(
      educationSystemId,
      'EducationSystemId',
    )}&TimePeriod=0`,
  )
}

// new MissionsRankingReport ending point
export const getMissionsRankingReport = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/guide?${parameters}`)
}

export const getMissionsRanking = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resourceV2}/guide?${parameters}`)
}

export const getMissionsRankingExportExcel = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resourceV2}/guide/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getMissionsLabelByClassId = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/guide/label?${parameters}`)
}

export const getInstitutionsMissionsRanking = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/institutions/guide?${parameters}`)
}

export const getInstitutionsMissionsRankingExportExcel = filters => {
  const parameters = urlString(filters)
  return axios.get(`${resource}/institutions/guide/excel?${parameters}`, {
    responseType: 'blob',
  })
}

export const getEducationSystemRankingReport = ({ subjectId, classId }) =>
  axios.get(
    `${resourceEducation}/ranking?${checkAttribute(subjectId, 'SubjectId')}&${checkAttribute(
      classId,
      'ClassId',
    )}`,
  )
