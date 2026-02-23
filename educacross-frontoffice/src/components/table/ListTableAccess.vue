<template>
  <b-card no-body>
    <div class="m-2">
      <b-row>
        <!-- Per Page -->
        <b-col
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

        <!-- Search / Export -->
        <b-col cols="12" md>
          <b-row align-h="end" align-v="center">
            <b-col v-if="exportToExcel" cols="12" sm="auto">
              <b-button
                variant="outline-primary"
                size="sm"
                class="w-100 mt-2 mt-sm-0"
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
    </div>
    <b-skeleton-table :columns="fields.length" :rows="perPage" :class="{ 'd-none': !loading }" />
    <b-table
      id="table-access"
      ref="refTableAccess"
      :class="{ 'd-none': loading }"
      class="position-relative"
      :items="items"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      striped
      responsive
      tbody-class="text-black"
    >
      <template #head="item">
        <div
          v-b-tooltip.html
          :title="item.field.tooltip"
          class="d-inline-flex align-items-center gap-1 font-weight-bolder text-uppercase"
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
      <template
        v-for="(month, index) in monthsIng"
        #[`cell(${month})`]="item"
      >
        <div :key="`accessMonth-${index}`" class="cell-access">
          <div
            class="position-absolute cell-access-content d-flex justify-center align-items-center"
            :class="classMap ? classMap(item[month]) : classMapPercentage(item[month])"
          >
            <span class="text-black">
              {{ formatter ? formatter(item[month]) : percentageMap(item[month]) }}
            </span>
          </div>
        </div>
      </template>
      <template v-for="slotName in scopedSlotsKeys" #[slotName]="slotScope">
        <slot :name="slotName" v-bind="slotScope" />
      </template>
      <template #table-busy>
        <b-skeleton-table :columns="fields.length + 12" :rows="perPage" hide-header />
      </template>
    </b-table>
    <div class="px-1 pt-1 mb-1 border-t">
      <ListTablePagination
        v-model="currentPage"
        :total-data="totalRows"
        :per-page="perPage"
        class="mx-2"
      />
    </div>
  </b-card>
</template>

<script setup>
import { ref, computed, watchEffect, useSlots } from 'vue'
import ListTablePagination from './ListTablePagination.vue'
import { formatNumber } from '@/filters/filters'
import { months } from '@/utils/utils'
import VSelect from 'vue-select'

const props = defineProps({
  items: {
    type: Function,
    required: true,
  },
  fields: {
    type: Array,
    required: true,
  },

  formatter: {
    type: Function,
    default: null,
  },
  classMap: {
    type: Function,
    default: null,
  },
  totalRows: {
    type: Number,
    default: 0,
  },
  loading: {
    required: false,
    type: Boolean,
    default: false,
  },
  showViewSelection: {
    required: false,
    type: Boolean,
    default: false,
  },
  emptyText: {
    required: false,
    type: String,
    default: 'Nenhuma informação encontrada',
  },

  perPageOptions: {
    type: Array,
    default: () => [5, 10, 15, 25, 50, 100],
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
})

const refTableAccess = ref(null)
const perPage = ref(props.perPageDefault)
const currentPage = ref(1)
const sortBy = ref(null)
const sortDesc = ref(true)

const monthsPtBr = computed(() => months('pt-BR', { month: 'short' }))
const monthsIng = computed(() =>
  months('en-US', { month: 'short' }).map(month => month.toLowerCase()),
)

const capitalizeFirstLetter = string => {
  if (typeof string !== 'string') return string
  const stringFormatted = string.slice(0, -1)
  return stringFormatted.charAt(0).toUpperCase() + stringFormatted.slice(1)
}

const percentageMap = percent => {
  const percentNumber = Number.parseFloat(percent)
  if (Number.isNaN(percentNumber)) {
    return '-'
  }
  return `${formatNumber(percentNumber)}%`
}

const classMapPercentage = accessActivity => {
  const access = Number.parseFloat(accessActivity)
  if (Number.isNaN(access)) return ''
  if (access <= 25) return 'less-activity'
  if (access <= 50) return 'some-activity'
  if (access <= 75) return 'half-activity'
  return 'almost-full-activity'
}

// Dynamically add month fields on mount (only once)
let monthsAdded = false
watchEffect(() => {
  if (!monthsAdded) {
    monthsIng.value.forEach((month, index) => {
      props.fields.push({
        label: capitalizeFirstLetter(monthsPtBr.value[index]),
        key: month,
        class: 'position-relative',
        formatter: props.formatter || percentageMap,
        sortable: true,
      })
    })
    monthsAdded = true
  }
})

// Expose $scopedSlots key names for custom cell templates
const slots = useSlots()
const scopedSlotsKeys = computed(() => Object.keys(slots))

const refresh = page => {
  if (page) {
    currentPage.value = page
  }
  if (refTableAccess.value && typeof refTableAccess.value.refresh === 'function') {
    refTableAccess.value.refresh()
  }
}

defineExpose({
  refresh,
})
</script>

<style scoped>
.cell-access-content {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.less-activity {
  background-color: #f9a9a9;
}
.some-activity {
  background-color: #fac2ae;
}
.half-activity {
  background-color: #cbe3ab;
}
.almost-full-activity {
  background-color: #8fcf9b;
}
.per-page-selector {
  width: 90px;
  min-width: 90px;
}
</style>

<style lang="scss">
#table-access {
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