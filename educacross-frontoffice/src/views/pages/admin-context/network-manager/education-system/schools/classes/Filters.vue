<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="auto">
        <SelectSubject />
      </b-col>
      <b-col>
        <b-form-group :label="$t('Ano Escolar')" label-for="serie">
          <ESelect
            id="serie"
            label="name"
            :value="serie"
            :options="series"
            :clearable="false"
            :loading="serieLoading"
            :disabled="serieLoading"
            @input="setSerie"
          >
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
import { getEducationSystemSeriesLabel } from '@/services/shared/educationSystem/EducationSystem.Service'
import useFilters from '@/store/filters/useFilters'
import { useEducationSystemClasses } from '@/views/pages/admin-context/network-manager/education-system/schools/classes/useEducationSystemClasses.js'
import { watch, ref, computed } from 'vue'

const { resetAndfetch } = useEducationSystemClasses()
const { subject, serie, educationSystemId, institution } = useFilters()

const { institutionId } = router.currentRoute.params
institution.value.id = institutionId

const serieDefault = { id: null, name: 'Todos os anos escolares' }

const subjectId = computed(() => subject.value.id)

const series = ref([])
const serieLoading = ref(true)

const setSerie = value => {
  serie.value = value
  resetAndfetch()
}

const fetchSeries = async () => {
  serieLoading.value = true
  serie.value = serieDefault
  if (!subject.value.id) return
  getEducationSystemSeriesLabel(educationSystemId.value, {
    InstitutionId: institution.value.id,
    SubjectId: subject.value.id,
  })
    .then(({ data }) => {
      series.value = data
      series.value.unshift(serieDefault)
    })
    .finally(() => {
      serieLoading.value = false
    })
}

watch([subjectId], () => {
  serie.value = serieDefault
  fetchSeries()
  resetAndfetch()
})

if (subject.value.id) {
  fetchSeries()
  resetAndfetch()
}
</script>

<style lang="scss" scoped></style>