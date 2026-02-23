import { ref } from 'vue'

export function useAnswerKeyStudentsRoot() {
  const evaluationDetails = ref(null)

  return {
    evaluationDetails,
  }
}