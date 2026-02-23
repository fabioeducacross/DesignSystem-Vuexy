<template>
  <div>
    <b-card no-body :class="cardClass">
      <slot name="header" />
      <b-row class="p-2">
        <!-- Per Page -->
        <b-col
          cols="12"
          md="auto"
          class="d-flex align-items-center flex-wrap justify-content-start mb-1 mb-md-0"
        >
          <label>{{ $t('show') }}</label>
          <v-select
            v-model="perPage"
            :options="perPageOptions"
            :clearable="false"
            :searchable="false"
            class="per-page-selector d-inline-block mx-50"
          />
        </b-col>

        <!-- Search -->
        <b-col cols="12" md>
          <b-row align-h="end" align-v="center">
            <b-col v-if="showSearchQueryInput" style="max-width: 520px">
              <b-input-group>
                <template #prepend>
                  <b-input-group-text
                    id="searchQueryIcon"
                    @click="focusSearchQuery"
                  >
                    <span class="material-symbols-outlined"> search </span>
                  </b-input-group-text>
                </template>
                <b-form-input
                  ref="searchQueryRef"
                  v-model="searchQuery"
                  class="d-inline-block searchQuery"
                  :placeholder="$t(searchPlaceholder)"
                  debounce="500"
                  :type="searchType"
                />
              </b-input-group>
            </b-col>
            <b-col v-if="showViewSelection" cols="auto">
              <b-form-radio-group
                v-if="showViewSelection"
                v-model="InternalItemView"
                class="list item-view-radio-group opacity-50"
                buttons
                size="sm"
                button-variant="outline-secondary"
              >
                <b-form-radio
                  v-for="option in itemViewOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  <feather-icon :icon="option.icon" size="18" />
                </b-form-radio>
              </b-form-radio-group>
            </b-col>
            <b-col v-if="exportToExcel" cols="12" sm="auto">
              <b-button
                variant="outline-primary"
                size="sm"
                class="w-100 mt-2 mt-sm-0 d-flex align-items-center"
                :class="{ 'cursor-not-allowed': generatingExcel || loading }"
                style="height: 38px"
                :disabled="generatingExcel || loading"
                @click="exportToExcel"
              >
                <div class="d-flex align-items-center justify-content-center gap-2">
                  <b-spinner v-if="generatingExcel" small></b-spinner>
                  <span
                    v-if="!generatingExcel"
                    class="material-symbols-outlined"
                    style="font-size: 22px"
                  >
                    ios_share
                  </span>
                  <span>Exportar em Excel</span>
                </div>
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <div v-if="showSelectAll" class="selectAll-container">
        <b-checkbox
          :checked="isSelectAll"
          :disabled="currentDataTable.length < 1"
          @change="toogleSelectAll"
        >
          <span class="text-normal">Selecionar toda a tabela</span>
        </b-checkbox>
        <span v-if="showSelectAllLabel">
          {{ selectedLabel }}:
          <span class="selectItems">{{ $filters.formatNumber(selectItems) }}</span>
        </span>
      </div>
      <div class="overflow-hidden w-100">
        <b-skeleton-table
          v-show="InternalItemView === 'list-view'"
          :columns="fields.length"
          :rows="perPage"
          :class="{ 'd-none': !loading }"
        />
      </div>

      <b-table
        v-show="InternalItemView === 'list-view'"
        id="list-table-select-local"
        ref="refListTableSelectLocal"
        v-model="currentDataTable"
        :class="{ 'd-none': loading }"
        class="position-relative"
        thead-tr-class="thead-row"
        :tbody-tr-class="rowClassSelect"
        :items="dataTableSearch"
        responsive
        :per-page="perPage"
        :current-page="currentPage"
        :fields="fields"
        primary-key="id"
        show-empty
        select-mode="multi"
        selectable
        :sort-by.sync="sortBy"
        :sort-desc.sync="isSortDirDesc"
        :sticky-header="stickyHeader"
        @row-clicked="onRowClicked"
        @context-changed="eventChange"
      >
        <template #head="item">
          <div
            v-b-tooltip.html
            :title="$t(item.field.tooltip)"
            class="d-inline-flex align-items-center gap-1 font-weight-bolder text-uppercase"
            :class="item.field.labelClass"
          >
            {{ $t(item.label) }}
            <span
              v-if="item.field.tooltip"
              class="material-symbols-outlined"
              style="font-size: 16px"
            >
              info
            </span>
          </div>
        </template>
        <template #empty>
          <div class="d-flex flex-column align-items-center">
            <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
            <span class="text-center text-primary font-bold" v-html="$t(emptyText)"></span>
          </div>
        </template>
        <template #head.selected>
          <b-form-checkbox
            :checked="isSelectPage"
            :disabled="disableSelectAll"
            @change="toogleSelectPage"
          />
        </template>
        <template #cell.selected="item">
          <b-form-checkbox
            v-if="!item.item.disableSelect"
            :checked="item.rowSelected"
            @change="() => onRowClicked(item.item, item.index)"
          />
        </template>

        <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="slotScope">
          <slot :name="slotName" v-bind="slotScope" />
        </template>
      </b-table>

      <div v-if="InternalItemView === 'list-view'" class="mx-2 mb-2">
        <ListTablePagination
          v-show="dataTableSearch.length"
          :value="currentPage"
          :total-data="dataTableSearch.length"
          :per-page="perPage"
          :force-resposive="forceResposive"
          @input="changePage"
        />
      </div>
    </b-card>
    <div v-show="InternalItemView === 'grid-view'" v-if="showViewSelection">
      <b-skeleton-wrapper :loading="loading" class="w-100">
        <template #loading>
          <div class="h-100">
            <b-row class="match-height">
              <b-col sm="12" md="6" :lg="columns" class="mb-2">
                <b-skeleton type="card" height="300px" class="w-100 rounded" />
              </b-col>
              <b-col sm="12" md="6" :lg="columns" class="mb-2">
                <b-skeleton type="card" height="300px" class="w-100 rounded" />
              </b-col>
              <b-col sm="12" md="6" :lg="columns" class="mb-2">
                <b-skeleton type="card" height="300px" class="w-100 rounded" />
              </b-col>
            </b-row>
          </div>
        </template>
        <b-row class="match-height">
          <b-col
            v-for="(item, index) in currentDataTable"
            :key="index"
            sm="12"
            md="6"
            :lg="columns"
          >
            <div
              class="d-flex flex-column position-relative selectable-card-container"
              :class="{ checked: itemIsSelected(item) }"
              @click="onRowClicked(item, index)"
            >
              <div v-if="!item.disableSelect" class="position-absolute checkbox-container">
                <b-form-checkbox
                  :checked="itemIsSelected(item)"
                  @change="() => onRowClicked(item, index)"
                />
              </div>

              <slot name="card" :data="item" :checked="itemIsSelected(item)" />
            </div>
          </b-col>
          <b-col v-if="!dataTableSearch.length" class="text-center mb-2">
            {{ $t(emptyText) }}
          </b-col>
        </b-row>
      </b-skeleton-wrapper>
      <b-card v-show="dataTableSearch.length">
        <ListTablePagination
          :value="currentPage"
          :total-data="dataTableSearch.length"
          :per-page="perPage"
          :force-resposive="forceResposive"
          @input="changePage"
        />
      </b-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import vSelect from 'vue-select'
import ListTablePagination from './ListTablePagination'
import MissionMath from '@/assets/icons/mission-icons/MissionMath.vue'
import MissionMathIng from '@/assets/icons/mission-icons/MissionMathIng.vue'
import MissionPort from '@/assets/icons/mission-icons/MissionPort.vue'
import objectHash from 'object-hash'
import Vue from 'vue'

const props = defineProps({
  tableColumns: {
    required: true,
    type: Array,
  },
  dataTable: {
    required: true,
    type: Array,
  },
  showViewSelection: {
    required: false,
    type: Boolean,
    default: false,
  },
  columns: {
    required: false,
    type: Number,
    default: 4,
  },
  emptyText: {
    required: false,
    type: String,
    default: 'noInformationFound',
  },
  searchPlaceholder: {
    required: false,
    type: String,
    default: 'search',
  },
  searchType: {
    required: false,
    type: String,
    default: 'text',
  },
  perPageOptions: {
    type: Array,
    default: () => [5, 10, 25, 50, 100],
  },
  loading: {
    required: false,
    type: Boolean,
    default: false,
  },
  rowClass: {
    required: false,
    default: 'tbody-row',
  },
  showSearchQueryInput: {
    required: false,
    default: true,
    type: Boolean,
  },
  perPageDefault: {
    type: Number,
    default: 10,
  },
  generatingExcel: {
    required: false,
    default: false,
    type: Boolean,
  },
  exportToExcel: {
    type: Function,
    required: false,
  },
  selectedLabel: {
    required: false,
    type: String,
    default: 'Selecionados',
  },
  forceResposive: {
    type: Boolean,
    default: false,
  },
  cardClass: {
    type: String,
    default: '',
  },
  showSelectAll: {
    type: Boolean,
    default: true,
  },
  showSelectAllLabel: {
    type: Boolean,
    default: true,
  },
  itemView: {
    type: String,
    default: 'list-view',
  },
  stickyHeader: {
    type: [Boolean, String],
    default: false,
    required: false,
  },
  sortByDefault: {
    type: String,
    default: '',
    required: false,
  },
  sortDescDefault: {
    type: Boolean,
    default: false,
    required: false,
  },
})

const emit = defineEmits(['input'])

const refListTableSelectLocal = ref(null)
const searchQueryRef = ref(null)

const InternalItemView = ref(props.itemView)
const itemViewOptions = [
  { icon: 'GridIcon', value: 'grid-view' },
  { icon: 'ListIcon', value: 'list-view' },
]

const fields = computed(() => {
  return [
    {
      key: 'selected',
      label: '',
      sortable: false,
      thClass: 'pr-0',
      tdClass: 'pr-0',
      thStyle: { width: '50px' },
    },
    ...props.tableColumns,
  ]
})

const perPage = ref(props.perPageDefault)
const currentPage = ref(1)
const currentDataTable = ref([])
const sortBy = ref(props.sortByDefault)
const isSortDirDesc = ref(props.sortDescDefault)
const searchQuery = ref('')

function focusSearchQuery() {
  searchQueryRef.value && searchQueryRef.value.focus()
}

const resetPage = () => {
  currentPage.value = 1
}

const changePage = page => {
  currentPage.value = page
}

const dataTableSearch = computed(() => {
  resetPage()
  if (!searchQuery.value) {
    return props.dataTable
  }

  const filteredTable = props.dataTable.filter(row =>
    props.tableColumns
      .filter(column => column.searchable)
      .some(column => {
        const cellValue = row[column.key]
        if (cellValue === undefined || cellValue === null) return false
        const searchValue = searchQuery.value.toLowerCase()
        return cellValue.toString().toLowerCase().includes(searchValue)
      }),
  )

  return filteredTable
})

const disableSelectAll = computed(() => {
  return dataTableSearch.value.length === 0
})

const dataSelected = ref({})

const getSelectedItem = item => {
  return dataSelected.value[objectHash(item)]
}

const itemIsSelected = item => {
  return dataSelected.value[objectHash(item)] !== undefined
}

const isSelectAll = computed(() => {
  if (dataTableSearch.value.length === 0) {
    return false
  }
  return (
    dataTableSearch.value
      .filter(item => !item.disableSelect)
      .every(item => getSelectedItem(item)) &&
    dataTableSearch.value.filter(item => !item.disableSelect).length > 0
  )
})

const isSelectPage = computed(() => {
  if (
    currentDataTable.value.length === 0 ||
    currentDataTable.value.filter(item => !item.disableSelect).length === 0
  ) {
    return false
  }
  return currentDataTable.value
    .filter(item => !item.disableSelect)
    .every(item => getSelectedItem(item))
})

const selectItems = computed(() => {
  return Object.values(dataSelected.value).length
})

const selectRow = (index, selected = false) => {
  nextTick(() => {
    if (selected) {
      refListTableSelectLocal.value && refListTableSelectLocal.value.selectRow(index)
    } else {
      refListTableSelectLocal.value && refListTableSelectLocal.value.unselectRow(index)
    }
  })
}

const setSelectedItem = (item, value) => {
  if (value) {
    Vue.set(dataSelected.value, objectHash(item), item)
  } else {
    Vue.delete(dataSelected.value, objectHash(item))
  }
}

const onRowClicked = (item, index) => {
  if (item.disableSelect) {
    selectRow(index, false)
    return
  }
  const isSelected = !getSelectedItem(item)
  setSelectedItem(item, isSelected)
  selectRow(index, isSelected)
  emitSelectedItems()
}

const toogleSelectPage = value => {
  for (let i = 0; i < currentDataTable.value.length; i++) {
    setSelectedItem(
      currentDataTable.value[i],
      currentDataTable.value[i].disableSelect ? false : value,
    )
    selectRow(i, currentDataTable.value[i].disableSelect ? false : value)
  }
  emitSelectedItems()
}

const toogleSelectAll = value => {
  if (value) {
    refListTableSelectLocal.value && refListTableSelectLocal.value.selectAllRows()
  } else {
    refListTableSelectLocal.value && refListTableSelectLocal.value.clearSelected()
  }
  for (let i = 0; i < dataTableSearch.value.length; i++) {
    setSelectedItem(
      dataTableSearch.value[i],
      dataTableSearch.value[i].disableSelect ? false : value,
    )
    selectRow(i, dataTableSearch.value[i].disableSelect ? false : value)
  }

  emitSelectedItems()
}

const eventChange = () => {
  for (let i = 0; i < currentDataTable.value.length; i++) {
    if (getSelectedItem(currentDataTable.value[i])) {
      nextTick(() => {
        selectRow(i, true)
      })
    }
  }
}

const emitSelectedItems = () => {
  const selected = props.dataTable.filter(item => getSelectedItem(item))
  emit('input', selected)
}

watch([perPage, searchQuery], () => {
  currentPage.value = 1
})

watch(currentDataTable, () => {
  eventChange()
})

const reset = () => {
  Vue.set(dataSelected, 'value', {})
  refListTableSelectLocal.value && refListTableSelectLocal.value.clearSelected()
  emitSelectedItems()
}

const reviewSelectedItems = () => {
  const dataSelectedKeys = Object.keys(dataSelected.value)

  if (dataSelectedKeys.length === 0) {
    return
  }

  const dataTableKeys = props.dataTable.map(item => objectHash(item))

  dataSelectedKeys.forEach(key => {
    if (!dataTableKeys.includes(key)) {
      Vue.delete(dataSelected.value, key)
    }
  })
}

const rowClassSelect = (item, type) => {
  if (!item || type !== 'row') return
  if (item.disableSelect) return `cursor-default-important ${props.rowClass}`
  return props.rowClass
}

watch(
  () => props.dataTable,
  () => {
    reviewSelectedItems()
  },
)

defineExpose({
  reset,
  dataSelected,
  currentDataTable,
  refListTableSelectLocal,
  selectRow,
})
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables/_variables.scss';

  .selectItems {
    color: $primary;
  }
  .checkbox-container {
    top: 1rem;
    right: 1rem;
  }
  .searchQuery {
    border-left: 0;
    padding-left: 0;
  }
  #searchQueryIcon {
    .material-symbols-outlined {
      font-size: 18px;
    }
  }
  .per-page-selector {
    width: 90px;
    min-width: 90px;
  }

  .selectable-card-container {
    flex: 1 1 auto;
    .card {
      flex: 1 1 auto;
    }
  }

  .selectAll-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    border-top: 1px solid $grey-light;

    padding: 1rem 2rem;
    padding: 1rem 1.175rem;

    @media (max-width: 576px) {
      flex-direction: column;
      justify-content: center;
    }
  }
  .border-arround {
    border: 1px solid #dae1e7;
  }
</style>
<style lang="scss">
  .selectAll-container .custom-control-label {
    margin-left: 1.475rem;
  }
  #list-table-select-local {
    .thead-row {
      th {
        vertical-align: middle !important;
        div {
          text-transform: uppercase;
          font-weight: 600;
        }
      }
    }
    .cursor-default-important {
      cursor: default !important;
    }
  }
</style>