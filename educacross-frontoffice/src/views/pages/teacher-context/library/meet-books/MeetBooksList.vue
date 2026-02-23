<template>
  <section>
    <b-card no-body>
      <b-card-body>
        <b-row class="mb-1">
          <b-col
            cols="12"
            md="auto"
            class="d-flex align-items-center flex-wrap justify-content-start mb-1 mb-md-0"
          >
            <label>Mostrar: </label>
            <ESelect
              id="items-per-page"
              v-model="pageSize"
              :options="[4, 12, 24, 50, 100]"
              :clearable="false"
              :searchable="false"
              class="per-page-selector d-inline-block mx-50"
            />
          </b-col>
        </b-row>
      </b-card-body>
      <div class="border border-bottom-0"></div>
      <b-card-body class="d-flex justify-content-between">
        <b-form-checkbox
          v-model="selectAll"
          :indeterminate="indeterminate"
          @change="changeSelectAll"
        >
          Selecionar todos
        </b-form-checkbox>
        <div>
          <span>Livros selecionados: </span>
          <span class="text-primary">{{ selectAll ? totalData : checkedItems.length }}</span>
        </div>
      </b-card-body>
    </b-card>
    <b-alert variant="primary" show class="p-1">
      <span
        class="material-symbols-outlined align-middle"
        style="font-size: 16px; vertical-align: middle"
      >
        info
      </span>
      <p class="mb-0 align-middle inline">
        Os livros habilitados são exibidos nas estantes da
        <span class="font-weight-bolder">Biblioteca de Livros</span> do aluno.
      </p>
    </b-alert>
    <b-skeleton-wrapper :loading="isLoading">
      <template v-slot:loading>
        <b-row>
          <b-col v-for="n in 4" :key="n" sm="12" md="6" lg="3" class="mb-1">
            <b-card>
              <b-skeleton-img height="457px" />
            </b-card>
          </b-col>
        </b-row>
      </template>
      <b-row class="match-height">
        <b-col v-for="data in dataTable" :key="data.id" sm="12" md="6" lg="3">
          <MeetBookCard
            :item="data"
            :check="selectAll ? true : checkedItems.includes(data.id)"
            :loading-details="data.id === loadingOpenBookDetailsId"
            :audio-enabled="enableBookAudio"
            @open="open(data.id)"
            @update:check="changeCheck"
            @update:enabled="changeEnabled"
          />
        </b-col>
      </b-row>
    </b-skeleton-wrapper>

    <b-card>
      <ListTablePagination
        :value="currentPage"
        :total-data="totalData"
        :per-page="pageSize"
        @input="changePage"
      />
    </b-card>

    <b-modal
      ref="Modal"
      :visible="openDetails"
      hide-footer
      centered
      title="Detalhes do livro"
      size="xl"
      no-close-on-backdrop
      static
      header-bg-variant="light-primary"
      @close="
        () => {
          openDetails = false
        }
      "
    >
      <div v-if="openDetails">
        <BookDetails :book-details="bookToShow" />
      </div>
    </b-modal>
    <b-modal
      v-model="showModalChangeEnabledBook"
      hide-footer
      hide-header
      centered
      no-close-on-backdrop
    >
      <div class="text-center">
        <span class="material-symbols-outlined text-warning" style="font-size: 80px"> error </span>
        <div v-if="enablingBookObject.enabled">
          <h3>Tem certeza que deseja habilitar?</h3>
          <p>
            O livro ficará disponível para a turma
            <span class="text-primary font-weight-bolder">{{ classe.Name }}.</span>
          </p>
        </div>

        <div v-else>
          <h3>Tem certeza que deseja desabilitar?</h3>
          <p>
            O livro ficará indisponível aos alunos da turma
            <span class="text-primary font-weight-bolder">{{ classe.Name }}.</span>
          </p>
        </div>

        <b-button
          variant="outline-danger"
          class="mr-1"
          :disabled="changeEnabledModalLoading"
          @click="cancelChangeEnabled"
        >
          Cancelar
        </b-button>
        <b-button
          variant="primary"
          :disabled="changeEnabledModalLoading"
          @click="continueChangeEnabled"
        >
          <b-spinner v-show="changeEnabledModalLoading" show small></b-spinner>
          Sim, {{ enablingBookObject.enabled ? 'habilitar' : 'desabilitar' }}
        </b-button>
      </div>
    </b-modal>
  </section>
</template>

<script>
export default {
  name: 'MeetBooksList',
}
</script>

<script setup>
import { useMeetBooks } from './useMeetBooks'
import BookDetails from './components/BookDetails.vue'
import ESelect from '@/components/selects/ESelect.vue'
import ListTablePagination from '@/components/table/ListTablePagination.vue'
import ListTableSelect from '@/components/table/ListTableSelect.vue'
import axiosIns from '@/libs/axios'
import { getBookDetails } from '@/services/teacher-context/books/BookLibrary.service.js'
import useFilters from '@/store/filters/useFilters.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import MeetBookCard from '@/views/pages/teacher-context/library/meet-books/components/MeetBookCard.vue'
import { getCurrentInstance, ref, watch } from 'vue'

const { classe } = useFilters()
const {
  dataTable,
  totalData,
  filters,
  pageSize,
  checkedItems,
  currentPage,
  selectAll,
  indeterminate,
  isLoading,
  enableBookAudio,
  fetchBooks,
  search,
} = useMeetBooks()

const vm = getCurrentInstance().proxy
const bookToShow = ref(null)
const showModalChangeEnabledBook = ref(false)
const changeEnabledModalLoading = ref(false)
const enablingBookObject = ref({})

const tableColumns = [
  { key: 'name', label: 'Nome', sortable: true, searchable: true },
  { key: 'actions', label: 'Ações', sortable: false },
]

const openDetails = ref(false)
const loadingOpenBookDetailsId = ref(null)

const open = async id => {
  if (loadingOpenBookDetailsId.value) return
  loadingOpenBookDetailsId.value = id
  const response = await getBookDetails(id)

  bookToShow.value = response.data
  openDetails.value = true
  loadingOpenBookDetailsId.value = null
}

const changeEnabled = enablingObject => {
  enablingBookObject.value = enablingObject
  showModalChangeEnabledBook.value = true

  const { enabled, id } = enablingObject
  const dtCopy = dataTable.value.map(item => {
    if (item.id === id) {
      return {
        ...item,
        loading: true,
        enabled: !enabled,
      }
    }
    return item
  })

  dataTable.value = dtCopy
}

const continueChangeEnabled = async () => {
  changeEnabledModalLoading.value = true
  const { id, enabled } = enablingBookObject.value

  const classId = classe.value.ClassId
  await axiosIns.put(`/v2/book-library/${id}`, { classId })

  const dtCopy = dataTable.value.map(item => {
    if (item.id === id) {
      return {
        ...item,
        enabled,
        loading: false,
      }
    }
    return item
  })

  dataTable.value = dtCopy

  vm.$toast({
    component: Toast,
    props: {
      title: `Livro ${enabled ? 'habilitado' : 'desabilitado'} com sucesso!`,
      icon: 'CheckCircleIcon',
      variant: 'success',
    },
  })

  showModalChangeEnabledBook.value = false
  changeEnabledModalLoading.value = false
}

const cancelChangeEnabled = () => {
  showModalChangeEnabledBook.value = false
  const { id } = enablingBookObject.value
  const dtCopy = dataTable.value.map(item => {
    if (item.id === id) {
      return {
        ...item,
        loading: false,
      }
    }
    return item
  })

  dataTable.value = dtCopy
}

const changeCheck = ({ id, checked }) => {
  const selectAllCopy = selectAll.value

  if (checked) {
    checkedItems.value.push(id)
  } else {
    checkedItems.value = checkedItems.value.filter(item => item !== id)
  }

  if (selectAllCopy) {
    checkedItems.value = dataTable.value.map(item => item.id).filter(item => item !== id)
  }

  selectAll.value = checkedItems.value.length === totalData.value

  if (selectAll.value) {
    checkedItems.value = []
  }
}

const changePage = value => {
  currentPage.value = value

  fetchBooks()
}

const changeSelectAll = () => {
  checkedItems.value = []
}

watch(
  filters,
  () => {
    search()
  },
  { deep: true },
)

watch(pageSize, () => {
  currentPage.value = 1
  fetchBooks()
})
</script>
<style lang="scss" scoped>
  .per-page-selector {
    width: 90px;
    min-width: 90px;
  }
</style>
