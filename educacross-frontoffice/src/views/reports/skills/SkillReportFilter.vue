<template>
  <b-card>
    <b-row class="match-height flex-no-wrap">
      <b-col cols="12" md="auto">
        <SelectSubject />
      </b-col>

      <b-col v-if="$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)" cols>
        <b-form-group label-for="networkGroup" label="Grupo de Escolas">
          <ESelect
            id="networkGroup"
            label="name"
            :value="selectedNetworkGroup"
            :options="networkGroupsFilterOptions"
            :clearable="false"
            :disabled="loadingNetworkGrupos"
            :loading="loadingNetworkGrupos"
            @input="setSelectedNetworkGroup"
          >
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col v-if="$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)" cols="12" md>
        <b-form-group label-for="school" label="Escola">
          <ESelect
            id="schools"
            label="name"
            :value="selectedSchool"
            :options="schoolsFilterOptions"
            :clearable="false"
            :disabled="loadingSchools"
            :loading="loadingSchools"
            @input="setSelectedSchool"
          >
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" md>
        <b-form-group label-for="educationalOrganization" label="Matriz/Currículo">
          <ESelect
            id="educationalOrganization"
            label="name"
            :value="selectedEducationalOrganization"
            :options="educationalOrganizationOptions"
            :clearable="false"
            :disabled="loadingEducationalOrganization"
            :loading="loadingEducationalOrganization"
            @input="setSelectedEducationalOrganization"
          >
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col v-if="$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)" cols="12" md>
        <b-form-group label-for="schoolYear" label="Ano escolar">
          <ESelect
            id="schoolYear"
            label="name"
            :value="selectedSerie"
            :options="series"
            :clearable="false"
            :disabled="loadingSeries"
            :loading="loadingSeries"
            @input="setSelectedSerie"
          >
            <template v-slot:selected-option="{ name }">
              <span class="d-flex align-items-center gap-1">
                <SchoolYearBadge v-if="name" class="select-badge" :text="name" />
              </span>
            </template>
          </ESelect>
        </b-form-group>
      </b-col>

      <b-col
        v-if="
          !$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER) &&
          $can(ACTION.READ, PERMISSION.GENERAL.ADMIN)
        "
        cols="12"
        lg
      >
        <b-form-group :label="$t('Turmas')" label-for="classes">
          <ESelect
            id="classes"
            label="name"
            :value="selectedClasse"
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
      <b-col cols="12" md>
        <b-form-group label-for="period" label="Período">
          <ESelect
            id="finalMonth"
            label="name"
            :value="period"
            :options="monthList"
            :clearable="false"
            multiple
            placeholder="Todo o período"
            gender="M"
            @input="setPeriod"
          >
            <template v-slot:allOptionsLabel>
              <span>Todo o período</span>
            </template>
            <template v-slot:selectAll>
              <span>Todo o período</span>
            </template>
            <template v-slot:selectedOptionsCountLabel="{ selectedLength }">
              {{ selectedLength }} meses selecionados
            </template>
          </ESelect>
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import ability from '@/libs/acl/ability'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import { getEducationalOrganizations } from '@/services/shared/educationalOrganization/EducationalOrganization.service'
import { getInstitutions } from '@/services/shared/institution/Institutions.Service.js'
import { getNetworkGroups } from '@/services/shared/network-groups/NetworkGroups.Service'
import { getSeries } from '@/services/shared/serie/Serie.Service.js'
import useFilters from '@/store/filters/useFilters'
import { getMonthList } from '@/utils/date'
import sortObjectListByKey from '@/utils/sort.js'
import SchoolYearBadge from '@components/SchoolYearBadge'
import { ref, watch } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
  loadingExport: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['input', 'exportToExcel'])

const { subject, classe } = useFilters()

// Grupo
const loadingNetworkGrupos = ref(true)
const selectedNetworkGroup = ref({})
const networkGroupsFilterOptions = ref([])

const fetchNetworkGroups = async () => {
  loadingNetworkGrupos.value = true
  await getNetworkGroups()
    .then(response => {
      const orderedData = sortObjectListByKey(response.data, 'name')
      networkGroupsFilterOptions.value = [
        { id: null, name: 'Todos os grupos' },
        ...orderedData,
      ]
      selectedNetworkGroup.value = networkGroupsFilterOptions.value[0]
    })
    .finally(() => {
      loadingNetworkGrupos.value = false
    })
}

const setSelectedNetworkGroup = async value => {
  selectedNetworkGroup.value = value
  await fetchSchools()
  emitFilter()
}

// Escolas
const loadingSchools = ref(true)
const selectedSchool = ref({})
const schoolsFilterOptions = ref([])

const fetchSchools = async () => {
  const params = {
    NetworkGroupId: selectedNetworkGroup.value.id,
  }
  loadingSchools.value = true
  await getInstitutions(params)
    .then(response => {
      const { data } = response
      schoolsFilterOptions.value = [{ id: null, name: 'Todas as escolas' }, ...data]
    })
    .catch(() => {
      schoolsFilterOptions.value = [{ id: null, name: 'Todas as escolas' }]
    })
    .finally(() => {
      selectedSchool.value = schoolsFilterOptions.value[0]
      loadingSchools.value = false
    })
}

const setSelectedSchool = value => {
  selectedSchool.value = value
  emitFilter()
}

// Matriz
const selectedEducationalOrganization = ref(null)
const educationalOrganizationOptions = ref([])
const loadingEducationalOrganization = ref(true)

const fetchEducationalOrganization = async () => {
  selectedEducationalOrganization.value = null
  loadingEducationalOrganization.value = true
  await getEducationalOrganizations(subject.value.id)
    .then(({ data }) => {
      educationalOrganizationOptions.value = sortObjectListByKey(data, 'name')
      selectedEducationalOrganization.value = data[0]
    })
    .finally(() => {
      loadingEducationalOrganization.value = false
    })
}

const setSelectedEducationalOrganization = value => {
  selectedEducationalOrganization.value = value
  emitFilter()
}

// Serie
const loadingSeries = ref(true)
const selectedSerie = ref({})
const series = ref([])

const fetchSeries = async () => {
  await getSeries({ Subjects: [subject.value.id] })
    .then(({ data }) => {
      loadingSeries.value = true
      series.value = data.data
      selectedSerie.value = data.data[0]
    })
    .finally(() => {
      loadingSeries.value = false
    })
}

const setSelectedSerie = value => {
  selectedSerie.value = value
  emitFilter()
}

// Turmas
const selectedClasse = ref({})
const classesLoading = ref(false)
const classes = ref([])
const classesPage = ref(1)
const classesTotalpages = ref(1)

const setclasses = value => {
  selectedClasse.value = value
  emitFilter()
}

const fetchClasses = async (ctx = {}) => {
  classesLoading.value = true

  const { page } = ctx
  classesPage.value = page || 1

  if (!subject.value.id) return

  try {
    const { data } = await getClassesV2Label({
      /* SerieIds: [serie.value.id], */
      SubjectId: subject.value.id,
      Page: classesPage.value,
    })

    const options = data.data

    if (classesPage.value === 1) {
      if (!options.length) {
        classesLoading.value = false
        setNoClasses()
        return
      }

      classes.value = [...options]
      selectedClasse.value = classes.value[0]
    } else {
      classes.value.push(...options)
    }

    classesTotalpages.value = data.totalPages
    classesLoading.value = false
  } catch (error) {
    setNoClasses()
  }
}

const setNoClasses = () => {
  classes.value = []
  selectedClasse.value = {}
}

// Periodo
const monthList = getMonthList()
const period = ref(monthList)

const setPeriod = value => {
  period.value = value
  emitFilter()
}

// Fetch
const emitFilter = () => {
  emit('input', {
    SubjectId: subject.value?.id,
    EducationalOrganizationId: selectedEducationalOrganization.value?.id,
    NetworkGroupId: selectedNetworkGroup.value.id,
    InstitutionId: selectedSchool.value.id,
    SerieId: selectedSerie.value.id,
    ClassId: classe.value.ClassId || selectedClasse.value.id,
    Months: period.value.length === monthList.length ? [] : period.value.map(item => item.id),
  })
}

if (ability.can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)) {
  fetchNetworkGroups()
  fetchSchools()
  watch(subject, () => {
    Promise.all([fetchEducationalOrganization(), fetchSeries()]).then(() => {
      emitFilter()
    })
  })
} else if (ability.can(ACTION.READ, PERMISSION.GENERAL.TEACHER)) {
  watch(subject, () => {
    Promise.all([fetchEducationalOrganization()]).then(() => {
      emitFilter()
    })
  })
} else {
  watch(subject, () => {
    Promise.all([fetchEducationalOrganization(), fetchClasses()]).then(() => {
      emitFilter()
    })
  })
}

const exportToExcel = () => {
  emit('exportToExcel')
}
</script>