<template>
  <section>
    <b-row>
      <b-col
        v-if="isNetworkManager"
        cols="12"
        :md="isNetworkManager ? 6 : 4"
        :lg="isNetworkManager ? 6 : 4"
        :xl="isNetworkManager ? 3 : 4"
      >
        <b-form-group label="Escola" label-for="school">
          <ESelect
            id="school"
            :value="institution"
            class="filter-chooser filter-items"
            label="name"
            :options="institutionList"
            :reduce="element => element.id"
            placeholder="Selecione uma escola"
            :clearable="false"
            :loading="institutionListLoading"
            @input="setInstitution"
          >
            <template v-slot:no-options> Nenhuma Escola encontrada </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col
        cols="12"
        sm="12"
        :md="isNetworkManager ? 6 : 4"
        :lg="isNetworkManager ? 6 : 4"
        :xl="isNetworkManager ? 3 : 4"
      >
        <b-form-group label="Turmas" label-for="classes">
          <ESelect
            id="classes"
            label="name"
            :value="classe"
            :options="classes"
            :clearable="false"
            :loading="classesLoading"
            :disabled="classesLoading"
            :page="classesPage"
            :total-pages="classesTotalpages"
            paginated
            @input="setclasses"
            @nextPage="fetchClasses"
          >
            <template v-slot:selected-option="{ name, serieName }">
              <div>
                <span>
                  {{ name }}
                </span>
                <b-badge v-if="serieName" pill variant="light-primary"> {{ serieName }}</b-badge>
              </div>
            </template>
            <template v-slot:option="{ name, serieName, id }">
              <div>
                <span>
                  {{ name }}
                </span>
                <b-badge
                  v-if="serieName"
                  pill
                  variant="light-primary"
                  :class="classe.id === id ? 'bg-white text-primary' : ''"
                >
                  {{ serieName }}
                </b-badge>
              </div>
            </template>
          </ESelect>
        </b-form-group>
      </b-col>
      <b-col cols="12" sm="6" md="6" :lg="isNetworkManager ? 12 : 8" :xl="isNetworkManager ? 6 : 8">
        <label class="d-none d-xl-block" for="schools">&zwnj;</label>
        <section class="d-flex flex-wrap align-items-center">
          <div class="marginAdjust text-legend">Professores:</div>
          <div class="d-flex align-items-center justify-content-start legend-numbers teachersList">
            <initialsRed
              v-if="countTeachers.length >= 1 && countTeachers[0] !== 'Sem professores'"
              v-b-tooltip.hover.bottom="countTeachers[0]"
              :name="countTeachers[0]"
            />

            <initialsBlue
              v-if="countTeachers.length >= 2 && countTeachers[1] !== 'Sem professores'"
              v-b-tooltip.hover.bottom="countTeachers[1]"
              :name="countTeachers[1]"
            />
            <initialsYellow
              v-if="countTeachers.length >= 3 && countTeachers[2] !== 'Sem professores'"
              v-b-tooltip.hover.bottom="countTeachers[2]"
              :name="countTeachers[2]"
            />
          </div>
          <div id="legendToggle" class="legend-numbers teachersList mr-1">
            <span
              v-if="countTeachers.length > 3"
              v-b-tooltip.html
              class="text-primary bg-st-primary"
              name="plusTeachers"
              :title="teachersTooltipString"
            >
              Mais {{ countTeachers.length - 3 }}</span
            >
          </div>
          <p class="text-legend">
            Total de Alunos:
            <span class="legend-numbers students-total-title">{{
              countStudents | formatNumber
            }}</span>
          </p>
        </section>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" :md="isNetworkManager ? 12 : 6">
        <b-form-group>
          <span
            id="access-class-last-update cursor-help"
            v-b-tooltip="'Esse relatório é calculado diariamente ao final do dia.'"
          >
            Última atualização:
            {{
              lastUpdateStudents !== '' ? handleFormatDate(lastUpdateStudents) || '--/--/----' : ''
            }}
          </span>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-card no-body>
          <ListTableAccess
            ref="refListTableAccess"
            :fields="tableColumns"
            :items="fetchData"
            :loading="loading"
            :total-rows="totalRows"
            :formatter="item => formatNumber(item)"
            :class-map="classMap"
            :generating-excel="loadingExcel"
            :export-to-excel="exportToExcelStudents"
          >
            <template #cell(lastAccess)="{ item }">
              <div :class="{ 'text-center': !item.lastAccess }">
                <span>
                  {{ item.lastAccess ? handleFormatDate(item.lastAccess) : '-' }}
                </span>
              </div>
            </template>
          </ListTableAccess>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import ListTable from '@/components/table/ListTable.vue'
import ListTableAccess from '@/components/table/ListTableAccess.vue'
import { formatNumber } from '@/filters/filters'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import { getInstitutions } from '@/services/shared/institution/Institutions.Service'
import {
  getMAUStudent,
  getUserAccessMonthlyStudents,
} from '@/services/shared/reports/Report.service'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'
import { sanitizeString } from '@/utils/utils'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import InitialsBlue from '@/views/pages/admin-context/shared/table-columns-components/InitialsBlue.vue'
import InitialsRed from '@/views/pages/admin-context/shared/table-columns-components/InitialsRed.vue'
import InitialsYellow from '@/views/pages/admin-context/shared/table-columns-components/InitialsYellow.vue'
import { ref, computed, onMounted } from 'vue'
import VSelect from 'vue-select'

const { classe } = useFilters()
classe.value = {}

const refListTableAccess = ref(null)
const loadingExcel = ref(false)
const loading = ref(true)

const lastUpdateStudents = ref(undefined)

const institutionList = ref([])
const institutionListLoading = ref(false)

const institution = ref({})
const countStudents = ref([])
const totalPagesStudents = ref(null)
const countTeachers = ref([])
const teachersTooltipString = ref('')
const usersAccessMonthlyStudents = ref(null)
const tableColumns = [
  {
    label: 'Aluno',
    key: 'studentName',
  },
  {
    label: 'Último acesso',
    key: 'lastAccess',
    class: 'whitespace-no-wrap',
  },
]
const totalRows = ref(0)

const isNetworkManager = computed(() => store.getters.accessRole === 'NetworkManager')

onMounted(async () => {
  if (isNetworkManager.value) {
    await handleGetInstitutions()
  }
})

const handleGetInstitutions = async () => {
  institutionListLoading.value = true
  try {
    const { data } = await getInstitutions()
    institutionList.value = data
    institution.value = data[0]
    await fetchClasses()
  } catch (error) {
    institutionList.value = []
    institution.value = {}
  } finally {
    institutionListLoading.value = false
  }
}

const setInstitution = async data => {
  institution.value = data
  await fetchClasses()
  refreshData(1)
}

const fetchData = async (ctx, callback) => {
  if (classe.value.id) {
    if (isNetworkManager.value && !institution.value.id) {
      callback([])
      return null
    }

    loading.value = true

    getUserAccessMonthlyStudents(
      {
        InstitutionId: institution.value.id,
        classId: classe.value.id,
        pageSize: ctx.perPage,
        tableOrderBy: ctx.sortBy,
        tableAscending: ctx.sortDesc,
      },
      ctx.currentPage,
    )
      .then(response => {
        const { data } = response
        const { lastUpdate, reportStudents } = data
        lastUpdateStudents.value = lastUpdate
        totalRows.value = reportStudents.total
        countStudents.value = response.data.reportStudents.total
        totalPagesStudents.value = response.data.reportStudents.totalPages
        if (response.data.teachers) {
          countTeachers.value = response.data.teachers.map(name => name.teacherName)
          setTeachersTooltip()
        } else {
          countTeachers.value = ['Sem professores']
        }
        callback(reportStudents.data)
      })
      .catch(() => {
        callback([])
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    usersAccessMonthlyStudents.value = []
    lastUpdateStudents.value = ''
    countStudents.value = 0
    totalPagesStudents.value = 0
    totalRows.value = 0
    countTeachers.value = ['Sem professores']
    callback([])
    loading.value = false
  }
}

const setTeachersTooltip = () => {
  let tooltipString = '<span>'
  countTeachers.value.forEach(teacher => {
    tooltipString += `${teacher}</span><br>`
  })

  teachersTooltipString.value = tooltipString
}

const refreshData = async page => {
  refListTableAccess.value.refresh(page)
}

const exportToExcelStudents = async () => {
  if (loadingExcel.value || !classe.value?.id) {
    return
  }

  let fileName = 'Relatorio de acessos por alunos'

  loadingExcel.value = true

  fileName = sanitizeString(fileName)

  getMAUStudent(
    {
      classId: classe.value.id,
      institutionId: institution.value.id,
    },
    fileName,
  )
    .catch(() => {
      // eslint-disable-next-line no-undef
      if (typeof $toast === 'function') {
        $toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: 'Erro ao exportar relatório de alunos',
            variant: 'danger',
          },
        })
      }
    })
    .finally(() => {
      loadingExcel.value = false
    })
}

const handleFormatDate = date => {
  if (!date) return null

  const d = new Date(date)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const year = d.getFullYear()

  return `${day}/${month}/${year}`
}

const classMap = accessActivity => {
  const access = Number.parseFloat(accessActivity)
  if (Number.isNaN(access)) return ''

  if (access < 1) return 'less-activity'
  return 'almost-full-activity'
}

const classesLoading = ref(true)
const classes = ref([])
const classesPage = ref(1)
const classesTotalpages = ref(1)

const setclasses = value => {
  classe.value = value
  refreshData(1)
}

const fetchClasses = async (ctx = {}) => {
  classesLoading.value = true

  if (isNetworkManager.value && !institution.value.id) {
    classesLoading.value = false
    return null
  }

  const { page } = ctx
  classesPage.value = page || 1

  try {
    const { data } = await getClassesV2Label({
      Page: classesPage.value,
      institutionId: isNetworkManager.value ? institution.value.id : null,
    })

    const options = data.data

    if (classesPage.value === 1) {
      classes.value = []
      setclasses(options[0])
      classe.value = options[0]
      if (options.length === 0) {
        classe.value = {}
      }
    }

    classes.value.push(...options)
    classesTotalpages.value = data.totalPages
    classesLoading.value = false
  } catch (error) {
    classe.value = {}
    classes.value = []
    classesLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
  .cursor-help {
    cursor: help;
    width: fit-content;
  }

  .text-legend {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: auto 0;
    color: #2c2c2c;
    font-weight: 600;
    font-size: 15px;

    margin-right: 1rem;
    @media (max-width: 425px) {
      margin-left: 0 !important;
    }

    .legend-numbers {
      font-weight: inherit;
      color: #00bdb9;
    }
  }
  .students-total-title {
    margin-left: 0.5rem;
  }
</style>