<template>
  <b-card class="schools-report-filter">
    <b-row>
      <b-col>
        <b-form-group label="Teste" label-for="testType">
          <ESelect
            v-model="test"
            :options="testOptions"
            label="name"
            :disabled="isDisabled"
            placeholder="Selecione um tipo de teste"
            @change="getInstitutions"
          >
            <template v-slot:selected-option="option">
              <div class="d-flex align-items-center gap-2">
                <div v-if="option.type" class="d-flex align-items-center gap-1">
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
                <div v-if="option.type" class="d-flex align-items-center gap-1">
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
import { useSchoolsReport } from './useSchoolsReport.js'
import ESelect from '@/components/selects/ESelect.vue'
import { watch, computed } from 'vue'

const { test, fetchInstitutions, readingFluencyEvaluation, testOptions } = useSchoolsReport()

const isDisabled = computed(
  () =>
    !!(
      readingFluencyEvaluation.value.types &&
      readingFluencyEvaluation.value.types.length !== 2
    ),
)

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

watch(
  readingFluencyEvaluation,
  newValue => {
    if (!newValue || !newValue.types) return

    if (newValue.types.length === 2) {
      test.value = {
        name: 'Todos os testes',
        id: null,
        icons: [],
      }
    } else if (newValue.types.length === 1) {
      const type = newValue.types[0]
      const option = testOptions.value.find(opt => opt.id === type)
      test.value = option || testOptions.value[1]
    }
  },
  { immediate: true },
)

const getInstitutions = () => {
  fetchInstitutions()
}
</script>

<style lang="scss" scoped>
  .schools-report-filter {
    ::v-deep .card-body {
      padding: 12px 24px;
    }

    .icon-with-background {
      background: rgba(108, 117, 125, 0.1) !important;
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

    ::v-deep .e-select-dropdown {
      .option {
        .material-symbols-outlined {
          color: #6c757d;
          font-size: 16px !important;
          font-weight: 400;
        }

        &:hover .material-symbols-outlined {
          color: #495057;
        }

        &.selected .material-symbols-outlined {
          color: var(--bs-primary);
        }

        .icon-with-background {
          &:hover {
            background: rgba(73, 80, 87, 0.1) !important;
          }
        }

        &.selected .icon-with-background {
          background: rgba(13, 110, 253, 0.1) !important;
          color: var(--bs-primary) !important;
        }
      }
    }
  }
</style>