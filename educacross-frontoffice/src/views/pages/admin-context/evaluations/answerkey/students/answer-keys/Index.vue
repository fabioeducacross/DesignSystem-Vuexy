<script setup>
import AnswerKeysFilter from '@/views/pages/admin-context/evaluations/answerkey/students/answer-keys/Filter.vue'
import AnswerKeysList from '@/views/pages/admin-context/evaluations/answerkey/students/answer-keys/List.vue'
import AnswerKeysMessages from '@/views/pages/admin-context/evaluations/answerkey/students/answer-keys/Messages.vue'
import AnswerKeysTitle from '@/views/pages/admin-context/evaluations/answerkey/students/answer-keys/Title.vue'
import { useAnswerKeysStudent } from '@/views/pages/admin-context/evaluations/answerkey/students/answer-keys/useAnswerKeysStudent'
import { onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

const route = useRoute()
const router = useRouter()
const { evaluationId, studentId, onCreate, resetState } = useAnswerKeysStudent()

const updateParamsFromRoute = () => {
  evaluationId.value = +route.params.evaluationId
  studentId.value = +route.params.studentId
}

// Initialize with current route params
updateParamsFromRoute()

// Watch for route changes
const removeAfterEach = router.afterEach(() => {
  updateParamsFromRoute()
})

onUnmounted(() => {
  removeAfterEach()
  resetState()
})

onCreate()
</script>

<template>
  <div>
    <AnswerKeysTitle />
    <AnswerKeysFilter />
    <AnswerKeysMessages />
    <AnswerKeysList />
  </div>
</template>