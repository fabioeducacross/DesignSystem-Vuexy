<template>
  <section>
    <b-form-row>
      <b-col cols="7">
        <label>{{ exameLabel }}</label>
        <div class="d-flex flex-wrap align-item-center justify-content-start gap-1">
          <div v-for="exameId in data" :key="exameId">
            <input
              :id="`match_${exameId}`"
              v-model="selectedExames"
              type="radio"
              :value="exameId"
            />
            <label
              :for="`match_${exameId}`"
              class="subjectIconLabel"
              :class="isSelectAll || !selectedExames ? 'active-subject' : ''"
            >
              <ExameIcon
                v-b-tooltip.hover.bottom="examesEnum[exameId]"
                :name="subjectComponentsEnums[exameId]"
                :height="48"
                :width="48"
              />
            </label>
          </div>
        </div>
      </b-col>
      <b-col cols="1">
        <div class="h-full d-flex align-item-center justify-content-center">
          <div class="divider-bar" />
        </div>
      </b-col>
      <b-col cols="4">
        <div v-if="isSelectAll" class="h-full d-flex flex-col justify-content-between">
          <label for="">Total de provas na avaliação</label>
          <h5 class="font-extrabold text-success">
            {{ data.length }}
          </h5>
        </div>
        <div v-else class="h-100 d-flex align-items-center font-weight-bold">
          <feather-icon icon="ChevronLeftIcon" class="mr-1 text-primary" />
          <button type="button" class="btn btn-link px-0" @click="selectAllExames">
            Ver todas
          </button>
        </div>
      </b-col>
    </b-form-row>
  </section>
</template>

<script setup>
import ExameIcon from '@/views/pages/admin-context/evaluations/components/ExameIcon.vue'
import { computed, ref, watch } from 'vue'

// Props
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

// Emits
const emit = defineEmits(['input'])

// Reactive state
const selectedExames = ref(0)
const isSelectAll = ref(true)

const examesEnum = ref({
  1: 'Matemática',
  2: 'Português',
})

const subjectComponentsEnums = ref({
  1: 'MissionMath',
  2: 'MissionPort',
})

const selectAllExames = () => {
  isSelectAll.value = true
  if (props.data.length === 1) {
    selectedExames.value = props.data[0]
    return
  }
  selectedExames.value = 0
}

// Initialize selection on mount
selectAllExames()

const exameLabel = computed(() => {
  if (
    Array.isArray(selectedExames.value) &&
    selectedExames.value.length
  ) {
    return selectedExames.value
      .map(val => examesEnum.value[val])
      .join(', ')
  }
  if (selectedExames.value && examesEnum.value[selectedExames.value]) {
    return examesEnum.value[selectedExames.value]
  }
  return 'Selecione uma prova'
})

watch(
  () => selectedExames.value,
  () => {
    if (props.data.length > 1) {
      isSelectAll.value = false
      if (selectedExames.value === 0) {
        isSelectAll.value = true
      }
    }
    emit('input', { selectedExames })
  }
)
</script>

<style lang="scss" scoped>
.subjectIconLabel {
  box-sizing: border-box;
  display: block;
  cursor: pointer;
  opacity: 0.4;
  transition: all 0.2s ease-in-out;
}

.form__button {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

input[type='radio'] {
  opacity: 0;
  width: 0;
  height: 0;
  display: block;
}

input[type='radio']:active ~ label {
  opacity: 1;
}

input[type='radio']:checked ~ label {
  opacity: 1;
}

.active-subject {
  opacity: 1;
}

.divider-bar {
  width: 1px;
  height: 100%;
  background: #ebe9f1;
}
</style>