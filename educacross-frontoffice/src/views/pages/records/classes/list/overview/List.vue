<template>
  <section>
    <!-- LIST -->
    <component
      :is="layout"
      ref="tableRef"
      v-model="selectedData"
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="Pesquisar por turma"
      @change="changeListTable"
    >
      <template #cell(serie)="{ item }">
        <NameClasses
          :content="{
            serie: item.serie,
          }"
        />
      </template>
      <template #cell(teachers)="{ value }">
        <ListInitialsTeacher :data="value" />
      </template>
      <template #cell(status)="{ item }">
        <b-badge
          v-if="item.isIntegrator"
          variant="light-secondary"
          class="text-secondary badge-integrated"
          pill
        >
          <div class="d-flex align-items-center justify-content-center gap-1">
            <span class="material-symbols-outlined" style="font-size: 14px"> sync_alt </span>
            <span>Integrada</span>
          </div>
        </b-badge>
        <span v-else>-</span>
      </template>

      <template #cell(actions)="{ item }">
        <div class="d-flex gap-1">
          <AppLanguageSelector :value="item.idiomId" @input="handleIdiomChange($event, item)" />
          <span
            v-if="modulesPermissions[item.serie.id]"
            v-b-tooltip="
              item.students ? 'Gerar Boletim' : 'Não é possível gerar boletim de turmas sem alunos.'
            "
            class="material-symbols-outlined text-primary"
            :class="{ 'cursor-not-allowed text-muted': !item.students }"
            @click.stop="!item.students ? null : reportStudent(item)"
          >
            lab_profile
          </span>
          <span
            v-if="$can(ACTION.UPDATE, PERMISSION.GENERAL.MANAGE_CLASSES)"
            v-b-tooltip="
              item.isIntegrator ? 'Turma integrada não pode ser editada pela escola.' : 'Editar'
            "
            class="material-symbols-outlined text-primary"
            :class="{ 'cursor-not-allowed text-muted': item.isIntegrator }"
            @click.stop="item.isIntegrator ? null : editRow(item.id)"
          >
            edit
          </span>
          <span
            v-if="$can(ACTION.DELETE, PERMISSION.GENERAL.MANAGE_CLASSES)"
            v-b-tooltip="
              item.isIntegrator
                ? 'Turma integrada não pode ser excluída pela escola.'
                : item.students
                ? 'Ação permitida apenas para turmas vazias. Exclua os alunos no menu “Alunos” antes de fazer essa ação.'
                : 'Excluir'
            "
            class="material-symbols-outlined text-danger"
            :class="{ 'cursor-not-allowed text-muted': item.isIntegrator || item.students }"
            @click.stop="item.isIntegrator || item.students ? null : handleDelete(item)"
          >
            delete
          </span>
        </div>
      </template>
    </component>
    <ModalConfirm
      v-model="openConfirmDelete"
      :callback-confirm="deleteTeacher"
      :busy="deleteLoading"
      label-confirm="Excluir"
      icon="delete"
      icon-variant="danger"
      cancel-variant="outline-primary"
      confirm-variant="danger"
    >
      <h4 class="text-body">Tem certeza que deseja excluir?</h4>
      <p>
        <span class="text-primary font-bold">{{ selectedClass.name }}</span> será excluído
        permanentemente.
      </p>
    </ModalConfirm>

    <b-modal
      ref="reportModal"
      v-model="showModalReport"
      hide-footer
      centered
      size="sm"
      static
      no-close-on-backdrop
      header-bg-variant="light-primary"
      @close="showModalReport = false"
    >
      <report-modal
        v-if="showModalReport"
        :data="selectedClass"
        @close-modal="showModalReport = false"
      />
    </b-modal>

    <CreateClassesSidebar
      v-model="sidebarActive"
      :class-id="classToEdit"
      :series="schoolYears"
      @refresh="resetAndfetch"
    />
  </section>
</template>

<script setup>
import AppLanguageSelector from '@/components/app-language-selector/AppLanguageSelector.vue'
import ListInitialsTeacher from '@/components/teacher/listInitialsTeacher.vue'
import ListTable from '@/components/table/ListTable.vue'
import ListTableSelect from '@/components/table/ListTableSelect.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { formatNumber } from '@/filters/filters'
import { deleteClasses, changeClassIdiom } from '@/services/shared/classes/Classes.service'
import store from '@/store'
import CreateClassesSidebar from '@/views/pages/admin-context/records/classes/CreateClassesSidebar.vue'
import ReportModal from '@/views/pages/admin-context/records/classes/ReportModal.vue'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import NameClasses from '@/views/pages/admin-context/shared/table-columns-components/NameClasses.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import { useRecordsClasses } from '@/views/pages/records/classes/list/overview/useRecordsClasses.js'
import { computed, getCurrentInstance, ref, onUnmounted } from 'vue'

const {
  selectedData,
  params,
  loading,
  totalData,
  tableRef,
  dataTable,
  fetch,
  resetAndfetch,
  schoolYears,
} = useRecordsClasses()

const vm = getCurrentInstance().proxy

const layout = computed(() =>
  vm.$can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT) ? ListTableSelect : ListTable,
)

const tableColumns = computed(() => {
  const columns = [
    {
      key: 'name',
      label: 'Turma',
      sortable: true,
      searchable: true,
    },
    {
      key: 'serie',
      label: 'Ano Escolar',
      sortable: true,
    },
    {
      key: 'students',
      label: 'Qtd. de Alunos',
      sortable: true,
      formatter: value => formatNumber(value),
    },
    {
      key: 'teachers',
      label: 'Professores',
    },
  ]

  if (vm.$can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT)) {
    columns.push(
      { key: 'status', label: 'status', sortable: false, thStyle: { width: '120px' } },
      {
        key: 'actions',
        label: 'Ações',
        thStyle: { width: '120px' },
      },
    )
  }

  return columns
})

const changeListTable = data => {
  params.value = data
  fetch()
}

fetch()

const permissions = store.getters.getModulePermissions

const modulesPermissions = computed(() =>
  schoolYears.value.reduce((acc, item) => {
    if (item.id && permissions[item.id]) {
      acc[item.id] = permissions[item.id].some(
        permission => permission.subject === PERMISSION.MODULE.CARD_REPORT,
      )
    }
    return acc
  }, {}),
)

const selectedClass = ref({})
const showModalReport = ref(false)

const openConfirmDelete = ref(false)
const deleteLoading = ref(false)

const handleDelete = data => {
  openConfirmDelete.value = true
  selectedClass.value = data
}

const sidebarActive = ref(false)
const classToEdit = ref(null)

const changeSidebar = (val, classId = null) => {
  sidebarActive.value = val
  classToEdit.value = classId
}

vm.$bus.on('changeSidebar', value => {
  changeSidebar(value)
})
onUnmounted(() => {
  vm.$bus.off('changeSidebar')
})

const editRow = idRow => {
  changeSidebar(true, idRow)
}

const deleteTeacher = () => {
  deleteLoading.value = true
  deleteClasses([selectedClass.value.id], 1)
    .then(() => {
      vm.$toast({
        component: Toast,
        props: {
          title: 'Turma excluída com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
      deleteLoading.value = false
      openConfirmDelete.value = false
      selectedClass.value = {}
      resetAndfetch()
    })
    .catch(() => {
      deleteLoading.value = false
      openConfirmDelete.value = false
    })
}

const reportStudent = data => {
  selectedClass.value = data
  showModalReport.value = true
}

const handleIdiomChange = (newLangId, content) => {
  changeClassIdiom(content.id, newLangId)
}
</script>