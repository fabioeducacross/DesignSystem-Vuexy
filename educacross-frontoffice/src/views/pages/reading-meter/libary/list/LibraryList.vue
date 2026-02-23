<template>
  <b-row>
    <!-- <b-col cols="12">
      <LibraryFilter />
    </b-col> -->
    <b-col cols="12">
      <ListTable
        :table-columns="tableColumns"
        :data-table="readings"
        :total-data="totalData"
        search-placeholder="Pesquisar por livro"
        :loading="loading"
        @change="changePage"
      >
        <template #cell(name)="{ item }">
          <div class="d-flex align-items-center gap-2">
            <b-img-lazy :src="item.imageUrl" v-bind="bookImgConfig" :alt="item.name" />
            <span class="whitespace-no-wrap font-bold">
              {{ item.name }}
            </span>
          </div>
        </template>

        <template #cell(serieName)="{ item }">
          <div>
            <b-badge variant="light-primary" pill>{{ item.serieName }}</b-badge>
          </div>
        </template>

        <template #cell(status)="{ value }">
          <div>
            <b-badge :variant="`light-${getReadingMeterStatusEnum(value).variant}`" pill>
              {{ getReadingMeterStatusEnum(value).text }}
            </b-badge>
          </div>
        </template>

        <template #cell(actions)="{ item }">
          <div class="text-nowrap d-flex align-items-center gap-3">
            <span
              v-for="(action, index) in tableActions"
              :key="index"
              v-b-tooltip.hover.top="action.tooltip(item, action.isEnabled(item))"
              :class="
                action.isEnabled(item)
                  ? `${action.color} cursor-pointer`
                  : 'cursor-not-allowed text-muted'
              "
              class="material-symbols-outlined"
              @click.stop="action.isEnabled(item) ? action.action(item) : null"
            >
              {{ action.icon }}
            </span>
          </div>
        </template>
      </ListTable>
    </b-col>
  </b-row>
</template>

<script setup>
import LibraryFilter from './LibraryFilter.vue'
import ListTable from '@/components/table/ListTable.vue'
import { getReadingMeterStatusEnum } from '@/consts/ReadingMeterEnum.js'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import { computed, ref, watch } from 'vue'

const { classe } = useFilters()

const totalData = computed(() => store.getters['ReadingMeterModule/libraryBooksTotal'])
const readings = computed(() => store.getters['ReadingMeterModule/libraryBooks'])
const loading = computed(() => store.getters['ReadingMeterModule/loading'])

const tableColumns = [
  {
    key: 'name',
    label: 'Livro',
  },

  {
    key: 'author',
    label: 'Autor',
  },
  {
    key: 'actions',
    label: 'AÇÕES',
    thStyle: { width: '120px' },
  },
]

const tableActions = [
  {
    icon: 'pie_chart',
    tooltip: (data, isEnabled) => {
      return isEnabled
        ? 'Relatórios'
        : 'Esta função não está disponível, pois o teste está desabilitado.'
    },
    isEnabled: data => data.status !== 1,
    color: 'text-primary',
    action: data => {
      router.push({
        name: 'readingMetherLibraryDetail',
        params: {
          bookId: data.id,
        },
      })
    },
  },
]

const bookImgConfig = {
  blank: true,
  blankColor: '#bbb',
  width: 41,
  height: 54,
}

const changePage = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('ReadingMeterModule/libraryBooksParams', {
    Search: searchQuery,
    OrderBy: `${sortBy}`,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
    ClassId: classe.value.ClassId,
  })
  store.dispatch('ReadingMeterModule/fetchBookLibrary')
}

store.commit('ReadingMeterModule/reset')
// store.dispatch('ReadingMeterModule/fetchData')

const generatingExcel = ref(false)

const exportToExcel = () => {
  generatingExcel.value = true
  /*  getTeachersAccessExcel({
    month: monthId.value,
    module: moduleId.value,
    educationSystemId: moduleId.value === 11 ? educationSystemId.value : null,
    institutionId: institutionId.value,
  })
    .then(response => {
      const fileName = 'Relatório acesso de Professores.xlsx'
      saveAs(response.data, fileName)
    })
    .finally(() => {
      generatingExcel.value = false
    }) */
}

store.dispatch('ReadingMeterModule/fetchBookLibrary')

watch(classe, () => {
  store.commit('ReadingMeterModule/libraryBooksParams', {
    Search: '',
    OrderBy: null,
    Ascending: true,
    Page: 1,
    PageSize: 10,
  })
  store.dispatch('ReadingMeterModule/fetchBookLibrary')
})

</script>