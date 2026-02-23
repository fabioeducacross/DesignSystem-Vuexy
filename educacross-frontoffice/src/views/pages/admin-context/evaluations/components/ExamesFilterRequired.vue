<template>
  <div class="d-flex flex-col">
    <label>{{ exameLabel }}</label>
    <div class="d-flex flex-wrap align-item-center justify-content-start justify-content-lg-center gap-1">
      <div v-for="exameId in data" :key="exameId">
        <input
          :id="`match_${exameId}-${uid}`"
          v-model="selectedExames"
          type="radio"
          :value="exameId"
        />
        <label
          :for="`match_${exameId}-${uid}`"
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
  </div>
</template>

<script setup>
import ExameIcon from './ExameIcon.vue'
import { ref, watch, computed, getCurrentInstance, onMounted } from 'vue'

// Props
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

// Emits
const emit = defineEmits(['input'])

const uid = getCurrentInstance().uid

const selectedExames = ref(0)
const isSelectAll = ref(false)

// When the data array is populated on mount, set default selection
onMounted(() => {
  if (props.data.length) {
    selectedExames.value = props.data[0]
  }
})

const examesEnum = ref({
  1: 'Matemática',
  2: 'Português',
})

const subjectComponentsEnums = ref({
  1: 'MissionMath',
  2: 'MissionPort',
})

const exameLabel = computed(() => {
  if (Array.isArray(selectedExames.value) && selectedExames.value.length) {
    return selectedExames.value.map(val => examesEnum.value[val]).join(', ')
  }
  if (selectedExames.value) {
    return examesEnum.value[selectedExames.value] || 'Selecione uma prova'
  }
  return 'Selecione uma prova'
})

watch(selectedExames, () => {
  emit('input', { selectedExames: selectedExames.value })
})
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