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
            multiple
            :loading="loadingNetworkGroups"
            :disabled="loadingNetworkGroups"
            @change="setNetworkGroup"
          >
            <template v-slot:allOptionsLabel>
              <span>Todos os grupos de escolas</span>
            </template>
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
            multiple
            :loading="institutionsLoading"
            :disabled="institutionsLoading"
            @change="setInstitution"
          >
            <template v-slot:allOptionsLabel>
              <span>Todas as escolas</span>
            </template>
          </ESelect>
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
            multiple
            :loading="schoolYearsLoading"
            :disabled="schoolYearsLoading"
            @change="setSchoolYear"
          >
            <template v-slot:allOptionsLabel>
              <span>Todos os anos</span>
            </template>
          </ESelect>
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getInstitutionsV2 } from '@/services/shared/institution/Institutions.Service.js'
import { getNetworkGroups } from '@/services/shared/network-groups/NetworkGroups.Service'
import { getWritingStagesSeriesLabel } from '@/services/shared/writing-stages/writing-stages.Service.js'
import useFilters from '@/store/filters/useFilters.js'
import { useWritingStagesInstitutions } from '@/views/pages/writing-phases/institutions/useWritingStagesInstitutions.js'
import { ref, onMounted } from 'vue'

const { networkGroup, institution, serie } = useFilters()
const { fetchCards } = useWritingStagesInstitutions()

networkGroup.value = []
institution.value = []

const loadingNetworkGroups = ref(true)
const networkGroups = ref([])

const fetchNetworkGroups = () => {
  getNetworkGroups()
    .then(response => {
      networkGroups.value = response.data || []
      fetchInstitutions()
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
}
const fetchInstitutions = () => {
  const params = {
    NetworkGroupsIds: networkGroup.value.map(item => item.id),
  }
  institutionsLoading.value = true

  getInstitutionsV2(params)
    .then(response => {
      const { data } = response
      if (!data.length) {
        institutions.value = []
        institution.value = []
        return
      }
      institutions.value = data
      setInstitution(institutions.value)
    })
    .catch(() => {
      institutions.value = []
      institution.value = []
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
  getWritingStagesSeriesLabel({
    NetworkGroupsIds: networkGroup.value.map(item => item.id),
    InstitutionsIds: institution.value.map(item => item.id),
  })
    .then(response => {
      schoolYears.value = response.data
      setSchoolYear(schoolYears.value)
    })
    .finally(() => {
      schoolYearsLoading.value = false
    })
}

const setSchoolYear = value => {
  serie.value = value
  fetchCards()
}

onMounted(() => {
  fetchNetworkGroups()
})
</script>

<style lang="scss" scoped></style>