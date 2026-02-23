<template>
  <div>
    <b-row>
      <b-col cols="12" sm="9">
        <h1 class="schoolMission-title">Missões {{ route.query.classTitle }}</h1>
      </b-col>
      <b-col v-if="userRole !== 'NetworkManager'" cols="12" sm="3">
        <b-button
          :disabled="loadingReport"
          variant="primary"
          type="filled"
          class="button mb-1"
          block
          @click="bookReport"
        >
          <b-spinner v-if="loadingReport" small variant="light" />
          Relatório do livro
        </b-button>
      </b-col>
    </b-row>
    <div v-for="(item, index) in data" :key="`${item.unityName}-${index}`">
      <h2 class="unity-title">
        {{ item.unityName }}
      </h2>
      <dynamic-table
        :actions="actions"
        :busy="busy"
        :config="tableConfig"
        :data="item.guides"
        :show-pagination="false"
        role="missionClasses"
        show-by="list"
      />
    </div>
  </div>
</template>

<script setup>
import DynamicTable from '../../../shared/components/tables/DynamicTable.vue'
import { formatNumber } from '@/filters/filters'
import { getSASMissionList } from '@/services/shared/missions/Missions.Service'
import { getPDFInfos } from '@/services/shared/reports/Report.service'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import store from '@/store'
import { useRoute, useRouter } from 'vue-router/composables'

const busy = ref(false)
const filters = ref({})
const subjects = ref([])
const books = ref([])
const unityName = ref('Unidade 1')
const missionList = ref([])
const tableConfig = ref({
  tableFields: [
    {
      key: 'guideName',
      label: 'Nome',
      sortable: true,
    },
    {
      key: 'type',
      label: 'Tipo',
      sortable: true,
      componentName: 'MissionType',
    },
    {
      key: 'amountActivities',
      label: 'Qtd. de jogos',
      sortable: true,
      formatter: value => formatNumber(value),
    },
    {
      key: 'enabled',
      label: 'Status',
      sortable: true,
      componentName: 'EnabledStatus',
    },
    {
      key: 'progress',
      label: 'Progresso da turma',
      componentName: 'ProgressBar',
    },
    {
      key: 'actions',
      label: 'Ações',
    },
  ],
  cardFields: [],
})
const actions = ref([])
const massActions = ref([])
const rows = ref(0)
const perPage = ref(15)
const currentPage = ref(1)
const data = ref([])
const userRole = ref('')
const loadingReport = ref(false)
const institutionId = ref(null)

const route = useRoute()
const router = useRouter()

// Equivalent to created()
const initialize = async () => {
  const Role = store.getters.accessRole
  userRole.value = Role
  if (userRole.value === 'NetworkManager') {
    institutionId.value = parseInt(window.location.pathname.split('/').pop(), 10)
  }
  busy.value = true
  await getMissionList()
}
initialize()

// Equivalent to mounted()
onMounted(() => {
  actions.value = [
    {
      label: data => {
        if (!data.enableReport) {
          return 'Relatório não disponível, porquê a missão nunca foi habilitada para a turma'
        }
        return 'Ver relatório'
      },
      icon: 'PieChartIcon',
      color: 'secondary',
      disabled: data => !data.enableReport,
      action: data => {
        if (data.enableReport) {
          if (userRole.value === 'NetworkManager') {
            router.push({
              name: 'educationSytemReportMissionDetailNM',
              params: {
                classId: route.params.classId,
                guideId: data.guideId,
                institutionId: institutionId.value,
              },
            })
            sessionStorage.setItem('subjectId', filters.value.SubjectId)
          } else {
            router.push({
              name: 'educationSytemReportMissionDetail',
              params: {
                classId: route.params.classId,
                guideId: data.guideId,
              },
            })
            sessionStorage.setItem('subjectId', filters.value.SubjectId)
          }
        } else {
          // Show toast via $toast (must be provided by parent, mixin, or plugin)
          // Vue 2.7 setup syntax does not provide $toast directly; work around below:
          if (typeof getCurrentInstance === 'function') {
            const { proxy } = getCurrentInstance()
            proxy.$toast({
              component: Toast,
              props: {
                title: 'Atenção',
                icon: 'AlertTriangleIcon',
                text: 'Missão desabilitada! Não é possível ver os detalhes.',
                variant: 'danger',
              },
            })
          }
        }
      },
    },
  ]
})

const getMissionList = async () => {
  try {
    busy.value = true
    const response = await getSASMissionList(route.params)
    data.value = response.data
    if (Array.isArray(response.data) && response.data.length > 0) {
      unityName.value = response.data[0].unityName
      missionList.value = response.data[0].guides
    }
    busy.value = false
  } catch (err) {
    if (typeof getCurrentInstance === 'function') {
      const { proxy } = getCurrentInstance()
      proxy.$toast({
        component: Toast,
        props: {
          title: 'Atenção',
          icon: 'AlertTriangleIcon',
          text: 'Não foi possível realizar a requisição',
          variant: 'danger',
        },
      })
    }
  }
}

const bookReport = async () => {
  loadingReport.value = true
  const startDate = new Date()
  startDate.setMonth(0)
  startDate.setDate(1)
  const finalDate = new Date()
  const startMonth = startDate.getMonth() + 1
  const finalMonth = finalDate.getMonth() + 1

  const reportData = {
    bookId: route.params.bookId,
    educationSystemId: route.params.EducationSystemId,
    subjectId: route.params.subjectId || store.state.adminContext.subjectSelected,
    classId: route.params.classId,
    startMonth,
    finalMonth,
    dataType: 4,
    dashboard: true,
    classProficiency: true,
  }

  await getPDFInfos(reportData.subjectId, reportData)
    .then(response => {
      router.push({
        name: 'studentEvidencePDFTeacher',
        params: {
          pdfTitle: 'Evidências Alunos',
          reportData: response.data,
          moduleBook: route.params.bookId,
          subjectId: reportData.subjectId,
        },
      })
    })
    .finally(() => {
      loadingReport.value = false
    })
}
</script>

<style lang="scss" scoped>
  .schoolMission-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    margin-bottom: 14px;
    color: #2c2c2c;
  }

  .unity-title {
    font-size: 21px;
    line-height: 1.2;
    font-weight: 500;
    color: #2c2c2c;
    margin-bottom: 14px;
  }

  .filters-form {
    display: flex;
    flex-wrap: wrap;
    align-content: stretch;
    justify-content: space-between;
  }

  .filters-form-items {
    flex: 1;
    margin: 0px 5px;
  }

  .filters-wrapper {
    margin-top: 24px;
    margin-bottom: 24px;
  }

  @media (max-width: 900px) {
    .column-order {
      display: flex;
      flex-direction: column;
    }

    .filters-form {
      display: flex;
      flex-direction: column;
    }

    .filters-form-items {
      margin-bottom: 1rem;
    }

    .custom-button-margin {
      margin-top: 1rem;
    }
  }
</style>