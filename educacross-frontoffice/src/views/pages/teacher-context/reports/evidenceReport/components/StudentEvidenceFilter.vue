<template>
  <section>
    <b-row class="match-height">
      <b-col cols="12" md="auto">
        <SelectSubject />
      </b-col>
      <b-col cols="12" md>
        <b-form-group
          id="classes-group"
          label="Matriz/Currículo"
          label-for="educationalOrganization"
        >
          <ESelect
            v-model="educationalOrganization"
            name="educationalOrganization"
            label="name"
            :options="educationalOrganizationsList"
            placeholder="Todas as BNCCs"
            :clearable="false"
            @change="setEducationalOrganization"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" md>
        <b-form-group id="dataType-group" label="Módulo" label-for="dataType">
          <ESelect
            v-model="dataType"
            name="dataType"
            label="label"
            :options="dataTypeList"
            placeholder="Selecione um Módulo"
            :clearable="false"
            :searchable="false"
            @input="setDataType"
          />
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col v-if="showEducationSystem" id="classes-group" cols="12" md>
        <b-form-group label="Sistema de ensino" label-for="educationSystem">
          <ESelect
            v-model="educationSystem"
            name="educationSystem"
            label="name"
            :options="educationSystemsList"
            placeholder="Selecione um sistema de educação"
            :clearable="false"
            @change="setEducationSystem"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" md>
        <b-form-group id="startMonth-group" label="Mês inicial" label-for="startMonth">
          <ESelect
            v-model="startMonth"
            name="startMonth"
            label="label"
            :options="monthsList"
            placeholder="Selecione um mês inicial"
            :clearable="false"
            @input="setStartMonth"
          >
            <template #option="{ label, value, disabled }">
              <div>
                <span
                  :id="`month-start-${value}`"
                  :class="{ 'text-muted': unactiveMonthsStartMonth(value) }"
                  @click.stop="disabled ? null : select(value)"
                >
                  {{ label }}
                </span>
                <b-tooltip
                  v-if="unactiveMonthsStartMonth(value)"
                  :target="`month-start-${value}`"
                  triggers="hover"
                >
                  O mês inicial não pode ser maior que o mês final
                </b-tooltip>
              </div>
            </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" md>
        <b-form-group id="endMonth-group" label="Mês final" label-for="endMonth">
          <ESelect
            v-model="endMonth"
            name="endMonth"
            label="label"
            :options="monthsList"
            placeholder="Selecione um mês final"
            :clearable="false"
            @input="setEndMonth"
          >
            <template v-slot:option="{ label, value, disabled, select }">
              <div>
                <span
                  :id="`month-end-${value}`"
                  :class="{ 'text-muted': unactiveMonthsEndMonth(value) }"
                  @click.stop="disabled ? null : select(value)"
                >
                  {{ label }}
                </span>
                <b-tooltip :target="`month-end-${value}`">
                  O mês final não pode ser maior que o mês inicial
                </b-tooltip>
              </div>
            </template>
          </ESelect>
        </b-form-group>
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import ability from '@/libs/acl/ability'
import { getEducationSystemInfo } from '@/services/shared/educationSystem/EducationSystem.Service'
import { getEducationalOrganizations } from '@/services/shared/educationalOrganization/EducationalOrganization.service'
import useFilters from '@/store/filters/useFilters'
import { months } from '@/utils/utils'
import { BForm, BFormDatepicker, BFormGroup } from 'bootstrap-vue'
import Vue, { ref, watch, computed } from 'vue'
import VSelect from 'vue-select'

const emit = defineEmits([
  'setEducationalOrganization',
  'setEducationSystem',
  'setDataType',
  'setStartMonth',
  'setEndMonth',
])

const now = new Date()
const currentMonth = now.getMonth() + 1
const educationalOrganizationsList = ref([])
const educationSystemsList = ref([])
const { subject } = useFilters()

const monthsList = months().map((month, index) => {
  return {
    label: month,
    value: index + 1,
  }
})

const educationalOrganization = ref(null)
const dataType = ref(null)
const educationSystem = ref(null)
const startMonth = ref(null)
const endMonth = ref(null)

const dataTypeList = computed(() => {
  const options = [
    {
      value: 1,
      label: 'Todos',
      show: true,
    },
    {
      value: 2,
      label: 'Missão',
      show: ability.can(ACTION.READ, PERMISSION.MODULE.SCHOOL_MISSIONS),
    },
    {
      value: 3,
      label: 'Ilha',
      show: subject.value.id !== 3 && ability.can(ACTION.READ, PERMISSION.MODULE.ISLANDS),
    },
    {
      value: 3,
      label: 'Explorar',
      show: subject.value.id === 3 && ability.can(ACTION.READ, PERMISSION.MODULE.ISLANDS),
    },
    {
      value: 4,
      label: 'Sistema de ensino',
      show: ability.can(ACTION.READ, PERMISSION.MODULE.EDUCATION_SYSTEMS),
    },
  ]
  return options.filter(item => item.show)
})

const showEducationSystem = computed(() => {
  return dataType.value?.value === 4
})

const fetchEducationalOrganization = () => {
  getEducationalOrganizations(subject.value.id).then(response => {
    const { data } = response
    data.unshift({
      id: null,
      name: 'Todas as BNCCs',
    })
    educationalOrganizationsList.value = data
    educationalOrganization.value = data[0]
    setEducationalOrganization()
  })
}

const fetchEducationSystems = () => {
  if (!ability.can(ACTION.READ, PERMISSION.MODULE.EDUCATION_SYSTEMS)) return
  if (dataType.value?.value !== 4) return

  getEducationSystemInfo().then(response => {
    const { data } = response
    educationSystemsList.value = data

    if (data.length) {
      educationSystem.value = data[0]
      setEducationSystem()
    }
  })
}

const setEducationalOrganization = () => {
  emit('setEducationalOrganization', educationalOrganization.value?.id)
}

const setEducationSystem = () => {
  emit('setEducationSystem', educationSystem.value?.id)
}

const setDataType = () => {
  if (dataType.value?.value === 4) {
    fetchEducationSystems()
  }
  emit('setDataType', dataType.value?.value)
}

const setStartMonth = () => {
  emit('setStartMonth', startMonth.value?.value)
}

const setEndMonth = () => {
  emit('setEndMonth', endMonth.value?.value)
}

const unactiveMonthsStartMonth = month => {
  return month > endMonth.value
}

const unactiveMonthsEndMonth = month => {
  return month < startMonth.value
}

const resetFilter = () => {
  educationalOrganization.value = null
  dataType.value = dataTypeList.value[0]
  educationSystem.value = undefined
  startMonth.value = monthsList.find(m => m.value === currentMonth)
  endMonth.value = monthsList.find(m => m.value === currentMonth)

  setStartMonth()
  setEndMonth()
  setDataType()
  setEducationSystem()
  setEducationalOrganization()
}

watch(startMonth, (newVal, oldVal) => {
  if (newVal > endMonth.value) {
    startMonth.value = oldVal
  }
})

watch(endMonth, (newVal, oldVal) => {
  if (newVal < startMonth.value) {
    endMonth.value = oldVal
  }
})

watch(
  subject,
  () => {
    resetFilter()
    fetchEducationalOrganization()
    fetchEducationSystems()
  },
  {
    deep: true,
  },
)

fetchEducationalOrganization()

resetFilter()
</script>
