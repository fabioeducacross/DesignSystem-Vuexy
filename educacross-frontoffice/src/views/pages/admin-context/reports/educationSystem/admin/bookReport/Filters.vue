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

      <b-col cols="12" md>
        <b-form-group :label="$t('Turma')" label-for="classes">
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
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import { getEducationalOrganizationsLabel } from '@/services/shared/educationalOrganization/EducationalOrganization.service.js'
import { getKnowledgeaxesFilterOptions } from '@/services/teacher-context/knowledgeaxes/Knowledgeaxes.service.js'
import useFilters from '@/store/filters/useFilters.js'
import { useEducationSystemBookReport } from '@/views/pages/admin-context/reports/educationSystem/admin/bookReport/useEducationSystemBookReport.js'
import { ref, getCurrentInstance, watch } from 'vue'

const vm = getCurrentInstance().proxy

const {
  resetAndfetch,
  exhibition,
  knowledgeAxe,
  educationalOrganization,
  serieId,
  subjectId,
  bookName,
  educationSystemName,
  fetchDetails,
} = useEducationSystemBookReport()

const { classe, subject } = useFilters()

const loadingEducationalOrganization = ref(true)
const educationalOrganizations = ref([])

const setSelectedEducationalOrganization = value => {
  educationalOrganization.value = value
  fetchKnowledgeaxes()
}

const fetchEducationalOrganizations = async () => {
  loadingEducationalOrganization.value = true
  getEducationalOrganizationsLabel(serieId.value, subjectId.value).then(({ data }) => {
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

  getKnowledgeaxesFilterOptions({
    educationalOrganizationId: educationalOrganization.value.id,
  }).then(({ data }) => {
    knowledgeAxes.value = [{ id: null, name: 'Todas as temáticas' }, ...data]
    setKnowledgeaxes(knowledgeAxes.value[0])
    knowledgeAxesLoading.value = false
  })
}

const classesLoading = ref(true)
const classes = ref([])
const classesPage = ref(1)
const classesTotalpages = ref(1)

const setclasses = value => {
  classe.value = value
  resetAndfetch()
}

const fetchClasses = async (ctx = {}) => {
  classesLoading.value = true

  const { page } = ctx
  classesPage.value = page || 1

  if (!subject.value.id || !serieId.value) return
  try {
    const { data } = await getClassesV2Label({
      Page: classesPage.value,
      SubjectId: subject.value.id,
      SerieIds: [serieId.value],
    })

    const options = data.data

    if (classesPage.value === 1) {
      classes.value = []
      classe.value = options[0]
    }

    classes.value.push(...options)
    classesTotalpages.value = data.totalPages
    classesLoading.value = false
  } catch (error) {
    classes.value = []
  }
}

watch(serieId, () => {
  fetchClasses().then(() => {
    fetchEducationalOrganizations()
  })

  vm.$bus.emit('replaceBreadcrumb', [
    {
      text: 'Sistema de Ensino',
      to: { name: 'reportsEducationSystemList' },
    },
    {
      text: educationSystemName.value,
      to: { name: 'educationSystemReportMissionsBooks' },
    },
    {
      text: bookName.value,
      active: true,
    },
  ])
})

fetchDetails()

</script>

<style lang="scss" scoped></style>