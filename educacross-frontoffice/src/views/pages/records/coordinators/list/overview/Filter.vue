<script>
export default {
  name: 'CoordinatorFilters',
}
</script>

<template>
  <b-card>
    <b-row>
      <b-col cols="12" sm>
        <b-form-group label-for="select-status" label="Status">
          <ESelect
            id="select-status"
            v-model="status"
            :options="statusFilterOptions"
            label="label"
            @change="handleChangeStatus"
          ></ESelect>
        </b-form-group>
      </b-col>
      <b-col v-if="$can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT)" cols="12" sm="auto">
        <b-form-group label-for="new">
          <template v-slot:label>
            <span class="d-none d-sm-inline-block"> &nbsp;</span>
          </template>
          <div
            v-b-tooltip="
              haveLicensesAvailable
                ? ''
                : 'Não há licenças disponíveis. Libere cadastro excluindo coordenadores ou contate o nosso suporte.'
            "
          >
            <b-button
              id="new"
              variant="primary"
              class="whitespace-no-wrap"
              block
              size="sm"
              :disabled="!haveLicensesAvailable"
              @click="handleCreateClick"
            >
              <span class="material-symbols-outlined align-middle" style="font-size: 22px"
                >add_circle</span
              >
              <span class="align-middle whitespace-no-wrap"> Novo coordenador</span>
            </b-button>
          </div>
        </b-form-group>
      </b-col>
      <b-col
        v-if="
          $can(ACTION.CREATE, PERMISSION.GENERAL.BETA_FEATURES) &&
          $can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT)
        "
        cols="12"
        sm="auto"
      >
        <b-form-group label-for="import">
          <template v-slot:label>
            <span> &nbsp;</span>
          </template>
          <div
            v-b-tooltip="
              haveLicensesAvailable
                ? ''
                : 'Não há licenças disponíveis. Libere cadastro excluindo coordenadores ou contate o nosso suporte.'
            "
          >
            <b-button
              id="import"
              variant="primary"
              class="whitespace-no-wrap"
              block
              size="sm"
              :disabled="!haveLicensesAvailable"
              @click="gotoImport"
            >
              <span class="material-symbols-outlined align-middle" style="font-size: 22px"
                >upload_file</span
              >
              <span class="align-middle"> Importar</span>
            </b-button>
          </div>
        </b-form-group>
      </b-col>
      <b-col v-if="$can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT)" cols="12" sm="auto">
        <b-form-group label-for="mass-actions">
          <template v-slot:label>
            <span> &nbsp;</span>
          </template>
          <b-dropdown
            id="mass-actions"
            v-b-tooltip.hover.top="
              selectedData.batchAction === 1 && selectedData.value.length <= 1
                ? 'Selecione 2 ou mais coordenadores para realizar essa ação'
                : ''
            "
            block
            variant="outline-primary"
            text="Ações em Lote"
            :disabled="selectedData.value.length <= 1 && selectedData.batchAction === 1"
          >
            <b-dropdown-item variant="danger" @click="handleMassDelete">
              <span class="material-symbols-outlined align-middle font-14"> delete </span>
              <span class="align-middle"> Excluir coordenadores</span>
            </b-dropdown-item>
          </b-dropdown>
        </b-form-group>
      </b-col>
    </b-row>
    <ModalConfirm
      v-model="openConfirmMassDelete"
      :callback-confirm="massDelete"
      label-confirm="Excluir"
      icon="delete"
      icon-variant="danger"
      cancel-variant="outline-primary"
      confirm-variant="danger"
      :busy="deleteLoading"
    >
      <h4 class="text-body">Tem certeza que deseja excluir?</h4>
      <p>
        <span class="text-primary font-bold">Os {{ massDeleteMessage }}</span> serão excluídos
        permanentemente.
      </p>
    </ModalConfirm>
  </b-card>
</template>

<script setup>
import { useCoordinatorList } from './useCoordinatorList'
import ESelect from '@/components/selects/ESelect.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { useRoute, useRouter } from 'vue-router/composables'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import { getCurrentInstance, ref } from 'vue'

const { 
  statusFilter,
  statusFilterOptions,
  params,
  status,
  selectedData,
  haveLicensesAvailable,
  totalUsers,
  handleListCoordinators,
  deleteRow,
  resetPage,
} = useCoordinatorList()

const vm = getCurrentInstance().proxy
const router = useRouter()

const openConfirmMassDelete = ref(false)
const massDeleteMessage = ref('')
const deleteLoading = ref(false)

const handleCreateClick = () => {
  vm.$bus.emit('changeSidebar', true)
}

const handleChangeStatus = () => {
  resetPage()
  handleListCoordinators()
}

const gotoImport = () => {
  router.push({ name: 'importCoordinatorsAdmin' })
}

const handleMassDelete = () => {
  openConfirmMassDelete.value = true
  massDeleteMessage.value = `${
    selectedData.value.batchAction === 1 ? selectedData.value.value.length : totalUsers.value
  } coordenadores`
}

const massDelete = async () => {
  deleteLoading.value = true
  const data = []
  const batchAction = selectedData.value.batchAction
  if (batchAction === 1) {
    selectedData.value.value.forEach(manager => data.push(manager.id))
  }
  deleteRow(data, batchAction)
  vm.$toast({
    component: Toast,
    props: {
      title: 'Usuário(s) excluído(s) com sucesso!',
      icon: 'CheckCircleIcon',
      variant: 'success',
    },
  })

  deleteLoading.value = false
  openConfirmMassDelete.value = false
  selectedData.value = {
    value: [],
    batchAction: 1,
  }
}

// Make enums available for template (script setup: expose on top-level)
defineExpose()
</script>
