import store from '@/store'
import { computed, ref } from 'vue'

const moduleName = 'useTransferStudents'

export function useTransferStudents(isDestination = false) {
  const studentsOrigin = computed({
    get() {
      return store.getters[`${moduleName}/studentsOrigin`]
    },
    set(val) {
      store.commit(`${moduleName}/studentsOrigin`, val)
    },
  })

  const transferedStudents = computed({
    get() {
      return store.getters[`${moduleName}/transferedStudents`]
    },
    set(val) {
      store.commit(`${moduleName}/transferedStudents`, val)
    },
  })

  const showOnlyRegularStudentsOrigin = computed({
    get() {
      return store.getters[`${moduleName}/showOnlyRegularStudentsOrigin`]
    },
    set(val) {
      store.commit(`${moduleName}/showOnlyRegularStudentsOrigin`, val)
    },
  })

  const showOnlyRegularStudentsDestination = computed({
    get() {
      return store.getters[`${moduleName}/showOnlyRegularStudentsDestination`]
    },
    set(val) {
      store.commit(`${moduleName}/showOnlyRegularStudentsDestination`, val)
    },
  })

  const studentsDestination = computed({
    get() {
      return store.getters[`${moduleName}/studentsDestination`]
    },
    set(val) {
      store.commit(`${moduleName}/studentsDestination`, val)
    },
  })

  const filteredStudentsOrigin = computed(() => {
    return studentsOrigin.value
      .filter(student => {
        return (
          !transferedStudents.value.some(
            transferedStudent => transferedStudent.id === student.id,
          ) && (showOnlyRegularStudentsOrigin.value ? student.standard : true)
        )
      })
      .map(student => ({
        ...student,
        isStandardOnDestination: studentsDestination.value.some(
          s => s.id === student.id && s.standard,
        ),
      }))
  })

  const filteredStudentsDestination = computed(() => {
    return [
      ...transferedStudents.value,
      ...studentsDestination.value
        .filter(student => {
          return !transferedStudents.value.some(
            transferedStudent => transferedStudent.id === student.id,
          )
        })
        .map(student => ({
          ...student,
          disableSelect: true,
        })),
    ]
      .map(student => {
        const transferedStudent = transferedStudents.value.find(ts => ts.id === student.id)

        let standard
        if (transferedStudent) {
          if (student.isStandardOnDestination) {
            standard = true
          } else {
            standard = transferedStudent.standard
          }
        } else {
          standard = student.standard
        }

        return {
          ...student,
          isTransfered: !!transferedStudent,
          standard,
        }
      })
      .filter(student => (showOnlyRegularStudentsDestination.value ? student.standard : true))
  })

  const moduleReset = () => {
    store.commit(`${moduleName}/reset`)
  }

  return {
    students: isDestination ? studentsDestination : studentsOrigin,
    filteredStudents: isDestination ? filteredStudentsDestination : filteredStudentsOrigin,
    showOnlyRegularStudents: isDestination
      ? showOnlyRegularStudentsDestination
      : showOnlyRegularStudentsOrigin,
    transferedStudents,
    moduleName,
    moduleReset,
  }
}