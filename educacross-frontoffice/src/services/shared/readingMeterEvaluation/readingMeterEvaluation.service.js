import axiosIns from '@/libs/axios'

export const fetchReadingsEvaluation = async params => {
  return axiosIns.get('/v1/reading-fluency-evaluation/audit', { params })
}

export const fetchReadingsEvaluationDetail = async (evaluationId, params) => {
  return axiosIns.get(`/v1/reading-fluency-evaluation/${evaluationId}/detail`, { params })
}

export const fetchReadingsEvaluationStudents = async (evaluationId, params) => {
  return axiosIns.get(`/v1/reading-fluency-evaluation/${evaluationId}/audit/students`, { params })
}

export const fetchReadingsEvaluationProficiency = async () => {
  return axiosIns.get(`/v1/reading-fluency-evaluation/proficiency`)
}
