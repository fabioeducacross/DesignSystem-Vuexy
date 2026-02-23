<template>
  <b-card>
    <b-row>
      <b-col cols="12" md="auto">
        <SelectSubject />
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
          <b-button
            variant="primary"
            block
            name="button"
            class="d-flex align-items-center justify-content-center gap-1"
            @click="createMission()"
          >
            <span class="material-symbols-outlined" style="font-size: 14px"> add_circle </span>
            Nova Missão
          </b-button>
        </b-form-group>
      </b-col>

      <b-col cols="12" md="auto" class="ml-auto">
        <b-form-group label-for="button">
          <template v-slot:label> &nbsp;</template>

          <b-dropdown
            variant="outline-primary"
            text="Ações em lote"
            block
            :disabled="selectedMissions.length < 1 || loadingButtonUnlistMission"
          >
            <b-dropdown-item
              link-class="d-flex align-items-center gap-1 justify-content-center"
              @click.stop="openModalArchiveMission"
            >
              <b-spinner v-if="loadingButtonUnlistMission" small variant="primary" />
              <span class="material-icons-outlined" style="font-size: 14px"> archive </span>
              Arquivar Missão
            </b-dropdown-item>
          </b-dropdown>
        </b-form-group>
      </b-col>
    </b-row>
    <b-modal
      v-model="activePromptArchiveMission"
      centered
      size="lg"
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
      static
      @close="closePromptActionArchiveMissions()"
    >
      <archive-missions
        v-if="activePromptArchiveMission"
        :archive-missions="selectedMissions"
        @close-archive-missions="closePromptActionArchiveMissions()"
        @archive-missions="archiveMission"
      />
    </b-modal>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
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

const { subject, classe } = useFilters()
const missionStatusEnumValues = Object.values(missionStatusEnum)
const missionStatusOptions = [{ id: null, label: 'Todas' }, ...missionStatusEnumValues]
const vm = getCurrentInstance().proxy

const missionGroupOptions = ref([{ id: null, label: 'Todos' }])
const missionGroup = computed(() => store.getters['listMissionsModule/missionGroup'])

const missionStatus = computed(() => store.getters['listMissionsModule/missionStatus'])
const selectedMissions = computed(() => store.getters['listMissionsModule/selectedMissions'])

const changeMissionStatus = value => {
  store.commit('listMissionsModule/missionStatus', value)
  store.dispatch('listMissionsModule/fetchData')
}
store.commit('listMissionsModule/missionStatus', missionStatusOptions[0])

const changeMissionGroup = value => {
  store.commit('listMissionsModule/missionGroup', value)
  store.dispatch('listMissionsModule/fetchData')
}

const loadingGetMissions = ref(false)
const loadingGroup = ref(false)
const hasMissionSelected = ref(false)
const loadingButtonUnlistMission = ref(false)
const activePromptArchiveMission = ref(false)

const getGroupsClass = async () => {
  missionGroupOptions.value = [{ id: null, label: 'Todos' }]
  loadingGroup.value = true

  const { data } = await getGroups({ ClassId: classe.value.id })

  missionGroupOptions.value = data
  changeMissionGroup(missionGroupOptions.value[0])
  loadingGroup.value = false
}

watch([classe, subject], async () => {
  if (vm.$can(ACTION.READ, PERMISSION.GENERAL.GROUPS)) {
    await getGroupsClass()
  }
  store.dispatch('listMissionsModule/fetchData')
})

const openModalArchiveMission = () => {
  activePromptArchiveMission.value = true
}

const closePromptActionArchiveMissions = () => {
  activePromptArchiveMission.value = false
  vm.$bus.emit('listMissionsListReset')
}

const archiveMission = () => {
  loadingButtonUnlistMission.value = true

  const guidesIds = selectedMissions.value.map(i => i.id)
  unarchiveGuide({ guidesIds })
    .then(() => {
      loadingButtonUnlistMission.value = false

      vm.$toast({
        component: Toast,
        props: {
          text:
            guidesIds.length > 1
              ? 'Missões arquivadas com sucesso!'
              : 'Missão arquivada com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
      store.dispatch('listMissionsModule/fetchData')
      vm.$bus.emit('listMissionsListReset')
    })
    .finally(() => {
      activePromptArchiveMission.value = false
      loadingButtonUnlistMission.value = false
    })
}

const createMission = () => {
  router.push({ name: 'newMissionsTeacher' })
}

// Dynamic import for SelectSubject
const SelectSubject = () => import('@/layouts/components/SelectSubject.vue')
</script>