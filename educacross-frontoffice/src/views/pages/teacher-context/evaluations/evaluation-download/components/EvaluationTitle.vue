<script setup>
  import Subjects from '@/components/subjects/subjects.vue'

  const props = defineProps({
    evaluationName: {
      type: String,
      required: true,
    },
    evaluationSubjects: {
      type: Array,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    testBookNumber: {
      type: Number,
      required: true,
    },
  })
</script>

<template>
  <div class="d-flex flex-column justify-content-center align-items-center text-black">
    <div class="d-flex gap-1">
      <subjects
        v-for="subjectId in props.evaluationSubjects"
        :key="`subject-${subjectId}`"
        :subject-id="subjectId"
        :size="34"
      />
    </div>
    <h1>{{ props.evaluationName }}</h1>
    <span class="font-12 font-bold text-dark"
      >Período: {{ props.startDate | formatDate }} a {{ props.endDate | formatDate }}</span
    >
    <h2>
      Caderno de prova:
      <span class="text-primary">Caderno {{ props.testBookNumber }}</span>
    </h2>
  </div>
</template>