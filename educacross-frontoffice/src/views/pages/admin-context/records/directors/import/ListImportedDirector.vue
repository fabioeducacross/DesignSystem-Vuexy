<template>
  <div>
    <div class="header-list-imports">
      <div>
        <h1 class="new-import-title">Importar cadastros de diretores</h1>
        <p class="new-import-description">
          Confira os dados abaixo, você ainda pode editar e remover usuários da lista antes de
          iniciar a importação.
        </p>
      </div>
      <div v-b-tooltip.hover title="Todos os cadastros devem ser válidos" :disabled="valid">
        <button-wait-action :disabled="!valid" label="Importar acessos" @click="importStudents" />
      </div>
    </div>
    <dynamic-table-paginated
      role="Diretor"
      :data="studentsPaginated"
      :actions="actions"
      :mass-actions="massActions"
      show-by="list"
      :config="tableConfig"
      label-name="diretores"
      :show-filter="false"
      :rows="rows"
      :per-page="filters.pageSize"
      :order-by-enum="orderByEnum"
      :modal-edit="true"
      :busy="false"
      :no-local-sorting="true"
      :order-by-external="true"
      @changePage="getDataByPage"
      @edit="setStudent"
      @orderBy="orderByCallBack"
    />
    <!-- <b-modal
      id="modal-center"
      ref="edit-student"
      centered
      hide-header
      hide-footer
      no-close-on-backdrop
    >
      <modal-edit-student
        :student-props="student"
        @edit-student="editStudent"
        @close-modal="closeModal"
      />
    </b-modal> -->
    <ModalImportedSpreadsheet />
  </div>
</template>

<script setup>
import ModalImportedSpreadsheet from './ModalImportedSpreadsheet.vue'
import buttonWaitAction from '@/components/form/button/ButtonWaitAction.vue'
import { importDirectors } from '@/services/admin-context/directors/Directors.service.js'
import sortObjectListByKey from '@/utils/sort'
import DynamicTable from '@/views/pages/admin-context/shared/components/tables/DynamicTable.vue'
import DynamicTablePaginated from '@/views/pages/admin-context/shared/components/tables/DynamicTablePaginated.vue'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { BButton, BModal, VBModal } from 'bootstrap-vue'
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router/composables'

// Directives
const directives = {
  'b-modal': VBModal,
}

// Table config and static lists
const orderByEnum = ref(['StatusImport'])

const tableConfig = reactive({
  tableFields: [
    {
      key: 'name',
      label: 'Nome do Diretor*',
      componentName: '',
    },
    {
      key: 'email',
      label: 'E-mail*',
      componentName: '',
    },
    {
      key: 'actions',
      label: '',
    },
  ],
  cardFields: [],
})

const actions = ref([
  {
    label: 'Editar',
    name: 'edit',
    icon: 'EditIcon',
    color: 'secundary',
  },
])
const massActions = ref([])

// State
const busy = ref(false)
const totalLicenses = ref(0)
const usedLicenses = ref(0)
const students = ref([])
const filters = reactive({
  currentPage: 1,
  pageSize: 15,
})
const fileName = ref('')
const student = ref({})

// Modal ref - if needed in future
const editStudentModalRef = ref(null)

const route = useRoute()

// Computed
const valid = computed(() => {
  let res = true
  const studentLength = students.value.length
  for (let i = 0; i < studentLength && res; i++) {
    const stu = students.value[i]
    res = verifyContent(stu)
  }
  return res
})

const rows = computed(() => students.value.length)

const studentsPaginated = computed(() => {
  return students.value.slice(
    (filters.currentPage - 1) * filters.pageSize,
    filters.currentPage * filters.pageSize
  )
})

// Lifecycle - created
function handleListStudents() {
  if (route.params.students && route.params.fileName) {
    students.value = route.params.students
    fileName.value = route.params.fileName
  }
}
handleListStudents()

// Lifecycle - mounted
onMounted(() => {
  // Add 'Delete' action dynamically
  actions.value.push({
    label: 'Apagar',
    name: 'delete',
    icon: 'TrashIcon',
    color: 'secundary',
    action: data => {
      students.value.splice(
        data.index + (filters.currentPage - 1) * filters.pageSize,
        1
      )
    },
  })
})

// Methods
function getDataByPage(data) {
  filters.currentPage = data
}

function setStudent(data) {
  student.value = data.item
  if (editStudentModalRef.value) {
    editStudentModalRef.value.show()
  }
}

function closeModal(data) {
  if (editStudentModalRef.value) {
    editStudentModalRef.value.hide()
    handleListStudents()
  }
}

function editStudent(data) {
  const idx = students.value.indexOf(data)
  if (idx !== -1) {
    students.value[idx] = data
  }
}

async function importStudents(resolveButton) {
  const studentsRequest = students.value

  if (!valid.value) {
    // Use $toast (root instance method)
    if (typeof getCurrentInstance === 'function') {
      // For Vue 3 -- NOT available in Vue 2.7 script setup, use traditional
    }
    // fallback: Use window.VueInstance?.$toast if available, or use global event?
    // As per migration guide, use legacy global Vue instance
    // eslint-disable-next-line
    this.$toast({
      component: Toast,
      props: {
        title: 'Atenção',
        icon: 'AlertTriangleIcon',
        text: 'Cadastros inválidos',
        variant: 'danger',
      },
    })
    return
  }

  try {
    const res = await importDirectors({
      filename: fileName.value,
      managers: studentsRequest,
    })

    if (res.status !== 200) {
      return
    }

    // eslint-disable-next-line
    this.$bvModal.show('modal-imported-spreadsheet')
  } finally {
    if (resolveButton) resolveButton()
  }
}

function orderByCallBack(value) {
  if (value.orderBy === 'statusImport') {
    students.value.sort((a, b) => {
      const validA = verifyContent(a)
      const validB = verifyContent(b)
      return value.Ascending ? validB - validA : validA - validB
    })
  } else {
    students.value = sortObjectListByKey(students.value, value.orderBy, !value.Ascending)
  }
}

function verifyContent(data) {
  if (!data.name || data.name === '') {
    return false
  }
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  if (data.email && !regex.test(data.email)) {
    return false
  }
  return true
}

// Expose for template usage (if needed)
</script>

<style lang="scss" scoped>
  .header-list-imports {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .new-import-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 24px;

    color: #2c2c2c;

    margin-bottom: 16px;
  }

  .new-import-description {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    color: #202223;

    margin-bottom: 16px;
  }
</style>