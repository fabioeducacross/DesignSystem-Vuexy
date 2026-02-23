import { ACCESS_ROLE_ENUM } from '@/consts/accessRoleEnum'
import { ModulesEnum } from '@/consts/admin-context/enums/modules'
import { ACTION, PERMISSION } from '@/consts/permissions'
import router from '@/router'
import {
  getSubjectsLabel,
  getSubjectsLabelV2,
} from '@/services/admin-context/subjects/Subjects.service.js'
import store from '@/store'
import { can } from '@core/libs/acl/utils'
import { computed } from 'vue'

/**
 * @typedef {Object} Subject
 * @property {number} id - The ID of the subject.
 * @property {string} name - The name of the subject.
 */

/**
 * @typedef {Object} Student
 * @property {string} BackgroundColor - The background color of the student in HEX.
 * @property {string} ClassName - The name of the class.
 * @property {number} ImageId - The ID of the student's image.
 * @property {string} StudentName - The name of the student.
 * @property {string} SerieName - The name of the serie.
 * @property {number} SerieId - The ID of the serie.
 * @property {number} UserId - The ID of the student.
 */

export default function useFilters() {
  const subjects = computed({
    /** @returns {Array<Subject>} */
    get: () => store.getters['filters/subjects'],

    /** @param {Array<Subject>} val */
    set: val => {
      store.commit('filters/subjects', val)
    },
  })

  const subject = computed({
    /** @returns {Subject} */
    get: () => store.getters['filters/subject'],

    /** @param {Subject} val */
    set: val => {
      store.commit('filters/subject', val)
    },
  })

  const institution = computed({
    get: () => store.getters['filters/institution'],
    set: val => {
      store.commit('filters/institution', val)
    },
  })

  const serie = computed({
    get: () => store.getters['filters/serie'],
    set: val => {
      store.commit('filters/serie', val)
    },
  })

  const classe = computed({
    get: () => store.getters['filters/class'],
    set: val => {
      store.commit('filters/class', val)
    },
  })

  const loading = computed({
    get: () => store.getters['filters/loading'],
    set: val => {
      store.commit('filters/loading', val)
    },
  })

  const evaluationId = computed({
    get: () => store.getters['filters/evaluationId'],
    set: val => {
      store.commit('filters/evaluationId', val)
    },
  })

  const period = computed({
    get: () => store.getters['filters/period'],
    set: val => {
      store.commit('filters/period', val)
    },
  })

  const educationSystemId = computed(() => router.currentRoute.params.educationSystemId)
  const moduleId = computed(() => ModulesEnum[router.currentRoute.meta?.resource] || null)

  const isAdmin = computed(() => can(ACTION.READ, PERMISSION.GENERAL.ADMIN))
  const adminInstitutionId = computed(() => store.getters.getInstitutionId)

  const classes = computed(() => {
    // Assuming store.getters.classes returns an array of class objects
    const classesArray = store.getters.classes

    return classesArray.sort((a, b) => {
      // Move classes with 0 students to the end
      if (a.Students === 0 && b.Students !== 0) return 1
      if (a.Students !== 0 && b.Students === 0) return -1

      // If both have students, or both have 0 students, sort by SerieId
      return a.SerieId - b.SerieId
    })
  })

  const students = computed({
    /** @returns {Array<Student>} */
    get: () => store.getters['filters/students'],

    /** @param {Array<Student>} val */
    set: val => {
      store.commit('filters/students', val)
    },
  })

  const student = computed({
    /** @returns {Student} */
    get: () => store.getters['filters/student'],

    /** @param {Student} val */
    set: val => {
      store.commit('filters/student', val)
    },
  })

  const networkGroup = computed({
    get: () => store.getters['filters/networkGroup'],
    set: val => {
      store.commit('filters/networkGroup', val)
    },
  })

  const book = computed({
    get: () => store.getters['filters/book'],
    set: val => {
      store.commit('filters/book', val)
    },
  })

  const mission = computed({
    get: () => store.getters['filters/mission'],
    set: val => {
      store.commit('filters/mission', val)
    },
  })
  const parentModule = computed({
    get: () => store.getters['filters/parentModule'],
    set: val => {
      store.commit('filters/parentModule', val)
    },
  })

  const childModule = computed({
    get: () => store.getters['filters/childModule'],
    set: val => {
      store.commit('filters/childModule', val)
    },
  })

  const isTeacher = computed(() => store.getters.accessRole === ACCESS_ROLE_ENUM.TEACHER.name)

  /**
   *
   * @param {Array} [additionalModules]
   * @returns {{InstitutionId: number, SerieId: number, ClassId: number|null, EducationSystemId: number, ModuleId?: number, ModulesIds?: Array<number>}}
   */
  const getSubjectRequestParams = additionalModules => {
    const p = {
      InstitutionId: institution.value.id,
      SerieId: serie.value?.id || classe.value?.SerieId,
      ClassId: serie.value?.id || classe.value?.SerieId ? null : classe.value?.ClassId,
      EducationSystemId: educationSystemId.value,
    }

    // if is a teacher, use only classId
    if (isTeacher.value) {
      p.ClassId = classe.value?.ClassId
      p.SerieId = null
    }

    if (additionalModules && Array.isArray(additionalModules) && additionalModules.length) {
      p.ModulesIds = [moduleId.value, ...additionalModules]
    } else {
      p.ModuleId = moduleId.value
    }

    return p
  }

  /**
   * Fetches subjects based on the filters parameters.
   * @returns {Promise<void>} - A promise that resolves when the subjects are fetched successfully.
   */
  const fetchSubjects = async () => {
    loading.value = true
    try {
      const { data } = await getSubjectsLabel(getSubjectRequestParams())

      if (Array.isArray(data)) {
        subjects.value = data
      } else {
        subjects.value = []
      }
    } catch (error) {
      subjects.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetches subjects based on the provided parameters.
   *
   * @typedef {object} TParams
   * @property {number} [classId] - The ID of the class.
   * @property {number} [serieId] - The ID of the serie.
   * @property {number} [institutionId] - The ID of the institution.
   * @property {number|Array<number>} [moduleId] - The ID of the module or array of module IDs for V2.
   * @property {number} [educationSystemId] - The ID of the education system.
   * @param {TParams} params - The parameters for fetching subjects.
   * @returns {Promise<void>} - A promise that resolves when the subjects are fetched successfully.
   */
  const fetchSubjectsWithParams = async (params = {}) => {
    try {
      const useV2 = Object.hasOwn(params, 'ModulesIds')

      const data = useV2 ? await getSubjectsV2(params) : await getSubjectsV1(params)

      if (Array.isArray(data)) {
        subjects.value = data
      } else {
        subjects.value = []
      }
    } catch (error) {
      subjects.value = []
    }
  }

  const getSubjectsV1 = async body => {
    const { data } = await getSubjectsLabel(body)

    return data
  }

  const getSubjectsV2 = async body => {
    const { data } = await getSubjectsLabelV2(body)
    return data
  }

  return {
    period,
    evaluationId,
    subjects,
    subject,
    institution,
    moduleId,
    educationSystemId,
    serie,
    classe,
    classes,
    loading,
    students,
    student,
    networkGroup,
    book,
    mission,
    parentModule,
    childModule,
    isAdmin,
    adminInstitutionId,
    getSubjectRequestParams,
    fetchSubjects,
    fetchSubjectsWithParams,
  }
}
