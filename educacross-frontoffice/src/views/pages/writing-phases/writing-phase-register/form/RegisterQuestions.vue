<script setup>
import { writingPhaseEnumQuestionOptions } from '@/consts/legends/writingPhasesEnum'
import { useWritingPhaseRegister } from '@/views/pages/writing-phases/writing-phase-register/useWritingPhaseResgister'
import { ref } from 'vue'

const { currentPhase, loading, analysis } = useWritingPhaseRegister()
</script>

<template>
  <b-card>
    <b-card-title class="text-primary">
      <span class="material-symbols-outlined align-text-bottom">checklist_rtl</span>
      Análise do professor
    </b-card-title>

    <template v-if="loading">
      <div v-for="i in 5" :key="`skeleton-${i}`">
        <b-skeleton width="100%" type="input" />
        <hr />
      </div>
    </template>

    <template v-else>
      <b-form>
        <b-form-row>
          <b-col v-for="(question, index) in analysis" :key="question.id" cols="12">
            <b-form-group
              v-slot="{ ariaDescribedby }"
              :label="question.name"
              label-for="question"
              label-cols-md=""
            >
              <b-form-radio-group
                v-model="currentPhase.analysis[index].value"
                :aria-describedby="ariaDescribedby"
                class="d-flex flex-col flex-md-row align-items-md-center gap-1 h-100"
              >
                <b-form-radio
                  v-for="(option, optionIndex) in writingPhaseEnumQuestionOptions"
                  :key="`option-${question.id}-${optionIndex}`"
                  :value="option.value"
                >
                  {{ option.text }}
                </b-form-radio>
              </b-form-radio-group>
            </b-form-group>
            <hr />
          </b-col>
        </b-form-row>
      </b-form>
    </template>
  </b-card>
</template>