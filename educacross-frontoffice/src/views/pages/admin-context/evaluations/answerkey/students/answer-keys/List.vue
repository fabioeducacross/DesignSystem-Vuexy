<script setup>
import { useAnswerKeysStudent } from '@/views/pages/admin-context/evaluations/answerkey/students/answer-keys/useAnswerKeysStudent'
import AnswerkeyList from '@/views/pages/admin-context/evaluations/answerkey/students/components/AnswerkeyList.vue'
import { computed } from 'vue'

const {
  loading,
  knowledgeArea,
  answerKeysDisabled,
  newStudentAnswers,
  anyChangeWasMade,
  savingChanges,
  cancelChanges,
  saveChanges,
} = useAnswerKeysStudent()

const knowledgeAreaId = computed(() => {
  return knowledgeArea.value?.subjectId || 0
})

const questions = computed(() => {
  return newStudentAnswers.value?.questions || []
})

const changeStudent = newQuestions => {
  newStudentAnswers.value.questions = newQuestions
}
</script>

<template>
  <b-card>
    <AnswerkeyList
      :disabled="answerKeysDisabled"
      :data="questions"
      :loading="loading"
      :subject-id="knowledgeAreaId"
      @input="changeStudent"
    />
    <portal v-if="!answerKeysDisabled" to="fixed-sticky-footer-destination">
      <div class="bg-white p-1 d-flex justify-content-center gap-2">
        <b-button variant="outline-danger" :disabled="savingChanges" @click="cancelChanges()">
          Cancelar
        </b-button>
        <div v-b-tooltip:hover="anyChangeWasMade ? '' : 'Nenhuma alteração foi realizada.'">
          <b-button
            variant="primary"
            :disabled="savingChanges || !anyChangeWasMade"
            @click="saveChanges"
          >
            Salvar alterações
            <b-spinner v-show="savingChanges" small variant="white" />
          </b-button>
        </div>
      </div>
    </portal>
  </b-card>
</template>