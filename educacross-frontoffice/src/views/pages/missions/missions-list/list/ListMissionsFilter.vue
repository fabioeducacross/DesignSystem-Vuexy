<template>
  <section>
    <b-card>
      <b-row>
        <b-col cols="auto">
          <SelectSubject :additional-modules="MODULES_IDS" />
        </b-col>
        <b-col>
          <b-form-group label="Status" label-for="status">
            <ESelect
              :value="missionStatus"
              label="label"
              :options="missionStatusOptions"
              :clearable="false"
              :disabled="loadingGetMissions"
              name="status"
              @input="changeMissionStatus"
            >
            </ESelect>
          </b-form-group>
        </b-col>

        <b-col v-if="$can(ACTION.READ, PERMISSION.GENERAL.GROUPS)" cols="12" md>
          <b-form-group label="Grupos" label-for="grupos">
            <ESelect
              :value="missionGroup"
              label="name"
              :options="missionGroupOptions"
              :clearable="false"
              :disabled="loadingGroup"
              name="grupos"
              @input="changeMissionGroup"
            >
            </ESelect>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="auto" class="ml-auto">
          <b-form-group label-for="button">
            <template v-slot:label> &nbsp;</template>
            <div
              v-b-tooltip.hover.left="
                disableGuidesCreation
                  ? 'As missões dessa turma se esgotaram. É permitida a criação até 40 missões ao mês por turma, exclua uma missão para criar uma nova.'
                  : ''
              "
            >
              <b-button
                variant="primary"
                block
                name="button"
                :disabled="disableGuidesCreation"
                class="d-flex align-items-center justify-content-center gap-1"
                @click="createMission()"
              >
                <span class="material-symbols-outlined" style="font-size: 14px"> add_circle </span>
                Nova Missão
              </b-button>
            </div>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="auto" class="ml-auto">
          <b-form-group label-for="button">
            <template v-slot:label> &nbsp;</template>

            <b-dropdown
              v-b-tooltip.hover.top="
                selectedMissions.batchAction === 1 && selectedMissions.value.length === 0
                  ? 'Selecione 1 ou mais missões para realizar essa ação.'
                  : ''
              "
              variant="outline-primary"
              text="Ações em lote"
              block
              :disabled="
                (selectedMissions.batchAction === 1 && selectedMissions.value.length === 0) ||
                loadingButtonUnlistMission
              "
            >
              <b-dropdown-item
                v-b-tooltip.hover.top="
                  'Apenas missões canceladas ou finalizadas podem ser arquivadas.'
                "
                link-class="d-flex align-items-center gap-1 justify-content-center"
                @click.stop="archiveMission"
              >
                <b-spinner v-if="loadingButtonUnlistMission" small variant="primary" />
                <span class="material-icons-outlined" style="font-size: 14px"> archive </span>
                Arquivar Missão
              </b-dropdown-item>
            </b-dropdown>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
    <GuidesLimitAlert v-model="disableGuidesCreation" />
  </section>
</template>
<script setup>
import GuidesLimitAlert from '@/components/missions/GuidesLimitAlert.vue'
import ESelect from '@/components/selects/ESelect.vue'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { ModulesEnum } from '@/consts/admin-context/enums/modules.js'
import { missionStatusEnum } from '@/consts/missionsEnum.js'
import { ACTION, PERMISSION } from '@/consts/permissions.js'
import router from '@/router'
import { getGroups } from '@/services/shared/groups/Groups.service.js'
import { unarchiveGuide } from '@/services/teacher-context/guides/Guides.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ArchiveMissions from '@/views/pages/teacher-context/shared/modals/ArchiveMissions.vue'
import { computed, getCurrentInstance, ref, watch } from 'vue'

const MODULES_IDS = [
  ModulesEnum.CustomMissionsPlus,
  ModulesEnum.BookMissions,
  ModulesEnum.EducacrossMissions,
  ModulesEnum.InclusionGuide,
]
const { subject, classe } = useFilters()
const disableGuidesCreation = ref(false)
const missionStatusEnumValues = Object.values(missionStatusEnum)
const missionStatusOptions = [{ id: null, label: 'Todas' }, ...missionStatusEnumValues]
const vm = getCurrentInstance().proxy

const missionGroupOptions = ref([{ id: null, label: 'Todos' }])
const missionGroup = computed(() => store.getters['listMissionsModule/missionGroup'])

const missionStatus = computed(() => store.getters['listMissionsModule/missionStatus'])
const selectedMissions = computed(() => store.getters['listMissionsModule/selectedMissions'])

const changeMissionStatus = value => {
  store.commit('listMissionsModule/missionStatus', value)
  vm.$bus.emit('listMissionsListReset')
  store.dispatch('listMissionsModule/fetchData')
}
store.commit('listMissionsModule/missionStatus', missionStatusOptions[0])

const changeMissionGroup = value => {
  store.commit('listMissionsModule/missionGroup', value)
  vm.$bus.emit('listMissionsListReset')
  store.commit('listMissionsModule/params', {
    currentPage: 1,
  })
  store.dispatch('listMissionsModule/fetchData')
}

const getGroupsClass = async () => {
  missionGroupOptions.value = [{ id: null, label: 'Todos' }]

  loadingGroup.value = true

  const { data } = await getGroups({ ClassId: classe.value.id })

  missionGroupOptions.value = data
  changeMissionGroup(missionGroupOptions.value[0])
  loadingGroup.value = false
}

watch([subject], async () => {
  if (vm.$can(ACTION.READ, PERMISSION.GENERAL.GROUPS)) {
    await getGroupsClass()
  }

  vm.$bus.emit('listMissionsListReset')
  store.commit('listMissionsModule/params', {
    currentPage: 1,
  })
  store.dispatch('listMissionsModule/fetchData')
})

const loadingGetMissions = ref(false)
const loadingGroup = ref(false)
const hasMissionSelected = ref(false)
const loadingButtonUnlistMission = ref(false)

const searchTerm = computed(() => {
  const params = store.getters['listMissionsModule/params']
  return params.searchQuery || ''
})

const archiveMission = () => {
  loadingButtonUnlistMission.value = true

  const guidesIds = selectedMissions.value.value.map(i => i.id)

  const params = {
    BatchAction: selectedMissions.value.batchAction,
    GuidesIds: guidesIds,
    SubjectId: subject.value.id,
    ClassId: classe.value.ClassId,
    Filed: false,
    Search: searchTerm.value,
  }

  unarchiveGuide(params)
    .then(() => {
      loadingButtonUnlistMission.value = false

      vm.$toast({
        component: Toast,
        props: {
          title:
            guidesIds.length > 1 || selectedMissions.value.batchAction === 2
              ? 'Missões arquivadas com sucesso!'
              : 'Missão arquivada com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
      vm.$bus.emit('fetchGuidesMonth')
      vm.$bus.emit('listMissionsListReset')
      store.commit('listMissionsModule/params', {
        currentPage: 1,
      })
      store.dispatch('listMissionsModule/fetchData')
    })
    .finally(() => {
      loadingButtonUnlistMission.value = false
    })
}

const createMission = () => {
  router.push({ name: 'newMissionsTeacher' })
}
</script>