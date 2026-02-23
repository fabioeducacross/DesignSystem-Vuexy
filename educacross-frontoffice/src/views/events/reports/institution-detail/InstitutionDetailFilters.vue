<template>
  <b-card>
    <b-row>
      <b-col cols="12">
        <b-form-group label="Selecione o ano escolar">
          <b-skeleton-wrapper :loading="isLoading">
            <template v-slot:loading>
              <b-skeleton type="text" class="w-100" height="40px" />
            </template>
            <ESelect
              v-model="selectedSeriesObject"
              label="name"
              track-by="id"
              :options="serieList"
              :clearable="false"
              :searchable="false"
            >
              <template #noOptions>
                <span>Nenhum ano escolar foi encontrado</span>
              </template>
            </ESelect>
          </b-skeleton-wrapper>
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { ref, watch, computed } from 'vue'

const props = defineProps({
  series: {
    type: [Array, undefined, null],
    required: false,
  },
  isLoading: { type: Boolean, required: true },
})

const emit = defineEmits(['setFiter'])

const serieDefault = { id: null, name: 'Todos os anos' }
const serieList = computed(() => [serieDefault, ...(props.series || [])])

const selectedSeries = ref(serieDefault.id)

/**
 * Computed para converter entre ID (interno) e Objeto (ESelect)
 */
const selectedSeriesObject = computed({
  get: () => {
    return serieList.value.find(s => s.id === selectedSeries.value) || null
  },
  set: obj => {
    selectedSeries.value = obj?.id ?? null
  },
})

const emitFilter = () => {
  emit('setFiter', {
    serieId: selectedSeries.value,
  })
}

watch([selectedSeries], () => {
  emitFilter()
})
</script>
