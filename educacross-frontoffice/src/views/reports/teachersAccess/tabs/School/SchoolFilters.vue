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
            :placeholder="$t('selectAnOption')"
            label="name"
            :clearable="false"
            responsive
            :searchable="false"
            @input="setEducationSystem"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import store from '@/store'
import { useTeachersAccess } from '@/views/reports/teachersAccess/useTeachersAccess.js'
import { watch } from 'vue'
import vSelect from 'vue-select'

const isNetworkManager = store.getters.accessRole === 'NetworkManager'

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
  educationSystem,
  setEducationSystem,
  getInstitutionsEducationSystemList,
  educationSystemList,
  moduleLoading,
  institutionLoading,
} = useTeachersAccess()

store.commit('moduleTeacherAccessTabSchool/setCardLoading', true)
store.commit('moduleTeacherAccessTabSchool/setLoading', true)

if (isNetworkManager) {
  getNetworkGroupsList()
  getInstitutionsList()
} else {
  setModuleId(null)
}
getInstitutionsModulesList()

watch([networkGroup], () => {
  getInstitutionsList()
})

const institutionChange = () => {
  store.commit('moduleTeacherAccessTabSchool/setCardLoading', true)
  store.commit('moduleTeacherAccessTabSchool/setLoading', true)
  setModuleId(null)
  getInstitutionsModulesList(institution.value.id)
}

watch([institution], () => {
  institutionChange()
})

watch([moduleId], () => {
  if (!moduleId.value) return

  setEducationSystem(null)

  if (moduleId.value.id === 11) {
    store.commit('moduleTeacherAccessTabSchool/setCardLoading', true)
    getInstitutionsEducationSystemList(institution.value.id)
  } else {
    fetchTeacherAccess()
  }
})

watch([moduleList], () => {
  if (!moduleList.value.length) {
    store.dispatch('moduleTeacherAccessTabSchool/setEmpty')
  }
})

watch([educationSystem], () => {
  if (moduleId.value?.id === 11) {
    fetchTeacherAccess()
  }
})

const fetchTeacherAccess = () => {
  if (moduleId.value.id === 11 && !educationSystem.value) return
  store.dispatch('moduleTeacherAccessTabSchool/fetchTeacherAccess')
}
</script>

<style lang="scss" scoped></style>
