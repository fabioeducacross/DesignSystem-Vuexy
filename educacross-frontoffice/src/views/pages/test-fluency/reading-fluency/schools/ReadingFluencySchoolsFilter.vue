<template>
  <b-card>
    <b-row>
      <b-col cols="12" md>
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

      <b-col cols="12" md>
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
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { getInstitutions } from '@/services/shared/institution/Institutions.Service'
import { getNetworkGroups } from '@/services/shared/network-groups/NetworkGroups.Service'
import { getSeries } from '@/services/shared/serie/Serie.Service.js'
import store from '@/store'
import { ref, computed, getCurrentInstance, onMounted } from 'vue'

const vm = getCurrentInstance().proxy

const isLoading = ref(true)

const networkGroup = computed(() => store.getters['moduleReadingFluencySchools/networkGroup'])

const networkGroups = ref([])

const setNetworkGroup = networkGroup => {
  store.commit('moduleReadingFluencySchools/institution', {
    name: 'Todas as escolas',
    id: null,
  })
  store.commit('moduleReadingFluencySchools/networkGroup', networkGroup)
  fetchGetInstitutions()
  fetchOverview()
}

const institutionLoading = ref(true)

const institution = computed(() => store.getters['moduleReadingFluencySchools/institution'])

const institutions = ref([])

const setInstitution = institution => {
  store.commit('moduleReadingFluencySchools/institution', institution)
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

const schoolYearLoading = ref(true)

const schoolYear = computed(() => store.getters['moduleReadingFluencySchools/schoolYear'])

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
  store.commit('moduleReadingFluencySchools/schoolYear', value)
  fetchOverview()
}

const fetchOverview = () => {
  store.commit('moduleReadingFluencySchools/reset')
  vm.$bus.emit('resetPage')
  store.dispatch('moduleReadingFluencySchools/fetchNetwork')
  store.dispatch('moduleReadingFluencySchools/fetchNetworkCards')
}

getNetworkGroups()
  .then(response => {
    networkGroups.value = response.data
  })
  .finally(() => {
    networkGroups.value.unshift({ id: null, name: 'Todos os grupos de escolas' })
    isLoading.value = false
  })
fetchGetInstitutions()

onMounted(() => {
  fetchOverview()
})

</script>

<style lang="scss" scoped></style>