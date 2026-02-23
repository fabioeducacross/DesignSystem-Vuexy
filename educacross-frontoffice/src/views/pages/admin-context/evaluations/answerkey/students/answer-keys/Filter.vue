<script setup>
  import ESelect from '@/components/selects/ESelect.vue'
  import Subjects from '@/components/subjects/subjects.vue'
  import { useRoute, useRouter } from 'vue-router/composables'
  import { useAnswerKeysStudent } from '@/views/pages/admin-context/evaluations/answerkey/students/answer-keys/useAnswerKeysStudent'
  import { cloneDeep } from 'lodash'
  import { nextTick } from 'vue'
  // Event bus access via mitt
  // @eventBus.js exposes: import { emitter } from '@/eventBus'
  import { emitter } from '@/eventBus'

  const {
    students,
    currentStudent,
    knowledgeAreas,
    knowledgeArea,
    currentStudentIndex,
    anyChangeWasMade,
    getStudentDetails,
  } = useAnswerKeysStudent()

  const route = useRoute()
  const router = useRouter()

  const changeStudent = (student, bypass = false) => {
    if (anyChangeWasMade.value && !bypass) {
      const callback = () => {
        changeStudent(student, true)
      }

      emitter.emit('manualShowConfirmExit', callback)

      nextTick(() => {
        currentStudent.value = cloneDeep(currentStudent.value)
      })

      return
    }

    currentStudentIndex.value = students.value.findIndex(s => s.id === student.id)
    currentStudent.value = student

    router.replace({
      name: 'evaluationsAnswerTeacherStudentAnswers',
      params: {
        evaluationId: route.params.evaluationId,
        studentId: student.id,
      },
    })

    getStudentDetails()
  }

  const changeSubject = (subject, bypass = false) => {
    if (anyChangeWasMade.value && !bypass) {
      const callback = () => {
        changeSubject(subject, true)
      }

      emitter.emit('manualShowConfirmExit', callback)

      nextTick(() => {
        knowledgeArea.value = cloneDeep(knowledgeArea.value)
      })

      return
    }

    knowledgeArea.value = subject
    getStudentDetails()
  }
</script>

<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="6">
        <b-form-group label="Aluno" label-for="student">
          <ESelect
            :value="currentStudent"
            :options="students"
            name="student"
            @change="s => changeStudent(s, false)"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" md="6">
        <b-form-group label="Área de Conhecimento" label-for="knowledgeArea">
          <ESelect
            :value="knowledgeArea"
            :options="knowledgeAreas"
            name="knowledgeArea"
            @change="k => changeSubject(k, false)"
          >
            <template v-slot:option="data">
              <Subjects :subject-id="data.subjectId" :size="24" class="mr-50" />
              {{ data.name }}
            </template>
            <template v-slot:selected-option="data">
              <Subjects :subject-id="data.subjectId" :size="24" class="mr-50" />
              {{ data.name }}
            </template>
          </ESelect>
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>
