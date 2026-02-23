<script setup>
import Subjects from '@/components/subjects/subjects.vue'
import { SubjectEnum } from '@/consts/SubjectEnum'
import {
  formatQuestionNumber,
  getAlphabetLetter,
  getQuestionOptions,
} from '@/views/pages/teacher-context/evaluations/evaluation-download/components/EvaluationPdfUtils'
import { ref, computed } from 'vue'

const props = defineProps({
  test: {
    type: Object,
    required: true,
    validator: item => {
      return (
        'notebook' in item &&
        'subjectId' in item &&
        'subjectName' in item &&
        'totalQuestions' in item &&
        'questions' in item
      )
    },
  },
  blockIndex: {
    type: Number,
    required: true,
  },
})

const getTestSubject = () => {
  return SubjectEnum[props.test.subjectId]
}

const getSubjectName = () => {
  return getTestSubject().label
}

const getQuestionStartOffset = () => {
  // If this is a partial block (split across pages), use the partialStartIndex
  // Otherwise, start from 0
  return props.test.isPartial ? props.test.partialStartIndex : 0
}

const getAlternativeLetters = question => {
  const alternativeCount = getQuestionOptions(question).length
  return Array.from({ length: alternativeCount }, (_, i) => {
    return getAlphabetLetter(i)
  })
}

const divideAlternativesIntoRows = (questions, itemsPerRow) => {
  const rows = []

  if (!questions || questions.length === 0) {
    return rows
  }

  if (itemsPerRow > questions.length) {
    rows.push(questions)
    return rows
  }

  for (let i = 0; i < questions.length; i += itemsPerRow) {
    const row = questions.slice(i, i + itemsPerRow)
    rows.push(row)
  }

  return rows
}

const divideAlternativesInRowsOf15 = questions => {
  return divideAlternativesIntoRows(questions, 15)
}
</script>

<template>
  <div class="border rounded p-50 flex-1 text-black">
    <div class="d-flex align-items-center gap-1 mb-1">
      <Subjects :subject-id="test.subjectId" :size="24" />
      <span class="font-bold">Bloco {{ blockIndex + 1 }}: {{ getSubjectName() }}</span>
    </div>
    <div class="d-flex justify-content-center align-items-baseline gap-4">
      <div
        v-for="(row, rowIndex) in divideAlternativesInRowsOf15(test.questions)"
        :key="`row-${rowIndex}`"
      >
        <div
          v-for="(question, questionIndex) in row"
          :key="`block-${blockIndex}-question-${questionIndex}`"
          class="d-flex align-items-center gap-1"
          style="margin-bottom: 10px"
        >
          <div
            style="width: 24px; height: 24px"
            :class="`bg-light-${getTestSubject().variant}`"
            class="d-flex align-items-center justify-content-center rounded"
          >
            <span class="font-bold text-dark font-12">{{
              formatQuestionNumber(questionIndex + 1 + rowIndex * 15 + getQuestionStartOffset())
            }}</span>
          </div>
          <span
            v-for="alternativeLetter in getAlternativeLetters(question)"
            :key="`block-${blockIndex}-question-${questionIndex}-alternative-${alternativeLetter}`"
            class="border rounded-circle d-flex align-items-center justify-content-center font-12 font-bold border-black"
            style="width: 24px; height: 24px"
          >
            {{ alternativeLetter }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>