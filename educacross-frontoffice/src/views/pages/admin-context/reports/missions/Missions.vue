<template>
  <div>
    <b-row v-show="schoolSelect">
      <b-col sm="12" md="3">
        <b-form class="filters-form" autocomplete="off">
          <b-form-group id="school-group" class="filters-form-items" label="Escola">
            <ESelect
              v-model="selectedSchool"
              class="filter-chooser filter-items"
              label="name"
              track-by="id"
              :options="schoolList"
              placeholder="Selecione uma Escola"
              :clearable="false"
            />
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
    <div>
      <p class="mission-legend">Selecione quais missoes voce quer ver agora</p>
    </div>
    <b-overlay :show="loading">
      <div class="mission-content">
        <mission-card
          v-if="showSchoolMission"
          link="belinha-mochila.jpg"
          card-title="Missoes da Escola"
          @buttonClick="toSchoolMissions"
        />
        <mission-card
          v-for="data in educationData"
          :key="data.id"
          :data="data"
          @buttonClick="() => toEducationSystemMissions(data)"
        />
      </div>
    </b-overlay>
  </div>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { ModulesEnum } from '@/consts/admin-context/enums/modules'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { getEducationSystem } from '@/services/shared/educationSystem/EducationSystem.Service'
import {
  getInstitutions,
  getInstitutionsModules,
} from '@/services/shared/institution/Institutions.Service'
import MissionCard from '@/views/pages/admin-context/shared/components/mission-card/MissionCard.vue'
import { BCol, BForm, BFormGroup, BRow } from 'bootstrap-vue'
import { ref, computed, watch, onMounted } from 'vue'
import store from '@/store'
import { useRouter } from 'vue-router/composables'

// State
const loading = ref(false)
const schoolList = ref([])
const selectedSchool = ref(null)
const educationData = ref(null)
const institutionModules = ref(null)
const schoolSelect = ref(false)
const userRole = ref('')
const showSchoolMission = ref(false)
const SchoolMissions = 1

const router = useRouter()

// $can is usually injected by CASL Vue plugin.
// We'll proxy it to store.getters['access/hasPermission'] if needed
// However, as migration, you may have to rebind it.
// We preserve template invariants by manually keeping pattern.

const $can = (action, permission) => {
  // Try Vue prototype property, else get from store
  if (
    store.getters['access/abilities'] &&
    typeof store.getters['access/abilities'].can === 'function'
  ) {
    return store.getters['access/abilities'].can(action, permission)
  }
  return false
}

// ---- Permission Check ----
const hasPermission = () => {
  let hasPerm = false
  if (userRole.value === 'NetworkManager') {
    if (institutionModules.value && Array.isArray(institutionModules.value)) {
      institutionModules.value.forEach(item => {
        const modules = Array.from(item.modules)
        hasPerm = modules.includes(SchoolMissions)
      })
    }
  } else {
    hasPerm = $can(ACTION.READ, PERMISSION.MODULE.CUSTOM_MISSIONS)
  }
  return hasPerm
}

const handleGetModulesData = async () => {
  loading.value = true
  if (userRole.value !== 'NetworkManager') {
    educationData.value = store.state.access.educationSystems
  }
  loading.value = false
}

const getInstitutionsHandler = async () => {
  const response = await getInstitutions()
  schoolList.value = response.data
  if (schoolList.value.length > 0) {
    selectedSchool.value = schoolList.value[0]
  }
}

// ---- Routing ----
const toSchoolMissions = () => {
  if (userRole.value === 'NetworkManager') {
    router.push({
      name: 'listMissionsSchoolNM',
      params: {
        institutionId: selectedSchool.value ? selectedSchool.value.id : null,
      },
    })
  } else {
    router.push({
      name: 'listMissionsSchool',
    })
  }
}

const toEducationSystemMissions = data => {
  if (userRole.value === 'NetworkManager') {
    const instId = selectedSchool.value ? selectedSchool.value.id : ''
    router.push({
      path: `/admin/reports/missions/educationSystem/list/${data.id}/institution/${instId}`,
    })
  } else {
    router.push({
      path: `/admin/reports/missions/educationSystem/list/${data.id}`,
    })
  }
}

// ---- Effects ----
watch(selectedSchool, async value => {
  // `ESelect` emits the selected object; extract id when necessary
  const schoolId = value && value.id ? value.id : value

  if (schoolId) {
    loading.value = true
    const response = await getInstitutionsModules(schoolId)
    institutionModules.value = response.data
    showSchoolMission.value = hasPermission()
  }

  if (userRole.value === 'NetworkManager') {
    const response = await getEducationSystem(schoolId)
    educationData.value = response.data
  } else {
    educationData.value = store.state.access.educationSystems
  }
  loading.value = false
})

onMounted(() => {
  const Role = store.getters.accessRole
  userRole.value = Role
  loading.value = true
  if (userRole.value === 'NetworkManager') {
    getInstitutionsHandler()
    schoolSelect.value = true
  } else {
    handleGetModulesData()
    showSchoolMission.value = hasPermission()
  }
})
</script>

<style lang="scss" scoped>
  .mission-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;

    color: #2c2c2c;
  }

  .mission-legend {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;

    color: #2c2c2c;

    margin: 0;
  }

  .mission-content {
    display: flex;
    flex-wrap: wrap;
  }

  @media (max-width: 900px) {
    .column-order {
      display: flex;
      flex-direction: column;
    }

    .filters-form {
      display: flex;
      flex-direction: column;
    }

    .filters-form-items {
      margin-bottom: 1rem;
    }

    .custom-button-margin {
      margin-top: 1rem;
    }

    .mission-content {
      display: flex;
      align-content: center;
      flex-direction: column;
    }
  }
</style>
