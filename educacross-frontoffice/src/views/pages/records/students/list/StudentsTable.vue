<template>
  <section>
    <ListTableSelect
      ref="listTableRef"
      v-model="selectedStudents"
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="studentsList"
      :total-data="total"
      selected-label="Alunos selecionados"
      search-placeholder="Pesquisar por aluno"
      @change="changeListTable"
    >
      <template #cell(name)="{ item }">
        <span class="d-flex flex-column flex-md-row align-items-md-center gap-2">
          <b-avatar variant="info" :text="initials(item.name)" />
          <span class="font-bold">{{ item.name }}</span>
        </span>
      </template>

      <template #cell(classes)="{ value }">
        <ClassesTableCell :classes="value" />
      </template>

      <template #cell(sponsorEmail)="{ item }">
        <span v-if="!item.isIntegrator">{{ item.sponsorEmail ? item.sponsorEmail : '-' }}</span>
        <b-badge v-else variant="secondary">
          <span class="material-symbols-outlined font-12 align-middle font-weight-bolder"
            >sync_alt</span
          >
          <span class="align-middle"> Integrado</span>
        </b-badge>
      </template>

      <template #cell(actions)="{ item }">
        <div class="text-nowrap d-flex align-items-center gap-3">
          <span>
            <AppLanguageSelector
              :ref="`idiom-${item.id}`"
              :value="item.idiomId"
              @input="changeLanguage($event, item.id, `idiom-${item.id}`)"
            />
          </span>

          <span
            v-for="(action, index) in tableActions"
            v-show="action.isShow(item)"
            :key="index"
            v-b-tooltip.hover.top="action.tooltip(item, action.isEnabled(item))"
            :class="
              action.isEnabled(item)
                ? `${action.class}  cursor-pointer`
                : 'cursor-not-allowed text-muted'
            "
            class="material-symbols-outlined"
            @click.stop="action.isEnabled(item) ? action.action(item) : null"
          >
            {{ action.icon }}
          </span>
        </div>
      </template>
    </ListTableSelect>

    <ModalConfirm
      v-model="confirmDeleteIsOpen"
      :callback-confirm="deleteStudent"
      :busy="loadingDelete"
      label-confirm="Excluir"
      icon="delete"
      icon-variant="danger"
      cancel-variant="outline-primary"
      confirm-variant="danger"
    >
      <h4 class="text-body">Tem certeza que deseja excluir?</h4>

      <p>
        <span class="text-primary font-bold">{{ studentDeleteData.name }}</span> será excluído
        permanentemente.
      </p>
    </ModalConfirm>

    <b-modal
      ref="studentReportModal"
      v-model="showModalStudentReport"
      static
      hide-footer
      centered
      title="Gerar boletins"
      size="sm"
      no-close-on-backdrop
      header-bg-variant="light-primary"
      @close="showModalStudentReport = false"
    >
      <student-report-modal
        :students-ids="selectedStudentsReport"
        :data-modal="dataModalReport"
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
  </section>
</template>

<script setup>
import AppLanguageSelector from '@/components/app-language-selector/AppLanguageSelector.vue'
import ListTableSelect from '@/components/table/ListTableSelect.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { initials } from '@/filters/filters.js'
import SchoolYearBadge from '@/layouts/components/SchoolYearBadge.vue'
import router from '@/router'
import { deleteMassStudentds } from '@/services/admin-context/students/Students.service'
import { sendEmail } from '@/services/shared/accesses/Accesses.service'
import { changeStudentIdiom } from '@/services/teacher-context/students/Students.service'
import { havePermissionOnSerie } from '@/utils/utils'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import CertificateModal from '@/views/pages/records/students/components/CertificateModal.vue'
import ClassesTableCell from '@/views/pages/records/students/components/ClassesTableCell.vue'
import { useRecordStudents } from '@/views/pages/records/students/list/useRecordStudents'
import StudentReportModal from '@/views/pages/teacher-context/records/students/PDF/report/StudentReportModal.vue'
import { can } from '@core/libs/acl/utils'
import { getCurrentInstance, onMounted, onUnmounted, ref } from 'vue'

const {
  listTableRef,
  loading,
  studentsList,
  total,
  params,
  selectedStudents,
  refSideBarCreateStudent,
  fetchStudents,
  resetAndFetch,
} = useRecordStudents()
const vm = getCurrentInstance().proxy

const tableColumns = [
  { key: 'name', label: 'Aluno', sortable: true, searchable: true },
  { key: 'classes', label: 'Turma' },
  { key: 'sponsorEmail', label: 'E-MAIL DO RESPONSÁVEL', sortable: true },
  {
    key: 'actions',
    label: 'Ações',
    sortable: false,
    thClass: 'text-center',
    thStyle: { width: '120px' },
  },
]

const orderBy = {
  name: 'Name',
  sponsorEmail: 'Email',
}

const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  params.value = {
    Search: searchQuery,
    OrderBy: `${orderBy[sortBy] || ''}`,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  }

  fetchStudents()
}

const reportStudent = (students = false, serieId, studentName, serieName, classId) => {
  selectedStudentsReport.value = students
  dataModalReport.value = {
    serieId,
    studentName,
    serieName,
    classId,
  }
  showModalStudentReport.value = true
}

const tableActions = [
  {
    icon: 'edit',
    tooltip: (data, isEnabled) => {
      return isEnabled ? 'Editar' : 'Usuário integrado não pode ser editado pela escola.'
    },
    class: 'text-primary',
    isEnabled: data => !data.isIntegrator,
    isShow: () => can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT),
    action: data => {
      editStudent(data)
    },
  },
  {
    icon: 'badge',
    tooltip: (data, isEnabled) => {
      return isEnabled ? 'Gerar Carteirinhas' : ''
    },
    class: 'text-primary',
    isEnabled: () => true,
    isShow: () => true,
    action: data => {
      router.push({
        name: 'studentCard',
        query: {
          studentsIds: [data.id],
          batchAction: 1,
          pdfTitle: 'Carteirinhas',
        },
      })
    },
  },
  {
    icon: 'workspace_premium',
    tooltip: (data, isEnabled) => {
      return isEnabled ? 'Gerar Certificado' : ''
    },
    class: 'text-primary',
    isShow: () => true,
    isEnabled: () => true,
    action: data => {
      generateCertificate([data.id], 1, data.serieId, data.name)
    },
  },
  {
    icon: 'feed',
    tooltip: (data, isEnabled) => {
      return isEnabled
        ? 'Gerar Boletim'
        : 'A funcionalidade Boletim do Aluno não está habilitada para esse ano escolar. Contate o suporte para saber mais.'
    },
    class: 'text-primary',
    isShow: () => true,
    isEnabled: data => studentHaveCardReportPermission(data),
    action: data => {
      reportStudent([data.id])
    },
  },
  {
    icon: 'mail_lock',
    tooltip: (data, isEnabled) => {
      return isEnabled ? 'Carta de Acesso' : ''
    },
    class: 'text-primary',
    isShow: () => true,
    isEnabled: () => true,
    action: data => {
      generateAccessLetters([data.id])
    },
  },
  {
    icon: 'forward_to_inbox',
    tooltip: (data, isEnabled) => {
      if (isEnabled) return 'Enviar e-mail'

      if (data.isIntegrator) return 'Não é possível enviar e-mail para usuário integrado.'
      if (!data.sponsorEmail) return 'O usuário não possui e-mail cadastrado.'
      if (data.status === 2) return 'Acesso já ativado.'
      if (!data.enabledSendEmail) return 'E-mail enviado, aguarde para fazer um novo envio.'

      return 'Usuário não habilitado para receber e-mails.'
    },
    class: 'text-primary',
    isEnabled: data => !data.isIntegrator && data.enabledSendEmail && data.status !== 2,
    isShow: () =>
      can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT) ||
      can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER),
    action: data => {
      sendEmail(data.id)
        .then(() => {
          data.enabledSendEmail = false

          vm.$toast({
            component: Toast,
            props: {
              title: 'E-mail enviado com sucesso!',
              icon: 'CheckCircleIcon',
              variant: 'success',
            },
          })
        })
        .finally(() => {
          resetAndFetch()
        })
    },
  },
  {
    icon: 'delete',
    tooltip: (data, isEnabled) => {
      return isEnabled
        ? 'Excluir aluno'
        : 'Usuário integrado não pode ser excluído pela escola.'
    },
    class: 'text-danger',
    isShow: () => can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT),
    isEnabled: data => !data.isIntegrator,
    action: data => {
      showModalConfirmDelete(data)
    },
  },
]

const changeLanguage = (idiomId, studentId, refName) => {
  vm.$refs[refName].loading = true
  changeStudentIdiom(studentId, idiomId).finally(() => {
    vm.$refs[refName].loading = false
  })
}

const showCertificateModalReport = ref(false)
const studentsData = ref({})

const selectedStudentsReport = ref([])
const dataModalReport = ref({})

const showModalStudentReport = ref(false)

const generateCertificate = (
  studentsIds,
  batchAction,
  serieId,
  studentName,
  serieName,
  classId,
) => {
  studentsData.value = {
    studentsIds,
    batchAction,
    serieId,
    studentName,
    serieName,
    classId,
  }
  showCertificateModalReport.value = true
}

const generateAccessLetters = studentsIds => {
  router.push({
    name: 'accessLetters',
    params: {
      studentsIds,
      batchAction: 1,
      pdfTitle: 'Cartas de acesso',
    },
  })
}

const confirmDeleteIsOpen = ref(false)
const studentDeleteData = ref({})

const showModalConfirmDelete = data => {
  studentDeleteData.value = data
  confirmDeleteIsOpen.value = true
}

const loadingDelete = ref(false)
const deleteStudent = () => {
  loadingDelete.value = true
  deleteMassStudentds([studentDeleteData.value.id], 1)
    .then(() => {
      confirmDeleteIsOpen.value = false
      vm.$toast({
        component: Toast,
        props: {
          text: 'Usuário excluído com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
      resetAndFetch()
    })

    .finally(() => {
      loadingDelete.value = false
    })
}

/**
 * @param {StudentRecordStudent} student
 */
const editStudent = student => {
  if (!refSideBarCreateStudent.value) return
  refSideBarCreateStudent.value.openSidebar(student.id)
}

onMounted(() => {
  vm.$bus.on('generateCertificate', data => {
    const { studentsIds, batchAction, serieId, studentName, serieName, classId } = data
    generateCertificate(studentsIds, batchAction, serieId, studentName, serieName, classId)
  })

  vm.$bus.on('reportStudent', data => {
    const { studentsIds, serieId, studentName, serieName, classId } = data
    reportStudent(studentsIds, serieId, studentName, serieName, classId)
  })

  resetAndFetch()
})

onUnmounted(() => {
  vm.$bus.off('generateCertificate')
  vm.$bus.off('reportStudent')
})

const studentHaveCardReportPermission = student => {
  const seriesIds = student.classes.map(c => c.serieId)

  for (let i = 0; i < seriesIds.length; i++) {
    const serieId = seriesIds[i]
    if (havePermissionOnSerie(serieId, PERMISSION.MODULE.CARD_REPORT)) {
      return true
    }
  }

  return false
}
</script>
