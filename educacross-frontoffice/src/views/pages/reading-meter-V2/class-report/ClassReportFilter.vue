<template>
  <b-card>
    <b-row>
      <b-col>
        <b-form-group label="Teste" label-for="testType">
          <ESelect
            v-model="test"
            :options="testOptions"
            label="name"
            placeholder="Selecione um teste"
            @change="handleChange"
          >
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
    </b-row>
  </b-card>
</template>

<script setup>
import { useClassReport } from './useClassReport.js'
import ESelect from '@/components/selects/ESelect.vue'

const { loadClassesData, test, testOptions } = useClassReport()

const handleChange = () => {
  loadClassesData()
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
.icon-with-background {
  background-color: #f0f0f0;
  border-radius: 4px;
  padding: 2px;
}

.bg-book {
  background-color: #8bc728 !important;
}
.bg-list {
  background-color: #ffb443 !important;
}
</style>