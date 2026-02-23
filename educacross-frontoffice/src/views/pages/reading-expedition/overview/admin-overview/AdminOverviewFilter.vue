<template>
  <b-card>
    <b-row>
      <b-col v-if="$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)" cols="12" md>
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
      <b-col v-if="$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)" cols="12" md>
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
        <b-form-group :label="$t('schoolYear')" label-for="schoolYear">
          <ESelect
            id="schoolYear"
            label="name"
            :value="serie"
            :options="schoolYearOptions"
            :clearable="false"
            :loading="schoolYearLoading"
            :disabled="schoolYearLoading"
            placeholder="selectOneSchoolYearLabel"
            @input="setSchoolYear"
          >
            <template v-slot:no-options> {{ $t('schoolYearNotFound') }} </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col v-if="!$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)" cols="12" md>
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
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { SubjectEnum } from '@/consts/teacher-context/enums/subjectEnum.js'
import ability from '@/libs/acl/ability'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import { getInstitutions } from '@/services/shared/institution/Institutions.Service.js'
import { getNetworkGroups } from '@/services/shared/network-groups/NetworkGroups.Service'
import { getReadingExpeditionSeries } from '@/services/shared/reading-expedition/reading-expedition.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { ref } from 'vue'

const { networkGroup, institution, classe, serie } = useFilters()

serie.value = { id: null, name: 'Todos os anos escolares' }

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
        schoolYearOptions.value = []
        setSchoolYear(null)
        return
      }
      institutions.value = [{ id: null, name: 'Todas as escolas' }, ...data]
      setInstitution(institutions.value[0])
    })
    .catch(() => {
      institutions.value = []
      institution.value = null
      schoolYearOptions.value = []
      setSchoolYear(null)
    })
    .finally(() => {
      institutionsLoading.value = false
    })
}

// ano escolar
serie.value = {}
const schoolYearLoading = ref(true)
const schoolYearOptions = ref([])

const setSchoolYear = value => {
  serie.value = value
  if (!ability.can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)) {
    fetchClasses({ fetch: true })
  } else {
    store.dispatch('readingExpeditionModuleOverviewAdmin/fetch')
  }
}

const fetchSchoolYear = async () => {
  schoolYearLoading.value = true

  try {
    const { data } = await getReadingExpeditionSeries({
      NetworkGroupId: networkGroup.value?.id,
      InstitutionId: institution.value?.id,
    })

    const options = data

    schoolYearOptions.value = options

    if (options.length) {
      schoolYearOptions.value.unshift({ id: null, name: 'Todos os anos escolares' })
      setSchoolYear(options[0])
    } else {
      schoolYearOptions.value = []
      serie.value = {}
      setNoClasses()
    }
  } catch (error) {
    schoolYearOptions.value = []
    setNoClasses(true)
  }

  schoolYearLoading.value = false
}

const setNoClasses = () => {
  classes.value = []
  classe.value = null
  store.dispatch('readingExpeditionModuleOverviewAdmin/fetch')
}

// Turma

classe.value = { name: 'Todas as turmas', id: null }
const classesLoading = ref(false)
const classes = ref([])
const classesPage = ref(1)
const classesTotalpages = ref(1)

const setclasses = value => {
  classe.value = value
  store.dispatch('readingExpeditionModuleOverviewAdmin/fetch')
}

const fetchClasses = async (ctx = {}) => {
  classesLoading.value = true

  const { page } = ctx
  classesPage.value = page || 1

  if (!schoolYearOptions.value.length) {
    classes.value = []
    classe.value = null
    return
  }

  try {
    const { data } = await getClassesV2Label({
      InstitutionId: institution.value.id,
      SerieIds: serie.value.id ? [serie.value.id] : schoolYearOptions.value.map(s => s.id),
      Page: classesPage.value,
      SubjectId: SubjectEnum.portuguese,
    })

    const options = data.data

    if (classesPage.value === 1) {
      if (!options.length) {
        classesLoading.value = false
        setNoClasses()
        return
      }
      setclasses({ name: 'Todas as turmas', id: null })
      classes.value = [{ name: 'Todas as turmas', id: null }]
    }

    classes.value.push(...options)
    classesTotalpages.value = data.totalPages
    classesLoading.value = false
  } catch (error) {
    setNoClasses()
  }
}

if (ability.can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)) {
  fetchNetworkGroups()
} else {
  fetchSchoolYear()
}
</script>

<style lang="scss" scoped></style>
