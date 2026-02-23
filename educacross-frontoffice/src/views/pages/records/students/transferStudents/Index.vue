<template>
  <section>
    <SimpleTab v-if="$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)" />
    <b-row>
      <b-col cols="12" md="6">
        <!-- Table for current class -->
        <StudentTable
          ref="refCurrentClassTable"
          :current-class.sync="currentClass"
          :destination-class.sync="destinationClass"
          :is-destination="false"
          :transfer-from-institution="transferFromSchool"
          :transfer-from-school="transferFromSchool"
          :transfered-students="transferedStudents"
          @classChange="handleClassChange"
          @institutionChange="handleInstitutionChange"
          @transfer="handleTransfer"
        />
      </b-col>

      <b-col cols="12" md="6">
        <!-- Table for destination class -->
        <StudentTable
          ref="refDestinationClassTable"
          :current-class.sync="currentClass"
          :destination-class.sync="destinationClass"
          :is-destination="true"
          :transfer-from-institution="transferFromSchool"
          :transfer-from-school="transferFromSchool"
          :transfered-students.sync="transferedStudents"
          @classChange="handleClassChange"
          @institutionChange="handleInstitutionChange"
          @transfer="handleTransfer"
        />
      </b-col>
    </b-row>
    <portal to="fixed-sticky-footer-destination">
      <div id="footer-buttons" class="d-flex justify-content-center gap-1 bg-white p-1">
        <b-button variant="outline-danger" @click="prepareToCancel"> Cancelar </b-button>
        <span v-b-tooltip.top :disabled="!disableSaveButton" :title="disableSaveButtonMessge">
          <b-button
            :disabled="loading || disableSaveButton"
            variant="primary"
            @click="prepareToSave"
          >
            Salvar alterações <b-spinner v-show="loading" small variant="light" />
          </b-button>
        </span>
      </div>
    </portal>
    <ModalConfirm v-model="openConfirmSave" :callback-confirm="save" label-confirm="Sim, salvar!">
      <h4>Tem certeza que deseja salvar?</h4>
      <p v-if="openConfirmSave">
        Você está migrando
        <span class="text-primary font-bold"
          >{{ transferedStudents.length }} aluno{{ transferedStudents.length > 1 ? 's' : '' }}</span
        >
        para o
        <span class="text-primary font-bold">{{ destinationClass.name }}.</span>
      </p>
    </ModalConfirm>
    <ModalConfirm
      v-model="openConfirmExit"
      :callback-confirm="cancel"
      icon-variant="orange"
      confirm-variant="danger"
      cancel-variant="outline-primary"
      label-confirm="Sair e perder"
    >
      <h4 class="text-body">Tem certeza que deseja sair?</h4>
      <p>
        <span class="text-primary font-bold">Suas ações não foram salvas.</span> Ao sair, você
        perderá as alterações realizadas.
      </p>
    </ModalConfirm>
  </section>
</template>

<script setup>
import Toast from '../../../admin-context/shared/components/toast/Toast.vue'
import StudentTable from './StudentTable.vue'
import SimpleTab from '@/components/tab/SimpleTab.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import axiosIns from '@/libs/axios'
import store from '@/store'
import moduleStudentsTransfer from '@/store/pageModules/records/module-students-transfer.js'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import { useTransferStudents } from '@/views/pages/records/students/transferStudents/useTransferStudents.js'
import Vue, { computed, getCurrentInstance, ref, watch, onUnmounted } from 'vue'

const { moduleName, transferedStudents, moduleReset } = useTransferStudents()

store.registerModule(moduleName, moduleStudentsTransfer)

onUnmounted(() => {
  moduleReset()
  store.unregisterModule(moduleName)
})

const vm = getCurrentInstance().proxy

const refDestinationClassTable = ref(null)
const refCurrentClassTable = ref(null)

const destinationInstitution = ref(null)
const currentInstitution = ref(null)
const destinationClass = ref(null)
const currentClass = ref(null)
const loading = ref(false)
const openConfirmExit = ref(false)

const transferFromSchool = computed(() =>
  vm.$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER),
)

const handleTransfer = async (students, isDestination) => {
  if (isDestination) {
    // Remove student from destination class
    const filteredData = transferedStudents.value.filter(
      item => !students.some(student => student.id === item.id),
    )
    transferedStudents.value = filteredData
  } else {
    transferedStudents.value = transferedStudents.value.concat(...students)
  }
}

const handleClassChange = (classe, isDestination) => {
  if (isDestination) {
    destinationClass.value = classe
  } else {
    currentClass.value = classe
  }
}

const save = () => {
  loading.value = true
  openConfirmSave.value = false

  let apiUrl = '/v1/students/move'

  if (transferFromSchool.value) {
    apiUrl = '/v1/students/transfer'
  }

  axiosIns
    .put(apiUrl, {
      institutionId: currentInstitution.value,
      classId: destinationClass.value.id,
      newInstitutionId: destinationInstitution.value,
      studentsIds: transferedStudents.value.map(item => item.id),
    })
    .then(() => {
      Vue.$toast({
        component: Toast,
        props: {
          title: 'Migração feita com sucesso!',
          variant: 'success',
          icon: 'CheckCircleIcon',
        },
      })

      refDestinationClassTable.value.reset()
      refCurrentClassTable.value.reset()
      transferedStudents.value = []
    })
    .finally(() => {
      loading.value = false
    })
}

const prepareToCancel = () => {
  openConfirmExit.value = true
}

const cancel = () => {
  refDestinationClassTable.value.reset()
  refCurrentClassTable.value.reset()
  transferedStudents.value = []
  openConfirmExit.value = false
}

const disableSaveButton = computed(() => {
  return (
    !destinationClass.value?.id || !transferedStudents.value.length
  )
})

const disableSaveButtonMessge = computed(() => {
  if (!destinationClass.value?.id) {
    return 'Selecione uma turma de destino'
  }
  if (!transferedStudents.value.length) {
    return 'Selecione pelo menos um aluno'
  }
  return null
})

const handleInstitutionChange = (id, isDestination) => {
  if (isDestination) {
    destinationInstitution.value = id
  } else {
    currentInstitution.value = id
  }
}

const openConfirmSave = ref(false)

const prepareToSave = () => {
  openConfirmSave.value = true
}

watch(transferedStudents, () => {
  vm.$bus.emit('showConfirmExit', transferedStudents.value.length > 0)
})

</script>