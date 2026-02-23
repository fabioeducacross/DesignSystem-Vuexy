<template>
  <section>
    <b-card no-body>
      <div class="m-2">
        <b-row>
          <b-col cols="12" md>
            <b-row align-h="end" align-v="center">
              <b-col cols="12" sm="auto">
                <b-button
                  variant="outline-primary"
                  size="sm"
                  class="w-100 mt-2 mt-sm-0"
                  :class="{ 'cursor-not-allowed': generatingExcel || loading }"
                  style="height: 38px"
                  :disabled="generatingExcel || loading"
                  @click="exportToExcel"
                >
                  <div class="d-flex align-items-center justify-content-center gap-2">
                    <b-spinner v-if="generatingExcel" small></b-spinner>
                    <span
                      v-if="!generatingExcel"
                      class="material-symbols-outlined"
                      style="font-size: 22px"
                    >
                      ios_share</span
                    >
                    <span>Exportar em Excel</span>
                  </div>
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <b-skeleton-table :columns="tableColumns.length" :rows="12" :class="{ 'd-none': !loading }" />
      <b-table
        id="list-table-teachers-access-school"
        :class="{ 'd-none': loading }"
        thead-tr-class="thead-row"
        tbody-tr-class="tbody-row"
        :items="dataTable"
        responsive
        :fields="tableColumns"
        primary-key="id"
        show-empty
        no-local-sorting
      >
        <template #head(accessPercentage)="item">
          <div class="d-flex align-items-center gap 1">
            {{ item.label }}
            <span
              v-b-tooltip.hover.top="
                `Percentual de professores que acessaram pelo menos uma vez a plataforma do professor.`
              "
              class="material-symbols-outlined ml-1 head-icon-info"
            >
              info
            </span>
          </div>
        </template>
        <template #head(guidesEnabled)="item">
          <div class="d-flex align-items-center gap 1">
            {{ item.label }}
            <span
              v-b-tooltip.hover.top="
                `Quantidade de missões disponibilizadas para os alunos pelo professor dentro do mês.`
              "
              class="material-symbols-outlined ml-1 head-icon-info"
            >
              info
            </span>
          </div>
        </template>
        <template v-slot:empty>
          <div class="d-flex flex-column align-items-center">
            <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
            <span class="text-center">Nenhuma informação encontrada</span>
          </div>
        </template>
      </b-table>
    </b-card>
  </section>
</template>

<script setup>
import LegendEnum from '@/components/legends/LegendEnum.vue'
import ListTable from '@/components/table/ListTable.vue'
import { formatNumber } from '@/filters/filters'
import { getTeachersAccessByMonthExcel } from '@/services/shared/teachers/Teachers.Service.js'
import store from '@/store'
import { activityClasses, monthName } from '@/utils/utils'
import SemaphoreStatus from '@/views/pages/admin-context/shared/table-columns-components/SemaphoreStatus.vue'
import { useTeachersAccess } from '@/views/reports/teachersAccess/useTeachersAccess.js'
import { saveAs } from 'file-saver'
import { computed, ref } from 'vue'

const { institution, moduleId, educationSystem, networkGroup } = useTeachersAccess()

const listTableRef = ref(null)

const loading = computed(() => store.getters['moduleTeacherAccessTabSchool/loading'])
const dataTable = computed(() => store.getters['moduleTeacherAccessTabSchool/data'])

const tableColumns = [
  { key: 'month', label: 'Mês', formatter: value => `${monthName(value)}` },
  {
    key: 'accessPercentage',
    label: 'Percentual de Acessos',
    formatter: value => `${formatNumber(value)}%`,
    tdClass: value => activityClasses(value),
  },
  {
    key: 'guidesEnabled',
    label: 'Missões Iniciadas',
    formatter: value => formatNumber(value),
  },
]

const generatingExcel = ref(false)

const exportToExcel = () => {
  generatingExcel.value = true
  getTeachersAccessByMonthExcel({
    module: moduleId.value?.id,
    EducationSystemId: moduleId.value?.id === 11 ? educationSystem.value?.id : null,
    institutionId: institution.value?.id,
    NetworkGroupId: networkGroup.value.id,
  })
    .then(response => {
      const fileName = 'Relatório acesso de Professores.xlsx'
      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    })
}
</script>

<style lang="scss" scoped>
.material-symbols-outlined.head-icon-info {
  font-size: 16px;
}
</style>
<style lang="scss">
#list-table-teachers-access-school {
  .thead-row {
    th {
      vertical-align: middle !important;
      div {
        text-transform: uppercase;
        font-weight: 600;
      }
    }
  }
  .activity {
    background: #8fcf9b;
  }
  .no-activity {
    background: #f9a9a9;
  }
  .less-activity {
    background: #f9a9a9;
  }
  .some-activity {
    background: #fac2ae;
  }
  .half-activity {
    background: #cbe3ab;
  }
  .almost-full-activity {
    background: #8fcf9b;
  }
}
</style>
