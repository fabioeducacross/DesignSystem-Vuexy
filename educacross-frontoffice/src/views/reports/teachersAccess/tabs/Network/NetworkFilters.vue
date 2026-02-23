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
            :loading="networkGroupLoading"
            :disabled="networkGroupLoading"
            @input="setNetworkGroup"
          >
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" md>
        <b-form-group label="Escola" label-for="institution">
          <ESelect
            input-id="institution"
            :value="institution"
            :options="institutionList"
            :placeholder="$t('selectAnOption')"
            label="name"
            :clearable="false"
            responsive
            :searchable="true"
            :loading="institutionLoading"
            @input="setInstitution"
          >
            <template v-slot:no-options> Nenhuma Escola encontrada </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" md>
        <b-form-group label="Módulo" label-for="module">
          <ESelect
            input-id="module"
            :value="moduleId"
            :options="moduleList"
            :placeholder="$t('selectAnOption')"
            label="name"
            :clearable="false"
            responsive
            :searchable="false"
            :loading="moduleLoading"
            @input="setModuleId"
          >
            <template v-slot:no-options> Nenhuma opção foi encontrada. </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col v-if="moduleId && moduleId.id === 11" cols="12" md>
        <b-form-group label="Sistema de Ensino" label-for="educationSystem">
          <ESelect
            input-id="educationSystem"
            :value="educationSystem"
            :options="educationSystemList"
            label="name"
            :placeholder="$t('selectAnOption')"
            :clearable="false"
            responsive
            :searchable="false"
            @input="setEducationSystem"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" md>
        <b-form-group label="Mês" label-for="month">
          <ESelect
            input-id="month"
            :value="month"
            :placeholder="$t('selectAnOption')"
            :options="monthList"
            label="name"
            :clearable="false"
            responsive
            :searchable="false"
            @input="setMonth"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import store from '@/store'
import { getMonthList } from '@/utils/date'
import { useTeachersAccess } from '@/views/reports/teachersAccess/useTeachersAccess.js'
import { watch } from 'vue'
import vSelect from 'vue-select'

const {
  networkGroupLoading,
  networkGroup,
  networkGroups,
  setNetworkGroup,
  getNetworkGroupsList,
  getInstitutionsList,
  institution,
  setInstitution,
  institutionList,
  moduleId,
  setModuleId,
  getInstitutionsModulesList,
  moduleList,
  month,
  setMonth,
  educationSystem,
  setEducationSystem,
  getInstitutionsEducationSystemList,
  educationSystemList,
  moduleLoading,
  institutionLoading,
} = useTeachersAccess()

const monthList = [
  {
    id: null,
    name: 'Todos os meses',
  },
  ...getMonthList(),
]

setMonth(monthList[0])

store.commit('moduleTeacherAccessTabNetwork/setLoading', true)

getNetworkGroupsList()
getInstitutionsList()
setModuleId(null)
getInstitutionsModulesList()

const institutionChange = () => {
  store.commit('moduleTeacherAccessTabNetwork/setLoading', true)
  setModuleId(null)
  getInstitutionsModulesList(institution.value.id)
}

watch([networkGroup], () => {
  getInstitutionsList()
})

watch([institution], () => {
  institutionChange()
})

watch([moduleList], () => {
  if (!moduleList.value.length) {
    store.dispatch('moduleTeacherAccessTabNetwork/setEmpty')
  }
})

watch([moduleId], () => {
  if (!moduleId.value) return

  setEducationSystem(null)

  if (moduleId.value.id === 11) {
    store.commit('moduleTeacherAccessTabNetwork/setLoading', true)
    getInstitutionsEducationSystemList(institution.value.id)
  } else {
    fetchTeacherAccess()
  }
})

watch([month], () => {
  fetchTeacherAccess()
})

watch([educationSystem], () => {
  if (moduleId.value.id === 11) {
    fetchTeacherAccess()
  }
})

const fetchTeacherAccess = () => {
  if (moduleId.value.id === 11 && !educationSystem.value) return
  store.dispatch('moduleTeacherAccessTabNetwork/fetchTeacherAccess')
}
</script>

<style lang="scss" scoped></style>
