<template>
  <b-card>
    <b-row>
      <b-col cols="auto">
        <SelectSubject :fetch-on-mounted="false" />
      </b-col>
      <b-col md>
        <b-form-group label-for="autoSuggestInputRef">
          <template v-slot:label>
            <span class="">&#8205;</span>
          </template>
          <div class="d-flex align-items-center">
            <vue-autosuggest
              ref="autoSuggestInputRef"
              class="w-100"
              :suggestions="suggests"
              :input-props="{
                id: 'autosuggest__input',
                class: 'form-control',
                placeholder: 'Pesquisar pelo nome do jogo ou conteúdo',
              }"
              :render-suggestion="renderSuggestion"
              :get-suggestion-value="getSuggestionValue"
              @input="beforeFetchSuggestion($event, true)"
            >
              <template v-if="hasSuggestNewPage" #after-suggestions>
                <p ref="refLastSuggest" class="text-center">Carregando sugestões...</p>
              </template>
            </vue-autosuggest>
          </div>
        </b-form-group>
      </b-col>
    </b-row>
    <ExpandableFilterArea>
      <b-row align-v="end">
        <b-col lg="3">
          <b-form-group label-for="educationalOrganization" label="Matriz/Currículo">
            <ESelect
              id="educationalOrganization"
              label="name"
              :value="selectedEducationalOrganization"
              :options="educationalOrganizationOptions"
              :clearable="false"
              :disabled="loadingEducationalOrganization"
              :loading="loadingEducationalOrganization"
              @input="setSelectedEducationalOrganization"
            >
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col lg>
          <b-form-group label="Temática" label-for="knowledgeAxes">
            <ESelect
              :value="selectedKnowledgeAxes"
              class="filter-items"
              :options="knowledgeAxesOptions"
              label="name"
              :clearable="false"
              :loading="loadingGetKnowledgeAxes"
              :disabled="loadingGetActivities || !selectedEducationalOrganization.id"
              @input="setSelectknowledgeAxes"
            >
              <template v-if="!selectedEducationalOrganization.id" #noOptions>
                Defina a matriz/currículo
              </template>
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col lg>
          <b-form-group
            :label="teacherService.changeTextBySubject('descriptor', 'pluralFirstCapitalLetters')"
            label-for="descriptor"
          >
            <ESelect
              :value="selectedDescriptor"
              :options="descriptorOptions"
              label="name"
              :clearable="false"
              :loading="loadingDescriptors"
              :disabled="loadingDescriptors || !selectedKnowledgeAxes.id"
              multiple
              @input="setDescriptors"
            >
              <template v-if="!selectedKnowledgeAxes.id" #noOptions>
                Defina a matriz/currículo e uma temática
              </template>
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col v-if="teacherService.subjects.isMultiliteracy(subject.id)" lg="2">
          <b-form-group label="Tipo" label-for="activityTypes">
            <ESelect
              v-model="selectedActivityType"
              :options="activityTypes"
              label="name"
              :clearable="false"
              @input="changeActivitieType"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <template v-slot:footer>
        <div class="w-100 d-flex justify-content-end">
          <b-link
            variant="flat-primary"
            class="d-flex align-items-center p-0 gap-1"
            @click.stop="checkIfCanResetFilters"
          >
            <span class="material-symbols-outlined"> cancel </span> Limpar busca
          </b-link>
        </div>
      </template>
    </ExpandableFilterArea>
  </b-card>
</template>

<script setup>
import Toast from '../../../admin-context/shared/components/toast/Toast.vue'
import ExpandableFilterArea from '@/components/filter/ExpandableFilterArea.vue'
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getEducationalOrganizations } from '@/services/shared/educationalOrganization/EducationalOrganization.service'
import { getDescriptors } from '@/services/teacher-context/descriptors/Descriptors.service.js'
import { getKnowledgeaxesFilterOptions } from '@/services/teacher-context/knowledgeaxes/Knowledgeaxes.service.js'
import getTags from '@/services/teacher-context/tags/Tags.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import sortObjectListByKey from '@/utils/sort.js'
import debounce from 'lodash/debounce'
import { computed, getCurrentInstance, nextTick, ref, watch } from 'vue'
import { VueAutosuggest } from 'vue-autosuggest'

const emit = defineEmits(['input'])

const vm = getCurrentInstance().proxy
const teacherService = vm.$utilTeacherService
const defaultValue = { id: null, name: 'Todos' }

store.dispatch('filters/reset')
const { subject, fetchSubjectsWithParams } = useFilters()

const loadingGetActivities = ref(false)
fetchSubjectsWithParams({})

watch([subject], async () => {
  selectedEducationalOrganization.value = defaultValue
  selectedKnowledgeAxes.value = defaultValue
  selectedDescriptor.value = []
  resetCurrentActivityPage()
  handleFilters()
  fetchEducationalOrganization()
})

const suggests = ref([])
const selectedSugestion = ref('')

const renderSuggestion = suggestion => suggestion.item.name

const setObserver = () => {
  if (!hasSuggestNewPage.value) return
  observer.observe(refLastSuggest.value)
}

const getSuggestionValue = suggestion => {
  selectedSugestion.value = suggestion.item.name
  autoSuggestInputRef.value.internalValue = suggestion.item.name
  handleFilters()
  return suggestion.item.name
}

const pageSuggestion = ref(1)
const suggestionQuery = ref('')
const suggestionTotalPages = ref(0)

const fetchSuggestion = (text, newQuery) => {
  if (!text) {
    autoSuggestInputRef.value.internalValue = ''
    selectedSugestion.value = ''
    handleFilters()
    return
  }

  if (newQuery) {
    pageSuggestion.value = 1
  } else {
    pageSuggestion.value += 1
  }

  getTags({
    subjectId: subject.value.id,
    page: pageSuggestion.value,
    SearchTerm: text,
  }).then(({ data }) => {
    suggestionTotalPages.value = data.totalPages

    if (newQuery) {
      suggests.value = [{ data: data.data }]
    } else {
      suggests.value[0].data.push(...data.data)
    }

    nextTick().then(() => {
      setObserver()
    })
  })
}

const callFetchSuggestion = debounce(fetchSuggestion, 500)

const handleIntersection = entries => {
  if (entries[0].isIntersecting) {
    fetchSuggestion(suggestionQuery.value, false)
  }
}

const observer = new IntersectionObserver(handleIntersection)

const activityTypes = [
  { id: 1, name: 'Individual' },
  { id: 2, name: 'Coletivo' },
]
const selectedActivityType = ref(activityTypes[0])

const changeActivitieType = () => {
  resetCurrentActivityPage()
  handleFilters()
}

const selectedEducationalOrganization = ref(defaultValue)
const educationalOrganizationOptions = ref([])
const loadingEducationalOrganization = ref(true)

const fetchEducationalOrganization = async () => {
  if (!subject.value.id) return
  loadingEducationalOrganization.value = true
  await getEducationalOrganizations(subject.value.id)
    .then(({ data }) => {
      educationalOrganizationOptions.value = [
        defaultValue,
        ...sortObjectListByKey(data, 'name'),
      ]
      selectedEducationalOrganization.value = educationalOrganizationOptions.value[0]
    })
    .finally(() => {
      loadingEducationalOrganization.value = false
    })
}

const setSelectedEducationalOrganization = value => {
  selectedEducationalOrganization.value = value
  resetCurrentActivityPage()
  selectedKnowledgeAxes.value = defaultValue
  descriptorOptions.value = []
  selectedDescriptor.value = []

  if (selectedEducationalOrganization.value.id) {
    getKnowledgeAxes()
  } else {
    knowledgeAxesOptions.value = []
  }

  filterActivities()
}

const selectedKnowledgeAxes = ref(defaultValue)
const knowledgeAxesOptions = ref([])
const loadingGetKnowledgeAxes = ref(false)

const getKnowledgeAxes = () => {
  loadingGetKnowledgeAxes.value = true

  getKnowledgeaxesFilterOptions({
    educationalOrganizationId: selectedEducationalOrganization.value.id,
  })
    .then(response => {
      knowledgeAxesOptions.value = [
        defaultValue,
        ...sortObjectListByKey(response.data, 'name'),
      ]
      selectedKnowledgeAxes.value = knowledgeAxesOptions.value[0]
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = teacherService.handleFormatErrors(errors)
      errorsArray.forEach(elementError => {
        vm.$root.$toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: elementError,
            variant: 'danger',
          },
        })
      })
    })
    .finally(() => {
      loadingGetKnowledgeAxes.value = false
    })
}

const setSelectknowledgeAxes = async value => {
  selectedKnowledgeAxes.value = value
  resetCurrentActivityPage()

  if (selectedKnowledgeAxes.value.id) {
    await fetchDescriptors()
  } else {
    descriptorOptions.value = []
    selectedDescriptor.value = []
    filterActivities()
  }
}

const descriptorOptions = ref([])
const loadingDescriptors = ref(false)
const selectedDescriptor = ref([])

const fetchDescriptors = () => {
  loadingDescriptors.value = true

  return getDescriptors(selectedKnowledgeAxes.value.id)
    .then(response => {
      descriptorOptions.value = sortObjectListByKey(response.data, 'name')
      selectedDescriptor.value = [...descriptorOptions.value]
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = teacherService.handleFormatErrors(errors)
      errorsArray.forEach(elementError => {
        vm.$root.$toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: elementError,
            variant: 'danger',
          },
        })
      })
    })
    .finally(() => {
      loadingDescriptors.value = false
    })
}

const setDescriptors = value => {
  selectedDescriptor.value = value
  resetCurrentActivityPage()
  filterActivities()
}

const currentActivityPage = ref(1)

const autoSuggestInputRef = ref(null)
const searchButtonIsAvailable = ref(null)

const hasSuggestNewPage = computed(() => pageSuggestion.value < suggestionTotalPages.value)

const refLastSuggest = ref(null)

const handleFilters = () => {
  loadingGetActivities.value = true

  const dynamicFilters = {}

  if (autoSuggestInputRef.value.internalValue) {
    dynamicFilters.Search = encodeURIComponent(autoSuggestInputRef.value.internalValue)
  }

  if (
    selectedDescriptor.value.length !== descriptorOptions.value.length &&
    selectedKnowledgeAxes.value.id
  ) {
    dynamicFilters.descriptorIds = selectedDescriptor.value.map(item => item.id)
  }

  emit('input', {
    subjectIds: subject.value.id,
    educationalOrganizationIds: selectedEducationalOrganization.value.id,
    knowledgeAxesIds: selectedKnowledgeAxes.value.id,
    type: selectedActivityType.value.id,
    ...dynamicFilters,
  })

  loadingGetActivities.value = false
}

const resetCurrentActivityPage = () => {
  currentActivityPage.value = 1
}

const filterActivities = () => {
  if (!loadingGetActivities.value) {
    handleFilters()
  }
}

const checkIfCanResetFilters = () => {
  const filterValues = [
    selectedEducationalOrganization.value.id,
    selectedKnowledgeAxes.value.id,
    selectedDescriptor.value.id,
    suggestionQuery.value,
    selectedSugestion.value,
  ]

  if (filterValues.some(value => value)) {
    clearFilters()
  }
}

const clearFilters = () => {
  descriptorOptions.value = []
  knowledgeAxesOptions.value = []
  selectedEducationalOrganization.value = defaultValue
  selectedKnowledgeAxes.value = defaultValue
  selectedDescriptor.value = []
  selectedActivityType.value = activityTypes[0]
  autoSuggestInputRef.value.internalValue = ''
  suggests.value = []
  pageSuggestion.value = 1
  suggestionTotalPages.value = 0
  suggestionQuery.value = ''
  selectedSugestion.value = ''
  handleFilters()
}

const beforeFetchSuggestion = callFetchSuggestion

</script>

<style lang="scss">
  @import '@/@core/scss/vue/libs/vue-autosuggest.scss';
</style>