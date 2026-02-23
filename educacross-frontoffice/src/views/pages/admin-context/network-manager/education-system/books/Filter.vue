<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import { getNetworkGroups } from '@/services/network-manager-context/NetworkGroup.Service'
import {
  getEducationSystemInstitutionsLabel,
  getEducationSystemSeriesLabel,
} from '@/services/shared/educationSystem/EducationSystem.Service'
import useFilters from '@/store/filters/useFilters'
import { ref, watch } from 'vue'

const emit = defineEmits(['filters'])

const { subject, institution, isAdmin } = useFilters()

const educationSystemId = router.currentRoute.params.educationSystemId

const yearFirstOption = { name: 'Todos os anos escolares', id: null }
const groupFirstOption = { name: 'Todos os grupos de escolas', id: null }
const institutionFirstOption = { name: 'Todas as escolas', id: null }

const loadingYears = ref(false)
const yearsOptions = ref([])
const selectedYear = ref(yearFirstOption)

const onlyInProgress = ref(false)

const loadingGroups = ref(true)
const groupsOptions = ref([])
const selectedGroup = ref(groupFirstOption)

const loadingInstitutions = ref(true)
const institutionsOptions = ref([])
const selectedInstitution = ref(institutionFirstOption)

const changeSerie = () => {
  selectedInstitution.value = institutionFirstOption
  fetchInstitutions()
  emitFilter()
}

const getSeries = () => {
  loadingYears.value = true
  getEducationSystemSeriesLabel(educationSystemId, {
    InstitutionId: institution.value.id,
    SubjectId: subject.value.id,
  })
    .then(({ data }) => {
      yearsOptions.value = data
      yearsOptions.value.unshift(yearFirstOption)
    })
    .finally(() => {
      loadingYears.value = false
      fetchGroups()
    })
}

const fetchGroups = async () => {
  loadingGroups.value = true
  const response = await getNetworkGroups()

  if (response.status === 200) {
    groupsOptions.value = [groupFirstOption, ...response.data]
  } else {
    groupsOptions.value = []
  }

  selectedGroup.value = groupFirstOption
  loadingGroups.value = false

  fetchInstitutions()
}

const changeGroup = () => {
  fetchInstitutions()
  emitFilter()
}

const showGroups = group => {
  return group.filter(cs => cs.id).length > 1
}

const fetchInstitutions = async () => {
  loadingInstitutions.value = true

  const response = await getEducationSystemInstitutionsLabel({
    SubjectId: subject.value.id,
    SerieId: selectedYear.value.id,
    NetworkGroupId: selectedGroup.value.id,
    EducationSystemId: educationSystemId,
  })

  if (response.status === 200) {
    institutionsOptions.value = [institutionFirstOption, ...response.data]
  } else {
    institutionsOptions.value = []
  }
  selectedInstitution.value = institutionFirstOption
  loadingInstitutions.value = false
}

const emitFilter = () => {
  emit('filters', {
    SerieId: selectedYear.value.id,
    InstitutionId: selectedInstitution.value.id,
    NetworkGroupId: selectedGroup.value.id,
    OnlyInProgress: onlyInProgress.value,
  })
}

if (isAdmin.value) {
  watch(subject, () => {
    getSeries()
  })
}
if (subject.value.id) {
  getSeries()
}
</script>

<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="auto">
        <SelectSubject :fetch-on-mounted="false" />
      </b-col>
      <b-col cols="12" md>
        <b-form-group label="Ano Escolar" label-for="school-year">
          <ESelect
            id="school-year"
            v-model="selectedYear"
            :options="yearsOptions"
            :clearable="false"
            :searchable="false"
            :loading="loadingYears"
            :disabled="loadingYears"
            responsive
            @change="changeSerie"
          />
        </b-form-group>
      </b-col>
      <b-col v-if="showGroups(groupsOptions)" cols="12" md>
        <b-form-group label="Grupo de Escolas" label-for="groups">
          <ESelect
            id="groups"
            v-model="selectedGroup"
            :options="groupsOptions"
            :loading="loadingGroups"
            @change="changeGroup"
          >
            <template v-slot:no-options> Nenhum grupo encontrado</template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" md>
        <b-form-group label="Escola" label-for="school">
          <ESelect
            id="school"
            v-model="selectedInstitution"
            :options="institutionsOptions"
            :loading="loadingInstitutions"
            @change="emitFilter"
          >
            <template v-slot:no-options> Nenhuma escola encontrada</template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" class="d-flex justify-content-end">
        <b-form-checkbox
          v-model="onlyInProgress"
          switch
          inline
          button-variant="primary"
          @change="emitFilter"
        >
          Exibir somente dados de missão em andamento.
        </b-form-checkbox>
      </b-col>
    </b-row>
  </b-card>
</template>