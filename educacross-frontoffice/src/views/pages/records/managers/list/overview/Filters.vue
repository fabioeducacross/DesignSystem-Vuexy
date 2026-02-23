<template>
  <section>
    <b-card>
      <b-row>
        <b-col cols="12" sm>
          <b-form-group label="Status" label-for="Status">
            <ESelect
              id="Status"
              label="name"
              :value="status"
              :options="StatusOptions"
              :clearable="false"
              @input="setStatus"
            >
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="auto">
          <b-form-group label-for="new">
            <template v-slot:label>
              <span class="d-none d-sm-inline-block"> &nbsp;</span>
            </template>
            <span v-b-tooltip.hover="availableLicenses ? '' : tooltipText" label-for="button">
              <b-button
                variant="primary"
                block
                :disabled="!availableLicenses"
                @click="openSidebarCreateOrEdit()"
              >
                <span
                  class="material-symbols-outlined"
                  style="font-size: 14px; vertical-align: bottom"
                >
                  add_circle
                </span>
                Novo diretor
              </b-button>
            </span>
          </b-form-group>
        </b-col>
        <b-col v-if="$can(ACTION.CREATE, PERMISSION.GENERAL.BETA_FEATURES)" cols="12" sm="auto">
          <b-form-group label-for="import">
            <template v-slot:label>
              <span class="d-none d-sm-inline-block"> &nbsp;</span>
            </template>
            <span v-b-tooltip.hover="availableLicenses ? '' : tooltipText" label-for="button">
              <b-button
                variant="primary"
                block
                :disabled="!availableLicenses"
                @click="handleImportClick"
              >
                <span
                  class="material-symbols-outlined"
                  style="font-size: 14px; vertical-align: bottom"
                >
                  upload_file
                </span>

                Importar
              </b-button>
            </span>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="auto">
          <b-form-group label-for="button">
            <template v-slot:label>
              <span class="d-none d-sm-inline-block"> &nbsp;</span>
            </template>
            <b-dropdown
              v-b-tooltip.hover.top="
                selectedData.batchAction === 1 && selectedData.value.length <= 1
                  ? 'Selecione 2 ou mais diretores para realizar essa ação'
                  : ''
              "
              block
              variant="outline-primary"
              text="Ações em Lote"
              :disabled="selectedData.batchAction === 1 && selectedData.value.length <= 1"
            >
              <b-dropdown-item variant="danger" @click="handleMassDelete">
                <span
                  class="material-symbols-outlined"
                  style="font-size: 14px; vertical-align: baseline"
                >
                  delete
                </span>
                Excluir diretores
              </b-dropdown-item>
            </b-dropdown>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
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
    <CreateDirector ref="refCreateManager" />
  </section>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { EApplicationUserStatusEnum } from '@/consts/EApplicationUserStatus.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import router from '@/router'
import { deleteManagersV2 } from '@/services/admin-context/directors/Directors.service.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import CreateDirector from '@/views/pages/records/managers/create/CreateDirector.vue'
import { useRecordsManagers } from '@/views/pages/records/managers/list/overview/useRecordsManagers.js'
import { ref, getCurrentInstance } from 'vue'

// Access instance for $toast
const vm = getCurrentInstance().proxy

const {
  refCreateManager,
  selectedData,
  status,
  totalData,
  resetAndfetch,
  availableLicenses,
  openSidebarCreateOrEdit,
} = useRecordsManagers()

const tooltipText =
  'Não há licenças disponíveis. Libere cadastro excluindo diretores ou contate o nosso suporte.'

const StatusOptions = [
  {
    id: null,
    name: 'Todos os status',
  },
  ...Object.values(EApplicationUserStatusEnum).map(status => ({
    id: status.id,
    name: status.label,
  })),
]

const setStatus = value => {
  status.value = value
  resetAndfetch()
}

const handleImportClick = () => {
  router.push({
    name: 'importDirectorAdmin',
  })
}

const openConfirmMassDelete = ref(false)
const massDeleteMessage = ref('')
const deleteLoading = ref(false)

const handleMassDelete = () => {
  openConfirmMassDelete.value = true

  massDeleteMessage.value = `${
    selectedData.value.batchAction === 1 ? selectedData.value.value.length : totalData.value
  } diretores`
}

const massDelete = async () => {
  deleteLoading.value = true
  const data = []
  const batchAction = selectedData.value.batchAction

  if (batchAction === 1) {
    selectedData.value.value.forEach(manager => data.push(manager.id))
  }

  deleteManagersV2(data, batchAction).then(() => {
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
    resetAndfetch()
  })
}
</script>

<style lang="scss" scoped></style>