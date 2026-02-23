# Copilot Inline Completion Context - Educacross Front Office

## Tech Stack
Vue.js 2.x, Composition API, Vuex 3.6.0, Vue Router 3.6.5, Bootstrap Vue 2.23.0, Jest 27.0.5

## Critical Patterns

### Vue 3 Compatibility - Import Directly
```javascript
import router from '@/router'
import store from '@/store'
// Never use this.$router or this.$store
```

### Use Functions Not Filters
```javascript
import { formatDate } from '@/utils/formatters'
const formatted = computed(() => formatDate(date.value))
// Never use {{ date | filter }}
```

### Component Refs Not Global APIs
```javascript
const modalRef = ref(null)
const show = () => modalRef.value.show()
// Never use this.$bvModal.show()
```

## Global Filter System
```javascript
import useFilters from '@/store/filters/useFilters'
const { subject, subjects, classe, classes, fetchSubjects } = useFilters()
```

## Domain Composable Pattern
```javascript
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { computed } from '@vue/composition-api'

const moduleName = 'FeatureName'
const { subject, classe } = useFilters()

export default function useFeatureName() {
  const data = computed({
    get: () => store.getters[`${moduleName}/data`],
    set: val => store.commit(`${moduleName}/data`, val),
  })

  const loading = computed({
    get: () => store.getters[`${moduleName}/loading`],
    set: val => store.commit(`${moduleName}/loading`, val),
  })

  const fetchData = async () => {
    loading.value = true
    const response = await apiCall({
      SubjectId: subject.value.id,
      ClassId: classe.value.ClassId,
    })
    data.value = response.data
    loading.value = false
  }

  return { moduleName, data, loading, fetchData }
}
```

## Page Component Structure

### Index.vue
```vue
<template>
  <section>
    <Filters />
    <List />
  </section>
</template>

<script>
import Filters from './Filters.vue'
import List from './List.vue'
import store from '@/store'
import myModule from '@/store/pageModules/my-module.js'
import { onUnmounted } from '@vue/composition-api'

export default {
  components: { Filters, List },
  setup() {
    store.registerModule('Feature', myModule)
    onUnmounted(() => {
      store.commit('Feature/reset')
      store.unregisterModule('Feature')
    })
  }
}
</script>
```

### Filters.vue
```vue
<template>
  <b-card>
    <b-row>
      <b-col cols="12" md>
        <b-form-group :label="$t('subject')">
          <ESelect
            v-model="subject"
            :options="subjects"
            label="name"
            track-by="id"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import ESelect from '@/components/selects/ESelect.vue'
import useFilters from '@/store/filters/useFilters'
import { watch } from '@vue/composition-api'

export default {
  components: { ESelect },
  setup() {
    const { subject, subjects } = useFilters()
    watch([subject], () => store.dispatch('Feature/fetch'))
    return { subject, subjects }
  }
}
</script>
```

### List.vue
```vue
<template>
  <ListTable
    ref="listTableRef"
    :loading="loading"
    :table-columns="columns"
    :data-table="data"
    :total-data="total"
    @change="handleChange"
  >
    <template #cell(status)="{ item }">
      <b-badge>{{ $t(item.status) }}</b-badge>
    </template>
  </ListTable>
</template>

<script>
import ListTable from '@/components/table/ListTable.vue'
import { ref, computed } from '@vue/composition-api'
import store from '@/store'

export default {
  components: { ListTable },
  setup() {
    const listTableRef = ref(null)
    const loading = computed(() => store.getters['Feature/loading'])
    const data = computed(() => store.getters['Feature/data'])
    const total = computed(() => store.getters['Feature/total'])

    const columns = [
      { key: 'name', label: 'Nome', sortable: true },
      { key: 'status', label: 'Status' },
    ]

    const handleChange = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
      store.commit('Feature/setParams', {
        Search: searchQuery,
        OrderBy: sortBy,
        Ascending: `${!isSortDirDesc}`,
        Page: currentPage,
        PageSize: perPage,
      })
      store.dispatch('Feature/fetch')
    }

    return { listTableRef, loading, data, total, columns, handleChange }
  }
}
</script>
```

## ESelect Component
```vue
<!-- Single -->
<ESelect
  v-model="selected"
  :options="options"
  label="name"
  track-by="id"
  :searchable="true"
/>

<!-- Multiple -->
<ESelect
  v-model="items"
  :options="options"
  :multiple="true"
  label="name"
  track-by="id"
/>

<!-- Paginated -->
<ESelect
  :options="pageData"
  :paginated="true"
  :page="page"
  :total-pages="totalPages"
  @nextPage="loadNext"
/>
```

## ListTable Component
```vue
<!-- Server-side (large datasets) -->
<ListTable
  :data-table="items"
  :table-columns="columns"
  :loading="loading"
  :total-data="total"
  :current-page="page"
  @page-changed="changePage"
  @search="search"
/>

<!-- Client-side (small datasets) -->
<ListTableLocalSorting
  :data-table="allItems"
  :table-columns="columns"
  :loading="loading"
/>
```

## Watch Patterns
```javascript
// Watch filters and fetch
watch([subject, classe], () => {
  if (subject.value?.id && classe.value?.ClassId) {
    fetchData()
  }
})

// Reset pagination on filter change
watch([filter], () => {
  store.commit('Module/setParams', { Page: 1 })
  listTableRef.value.resetPage()
  store.dispatch('Module/fetch')
})
```

## Vuex Module
```javascript
export default {
  namespaced: true,
  state: {
    data: [],
    loading: false,
    total: 0,
  },
  mutations: {
    data(state, payload) { state.data = payload },
    loading(state, payload) { state.loading = payload },
    total(state, payload) { state.total = payload },
  },
  getters: {
    data: state => state.data,
    loading: state => state.loading,
    total: state => state.total,
  },
}
```

## JSDoc Template
```javascript
/**
 * Description
 * @param {Object} params - Parameters
 * @param {number} params.id - ID
 * @returns {Promise<void>}
 */
```

## Path Aliases
- `@/` → src/
- `@core/` → src/@core/
- `@validations` → validations.js
- `@axios` → libs/axios
- `@components/` → layouts/components/
- `@themeConfig` → themeConfig.js

## Component Selection
- Dropdown: ESelect
- Server-side table: ListTable
- Client-side table: ListTableLocalSorting
- Subject/class filters: useFilters()

## Quick Snippets

### Setup with filters
```javascript
setup() {
  const { subject, classe } = useFilters()
  const { data, loading, fetchData } = useDomain()
  watch([subject, classe], fetchData)
  return { subject, classe, data, loading }
}
```

### Module registration
```javascript
setup() {
  store.registerModule('Name', module)
  onUnmounted(() => {
    store.commit('Name/reset')
    store.unregisterModule('Name')
  })
}
```

### Table handler
```javascript
const handleChange = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
  store.commit('Module/setParams', {
    Search: searchQuery,
    OrderBy: sortBy,
    Ascending: `${!isSortDirDesc}`,
    Page: currentPage,
    PageSize: perPage,
  })
  store.dispatch('Module/fetch')
}
```

## Do's and Don'ts
✅ useFilters() for filters
✅ Domain composables for logic
✅ Import router/store directly
✅ ESelect for dropdowns
✅ ListTable for tables
✅ JSDoc all functions
✅ Unregister modules

❌ this.$router/store
❌ Vue filters
❌ this.$bvModal
❌ Logic in Index.vue
❌ v-select
❌ b-table
❌ Skip cleanup
