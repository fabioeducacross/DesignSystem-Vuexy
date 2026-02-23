<template>
  <div>
    <SelectSubject :fetch-on-mounted="false" tooltip="Selecione uma Área" />
  </div>
</template>

<script setup>
  import ExameIcon from './ExameIcon.vue'
  import SelectSubject from '@/layouts/components/SelectSubject.vue'
  import useFilters from '@/store/filters/useFilters'
  import { watch } from 'vue'

  const props = defineProps({
    data: {
      type: Array,
      required: false,
      default: () => [],
    },
  })

  const emit = defineEmits(['input'])

  const { subject } = useFilters()

  watch(subject, () => {
    emit('input', { selectedExames: subject.value.id })
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