<template>
  <section>
    <ValidationObserver ref="updateValidation">
      <b-form @submit.prevent="prepareCreateGroup">
        <b-card>
          <b-row>
            <b-col cols="12" sm="6">
              <b-form-group id="name-group" label="Nome do grupo *" label-for="groupNameInput">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="nome do grupo"
                  rules="required|max:20"
                >
                  <b-form-input
                    id="groupNameInput"
                    v-model="groupName"
                    class="w-full"
                    type="text"
                    placeholder="Digite um nome para o grupo"
                    autocomplete="off"
                    required
                    maxlength="20"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small v-for="(error, index) in errors" :key="index" class="text-danger">
                    {{ error }}
                  </small>
                </ValidationProvider>
              </b-form-group>
            </b-col>

            <b-col cols="12" sm="6">
              <b-form-group label="Incluir alunos no grupo" label-for="class">
                <ValidationProvider v-slot="{ errors }" name="Turma" rules="required">
                  <ESelect
                    :value="selectedClass"
                    :options="classOptions"
                    label="name"
                    placeholder="Selecione uma Turma"
                    :loading="loadingClass"
                    :total-pages="classTotalPages"
                    :page="classPage"
                    paginated
                    :disabled="!!groupId"
                    @input="handleSelectClass"
                    @nextPage="fetchClassData"
                  >
                    <template v-slot:selected-option="{ name, serieName }">
                      <div>
                        <span>
                          {{ name }}
                        </span>
                        <b-badge v-if="serieName" pill variant="light-primary">
                          {{ serieName }}
                        </b-badge>
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
                          :class="selectedClass.id === id ? 'bg-white text-primary' : ''"
                        >
                          {{ serieName }}
                        </b-badge>
                      </div>
                    </template>
                  </ESelect>
                  <small v-for="(error, index) in errors" :key="index" class="text-danger">
                    {{ error }}
                  </small>
                </ValidationProvider>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
        <b-row class="mb-2">
          <b-col cols="12" md="5">
            <b-alert variant="primary" class="mb-0" show>
              <div class="alert-body">
                <span class="font-bold"
                  >Total de alunos no grupo: {{ selectedStudents.length }}</span
                >
              </div>
            </b-alert>
          </b-col>
          <b-col cols="12" md="3">
            <b-dropdown
              variant="outline-primary"
              text="Ações em lote"
              block
              :disabled="selectedStudentsSelected.length <= 1"
            >
              <b-dropdown-item @click.stop="massDelete">
                <span class="text-danger">
                  <span
                    class="material-icons-outlined"
                    style="font-size: 14px; vertical-align: sub"
                  >
                    group_remove
                  </span>
                  Excluir Alunos</span
                >
              </b-dropdown-item>
            </b-dropdown>
          </b-col>
          <b-col cols="12" md="4">
            <b-button
              variant="primary"
              name="openModalStudents"
              block
              @click.prevent="openModalStudents"
            >
              <span class="material-icons-outlined" style="font-size: 16px; vertical-align: bottom">
                group_add
              </span>
              Adicionar alunos ao grupo
            </b-button>
          </b-col>
        </b-row>
        <ListTableSelectLocal
          v-model="selectedStudentsSelected"
          :table-columns="tableColumns"
          :data-table="selectedStudents"
          search-placeholder="Pesquisar por aluno selecionado"
          selected-label="Alunos selecionados"
          :loading="loading"
        >
          <template #cell(actions)="{ item }">
            <span
              v-b-tooltip="'Excluir aluno do grupo'"
              class="material-symbols-outlined text-danger"
              @click.stop="removeSelectedStudent(item)"
            >
              group_remove
            </span>
          </template>
        </ListTableSelectLocal>

        <b-card>
          <b-row>
            <b-col cols="12" sm="6">
              <b-button
                block
                variant="outline-danger"
                :disabled="loading || loadingChange"
                @click="prepareCancel"
              >
                Cancelar
              </b-button>
            </b-col>
            <b-col cols="12" sm="6">
              <b-button
                :disabled="!selectedStudents.length || loading || loadingChange"
                block
                variant="primary"
                type="submit"
              >
                {{ groupId ? 'Salvar alterações' : 'Criar Grupo' }}
                <b-spinner v-if="loadingChange" variant="light" small></b-spinner>
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-form>
    </ValidationObserver>
    <ModalConfirm v-model="openConfirmSave" :callback-confirm="save" label-confirm="Salvar">
      <h4>Tem certeza que deseja salvar?</h4>
      <p>
        Você está criando o grupo
        <span class="text-primary font-bold">{{ groupName }}</span> com
        <span class="text-primary font-bold">{{ selectedStudents.length }} alunos.</span>
      </p>
    </ModalConfirm>
    <ModalConfirm
      v-model="openConfirmCancel"
      :callback-cancel="cancel"
      :callback-confirm="closeCancel"
      label-cancel="Sim, cancelar"
      label-confirm="Continuar editando"
    >
      <h4>Tem certeza que deseja cancelar?</h4>
      <p>Seus dados ainda não foram salvos. Ao sair você perderá as suas alterações.</p>
    </ModalConfirm>
    <b-modal
      v-model="openStudentsModal"
      static
      centered
      no-close-on-backdrop
      size="xl"
      hide-footer
      body-class="p-0"
      title="Adicionar alunos ao grupo"
    >
      <CreateGroupListTable
        :classe="selectedClass"
        :value="selectedStudents"
        @close="openStudentsModal = false"
        @input="
          students => {
            selectedStudents.push(...students)
            openStudentsModal = false
          }
        "
      />
    </b-modal>
    <ModalConfirm
      v-model="changeClassModalConfirm"
      :callback-cancel="cancelChangeClass"
      :callback-confirm="confirmChangeClass"
      label-cancel="Cancelar"
      label-confirm="Sim, trocar turma"
    >
      <h4>Tem certeza que deseja alterar a turma?</h4>
      <p>
        Ao trocar de turma você perderá todas as escolhas feitas em
        <span class="text-primary">{{ selectedClass.name }}</span>
      </p>
    </ModalConfirm>
  </section>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import ListTableSelectLocal from '@/components/table/ListTableSelectLocal.vue'
import router from '@/router'
import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
import { postGroup, getGroup, putGroup } from '@/services/shared/groups/Groups.service.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import CreateGroupListTable from '@/views/pages/groups/create/CreateGroupListTable.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref, getCurrentInstance, onMounted } from 'vue'

const updateValidation = ref(null)

const groupName = ref('')
const selectedStudents = ref([])
const selectedStudentsSelected = ref([])
const openConfirmSave = ref(false)
const openConfirmCancel = ref(false)
const openStudentsModal = ref(false)
const loading = ref(false)
const loadingChange = ref(false)
const changeClassModalConfirm = ref(false)

// class variables
const classOptions = ref([])
const classPage = ref(1)
const classTotalPages = ref(1)
const loadingClass = ref(true)

const selectedClass = ref({})
const tempSelectedClass = ref({})

const PER_PAGE_DEFAULT = 10

const vm = getCurrentInstance().proxy
const toast = vm.$toast
const { groupId } = vm.$route.params

const fetchClassData = async (ctx = {}) => {
  const { search, page } = ctx
  classPage.value = page
  loadingClass.value = true

  const { data } = await getClassesV2Label({
    page: classPage.value,
    search,
    pageSize: PER_PAGE_DEFAULT,
  })

  classTotalPages.value = data.totalPages

  if (classPage.value === 1) {
    classOptions.value = []
  }

  classOptions.value.push(...data.data)
  loadingClass.value = false
}

const fetchPostGroup = () => {
  openConfirmSave.value = false
  loadingChange.value = true

  postGroup({
    name: groupName.value,
    classId: selectedClass.value.id,
    studentsIds: selectedStudents.value.map(item => item.id),
  }).then(() => {
    toast({
      component: Toast,
      props: {
        title: 'Novo grupo criado com sucesso!',
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })
    router.push({
      name: 'GroupsList',
    })
  })

  loadingChange.value = false
}

const fetchPutGroup = () => {
  openConfirmSave.value = false
  loadingChange.value = true

  putGroup(groupId, {
    name: groupName.value,
    classId: selectedClass.value.id,
    studentsIds: selectedStudents.value.map(item => item.id),
  }).then(() => {
    toast({
      component: Toast,
      props: {
        title: 'Grupo alterado com sucesso!',
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })
    router.push({
      name: 'GroupsList',
    })
  })

  loadingChange.value = false
}

const prepareCancel = () => {
  openConfirmCancel.value = true
}

const closeCancel = () => {
  openConfirmCancel.value = false
}

const cancel = () => {
  router.push({
    name: 'GroupsList',
  })
}

const prepareCreateGroup = () => {
  updateValidation.value.validate().then(result => {
    if (result) {
      openConfirmSave.value = true
    }
  })
}

const save = () => {
  if (groupId) {
    fetchPutGroup()
    return
  }

  fetchPostGroup()
}

const fetchGroup = async () => {
  const { data } = await getGroup(groupId)

  groupName.value = data.name
  selectedStudents.value = data.students
  selectedClass.value = data.class
}

const openModalStudents = () => {
  openStudentsModal.value = true
}

const tableColumns = [
  { key: 'name', label: 'Aluno', sortable: true, searchable: true },
  { key: 'actions', label: 'Ações' },
]

const removeSelectedStudent = student => {
  selectedStudents.value = selectedStudents.value.filter(s => s.id !== student.id)
}

const massDelete = () => {
  selectedStudents.value = selectedStudents.value.filter(
    student => !selectedStudentsSelected.value.some(s => s.id === student.id),
  )
}

const cancelChangeClass = () => {
  changeClassModalConfirm.value = false
}

const confirmChangeClass = () => {
  changeClassModalConfirm.value = false

  selectedClass.value = tempSelectedClass.value
  selectedStudents.value = []
  selectedStudentsSelected.value = []

  tempSelectedClass.value = {}
}

const handleSelectClass = classe => {
  tempSelectedClass.value = classe

  if (selectedStudents.value.length > 0) {
    changeClassModalConfirm.value = true
    return
  }

  selectedClass.value = classe
  tempSelectedClass.value = {}
}

onMounted(async () => {
  if (groupId) {
    await fetchGroup()
  } else {
    await fetchClassData()
    selectedClass.value = classOptions.value[0]
  }
})
</script>