<template>
  <b-card v-if="!isTeacher">
    <b-row>
      <b-col cols="12" sm="6">
        <b-form-group label="Ano escolar" label-for="year-select">
          <ESelect
            id="serie-select"
            :value="selectedSerie"
            :options="series"
            label="name"
            track-by="id"
            :clearable="false"
            :searchable="false"
            @input="handleSerieChange"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" sm="6">
        <b-form-group label="Turma" label-for="class-select">
          <select-infinity-scroll
            :value="classeValue"
            api="/v2/classes/label"
            close-on-select
            class="filter-chooser filter-items"
            :father-params="classesParams"
            :await-father-params="true"
            select-first
            :first-option="{ name: 'Todas as turmas', id: null }"
            @input="setClasse"
          ></select-infinity-scroll>
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectInfinityScroll from '@/components/selects/SelectInfinityScroll.vue'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { useEvents } from '@/views/events/useEvents.js'
import { ref, computed, watch } from 'vue'

const { series, serieId, setSerieId, setClassId } = useEvents()
const { classe } = useFilters()

const classeValue = ref({ name: 'Todas as turmas', id: null })

const setClasse = value => {
  classeValue.value = value
  const id = value.id
  setClassId(id)
}

// Computed para converter serieId (Number) para objeto serie completo
const selectedSerie = computed(() => {
  if (!serieId.value) return null
  return series.value.find(s => s.id === serieId.value) || null
})

// Handler para converter objeto selecionado para ID
const handleSerieChange = selectedItem => {
  if (selectedItem && selectedItem.id) {
    setSerieId(selectedItem.id)
  }
}

const classesParams = computed(() => {
  if (!serieId.value) return {}
  return {
    serieIds: serieId.value,
  }
})

const isTeacher = store.getters.accessRole === 'Teacher'

if (isTeacher) {
  setSerieId(classe.value.SerieId)
  setClassId(classe.value.ClassId)
}

watch([series], () => {
  if (series.value.length > 0) {
    if (!isTeacher) {
      setSerieId(series.value[0].id)
    }
  }
})
</script>

<style lang="scss" scoped></style>
