<script setup>
import { useAnswerKeysStudent } from '@/views/pages/admin-context/evaluations/answerkey/students/answer-keys/useAnswerKeysStudent'
import { computed } from 'vue'

const { answerKeysDisabled, originalStudentAnswers, combinedStatus, enableAnswerKeyEdit } =
  useAnswerKeysStudent()
const status = computed(() => originalStudentAnswers.value?.status)
</script>

<template>
  <b-alert v-if="combinedStatus" :variant="combinedStatus.variant" show>
    <div class="alert-body">
      <div class="d-flex align-items-center justify-content-center text-center gap-2">
        <div>
          <span class="material-symbols-outlined align-middle">{{ combinedStatus.icon }}</span>
          <span class="align-baseline">
            {{ combinedStatus.text }}
          </span>
          <div
            v-show="answerKeysDisabled && combinedStatus.canEdit"
            class="inline-block underline cursor-pointer font-bold align-baseline"
          >
            <span class="align-baseline" @click="enableAnswerKeyEdit"> Editar gabarito</span>
            <span class="material-symbols-outlined align-baseline font-14">edit</span>
          </div>
          <br />
          <b>
            {{ combinedStatus.secondText }}
          </b>
        </div>
      </div>
    </div>
  </b-alert>
</template>