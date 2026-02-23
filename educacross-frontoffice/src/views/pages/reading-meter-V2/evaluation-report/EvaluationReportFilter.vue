<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="6">
        <b-form-group label="Teste" label-for="testSelect">
          <ESelect v-model="test" :options="testOptions" label="name" @change="handleChange">
            <template v-slot:selected-option="option">
              <div class="d-flex align-items-center gap-2">
                <div class="d-flex align-items-center gap-1">
                  <span
                    class="material-symbols-outlined icon-with-background"
                    :class="setIcon(option.type).class"
                    style="font-size: 20px"
                  >
                    {{ setIcon(option.type).icon }}
                  </span>
                </div>
                <span>{{ option.name }}</span>
              </div>
            </template>

            <template v-slot:option="option">
              <div class="d-flex align-items-center gap-2">
                <div class="d-flex align-items-center gap-1">
                  <span
                    class="material-symbols-outlined icon-with-background"
                    :class="setIcon(option.type).class"
                    style="font-size: 20px"
                  >
                    {{ setIcon(option.type).icon }}
                  </span>
                </div>
                <span>{{ option.name }}</span>
              </div>
            </template>
          </ESelect>
        </b-form-group>
      </b-col>

      <b-col cols="12" md="6">
        <b-form-group label="Proficiência Leitora" label-for="proficiencySelect">
          <ESelect
            v-model="proficiency"
            :options="proficiencyOptions"
            label="name"
            @change="handleChange"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import { useEvaluationReport } from './useEvaluationReport.js'
import ESelect from '@/components/selects/ESelect.vue'
import { computed } from 'vue'

const { test, proficiency, testOptions, getStudentData } = useEvaluationReport()

const proficiencyOptions = computed(() => [
  { name: 'Todas proficiências', id: null },
  { name: 'Abaixo do básico', id: 1 },
  { name: 'Básico', id: 2 },
  { name: 'Adequado', id: 3 },
  { name: 'Avançado', id: 4 },
  { name: 'Não finalizado', id: '0' },
])
proficiency.value = proficiencyOptions.value[0]

const handleChange = () => {
  getStudentData()
}

const setIcon = option => {
  switch (option) {
    case 1:
      return { icon: 'format_list_numbered', class: 'bg-list' }
    case 2:
      return { icon: 'book_6', class: 'bg-book' }
    default:
      return { icon: '', class: '' }
  }
}
</script>

<style lang="scss" scoped>
  .bg-book {
    padding: 2px;
    border-radius: 3px;
    background-color: #8bc728 !important;
  }

  .bg-list {
    padding: 2px;
    border-radius: 3px;
    background-color: #ffb443 !important;
  }
</style>