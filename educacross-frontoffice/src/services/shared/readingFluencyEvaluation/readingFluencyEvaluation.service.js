import axiosIns from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v1/reading-fluency-evaluation'

export const getReadingEvaluations = async params => {
  // Retorna as Avaliações de Fluência de Leitura paginadas
  const parameters = urlString(params)

  return axiosIns.get(`${resource}?${parameters}`)
}

export const fetchInstitutionsFromEvaluation = async (evaluationId, params) => {
  // Retorna as Instituições da avaliação de Fluência de Leitura
  const parameters = urlString(params)
  return axiosIns.get(`${resource}/${evaluationId}/institution/label?${parameters}`)
}

export const fetchEvaluationAudits = async (id, params) => {
  // Retorna os auditores da Avaliação de Fluência de Leitura
  const parameters = urlString(params)

  return axiosIns.get(`${resource}/${id}/audits?${parameters}`)
}

export const getReadingEvaluationTests = async (id, params) => {
  // Retorna os testes da Avaliação de Fluência de Leitura
  const parameters = urlString(params)

  return axiosIns.get(`${resource}/${id}/tests?${parameters}`)
}

export const getReadingEvaluationClasses = async (id, params) => {
  // Retorna o relatório das turmas da escola na Avaliação de Fluência de Leitura
  const parameters = urlString(params)

  return axiosIns.get(`${resource}/${id}/classes?${parameters}`)
}

export const getProficiency = async () => {
  // Retorna os indicadores de proficiência usados na avaliação de fluência leitora
  return axiosIns.get(`${resource}/proficiency`)
}

export const fetchStudentsLabel = async id => {
  // Retorna os dados de estudantes simplificados
  return axiosIns.get(`${resource}/${id}/audit/student/label`)
}

export const getStudents = async (id, params) => {
  // Retorna o relatorio dos alunos na Avaliação de Fluência de Leitura
  const parameters = urlString(params)

  return axiosIns.get(`${resource}/${id}/students?${parameters}`)
}

export const getInstitutions = async (id, params) => {
  // Retorna o relatório das escolas de uma rede escolar na Avaliação de Fluência de Leitura
  const parameters = urlString(params)

  return axiosIns.get(`${resource}/${id}/institutions?${parameters}`)
}

export const getTestLabelsFluencyEvaluation = async (id, params) => {
  // Retorna as labels dos testes da Avaliação de Fluência de Leitura
  const parameters = urlString(params)

  return axiosIns.get(`${resource}/${id}/test/label?${parameters}`)
}

export const getReadingEvaluationDetail = async (id, params) => {
  // Retorna os detalhes da Avaliação de Fluência de Leitura
  const parameters = urlString(params)

  return axiosIns.get(`${resource}/${id}/detail?${parameters}`)
}

export const getReadingEvaluationStudentDetail = async (id, studentId, params) => {
  // Retorna os detalhes da Avaliação de Fluência de Leitura para um aluno específico
  const parameters = urlString(params)

  return axiosIns.get(`${resource}/${id}/student/${studentId}?${parameters}`)
}

export const toggleReadingEvaluationStatus = async (id, classId) => {
  // Alterna o status (Habilitado/Pausado) da Avaliação de Fluência de Leitura para uma turma
  return axiosIns.put(`${resource}/${id}/class/${classId}/toggle-enabled`)
}

export const cancelStudentEvaluation = async (id, params) => {
  // Cancela a avaliação para um aluno específico
  return axiosIns.put(`${resource}/${id}/student/cancel`, params)
}

export const auditFluencyTest = async (id, studentId, data) => {
  // Realiza a auditoria de um aluno no teste da avalição de Fluência Leitora

  return axiosIns.put(`${resource}/${id}/audit/student/${studentId}?`, data)
}

export const readingEvaluationNetworkEnabled = async (id, { startDate, endDate }) => {
  // habilita uma Avaliação de Fluência de Leitura para rede escolar
  return axiosIns.put(`${resource}/${id}/network/enabled`, { startDate, endDate })
}

export const readingEvaluationInstitutionEnabled = async (id, { startDate, endDate }) => {
  // habilita uma Avaliação de Fluência de Leitura para instituição
  return axiosIns.put(`${resource}/${id}/institution/enabled`, { startDate, endDate })
}

export const reapplyStudentEvaluation = async (id, data) => {
  // Reaplica a avaliação para um aluno específico

  return axiosIns.put(`${resource}/${id}/student/reapply`, data)
}
export const changeStudentProficiency = async (evaluationId, studentId, data) => {
  // Altera a proficiência de um aluno específico em uma avaliação específica
  return axiosIns.put(`${resource}/${evaluationId}/student/${studentId}/change-proficiency`, data)
}
export const assignAuditorToEvaluation = async (evaluationId, data) => {
  // Vincula o auditor as escolas
  return axiosIns.put(`${resource}/${evaluationId}/audit`, data)
}

export const fetchReadingsEvaluationProficiency = async () => {
  return axiosIns.get(`/v1/reading-fluency-evaluation/proficiency`)
}
