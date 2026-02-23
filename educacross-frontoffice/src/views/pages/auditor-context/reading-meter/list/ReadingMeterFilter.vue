<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="6">
        <b-form-group label="Tipo de teste" label-for="testType">
          <ESelect
            id="exerciseType"
            label="name"
            :value="exerciseType"
            :options="testTypes"
            :clearable="false"
            @input="setExerciseType"
          >
            <template v-slot:option="data">
              {{ data.name }}
            </template>
            <template v-slot:selected-option="data">
              {{ data.name }}
            </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="6">
        <b-form-group label="Progresso de alunos auditados" label-for="progress">
          <ESelect
            :value="progressValue"
            :options="progressOptions"
            label="text"
            @input="setProgress"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
  import ESelect from '@/components/selects/ESelect.vue'
  import { ReadingMeterEvaluation } from '@/consts/ReadingMeterEnum.js'
  import { exerciseTypeEnum } from '@/consts/exerciseTypeEnum.js'
  import store from '@/store'
  import { computed, ref } from 'vue'

  const testTypes = ref([
    { types: [1, 2], name: 'Todos os tipos de testes', image: null, variant: null },
    ...Object.values(exerciseTypeEnum).map(type => ({
      types: [type.value],
      name: type.label,
      image: type.image,
      variant: type.variant,
    })),
  ])

  const exerciseType = computed(
    () => store.getters['ReadingMeterEvaluationModule/exerciseType'],
  )

  const setExerciseType = value => {
    store.commit('ReadingMeterEvaluationModule/setExerciseType', value)
  }

  const progressValue = computed(() => store.getters['ReadingMeterEvaluationModule/progress'])

  const progressOptions = computed(() => {
    return [{ text: 'Todos os progressos', id: null }, ...ReadingMeterEvaluation]
  })

  const setProgress = value => {
    store.commit('ReadingMeterEvaluationModule/setProgress', value)
  }
</script>