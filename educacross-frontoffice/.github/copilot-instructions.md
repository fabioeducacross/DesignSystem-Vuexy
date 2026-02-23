# Educacross Frontend - AI Coding Instructions

## Project Overview

Vue 2.7 educational platform (SPA) using Vuexy admin template, Bootstrap-Vue, and Vuex. Supports multiple whitelabel brands (educacross, superensino, seduc, somosplay).

## Architecture

### Core Structure

- **`src/@core/`**: Base Vuexy template (layouts, components, scss) - avoid modifying
- **`src/views/pages/{context}/`**: Role-based views (admin-context, teacher-context, student-context)
- **`src/services/{context}/`**: API services organized by domain (teacher-context, admin-context, shared)
- **`src/store/`**: Vuex modules - key modules persist to localStorage via vuex-persist

### User Roles & Routes

Roles defined in `src/consts/accessRoleEnum.js`: Teacher, Student, Coordinator, Manager, NetworkManager, Secretariat, Auditor, Responsible

- Routes in `src/router/` are role-specific (professor-routes.js, student-routes.js, admin-routes.js)
- Route guards use CASL abilities (`src/libs/acl/`) for permission-based access

### Whitelabel System

- **Single source of truth**: `src/consts/whitelabelColors.config.js`
- Build-time SCSS generation: `scripts/generate-whitelabel-colors.js` runs on `npm run dev`
- Runtime CSS vars: `src/utils/whitelabelColorLoader.js` sets `--whitelabel-*` properties
- Brand config: `src/whiteLabel/config.js` and `src/services/whitelabel/WhiteLabel.Service.js`
- Set brand via `VITE_APP_WHITELABEL` in `.env`

## Development Commands

```bash
npm run dev          # Start dev server (auto-generates whitelabel colors)
npm run test:unit    # Run Jest tests (TZ=UTC)
npm run lint         # ESLint check
npm run pretty       # Prettier format
```

## Code Patterns

### Component Structure (Composition API preferred)

```vue
<script>
  import { defineComponent, ref, computed } from 'vue'

  export default defineComponent({
    name: 'ComponentName',
    props: {
      /* ... */
    },
    setup(props, { emit }) {
      // Composition API logic
      return {
        /* reactive refs and methods */
      }
    },
  })
</script>
```

### Refactoring to Composition API (Vue 2.7)

When migrating from Options API or `@vue/composition-api`:

1.  **Component Definition**: Wrap the export in `defineComponent`.
2.  **Imports**: Use `import { defineComponent, ref, computed, onMounted, watch, ... } from 'vue'`.
3.  **Setup Function**:
    - Move logic from `data`, `methods`, `computed`, `watch`, and lifecycle hooks into `setup(props, { emit })`.
    - **`this` context**: `this` is not available. Access props via the `props` argument.
4.  **Event Bus**:
    - Replace `this.$root`, `this.$bus`, or `EventBus` with `mitt`.
    - Import: `import { emitter } from '@/eventBus'`.
    - Usage: `emitter.emit('event', payload)` / `emitter.on('event', handler)`.
    - **Cleanup**: Always remove listeners in `onUnmounted` (`emitter.off(...)`).
5.  **Store & Router**:
    - Keep store/router logic unchanged.
    - Avoid `$` or `_` inside `setup()` (e.g., do not use `root.$store`).
    - Import instances directly: `import store from '@/store'` / `import router from '@/router'`.
    - Usage: `store.dispatch(...)`, `store.getters[...]`, `router.push(...)`.
6.  **Lifecycle Mapping**:
    - `created` -> code inside `setup()`
    - `mounted` -> `onMounted(() => { ... })`
    - `destroyed` -> `onUnmounted(() => { ... })`
7.  **Reactivity**:
    - `data()` properties -> `const myVar = ref(initialValue)`
    - Access value via `.value` inside `setup()`, but just `myVar` in template.
8.  **Syntax**: Avoid `this`, `_`, and `$` prefixes inside `setup()`.

### API Services Pattern

Services in `src/services/` use axios instances from `src/libs/axios.js`:

- Token refresh handled automatically via interceptors
- Use `{ headers: { showErrorToast: false } }` to suppress error toasts

### Store Module Pattern

```javascript
// src/store/{module}/index.js
export default {
  state: () => ({
    /* ... */
  }),
  mutations: {
    SET_DATA(state, data) {
      state.data = data
    },
  },
  actions: {
    async fetchData({ commit }) {
      /* ... */
    },
  },
  getters: { getData: state => state.data },
}
```

### Permissions/Abilities

Use CASL for route and feature permissions:

```javascript
import { canNavigate } from '@/libs/acl/routeProtection'
// In route meta: { resource: 'Missions', action: 'read' }
```

## Key Path Aliases

```javascript
'@'          -> 'src/'
'@core'      -> 'src/@core/'
'@components'-> 'src/layouts/components/'
'@axios'     -> 'src/libs/axios'
'@themeConfig' -> 'themeConfig.js'
'@validations' -> 'src/@core/utils/validations/'
```

## Testing

- Setup: `tests/unit/setup.js` (mocks i18n, localStorage, window APIs)
- Mock env: `process.env.VUE_APP_WHITELABEL = 'educacross'`
- Use `shallowMount` for isolated component tests

## Important Conventions

- **Commits**: `type(scope): description` (feat, fix, docs, refactor)
- **Branch naming**: `feature/EC-XXXX-description`, `bugfix/EC-XXXX-description`
- **Main branch**: `nave-develop`
- **CSS**: BEM methodology in scoped styles
- **i18n**: Use `$t('key')` for translations (`src/libs/i18n/`)

## Authentication Flow

1. External login at account portal returns tokens via URL params
2. `loginUser()` in `src/auth/utils.js` decodes JWT, fetches permissions
3. Abilities stored in Vuex and CASL instance updated
4. Token refresh via axios interceptor on 401

## Environment Variables

Key variables in `.env` (use `VITE_APP_` prefix):

- `VITE_APP_BASE_URL_API`: API endpoint
- `VITE_APP_WHITELABEL`: Brand name (educacross|superensino|seduc|somosplay)
- `VITE_APP_BLOB`: Blob storage URL for assets

## File Locations

- Global components: `src/global-components.js`
- Event bus: `src/eventBus.js` (mitt-based)
- Filters: `src/filters/filters.js`
- Validations: `src/@core/utils/validations/validations.js`

## Form Validation (VeeValidate 3)

This project uses **vee-validate 3.4.5** with `ValidationObserver` and `ValidationProvider` components.

### Imports

```javascript
import { ValidationObserver, ValidationProvider } from 'vee-validate'
// Import validation rules as needed
import { required, email, min, max } from '@/@core/utils/validations/validations'
```

### Template Pattern

```vue
<template>
  <ValidationObserver ref="formRef">
    <b-form @submit.prevent="onSubmit">
      <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
        <b-form-group label="Email">
          <b-form-input
            v-model="formData.email"
            :state="errors.length > 0 ? false : null"
          />
          <small v-if="errors.length" class="text-danger">
            {{ errors[0] }}
          </small>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider v-slot="{ errors }" name="password" rules="required|max:30|password">
        <b-form-group label="Password">
          <b-form-input
            v-model="formData.password"
            type="password"
            :state="errors.length > 0 ? false : null"
          />
          <small v-if="errors.length" class="text-danger">
            {{ errors[0] }}
          </small>
        </b-form-group>
      </ValidationProvider>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </ValidationObserver>
</template>
```

### Available Validation Rules (from `src/@core/utils/validations/validations.js`)

Rules are registered globally using `extend()`:

- `required` - Required field
- `email` - Valid email format
- `min` - Minimum length
- `max` - Maximum length
- `confirmed` - Match another field (use with `:target` param)
- `password` - Password format (no whitespace)
- `alpha` - Alphabetic characters only
- `alpha-dash` - Alphanumeric with dashes/underscores
- `alpha-num` - Alphanumeric only
- `digits` - Numeric digits only
- `integer` - Integer numbers
- `between` - Value between range
- `length` - Exact length
- `positive` - Positive numbers
- `credit-card` - Credit card validation
- `url` - Valid URL format
- `registredEmail` - Async check if email exists (custom)
- `requiredDateRange` - Date range validation (custom)

### Using Rules in Template

**String syntax** (multiple rules with `|`):
```vue
<ValidationProvider rules="required|email|max:50" name="email">
```

**Object syntax** (with parameters):
```vue
<ValidationProvider :rules="{ required: true, min: 8, confirmed: '@password' }" name="passwordConfirm">
```

### Form Reference Methods

```javascript
const formRef = ref(null)

// Validate entire form
const isValid = await formRef.value.validate()

// Reset form validation
formRef.value.reset()
```

### Import Rules Before Use

To use validation rules, import them in your component (this registers them globally):

```javascript
import { required, email, max, password } from '@/@core/utils/validations/validations'
```

## Architecture Pattern: Domain-Driven Design

### Global Filter System (CRITICAL)

**ALWAYS use `useFilters()` for subject/class/institution filters:**

```javascript
import useFilters from '@/store/filters/useFilters'

const { subject, subjects, classe, classes, fetchSubjects } = useFilters()

// Watch for changes
watch(classe, async () => {
  if (classe.value?.ClassId) {
    await fetchSubjects()
  }
})
```

### Domain Composables Pattern

Each feature domain has a `useDomainName.js` composable:

```javascript
// Example: useEducationSystemBooks.js
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { computed } from 'vue'

const moduleName = 'EducationSystemBooks'
const { subject, classe } = useFilters()

export default function useEducationSystemBooks() {
  const books = computed({
    get: () => store.getters[`${moduleName}/books`],
    set: val => store.commit(`${moduleName}/books`, val),
  })

  const loading = computed({
    get: () => store.getters[`${moduleName}/loading`],
    set: val => store.commit(`${moduleName}/loading`, val),
  })

  const fetchData = async () => {
    loading.value = true
    const response = await getEducationSystemBooks({
      SubjectId: subject.value.id,
      ClassId: classe.value.ClassId,
    })
    books.value = response.data.books
    loading.value = false
  }

  return { moduleName, books, loading, fetchData }
}
```

## Standard Page Structure (DDD Pattern)

Every feature page MUST follow this structure:

```
feature-name/
|-- Index.vue           # Main orchestrator
|-- Filters.vue         # Filter components (uses useFilters, ESelect)
|-- List.vue            # Data table (ListTable/ListTableLocalSorting)
|-- Title.vue           # Page title/header (optional)
|-- useDomainName.js    # Domain composable
+-- Root.vue            # Route entry point (optional)
```

### Component Responsibilities

#### Index.vue - Main Orchestrator
```vue
<template>
  <section>
    <PageTitle />
    <Filters />
    <List />
  </section>
</template>

<script>
import Filters from './Filters.vue'
import List from './List.vue'
import store from '@/store'
import myModule from '@/store/pageModules/my-module.js'
import { onMounted, onUnmounted } from 'vue'

export default {
  components: { Filters, List },
  setup() {
    store.registerModule('MyFeature', myModule)

    onUnmounted(() => {
      store.commit('MyFeature/reset')
      store.unregisterModule('MyFeature')
    })
  }
}
</script>
```

#### Filters.vue - Filter Components
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
            @input="handleSubjectChange"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import ESelect from '@/components/selects/ESelect.vue'
import useFilters from '@/store/filters/useFilters'
import { watch } from 'vue'

export default {
  components: { ESelect },
  setup() {
    const { subject, subjects, classe, fetchSubjects } = useFilters()

    watch([subject, classe], () => {
      // Trigger data fetch
      store.dispatch('MyFeature/fetch')
    })

    return { subject, subjects }
  }
}
</script>
```

#### List.vue - Data Table
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
      <b-badge :variant="getVariant(item.status)">
        {{ $t(item.status) }}
      </b-badge>
    </template>
  </ListTable>
</template>

<script>
import ListTable from '@/components/table/ListTable.vue'
import { ref, computed } from 'vue'
import store from '@/store'

export default {
  components: { ListTable },
  setup() {
    const listTableRef = ref(null)
    const loading = computed(() => store.getters['MyFeature/loading'])
    const data = computed(() => store.getters['MyFeature/data'])

    const handleChange = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
      store.commit('MyFeature/setParams', {
        Search: searchQuery,
        OrderBy: sortBy,
        Ascending: `${!isSortDirDesc}`,
        Page: currentPage,
        PageSize: perPage,
      })
      store.dispatch('MyFeature/fetch')
    }

    return { listTableRef, loading, data, handleChange }
  }
}
</script>
```

## Custom Component Usage

### ESelect - Advanced Select Component

```vue
<!-- Single Selection -->
<ESelect
  v-model="selected"
  :options="options"
  label="name"
  track-by="id"
  placeholder="selectOption"
  :searchable="true"
  :clearable="true"
/>

<!-- Multiple Selection -->
<ESelect
  v-model="selectedItems"
  :options="options"
  :multiple="true"
  label="name"
  track-by="id"
/>

<!-- With Pagination -->
<ESelect
  v-model="selected"
  :options="currentPageOptions"
  :paginated="true"
  :page="currentPage"
  :total-pages="totalPages"
  @nextPage="loadNextPage"
/>
```

### ListTable - Server-Side Data Table

```vue
<ListTable
  :data-table="items"
  :table-columns="columns"
  :loading="loading"
  :total-data="total"
  :current-page="page"
  :per-page="perPage"
  search-placeholder="search"
  @page-changed="handlePageChange"
  @search="handleSearch"
  @sort-changed="handleSort"
>
  <template #cell(actions)="{ item }">
    <b-button @click="edit(item)">Edit</b-button>
  </template>
</ListTable>
```

### ListTableLocalSorting - Client-Side Data Table

```vue
<!-- Use for small datasets (<1000 records) -->
<ListTableLocalSorting
  :data-table="allData"
  :table-columns="columns"
  :loading="loading"
  :per-page-default="10"
/>
```

## Testing Pattern

```javascript
import { shallowMount } from '@vue/test-utils'
import MyComponent from '@/components/MyComponent.vue'

describe('MyComponent', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(MyComponent, {
      propsData: { title: 'Test' }
    })
    expect(wrapper.find('h1').text()).toBe('Test')
  })
})
```

## Common Patterns

### Watch Filters and Fetch Data
```javascript
watch([subject, classe], () => {
  if (subject.value?.id && classe.value?.ClassId) {
    fetchData()
  }
})
```

### Reset Pagination on Filter Change
```javascript
watch([networkGroup], () => {
  store.commit('MyFeature/setParams', { Page: 1 })
  listTableRef.value.resetPage()
  store.dispatch('MyFeature/fetch')
})
```

### Vuex Module Pattern
```javascript
export default {
  namespaced: true,
  state: {
    data: [],
    loading: false,
  },
  mutations: {
    data(state, payload) { state.data = payload },
    loading(state, payload) { state.loading = payload },
  },
  getters: {
    data: state => state.data,
    loading: state => state.loading,
  },
}
```

## White Label Support

The app supports multiple brands via `VITE_APP_WHITELABEL` environment variable:
- educacross (default)
- seduc
- superensino
- somosplay

## Best Practices

DO:
- Use `useFilters()` for subject/class/institution filters
- Use domain composables for business logic
- Use `ESelect` for all dropdowns
- Use `ListTable` variants for all tables
- Import router/store directly
- Add JSDoc to all functions
- Follow DDD page structure
- Clean up on unmount (unregister modules)

DON'T:
- Use `this.$router` or `this.$store`
- Use Vue filters (deprecated in Vue 3)
- Use `this.$bvModal` or other global APIs
- Put business logic in Index.vue
- Skip JSDoc documentation
- Forget to unregister Vuex modules
- Use v-select (use ESelect instead)
- Use b-table (use ListTable instead)

## Quick Reference

### Creating a New Feature
1. Create Vuex page module in `store/pageModules/`
2. Create `useDomainName.js` composable
3. Create page structure: Index.vue, Filters.vue, List.vue
4. Use `useFilters()` in Filters.vue
5. Use `ListTable` in List.vue
6. Register/unregister module in Index.vue
7. Add tests

### Adding Filters
```javascript
// In Filters.vue
import useFilters from '@/store/filters/useFilters'
const { subject, subjects, classe, fetchSubjects } = useFilters()
```

### Creating Composable
```javascript
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { computed } from 'vue'

const moduleName = 'MyFeature'

export default function useMyFeature() {
  const data = computed({
    get: () => store.getters[`${moduleName}/data`],
    set: val => store.commit(`${moduleName}/data`, val),
  })

  return { moduleName, data }
}
```

## Main Branch

All pull requests target: **develop**

## API Documentation

Test API: https://apieducacrossmanager-test.azurewebsites.net/index.html
