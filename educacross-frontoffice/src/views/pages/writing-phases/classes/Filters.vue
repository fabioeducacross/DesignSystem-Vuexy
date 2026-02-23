<template>
  <b-card>
    <b-row>
      <b-col cols="12" md>
        <b-form-group label="Ano Escolar" label-for="schoolYear">
          <ESelect
            id="schoolYear"
            label="name"
            :value="seriesIds"
            :options="institutionSeries"
            :clearable="false"
            :loading="institutionSeriesLoading"
            :disabled="institutionSeriesLoading"
            multiple
            @input="setSchoolYear"
          >
            <template v-slot:allOptionsLabel>Todos os anos</template>
          </ESelect>
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import useFilters from '@/store/filters/useFilters.js'
import { useClassesWritingPhase } from '@/views/pages/writing-phases/classes/useClassesWritingPhase'
import { ref, onMounted } from 'vue'

const { seriesIds, institutionSeries, institutionSeriesLoading, fetchCards, fetchSeries } =
  useClassesWritingPhase()

const { institutionId } = router.currentRoute.params
const { serie, institution } = useFilters()

if (institutionId) {
  institution.value = { id: institutionId }
}

const setSchoolYear = value => {
  seriesIds.value = value
  fetchCards()
}

onMounted(() => {
  fetchSeries()
})
</script>

<style lang="scss" scoped></style>