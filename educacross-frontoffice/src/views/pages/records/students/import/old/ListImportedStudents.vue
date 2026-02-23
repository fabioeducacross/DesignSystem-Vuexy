<template>
  <div>
    <div class="header-list-imports">
      <div>
        <h1 class="new-import-title">Importar cadastros de alunos</h1>
        <p class="new-import-description">
          Confira os dados abaixo, você ainda pode editar e remover usuários da lista antes de
          iniciar a importação.
        </p>
      </div>
      <b-button
        v-b-tooltip.hover="valid ? null : 'Todos os cadastros devem ser válidos'"
        :disabled="!valid || busy"
        variant="primary"
        @click="handleImportStudents"
      >
        <b-spinner v-show="busy" small />
        Importar acessos
      </b-button>
    </div>
    <dynamic-table-paginated
      role="Aluno"
      :data="studentsPaginated"
      :actions="actions"
      :mass-actions="massActions"
      show-by="list"
      :config="tableConfig"
      label-name="alunos"
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
    <b-modal
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
    </b-modal>
    <ModalImportedSpreadsheet />
  </div>
</template>

<script setup>
  import ModalEditStudent from '../../components/ModalEditStudent.vue'
  import ModalImportedSpreadsheet from './ModalImportedSpreadsheet.vue'
  import buttonWaitAction from '@/components/form/button/ButtonWaitAction.vue'
  import { ACTION, PERMISSION } from '@/consts/permissions'
  import { importStudents } from '@/services/admin-context/students/Students.service'
  import sortObjectListByKey from '@/utils/sort'
  import DynamicTable from '@/views/pages/admin-context/shared/components/tables/DynamicTable.vue'
  import DynamicTablePaginated from '@/views/pages/admin-context/shared/components/tables/DynamicTablePaginated.vue'
  import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
  import { BButton, BModal, VBModal } from 'bootstrap-vue'

  import { ref, reactive, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router/composables'

  // Directives
  const directives = {
    'b-modal': VBModal,
  }

  // State
  const busy = ref(false)
  const totalLicenses = ref(0)
  const usedLicenses = ref(0)
  const students = ref([])
  const orderByEnum = ref(['StatusImport'])
  const filters = reactive({
    currentPage: 1,
    pageSize: 15,
  })
  const tableConfig = reactive({
    tableFields: [
      {
        key: 'name',
        label: 'Nome do aluno*',
        componentName: '',
      },
      {
        key: 'sponsorEmail',
        label: 'E-mail do responsável',
        componentName: '',
      },
      {
        key: 'class.name',
        label: 'Turma*',
        componentName: '',
      },
      {
        key: 'statusImport',
        label: 'Válido',
        componentName: 'ValidInvalidRow',
        sortable: true,
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
  const fileName = ref('')
  const student = ref({})

  // Store/Router/Route
  const route = useRoute()
  const router = useRouter()

  // Toast ref and modal
  const editStudentModalRef = ref(null)

  // Computed
  const valid = computed(() => {
    let res = true
    const studentList = students.value
    const studentLength = studentList.length
    for (let i = 0; i < studentLength && res; i++) {
      const item = studentList[i]
      res = verifyContent(item)
    }
    return res
  })

  const rows = computed(() => students.value.length)

  const studentsPaginated = computed(() => {
    return students.value.slice(
      (filters.currentPage - 1) * filters.pageSize,
      filters.currentPage * filters.pageSize,
    )
  })

  // Methods
  const getDataByPage = page => {
    filters.currentPage = page
  }

  const setStudent = data => {
    student.value = data.item
    if (editStudentModalRef.value) editStudentModalRef.value.show()
  }

  const closeModal = refName => {
    if (editStudentModalRef.value) editStudentModalRef.value.hide()
    handleListStudents()
  }

  const editStudent = data => {
    const idx = students.value.indexOf(data)
    if (idx !== -1) {
      students.value[idx] = data
    }
  }

  const handleImportStudents = async () => {
    busy.value = true
    const studentsRequest = students.value.map(s => ({
      ...s,
      ClassId: s.class.id,
      AvatarIdentifier: 'Masculino',
    }))
    if (valid.value) {
      await importStudents({
        filename: fileName.value,
        studentAccess: studentsRequest,
      })
        .then(() => {
          // Show modal via $bvModal (use BModal's show method in Vue 2.7)
          // Vuexy uses plugin for $bvModal, in Vue 2.7 + script setup, must $root.$bvModal or use ref to modal-imported-spreadsheet
          // Fallback: trigger via $root or eventBus, here omitted since importStudents triggers modal
          // Or use eventBus/$root.$bvModal which must be globally handled
          // Assuming Vuexy still wires $bvModal, can use:
          if (typeof window !== 'undefined' && window.vm && window.vm.$bvModal) {
            window.vm.$bvModal.show('modal-imported-spreadsheet')
          }
        })
        .finally(() => {
          busy.value = false
        })
    } else {
      if (typeof window !== 'undefined' && window.vm && typeof window.vm.$toast === 'function') {
        window.vm.$toast({
          component: Toast,
          props: {
            title: 'Atenção',
            icon: 'AlertTriangleIcon',
            text: 'Cadastros inválidos',
            variant: 'danger',
          },
        })
      }
    }
  }


  const handleListStudents = () => {
    if (route.params.students && route.params.fileName) {
      students.value = route.params.students
      fileName.value = route.params.fileName
    } else {
      // Use $can global for permissions
      // In Vue 2.7, global properties accessible via window.vm or inject; fallback to window.vm
      let canReadTeacher = false
      if (typeof window !== 'undefined' && window.vm && typeof window.vm.$can === 'function') {
        canReadTeacher = window.vm.$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)
      }
      if (canReadTeacher) {
        router.push({
          name: 'listImportStudentTeacher',
        })
        return
      }
      router.push({
        name: 'listImportStudentAdmin',
      })
    }
  }

  const orderByCallBack = value => {
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
    if (!data.name || data.name === '' || data.name.length > 50) {
      return false
    }

    if (!data.class) {
      return false
    }

    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    if (data.sponsorEmail && !regex.test(data.sponsorEmail)) {
      return false
    }

    return true
  }

  // Lifecycle
  // No created, but in <script setup> this runs immediately
  handleListStudents()

  onMounted(() => {
    actions.value.push({
      label: 'Apagar',
      name: 'delete',
      icon: 'TrashIcon',
      color: 'secundary',
      action: data => {
        students.value.splice(data.index + (filters.currentPage - 1) * filters.pageSize, 1)
      },
    })
  })
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
