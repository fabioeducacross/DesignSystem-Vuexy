<template>
  <b-skeleton-wrapper :loading="loading">
    <template v-slot:loading>
      <b-row>
        <b-col xs="12">
          <b-skeleton class="mb-0" />
        </b-col>
        <b-col xs="12">
          <b-skeleton class="mb-0" />
        </b-col>
      </b-row>
    </template>
    <b-row>
      <b-col xs="12">
        <b-form-group label="Ano escolar">
          <ESelect
            :options="series"
            label="name"
            track-by="id"
            v-model="serieSelected"
            :clearable="false"
          >
            <template #no-options> Nenhum ano escolar foi encontrado </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col xs="12">
        <b-form-group label="Turma">
          <ESelect
            :options="classes"
            label="name"
            track-by="id"
            v-model="classeSelected"
            :clearable="false"
          >
            <template #no-options> Nenhuma turma foi encontrada </template>
          </ESelect>
        </b-form-group>
      </b-col>
    </b-row>
  </b-skeleton-wrapper>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import router from '@/router'
import { computed } from 'vue'

// Props
const props = defineProps({
  series: {
    type: Array,
    default: () => [],
  },
  classes: {
    type: Array,
    default: () => [],
  },
  value: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

// Emits
const emit = defineEmits(['input'])

const { eventId, institutionId } = router.currentRoute.params

// Computed para converter entre ID (interno) e Objeto (ESelect)
const serieSelected = computed({
  get: () => {
    const serieId = props.value && props.value.serieId
    if (!serieId) return null
    return props.series.find(s => s.id === serieId) || null
  },
  set: selected => {
    const classId = (props.classes && props.classes[0] && props.classes[0].id) || null
    emit('input', { classId, serieId: selected ? selected.id : null })
  },
})

const classeSelected = computed({
  get: () => {
    const classId = props.value && props.value.classId
    if (!classId) return null
    return props.classes.find(c => c.id === classId) || null
  },
  set: selected => {
    const classId = selected ? selected.id : null
    router.push({
      name: 'eventClassReport',
      params: {
        eventId,
        institutionId,
        classId,
      },
    })
    emit('input', { ...(props.value || {}), classId })
  },
})
</script>
