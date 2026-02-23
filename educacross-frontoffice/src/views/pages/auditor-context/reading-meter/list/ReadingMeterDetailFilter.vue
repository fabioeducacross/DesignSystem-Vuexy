<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="6" xl="5">
        <b-form-group label="Teste" label-for="testType">
          <ESelect
            :value="typeTest"
            :options="readingsTest"
            label="name"
            placeholder="Selecione um teste"
            @change="setTypeTest"
          >
            <template v-slot:selected-option="option">
              <div class="d-flex align-items-center gap-2">
                <ExerciseType
                  v-if="option.type !== null && option.type !== undefined"
                  :key="option.type"
                  :exercise-id="option.type"
                  :size="24"
                />
                <span>{{ option.name }}</span>
              </div>
            </template>

            <template v-slot:option="option">
              <div class="d-flex align-items-center gap-2">
                <ExerciseType
                  v-if="option.type !== null && option.type !== undefined"
                  :key="option.type"
                  :exercise-id="option.type"
                  :size="24"
                />
                <span>{{ option.name }}</span>
              </div>
            </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="6" xl="5">
        <b-form-group label="Proficiência Leitora" label-for="Proficiency">
          <ESelect
            :value="ProficiencyValue"
            :options="ProficiencyOptions"
            label="text"
            @input="setProficiency"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" xl="2" class="d-flex align-items-center">
        <b-form-checkbox
          v-model="omitAudited"
          name="omit-audited"
          class="d-flex align-items-center mr-0"
          switch
          @input="setOmitAudited"
        >
          Omitir auditados
        </b-form-checkbox>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ExerciseType from '@/components/exercise-type/reading-meter/ExerciseType.vue'
import ESelect from '@/components/selects/ESelect.vue'
import { ReadingProficiencyEnum } from '@/consts/ReadingMeterEnum.js'
import { exerciseTypeEnum } from '@/consts/exerciseTypeEnum.js'
import { getTestLabelsFluencyEvaluation } from '@/services/shared/readingFluencyEvaluation/readingFluencyEvaluation.service.js'
import store from '@/store'
import { ref, computed, getCurrentInstance, onMounted } from 'vue'

const vm = getCurrentInstance().proxy

const evaluationId = vm.$route.params.evaluationId

const omitAudited = ref(false)

const exerciseType = computed(
  () => store.getters['ReadingMeterEvaluationModule/exerciseType'],
)

const typeTest = computed(() => store.getters['ReadingMeterEvaluationModule/typeTest'])

const readingsTest = computed(
  () => store.getters['ReadingMeterEvaluationModule/readingsTest'],
)

const setExerciseType = value => {
  store.commit('ReadingMeterEvaluationModule/setExerciseType', value)
}

const ProficiencyValue = computed(
  () => store.getters['ReadingMeterEvaluationModule/proficiency'],
)

const ProficiencyOptions = computed(() => {
  return [{ text: 'Todas proficiências', id: null }, ...ReadingProficiencyEnum]
})

const setProficiency = value => {
  store.commit('ReadingMeterEvaluationModule/setProficiency', value)
}

const setReadingsTest = value => {
  store.commit('ReadingMeterEvaluationModule/readingsTest', value)
}

const setTypeTest = value => {
  store.commit('ReadingMeterEvaluationModule/typeTest', value)
}

const setOmitAudited = () => {
  store.commit('ReadingMeterEvaluationModule/setOmitAudited', omitAudited.value)
}

const changeTypeTest = value => {
  setReadingsTest([value])
}

const getTestLabels = async () => {
  await getTestLabelsFluencyEvaluation(evaluationId).then(response => {
    const data = response.data.map(reading => ({
      type: reading.type,
      id: reading.id,
      name: reading.name,
    }))

    data.unshift({
      type: null,
      id: null,
      name: 'Todos os testes',
    })
    setReadingsTest(data)
    setTypeTest(data[0])
  })
}

onMounted(() => {
  getTestLabels()
})
</script>