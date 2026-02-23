<template>
  <div>
    <b-card no-body :class="border ? 'card-border' : ''">
      <slot name="header" />
      <div :class="showPerPageOptions ? 'm-2' : ''">
        <b-row>
          <!-- Per Page -->
          <b-col
            v-if="showPerPageOptions"
            cols="12"
            md="auto"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
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

          <b-col v-if="itemView === 'grid-view'" md="auto" class="mb-1 mb-md-0">
            <b-dropdown
              text="Primary"
              variant="outline-primary"
              toggle-class="d-flex align-items-center gap-1 py-50"
              block
            >
              <template #button-content>
                <span class="material-symbols-outlined"> tune </span>
                <span class="mr-auto">Classificar e ordenar</span>
              </template>

              <b-dropdown-item
                v-for="(item, index) in sortableDataTable"
                :key="`filter-option-${index}`"
                :class="sortBy === item.key ? 'bg-light-primary' : ''"
                @click.capture.stop="handleSort($event, item)"
              >
                <span :class="sortBy === item.key ? 'text-primary' : ''">{{ item.label }}</span>
              </b-dropdown-item>

              <b-dropdown-divider />

              <div class="w-100 d-flex flex-col gap-4 px-1">
                <div class="d-flex align-items-center">
                  <b-form-radio
                    v-model="sortDesc"
                    name="sortDesc"
                    :value="false"
                    class="radio-inline"
                  >
                    <span class="text-body">Ordem crescente</span>
                  </b-form-radio>
                </div>
                <div class="d-flex align-items-center">
                  <b-form-radio
                    v-model="sortDesc"
                    name="sortDesc"
                    :value="true"
                    class="radio-inline"
                  >
                    <span class="text-body">Ordem decrescente</span>
                  </b-form-radio>
                </div>
              </div>
            </b-dropdown>
          </b-col>

          <!-- Search -->
          <b-col cols="12" md>
            <b-row align-h="end" align-v="center">
              <b-col v-if="showSearchQueryInput" style="max-width: 520px">
                <b-input-group>
                  <template #prepend>
                    <b-input-group-text
                      id="searchQueryIcon"
                      @click="$refs.searchQueryRef.$el.focus()"
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
                  v-model="itemView"
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
                  :class="generatingExcel || loading ? 'cursor-not-allowed' : ''"
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
      </div>
      <div class="overflow-hidden w-100">
        <b-skeleton-table
          v-show="itemView === 'list-view'"
          :columns="tableColumns.length"
          :rows="perPage"
          :class="!loading ? 'd-none' : ''"
        />
      </div>
      <b-table
        v-show="itemView === 'list-view'"
        id="list-table"
        ref="refListTable"
        :class="loading ? 'd-none' : ''"
        class="position-relative"
        thead-tr-class="thead-row"
        :tbody-tr-class="rowClass"
        :items="filteredAndSortedData"
        responsive
        :per-page="perPage"
        :current-page="currentPage"
        :fields="tableColumns"
        primary-key="id"
        show-empty
        :sticky-header="stickyHeader"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        no-local-sorting
        @sort-changed="event => {
          sortDesc = event.sortDesc
          sortBy = event.sortBy
        }"
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
              class="material-symbols-outlined head-icon-info"
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

        <template v-for="slotName in scopedSlotNames" #[slotName]="slotScope">
          <slot :name="slotName" v-bind="slotScope" />
        </template>
      </b-table>

      <div v-if="itemView === 'list-view'" class="mx-2 mb-2">
        <ListTablePagination
          v-show="filteredAndSortedData.length"
          :value="currentPage"
          :total-data="filteredAndSortedData.length"
          :per-page="perPage"
          @input="changePage"
        />
      </div>
    </b-card>
    <!-- grid-view -->
    <div v-show="itemView === 'grid-view'" v-if="showViewSelection" class="grid-view-container">
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
          <b-col v-for="(data, index) in dataTableCards" :key="index" sm="12" md="6" :lg="columns">
            <slot name="card" :data="data" />
          </b-col>
          <b-col v-if="!dataTable.length" class="text-center mb-2">
            {{ $t(emptyText) }}
          </b-col>
        </b-row>
      </b-skeleton-wrapper>
      <b-card v-show="filteredAndSortedData.length">
        <ListTablePagination
          v-show="filteredAndSortedData.length"
          :value="currentPage"
          :total-data="filteredAndSortedData.length"
          :per-page="perPage"
          @input="changePage"
        />
      </b-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, toRef, watch, useSlots } from 'vue'
import vSelect from 'vue-select'
import ListTablePagination from './ListTablePagination'
import MissionMath from '@/assets/icons/mission-icons/MissionMath.vue'
import MissionMathIng from '@/assets/icons/mission-icons/MissionMathIng.vue'
import MissionPort from '@/assets/icons/mission-icons/MissionPort.vue'
import { sortString } from '@/utils/utils'

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
  showPerPageOptions: {
    type: Boolean,
    default: true,
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
  border: {
    required: false,
    default: false,
    type: Boolean,
  },
  stickyHeader: {
    type: [Boolean, String],
    default: false,
    required: false,
  },
  itemViewDefault: {
    type: String,
    default: 'list-view',
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
  disableInternalSort: {
    type: Boolean,
    default: false,
    required: false,
  },
})

// Emits
const emit = defineEmits(['update:sortBy', 'update:sortDesc'])

// Refs and state
const refListTable = ref(null)
const itemView = ref(props.itemViewDefault)
const perPage = ref(props.perPageDefault)
const sortBy = ref(props.sortByDefault)
const sortDesc = ref(props.sortDescDefault)
const currentPage = ref(1)
const searchQuery = ref('')

// Utility for dynamic scoped slots
const slots = useSlots()
const scopedSlotNames = computed(() => {
  return Object.keys(slots)
})

// View options
const itemViewOptions = [
  { icon: 'GridIcon', value: 'grid-view' },
  { icon: 'ListIcon', value: 'list-view' },
]

// Data proxies for reactivity
const dataTable = toRef(props, 'dataTable')
const tableColumns = toRef(props, 'tableColumns')
const filteredAndSortedData = ref([])

// Computed
const sortableDataTable = computed(() => {
  return tableColumns.value.filter(i => i.sortable)
})

function compareValues(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b
  }
  if (a == null && b == null) return 0
  if (a == null) return 1
  if (b == null) return -1
  return sortString(a, b)
}

watch(
  [searchQuery, sortBy, sortDesc, dataTable],
  () => {
    const searchableColumns = tableColumns.value.filter(column => column.searchable)

    if (!props.showSearchQueryInput || searchableColumns.length === 0) {
      filteredAndSortedData.value = dataTable.value.slice()
    } else {
      filteredAndSortedData.value = dataTable.value.filter(row =>
        searchableColumns.some(column => {
          const cellValue = row[column.key] ?? ''
          const searchValue = searchQuery.value.toLowerCase()
          return cellValue.toString().toLowerCase().includes(searchValue)
        })
      )
    }

    // sort (only if internal sorting is enabled)
    if (!props.disableInternalSort && sortBy.value) {
      filteredAndSortedData.value.sort((a, b) => {
        const column = tableColumns.value.find(col => col.key === sortBy.value)
        const sortProperty = column && column.sortProperty ? column.sortProperty : sortBy.value

        const aValue = a[sortProperty]
        const bValue = b[sortProperty]

        return compareValues(aValue, bValue)
      })

            if (!sortDesc.value) {
              filteredAndSortedData.value.reverse()
            }
          }
        },
        { immediate: true },
      )

const changePage = page => {
  currentPage.value = page
}

const dataTableCards = computed(() => {
  return filteredAndSortedData.value.slice(
    (currentPage.value - 1) * perPage.value,
    currentPage.value * perPage.value
  )
})

const handleSort = (e, payload) => {
  if (typeof payload === 'object' && payload.key) {
    sortBy.value = payload.key
    emit('update:sortBy', payload.key)
  } else {
    if (!sortBy.value && sortableDataTable.value.length > 0) {
      sortBy.value = sortableDataTable.value[0].key
      emit('update:sortBy', sortBy.value)
    }
    sortDesc.value = payload
    emit('update:sortDesc', payload)
  }

  // Force recalculation of filtered data for grid view
  if (itemView.value === 'grid-view') {
    if (props.disableInternalSort) {
      filteredAndSortedData.value = dataTable.value.filter(row => {
        if (!props.showSearchQueryInput || !searchQuery.value) return true

        const searchableColumns = tableColumns.value.filter(column => column.searchable)
        return searchableColumns.some(column => {
          const cellValue = row[column.key] ?? ''
          const searchValue = searchQuery.value.toLowerCase()
          return cellValue.toString().toLowerCase().includes(searchValue)
        })
      })
      return
    }

    const tempData = [...dataTable.value]

    if (sortBy.value) {
      tempData.sort((a, b) => {
        const column = tableColumns.value.find(col => col.key === sortBy.value)
        const sortProperty =
          column && column.sortProperty ? column.sortProperty : sortBy.value

        const aValue = a[sortProperty]
        const bValue = b[sortProperty]

        const compareResult = compareValues(aValue, bValue)
        return compareResult
      })

      if (!sortDesc.value) {
        tempData.reverse()
      }
    }

    filteredAndSortedData.value = tempData.filter(row => {
      if (!props.showSearchQueryInput || !searchQuery.value) return true

      const searchableColumns = tableColumns.value.filter(column => column.searchable)
      return searchableColumns.some(column => {
        const cellValue = row[column.key] ?? ''
        const searchValue = searchQuery.value.toLowerCase()
        return cellValue.toString().toLowerCase().includes(searchValue)
      })
    })
  }
}

watch([perPage, searchQuery], () => {
  currentPage.value = 1
})

watch(sortBy, newValue => {
  emit('update:sortBy', newValue)
})
watch(sortDesc, newValue => {
  emit('update:sortDesc', newValue)
})

const resetPage = () => {
  currentPage.value = 1
}

defineExpose({
  resetPage,
  refListTable,
})
</script>

<style lang="scss" scoped>
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

.card-border {
  border: 1px solid #d8d6de;
  box-shadow: none;
}
</style>
<style lang="scss">
#list-table {
  .thead-row {
    th {
      vertical-align: middle !important;

      div {
        text-transform: uppercase;
        font-weight: 600;
      }
    }
  }
}
</style>
