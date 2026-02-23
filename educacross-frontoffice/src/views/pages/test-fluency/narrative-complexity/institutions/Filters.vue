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
            :loading="loadingNetworkGroups"
            :disabled="loadingNetworkGroups"
            @input="setNetworkGroup"
          >
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" md>
        <b-form-group label="Escola" label-for="institutions">
          <ESelect
            id="institutions"
            label="name"
            :value="institution"
            :options="institutions"
            :clearable="false"
            :loading="institutionsLoading"
            :disabled="institutionsLoading"
            @input="setInstitution"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" md>
        <b-form-group label="Ano Escolar" label-for="schoolYear">
          <ESelect
            id="schoolYear"
            label="name"
            :value="serie"
            :options="schoolYears"
            :clearable="false"
            :loading="schoolYearsLoading"
            :disabled="schoolYearsLoading"
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
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getInstitutions } from '@/services/shared/institution/Institutions.Service.js'
import { getNetworkGroups } from '@/services/shared/network-groups/NetworkGroups.Service'
import { getSeries } from '@/services/shared/serie/Serie.Service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import { ref, computed, getCurrentInstance, onMounted, watch } from 'vue'

const vm = getCurrentInstance().proxy

const { networkGroup, institution, serie } = useFilters()

const loadingNetworkGroups = ref(true)
const networkGroups = ref([])

const fetchNetworkGroups = () => {
  getNetworkGroups()
    .then(response => {
      networkGroups.value = response.data || []
      networkGroups.value.unshift({ id: null, name: 'Todos os grupos de Escolas' })
      setNetworkGroup(networkGroups.value[0])
    })
    .finally(() => {
      loadingNetworkGroups.value = false
    })
}

const setNetworkGroup = value => {
  networkGroup.value = value
  fetchInstitutions()
}

// institutions
const institutions = ref([])
const institutionsLoading = ref(true)

const setInstitution = value => {
  institution.value = value
  fetchSchoolYear()
  fetch()
}
const fetchInstitutions = () => {
  const params = {
    NetworkGroupId: networkGroup.value.id,
  }
  institutionsLoading.value = true

  getInstitutions(params)
    .then(response => {
      const { data } = response
      if (!data.length) {
        institutions.value = []
        institution.value = null
        schoolYears.value = []
        serie.value = {}
        return
      }
      institutions.value = [{ id: null, name: 'Todas as escolas' }, ...data]
      setInstitution(institutions.value[0])
    })
    .catch(() => {
      institutions.value = []
      institution.value = null
      schoolYears.value = []
      serie.value = {}
    })
    .finally(() => {
      institutionsLoading.value = false
    })
}

// schoolYear

serie.value = { id: null, name: 'Todos os anos' }

const schoolYears = ref([])
const schoolYearsLoading = ref(true)

const fetchSchoolYear = async () => {
  getSeries()
    .then(response => {
      schoolYears.value = response.data.data
    })
    .finally(() => {
      schoolYears.value.unshift({ id: null, name: 'Todos os anos' })
      schoolYearsLoading.value = false
    })
}

const setSchoolYear = value => {
  serie.value = value
  fetch()
}

// Fetch
const fetch = () => {
  store.dispatch('narrativeComplexityInstitutions/fetchCards')
}

onMounted(() => {
  fetchNetworkGroups()
  fetchSchoolYear()
})

const applyId = computed(() => store.getters['narrativeComplexityInstitutions/applyId'])

watch(applyId, () => {
  if (!applyId.value) return
  store.commit('narrativeComplexityInstitutions/resetParams')
  vm.$bus.emit('resetPage')
  store.dispatch('narrativeComplexityInstitutions/fetch')
})

</script>

<style lang="scss" scoped></style>