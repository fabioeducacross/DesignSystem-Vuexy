<template>
  <b-form id="StudentEvidenceFilter" autocomplete="off">
    <b-row>
      <b-col cols="12" md="auto">
        <SelectSubject :fetch-on-mounted="false" />
      </b-col>

      <b-col cols="12" md>
        <b-form-group label="Ano Escolar" label-for="status">
          <ESelect
            v-model="serie"
            label="name"
            :options="series"
            :clearable="false"
            name="status"
            :loading="seriesLoading"
            :disabled="seriesLoading"
            @change="changeSerie"
          >
          </ESelect>
        </b-form-group>
      </b-col>

      <b-col cols="12" md>
        <b-form-group id="classes-group" label="Turma" label-for="classes">
          <ESelect
            id="classes"
            label="name"
            name="classes"
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
            <template #selected-option="{ name, serieName }">
              <div>
                <span>
                  {{ name }}
                </span>
                <b-badge v-if="serieName" pill variant="light-primary"> {{ serieName }}</b-badge>
              </div>
            </template>
            <template #option="{ name, serieName, id }">
              <div>
                <span>
                  {{ name }}
                </span>
                <b-badge
                  v-if="serieName"
                  pill
                  variant="light-primary"
                  :class="classe.id === id ? 'bg-white text-primary' : ''"
                >
                  {{ serieName }}
                </b-badge>
              </div>
            </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" md>
        <b-form-group id="classes-group" label="Matriz/Currículo" label-for="matrizCurriculo">
          <ESelect
            v-model="filterEducationalOrganization"
            label="name"
            name="matrizCurriculo"
            :options="educationalOrganization"
            placeholder="Selecione uma Matriz/Currículo"
            :clearable="false"
            :loading="educationalOrganizationLoading"
            :disabled="educationalOrganizationLoading"
            @input="setEducationalOrganization"
          />
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" md>
        <b-form-group id="dataType-group" label="Módulo" label-for="modulo">
          <ESelect
            v-model="filterDataType"
            label="label"
            name="modulo"
            :options="dataType"
            placeholder="Selecione um Módulo"
            :clearable="false"
            @input="setFilterDataType"
          />
        </b-form-group>
      </b-col>

      <b-col v-if="filterDataType.id === 4" cols="12" md>
        <b-form-group
          v-if="filterDataType.id === 4"
          id="classes-group"
          label="Sistema de ensino"
          label-for="educationSystem"
        >
          <ESelect
            v-model="filterEducationSystem"
            label="name"
            name="educationSystem"
            :options="educationSystem"
            placeholder="Selecione um sistema de educação"
            :clearable="false"
            :loading="educationSystemLoading"
            :disabled="educationSystemLoading"
            @input="setEducationSystem"
          />
        </b-form-group>
      </b-col>

      <b-col cols="12" md>
        <b-form-group id="startDate-group" label="Mês inicial" label-for="startMonth">
          <ESelect
            v-model="startMonth"
            :options="monthsListForStart"
            name="startMonth"
            label="label"
            track-by="id"
            placeholder="Selecione um mês inicial"
            :clearable="false"
            :searchable="false"
            @input="setStartMonth"
          >
            <template #option="{ label, disabled }">
              <span
                :class="{ 'text-muted': disabled }"
                :title="disabled ? 'O mês inicial não pode ser maior que o mês final' : ''"
              >
                {{ label }}
              </span>
            </template>
          </ESelect>
        </b-form-group>
      </b-col>

      <b-col cols="12" md>
        <b-form-group id="endDate-group" label="Mês final" label-for="endMonth">
          <ESelect
            v-model="endMonth"
            name="endMonth"
            :options="monthsListForEnd"
            label="label"
            track-by="id"
            placeholder="Selecione um mês final"
            :clearable="false"
            :searchable="false"
            @input="setEndMonth"
          >
            <template #option="{ label, disabled }">
              <span
                :class="{ 'text-muted': disabled }"
                :title="disabled ? 'O mês final não pode ser menor que o mês inicial' : ''"
              >
                {{ label }}
              </span>
            </template>
          </ESelect>
        </b-form-group>
      </b-col>
    </b-row>
  </b-form>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import { getEducationSystemInfo } from '@/services/shared/educationSystem/EducationSystem.Service'
import { getEducationalOrganizationsLabels } from '@/services/shared/educationalOrganization/EducationalOrganization.service'
import { getSerieBySubject } from '@/services/shared/serie/Serie.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { months } from '@/utils/utils'
import MultiSelectCheckbox from '@/views/pages/admin-context/shared/components/multi-select/MultiSelectCheckbox.vue'
import SchoolYearBadge from '@components/SchoolYearBadge'
import { BForm, BFormDatepicker, BFormGroup } from 'bootstrap-vue'
import { ref, watch, computed, onMounted, nextTick } from 'vue'

const emit = defineEmits([
  'filtersReady',
  'setClass',
  'setSerie',
  'setEducationalOrganization',
  'setDataType',
  'setEducationSystem',
  'setStartMonth',
  'setEndMonth',
  'setSubject',
])

const now = new Date()
const currentMonth = now.getMonth() + 1

const { subject, fetchSubjects, institution, classe } = useFilters()
const { InstitutionId } = store.state.access.userData
institution.value = { id: InstitutionId }

const seriesLoading = ref(false)
const classesLoading = ref(false)
const educationalOrganizationLoading = ref(false)
const educationSystemLoading = ref(false)

const series = ref([])
const classes = ref([])
const educationalOrganization = ref([])
const educationSystem = ref([])
const dataType = ref([
  { id: 1, label: 'Todos os módulos' },
  { id: 2, label: 'Missão', value: 1 },
  { id: 3, label: 'Ilha', value: 2 },
  { id: 4, label: 'Sistema de ensino', value: 11 },
])

const serie = ref(null)
const filterEducationalOrganization = ref(null)
const filterDataType = ref(dataType.value[0])
const filterEducationSystem = ref(null)
const startMonth = ref(currentMonth)
const endMonth = ref(currentMonth)

const classesPage = ref(1)
const classesTotalpages = ref(1)

// Computed reativo para lista de meses do seletor inicial
const monthsListForStart = computed(() => {
  const endValue =
    typeof endMonth.value === 'number' ? endMonth.value : endMonth.value?.value ?? 12

  return months().map((month, index) => {
    const monthValue = index + 1
    return {
      label: month,
      value: monthValue,
      id: monthValue,
      disabled: monthValue > endValue,
    }
  })
})

// Computed reativo para lista de meses do seletor final
const monthsListForEnd = computed(() => {
  const startValue =
    typeof startMonth.value === 'number' ? startMonth.value : startMonth.value?.value ?? 1

  return months().map((month, index) => {
    const monthValue = index + 1
    return {
      label: month,
      value: monthValue,
      id: monthValue,
      disabled: monthValue < startValue,
    }
  })
})

const fetchSeries = async () => {
  if (!subject.value || !subject.value.id) return

  seriesLoading.value = true
  try {
    const response = await getSerieBySubject(subject.value.id)
    series.value = response.data

    if (series.value.length > 0) {
      serie.value = series.value[0]
    }

    await Promise.all([fetchClasses({ page: 1 }), fetchEducationalOrganization()])
  } catch (error) {
    series.value = []
  } finally {
    seriesLoading.value = false
  }
}

const fetchClasses = async (ctx = {}) => {
  classesLoading.value = true

  const { page } = ctx
  classesPage.value = page || 1

  if (!subject.value || !subject.value.id || !serie.value || !serie.value.id) {
    classesLoading.value = false
    return
  }

  try {
    const { data } = await getClassesV2Label({
      Page: classesPage.value,
      SubjectId: subject.value.id,
      institutionId: institution.value.id,
      SerieIds: serie.value.id,
    })

    const options = data.data

    if (classesPage.value === 1) {
      classes.value = [{ id: null, name: 'Todas as turmas' }, ...options]
      classe.value = classes.value[0]
    } else {
      classes.value.push(...options)
    }

    classesTotalpages.value = data.totalPages
  } catch (error) {
    classes.value = []
  } finally {
    classesLoading.value = false
  }
}

const fetchEducationalOrganization = async () => {
  if (!subject.value || !subject.value.id) return

  educationalOrganizationLoading.value = true
  try {
    const response = await getEducationalOrganizationsLabels({
      SubjectId: subject.value.id,
      SerieId: serie.value.id,
    })
    educationalOrganization.value = [{ id: 'all', name: ' Todas as BNCCs' }, ...response.data]

    if (educationalOrganization.value.length > 0) {
      filterEducationalOrganization.value = educationalOrganization.value[0]
    }

    if (filterDataType.value?.id === 4 || filterDataType.value?.value === 11) {
      await fetchEducationSystem()
    } else {
      emitCompleteFilterState()
    }
  } catch (error) {
    educationalOrganization.value = [{ id: 'all', name: ' Todas as BNCCs' }]
  } finally {
    educationalOrganizationLoading.value = false
  }
}

const fetchEducationSystem = async () => {
  educationSystemLoading.value = true
  try {
    const response = await getEducationSystemInfo()
    educationSystem.value = response.data

    if (educationSystem.value.length > 0) {
      filterEducationSystem.value = educationSystem.value[0]
    }

    emitCompleteFilterState()
  } catch (error) {
    educationSystem.value = []
  } finally {
    educationSystemLoading.value = false
  }
}

const initializeFilters = async () => {
  if (!subject.value || !subject.value.id) return

  await fetchSeries()
}

const emitCompleteFilterState = () => {
  const filterState = {
    subjectId: subject.value?.id || null,
    seriesId: serie.value?.id || null,
    classId: classe.value?.id || null,
    educationalOrganizationId: filterEducationalOrganization.value?.id || null,
    dataType: filterDataType.value?.id || null,
    educationSystemId: filterEducationSystem.value?.id || null,
    startMonth: typeof startMonth.value === 'number' ? startMonth.value : startMonth.value?.value,
    finalMonth: typeof endMonth.value === 'number' ? endMonth.value : endMonth.value?.value,
  }

  emit('filtersReady', filterState)
}

const setclasses = value => {
  classe.value = value
  emit('setClass', classe.value)
}

const changeSerie = async () => {
  emit('setSerie', serie.value)
  Promise.all([fetchClasses({ page: 1 }), fetchEducationalOrganization()])
}

const setEducationalOrganization = () => {
  emit('setEducationalOrganization', filterEducationalOrganization.value)
}

const setFilterDataType = async () => {
  emit('setDataType', filterDataType.value)
  if (
    (filterDataType.value?.id === 4 || filterDataType.value?.value === 11) &&
    !educationSystem.value.length
  ) {
    await fetchEducationSystem()
  }
}

const setEducationSystem = () => {
  emit('setEducationSystem', filterEducationSystem.value)
}

const setStartMonth = () => {
  // Sempre emitir valor numérico para manter compatibilidade com componente pai
  const monthValue =
    typeof startMonth.value === 'number' ? startMonth.value : startMonth.value?.value
  emit('setStartMonth', monthValue)
}

const setEndMonth = () => {
  // Sempre emitir valor numérico para manter compatibilidade com componente pai
  const monthValue =
    typeof endMonth.value === 'number' ? endMonth.value : endMonth.value?.value
  emit('setEndMonth', monthValue)
}

const unactiveMonthsStartMonth = month => {
  const endValue = typeof endMonth.value === 'number' ? endMonth.value : endMonth.value?.value
  return month > endValue
}

const unactiveMonthsEndMonth = month => {
  const startValue =
    typeof startMonth.value === 'number' ? startMonth.value : startMonth.value?.value
  return month < startValue
}

// Watch for month validation
watch(
  startMonth,
  (newVal, oldVal) => {
    const newValue = typeof newVal === 'number' ? newVal : newVal?.value
    const endValue =
      typeof endMonth.value === 'number' ? endMonth.value : endMonth.value?.value

    if (newValue > endValue) {
      startMonth.value = oldVal
    }
  },
  { deep: true },
)

watch(
  endMonth,
  (newVal, oldVal) => {
    const newValue = typeof newVal === 'number' ? newVal : newVal?.value
    const startValue =
      typeof startMonth.value === 'number' ? startMonth.value : startMonth.value?.value

    if (newValue < startValue) {
      endMonth.value = oldVal
    }
  },
  { deep: true },
)

watch(subject, async (newSubject, oldSubject) => {
  if (newSubject && newSubject.id && newSubject.id !== oldSubject?.id) {
    emit('setSubject', newSubject)
    await initializeFilters()
  }
})

// Converter valores iniciais de número para objeto após montagem do componente
onMounted(() => {
  nextTick(() => {
    // Converter startMonth se ainda for número
    if (typeof startMonth.value === 'number') {
      const found = monthsListForStart.value.find(m => m.value === startMonth.value)
      if (found) {
        startMonth.value = found
      }
    }

    // Converter endMonth se ainda for número
    if (typeof endMonth.value === 'number') {
      const found = monthsListForEnd.value.find(m => m.value === endMonth.value)
      if (found) {
        endMonth.value = found
      }
    }
  })
})

// Initialize
fetchSubjects()
</script>
