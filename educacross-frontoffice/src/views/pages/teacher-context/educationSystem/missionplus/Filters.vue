<template>
  <b-card>
    <b-row>
      <b-col>
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
import { getStudents } from '@/services/teacher-context/students/Students.service.js'
import useFilters from '@/store/filters/useFilters.js'
import { useEducationSystemMissionPlus } from '@/views/pages/teacher-context/educationSystem/missionplus/useEducationSystemMissionPlus.js'
import { ref } from 'vue'

const { classe } = useFilters()

const { fetch, student } = useEducationSystemMissionPlus()

const studentLoading = ref(true)
const students = ref([])
const studentPage = ref(1)
const studentTotalpages = ref(1)

const setStudents = value => {
  student.value = value
  fetch()
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

fetchStudents()
fetch()
</script>

<style lang="scss" scoped></style>