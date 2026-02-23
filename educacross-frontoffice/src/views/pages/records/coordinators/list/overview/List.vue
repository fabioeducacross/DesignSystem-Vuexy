<script setup>
import { UserStatusEnum } from '@/consts/UserStatusEnum'
import { getVariantByRule } from '@/consts/legends'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { initials } from '@/filters/filters'
import ListTable from '@/components/table/ListTable.vue'
import ListTableSelect from '@/components/table/ListTableSelect.vue'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ListItemsLimited from '@/views/pages/admin-context/shared/table-columns-components/ListItemsLimited.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import CreateCoordinatorsSidebar from '@/views/pages/records/coordinators/create/CreateCoordinatorsSidebar.vue'
import { useCoordinatorList } from '@/views/pages/records/coordinators/list/overview/useCoordinatorList'
import { computed, getCurrentInstance, onMounted, ref, onUnmounted } from 'vue'

const {
  refTable,
  loading,
  userRole,
  coordinators,
  actions,
  totalLicenses,
  usedLicenses,
  pagination,
  selectedData,
  resetAndfetch,
  allItensSelected,
  handleListCoordinators,
  handleListCoordinatorsOrderBy,
  sendEmailCoordinator,
  deleteRow,
} = useCoordinatorList()
const vm = getCurrentInstance().proxy

const tableColumns = ref([])
const refModalDelete = ref(null)

const layout = computed(() =>
  vm.$can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT) ? ListTableSelect : ListTable,
)

onMounted(() => {
  userRole.value = vm.$store.getters.accessRole
  if (userRole.value === 'Secretariat') {
    actions.value = [
      {
        icon: 'forward_to_inbox',
        color: 'text-primary',
        isEnabled: data =>
          !data.isIntegrator &&
          data.enabledSendEmail &&
          data.status !== UserStatusEnum[1].key,
        tooltip: (data, isEnabled) => {
          if (isEnabled) return 'Enviar e-mail'

          if (data.isIntegrator) return 'Não é possível enviar e-mail para usuário integrado.'
          if (!data.email) return 'O usuário não possui e-mail cadastrado.'
          if (data.status === 2) return 'Acesso já ativado.'
          if (!data.enabledSendEmail)
            return 'E-mail enviado, aguarde para fazer um novo envio.'

          return 'Usuário não habilitado para receber e-mails.'
        },
        isShow: () => true,
        action: data => {
          sendEmailCoordinator(data.id)
        },
      },
      {
        icon: 'edit',
        color: 'text-primary',
        isEnabled: data => !data.isIntegrator,
        isShow: () => true,
        tooltip: (_data, isEnabled) =>
          isEnabled ? 'Editar' : 'Usuário integrado não pode ser editado pela escola',
        action: data => {
          editRow(data.id)
        },
      },
      {
        icon: 'delete',
        color: 'text-danger',
        isEnabled: data => !data.isIntegrator,
        isShow: () => true,
        tooltip: (_data, isEnabled) =>
          isEnabled ? 'Excluir' : 'Usuário integrado não pode ser excluído pela escola.',
        action: data => {
          handleDelete(data)
        },
      },
    ]
    tableColumns.value = [
      { key: 'selected', label: 'Selecionado' },
      {
        key: 'name',
        label: 'Coordenador',
        componentName: 'NameWithPhoto',
        sortable: true,
      },
      { key: 'email', label: 'E-Mail', sortable: true },
      { key: 'classes', label: 'Turmas', componentName: 'Classes' },
      { key: 'status', label: 'Status', componentName: 'Status' },
      { key: 'actions', label: 'Ações' },
    ]
  } else {
    tableColumns.value = [
      {
        key: 'name',
        label: 'Coordenador',
        componentName: 'NameWithPhoto',
        sortable: true,
      },
      { key: 'email', label: 'E-Mail', sortable: true },
      { key: 'classes', label: 'Turmas', componentName: 'Classes' },
      { key: 'status', label: 'Status', componentName: 'Status' },
    ]
  }

  handleListCoordinators({ currentPage: 1 })
})

const openConfirmDelete = ref(false)
const selectedCoordinator = ref({})
const deleteLoading = ref(false)

const handleDelete = data => {
  openConfirmDelete.value = true
  selectedCoordinator.value = data
}

const deleteCoordinator = () => {
  deleteLoading.value = true
  deleteRow([selectedCoordinator.value.id], 1).then(() => {
    vm.$toast({
      component: Toast,
      props: {
        title: 'Usuário excluído com sucesso!',
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })

    deleteLoading.value = false
    openConfirmDelete.value = false
    selectedCoordinator.value = {}
  })
}

const sidebarActive = ref(false)
const itemToEdit = ref(null)

const changeSidebar = (val, classId = null) => {
  sidebarActive.value = val
  itemToEdit.value = classId
}

vm.$bus.on('changeSidebar', value => {
  changeSidebar(value)
})
onUnmounted(() => {
  vm.$bus.off('changeSidebar')
})

const editRow = idRow => {
  changeSidebar(true, idRow)
}
</script>

<template>
  <div>
    <component
      :is="layout"
      ref="refTable"
      v-model="selectedData"
      :data-table="coordinators"
      :total-data="pagination.total"
      :table-columns="tableColumns"
      :loading="loading"
      search-placeholder="Pesquisar por coordenador"
      @change="handleListCoordinatorsOrderBy"
    >
      <template #cell(name)="{ value }">
        <div class="d-flex align-items-center gap-2">
          <b-avatar :text="initials(value)" variant="info" />
          <span class="font-bold whitespace-no-wrap">{{ value }}</span>
        </div>
      </template>

      <template #cell(classes)="{ item }">
        <ListItemsLimited :data="item.classes" :limit="5">
          <template v-slot:item="{ data }">
            <b-badge variant="light-primary">
              {{ data.className }}
            </b-badge>
          </template>
          <template v-slot:excess="{ data }">
            <b-badge variant="light-primary" pill> +{{ data | formatNumber }} </b-badge>
          </template>
        </ListItemsLimited>
      </template>

      <template #cell(status)="{ item, value }">
        <b-badge
          v-if="item.isIntegrator"
          variant="light-secondary"
          class="text-secondary badge-integrated"
          pill
        >
          <div class="d-flex align-items-center justify-content-center gap-1">
            <span class="material-symbols-outlined" style="font-size: 14px"> sync_alt </span>
            <span>Integrado</span>
          </div>
        </b-badge>
        <b-badge v-else pill :variant="getVariantByRule(value, 'UserStatusEnum').variant">
          {{ getVariantByRule(value, 'UserStatusEnum').label }}
        </b-badge>
      </template>
      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center gap-3">
          <span
            v-for="(action, index) in actions"
            v-show="action.isShow(item)"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip(item, action.isEnabled(item))"
            :class="
              action.isEnabled(item)
                ? `${action.color} cursor-pointer`
                : 'cursor-not-allowed text-muted'
            "
            class="material-symbols-outlined"
            @click.stop="action.isEnabled(item) ? action.action(item) : null"
          >
            {{ action.icon }}
          </span>
        </div>
      </template>
    </component>

    <ModalConfirm
      v-model="openConfirmDelete"
      :callback-confirm="deleteCoordinator"
      :busy="deleteLoading"
      label-confirm="Excluir"
      icon="delete"
      icon-variant="danger"
      cancel-variant="outline-primary"
      confirm-variant="danger"
    >
      <h4 class="text-body">Tem certeza que deseja excluir?</h4>
      <p>
        <span class="text-primary font-bold">{{ selectedCoordinator.name }}</span> será excluído
        permanentemente.
      </p>
    </ModalConfirm>

    <CreateCoordinatorsSidebar :id="itemToEdit" v-model="sidebarActive" @refresh="resetAndfetch" />
  </div>
</template>
