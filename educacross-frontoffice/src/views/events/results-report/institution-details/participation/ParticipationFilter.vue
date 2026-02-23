<template>
  <b-card>
    <b-row>
      <b-col>
        <b-skeleton-wrapper>
          <template v-slot:loading>
            <div>
              <b-row>
                <b-col cols="12">
                  <b-skeleton type="text" class="w-100 mb-0" height="50px"></b-skeleton>
                </b-col>
              </b-row>
            </div>
          </template>
          <b-form-group label="Ano escolar" label-for="serie-filter">
            <ESelect
              id="serie-filter"
              label="name"
              :value="selectedSerie"
              :options="seriesFilter"
              :clearable="false"
              :searchable="false"
              @input="handleSerieChange"
            />
          </b-form-group>
        </b-skeleton-wrapper>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { useEvents } from '@/views/events/useEvents.js'
import { computed } from 'vue'

const { series, serieId, setSerieId } = useEvents()

/**
 * Lista de series com opcao "Todos" no inicio
 */
const seriesFilter = computed(() => [
  {
    id: null,
    name: 'Todos',
  },
  ...series.value,
])

/**
 * Encontra o objeto serie correspondente ao ID selecionado
 */
const selectedSerie = computed(() => {
  return seriesFilter.value.find(s => s.id === serieId.value) || seriesFilter.value[0]
})

/**
 * Wrapper para extrair ID do objeto serie emitido pelo ESelect
 */
const handleSerieChange = serie => {
  setSerieId(serie?.id)
}
</script>
