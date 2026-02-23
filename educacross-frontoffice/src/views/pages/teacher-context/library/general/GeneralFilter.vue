<template>
  <b-card v-if="role !== 'Teacher'">
    <b-row>
      <b-col v-if="role === 'NetworkManager'" cols="12" md>
        <b-form-group label="Grupo de Escolas" label-for="network-group">
          <ESelect
            id="network-group"
            label="name"
            :value="networkGroup"
            :options="networkGroups"
            :clearable="false"
            :loading="isLoading"
            :disabled="isLoading"
            @input="setNetworkGroup"
          >
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col v-if="role === 'NetworkManager'" cols="12" md>
        <b-form-group label="Cidade" label-for="city">
          <ESelect
            id="city"
            prefix="cidades"
            label="name"
            :value="city"
            :options="cities"
            :loading="cityLoading"
            :disabled="cityLoading"
            multiple
            clearable
            placeholder="Todas as cidades"
            @input="setCity"
          >
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col v-if="role === 'NetworkManager'" cols="12" md>
        <b-form-group label="Escola" label-for="institution">
          <ESelect
            id="institution"
            label="name"
            :value="institution"
            :options="institutions"
            :clearable="false"
            :loading="institutionLoading"
            :disabled="institutionLoading"
            @input="setInstitution"
          >
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" md>
        <b-form-group label="Ano Escolar" label-for="schoolYear">
          <ESelect
            id="schoolYear"
            label="name"
            :value="schoolYear"
            :options="schoolYears"
            :clearable="false"
            :loading="schoolYearLoading"
            :disabled="schoolYearLoading"
            @input="setSchoolYear"
          >
          </ESelect>
        </b-form-group>
      </b-col>

      <b-col v-if="role !== 'NetworkManager'" cols="12" md>
        <b-form-group label="Turmas" label-for="classes">
          <ESelect
            :disabled="classesLoading"
            :value="classes"
            :options="classesOptions"
            :page="classesPage"
            :total-pages="classesTotalpages"
            :loading="classesLoading"
            name="classes"
            label="name"
            paginated
            @input="setclasses"
            @nextPage="fetchClasses"
          >
            <template v-slot:no-options> {{ $t('classesNotFound') }} </template>
          </ESelect>
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { getCities } from '@/services/shared/city/Cities.Service.js'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import { getInstitutions } from '@/services/shared/institution/Institutions.Service'
import { getNetworkGroups } from '@/services/shared/network-groups/NetworkGroups.Service'
import { getSeries } from '@/services/shared/serie/Serie.Service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import { ref, computed, onUnmounted, onMounted, watch } from 'vue'

const { classe } = useFilters()

const role = store.getters.accessRole

if (role === 'Teacher') {
  store.commit('moduleReadingFluencyOverview/classes', {
    id: classe.value.ClassId,
  })
}

const isLoading = ref(true)

// networkGroup
const networkGroup = computed(
  () => store.getters['moduleReadingFluencyOverview/networkGroup'],
)

const networkGroups = ref([])

const setNetworkGroup = networkGroupVal => {
  store.commit('moduleReadingFluencyOverview/city', [])
  store.commit('moduleReadingFluencyOverview/institution', {
    name: 'Todas as escolas',
    id: null,
  })
  store.commit('moduleReadingFluencyOverview/networkGroup', networkGroupVal)
  handleGetCities()
  fetchGetInstitutions()
  fetchOverview()
}

// Institution
const institutionLoading = ref(true)

const institution = computed(() => store.getters['moduleReadingFluencyOverview/institution'])

const institutions = ref([])

const setInstitution = institutionVal => {
  store.commit('moduleReadingFluencyOverview/institution', institutionVal)
  fetchOverview()
}

const fetchGetInstitutions = async () => {
  institutionLoading.value = true
  try {
    const { data } = await getInstitutions({ NetworkGroupId: networkGroup.value.id })

    institutions.value = [{ name: 'Todas as escolas', id: null }, ...data]
  } catch (error) {
    institutions.value = [{ name: 'Todas as escolas', id: null }]
  }
  institutionLoading.value = false
}

// city

const cityLoading = ref(true)

const city = computed(() => store.getters['moduleReadingFluencyOverview/city'])

const cities = ref([])

const handleGetCities = () => {
  cityLoading.value = true
  getCities({
    NetworkGroupId: networkGroup.value.id || null,
  })
    .then(response => {
      cities.value = response.data
    })
    .finally(() => {
      cityLoading.value = false
    })
}

const setCity = cityVal => {
  store.commit('moduleReadingFluencyOverview/city', cityVal)
  fetchOverview()
}

// schoolYear

const schoolYearLoading = ref(true)

const schoolYear = computed(() => store.getters['moduleReadingFluencyOverview/schoolYear'])

const schoolYears = ref([])

getSeries()
  .then(response => {
    schoolYears.value = response.data.data
  })
  .finally(() => {
    schoolYears.value.unshift({ id: null, name: 'Todos os anos' })
    schoolYearLoading.value = false
  })

const setSchoolYear = value => {
  store.commit('moduleReadingFluencyOverview/classes', {
    name: 'Todas as turmas',
    id: null,
  })
  store.commit('moduleReadingFluencyOverview/schoolYear', value)
  if (role !== 'NetworkManager') {
    fetchClasses()
  }
  fetchOverview()
}

// Turmas

const classes = computed(() => store.getters['moduleReadingFluencyOverview/classes'])
const classesLoading = ref(false)
const classesOptions = ref([])
const classesPage = ref(1)
const classesTotalpages = ref(1)

const setclasses = value => {
  classe.value = {
    ClassId: value.id,
    Name: value.name,
    SerieName: value.serieName,
  }
  store.commit('moduleReadingFluencyOverview/classes', value)
  fetchOverview()
}

const fetchClasses = async (ctx = {}) => {
  classesLoading.value = true

  const { page } = ctx
  classesPage.value = page || 1

  try {
    const { data } = await getClassesV2Label({
      InstitutionId: institution.value.id,
      SerieIds: [schoolYear.value.id],
      Page: classesPage.value,
    })

    const options = data.data

    if (classesPage.value === 1) {
      classesOptions.value = [{ name: 'Todas as turmas', id: null }]
    }

    classesOptions.value.push(...options)
    classesTotalpages.value = data.totalPages
    classesLoading.value = false
  } catch (error) {
    classesOptions.value = [{ name: 'Todas as turmas', id: null }]
  }
}

// Fetch
const fetchOverview = () => {
  if (role === 'NetworkManager') {
    store.dispatch('moduleReadingFluencyOverview/fetchNetwork')
    return
  }

  if (role === 'Teacher') {
    store.dispatch('moduleReadingFluencyOverview/fetchClasse')
    return
  }

  store.dispatch('moduleReadingFluencyOverview/fetchInstituion')
}

if (role === 'NetworkManager') {
  getNetworkGroups()
    .then(response => {
      networkGroups.value = response.data
    })
    .finally(() => {
      networkGroups.value.unshift({ id: null, name: 'Todos os grupos de escolas' })
      isLoading.value = false
    })
  fetchGetInstitutions()
  handleGetCities()
}

watch([classe], () => {
  if (role === 'Teacher') {
    store.commit('moduleReadingFluencyOverview/classes', {
      id: classe.value.ClassId,
    })
    fetchOverview()
  }
})

onMounted(() => {
  fetchOverview()
})

onUnmounted(() => {
  store.commit('moduleReadingFluencyOverview/classes', {
    id: null,
    name: 'Todas as turmas',
  })
})
</script>

<style lang="scss" scoped></style>