<template>
  <section>
    <!-- LIST -->
    <component
      :is="layout"
      ref="tableRef"
      v-model="selectedData"
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="Pesquisar por professor"
      @change="changeListTable"
    >
      <template #cell(name)="{ item }">
        <div class="d-flex align-items-center">
          <b-avatar variant="info" :text="initials(item.name)" />
          <span class="ml-50 font-bold">{{ item.name }}</span>
        </div>
      </template>
      <template #cell(status)="{ item }">
        <b-badge
          v-if="item.isIntegrator"
          variant="light-secondary"
          class="text-secondary badge-integrated"
          pill
        >
          <div class="d-flex align-items-center justify-content-center gap-1">
            <span class="material-symbols-outlined" style="font-size: 14px"> sync_alt </span>
            <span>Integrada</span>
          </div>
        </b-badge>

        <b-badge
          v-else-if="EApplicationUserStatusEnum[item.status]"
          pill
          :variant="`light-${EApplicationUserStatusEnum[item.status].variant}`"
        >
          {{ EApplicationUserStatusEnum[item.status].label }}
        </b-badge>
      </template>

      <template #cell(classes)="{ item }">
        <ListItemsLimited :data="item.classes" :limit="5">
          <template v-slot:item="{ data }">
            <b-badge variant="light-primary">
              {{ data.className }}
            </b-badge>
          </template>
          <template v-slot:excess="{ data }">
            <b-badge variant="light-primary" pill> +{{ data | formatNumber }}</b-badge>
          </template>
        </ListItemsLimited>
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center gap-3">
          <span
            v-for="(action, index) in tableActions"
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
      :callback-confirm="deleteTeacher"
      :busy="deleteLoading"
      label-confirm="Excluir"
      icon="delete"
      icon-variant="danger"
      cancel-variant="outline-primary"
      confirm-variant="danger"
    >
      <h4 class="text-body">Tem certeza que deseja excluir?</h4>
      <p>
        <span class="text-primary font-bold">{{ selectedTeacher.name }}</span> será excluído
        permanentemente.
      </p>
    </ModalConfirm>
  </section>
</template>

<script setup>
import {
  EApplicationUserStatusEnum,
  EApplicationUserStatus,
} from '@/consts/EApplicationUserStatus.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { initials } from '@/filters/filters.js'
import router from '@/router'
import ListTable from '@/components/table/ListTable.vue'
import ListTableSelect from '@/components/table/ListTableSelect.vue'
import { deleteProfessors } from '@/services/admin-context/professor/Professor.service'
import { sendEmail } from '@/services/shared/accesses/Accesses.service'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ListItemsLimited from '@/views/pages/admin-context/shared/table-columns-components/ListItemsLimited.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import { useRecordsTeachers } from '@/views/pages/records/teachers/list/overview/useRecordsTeachers.js'
import { computed, getCurrentInstance, ref } from 'vue'

const {
  selectedData,
  params,
  loading,
  totalData,
  tableRef,
  dataTable,
  fetch,
  resetAndfetch,
  openSidebarCreateOrEdit,
} = useRecordsTeachers()

const vm = getCurrentInstance().proxy

const layout = computed(() =>
  vm.$can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT) ? ListTableSelect : ListTable,
)

const tableColumns = computed(() => {
  const columns = [
    {
      key: 'name',
      label: 'PROFESSOR',
      sortable: true,
      searchable: true,
    },
    { key: 'email', label: 'E-MAIL', sortable: true },
    { key: 'classes', label: 'TURMAs', sortable: false, thStyle: { width: '400px' } },
    { key: 'status', label: 'status', sortable: false, thStyle: { width: '120px' } },
  ]

  if (vm.$can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT)) {
    columns.push({
      key: 'actions',
      label: 'Ações',
      thStyle: { width: '120px' },
    })
  }

  return columns
})

const tableActions = [
  {
    icon: 'forward_to_inbox',
    tooltip: (data, isEnabled) => {
      if (isEnabled) return 'Enviar e-mail'

      if (data.isIntegrator) return 'Não é possível enviar e-mail para usuário integrado.'
      if (data.status === EApplicationUserStatus.Active) return 'Acesso já ativado.'
      if (!data.enabledSendEmail) return 'E-mail enviado, aguarde para fazer um novo envio.'

      return 'Usuário não habilitado para receber e-mails.'
    },
    isEnabled: item =>
      item.status === EApplicationUserStatus.Pending &&
      !item.isIntegrator &&
      item.enabledSendEmail,
    isShow: () => true,
    color: 'text-primary',
    action: data => {
      sendEmail(data.id)
        .then(() => {
          vm.$toast({
            component: Toast,
            props: {
              title: 'E-mail enviado com sucesso!',
              icon: 'CheckCircleIcon',
              variant: 'success',
            },
          })
        })
        .finally(() => {
          resetAndfetch()
        })
    },
  },
  {
    icon: 'edit',
    tooltip: (_data, isEnabled) =>
      isEnabled ? 'Editar' : 'Usuário integrado não pode ser editado pela escola',
    isEnabled: item => !item.isIntegrator,
    isShow: () => true,
    color: 'text-primary',
    action: data => {
      openSidebarCreateOrEdit(data.id)
    },
  },
  {
    icon: 'delete',
    tooltip: (_data, isEnabled) =>
      isEnabled ? 'Excluir' : 'Usuário integrado não pode ser excluído pela escola.',
    isEnabled: item => !item.isIntegrator,
    isShow: () => true,
    color: 'text-danger',
    action: data => {
      handleDelete(data)
    },
  },
]

const changeListTable = data => {
  params.value = data
  fetch()
}

fetch()

const openConfirmDelete = ref(false)
const selectedTeacher = ref({})
const deleteLoading = ref(false)

const handleDelete = data => {
  openConfirmDelete.value = true
  selectedTeacher.value = data
}

const deleteTeacher = () => {
  deleteLoading.value = true
  deleteProfessors([selectedTeacher.value.id], 1).then(() => {
    vm.$toast({
      component: Toast,
      props: {
        text: 'Usuário excluído com sucesso!',
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })
    deleteLoading.value = false
    openConfirmDelete.value = false
    selectedTeacher.value = {}
    resetAndfetch()
  })
}
</script>