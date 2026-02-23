<template>
  <section>
    <b-row>
      <b-col cols="12" sm>
        <Licenses />
      </b-col>

      <b-col v-if="$can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT)" cols="12" sm="auto">
        <b-form-group label-for="button">
          <b-dropdown
            v-b-tooltip.hover.top="
              selectedData.batchAction === 1 && selectedData.value.length <= 1
                ? 'Selecione 2 ou mais professores para realizar essa ação'
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
import ESelect from '@/components/selects/ESelect.vue'
import { EApplicationUserStatusEnum } from '@/consts/EApplicationUserStatus.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { postTeacherExcluded } from '@/services/admin-context/professor/Professor.service'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import Licenses from '@/views/pages/records/teachers/list/trash/Licenses.vue'
import { useRecordsTeachers } from '@/views/pages/records/teachers/list/trash/useRecordsTeachers.js'
import { ref, getCurrentInstance } from 'vue'

const vm = getCurrentInstance().proxy
const { selectedData, status, resetAndfetch, params } = useRecordsTeachers()

const massUndoDelete = async () => {
  const data = []
  const batchAction = selectedData.value.batchAction

  if (batchAction === 1) {
    selectedData.value.value.forEach(item => data.push(item.id))
  }

  const formData = {
    teachersIds: data,
    search: params.value.Search,
    batchAction,
  }

  postTeacherExcluded(formData).then(() => {
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
</script>

<style lang="scss" scoped></style>