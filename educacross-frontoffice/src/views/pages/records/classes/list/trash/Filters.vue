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
        <b-col cols="12" sm="auto">
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
    </b-card>
  </section>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { ACTION, PERMISSION } from '@/consts/permissions.js'
import { postClassesExcluded } from '@/services/shared/classes/Classes.service'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import { useRecordsClassesTrash } from '@/views/pages/records/classes/list/trash/useRecordsClassesTrash.js'
import { getCurrentInstance, computed } from 'vue'

const vm = getCurrentInstance().proxy
const {
  selectedData,
  resetAndfetch,
  availableLicenses,
  serie,
  schoolYears,
  schoolYearsLoading,
  fetchSeries,
  params,
} = useRecordsClassesTrash()

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

const massUndoDelete = async () => {
  const data = []
  const batchAction = selectedData.value.batchAction

  if (batchAction === 1) {
    selectedData.value.value.forEach(classe => data.push(classe.id))
  }

  const formData = {
    classIds: data,
    serieIds: serie.value.id ? [serie.value.id] : [],
    className: params.value.Search,
    batchAction,
  }

  postClassesExcluded(formData).then(() => {
    vm.$toast({
      component: Toast,
      props: {
        title: 'Exclusão desfeita com sucesso!',
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })

    selectedData.value = {
      value: [],
      batchAction: 1,
    }
    resetAndfetch()
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