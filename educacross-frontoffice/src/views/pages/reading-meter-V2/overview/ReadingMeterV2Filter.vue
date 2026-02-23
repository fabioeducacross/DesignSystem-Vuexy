<template>
  <div class="reading-meter-v2-filter">
    <b-card>
      <b-row>
        <b-col cols="12" md="6">
          <b-form-group label="Tipo de Teste" label-for="testType">
            <ESelect
              v-model="readings"
              :options="testTypeOptions"
              label="name"
              placeholder="Selecione um tipo de teste"
              @change="handleChange"
            >
              <template v-slot:selected-option="option">
                <div class="d-flex align-items-center gap-2">
                  <div class="d-flex align-items-center gap-1">
                    <span
                      v-for="(iconName, index) in option.icons"
                      :key="index"
                      class="material-symbols-outlined icon-with-background"
                      :class="option.class"
                      style="font-size: 20px"
                    >
                      {{ iconName }}
                    </span>
                  </div>
                  <span>{{ option.name }}</span>
                </div>
              </template>

              <template v-slot:option="option">
                <div class="d-flex align-items-center gap-2">
                  <div class="d-flex align-items-center gap-1">
                    <span
                      v-for="(iconName, index) in option.icons"
                      :key="index"
                      class="material-symbols-outlined icon-with-background"
                      :class="option.class"
                      style="font-size: 20px"
                    >
                      {{ iconName }}
                    </span>
                  </div>
                  <span>{{ option.name }}</span>
                </div>
              </template>
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6">
          <b-form-group label="Status" label-for="status">
            <ESelect
              v-model="status"
              :options="statusOptions"
              label="text"
              placeholder="Selecione um status"
              @change="handleChange"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script setup>
import { useReadingMeterV2 } from './useReadingMeterV2.js'
import ESelect from '@/components/selects/ESelect.vue'
import { ReadingFluencyV2StatusEnum } from '@/consts/ReadingMeterEnum.js'
import { ref } from 'vue'

const { getEvaluations, readings, status } = useReadingMeterV2()

const testTypeOptions = ref([
  { name: 'Todos os tipos de teste', id: null, icons: [] },
  { name: 'Lista de palavras', id: 1, icons: ['format_list_numbered'], class: 'bg-list' },
  { name: 'Texto completo', id: 2, icons: ['book_6'], class: 'bg-book' },
])
readings.value = testTypeOptions.value[0]

const statusOptions = ref([
  { text: 'Todos os Status', id: null },
  ...ReadingFluencyV2StatusEnum.map(status => ({
    text: status.text,
    id: status.id,
  })),
])

const handleChange = () => {
  getEvaluations()
}
</script>

<style lang="scss" scoped>
  .reading-meter-v2-filter {
    margin-bottom: 1.5rem;
  }

  .icon-with-background {
    border-radius: 4px !important;
    padding: 4px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-width: 24px !important;
    min-height: 24px !important;

    &:hover {
      background: rgba(108, 117, 125, 0.15) !important;
    }
  }

  .bg-book {
    background-color: #8bc728 !important;
  }

  .bg-list {
    background-color: #ffb443 !important;
  }
</style>