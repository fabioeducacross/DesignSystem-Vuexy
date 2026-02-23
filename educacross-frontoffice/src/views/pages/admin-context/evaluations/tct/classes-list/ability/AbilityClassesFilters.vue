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
              <b-row>
                <b-col cols="12" md="4">
                  <b-skeleton type="text" class="w-100" height="64px" />
                </b-col>
                <b-col cols="12" md="4">
                  <b-skeleton type="text" class="w-100" height="64px" />
                </b-col>
                <b-col cols="12" md="4">
                  <b-skeleton type="text" class="w-100" height="64px" />
                </b-col>
              </b-row>
            </template>

            <b-row>
              <b-col cols="12" md="4">
                <b-form-group label="Prova" label-for="evaluation">
                  <ESelect
                    :value="selectedSerie"
                    :options="evaluationSeries"
                    @change="setSelectedSeries"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="4">
                <label for="school-group">Matriz/Currículo</label>
                <ESelect
                  id="school-group"
                  v-model="selectedEducationalOrganizationId"
                  :options="educationalOrganizationOptions"
                  label="name"
                  :loading="educationalOrganizationLoading"
                  :placeholder="
                    educationalOrganizationLoading || educationalOrganizationOptions.length
                      ? 'Selecione a matriz'
                      : 'Matriz não vinculada'
                  "
                >
                  <template v-slot:no-options> Matriz não vinculada </template>
                </ESelect>
              </b-col>

              <b-col cols="12" md="4">
                <label for="school-group">Temática</label>
                <ESelect
                  v-model="selectedKnowledgeAxes"
                  :options="knowledgeAxesOptions"
                  label="name"
                  :loading="knowledgeAxesLoading"
                  placeholder="Selecione a temática"
                />
              </b-col>

              <b-col cols="12" md="6">
                <label for="school-serie">Selecione o ano escolar</label>
                <ESelect
                  id="school-serie"
                  v-model="selectedSerie"
                  :options="seriesFilterOptions"
                  label="name"
                  :clearable="false"
                  :searchable="false"
                >
                  <template #no-options> Nenhuma opção foi encontrada. </template>
                </ESelect>
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
import { getKnowledgeaxesFilterOptions } from '@/services/teacher-context/knowledgeaxes/Knowledgeaxes.service.js'
import useFilters from '@/store/filters/useFilters'
import sortObjectListByKey from '@/utils/sort'
import ExamesFilterRequired from '@/views/pages/admin-context/evaluations/components/ExamesFilterRequired'
import { useEvaluation } from '@/views/pages/admin-context/evaluations/useEvaluation'
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
  examesOptions: {
    type: Array,
    required: false,
  },
  seriesFilterOptions: {
    type: Array,
    required: false,
  },
})

// Emits
const emit = defineEmits(['input'])

const { subject } = useFilters()
const { evaluationSeries } = useEvaluation()

const selectedSerie = ref(null)

const evaluationId = router.currentRoute.params.evaluationId

const selectedEducationalOrganizationId = ref(null)

const educationalOrganizationFirstOption = {
  id: null,
  name: 'Todas as matrizes/currículos',
}
const educationalOrganizationOptions = ref([])

const educationalOrganizationLoading = ref(false)

const selectedKnowledgeAxes = ref({ name: 'Todas as temáticas', id: null })
const knowledgeAxesOptions = ref([])
const knowledgeAxesLoading = ref(true)

const params = ref([])

const emitFilter = () => {
  emit('input', {
    EducationalOrganizationId: selectedEducationalOrganizationId.value?.id,
    SerieId: selectedSerie.value?.id || null,
    SubjectId: subject.value?.id,
    KnowledgeAxisId: selectedKnowledgeAxes.value?.id || null,
  })
}

watch([selectedEducationalOrganizationId], () => {
  getKnowledgeaxesOptions()
})

watch(selectedKnowledgeAxes, (newVal, oldVal) => {
  if (newVal.id !== oldVal.id) {
    emitFilter()
  }
})

const getKnowledgeaxesOptions = () => {
  knowledgeAxesLoading.value = true

  getKnowledgeaxesFilterOptions({
    educationalOrganizationId: selectedEducationalOrganizationId.value?.id,
  }).then(response => {
    knowledgeAxesOptions.value = [{ name: 'Todas as temáticas', id: null }, ...response.data]
    selectedKnowledgeAxes.value = knowledgeAxesOptions.value[0]
    knowledgeAxesLoading.value = false
    emitFilter()
  })
}

const educationalOrganizationFetch = () => {
  educationalOrganizationLoading.value = true
  getEvaluationEducationalOrganization(evaluationId, {
    subjectId: subject.value?.id,
    SerieId: selectedSerie.value?.id,
  })
    .then(response => {
      educationalOrganizationOptions.value = [
        educationalOrganizationFirstOption,
        ...sortObjectListByKey(response.data, 'name'),
      ]
      selectedEducationalOrganizationId.value =
        educationalOrganizationOptions.value[0] || null
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

watch(evaluationSeries, newValue => {
  selectedSerie.value = newValue[0]
})

watch(subject, () => {
  if (!selectedSerie.value) return
  educationalOrganizationFetch()
})

</script>
