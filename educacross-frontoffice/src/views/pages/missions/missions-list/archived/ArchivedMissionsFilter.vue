<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { ModulesEnum } from '@/consts/admin-context/enums/modules'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { unarchiveGuide } from '@/services/teacher-context/guides/Guides.Service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { computed, ref, watch, getCurrentInstance } from 'vue'

const vm = getCurrentInstance().proxy
const MODULES_IDS = [ModulesEnum.CustomMissionsPlus]

const selectedMissions = computed(
  () => store.getters['archivedMissionsModule/selectedMissions'],
)

const { subject, classe } = useFilters()

watch([subject], async () => {
  vm.$bus.emit('archivedMissionsListReset')
  store.commit('archivedMissionsModule/params', {
    currentPage: 1,
  })
  store.dispatch('archivedMissionsModule/fetchData')
})

const hasMissionSelected = ref(false)
const loadingButtonUnarchivedMission = ref(false)

const searchTerm = computed(() => {
  const params = store.getters['archivedMissionsModule/params']
  return params.searchQuery || ''
})

const unarchiveMission = () => {
  loadingButtonUnarchivedMission.value = true

  const guidesIds = selectedMissions.value.value.map(i => i.id)

  const params = {
    BatchAction: selectedMissions.value.batchAction,
    GuidesIds: guidesIds,
    SubjectId: subject.value.id,
    ClassId: classe.value.ClassId,
    Filed: true,
    Search: searchTerm.value,
  }
  unarchiveGuide(params)
    .then(() => {
      loadingButtonUnarchivedMission.value = false

      vm.$toast({
        component: Toast,
        props: {
          title:
            guidesIds.length > 1
              ? 'Missões desarquivadas com sucesso!'
              : 'Missão desarquivada com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
      vm.$bus.emit('archivedMissionsListReset')
      store.commit('archivedMissionsModule/params', {
        currentPage: 1,
      })
      store.dispatch('archivedMissionsModule/fetchData')
    })
    .finally(() => {
      loadingButtonUnarchivedMission.value = false
    })
}

</script>
<template>
  <b-card>
    <b-row>
      <b-col cols="auto">
        <SelectSubject :additional-modules="MODULES_IDS" />
      </b-col>
      <b-col cols="auto" md> </b-col>
      <b-col cols="12" md="auto" class="ml-auto">
        <b-form-group label-for="button">
          <template v-slot:label> &nbsp;</template>

          <b-dropdown
            v-b-tooltip.hover.top="
              selectedMissions.batchAction === 1 && selectedMissions.value.length === 0
                ? 'Selecione 1 ou mais alunos para realizar essa ação.'
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
              link-class="d-flex align-items-center gap-1 justify-content-center"
              @click.stop="unarchiveMission"
            >
              <b-spinner v-show="loadingButtonUnarchivedMission" small variant="primary" />
              <span class="material-icons-outlined" style="font-size: 14px"> archive </span>
              Desarquivar Missão
            </b-dropdown-item>
          </b-dropdown>
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>