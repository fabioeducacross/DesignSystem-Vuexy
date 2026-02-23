<template>
  <b-card>
    <b-row>
      <b-col cols="12" :lg="exhibition ? 'auto' : 12">
        <b-row>
          <b-col cols="12" :lg="exhibition ? '' : 4">
            <b-row>
              <b-col cols="auto">
                <SelectSubject />
              </b-col>

              <b-col v-if="!exhibition">
                <b-form-group label="Ano Escolar" label-for="schoolYear">
                  <ESelect
                    :disabled="schoolYearsLoading"
                    :value="serie"
                    :options="schoolYears"
                    :page="schoolYearPage"
                    :total-pages="schoolYearTotalpages"
                    :loading="schoolYearsLoading"
                    name="schoolYear"
                    paginated
                    placeholder="selectOneSchoolYearLabel"
                    label="name"
                    @nextPage="fetchSchoolYear"
                    @input="setSchoolYear"
                  >
                    <template v-slot:no-options> {{ $t('schoolYearNotFound') }} </template>
                  </ESelect>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>

          <b-col v-if="!exhibition" cols="12" lg="4">
            <b-form-group
              :label="$t('educationalOrganization')"
              label-for="educationalOrganization"
            >
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

          <b-col v-if="!exhibition" cols="12" lg="4">
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
        </b-row>
      </b-col>
      <b-col cols="12" :lg="exhibition ? '' : 12">
        <b-row>
          <b-col v-if="exhibition" cols="12" lg>
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
          <b-col cols="12" lg>
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
          <b-col cols="12" lg>
            <b-form-group label="Escola" label-for="institutions">
              <ESelect
                id="institution"
                label="name"
                :value="institution"
                :options="institutions"
                :clearable="false"
                :loading="institutionLoading"
                :disabled="institutionLoading"
                @input="setInstitution"
              />
            </b-form-group>
          </b-col>

          <b-col cols="12" lg>
            <b-form-group label="Período" label-for="month">
              <ESelect
                id="month"
                label="name"
                :value="period"
                :options="months"
                :clearable="false"
                @input="setMonth"
              >
              </ESelect>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import { getEducationalOrganizationsLabel } from '@/services/shared/educationalOrganization/EducationalOrganization.service.js'
import { getInstitutions } from '@/services/shared/institution/Institutions.Service.js'
import { getNetworkGroups } from '@/services/shared/network-groups/NetworkGroups.Service'
import { getSeries } from '@/services/shared/serie/Serie.Service.js'
import { getTopics } from '@/services/shared/topics/topics.service.js'
import { getKnowledgeaxesFilterOptions } from '@/services/teacher-context/knowledgeaxes/Knowledgeaxes.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import { getMonthList } from '@/utils/date'
import { useReportMissionPlusContent } from '@/views/reports/missionPlus/admin-report/institutions/content/useReportMissionPlusContent.js'
import { ref, computed, watch } from 'vue'

const {
  resetAndfetch,
  exhibition,
  knowledgeAxe,
  loading,
  educationalOrganization,
} = useReportMissionPlusContent()

const {
  serie,
  period,
  subject,
  institution,
  networkGroup,
} = useFilters()

const loadingNetworkGroups = ref(true)
const networkGroups = ref([])

const fetchNetworkGroups = () => {
  getNetworkGroups()
    .then(response => {
      networkGroups.value = response.data || []
      networkGroups.value.unshift({ id: null, name: 'Todos os grupos de Escolas' })
      networkGroup.value = networkGroups.value[0]
    })
    .finally(() => {
      loadingNetworkGroups.value = false
    })
}

const setNetworkGroup = value => {
  networkGroup.value = value
  institution.value = { id: null, name: 'Todas as escolas' }
  fetchInstitutions()
  resetAndfetch()
}

const schoolYears = ref([])
const schoolYearsLoading = ref(true)
const schoolYearPage = ref(1)
const schoolYearTotalpages = ref(1)

watch(exhibition, () => {
  loading.value = true
  if (exhibition.value) {
    serie.value = { id: null, name: '' }
    schoolYears.value = []
    fetchKnowledgeaxes()
    resetAndfetch()
  }
})

const subjectId = computed(() => subject.value.id)

watch(subjectId, () => {
  loading.value = true
  if (exhibition.value) {
    fetchKnowledgeaxes()
    resetAndfetch()
  } else {
    fetchSchoolYear()
  }
})

const institutions = ref([])
const institutionLoading = ref(true)

const setInstitution = value => {
  institution.value = value
  resetAndfetch()
}

const fetchInstitutions = () => {
  const params = {
    NetworkGroupId: networkGroup.value.id,
  }
  institutionLoading.value = true
  institution.value = { id: null, name: 'Todas as escolas' }

  return getInstitutions(params)
    .then(response => {
      const { data } = response
      if (!data.length) {
        institutions.value = []
        return
      }
      institutions.value = [{ id: null, name: 'Todas as escolas' }, ...data]
      institution.value = institutions.value[0]
    })
    .catch(() => {
      institutions.value = []
    })
    .finally(() => {
      institutionLoading.value = false
    })
}

const fetchSchoolYear = async (ctx = {}) => {
  schoolYearsLoading.value = true

  const { page } = ctx
  schoolYearPage.value = page || 1

  try {
    const { data } = await getSeries({
      Page: schoolYearPage.value,
      Subjects: [subject.value.id],
    })

    const options = data.data

    if (schoolYearPage.value === 1 && !options.length) {
      setNoSerie(true)
      schoolYearsLoading.value = false
      return
    }

    if (schoolYearPage.value === 1) {
      schoolYears.value = []
      setSchoolYear(options[0])
    }

    schoolYears.value.push(...options)
    schoolYearTotalpages.value = data.totalPages
  } catch (error) {
    setNoSerie(true)
  }

  schoolYearsLoading.value = false
}

const setSchoolYear = value => {
  serie.value = value
  fetchEducationalOrganizations()
}

const setNoSerie = noSchoolYear => {
  if (noSchoolYear) {
    schoolYears.value = [
      {
        id: false,
        name: 'Nenhum ano escolar encontrado',
      },
    ]

    serie.value = schoolYears.value[0]
    store.commit('moduleMissionsPlusReportAdminClassesOverview/loading', false)
    store.commit('moduleMissionsPlusReportAdminClassesOverview/cards', {})
    store.commit('moduleMissionsPlusReportAdminClassesOverview/data', [])
    store.commit('moduleMissionsPlusReportAdminClassesOverview/total', [])
  }
}

const loadingEducationalOrganization = ref(false)
const educationalOrganizations = ref([])

const setSelectedEducationalOrganization = value => {
  educationalOrganization.value = value
  fetchKnowledgeaxes()
}

const fetchEducationalOrganizations = async () => {
  loadingEducationalOrganization.value = true
  getEducationalOrganizationsLabel(serie.value.id, subject.value.id).then(({ data }) => {
    educationalOrganizations.value = data
    educationalOrganization.value = data[0]
    loadingEducationalOrganization.value = false
    fetchKnowledgeaxes()
  })
}

const knowledgeAxesLoading = ref(true)
const knowledgeAxes = ref([])

const setKnowledgeaxes = value => {
  knowledgeAxe.value = value
  resetAndfetch()
}

const fetchKnowledgeaxes = () => {
  knowledgeAxesLoading.value = true
  if (exhibition.value) {
    knowledgeAxe.value = { id: null, name: 'Todas as temáticas' }
    getTopics({
      SubjectId: subject.value.id,
    }).then(({ data }) => {
      knowledgeAxes.value = [{ id: null, name: 'Todas as temáticas' }, ...data]
      knowledgeAxesLoading.value = false
    })
  } else {
    getKnowledgeaxesFilterOptions({
      educationalOrganizationId: educationalOrganization.value.id,
    }).then(({ data }) => {
      knowledgeAxes.value = data
      setKnowledgeaxes(knowledgeAxes.value[0])
      knowledgeAxesLoading.value = false
    })
  }
}

period.value = { id: null, name: 'Todo o período' }

const months = computed(() => {
  return [
    {
      id: null,
      name: 'Todo o período',
    },
    ...getMonthList(),
  ]
})

const setMonth = month => {
  period.value = month
  resetAndfetch()
}

if (subjectId.value) {
  serie.value = { id: null, name: '' }
  fetchKnowledgeaxes()
  resetAndfetch()
}

const { institutionId } = router.currentRoute.params

institution.value = { id: institutionId, name: '' }

fetchNetworkGroups()
fetchInstitutions().then(() => {
  if (institutionId) {
    const id = parseInt(institutionId)
    institution.value = institutions.value.find(inst => inst.id === id)
  }
})
</script>

<style lang="scss" scoped></style>