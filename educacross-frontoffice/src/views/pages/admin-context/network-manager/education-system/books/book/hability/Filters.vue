<template>
  <b-card>
    <b-row>
      <b-col v-if="!exhibition" cols="12" md>
        <b-form-group :label="$t('educationalOrganization')" label-for="educationalOrganization">
          <ESelect
            id="educationalOrganization"
            label="name"
            :value="educationalOrganization"
            :options="educationalOrganizations"
            :clearable="false"
            :loading="loadingEducationalOrganization"
            :disabled="loadingEducationalOrganization"
            @input="setSelectedEducationalOrganization"
          >
          </ESelect>
        </b-form-group>
      </b-col>

      <b-col cols="12" md>
        <b-form-group :label="$t('Temática')" label-for="knowledgeAxes">
          <ESelect
            id="knowledgeAxes"
            label="name"
            :value="knowledgeAxe"
            :options="knowledgeAxes"
            :clearable="false"
            :loading="knowledgeAxesLoading"
            :disabled="knowledgeAxesLoading"
            @input="setKnowledgeaxes"
          >
          </ESelect>
        </b-form-group>
      </b-col>

      <b-col v-if="showGroups(groupOptions)" cols="12" md>
        <b-form-group label="Grupo de Escolas" label-for="schoolGroup">
          <ESelect
            id="schoolGroup"
            v-model="group"
            :options="groupOptions"
            :loading="groupLoading"
            @change="setGroup"
          />
        </b-form-group>
      </b-col>

      <b-col cols="12" md>
        <b-form-group label="Escola" label-for="school">
          <ESelect
            id="school"
            v-model="school"
            :options="schoolOptions"
            :loading="schoolLoading"
            @change="resetAndfetch"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getNetworkGroups } from '@/services/network-manager-context/NetworkGroup.Service'
import { getEducationSystemInstitutionsLabel } from '@/services/shared/educationSystem/EducationSystem.Service'
import { getEducationalOrganizationsLabel } from '@/services/shared/educationalOrganization/EducationalOrganization.service.js'
import { getKnowledgeaxesFilterOptions } from '@/services/teacher-context/knowledgeaxes/Knowledgeaxes.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import { useEducationSystemBookReportNetworkManager } from '@/views/pages/admin-context/network-manager/education-system/books/book/hability/useEducationSystemBookReportNetwork.js'
import { ref, watch, getCurrentInstance } from 'vue'

const vm = getCurrentInstance().proxy

const {
  resetAndfetch,
  exhibition,
  knowledgeAxe,
  educationalOrganization,
  serieId,
  subjectId,
  group,
  school,
  fetchDetails,
  bookName,
  educationSystemName,
} = useEducationSystemBookReportNetworkManager()

const { educationSystemId } = useFilters()
const knowledgeAxesDefaultOption = { id: null, name: 'Todas as temáticas' }
const groupFirstOption = { name: 'Todos os grupos de escolas', id: null }
const schoolFirstoption = { name: 'Todas as escolas', id: null }

const loadingEducationalOrganization = ref(true)
const educationalOrganizations = ref([])

const setSelectedEducationalOrganization = value => {
  educationalOrganization.value = value
  fetchKnowledgeaxes()

  knowledgeAxe.value = knowledgeAxesDefaultOption
  resetAndfetch()
}

const fetchEducationalOrganizations = async () => {
  loadingEducationalOrganization.value = true
  getEducationalOrganizationsLabel(serieId.value, subjectId.value).then(({ data }) => {
    educationalOrganizations.value = data
    educationalOrganization.value = data[0]
    loadingEducationalOrganization.value = false
    fetchKnowledgeaxes()
    resetAndfetch()
  })
}

const showGroups = groupList => {
  return groupList.filter(cs => cs.id).length > 1
}

// Tematica

const knowledgeAxesLoading = ref(true)
const knowledgeAxes = ref([])

const setKnowledgeaxes = value => {
  knowledgeAxe.value = value
  resetAndfetch()
}

const fetchKnowledgeaxes = () => {
  knowledgeAxesLoading.value = true

  getKnowledgeaxesFilterOptions({
    educationalOrganizationId: educationalOrganization.value.id,
  }).then(({ data }) => {
    knowledgeAxes.value = [knowledgeAxesDefaultOption, ...data]
    knowledgeAxe.value = knowledgeAxes.value[0]
    knowledgeAxesLoading.value = false
  })
}

const groupOptions = ref([])
group.value = groupFirstOption
const groupLoading = ref(true)

const fetchGroups = async () => {
  groupLoading.value = true
  const response = await getNetworkGroups()

  if (response.status === 200) {
    groupOptions.value = [groupFirstOption, ...response.data]
  } else {
    groupOptions.value = []
  }

  group.value = groupFirstOption
  groupLoading.value = false

  fetchSchools()
}

const setGroup = () => {
  fetchSchools()
  school.value = schoolFirstoption
  resetAndfetch()
}

school.value = schoolFirstoption
const schoolLoading = ref(true)
const schoolOptions = ref([])

const fetchSchools = async () => {
  schoolLoading.value = true

  const response = await getEducationSystemInstitutionsLabel({
    SubjectId: subjectId.value,
    SerieId: serieId.value,
    EducationSystemId: educationSystemId.value,
    NetworkGroupId: group.value.id,
  })

  if (response.status === 200) {
    schoolOptions.value = [schoolFirstoption, ...response.data]
  } else {
    schoolOptions.value = [schoolFirstoption]
  }

  school.value = schoolFirstoption

  schoolLoading.value = false
}

watch(serieId, () => {
  vm.$bus.emit('replaceBreadcrumb', [
    {
      text: 'Sistema de Ensino',
      to: { name: 'educationSystemNetworkList' },
    },
    {
      text: `${educationSystemName.value}`,
      to: { name: 'networkManagerEducationSystemBooks' },
    },
    {
      text: `${bookName.value}`,
      active: true,
    },
  ])

  vm.$bus.emit('setTabTitle', store.state.access.userData.InstitutionName)

  fetchEducationalOrganizations()
  fetchGroups()
})

fetchDetails()
</script>

<style lang="scss" scoped></style>