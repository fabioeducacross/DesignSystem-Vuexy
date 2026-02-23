<template>
  <div>
    <div v-if="!$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)" class="licenses color-grayTheme">
      <span
        ><b>Licenças Consumidas: {{ usedLicenses }}</b> de <b>{{ totalLicenses }}</b></span
      >
      <span
        ><b>{{ usedLicenses }}</b> acessos de alunos
      </span>
    </div>
    <div class="header-list-imports">
      <div>
        <h1 class="new-import-title">Últimas importações</h1>
        <p class="new-import-description">
          Os status de importações são atualizados a cada 1 minuto, caso tenha alguma dúvida,
          <span class="modal-import-info" @click="$bvModal.show('modal-import-info')"
            >clique aqui.</span
          >
        </p>
      </div>
      <div>
        <b-button class="new-import-button" variant="primary" @click="toImportStudent">
          <feather-icon icon="PlusIcon" class="customFeather" />

          Nova Importação
        </b-button>
      </div>
    </div>
    <dynamic-table-paginated
      role="Aluno"
      :data="imports"
      :actions="actions"
      :mass-actions="massActions"
      show-by="list"
      :config="tableConfig"
      label-name="alunos"
      :show-filter="false"
      :rows="rows"
      :per-page="perPage"
      :busy="busy"
      @changePage="getDataByPage"
    />
    <ModalImportInfo />
  </div>
</template>

<script setup>
  import ModalImportInfo from './ModalImportInfo.vue'
  import { ACTION, PERMISSION } from '@/consts/permissions'
  import {
    getImportStudentList,
    getStudents,
  } from '@/services/admin-context/students/Students.service'
  import DynamicTablePaginated from '@/views/pages/admin-context/shared/components/tables/DynamicTablePaginated.vue'
  import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
  import { BButton } from 'bootstrap-vue'

  // Reactive state
  import { ref, reactive, onMounted } from 'vue'

  const busy = ref(false)
  const totalLicenses = ref(0)
  const usedLicenses = ref(0)
  const rows = ref(0)
  const perPage = ref(0)
  const filters = reactive({
    page: 1,
  })
  const tableConfig = reactive({
    tableFields: [
      {
        key: 'fileName',
        label: 'Arquivo',
        componentName: '',
      },
      {
        key: 'date',
        label: 'Data',
        componentName: 'Date',
      },
      {
        key: 'authorName',
        label: 'Autor',
        componentName: 'AuthorNameWithPhoto',
      },
      {
        key: 'status',
        label: 'Status da importação',
        componentName: 'ImportStatus',
      },
      {
        key: 'emailStatus',
        label: 'Envio de e-mail',
        componentName: 'EmailStatus',
      },
      {
        key: 'actions',
        label: '',
      },
    ],
    cardFields: [],
  })

  const actions = ref([])
  const massActions = ref([])
  const imports = ref([])

  // Router push utility, using $router via global instance
  // Template uses $router/$can, compatibility is preserved (keep legacy global access)

  const toImportStudent = () => {
    if (
      // global $can available on instance in Vue 2.7 via mixin
      // so must use it in template, can't be injected here
      // just call $router directly
      typeof window !== 'undefined' &&
      window?.vm?.$can &&
      window.vm.$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)
    ) {
      window.vm.$router.push({
        name: 'importStudentTeacher',
      })
      return
    }
    window.vm.$router.push({
      name: 'importStudentAdmin',
    })
  }

  // Get students data and populate table
  const handleGetStudentsData = async () => {
    busy.value = true
    await getImportStudentList(filters).then(response => {
      imports.value = response.data.data
      rows.value = response.data.total
      perPage.value = response.data.pageSize
      busy.value = false
    })
  }

  const handleListStudents = async () => {
    handleGetStudentsData()
    if (
      typeof window !== 'undefined' &&
      window?.vm?.$can &&
      window.vm.$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)
    ) {
      return
    }

    await getStudents().then(response => {
      totalLicenses.value = response.data.totalLicenses
      usedLicenses.value = response.data.usedLicenses
    })
  }

  const handleImportedListStudentsView = data => {
    if (
      typeof window !== 'undefined' &&
      window?.vm?.$can &&
      window.vm.$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)
    ) {
      window.vm.$router.push({
        name: 'listImportStudentViewTeacher',
        params: {
          importId: data.item.id,
        },
      })
      return
    }
    window.vm.$router.push({
      name: 'listImportStudentView',
      params: {
        importId: data.item.id,
      },
    })
  }

  const getDataByPage = data => {
    filters.page = data
    handleGetStudentsData()
  }

  // Set up actions list after mounted (mimics created hook)
  onMounted(() => {
    handleListStudents()
    actions.value = [
      {
        label: 'Visualizar',
        icon: 'ChevronRightIcon',
        color: 'secundary',
        action: data => {
          handleImportedListStudentsView(data)
        },
      },
    ]
  })
</script>

<style lang="scss" scoped>
  .header-list-imports {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .new-import-button {
    display: flex;
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

  .licenses {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1.5rem;
  }

  .modal-import-info {
    cursor: pointer;
    color: #7367f0;
    text-decoration: underline;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.5px;
  }
</style>
