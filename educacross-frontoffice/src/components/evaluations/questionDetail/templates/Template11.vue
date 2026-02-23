<template>
  <section>
    <b-row>
      <b-col cols="12">
        <b-card>
          <QuestionContent :content="enunciations.EnunciationOne" />
        </b-card>
      </b-col>
    </b-row>
    <b-row class="match-height">
      <b-col cols="12" lg="6">
        <b-card>
          <QuestionContent
            v-if="enunciations.EnunciationTwo"
            :content="enunciations.EnunciationTwo"
          />
          <QuestionContent
            v-if="enunciations.EnunciationThree"
            :content="enunciations.EnunciationThree"
          />
        </b-card>
      </b-col>
      <b-col cols="12" lg="6">
        <b-row class="match-height h-full">
          <b-col
            v-for="(alternative, index) in alternatives"
            :key="index"
            cols="12"
            md="6"
          >
            <QuestionAlternative :alternative="alternative" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
import QuestionAlternative from '@/components/evaluations/questionDetail/components/QuestionAlternative.vue'
import QuestionContent from '@/components/evaluations/questionDetail/components/QuestionContent.vue'

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

<style lang="scss" scoped></style>