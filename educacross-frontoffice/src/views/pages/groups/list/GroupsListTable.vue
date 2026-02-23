<template>
  <section>
    <ListTableSelectLocal
      v-model="selectedGroups"
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      search-placeholder="Pesquisar por Grupo"
      selected-label="Grupos selecionados"
    >
      <template #cell(name)="{ item }">
        <div class="text-wrap" style="min-width: 200px">
          <span class="align-text-top font-bold">{{ item.name }}</span>
        </div>
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center gap-3">
          <span
            v-for="(action, index) in actions"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip(item)"
            :class="`
              ${
                enableAction(action.enableTo, item)
                  ? 'text-primary cursor-pointer'
                  : 'cursor-not-allowed text-muted'
              }
              ${action.class}
            `"
            class="material-symbols-outlined"
            @click.stop="enableAction(action.enableTo, item) ? action.action(item) : null"
          >
            {{ action.icon }}
          </span>
        </div>
      </template>
    </ListTableSelectLocal>
    <ModalConfirm
      v-model="confirmDeleteIsOpen"
      :callback-confirm="deleteG"
      label-confirm="Sim, excluir!"
      :busy="loadingDelete"
    >
      <h4>Tem certeza que deseja excluir?</h4>
      <p>
        Você está tentando excluir o grupo
        <span class="text-primary font-bold">{{ currentGroup.name }}.</span> Deseja continuar?
      </p>
    </ModalConfirm>
    <GroupsListView v-model="viewGroupIsOpen" :group="currentGroup"></GroupsListView>
  </section>
</template>

<script setup>
import ListTableSelectLocal from '@/components/table/ListTableSelectLocal.vue'
import { formatNumber } from '@/filters/filters'
import { getGroups, deleteGroup } from '@/services/shared/groups/Groups.service.js'
import useFilters from '@/store/filters/useFilters'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import GroupsListView from '@/views/pages/groups/list/GroupsListView.vue'
import { ref, watch, computed, getCurrentInstance } from 'vue'
import { useToast } from 'vue-toastification/composition'

const props = defineProps({
  showOnlyEmptyGroups: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['input'])

const loading = ref(true)
const currentGroup = ref({})
const selectedGroups = ref([])
const toast = useToast()
const loadingDelete = ref(false)
const vm = getCurrentInstance().proxy
const tableColumns = [
  { key: 'name', label: 'Nome', sortable: true, searchable: true },
  { key: 'className', label: 'Turma', sortable: true },
  {
    key: 'students',
    label: 'ALUNOS NO GRUPO',
    sortable: true,
    formatter: value => formatNumber(value),
  },
  /*  { key: 'sponsorEmail', label: 'PROFESSORES RESPONSÁVEIS', sortable: true },
      { key: 'status', label: 'COORDENADORES RESPONSÁVEIS', sortable: true }, */
  { key: 'actions', label: 'Ações', sortable: false },
]

const actions = [
  /*         {
    icon: 'pie_chart',
    tooltip: () => '',
    enableTo: [0, 3, 4],
    action: data => {
      // openTCT(data.evaluationId)
    },
  }, */
  {
    icon: 'visibility',
    tooltip: () => '',
    enableTo: [0, 3, 4],
    action: data => {
      openViewGroup(data)
    },
  },
  {
    icon: 'edit',
    tooltip: () => '',
    enableTo: [0, 3, 4],
    action: data => {
      editGroup(data.id)
    },
  },
  {
    icon: 'delete',
    class: 'text-danger',
    tooltip: () => '',
    action: data => {
      prepareDeleteGroup(data)
    },
  },
]

const { classe } = useFilters()

const groupsList = ref([])

const fetchData = () => {
  loading.value = true
  getGroups({ ClassId: classe.value.ClassId })
    .then(({ data }) => {
      groupsList.value = data
    })
    .finally(() => {
      loading.value = false
    })
}

const dataTable = computed(() => {
  if (props.showOnlyEmptyGroups) {
    return groupsList.value.filter(group => group.students === 0)
  }
  return groupsList.value
})

watch(
  () => classe.value,
  () => {
    fetchData()
  },
  { deep: true }
)

watch(
  () => selectedGroups.value,
  () => {
    emit('input', selectedGroups.value)
  }
)

fetchData()

const enableAction = () => true

const viewGroupIsOpen = ref(false)
const openViewGroup = data => {
  currentGroup.value = data
  viewGroupIsOpen.value = true
}

const confirmDeleteIsOpen = ref(false)
const prepareDeleteGroup = data => {
  currentGroup.value = data
  confirmDeleteIsOpen.value = true
}

const deleteG = async () => {
  loadingDelete.value = true
  const res = await deleteGroup(currentGroup.value.id)
  currentGroup.value = {}
  confirmDeleteIsOpen.value = false

  if (res.status === 200) {
    toast({
      component: Toast,
      props: {
        title: 'Grupo excluído com sucesso',
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })
  }

  loadingDelete.value = false
  fetchData()
}

const editGroup = groupId => {
  vm.$router.push({
    name: 'GroupEdit',
    params: {
      groupId,
    },
  })
}
</script>

<style lang="scss" scoped></style>