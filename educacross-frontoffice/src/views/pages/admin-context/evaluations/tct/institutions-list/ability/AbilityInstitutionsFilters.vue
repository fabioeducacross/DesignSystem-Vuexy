<template>
  <section>
    <b-row class="match-height">
      <b-col cols="12" lg="auto">
        <b-card body-class="d-flex align-items-center">
          <ExamesFilter v-model="params" :data="examesOptions" />
        </b-card>
      </b-col>
      <b-col cols="12" lg>
        <b-card>
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
              <b-form-group label="Matriz/Curriculo" label-for="educational-organization">
                <ESelect
                  id="educational-organization"
                  label="name"
                  :value="selectedEducationalOrganization"
                  :options="educationalOrganizationOptions"
                  :clearable="false"
                  :loading="educationalOrganizationLoading"
                  :disabled="educationalOrganizationLoading"
                  @change="setEducationalOrganization"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="4">
              <b-form-group label="Temática" label-for="knowlegdeAxes">
                <ESelect
                  id="knowlegdeAxes"
                  label="name"
                  :value="selectedKnowledgeAxes"
                  :options="knowledgeAxesOptions"
                  :clearable="false"
                  :loading="knowledgeAxesLoading"
                  :disabled="knowledgeAxesLoading"
                  @change="setKnowledgeAxes"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6">
              <b-form-group label="Grupo de Escolas" label-for="school-group">
                <ESelect
                  id="school-group"
                  label="name"
                  :value="selectedSchoolGroup"
                  :options="networkGroupsFilterOptions"
                  :clearable="false"
                  :loading="networkGroupsFilterLoading"
                  :disabled="networkGroupsFilterLoading"
                  @change="setNetworkGroup"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6">
              <b-form-group label="Escolas" label-for="institutions">
                <ESelect
                  :value="selectedInstitution"
                  :options="institutionsFilterOptions"
                  :clearable="false"
                  :loading="institutionsFilterLoading"
                  :disabled="institutionsFilterLoading"
                  @change="setInstitution"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import router from '@/router'
import {
  getEvaluationEducationalOrganization,
  getEvaluationInstitutionsOptions,
} from '@/services/shared/evaluations/Evaluation.Service.js'
import { getNetworkGroupsEvaluationNetworkManager } from '@/services/shared/network-groups/NetworkGroups.Service'
import { getKnowledgeaxesFilterOptions } from '@/services/teacher-context/knowledgeaxes/Knowledgeaxes.service.js'
import useFilters from '@/store/filters/useFilters'
import sortObjectListByKey from '@/utils/sort'
import ExamesFilter from '@/views/pages/admin-context/evaluations/components/ExamesFilter.vue'
import ExamesFilterRequired from '@/views/pages/admin-context/evaluations/components/ExamesFilterRequired'
import { useEvaluation } from '@/views/pages/admin-context/evaluations/useEvaluation'
import { ref, watch } from 'vue'
import vSelect from 'vue-select'

// Props
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
  examesOptions: {
    type: Array,
    required: false,
    default: () => {},
  },
  seriesFilterOptions: {
    type: Array,
    required: false,
  },
})

// Emits
const emit = defineEmits(['input'])

// Store/composables
const { subject } = useFilters()
const { evaluationSeries } = useEvaluation()

// State
const selectedSerie = ref(null)
const onChange = ref(false)

const educationOrganizationFirstOption = {
  id: null,
  name: 'Todas as matrizes/currículos',
}
const educationalOrganizationLoading = ref(true)
const educationalOrganizationOptions = ref([])
const selectedEducationalOrganization = ref(null)

const selectedKnowledgeAxes = ref({ name: 'Todas as temáticas', id: null })
const knowledgeAxesOptions = ref([])
const knowledgeAxesLoading = ref(true)

const networkGroupsFilterLoading = ref(true)
const networkGroupsFilterOptions = ref([])
const selectedSchoolGroup = ref(null)

const institutionsFilterLoading = ref(true)
const institutionsFilterOptions = ref([])
const selectedInstitution = ref({
  id: null,
  name: 'Todas as Escolas',
})

const evaluationId = router.currentRoute.params.evaluationId

const params = ref({})

// Methods
const fetchEvaluationEducationalOrganization = () => {
  educationalOrganizationLoading.value = true

  getEvaluationEducationalOrganization(router.currentRoute.params.evaluationId, {
    subjectId: subject.value.id,
    SerieId: selectedSerie.value.id,
  })
    .then(response => {
      educationalOrganizationOptions.value = [
        educationOrganizationFirstOption,
        ...sortObjectListByKey(response.data, 'name'),
      ]
      selectedEducationalOrganization.value = educationalOrganizationOptions.value[0]
    })
    .finally(() => {
      educationalOrganizationLoading.value = false
      fetchKnowledgeAxes()
    })
}

const fetchKnowledgeAxes = () => {
  knowledgeAxesLoading.value = true
  getKnowledgeaxesFilterOptions({
    educationalOrganizationId: selectedEducationalOrganization.value?.id,
  })
    .then(response => {
      knowledgeAxesOptions.value = [
        { name: 'Todas as temáticas', id: null },
        ...response.data,
      ]
      selectedKnowledgeAxes.value = knowledgeAxesOptions.value[0]
    })
    .finally(() => {
      knowledgeAxesLoading.value = false

      if (onChange.value) {
        emitFilter()
      }
    })
}

const fetchNetworkGroup = () => {
  networkGroupsFilterLoading.value = true
  getNetworkGroupsEvaluationNetworkManager(evaluationId)
    .then(response => {
      networkGroupsFilterOptions.value = response.data
      selectedSchoolGroup.value = response.data[0]
    })
    .finally(() => {
      networkGroupsFilterLoading.value = false
      fetchSchools()
    })
}

const fetchSchools = () => {
  institutionsFilterLoading.value = true
  getEvaluationInstitutionsOptions(evaluationId, {
    NetworkGroupId: selectedSchoolGroup.value?.id,
  })
    .then(response => {
      const { data } = response
      institutionsFilterOptions.value = [{ name: 'Todas as Escolas', id: null }, ...data]
    })
    .finally(() => {
      institutionsFilterLoading.value = false
    })
}

const emitFilter = () => {
  if (selectedSchoolGroup.value && subject.value.id) {
    emit('input', {
      SubjectId: subject.value.id,
      EducationalOrganizationId: selectedEducationalOrganization.value?.id,
      KnowledgeAxisId: selectedKnowledgeAxes.value.id || null,
      NetworkGroupId: selectedSchoolGroup.value?.id,
      InstitutionId: selectedInstitution.value.id,
      SerieId: selectedSerie.value.id,
    })
  }
}

const setSelectedSeries = value => {
  selectedSerie.value = value
  onChange.value = true
  fetchEvaluationEducationalOrganization()
}

const setEducationalOrganization = value => {
  selectedEducationalOrganization.value = value
  onChange.value = true
  fetchKnowledgeAxes()
}

const setKnowledgeAxes = value => {
  selectedKnowledgeAxes.value = value
  emitFilter()
}

const setNetworkGroup = value => {
  selectedSchoolGroup.value = value
  fetchSchools()
  setInstitution(institutionsFilterOptions.value[0])
}

const setInstitution = value => {
  selectedInstitution.value = value
  emitFilter()
}

// Watchers
watch(subject, () => {
  onChange.value = true
  fetchEvaluationEducationalOrganization()
})

watch(evaluationSeries, newValue => {
  selectedSerie.value = newValue[0]
})

// Init
fetchNetworkGroup()

// Expose to template
// All refs/computed exposed directly
</script>