<template>
  <section>
    <!-- LIST -->
    <ListTable
      ref="tableRef"
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="data"
      :total-data="totalData"
      search-placeholder="searchForStudent"
      :generating-excel="generatingExcel"
      :export-to-excel="exportToExcel"
      @change="changeListTable"
    >
      <template v-for="(apply, index) in cards" #[`cell(apply-${apply.apply})`]="{ value, item }">
        <template>
          <div
            v-if="value.error"
            :key="index"
            class="position-absolute h-full w-full inset-0 d-flex align-items-center justify-content-center flex-column gap-1 text-uppercase"
          >
            <span class="d-flex align-items-center gap-2 flex-nowrap">
              <b-badge variant="light-danger" pill> Problema identificado </b-badge>
              <span
                v-b-tooltip="'Entre em contato com o nosso suporte para solucionar o problema.'"
                class="material-symbols-outlined text-danger"
                style="font-size: 18px"
              >
                info
              </span>
            </span>
            <div v-if="value.createdAt" class="d-flex align-items-center" :class="`text-danger`">
              <span class="font-bold">{{ value.createdAt | formatDate }}</span>
            </div>
          </div>

          <div
            v-else-if="value === false"
            :key="index"
            class="d-flex align-items-center justify-content-center"
          >
            <b-badge
              pill
              :variant="`light-secondary`"
              :class="`text-uppercase px-2 py-25 d-flex align-items-center justify-content-center gap-1 badge-not-enabled`"
            >
              NÃO REALIZADA
            </b-badge>
          </div>

          <div v-else :key="index" class="d-flex align-items-center justify-content-center">
            <StagesChange
              :current-phase="value"
              :student-name="item.name"
              :student-id="item.id"
              @change="writingStages => updateWritingStages(item.id, writingStages, value)"
            />
          </div>
        </template>
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center gap-3">
          <span
            v-for="(action, index) in tableActions"
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
    </ListTable>
    <TestRegisterModal v-model="modalRegister" :data="registerData" @reload="resetAndfetch" />
  </section>
</template>

<script setup>
import BadgeStatus from '@/components/badge/BadgeStatus.vue'
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import ListTable from '@/components/table/ListTable.vue'
import { proficiencyWithNotCompleted } from '@/consts/legends/proficiencyEnum.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import router from '@/router'
import { putWritingStagesStudentEvaluate } from '@/services/shared/writing-stages/writing-stages.Service.js'
import useFilters from '@/store/filters/useFilters'
import useTable from '@/store/table/useTable.js'
import { formatDecimalPlace } from '@/utils/number.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import StagesChange from '@/views/pages/writing-phases/components/StagesChange.vue'
import TestRegisterModal from '@/views/pages/writing-phases/components/TestRegisterModal.vue'
import { useWritingStagesStudents } from '@/views/pages/writing-phases/students/useWritingStagesStudents.js'
import { computed, getCurrentInstance, ref, watch } from 'vue'

const { params, loading, totalData, tableRef } = useTable()
const { fetch, resetAndfetch, cards, data, generatingExcel, exportToExcel } =
  useWritingStagesStudents()

const { classe } = useFilters()
const vm = getCurrentInstance().proxy

const cardFocus = ref(null)

const tableColumns = computed(() => {
  const applys = cards.value.map(value => {
    return {
      key: `apply-${value.apply}`,
      label: value.applyName,
      class: 'position-relative',
      thStyle: { minWidth: '240px', textAlign: 'center' },
    }
  })

  const columns = [
    {
      key: 'name',
      label: 'ALUNO',
      sortable: true,
      searchable: true,
      tdClass: 'font-bold',
      thStyle: { minWidth: '140px' },
    },
    ...applys,
  ]

  if (vm.$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)) {
    columns.push({
      key: 'actions',
      label: 'Ações',
      sortable: false,
      thStyle: { width: '120px' },
    })
  }

  return columns
})

const tableActions = [
  {
    icon: 'add_photo_alternate',
    color: 'text-primary',
    isEnabled: data => {
      return data.enabled
    },
    tooltip: () => 'Imagem do teste',

    action: data => {
      openModalRegister(data, 'image')
    },
  },
  {
    icon: 'add_notes',
    color: 'text-primary',
    isEnabled: data => {
      return data.enabled
    },
    tooltip: () => 'Notas gerais',

    action: data => {
      openModalRegister(data, 'text')
    },
  },
  {
    icon: 'checklist_rtl',
    color: 'text-primary',
    isEnabled: () => {
      return true
    },
    tooltip: () => 'Todos os registros',

    action: data => {
      openReport(data.id)
    },
  },
]

const changeListTable = data => {
  params.value = data
  fetch()
}

const modalRegister = ref(false)
const registerData = ref(null)

const openModalRegister = (data, type) => {
  modalRegister.value = true

  registerData.value = {
    studentId: data.id,
    studentName: data.name,
    type,
    applications: data.applications,
  }
}

const openReport = studentId => {
  router.push({
    name: 'WritingPhasesStudentDetail',
    params: { studentId },
  })
}

const updateWritingStages = (studentId, stage, phase) => {
  const formData = new FormData()

  formData.append('StudentId', studentId)
  formData.append('ClassId', classe.value.ClassId)

  const index = 0

  formData.append(`Applies[${index}].apply`, phase.apply)
  formData.append(`Applies[${index}].writingStagesTestId`, phase.writingStagesTestId)
  formData.append(`Applies[${index}].stage`, stage)

  putWritingStagesStudentEvaluate(formData)
    .then(() => {
      vm.$toast({
        component: Toast,
        props: {
          title: 'Alterado com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
      resetAndfetch()
    })
    .catch(() => {})
}

watch(classe, () => {
  resetAndfetch()
})

fetch()
</script>

<style lang="scss" scoped>
.badge-not-enabled {
  color: #4b4b4b !important;
  background-color: rgba(108, 117, 125, 0.12) !important;
  border: none;
}
</style>