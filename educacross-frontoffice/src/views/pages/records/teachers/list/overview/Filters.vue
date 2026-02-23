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
        <b-col v-if="$can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT)" cols="12" sm="auto">
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
                Novo professor
              </b-button>
            </span>
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
        <b-col v-if="$can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT)" cols="12" sm="auto">
          <b-form-group label-for="button">
            <template v-slot:label>
              <span class="d-none d-sm-inline-block"> &nbsp;</span>
            </template>
            <b-dropdown
              v-b-tooltip.hover.top="
                selectedData.batchAction === 1 && selectedData.value.length <= 1
                  ? 'Selecione 2 ou mais professores para realizar essa ação'
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
                Excluir professores
              </b-dropdown-item>
            </b-dropdown>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
    <CreateProfessor ref="refCreateProfessor" />
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
  </section>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { EApplicationUserStatusEnum } from '@/consts/EApplicationUserStatus.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import router from '@/router'
import { deleteProfessors } from '@/services/admin-context/professor/Professor.service'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import CreateProfessor from '@/views/pages/records/teachers/create/CreateProfessor.vue'
import { useRecordsTeachers } from '@/views/pages/records/teachers/list/overview/useRecordsTeachers.js'
import { ref, getCurrentInstance } from 'vue'

const vm = getCurrentInstance().proxy
const {
  refCreateProfessor,
  selectedData,
  status,
  totalData,
  resetAndfetch,
  availableLicenses,
  openSidebarCreateOrEdit,
} = useRecordsTeachers()

const tooltipText =
  'Não há licenças disponíveis. Libere cadastro excluindo professores ou contate o nosso suporte.'

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
  selectedData.value = {
    value: [],
    batchAction: 1,
  }
  resetAndfetch()
}

const handleImportClick = () => {
  router.push({
    name: 'importProfessorAdmin',
  })
}

const openConfirmMassDelete = ref(false)
const massDeleteMessage = ref('')
const deleteLoading = ref(false)

const handleMassDelete = () => {
  openConfirmMassDelete.value = true

  massDeleteMessage.value = `${
    selectedData.value.batchAction === 1 ? selectedData.value.value.length : totalData.value
  } professores`
}

const massDelete = async () => {
  deleteLoading.value = true
  const data = []
  const batchAction = selectedData.value.batchAction

  if (batchAction === 1) {
    selectedData.value.value.forEach(professor => data.push(professor.id))
  }

  deleteProfessors(data, batchAction, status.value.id).then(() => {
    vm.$toast({
      component: Toast,
      props: {
        text: 'Usuário(s) excluído(s) com sucesso!',
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