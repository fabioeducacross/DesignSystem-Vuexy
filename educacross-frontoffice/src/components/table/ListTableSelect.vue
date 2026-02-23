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
                  <b-spinner v-if="generatingExcel" small />
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
          v-model="isSelectAll"
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
        id="list-table-select"
        ref="refListTableSelect"
        v-model="currentDataTable"
        :class="{ 'd-none': loading }"
        class="position-relative"
        thead-tr-class="thead-row"
        :tbody-tr-class="rowClassSelect"
        :items="dataTable"
        responsive
        :fields="fields"
        primary-key="id"
        show-empty
        select-mode="multi"
        selectable
        no-local-sorting
        :sticky-header="stickyHeader"
        :sort-by="sortByValue"
        :sort-desc="isSortDirDesc"
        @sort-changed="sortChange"
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
            @change="onRowClicked(item.item, item.index)"
          />
        </template>

        <template v-for="slotName in scopedSlotNames" #[slotName]="slotScope">
          <slot :name="slotName" v-bind="slotScope" />
        </template>
      </b-table>

      <div v-show="InternalItemView === 'list-view'" class="mx-2 mb-2">
        <ListTablePagination
          v-show="totalData"
          :value="currentPage"
          :total-data="totalData"
          :per-page="perPage"
          :force-resposive="forceResposive"
          @input="changePage"
        />
      </div>
      <!-- end table-view -->
    </b-card>
    <!-- grid-view -->
    <div
      v-show="InternalItemView === 'grid-view'"
      v-if="showViewSelection || InternalItemView === 'grid-view'"
    >
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
          <b-col v-for="(item, index) in dataTable" :key="index" sm="12" md="6" :lg="columns">
            <div
              class="d-flex flex-column position-relative selectable-card-container"
              :class="{ checked: itemIsSelected(item) }"
              @click="onRowClicked(item, index)"
            >
              <div v-if="!item.disableSelect" class="position-absolute checkbox-container">
                <b-form-checkbox
                  :checked="itemIsSelected(item)"
                  @change="onRowClicked(item, index)"
                />
              </div>

              <slot name="card" :data="item" :checked="itemIsSelected(item)" />
            </div>
          </b-col>
          <b-col v-if="!dataTable.length" class="text-center mb-2">
            {{ $t(emptyText) }}
          </b-col>
        </b-row>
      </b-skeleton-wrapper>
      <b-card v-show="totalData">
        <ListTablePagination
          :value="currentPage"
          :total-data="totalData"
          :per-page="perPage"
          @input="changePage"
        />
      </b-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, useSlots } from 'vue'
import ListTablePagination from './ListTablePagination'
import MissionMath from '@/assets/icons/mission-icons/MissionMath.vue'
import MissionMathIng from '@/assets/icons/mission-icons/MissionMathIng.vue'
import MissionPort from '@/assets/icons/mission-icons/MissionPort.vue'
import objectHash from 'object-hash'
import vSelect from 'vue-select'
import { set, del } from 'vue'

// Props
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
  totalData: {
    required: true,
    type: Number,
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
  sortBy: {
    type: String,
    default: '',
    required: false,
  },
  sortDesc: {
    type: Boolean,
    default: false,
    required: false,
  },
})

// Emits
const emit = defineEmits(['input', 'change'])

// Local refs
const refListTableSelect = ref(null)
const searchQueryRef = ref(null)

// View type
const InternalItemView = ref(props.itemView)
const itemViewOptions = [
  { icon: 'GridIcon', value: 'grid-view' },
  { icon: 'ListIcon', value: 'list-view' },
]

// Data fields for table
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

// Basic local state
const perPage = ref(props.perPageDefault)
const currentPage = ref(1)
const currentDataTable = ref([])
const sortByValue = ref(props.sortBy || '')
const isSortDirDesc = ref(props.sortDesc || false)
const searchQuery = ref('')

// Watch for changes in external sort props
watch(
  () => props.sortBy,
  newVal => {
    sortByValue.value = newVal || ''
  },
)
watch(
  () => props.sortDesc,
  newVal => {
    isSortDirDesc.value = newVal || false
  },
)

const resetPage = () => {
  currentPage.value = 1
  clearSelectedRows()
}
const changePage = page => {
  currentPage.value = page
  emitToFetch()
}

const disableSelectAll = computed(() => {
  return currentDataTable.value.length === 0
})

// Selected logic
const isSelectAll = ref(false)

const isSelectPage = computed(() => {
  if (
    currentDataTable.value.length === 0 ||
    currentDataTable.value.filter(item => !item.disableSelect).length === 0
  ) {
    return false
  }
  return (
    isSelectAll.value ||
    currentDataTable.value
      .filter(item => !item.disableSelect)
      .every(item => getSelectedItem(item))
  )
})

const selectItems = computed(() => {
  return isSelectAll.value ? props.totalData : Object.values(dataSelected.value).length
})

const dataSelected = ref({})

const selectRow = (index, selected = false) => {
  nextTick(() => {
    if (selected) {
      refListTableSelect.value?.selectRow(index)
    } else {
      refListTableSelect.value?.unselectRow(index)
    }
  })
}

const setSelectedItem = (item, value) => {
  if (value) {
    set(dataSelected.value, objectHash(item), item)
  } else {
    del(dataSelected.value, objectHash(item))
  }
}

const getSelectedItem = item => {
  return dataSelected.value[objectHash(item)]
}

const itemIsSelected = item => {
  return dataSelected.value[objectHash(item)] !== undefined
}

const onRowClicked = (item, index) => {
  if (item.disableSelect) {
    selectRow(index, false)
    return
  }

  if (isSelectAll.value) {
    onRowClickedIsSelectAll()
  }
  nextTick(() => {
    const isSelected = !getSelectedItem(item)
    setSelectedItem(item, isSelected)
    selectRow(index, isSelected)
    emitSelectedItems()
  })
}

const onRowClickedIsSelectAll = () => {
  isSelectAll.value = false
  dataSelected.value = {}
  for (let i = 0; i < currentDataTable.value.length; i++) {
    setSelectedItem(currentDataTable.value[i], true)
    selectRow(i, true)
  }
}

const toogleSelectPage = value => {
  isSelectAll.value = false

  for (let i = 0; i < currentDataTable.value.length; i++) {
    setSelectedItem(
      currentDataTable.value[i],
      currentDataTable.value[i].disableSelect ? false : value,
    )
    selectRow(i, currentDataTable.value[i].disableSelect ? false : value)
  }
  emitSelectedItems()
}

const toogleSelectAll = () => {
  dataSelected.value = {}

  if (isSelectAll.value) {
    refListTableSelect.value?.selectAllRows()

    for (let i = 0; i < currentDataTable.value.length; i++) {
      if (currentDataTable.value[i].disableSelect) {
        setSelectedItem(currentDataTable.value[i], false)
        selectRow(i, false)
      }
    }
  } else {
    refListTableSelect.value?.clearSelected()
  }
  emitSelectedItems()
}

const eventChange = () => {
  nextTick(() => {
    for (let i = 0; i < currentDataTable.value.length; i++) {
      if (
        (isSelectAll.value && !currentDataTable.value[i].disableSelect) ||
        getSelectedItem(currentDataTable.value[i])
      ) {
        selectRow(i, true)
      }
    }
  })
}

const emitSelectedItems = () => {
  emit('input', {
    batchAction: isSelectAll.value ? 2 : 1,
    value: Object.values(dataSelected.value),
  })
}

const resetSelectedItems = () => {
  isSelectAll.value = false
  refListTableSelect.value?.clearSelected()
  dataSelected.value = {}
  emitSelectedItems()
}

watch([perPage, searchQuery], () => {
  currentPage.value = 1
  emitToFetch()
})

const sortChange = sort => {
  if (sort.sortBy === '') return
  sortByValue.value = sort.sortBy
  isSortDirDesc.value = sort.sortDesc
  emitToFetch()
}

const emitToFetch = () => {
  emit('change', {
    perPage: perPage.value,
    currentPage: currentPage.value,
    sortBy: sortByValue.value,
    isSortDirDesc: isSortDirDesc.value,
    searchQuery: searchQuery.value,
  })
}

const isLoading = computed(() => props.loading)

const clearSelectedRows = () => {
  dataSelected.value = {}
  isSelectAll.value = false
  if (refListTableSelect.value) {
    refListTableSelect.value.clearSelected()
  }
}

watch(isLoading, () => {
  if (!isLoading.value) eventChange()
})

const rowClassSelect = (item, type) => {
  if (!item || type !== 'row') return
  if (item.disableSelect) return `cursor-default-important ${props.rowClass}`
  return props.rowClass
}

// dynamic slot names (for passing arbitrary slots from parent)
const scopedSlotNames = []
const slots = useSlots ? useSlots() : {}
scopedSlotNames.push(...Object.keys(slots))

// Focus utility for search field
const focusSearchQuery = () => {
  searchQueryRef.value?.$el?.focus?.()
}

defineExpose({
  resetSelectedItems,
  resetPage,
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
#list-table-select {
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