<template>
  <section>
    <b-card>
      <b-row>
        <b-col cols="12" sm>
          <b-form-group label="Ano Escolar" label-for="schoolYear">
            <ESelect
              id="schoolYear"
              label="name"
              :value="serie"
              :options="schoolYears"
              :clearable="false"
              :loading="schoolYearsLoading"
              :disabled="schoolYearsLoading"
              @input="setschoolYear"
            >
            </ESelect>
          </b-form-group>
        </b-col>
        <b-col
          v-if="
            $can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT) &&
            $can(ACTION.DELETE, PERMISSION.GENERAL.MANAGE_CLASSES)
          "
          cols="12"
          sm="auto"
        >
          <b-form-group label-for="new">
            <template v-slot:label>
              <span class="d-none d-sm-inline-block"> &nbsp;</span>
            </template>

            <b-button variant="primary" block @click="handleCreateClick">
              <span
                class="material-symbols-outlined"
                style="font-size: 14px; vertical-align: bottom"
              >
                add_circle
              </span>
              Nova turma
            </b-button>
          </b-form-group>
        </b-col>
        <b-col
          v-if="
            $can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT) &&
            $can(ACTION.READ, PERMISSION.GENERAL.BETA_FEATURES)
          "
          cols="12"
          sm="auto"
        >
          <b-form-group label-for="import">
            <template v-slot:label>
              <span class="d-none d-sm-inline-block"> &nbsp;</span>
            </template>

            <b-button variant="primary" block @click="handleImportClick">
              <span
                class="material-symbols-outlined"
                style="font-size: 14px; vertical-align: bottom"
              >
                upload_file
              </span>

              Importar
            </b-button>
          </b-form-group>
        </b-col>
        <b-col
          v-if="
            $can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT) &&
            $can(ACTION.DELETE, PERMISSION.GENERAL.MANAGE_CLASSES)
          "
          cols="12"
          sm="auto"
        >
          <b-form-group label-for="button">
            <template v-slot:label>
              <span class="d-none d-sm-inline-block"> &nbsp;</span>
            </template>
            <b-dropdown
              v-b-tooltip.hover.top="
                selectedData.batchAction === 1 && selectedData.value.length <= 1
                  ? 'Selecione 2 ou mais turmas para realizar essa ação'
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
                Excluir turmas
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
        <span class="text-primary font-bold">As {{ massDeleteMessage }}</span> serão excluídos
        permanentemente.
      </p>

      <b-alert :show="showAlert" variant="danger">
        <div class="alert-body font-normal d-flex align-items-center gap-2">
          <span class="material-symbols-outlined" style="font-size: 16px"> info </span>
          <span class="text-left">
            Atenção! Turmas integradas ou com alunos não podem ser excluídas.</span
          >
        </div>
      </b-alert>
    </ModalConfirm>

    <ImportClassesIndex />
  </section>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { ACTION, PERMISSION } from '@/consts/permissions.js'
import { deleteClasses } from '@/services/shared/classes/Classes.service'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import ImportClassesIndex from '@/views/pages/records/classes/import/Index.vue'
import { useImportClasses } from '@/views/pages/records/classes/import/useImportClasses'
import { useRecordsClasses } from '@/views/pages/records/classes/list/overview/useRecordsClasses.js'
import { ref, getCurrentInstance, computed } from 'vue'

const vm = getCurrentInstance().proxy
const { showImport } = useImportClasses()

const {
  selectedData,
  totalData,
  resetAndfetch,
  availableLicenses,
  serie,
  schoolYears,
  schoolYearsLoading,
  fetchSeries,
} = useRecordsClasses()

serie.value = { id: null, name: 'Todos os anos' }
fetchSeries()

const setschoolYear = value => {
  serie.value = value
  selectedData.value = {
    value: [],
    batchAction: 1,
  }
  resetAndfetch()
}

const handleCreateClick = () => {
  vm.$bus.emit('changeSidebar', true)
}
const handleImportClick = () => {
  showImport()
}

const openConfirmMassDelete = ref(false)
const massDeleteMessage = ref('')
const deleteLoading = ref(false)

const handleMassDelete = () => {
  openConfirmMassDelete.value = true

  massDeleteMessage.value = `${
    selectedData.value.batchAction === 1 ? selectedData.value.value.length : totalData.value
  } turmas`
}

const massDelete = async () => {
  deleteLoading.value = true
  const data = []
  const batchAction = selectedData.value.batchAction

  if (batchAction === 1) {
    selectedData.value.value.forEach(item => {
      if (!item.students) data.push(item.id)
    })
  }

  deleteClasses(data, batchAction, serie.value.id)
    .then(() => {
      vm.$toast({
        component: Toast,
        props: {
          title: 'Turma(s) excluída(s) com sucesso!',
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
    .catch(() => {
      deleteLoading.value = false
      openConfirmMassDelete.value = false
    })
}

const showAlert = computed(() => {
  return (
    selectedData.value.batchAction === 2 ||
    selectedData.value.value.some(item => item.isIntegrator || item.students)
  )
})
</script>

<style lang="scss" scoped></style>