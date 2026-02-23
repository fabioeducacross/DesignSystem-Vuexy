<template>
  <section>
    <b-card v-if="$can(ACTION.CREATE, PERMISSION.GENERAL.MANAGE_CLASSES)">
      <b-row>
        <b-col class="d-flex justify-content-end">
          <div>
            <b-button variant="primary" @click="handleCreateClick"> Nova Turma </b-button>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <!-- LIST -->
    <ListTable
      ref="tableRef"
      :loading="loading"
      :table-columns="tableColumns"
      :data-table="dataTable"
      :total-data="totalData"
      search-placeholder="Pesquisar por turma"
      show-view-selection
      @change="changeListTable"
    >
      <template #cell(name)="{ item }">
        <div class="text-wrap" style="min-width: 120px">
          <span class="font-bold">{{ item.name }}</span>
        </div>
      </template>
      <template #cell(students)="{ item }">
        <span class="font-bold">{{ item.students }}</span>
      </template>
      <template #cell(serie)="{ item }">
        <b-badge pill variant="light-primary">
          {{ item.serie.name }}
        </b-badge>
      </template>
      <template #cell(teachers)="{ item }">
        <ListInitialsTeacher :data="item.teachers"> </ListInitialsTeacher>
      </template>

      <template #cell(actions)="{ item }">
        <div class="d-flex gap-1">
          <span
            v-if="$can(ACTION.UPDATE, PERMISSION.GENERAL.MANAGE_CLASSES)"
            v-b-tooltip="'Editar'"
            class="material-symbols-outlined text-primary cursor-pointer"
            @click.stop="editClass(item.id)"
            >edit</span
          >
          <AppLanguageSelector
            v-if="$can(ACTION.READ, PERMISSION.GENERAL.IDIOM)"
            :ref="`idiom-${item.id}`"
            :value="item.idiomId"
            @input="changeIdiom($event, item.id, `idiom-${item.id}`)"
          />
        </div>
      </template>
      <template v-slot:card="{ data }">
        <b-card>
          <div class="d-flex align-items-center flex-column">
            <b-badge pill variant="primary" class="mb-2">
              <span>
                {{ data.serie.name }}
              </span>
            </b-badge>
            <h4 class="m-25 text-body">{{ data.name }}</h4>
            <div class="d-flex align-items-center gap-2">
              <span class="material-symbols-outlined text-primary">group</span>
              <span class="text-primary font-weight-bold">Alunos</span>
              <span class="text-primary font-weight-bold">{{ data.students }}</span>
            </div>
          </div>
          <hr class="mb-2" />

          <div class="d-flex justify-center gap-1">
            <span
              v-if="$can(ACTION.UPDATE, PERMISSION.GENERAL.MANAGE_CLASSES)"
              v-b-tooltip="'Editar'"
              class="material-symbols-outlined text-primary cursor-pointer"
              @click.stop="editRow(data.id)"
              >edit</span
            >
            <AppLanguageSelector
              v-if="$can(ACTION.READ, PERMISSION.GENERAL.IDIOM)"
              :ref="`idiom-${data.id}-2`"
              :value="data.idiomId"
              @input="changeIdiom($event, data.id, `idiom-${data.id}-2`)"
            />
          </div>
        </b-card>
      </template>
    </ListTable>
    <CreateClassesSidebar v-model="sidebarActive" :class-id="classToEdit" @refresh="fetch" />
  </section>
</template>

<script setup>
import AppLanguageSelector from '@/components/app-language-selector/AppLanguageSelector.vue'
import ListTable from '@/components/table/ListTable.vue'
import ListInitialsTeacher from '@/components/teacher/listInitialsTeacher.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { getClassesV2, changeClassIdiom } from '@/services/shared/classes/Classes.service'
import useTable from '@/store/table/useTable.js'
import CreateClassesSidebar from '@/views/pages/admin-context/records/classes/CreateClassesSidebar.vue'
import { computed, getCurrentInstance, ref } from 'vue'

const { params, loading, totalData, tableRef, dataTable } = useTable()

const vm = getCurrentInstance().proxy

const tableColumns = computed(() => {
  const columns = [
    {
      key: 'name',
      label: 'Turma',
      sortable: true,
      searchable: true,
    },
    { key: 'serie', label: 'Ano escolar', sortable: true },
    { key: 'students', label: 'Alunos na turma', sortable: true },
    { key: 'teachers', label: 'Professores', sortable: false },
  ]

  if (
    vm.$can(ACTION.READ, PERMISSION.GENERAL.IDIOM) ||
    vm.$can(ACTION.UPDATE, PERMISSION.GENERAL.MANAGE_CLASSES)
  ) {
    columns.push({
      key: 'actions',
      label: 'Ações',
    })
  }

  return columns
})

const fetch = async () => {
  loading.value = true

  const res = await getClassesV2({ ...params.value, ClassName: params.value.Search })

  dataTable.value = res.data.data
  totalData.value = res.data.total

  loading.value = false
}

const changeListTable = data => {
  params.value = data
  fetch()
}

fetch()

const sidebarActive = ref(false)
const classToEdit = ref(null)

const changeSidebar = (val, classId = null) => {
  sidebarActive.value = val
  classToEdit.value = classId
}

const handleCreateClick = () => {
  changeSidebar(true)
}

const editClass = idRow => {
  changeSidebar(true, idRow)
}

const editRow = idRow => {
  changeSidebar(true, idRow)
}

const changeIdiom = (idiomId, classId, refName) => {
  vm.$refs[refName].loading = true
  changeClassIdiom(classId, idiomId).finally(() => {
    vm.$refs[refName].loading = false
    dataTable.value.forEach(element => {
      if (element.id === classId) {
        element.idiomId = idiomId
      }
    })
  })
}
</script>