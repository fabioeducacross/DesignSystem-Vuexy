<template>
  <b-card>
    <b-row>
      <b-col v-if="isNetworkManager" cols="12" md>
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
      <b-col v-if="isNetworkManager" cols="12" md>
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
            @input="setInputInstitution"
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
            :placeholder="$t('selectAnOption')"
            label="name"
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
            :options="monthList"
            :placeholder="$t('selectAnOption')"
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
import router from '@/router'
import store from '@/store'
import { getMonthList, currentMonth } from '@/utils/date'
import { useTeachersAccess } from '@/views/reports/teachersAccess/useTeachersAccess.js'
import { watch } from 'vue'
import vSelect from 'vue-select'

const isNetworkManager = store.getters.accessRole === 'NetworkManager'
const institutionId = router.currentRoute.params.institutionId

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

setMonth(currentMonth())

const monthList = getMonthList()

store.commit('moduleTeacherAccessTabTeacher/setCardLoading', true)
store.commit('moduleTeacherAccessTabTeacher/setLoading', true)

if (isNetworkManager) {
  getNetworkGroupsList()
  getInstitutionsList().then(() => {
    if (institutionId) {
      const selectedInstitution = institutionList.value.find(
        item => item.id === institutionId,
      )
      if (selectedInstitution) {
        setInstitution(selectedInstitution)
      }
    } else {
      setInstitution(institutionList.value[0])
    }
    getInstitutionsModulesList(institution.value.id)
  })
} else {
  setInstitution({})
  setModuleId(null)
  getInstitutionsModulesList()
}

watch([networkGroup], () => {
  getInstitutionsList()
})

const setInputInstitution = institution => {
  setInstitution(institution)
  institutionChange()
}

const institutionChange = () => {
  store.commit('moduleTeacherAccessTabTeacher/setCardLoading', true)
  store.commit('moduleTeacherAccessTabTeacher/setLoading', true)
  setModuleId(null)
  getInstitutionsModulesList(institution.value.id)
}

watch([moduleList], () => {
  if (!moduleList.value.length) {
    store.dispatch('moduleTeacherAccessTabTeacher/setEmpty')
  }
})

watch([moduleId], () => {
  if (!moduleId.value) return

  setEducationSystem(null)

  if (moduleId.value.id === 11) {
    store.commit('moduleTeacherAccessTabTeacher/setCardLoading', true)
    store.commit('moduleTeacherAccessTabTeacher/setLoading', true)
    getInstitutionsEducationSystemList(institution.value.id)
  } else {
    fetchTeacherAccess()
  }
})

watch([educationSystem, month], () => {
  fetchTeacherAccess()
})

const fetchTeacherAccess = () => {
  if (moduleId.value.id === 11 && !educationSystem.value) return
  store.dispatch('moduleTeacherAccessTabTeacher/fetchTeacherAccess')
}
</script>

<style lang="scss" scoped></style>
