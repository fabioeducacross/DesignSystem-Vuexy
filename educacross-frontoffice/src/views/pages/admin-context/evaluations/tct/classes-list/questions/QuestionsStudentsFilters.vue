<template>
  <section>
    <b-row class="match-height">
      <b-col cols="12" lg="auto">
        <b-card>
          <SelectSubject :fetch-on-mounted="false" />
        </b-card>
      </b-col>

      <b-col cols="12" lg>
        <b-card>
          <b-skeleton-wrapper :loading="isLoading">
            <template v-slot:loading>
              <b-skeleton type="text" class="w-100 mb-2" height="50px" />
            </template>
            <b-row class="mb-1">
              <b-col cols="12" md>
                <b-form-group label="Prova" label-for="evaluation">
                  <ESelect
                    :value="selectedSerie"
                    :options="evaluationSeries"
                    @change="setSelectedSeries"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md>
                <b-form-group label="Matriz/currículo" label-for="educational-organization">
                  <ESelect
                    id="educational-organization"
                    :value="selectedEducationalOrganizationId"
                    :options="educationalOrganizationOptions"
                    label="name"
                    track-by="id"
                    :clearable="false"
                    :searchable="false"
                    :loading="educationalOrganizationLoading"
                    :placeholder="
                      educationalOrganizationLoading || educationalOrganizationOptions.length
                        ? 'Selecione a matriz'
                        : 'Matriz não vinculada'
                    "
                    @input="setSelectedEducationOrganization"
                  >
                    <template #noOptions> Matriz não vinculada </template>
                  </ESelect>
                </b-form-group>
              </b-col>
            </b-row>
          </b-skeleton-wrapper>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import { getEvaluationEducationalOrganization } from '@/services/shared/evaluations/Evaluation.Service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import sortObjectListByKey from '@/utils/sort'
import { useEvaluation } from '@/views/pages/admin-context/evaluations/useEvaluation'
import { ref, watch } from 'vue'

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['input'])

const { evaluationSeries } = useEvaluation()
const selectedSerie = ref(null)
const evaluationId = router.currentRoute.params.evaluationId
const { subject } = useFilters()
const selectedEducationalOrganizationId = ref(null)

const educationalOrganizationLoading = ref(false)
const params = ref([])

watch(evaluationSeries, newValue => {
  setSelectedSeries(newValue[0])
})

const educationOrganizationFirstOption = {
  id: null,
  name: 'Todas as matrizes/currículos',
}
const educationalOrganizationOptions = ref([])

const emitFilter = () => {
  if (subject.value.id && selectedSerie.value?.id) {
    store.commit('evaluations/setSubjectId', subject.value.id)
    emit('input', {
      EducationalOrganization: selectedEducationalOrganizationId.value,
      SubjectId: subject.value.id,
      SerieId: selectedSerie.value.id,
    })
  }
}

const educationalOrganizationFetch = () => {
  if (!subject.value.id) return
  educationalOrganizationLoading.value = true

  getEvaluationEducationalOrganization(evaluationId, {
    subjectId: subject.value.id,
    SerieId: selectedSerie.value.id,
  })
    .then(response => {
      educationalOrganizationOptions.value = sortObjectListByKey(response.data, 'name')

      if (response.data.length !== 0) {
        educationalOrganizationOptions.value = [
          educationOrganizationFirstOption,
          ...educationalOrganizationOptions.value,
        ]
        selectedEducationalOrganizationId.value = educationOrganizationFirstOption
      } else {
        educationalOrganizationOptions.value = []
        selectedEducationalOrganizationId.value = null
      }

      emitFilter()
    })
    .finally(() => {
      educationalOrganizationLoading.value = false
    })
}
const setSelectedSeries = value => {
  selectedSerie.value = value
  educationalOrganizationFetch()
}

const setSelectedEducationOrganization = value => {
  selectedEducationalOrganizationId.value = value
  emitFilter()
}

watch(subject, () => {
  educationalOrganizationFetch()
})
</script>
