<template>
  <section>
    <b-row>
      <b-col lg="4" md="12">
        <b-form-group label="Matriz/Currículo">
          <ESelect
            v-model="selectedFilterEducationalOrganization"
            :options="educationalOrganizationOptions"
            :clearable="false"
            :disabled="loadingGetActivities"
            :loading="loadingGetEducationalOrganization"
            label="name"
            track-by="id"
            placeholder="selectEducationalOrganization"
            @input="selectEducationalOrganization"
          />
        </b-form-group>
      </b-col>
      <b-col lg="8" md="12">
        <b-form-group>
          <template v-slot:label>
            <span class="d-none d-lg-inline-block">&#8205;</span>
          </template>
          <div class="d-flex align-items-center">
            <vue-autosuggest
              ref="autoSuggestInputRef"
              :get-suggestion-value="getSuggestionValue"
              :input-props="{
                id: 'autosuggest__input',
                class: 'form-control',
                placeholder: 'Digite o que você procura e selecione uma opção',
              }"
              :render-suggestion="renderSuggestion"
              :suggestions="suggests"
              class="w-100 mr-1"
              @input="beforeFetchSuggestion($event, true)"
            >
              <template v-if="hasSuggestNewPage" #after-suggestions>
                <p ref="refLastSuggest" class="text-center">Carregando sugestões...</p>
              </template>
            </vue-autosuggest>
            <b-button
              :class="{ 'cursor-not-allowed': !searchButtonIsAvailable }"
              :disabled="!searchButtonIsAvailable"
              variant="primary"
              @click="handleGetActivities"
            >
              Pesquisar
            </b-button>
          </div>
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group class="mb-1 mb-sm-1">
          <div class="h-100 d-flex align-items-center">
            <b-button variant="link" @click.stop="checkIfCanResetFilters"> Limpar </b-button>
            <b-form-checkbox v-model="searchByGameName">
              <span class="text-primary cursor-pointer">Pesquisar apenas por nome do jogo</span>
            </b-form-checkbox>
          </div>
        </b-form-group>
      </b-col>
      <b-col lg="12" sm="12" xl="5">
        <b-form-group
          :label="teacherService.changeTextBySubject('knowledgeAxis', 'pluralFirstCapitalLetters')"
        >
          <ESelect
            v-model="selectedFilterKnowledgeAxis"
            :options="knowledgeAxisOptions"
            :clearable="false"
            :disabled="loadingGetActivities"
            :loading="loadingGetKnowledgeAxes"
            label="name"
            track-by="id"
            placeholder="selectKnowledgeAxis"
            class="filter-items"
            @input="selectKnowledgeAxis"
          />
        </b-form-group>
      </b-col>
      <b-col lg="12" sm="12" xl="7">
        <b-form-group
          :label="teacherService.changeTextBySubject('descriptor', 'pluralFirstCapitalLetters')"
        >
          <ESelect
            v-model="selectedFilterDescriptor"
            :options="descriptorOptions"
            :clearable="false"
            :disabled="loadingGetDescriptors"
            :loading="loadingGetDescriptors"
            label="name"
            track-by="id"
            placeholder="selectDescriptor"
            class="filter-items"
            @input="handleDescriptorChange"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { missionTypeEnum } from '@/consts/missionsEnum.js'
import axios from '@/libs/axios'
import store from '@/store'
import sortObjectListByKey from '@/utils/sort.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { computed, getCurrentInstance, nextTick, onMounted, ref, triggerRef, watch } from 'vue'
import { VueAutosuggest } from 'vue-autosuggest'

// Props
const props = defineProps({
  typeQuery: {
    type: Number,
    default: 1,
  },
})

// Emits
const emit = defineEmits(['input'])

const vm = getCurrentInstance().proxy

const firstKnowledgeAxis = ref({ id: null, name: 'Todos' })
const firstDescriptor = ref({ id: null, name: 'Todas' })
const firstTag = ref({ id: null, name: 'Todos' })
const firstEducationalOrganization = ref({ id: null, name: 'Todos' })

const teacherService = vm.$utilTeacherService
const educationalOrganizationOptions = ref([firstEducationalOrganization.value])
const selectedFilterEducationalOrganization = ref(educationalOrganizationOptions.value[0])
const loadingGetEducationalOrganization = ref(false)
const loadingGetActivities = ref(false)
const searchByGameName = ref(false)

const selectedActivityType = computed(() => {
  const currentActivityType = missionTypeEnum[props.typeQuery]
  return currentActivityType || missionTypeEnum[1]
})

const currentActivityPage = ref(1)
const selectedFilterKnowledgeAxis = ref(firstKnowledgeAxis.value)
const selectedFilterDescriptor = ref(firstDescriptor.value)
const selectedFilterTag = ref(firstTag.value)
const knowledgeAxisOptions = ref([firstKnowledgeAxis.value])
const loadingGetKnowledgeAxes = ref(false)
const descriptorOptions = ref([firstDescriptor.value])
const loadingGetDescriptors = ref(false)
const suggests = ref([])
const pageSuggestion = ref(1)
const suggestionTotalPages = ref(0)
const suggestionQuery = ref('')
const selectedSugestion = ref('')
const autoSuggestInputRef = ref(null)
const searchButtonIsAvailable = ref(null)

const hasSuggestNewPage = computed(() => pageSuggestion.value < suggestionTotalPages.value)

const subjectId = computed(() => store.getters['filters/subject']?.id)

const refLastSuggest = ref(null)

const getEducationalOrganization = () => {
  loadingGetEducationalOrganization.value = true
  axios
    .get('/v1/educationalorganizations', {
      params: { subjectId: subjectId.value },
    })
    .then(response => {
      educationalOrganizationOptions.value = sortObjectListByKey(response.data, 'name')
      educationalOrganizationOptions.value.unshift(firstEducationalOrganization.value)
      selectedFilterEducationalOrganization.value = firstEducationalOrganization.value
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = vm.$root.handleFormatErrors(errors)
      errorsArray.forEach(elementError => {
        vm.$toast({
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
      loadingGetEducationalOrganization.value = false
    })
}

const selectEducationalOrganization = () => {
  selectedFilterKnowledgeAxis.value = knowledgeAxisOptions.value[0]
  descriptorOptions.value = []
  descriptorOptions.value.unshift(firstDescriptor.value)
  selectedFilterDescriptor.value = descriptorOptions.value[0]
  resetCurrentActivityPage()
  getKnowledgeAxes()
  filterActivities()
}

const getKnowledgeAxes = () => {
  loadingGetKnowledgeAxes.value = true
  axios
    .get('/v1/knowledgeaxes', {
      params: {
        educationalOrganizationId: selectedFilterEducationalOrganization.value.id,
      },
    })
    .then(response => {
      knowledgeAxisOptions.value = sortObjectListByKey(response.data, 'name')
      knowledgeAxisOptions.value.unshift(firstKnowledgeAxis.value)
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = teacherService.handleFormatErrors(errors)
      errorsArray.forEach(elementError => {
        vm.$toast({
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

const handleFilters = () => {
  loadingGetActivities.value = true

  const dynamicFilters = {}

  if (selectedFilterEducationalOrganization.value.id > 1)
    dynamicFilters.educationalOrganizationIds = selectedFilterEducationalOrganization.value.id

  if (selectedFilterKnowledgeAxis.value.id > 1)
    dynamicFilters.knowledgeAxisIds = selectedFilterKnowledgeAxis.value.id

  if (selectedFilterDescriptor.value.id > 1)
    dynamicFilters.descriptorIds = selectedFilterDescriptor.value.id

  if (selectedFilterTag.value.tagId) {
    dynamicFilters.tagIds = selectedFilterTag.value.tagId
  } else if (selectedFilterTag.value.activityNumber) {
    dynamicFilters.activityNumbers = selectedFilterTag.value.activityNumber
  }

  if (selectedActivityType.value.id) dynamicFilters.type = selectedActivityType.value.id

  if (searchByGameName.value) {
    dynamicFilters.Name = autoSuggestInputRef.value?.internalValue
  } else {
    dynamicFilters.Search = autoSuggestInputRef.value?.internalValue
  }

  const composedFilters = {
    subjectIds: subjectId.value,
    ...dynamicFilters,
  }

  emit('input', composedFilters)
  loadingGetActivities.value = false
}

const renderSuggestion = suggestion => {
  selectedSugestion.value = suggestion.item.name
  return suggestion.item.name
}

const fetchSuggestion = (text, newQuery) => {
  if (text === '' || text === undefined) {
    if (autoSuggestInputRef.value) autoSuggestInputRef.value.internalValue = null
    suggestionQuery.value = ''
    selectedSugestion.value = ''
    searchButtonIsAvailable.value = false
    handleFilters()
    return
  }

  if (newQuery) {
    pageSuggestion.value = 1
  } else {
    pageSuggestion.value += 1
  }
  let activityType = false
  if (selectedActivityType.value.id) activityType = selectedActivityType.value.id

  suggestionQuery.value = text
  searchButtonIsAvailable.value = true

  axios
    .get('/v2/tags', {
      params: {
        subjectId: subjectId.value,
        page: pageSuggestion.value,
        SearchTerm: text,
        Type: activityType,
        onlyName: searchByGameName.value,
      },
    })
    .then(response => {
      const { data } = response

      suggestionTotalPages.value = data.totalPages

      if (newQuery) {
        suggests.value = [
          {
            data: data.data,
          },
        ]
      } else {
        if (!suggests.value.length) {
          suggests.value = [{ data: [] }]
        }
        suggests.value[0].data.push(...data.data)
        triggerRef(refLastSuggest.value)
      }

      nextTick().then(() => {
        setObserver()
      })
    })
}

const getSuggestionValue = suggestion => {
  if (suggestion.item.name) {
    searchButtonIsAvailable.value = true
  } else {
    searchButtonIsAvailable.value = false
  }
  selectedSugestion.value = suggestion.item.name
  if (autoSuggestInputRef.value) autoSuggestInputRef.value.internalValue = suggestion.item.name
  suggestionQuery.value = ''
  handleFilters()
  return suggestion.item.name
}

const changeActivitieType = () => {
  currentActivityPage.value = 1
  handleFilters()
}

let observer

const setObserver = () => {
  if (!hasSuggestNewPage.value) return
  if (!observer) {
    observer = new window.IntersectionObserver(handleIntersection)
  }
  if (refLastSuggest.value) {
    observer.observe(refLastSuggest.value)
  }
}

const handleIntersection = entries => {
  const target = entries[0]
  if (target.isIntersecting) {
    fetchSuggestion(suggestionQuery.value, false)
  }
}

const resetCurrentActivityPage = () => {
  currentActivityPage.value = 1
}

const filterActivities = () => {
  if (!loadingGetActivities.value) {
    handleFilters()
  }
}

const getDescriptors = () => {
  loadingGetDescriptors.value = true
  axios
    .get('/v1/descriptors', {
      params: { KnowledgeAxisId: selectedFilterKnowledgeAxis.value.id },
    })
    .then(response => {
      descriptorOptions.value = sortObjectListByKey(response.data, 'name')
      descriptorOptions.value.unshift({ id: 0, name: 'Todas' })
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = teacherService.handleFormatErrors(errors)
      errorsArray.forEach(elementError => {
        vm.$toast({
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
      loadingGetDescriptors.value = false
    })
}

const selectKnowledgeAxis = () => {
  selectedFilterDescriptor.value = descriptorOptions.value[0]
  resetCurrentActivityPage()
  if (selectedFilterKnowledgeAxis.value.id) {
    getDescriptors()
  }

  if (!selectedFilterKnowledgeAxis.value.id) {
    descriptorOptions.value = [firstDescriptor.value]
    firstDescriptor.value = { id: null, name: 'Todas' }
  }

  filterActivities()
}

const handleDescriptorChange = () => {
  currentActivityPage.value = 1
  filterActivities()
}

const handleGetActivities = () => {
  handleFilters()
}

watch([subjectId], () => {
  getEducationalOrganization()
  getKnowledgeAxes()
  handleFilters()
})

onMounted(() => {
  getEducationalOrganization()
  getKnowledgeAxes()
  handleFilters()
})

const checkIfCanResetFilters = () => {
  const filterValues = [
    selectedFilterEducationalOrganization.value?.id,
    selectedFilterKnowledgeAxis.value?.id,
    selectedFilterDescriptor.value?.id,
    suggestionQuery.value,
    selectedSugestion.value,
    searchByGameName.value,
  ]

  const hasFilterSelected = filterValues.find(value => value)

  if (hasFilterSelected) {
    clearFilters()
  }
}

const debounce = (fn, wait) => {
  let timer
  return text => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      if (typeof fn === 'function') {
        fn(text, true)
      }
    }, wait)
  }
}

const callFetchSuggestion = (text, newQuery) => {
  fetchSuggestion(text, newQuery)
}

const beforeFetchSuggestion = debounce(callFetchSuggestion, 500)

const clearFilters = () => {
  searchButtonIsAvailable.value = null
  firstKnowledgeAxis.value = { id: null, name: 'Todos' }
  firstDescriptor.value = { id: null, name: 'Todas' }
  firstTag.value = { id: null, name: 'Todos' }
  firstEducationalOrganization.value = { id: null, name: 'Todos' }

  selectedFilterEducationalOrganization.value = educationalOrganizationOptions.value[0]
  getEducationalOrganization()
  getKnowledgeAxes()
  selectedFilterKnowledgeAxis.value = firstKnowledgeAxis.value

  firstDescriptor.value = { id: null, name: 'Todas' }
  descriptorOptions.value = [firstDescriptor.value]
  selectedFilterDescriptor.value = descriptorOptions.value[0]

  if (autoSuggestInputRef.value) autoSuggestInputRef.value.internalValue = null
  searchByGameName.value = false
  suggests.value = []
  pageSuggestion.value = 1
  suggestionTotalPages.value = 0
  suggestionQuery.value = ''
  selectedSugestion.value = ''
  handleFilters()
}
</script>

<style lang="scss">
  @import '@/@core/scss/vue/libs/vue-autosuggest.scss';
</style>
