<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="auto">
        <SelectSubject />
      </b-col>
      <b-col cols="12" sm="12" md>
        <b-form-group label="Módulo" label-for="module">
          <MultipleDropdown
            :data="subjectModules"
            :loading="loadingSubjectModules || !subjectModules.length"
            :selected="parentModule"
            :selected-children="childModule"
            empty-text="Sem módulos"
            @change="setSelectedModule"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" sm="12" md>
        <b-form-group label="Período" label-for="month">
          <ESelect
            id="month"
            :value="period"
            :options="months"
            label="name"
            :clearable="false"
            :searchable="false"
            responsive
            @input="setMonth"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import MultipleDropdown from '@/components/selects/MultipleDropdown.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { getMonthList } from '@/utils/date.js'
import {useStudentDetails} from '@/views/dashboard/studentDetails/useStudentDetails.js'
import { onMounted, watch } from 'vue'
import flatPickr from 'vue-flatpickr-component'
import vSelect from 'vue-select'

// useStudentDetails composition function
const {
  loading,
  loadingSubjectModules,
  serieId,
  subjectModules,
  fetchSubjectModules,
  fetch,
  studentId,
  resetAndfetch,
} = useStudentDetails()

// Set studentId from route params
studentId.value = router.currentRoute.params.studentId

const { institutionId, classId } = router.currentRoute.params

const isTeacher = store.getters.accessRole === 'Teacher'

// useFilters composition function
const { classe, institution, subject, period, parentModule, childModule } = useFilters()

if (!parentModule.value.id) {
  parentModule.value = {
    id: null,
    name: 'Todos os módulos',
  }
}

if (!isTeacher) {
  classe.value = { ClassId: classId }
  institution.value = { id: institutionId }
}

const setSelectedModule = (item, child) => {
  parentModule.value = item
  childModule.value = child
}

// PERIODO
const months = [
  {
    id: null,
    name: 'Todo o período',
  },
  ...getMonthList(),
]

if (!period.value?.id) period.value = { id: null, name: 'Todo o período' }

const setMonth = month => {
  period.value = month
}

const redirectToCustomMission = () => {
  router.push({ name: 'newMissionsTeacher' })
}

// Watchers
watch(serieId, () => {
  fetchSubjectModules()
})

watch([parentModule, childModule, period], () => {
  resetAndfetch()
})

onMounted(() => {
  watch(
    [subject],
    () => {
      fetch()
    },
    { deep: true },
  )
})
</script>