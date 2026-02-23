<template>
  <section>
    <b-row class="match-height">
      <b-col cols="12" lg="auto">
        <b-card>
          <ExamesFilter v-model="params" :data="examesOptions" />
        </b-card>
      </b-col>
      <b-col cols="12" lg>
        <b-card>
          <b-form-group label="Ano Escolar" label-for="school-group">
            <ESelect
              id="school-group"
              v-model="selectedSerie"
              :options="series"
              label="name"
              track-by="id"
              :clearable="false"
              :searchable="false"
            >
              <template #noOptions>
                <span>Nenhuma opção foi encontrada.</span>
              </template>
            </ESelect>
          </b-form-group>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import ExamesFilter from '@/views/pages/admin-context/evaluations/components/ExamesFilter'
import { ref, toRefs, watch } from 'vue'

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
  series: {
    type: Array,
    required: false,
  },
  examesOptions: {
    type: Array,
    required: false,
  },
})

const emit = defineEmits(['input'])

const params = ref([])
const selectedSerie = ref({
  id: null,
  name: 'Todas',
})
const { series } = toRefs(props)

const selectedExames = ref([])

const emitFilter = () => {
  emit('input', {
    SerieId: selectedSerie.value.id || null,
    SubjectId: params.value.selectedExames || null,
  })
}

watch(series, () => {
  if (series.value && series.value.length > 0) {
    selectedSerie.value = series.value[0]
  }
})

watch(selectedSerie, () => {
  emitFilter()
})

watch(params, () => {
  emitFilter()
})

// Initial filter emit
emitFilter()
</script>
