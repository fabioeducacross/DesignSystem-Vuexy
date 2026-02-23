import { getStudentsV2 } from '@/services/admin-context/students/Students.service'
import store from '@/store'
import useFilter from '@/store/filters/useFilters'
import { computed, ref } from 'vue'

const { serie, classe } = useFilter()

/**
 * @readonly
 * @type {'ModuleStudentSRecord'}
 */
const module_name = 'ModuleStudentSRecord'

const refSideBarCreateStudent = ref(null)
const listTableRef = ref(null)

/**
 * @typedef {Object} ClassRecordStudent
 * @property {Number} id
 * @property {String} name
 * @property {Boolean} standard
 */

/**
 * @typedef {Object} StudentRecordStudent
 * @property {Number} id
 * @property {String} name
 * @property {String} sponsorEmail
 * @property {String} serieName
 * @property {Boolean} isIntegrator
 * @property {Boolean} enabledSendEmail
 * @property {Number} idiomId
 * @property {Array<ClassRecordStudent>} classes
 */

export function useRecordStudents() {
  /**
   * @type {import('vue').WritableComputedRef<Array<StudentRecordStudent>>}
   */
  const studentsList = computed({
    get: () => store.getters[`${module_name}/studentsList`],
    set: value => store.commit(`${module_name}/studentsList`, value),
  })

  const total = computed({
    get: () => store.getters[`${module_name}/total`],
    set: value => store.commit(`${module_name}/total`, value),
  })

  const totalLicenses = computed({
    get: () => store.getters[`${module_name}/totalLicenses`],
    set: value => store.commit(`${module_name}/totalLicenses`, value),
  })

  const usedLicenses = computed({
    get: () => store.getters[`${module_name}/usedLicenses`],
    set: value => store.commit(`${module_name}/usedLicenses`, value),
  })

  const params = computed({
    get: () => store.getters[`${module_name}/params`],
    set: value => store.commit(`${module_name}/params`, value),
  })

  const loading = computed({
    get: () => store.getters[`${module_name}/loading`],
    set: value => store.commit(`${module_name}/loading`, value),
  })

  /**
   * @type {import('vue').WritableComputedRef<Array<StudentRecordStudent>>}
   */
  const selectedStudents = computed({
    get: () => store.getters[`${module_name}/selectedStudents`],
    set: value => store.commit(`${module_name}/selectedStudents`, value),
  })

  const resetTable = () => {
    selectedStudents.value = {
      value: [],
      batchAction: 1,
    }

    params.value.Page = 1
    studentsList.value = []
    listTableRef.value.resetPage()
  }

  const resetAndFetch = async () => {
    resetTable()
    await fetchStudents()
  }

  const fetchStudents = async () => {
    loading.value = true

    const requestParams = {
      SerieId: serie.value.id,
      ClassId: classe.value.id,
      ...params.value,
    }

    try {
      const { data } = await getStudentsV2(requestParams)

      studentsList.value = (data.students?.data || []).map(student => {
        const standardClass = student.classes?.find(cls => cls.standard === true)
        return {
          ...student,
          serieId: standardClass?.serieId || null,
        }
      })
      total.value = data.students?.total || 0
      totalLicenses.value = data.availableLicenses || 0
      usedLicenses.value = data.totalUsers || 0
    } catch (_error) {
      loading.value = false
    } finally {
      loading.value = false
    }
  }

  return {
    module_name,
    listTableRef,
    studentsList,
    total,
    totalLicenses,
    usedLicenses,
    params,
    loading,
    selectedStudents,
    classe,
    serie,
    refSideBarCreateStudent,
    fetchStudents,
    resetAndFetch,
    resetTable,
  }
}