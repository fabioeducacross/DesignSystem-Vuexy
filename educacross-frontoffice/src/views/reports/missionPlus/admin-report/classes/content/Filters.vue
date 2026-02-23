<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="auto">
        <SelectSubject />
      </b-col>
      <b-col v-if="!exhibition" cols="12" md>
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

      <b-col cols="12" md>
        <b-form-group :label="$t('Turmas')" label-for="classes">
          <ESelect
            id="classes"
            label="name"
            :value="classe"
            :options="classes"
            :clearable="false"
            :loading="classesLoading"
            :disabled="classesLoading"
            :page="classesPage"
            :total-pages="classesTotalpages"
            paginated
            @input="setclasses"
            @nextPage="fetchClasses"
          >
            <template v-slot:no-options> {{ $t('classesNotFound') }} </template>
          </ESelect>
        </b-form-group>
      </b-col>

      <b-col>
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
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import router from '@/router'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import { getEducationalOrganizationsLabel } from '@/services/shared/educationalOrganization/EducationalOrganization.service.js'
import { getSeries } from '@/services/shared/serie/Serie.Service.js'
import { getTopics } from '@/services/shared/topics/topics.service.js'
import { getKnowledgeaxesFilterOptions } from '@/services/teacher-context/knowledgeaxes/Knowledgeaxes.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import { getMonthList } from '@/utils/date'
import { useReportMissionPlusContent } from '@/views/reports/missionPlus/admin-report/classes/content/useReportMissionPlusContent.js'
import { ref, computed, watch } from 'vue'

const {
  resetAndfetch,
  exhibition,
  knowledgeAxe,
  loading,
  educationalOrganization,
} = useReportMissionPlusContent()

const { serie, period, classe, subject, institution } = useFilters()

const schoolYears = ref([])
const schoolYearsLoading = ref(true)
const schoolYearPage = ref(1)
const schoolYearTotalpages = ref(1)
serie.value = { id: null, name: '' }

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

const setSchoolYear = async value => {
  serie.value = value
  await fetchClasses()
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

// Turma

const { classId } = router.currentRoute.params
const firstLoadingClasses = ref(!!classId)

classe.value = classId ? { id: classId } : { name: 'Todas as turmas', id: null }

const classesLoading = ref(true)
const classes = ref([])
const classesPage = ref(1)
const classesTotalpages = ref(1)

const setclasses = value => {
  classe.value = value
  resetAndfetch()
}

const setNoClasses = () => {
  classes.value = []
  classe.value = null
  resetAndfetch()
}

const fetchClasses = async (ctx = {}) => {
  classesLoading.value = true

  const { page } = ctx
  classesPage.value = page || 1

  if (!subject.value.id) return
  try {
    const { data } = await getClassesV2Label({
      InstitutionId: institution.value?.id,
      SerieIds: serie.value.id ? [serie.value.id] : null,
      Page: classesPage.value,
      SubjectId: subject.value.id,
    })

    const options = data.data

    if (classesPage.value === 1) {
      if (!options.length) {
        classesLoading.value = false
        setNoClasses()
        return
      }
      if (!firstLoadingClasses.value) {
        classe.value = { name: 'Todas as turmas', id: null }
        firstLoadingClasses.value = false
      }
      classes.value = [{ name: 'Todas as turmas', id: null }]
    }

    classes.value.push(...options)
    classesTotalpages.value = data.totalPages
    classesLoading.value = false
  } catch (error) {
    setNoClasses()
  }
}

// educationalOrganization

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

// Tematica

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

// Periodo

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

// Watches

const subjectId = computed(() => subject.value.id)

watch(exhibition, () => {
  loading.value = true
  if (exhibition.value) {
    serie.value = { id: null, name: '' }
    schoolYears.value = []
    fetchKnowledgeaxes()
    fetchClasses()
    resetAndfetch()
  }
})

watch(subjectId, () => {
  loading.value = true
  if (exhibition.value) {
    fetchKnowledgeaxes()
    fetchClasses()
    resetAndfetch()
  } else {
    fetchSchoolYear()
  }
})

if (subjectId.value && exhibition.value) {
  fetchKnowledgeaxes()
  resetAndfetch()
}

</script>

<style lang="scss" scoped></style>