<script setup>
import WritingPhaseRegisterEvaluationRegisterComment from '@/views/pages/writing-phases/writing-phase-register/form/RegisterComment.vue'
import WritingPhaseRegisterEvaluationRegisterImage from '@/views/pages/writing-phases/writing-phase-register/form/RegisterImage.vue'
import WritingPhaseRegisterEvaluationRegisterQuestions from '@/views/pages/writing-phases/writing-phase-register/form/RegisterQuestions.vue'
</script>

<template>
  <b-row class="match-height">
    <b-col cols="12" lg="4">
      <WritingPhaseRegisterEvaluationRegisterImage />
      <WritingPhaseRegisterEvaluationRegisterComment />
    </b-col>
    <b-col cols="12" lg="8">
      <WritingPhaseRegisterEvaluationRegisterQuestions />
    </b-col>
  </b-row>
</template>