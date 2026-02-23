<script setup>
import Subjects from '@/components/subjects/subjects.vue'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import EvaluationInfoArea from '@/views/pages/teacher-context/evaluations/evaluation-download/components/EvaluationInfoArea.vue'
import EvaluationLogosHeader from '@/views/pages/teacher-context/evaluations/evaluation-download/components/EvaluationLogosHeader.vue'
import EvaluationTitle from '@/views/pages/teacher-context/evaluations/evaluation-download/components/EvaluationTitle.vue'

// Props
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
  schoolLogo: {
    type: String,
    required: false,
  },
  schoolName: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  classSeries: {
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
  <section class="evaluation-cover text-dark">
    <EvaluationLogosHeader
      :first-logo="getWhitelabelConfig('MainLogo')"
      :second-logo="props.schoolLogo"
    />
    <div
      class="text-center d-flex flex-column justify-content-center align-items-center"
      style="height: 31.3rem"
    >
      <EvaluationTitle
        :test-book-number="props.testBookNumber"
        :end-date="props.endDate"
        :start-date="props.startDate"
        :evaluation-subjects="props.evaluationSubjects"
        :evaluation-name="props.evaluationName"
      />
    </div>
    <EvaluationInfoArea
      :student-name="props.studentName"
      :school-name="props.schoolName"
      :class-series="props.classSeries"
      :class-name="props.className"
    />
    <div class="border rounded" style="padding: 1.25rem">
      <p>Caro(a) aluno(a),</p>

      <p>Esta Avaliação é composta por 1 Caderno de Prova e 1 Folha de Respostas.</p>

      <p>
        <span class="text-danger uppercase font-bold">ATENÇÃO, CONFIRA:</span>
        <br />
        Confira se seus dados estão corretos no Caderno de Prova e na Folha de Respostas.
      </p>

      <p>
        <span class="font-bold uppercase">CUIDADOS COM A FOLHA DE RESPOSTAS:</span>
        <br />
        Não rabiscar, amassar ou rasurar;
        <br />
        Cada questão possui uma única resposta correta;
        <br />
        Registre suas respostas na <span class="font-bold">Folha de Respostas</span> utilizando
        lápis preto, preenchendo completamente o círculo como no exemplo a seguir:
      </p>
      <div class="d-flex align-items-center justify-content-center gap-2">
        <div class="option" style="width: 27px; height: 27px">A</div>
        <div class="option bg-black" style="width: 27px; height: 27px"></div>
        <div class="option" style="width: 27px; height: 27px">C</div>
        <div class="option" style="width: 27px; height: 27px">D</div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .evaluation-cover {
    width: 46.7rem;
    height: 66.125rem;

    background-color: white;
    break-inside: avoid;
  }

  .option {
    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: bold;
    border: 1px solid black;
    border-radius: 50%;
  }
</style>