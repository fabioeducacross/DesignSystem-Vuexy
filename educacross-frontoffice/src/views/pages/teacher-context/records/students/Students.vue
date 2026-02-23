<template>
  <div>
    <div>
      <div>
        <b-card>
          <b-row align-h="end">
            <b-col v-if="$can(ACTION.CREATE, PERMISSION.GENERAL.MANAGE_STUDENTS)" cols="auto">
              <b-button :to="{ name: 'importStudentTeacher' }" variant="primary">
                Importar Cadastros
              </b-button>
            </b-col>
            <b-col cols="auto">
              <b-button
                v-if="$can(ACTION.CREATE, PERMISSION.GENERAL.MANAGE_STUDENTS)"
                variant="primary"
                @click="newStudent"
              >
                Novo Aluno
              </b-button>
            </b-col>
            <b-col class="d-flex justify-content-end">
              <b-dropdown
                v-b-tooltip.hover.top="
                  selectedStudents.length < 2
                    ? 'Selecione 2 ou mais alunos para realizar essa ação.'
                    : ''
                "
                variant="outline-primary"
                text="Ações em Lote"
                style="z-index: 500"
                right
                :disabled="selectedStudents.length < 2"
              >
                <b-dropdown-item class="item-drop-actions" @click="generateMassAccessLetters()">
                  <div class="d-flex align-items-center">
                    <span class="material-symbols-outlined cursor-pointer"> print </span>
                    <span class="ml-1"> Gerar Cartas de Acesso </span>
                  </div>
                </b-dropdown-item>
                <b-dropdown-item class="item-drop-actions" @click="generateMassCards()">
                  <div class="d-flex align-items-center">
                    <span class="material-symbols-outlined cursor-pointer"> credit_card </span>
                    <span class="ml-1"> Gerar Carteirinhas </span>
                  </div>
                </b-dropdown-item>
                <b-dropdown-item class="item-drop-actions" @click="generateMassCertificates()">
                  <div class="d-flex align-items-center">
                    <span class="material-symbols-outlined cursor-pointer">
                      workspace_premium
                    </span>
                    <span class="ml-1"> Gerar Certificados </span>
                  </div>
                </b-dropdown-item>
                <b-dropdown-item v-if="hasReport" @click="reportStudent()">
                  <div class="d-flex align-items-center">
                    <span class="material-symbols-outlined cursor-pointer"> feed </span>
                    <span class="ml-1">
                      Gerar Boletim
                      <b-badge pill variant="light-primary">Beta</b-badge>
                    </span>
                  </div>
                </b-dropdown-item>
              </b-dropdown>
            </b-col>
          </b-row>
        </b-card>
      </div>
      <div class="">
        <ListTableSelectLocal
          v-model="selectedStudents"
          :loading="loading"
          :table-columns="dynamicListTableColumns"
          :data-table="studentsList"
          search-placeholder="searchForStudent"
          selected-label="Alunos selecionados"
          show-view-selection
        >
          <template #cell(studentName)="{ item }">
            <div
              v-if="$can(ACTION.READ, PERMISSION.GENERAL.SOCIO_EMOTIONAL)"
              class="d-flex align-items-center gap-2"
            >
              <div
                v-b-tooltip="
                  item.hasFeelingsHistory
                    ? 'Histórico de emojis do aluno'
                    : 'O aluno não fez alteração'
                "
                @click.stop="openStudentHistory(item)"
              >
                <b-avatar
                  rounded="lg"
                  :disabled="!item.hasFeelingsHistory"
                  :src="item.feelingImageUrl"
                  :class="{ 'cursor-pointer': item.hasFeelingsHistory }"
                  style="width: 44px; height: 44px"
                ></b-avatar>
              </div>

              <span class="font-bold text-primary">{{ item.studentName }}</span>
            </div>
            <span v-else class="font-bold">{{ item.studentName }}</span>
          </template>
          <template #cell(classes)="{ item }">
            <ListItemsLimited v-if="item.classes.length" :data="item.classes" :limit="2">
              <template v-slot:item="{ data }">
                <b-badge variant="light-primary">
                  {{ data.name }}
                </b-badge>
              </template>
              <template v-slot:excess="{ data }">
                <b-badge variant="light-primary"> +{{ data | formatNumber }} </b-badge>
              </template>
            </ListItemsLimited>
            <span v-else class="text-muted italic">Sem turmas extras</span>
          </template>
          <template #cell(sponsorName)="{ item }">
            <span :class="{ 'text-muted font-weight-normal italic': item.sponsorNameItalic }">{{
              item.sponsorName
            }}</span>
          </template>
          <template #cell(sponsorEmail)="{ item }">
            <span :class="{ 'text-muted italic': item.sponsorEmailItalic }">{{
              item.sponsorEmail
            }}</span>
          </template>
          <template #cell(status)="{ item }">
            <b-badge pill :variant="SponsorAccessStatus[item.status].variant">
              {{ item.status }}
            </b-badge>
          </template>
          <template #cell(actions)="{ item }">
            <div class="text-nowrap d-flex align-items-center gap-3">
              <AppLanguageSelector
                v-if="$can(ACTION.READ, PERMISSION.GENERAL.IDIOM)"
                :ref="`idiom-${item.id}-1`"
                :value="item.idiomId"
                @input="changeIdiom($event, item.id, `idiom-${item.id}-1`)"
              />
              <span
                v-for="(action, index) in tableActions"
                :key="index"
                v-b-tooltip.hover.top="action.tooltip(item)"
                class="material-symbols-outlined text-primary cursor-pointer"
                :class="{ 'd-none': action.isBoletim ? !hasReport : null }"
                @click.stop="action.action(item)"
              >
                {{ action.icon }}
              </span>
            </div>
          </template>
          <template v-slot:card="{ data, checked }">
            <b-card body-class="flex flex-column">
              <div class="profile-image-wrapper mb-1" :class="{ 'card-selected': checked }">
                <div class="d-flex align-items-center justify-content-center profile-image p-0">
                  <div
                    v-if="$can(ACTION.READ, PERMISSION.GENERAL.SOCIO_EMOTIONAL)"
                    v-b-tooltip="
                      data.hasFeelingsHistory
                        ? 'Histórico de emojis do aluno'
                        : 'O aluno não fez alteração'
                    "
                    @click.stop="openStudentHistory(data)"
                  >
                    <b-avatar
                      :src="data.feelingImageUrl"
                      rounded="lg"
                      :disabled="!data.hasFeelingsHistory"
                      style="height: 44px; width: 44px"
                      :class="{ 'cursor-pointer': data.hasFeelingsHistory }"
                    />
                  </div>
                  <b-avatar
                    v-else
                    class="avatar-image"
                    size="80"
                    variant="light"
                    :src="data.imageUrl"
                  />
                </div>
              </div>

              <div>
                <h3 class="title-students mb-1 text-break text-center text-primary">
                  {{ data.studentName }}
                </h3>
              </div>

              <div class="text-nowrap d-flex align-items-center justify-content-center gap-3">
                <AppLanguageSelector
                  v-if="$can(ACTION.READ, PERMISSION.GENERAL.IDIOM)"
                  :ref="`idiom-${data.id}-2`"
                  :value="data.idiomId"
                  @input="changeStudentIdiom($event, data.id, `idiom-${data.id}-2`)"
                />
                <span
                  v-for="(action, index) in tableActions"
                  :key="index"
                  v-b-tooltip.hover.top="action.tooltip()"
                  class="material-symbols-outlined text-primary cursor-pointer"
                  :class="{ 'd-none': action.isBoletim ? !hasReport : false }"
                  @click.stop="action.action(data)"
                >
                  {{ action.icon }}
                </span>
              </div>

              <hr class="mb-2" />

              <div class="text-students color-patternSeven mb-1 text-left">
                <h5 class="font-weight-bolder font-12 text-body mb-0">NOME DO RESPONSÁVEL</h5>
                <span
                  class="d-block text-break text-body mb-2 font-14"
                  :class="{
                    'italic text-muted': data.sponsorNameItalic,
                  }"
                >
                  {{ data.sponsorName }}
                </span>
                <h5 class="font-weight-bolder font-12 text-body mb-0">E-MAIL DO RESPONSÁVEL</h5>
                <span
                  class="text-break text-body font-14"
                  :class="{
                    'italic text-muted': data.sponsorEmailItalic,
                  }"
                >
                  {{ data.sponsorEmail }}
                </span>
              </div>
            </b-card>
          </template>
        </ListTableSelectLocal>
      </div>
    </div>
    <b-modal
      ref="studentReportModal"
      v-model="showModalStudentReport"
      static
      hide-footer
      centered
      size="sm"
      no-close-on-backdrop
      title="Gerar Boletins"
      header-bg-variant="light-primary"
      @close="showModalStudentReport = false"
    >
      <student-report-modal
        :students-ids="selectedStudentsReport"
        @close-modal="showModalStudentReport = false"
      />
    </b-modal>

    <b-modal
      ref="certificateReportModal"
      v-model="showCertificateModalReport"
      title="Gerar certificados"
      hide-footer
      centered
      static
      size="lg"
      no-close-on-backdrop
      no-close-on-esc
      hide-header-close
      @close="showCertificateModalReport = false"
    >
      <CertificateModal
        v-if="showCertificateModalReport"
        :data="studentsData"
        @close-modal="() => (showCertificateModalReport = false)"
      />
    </b-modal>
    <ModalFeelingHistory ref="refModalFeelingHistory" />
  </div>
</template>

<script setup>
import AppLanguageSelector from '@/components/app-language-selector/AppLanguageSelector.vue'
import ListTableSelectLocal from '@/components/table/ListTableSelectLocal.vue'
import { SponsorAccessStatus } from '@/consts/StatusEnums.js'
import { ACTION, PERMISSION } from '@/consts/permissions.js'
import router from '@/router'
import {
  changeStudentIdiom,
  getStudentsByClass,
} from '@/services/teacher-context/students/Students.service'
import useFilters from '@/store/filters/useFilters'
import { sortString } from '@/utils/utils.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ListItemsLimited from '@/views/pages/admin-context/shared/table-columns-components/ListItemsLimited.vue'
import CertificateModal from '@/views/pages/records/students/components/CertificateModal.vue'
import ModalFeelingHistory from '@/views/pages/teacher-context/records/students/ModalFeelingHistory.vue'
import StudentReportModal from '@/views/pages/teacher-context/records/students/PDF/report/StudentReportModal.vue'
import { ButtonPlugin, DropdownPlugin, LayoutPlugin, BBadge } from 'bootstrap-vue'
import Vue, { getCurrentInstance, computed, ref, watch } from 'vue'
import vSelect from 'vue-select'

Vue.use(ButtonPlugin).use(DropdownPlugin).use(LayoutPlugin)

const vm = getCurrentInstance().proxy
const { classe } = useFilters()

const selectedStudents = ref([])
const refModalFeelingHistory = ref(null)

const listTableColumns = [
  { key: 'studentName', label: 'Nome do Aluno', sortable: true, searchable: true },
  { key: 'classes', label: 'TURMAS EXTRAS DO ALUNO' },

  { key: 'sponsorName', label: 'Nome do Responsável', sortable: true },
  { key: 'sponsorEmail', label: 'E-mail do Responsável', sortable: true },
  { key: 'actions', label: 'Ações', sortable: false },
]

const tableActions = computed(() => {
  const actions = [
    {
      icon: 'print',
      tooltip: () => 'Gerar Cartas de Acesso',
      enableTo: [3, 4],
      action: data => {
        generateAccessLetters(data.id)
      },
    },
    {
      icon: 'badge',
      tooltip: () => 'Gerar Carteirinhas',
      enableTo: [3, 4],
      action: data => {
        generateCards(data.id)
      },
    },
    {
      icon: 'workspace_premium',
      tooltip: () => 'Gerar Certificados',
      enableTo: [3, 4],
      action: data => {
        generateCertificate([data.id], 1, classe.value.SerieId, data.studentName)
      },
    },
    {
      icon: 'feed',
      tooltip: () => 'Gerar Boletim',
      isBoletim: true,
      enableTo: [3, 4],
      action: data => {
        reportStudent(data)
      },
    },
  ]
  if (vm.$can(ACTION.UPDATE, PERMISSION.GENERAL.MANAGE_STUDENTS)) {
    actions.push({
      icon: 'edit',
      tooltip: () => 'Editar o Aluno',
      action: data => {
        router.push({
          name: 'editStudentTeacher',
          params: { studentId: data.id },
        })
      },
    })
  }
  return actions
})

const loading = ref(true)
const studentsList = ref([])

const translateStatus = status => {
  switch (status) {
    case 'Active':
      return 'Ativo'
    case 'Pending':
      return 'Pendente'
    case 'Refused':
      return 'Recusado'
    default:
      return ''
  }
}

const generateAccessLetters = (id, batchAction = 1) => {
  router.push({
    name: 'accessLettersTeacher',
    params: {
      studentsIds: [id],
      batchAction,
      pdfTitle: 'Cartas de acesso',
    },
  })
}

const generateMassAccessLetters = (batchAction = 1) => {
  if (selectedStudents.value.length === 0) {
    vm.$toast({
      component: Toast,
      props: {
        title: 'Atenção',
        icon: 'AlertTriangleIcon',
        text: 'Nenhum Aluno selecionado',
        variant: 'danger',
      },
    })
  } else {
    const studentsIds = selectedStudents.value.map(student => student.id)

    router.push({
      name: 'accessLettersTeacher',
      params: {
        studentsIds,
        batchAction,
        pdfTitle: 'Cartas de acesso',
      },
    })
  }
}

const generateCards = id => {
  router.push({
    name: 'studentCardTeacher',
    query: {
      studentsIds: [id],
      pdfTitle: 'Carteirinhas',
    },
  })
}

const generateMassCards = () => {
  const studentsIds = selectedStudents.value.map(student => student.id)

  router.push({
    name: 'studentCardTeacher',
    query: {
      studentsIds,
      pdfTitle: 'Carteirinhas',
    },
  })
}

const showCertificateModalReport = ref(false)
const studentsData = ref({})

const generateCertificate = (
  studentsIds,
  batchAction,
  serieId,
  studentName,
  serieName,
  classId,
) => {
  const data = {
    studentsIds,
    batchAction,
    serieId,
    studentName,
    serieName,
    classId,
  }
  studentsData.value = data
  showCertificateModalReport.value = true
}

const generateMassCertificates = () => {
  const studentsIds = selectedStudents.value.map(student => student.id)
  const batchAction = 1
  const serieId = classe.value.SerieId
  const serieName = classe.value.SerieName
  const classId = classe.value.ClassId

  generateCertificate(studentsIds, batchAction, serieId, null, serieName, classId)
}

const getStudents = async () => {
  loading.value = true
  await getStudentsByClass(classe.value.ClassId)
    .then(response => {
      studentsList.value = response.data
        .map(student => {
          student.status = translateStatus(student.status)

          if (!student.sponsorEmail || student.sponsorEmail === '') {
            student.sponsorEmail = 'Sem e-mail cadastrado'
            student.sponsorEmailItalic = true
          }
          if (!student.sponsorName || student.sponsorName === '') {
            student.sponsorName = 'Sem responsável cadastrado'
            student.sponsorNameItalic = true
          }
          return student
        })
        .sort((a, b) => sortString(a.studentName, b.studentName))
    })
    .catch(error => {
      const { errors } = error.response.data
      const errorsArray = vm.$utilTeacherService.handleFormatErrors(errors)
      errorsArray.message.forEach(elementError => {
        vm.$toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: elementError,
            variant: 'danger',
          },
        })
      })
    })
    .finally(() => {
      loading.value = false
    })
}

const dynamicListTableColumns = computed(() => {
  const hasStudentsWithClasses = studentsList.value.some(
    student => student.classes.length > 0,
  )
  if (hasStudentsWithClasses) return listTableColumns
  return listTableColumns.filter(column => column.key !== 'classes')
})

const hasReport = computed(() => vm.$can(ACTION.READ, PERMISSION.MODULE.CARD_REPORT))

getStudents()

watch(
  classe,
  () => {
    getStudents()
  },
  { deep: true },
)

const newStudent = () => {
  router.push({
    name: 'createStudentTeacher',
  })
}

const changeIdiom = (idiomId, studentId, ref) => {
  vm.$refs[ref].loading = true
  changeStudentIdiom(studentId, idiomId).finally(() => {
    vm.$refs[ref].loading = false
    studentsList.value.forEach(student => {
      if (student.id === studentId) {
        student.idiomId = idiomId
      }
    })
  })
}

const showModalStudentReport = ref(false)
const showStudentCertificateModal = ref(false)
const selectedStudentsReport = ref([])

const reportStudent = (student = false) => {
  selectedStudentsReport.value = student
    ? [student.id]
    : selectedStudents.value.map(student => student.id)
  showModalStudentReport.value = true
}

const openStudentHistory = student => {
  if (!refModalFeelingHistory.value || !student.hasFeelingsHistory) return

  refModalFeelingHistory.value.openModal({ studentId: student.id })
}

</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables/_variables.scss';

  .avatar-image {
    border: 4px solid #ffffff;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.14);
  }

  .card-selected {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 58px;
      background-color: rgba($primary, 0.12);
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      z-index: 0;
    }

    .profile-image-wrapper {
      position: relative;
      z-index: 1;
    }
  }

  .text-students {
    font-size: 16px;
    line-height: 21px;
  }
</style>