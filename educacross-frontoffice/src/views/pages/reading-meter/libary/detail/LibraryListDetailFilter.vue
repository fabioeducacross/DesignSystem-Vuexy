<template>
  <b-card>
    <b-row>
      <b-col cols="12">
        <b-form-group label="Nível de proficiência leitora" label-for="schoolYear">
          <ESelect
            :value="ProficiencyValue"
            :options="ProficiencyOptions"
            label="text"
            @input="setProficiency"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { ReadingProficiencyEnum } from '@/consts/ReadingMeterEnum.js'
import store from '@/store'
import { computed } from 'vue'

const ProficiencyValue = computed(() => store.getters['ReadingMeterModule/proficiency'])

const ProficiencyOptions = computed(() => {
  return [{ text: 'Todos', id: null }, ...ReadingProficiencyEnum]
})

const setProficiency = value => {
  store.commit('ReadingMeterModule/setProficiency', value)
}
</script>