<template>
  <section>
    <b-row>
      <b-col cols="12" sm>
        <Licenses />
      </b-col>

      <b-col cols="12" sm="auto">
        <b-form-group label-for="button">
          <b-dropdown
            v-b-tooltip.hover.top="
              selectedData.batchAction === 1 && selectedData.value.length <= 1
                ? 'Selecione 2 ou mais coordenadores para realizar essa ação'
                : ''
            "
            block
            variant="primary"
            text="Ações em Lote"
            :disabled="selectedData.batchAction === 1 && selectedData.value.length <= 1"
          >
            <b-dropdown-item variant="primary" @click="massUndoDelete">
              <span
                class="material-symbols-outlined"
                style="font-size: 14px; vertical-align: baseline"
              >
                undo
              </span>
              Desfazer exclusão
            </b-dropdown-item>
          </b-dropdown>
        </b-form-group>
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
import { postCoordinatorsExcluded } from '@/services/admin-context/coordinators/Coordinators.service.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import Licenses from '@/views/pages/records/coordinators/list/trash/Licenses.vue'
import { useRecordsCoordinators } from '@/views/pages/records/coordinators/list/trash/useRecordsCoordinators.js'
import { getCurrentInstance } from 'vue'

// Setup
const vm = getCurrentInstance().proxy
const { selectedData, resetAndfetch, params } = useRecordsCoordinators()

const massUndoDelete = async () => {
  const data = []
  const batchAction = selectedData.batchAction

  if (batchAction === 1) {
    selectedData.value.forEach(item => data.push(item.id))
  }

  const formData = {
    CoordinatorsIds: data,
    search: params.Search,
    batchAction,
  }

  postCoordinatorsExcluded(formData).then(() => {
    vm.$toast({
      component: Toast,
      props: {
        title: 'Exclusão desfeita com sucesso!',
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })

    selectedData.value = []
    selectedData.batchAction = 1
    resetAndfetch()
  })
}
</script>

<style lang="scss" scoped></style>