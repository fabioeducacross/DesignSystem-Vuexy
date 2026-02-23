<template>
  <b-card>
    <b-row>
      <b-col v-if="!exhibition" cols="12" md>
        <b-form-group :label="$t('educationalOrganization')" label-for="educationalOrganization">
          <ESelect
            id="educationalOrganization"
            label="name"
            :value="educationalOrganization"
            :options="educationalOrganizations"
            :clearable="false"
            :loading="loadingEducationalOrganization"
            :disabled="loadingEducationalOrganization"
            @input="setSelectedEducationalOrganization"
          >
          </ESelect>
        </b-form-group>
      </b-col>

      <b-col cols="12" md>
        <b-form-group :label="$t('Temática')" label-for="knowledgeAxes">
          <ESelect
            id="knowledgeAxes"
            label="name"
            :value="knowledgeAxe"
            :options="knowledgeAxes"
            :clearable="false"
            :loading="knowledgeAxesLoading"
            :disabled="knowledgeAxesLoading"
            @input="setKnowledgeaxes"
          >
          </ESelect>
        </b-form-group>
      </b-col>

      <!-- TODO: trocar por alunos -->
      <b-col cols="12" md>
        <b-form-group :label="$t('Alunos')" label-for="students">
          <ESelect
            id="students"
            label="name"
            :value="student"
            :options="students"
            :clearable="false"
            :loading="studentLoading"
            :disabled="studentLoading"
            paginated
            @input="setStudents"
          >
          </ESelect>
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getEducationalOrganizationsLabel } from '@/services/shared/educationalOrganization/EducationalOrganization.service.js'
import { getKnowledgeaxesFilterOptions } from '@/services/teacher-context/knowledgeaxes/Knowledgeaxes.service.js'
import { getStudents } from '@/services/teacher-context/students/Students.service.js'
import useFilters from '@/store/filters/useFilters.js'
import { useEducationSystemBookReport } from '@/views/pages/teacher-context/educationSystem/bookReport/useEducationSystemBookReport.js'
import { ref, getCurrentInstance, watch } from 'vue'

const vm = getCurrentInstance().proxy

const {
  resetAndfetch,
  exhibition,
  knowledgeAxe,
  educationalOrganization,
  student,
  serieId,
  subjectId,
  bookName,
  educationSystemName,
} = useEducationSystemBookReport()

const { classe } = useFilters()

const loadingEducationalOrganization = ref(true)
const educationalOrganizations = ref([])

const setSelectedEducationalOrganization = value => {
  educationalOrganization.value = value
  fetchKnowledgeaxes()
}

const fetchEducationalOrganizations = async () => {
  loadingEducationalOrganization.value = true
  getEducationalOrganizationsLabel(serieId.value, subjectId.value).then(({ data }) => {
    educationalOrganizations.value = data
    educationalOrganization.value = data[0]
    loadingEducationalOrganization.value = false
    fetchKnowledgeaxes()
  })
}

const knowledgeAxesLoading = ref(true)
const knowledgeAxes = ref([])

const setKnowledgeaxes = value => {
  knowledgeAxe.value = value
  resetAndfetch()
}

const fetchKnowledgeaxes = () => {
  knowledgeAxesLoading.value = true
  getKnowledgeaxesFilterOptions({
    educationalOrganizationId: educationalOrganization.value.id,
  }).then(({ data }) => {
    knowledgeAxes.value = [{ id: null, name: 'Todas as temáticas' }, ...data]
    setKnowledgeaxes(knowledgeAxes.value[0])
    knowledgeAxesLoading.value = false
  })
}

const studentLoading = ref(true)
const students = ref([])
const studentPage = ref(1)
const studentTotalpages = ref(1)

const setStudents = value => {
  student.value = value
  resetAndfetch()
}

const fetchStudents = async () => {
  studentLoading.value = true
  try {
    const { data } = await getStudents(classe.value.ClassId)
    students.value = [{ name: 'Todos os alunos', id: null }, ...data]
  } catch (error) {
    students.value = [{ name: 'Todos os alunos', id: null }]
  } finally {
    studentLoading.value = false
  }
}

watch(serieId, () => {
  fetchEducationalOrganizations()
  vm.$bus.emit('setBreadcrumb', [`${educationSystemName.value}`, bookName.value, ''])
})

fetchStudents()
</script>

<style lang="scss" scoped></style>