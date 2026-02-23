<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="auto">
        <SelectSubject :fetch-on-mounted="false" />
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
      <b-col v-if="showGroups(networkGroups)">
        <b-form-group :label="$t('Grupo de Escolas')" label-for="network-grou">
          <ESelect
            id="network-group"
            label="name"
            :value="networkGroup"
            :options="networkGroups"
            :clearable="false"
            :loading="networkLoading"
            :disabled="networkLoading"
            @input="setNetworkGroup"
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
import { getEducationSystemSeriesLabel } from '@/services/shared/educationSystem/EducationSystem.Service'
import useFilters from '@/store/filters/useFilters'
import { useEducationSystemInstitutions } from '@/views/pages/admin-context/network-manager/education-system/schools/institutions/useEducationSystemInstitutions.js'
import { watch, ref, computed, onMounted } from 'vue'

const { resetAndfetch, networkGroups, networkLoading, fetchNetworkGroups } = useEducationSystemInstitutions()
const { subject, serie, educationSystemId, networkGroup } = useFilters()

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
  if (!subject.value.id) {
    serieLoading.value = false
    return
  }
  getEducationSystemSeriesLabel(educationSystemId.value, {
    SubjectId: subject.value.id,
  })
    .then(({ data }) => {
      series.value = data
      series.value.unshift(serieDefault)
      if (
        !serie.value ||
        !serie.value.id ||
        !series.value.some(s => s.id === serie.value.id)
      ) {
        serie.value = series.value[0]
      }
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

onMounted(() => {
  networkGroup.value = { id: null, name: 'Todos os grupos de escolas' }
  fetchNetworkGroups()
})

const showGroups = group => {
  return group.filter(cs => cs.id).length > 1
}

const setNetworkGroup = value => {
  networkGroup.value = value
  resetAndfetch()
}

if (subject.value.id) {
  fetchSeries()
  resetAndfetch()
}
</script>

<style lang="scss" scoped></style>