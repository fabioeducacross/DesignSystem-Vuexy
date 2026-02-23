<template>
  <b-row class="match-height h-full">
    <b-col cols="12">
      <b-card
        header="Enunciado da Questão"
        header-bg-variant="primary"
        header-text-variant="white"
        header-class="justify-content-center h5 font-weight-normal p-50"
        body-class="p-1"
        border-variant="light-gray shadow-none"
      >
        <div class="mb-1">
          <QuestionContent :content="enunciations.EnunciationOne" />
        </div>
      </b-card>
    </b-col>
    <b-col cols="12">
      <div class="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-2 mb-50">
        <QuestionAlternative
          v-for="(alternative, index) in alternatives"
          :key="index"
          :alternative="alternative"
        />
      </div>
    </b-col>
  </b-row>
</template>

<script setup>
import QuestionContent from '@/components/evaluations/questionDetail/components/QuestionContent.vue'
import QuestionAlternative from '@/components/evaluations/questionsListDetail/components/QuestionAlternative.vue'

const props = defineProps({
  enunciations: {
    type: Object,
    required: true,
  },
  alternatives: {
    type: Array,
    required: true,
  },
})
</script>