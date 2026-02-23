# Educacross Front Office - Developer Guide

## Project Overview

This is the **Educacross Front Office** application, an educational platform management system built on the Vuexy admin dashboard template. The application supports multiple white-label configurations (educacross, seduc, superensino, somosplay) and provides comprehensive features for managing educational content, assessments, reports, and user interactions across different user contexts (admin, teacher, student, network manager, auditor).

## Critical Architectural Patterns - Quick Reference

Before developing any feature, understand these core patterns:

### 1. Global Filter System (`useFilters`)

**MUST USE** when working with subject/class filters:

```javascript
import useFilters from '@/store/filters/useFilters'

const { subject, subjects, classe, classes, fetchSubjects } = useFilters()
```

- Provides centralized access to: subject, class, serie, institution, student, period, etc.
- Always reactive and connected to Vuex store
- Use `fetchSubjects()` to populate subject dropdown based on current filters

### 2. Domain-Driven Design with Composables

Each feature domain has a `useDomainName` composable:

```javascript
// Example: useEducationSystemBooks.js
import useFilters from '@/store/filters/useFilters'

const moduleName = 'EducationSystemBooks'
const { subject, classe } = useFilters()

export default function useEducationSystemBooks() {
  const books = computed({
    get: () => store.getters[`${moduleName}/books`],
    set: val => store.commit(`${moduleName}/books`, val),
  })

  const fetchData = async () => {
    // Uses subject.value.id and classe.value.ClassId from useFilters
  }

  return { books, fetchData }
}
```

**See "Key Features & Patterns" section below for detailed documentation.**

### 3. Vue Development Best Practices (CRITICAL)

**IMPORTANT**: Follow these practices for Vue 3 compatibility and better code quality:

#### Router and Store Usage

**ALWAYS import router and store directly** - Never use `this.$router`, `this.$store`, or `setup(props, { root })`:

```javascript
// ✅ CORRECT - Import directly
import router from '@/router'
import store from '@/store'

export default {
  setup() {
    const navigateToHome = () => {
      router.push({ name: 'home' })
    }

    const userData = computed(() => store.getters['account/userData'])

    return { navigateToHome, userData }
  }
}
```

```javascript
// ❌ WRONG - Don't use this.$router or root
export default {
  setup(props, { root }) {
    const navigateToHome = () => {
      root.$router.push({ name: 'home' }) // BAD
    }
    return { navigateToHome }
  },
  methods: {
    goBack() {
      this.$router.go(-1) // BAD
    }
  }
}
```

**Why**: Direct imports provide better type safety, are Vue 3 compatible, and work seamlessly with Composition API.

#### Filters - Convert to Functions

**NEVER use Vue filters** - They are deprecated in Vue 3. Convert all filter usage to function calls:

```javascript
// ✅ CORRECT - Use functions
import { formatDate, formatCurrency } from '@/utils/formatters'

export default {
  setup() {
    const formattedDate = computed(() => formatDate(date.value))
    const formattedPrice = computed(() => formatCurrency(price.value))

    return { formattedDate, formattedPrice }
  }
}
```

```vue
<!-- ✅ CORRECT - Template function usage -->
<template>
  <div>
    <p>{{ formatDate(date) }}</p>
    <p>{{ formatCurrency(price) }}</p>
  </div>
</template>
```

```vue
<!-- ❌ WRONG - Don't use filters -->
<template>
  <div>
    <p>{{ date | dateFilter }}</p>
    <p>{{ price | currency }}</p>
  </div>
</template>
```

**Migration Guide**: If you find a component using filters:
1. Import the corresponding function from `@/utils/` or create it
2. Replace filter usage in template with function calls
3. For complex transformations, use computed properties

```javascript
// Example: Converting a filter to a function
// Old filter: src/filters/dateFilter.js
Vue.filter('dateFilter', (value) => {
  return moment(value).format('DD/MM/YYYY')
})

// New function: src/utils/formatters.js
/**
 * Formats a date to DD/MM/YYYY format
 * @param {string|Date} value - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(value) {
  return moment(value).format('DD/MM/YYYY')
}
```

#### Component Internal Functions - Use Refs

**ALWAYS use component refs** instead of accessing Vue/Bootstrap APIs directly:

```vue
<!-- ✅ CORRECT - Use refs -->
<template>
  <b-modal ref="myModalRef" title="Example">
    <p>Modal content</p>
  </b-modal>
  <b-button @click="openModal">Open</b-button>
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
  setup() {
    const myModalRef = ref(null)

    const openModal = () => {
      myModalRef.value.show() // Access via ref
    }

    const closeModal = () => {
      myModalRef.value.hide() // Access via ref
    }

    return { myModalRef, openModal, closeModal }
  }
}
</script>
```

```vue
<!-- ❌ WRONG - Don't use $bvModal or other global APIs -->
<template>
  <b-modal id="my-modal" title="Example">
    <p>Modal content</p>
  </b-modal>
  <b-button @click="openModal">Open</b-button>
</template>

<script>
export default {
  methods: {
    openModal() {
      this.$bvModal.show('my-modal') // BAD
    }
  }
}
</script>
```

**Common Components to Use with Refs**:
- `b-modal` - Use `ref.value.show()` / `ref.value.hide()`
- `b-toast` - Create toast component with ref instead of `this.$bvToast`
- `ListTable` - Use `ref.value.resetPage()` for pagination reset
- Custom components with exposed methods

#### JSDoc Documentation

**ALWAYS add JSDoc comments** to functions, composables, and complex data structures:

```javascript
/**
 * Custom composable for managing student records
 * @returns {Object} Student management interface
 * @property {import('vue').ComputedRef<Array<Student>>} students - List of students
 * @property {import('vue').ComputedRef<boolean>} loading - Loading state
 * @property {Function} fetchStudents - Fetches students from API
 * @property {Function} updateStudent - Updates a student record
 */
export default function useStudentRecords() {
  const moduleName = 'StudentRecords'

  /**
   * @typedef {Object} Student
   * @property {number} id - Student ID
   * @property {string} name - Student full name
   * @property {string} email - Student email
   * @property {number} gradeLevel - Current grade level
   * @property {boolean} isActive - Whether student is active
   */

  /** @type {import('vue').ComputedRef<Student[]>} */
  const students = computed({
    get: () => store.getters[`${moduleName}/students`],
    set: val => store.commit(`${moduleName}/students`, val),
  })

  /** @type {import('vue').ComputedRef<boolean>} */
  const loading = computed({
    get: () => store.getters[`${moduleName}/loading`],
    set: val => store.commit(`${moduleName}/loading`, val),
  })

  /**
   * Fetches students based on current filter state
   * @param {Object} params - Query parameters
   * @param {number} params.classId - Class ID to filter by
   * @param {number} [params.gradeLevel] - Optional grade level filter
   * @returns {Promise<void>}
   */
  const fetchStudents = async ({ classId, gradeLevel }) => {
    loading.value = true
    try {
      const response = await getStudents({ classId, gradeLevel })
      students.value = response.data
    } catch (error) {
      console.error('Failed to fetch students:', error)
      students.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * Updates a student record
   * @param {number} studentId - ID of student to update
   * @param {Partial<Student>} updates - Fields to update
   * @returns {Promise<boolean>} Success status
   */
  const updateStudent = async (studentId, updates) => {
    try {
      await updateStudentRecord(studentId, updates)
      await fetchStudents()
      return true
    } catch (error) {
      console.error('Failed to update student:', error)
      return false
    }
  }

  return {
    moduleName,
    students,
    loading,
    fetchStudents,
    updateStudent,
  }
}
```

**JSDoc Benefits**:
- Provides IntelliSense in VSCode
- Documents expected data structures
- Helps with refactoring
- Serves as inline documentation
- Improves code maintainability

**Minimum JSDoc Requirements**:
1. Function purpose description
2. `@param` tags for all parameters with types
3. `@returns` tag with return type
4. `@typedef` for complex data structures
5. Property descriptions for returned objects

### 4. DDD Page Structure Pattern

Pages follow a standardized component organization pattern:

```
feature-name/
├── Index.vue           # Main orchestrator (imports Filters, List, Title, etc.)
├── Filters.vue         # Filter components (uses useFilters, ESelect)
├── List.vue            # Data table (ListTable/ListTableLocalSorting)
├── Title.vue           # Page title/header (optional)
├── useDomainName.js    # Domain composable (state + logic)
└── Root.vue            # Route entry point (optional, for sub-routes)
```

**Each component has a single responsibility - follow this pattern for consistency.**

## Tech Stack

### Core Framework

- **Vue.js 2.x** - Progressive JavaScript framework
- **Vue Router 3.6.5** - Official router for Vue.js
- **Vuex 3.6.0** - State management pattern + library
- **Bootstrap Vue 2.23.0** - Bootstrap 4 components for Vue.js

### Key Libraries & Dependencies

- **Composition API** - `@vue/composition-api` for modern Vue patterns
- **Authentication** - `@azure/msal-browser` for Microsoft authentication
- **Authorization** - `@casl/ability` for role-based access control
- **Charts & Visualization**:
  - ApexCharts 3.35.2
  - Chart.js 2.9.4
  - ECharts 5.6.0
- **Forms & Validation** - VeeValidate 3.4.5
- **Internationalization** - vue-i18n 8.22.2
- **HTTP Client** - Axios 1.7.8
- **File Processing**:
  - ExcelJS 4.3.0
  - jsPDF 3.0.1
  - XLSX 0.18.3
- **UI Components**:
  - Flatpickr (date picker)
  - Vue Select 3.11.2
  - Quill 2.0.3 (rich text editor)
  - Cropper.js 1.6.2 (image cropping)

### Development Tools

- **Build Tool** - Vue CLI 4.5.9
- **Testing Framework** - Jest 27.0.5
- **Test Utilities** - @vue/test-utils 1.1.3
- **Linting** - ESLint 7.32.0 with Airbnb config
- **Code Formatting** - Prettier 2.7.1
- **Git Hooks** - Husky 7.0.4
- **CSS Preprocessor** - Sass 1.32.x
- **Styling** - Tailwind CSS 1.0.1

## Project Structure

```
educacross-frontoffice/
├── public/                      # Static assets
│   ├── assets/                  # Public assets
│   └── whiteLabel/              # White-label specific assets
├── src/
│   ├── @core/                   # Core framework files
│   │   ├── app-config/          # App configuration
│   │   ├── assets/              # Core assets
│   │   ├── auth/                # Core authentication
│   │   ├── components/          # Core reusable components
│   │   ├── directives/          # Vue directives
│   │   ├── layouts/             # Core layout components
│   │   ├── libs/                # Core libraries
│   │   ├── mixins/              # Vue mixins
│   │   ├── scss/                # Core styles
│   │   └── utils/               # Core utilities
│   ├── assets/                  # Application assets
│   │   ├── css/                 # CSS files
│   │   ├── fonts/               # Font files
│   │   ├── icons/               # Icon assets
│   │   ├── images/              # Image assets
│   │   ├── scss/                # SCSS stylesheets
│   │   └── tailwind/            # Tailwind configuration
│   ├── auth/                    # Authentication logic
│   │   └── microsoft/           # Microsoft auth integration
│   ├── components/              # Application components
│   │   ├── NPS/                 # Net Promoter Score components
│   │   ├── PDFs/                # PDF generation components
│   │   ├── evaluations/         # Assessment components
│   │   ├── exercise-type/       # Exercise type components
│   │   ├── filter/              # Filter components
│   │   ├── form/                # Form components
│   │   ├── modal/               # Modal components
│   │   ├── question/            # Question components
│   │   ├── table/               # Table components
│   │   └── ... (many more)      # Various feature components
│   ├── consts/                  # Application constants
│   │   ├── admin-context/       # Admin constants
│   │   ├── legends/             # Legend definitions
│   │   └── teacher-context/     # Teacher constants
│   ├── filters/                 # Vue filters
│   ├── layouts/                 # Application layouts
│   │   ├── components/          # Layout components
│   │   ├── full/                # Full layout
│   │   ├── horizontal/          # Horizontal layout
│   │   └── vertical/            # Vertical layout
│   ├── libs/                    # Third-party integrations
│   │   ├── acl/                 # Access control library
│   │   └── i18n/                # Internationalization
│   ├── navigation/              # Navigation configurations
│   │   ├── horizontal/          # Horizontal menu
│   │   └── vertical/            # Vertical menu
│   ├── router/                  # Vue Router configuration
│   │   ├── admin-routes/        # Admin routes
│   │   ├── auditor-routes/      # Auditor routes
│   │   ├── network-manager-routes/ # Network manager routes
│   │   ├── page-routes/         # Page routes
│   │   └── professor-routes/    # Professor routes
│   ├── services/                # API services
│   │   ├── admin-context/       # Admin services
│   │   ├── auth-context/        # Auth services
│   │   ├── network-manager-context/ # Network manager services
│   │   ├── notifications/       # Notification services
│   │   ├── responsible-context/ # Parent/guardian services
│   │   ├── shared/              # Shared services
│   │   ├── teacher-context/     # Teacher services
│   │   └── whitelabel/          # White-label services
│   ├── store/                   # Vuex store modules
│   │   ├── access/              # Access control state
│   │   ├── account/             # Account state
│   │   ├── admin-context/       # Admin state
│   │   ├── app/                 # App state
│   │   ├── app-config/          # App configuration state
│   │   ├── evaluation/          # Evaluation state
│   │   ├── filters/             # Filter state
│   │   ├── loggedAccess/        # Logged access state
│   │   ├── pageModules/         # Page modules state
│   │   ├── table/               # Table state
│   │   ├── teacher-context/     # Teacher state
│   │   └── vertical-menu/       # Menu state
│   ├── utils/                   # Utility functions
│   │   ├── dashboard/           # Dashboard utilities
│   │   ├── report-education-system/ # Report utilities
│   │   └── teacher-utils/       # Teacher utilities
│   ├── views/                   # Application views/pages
│   │   ├── dashboard/           # Dashboard views
│   │   ├── dev/                 # Development views
│   │   ├── error/               # Error pages
│   │   ├── events/              # Event views
│   │   ├── management/          # Management views
│   │   ├── pages/               # General pages
│   │   └── reports/             # Report views
│   ├── whiteLabel/              # White-label configurations
│   ├── App.vue                  # Root component
│   ├── eventBus.js              # Event bus
│   ├── global-components.js     # Global component registration
│   └── main.js                  # Application entry point
├── tests/                       # Test files
│   ├── Integration/             # Integration tests
│   ├── e2e/                     # End-to-end tests
│   ├── shallowRendering/        # Shallow rendering tests
│   └── unit/                    # Unit tests
│       ├── composables/         # Composable tests
│       ├── factories/           # Test factories
│       ├── helpers/             # Test helpers
│       ├── views/               # View tests
│       └── setup.js             # Test setup configuration
├── scripts/                     # Build and utility scripts
├── docker/                      # Docker configurations
├── wiki/                        # Documentation
├── .env                         # Environment variables
├── babel.config.js              # Babel configuration
├── jest.config.js               # Jest configuration
├── tailwind.config.js           # Tailwind configuration
├── themeConfig.js               # Theme configuration
├── vue.config.js                # Vue CLI configuration
└── package.json                 # Project dependencies and scripts
```

## Prerequisites

- **Node.js**: v14
- **npm**: 6.x or higher
- **Git**: For version control

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd educacross-frontoffice
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   - Copy `.env` file or create one with the required variables
   - Key environment variables include:
     - `VUE_APP_BASE_URL_API` - API base URL
     - `VUE_APP_WHITELABEL` - White-label configuration (educacross, seduc, superensino, somosplay)
     - `VUE_APP_BLOB_IMAGE` - Blob storage URL for images
     - Authentication service URLs (Microsoft, Google, LEX, etc.)

## Running the Application

### Development Server

Start the development server with hot-reload:

```bash
npm run serve
```

The application will be available at `http://localhost:8080`

**Note:** The `prestart` script automatically runs before `serve` to generate white-label colors.

### Production Build

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist/` directory.

**Note:** The `prebuild` script automatically runs before `build` to generate white-label colors.

### Serve Production Build Locally

To test the production build locally:

```bash
npm run serve:dist
```

This serves the `dist/` folder on `http://localhost:8080`

## Testing

### Run All Tests

```bash
npm test
```

### Run Unit Tests

```bash
npm run test:unit
```

Tests run with timezone set to UTC for consistency.

### Run Tests with Coverage

```bash
npm run test:coverage
```

This generates a coverage report showing test coverage metrics.

### Test Configuration

- **Framework**: Jest 27.0.5
- **Preset**: @vue/cli-plugin-unit-jest
- **Test Utilities**: @vue/test-utils 1.1.3
- **Test Pattern**: `**/__tests__/**/*.spec.js` and `**/*.spec.js`
- **Setup File**: `tests/unit/setup.js`
- **Module Aliases**: Configured to match the application's path aliases (@core, @, @components, etc.)

### Test Structure

Tests are organized in the `tests/` directory:

- `tests/unit/` - Unit tests for components, composables, and utilities
- `tests/Integration/` - Integration tests
- `tests/e2e/` - End-to-end tests
- `tests/shallowRendering/` - Shallow rendering tests

### Writing Tests

Example test structure:

```javascript
// tests/unit/components/MyComponent.spec.js
import MyComponent from '@/components/MyComponent.vue'
import { shallowMount } from '@vue/test-utils'

describe('MyComponent', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(MyComponent)
    expect(wrapper.exists()).toBe(true)
  })
})
```

## Code Quality

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

ESLint is configured with:

- Airbnb style guide
- Vue.js recommended rules
- Prettier integration

### Code Formatting

Format code with Prettier:

```bash
npm run pretty
```

This formats `.vue`, `.json`, `.scss`, and `.css` files.

### Git Hooks

Husky is configured to run pre-commit hooks. To set up:

```bash
npm run prepare
```

This ensures code quality checks run before commits.

## Authentication & Login Process

The application supports multiple authentication providers:

1. **Microsoft Azure AD** - Using @azure/msal-browser
2. **Google OAuth** - Using vue-google-login
3. **LEX Education** - Custom integration
4. **Plurall** - Custom integration
5. **SAS** - Custom integration
6. **Layers** - Custom integration

## White Label Configuration

The application supports multiple white-label configurations:

- **educacross** (default)
- **seduc**
- **superensino**
- **somosplay**

Configuration is controlled via the `VUE_APP_WHITELABEL` environment variable.

### White Label Assets

White-label specific files are located in:

- `/src/assets/scss/whitelabel/` - SCSS variables and styles
- `/public/whiteLabel/` - Public assets (logos, icons, etc.)
- `/src/whiteLabel/` - White-label specific configurations

### Generating White Label Colors

White-label colors are automatically generated before build/serve:

```bash
node ./scripts/generate-whitelabel-colors.js
```

## Key Features & Patterns

### Architecture Overview - DDD Pattern with Composables

The application follows a **Domain-Driven Design (DDD)** architecture pattern using Vue Composition API. Each domain has its own composable function that acts as an interface between components and the Vuex store.

#### Global Filter System (`useFilters`)

**Location**: `src/store/filters/useFilters.js`

The `useFilters` composable is a **critical global utility** that MUST be used across the application to manage shared filter state. It provides centralized access to:

- **Subject & Subjects**: Selected subject and available subjects list
- **Class (classe)**: Selected class/turma
- **Serie**: Selected grade/series
- **Institution**: Selected institution/school
- **Student & Students**: Selected student and students list
- **Period**: Selected time period
- **Evaluation ID**: Current evaluation identifier
- **Book**: Selected book
- **Mission**: Selected mission
- **Network Group**: Selected network group
- **Module ID**: Current module identifier
- **Education System ID**: Current education system identifier

**IMPORTANT USAGE RULES**:

1. **Always use `useFilters()` to populate/select subject and class filters** if the page/component has them
2. Import at the top of your component or composable:

   ```javascript
   import useFilters from '@/store/filters/useFilters'

   const { subject, subjects, classe, classes, institution, serie } = useFilters()
   ```

3. The filters are reactive computed properties connected to the Vuex store
4. Use `fetchSubjects()` or `fetchSubjectsWithParams()` to load subject data based on current filters

**Key Methods**:

- `fetchSubjects()` - Fetches subjects based on current filter state
- `fetchSubjectsWithParams(params)` - Fetches subjects with custom parameters
- `getSubjectRequestParams(additionalModules)` - Builds request parameters for API calls

**Example Usage**:

```javascript
import useFilters from '@/store/filters/useFilters'

export default {
  setup() {
    const { subject, subjects, classe, fetchSubjects } = useFilters()

    // Watch for class changes and fetch subjects
    watch(classe, async () => {
      if (classe.value?.ClassId) {
        await fetchSubjects()
      }
    })

    return { subject, subjects, classe }
  },
}
```

#### Domain Composables Pattern (`useDomainName`)

Each feature domain has a dedicated composable following the naming convention `useDomainName` (e.g., `useEducationSystemBooks`, `useEducationSystemMissions`, `useRecordStudents`).

**Structure**:

```javascript
// Example: src/views/pages/teacher-context/educationSystem/books/useEducationSystemBooks.js
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { computed } from '@vue/composition-api'

const moduleName = 'EducationSystemBooks'
const { subject, educationSystemId, classe } = useFilters()

export default function useEducationSystemBooks() {
  // Computed properties linked to Vuex module
  const books = computed({
    get: () => store.getters[`${moduleName}/books`],
    set: val => store.commit(`${moduleName}/books`, val),
  })

  const loading = computed({
    get: () => store.getters[`${moduleName}/loading`],
    set: val => store.commit(`${moduleName}/loading`, val),
  })

  // Domain-specific methods
  const fetchData = async () => {
    loading.value = true
    const response = await getEducationSystemBooks({
      SubjectId: subject.value.id,
      EducationSystemId: educationSystemId.value,
      ClassId: classe.value.ClassId,
    })
    books.value = response.data.books
    loading.value = false
  }

  return {
    moduleName,
    books,
    loading,
    fetchData,
  }
}
```

**Benefits of this Pattern**:

1. **Separation of Concerns**: Business logic separated from UI components
2. **Reusability**: Composables can be shared across multiple components
3. **Type Safety**: JSDoc types provide intellisense and documentation
4. **Testability**: Domain logic can be tested independently
5. **Vuex Interface**: Clean abstraction over Vuex store mutations/getters
6. **Global Filters Integration**: Seamless integration with `useFilters()` for shared state

**Naming Convention**:

- File: `useDomainName.js` (e.g., `useEducationSystemBooks.js`)
- Function: `export default function useDomainName()`
- Module Name: Stored in a constant (e.g., `const moduleName = 'EducationSystemBooks'`)

**Common Domain Composables**:

- `useEducationSystemBooks` - Education system books management
- `useEducationSystemMissions` - Education system missions
- `useRecordStudents` - Student records management
- `useRecordsClasses` - Class records management
- `useMissionsRanking` - Mission ranking data
- `useReadingMeterV2` - Reading meter functionality
- `useWritingStagesStudents` - Writing stages for students

**Page Module Structure**:

Each domain composable corresponds to a Vuex module in `src/store/pageModules/`:

```
src/store/pageModules/
├── educationSystem/
│   ├── module-education-system-books.js
│   ├── module-education-system-missions.js
│   └── module-education-system-students.js
├── missions/
│   └── shared-missions-module.js
├── readingMeter/
│   └── readingMeterModule.js
└── reports/
    └── missions-plus-admin/
```

**Module Structure**:

```javascript
// Example: module-education-system-books.js
export default {
  namespaced: true,
  state: {
    educationSystemName: '',
    books: [],
    loading: true,
    onlyInProgress: false,
  },
  mutations: {
    books(state, payload) {
      state.books = payload
    },
    loading(state, payload) {
      state.loading = payload
    },
  },
  getters: {
    books(state) {
      return state.books
    },
    loading(state) {
      return state.loading
    },
  },
}
```

### State Management (Vuex)

The application uses Vuex with module-based organization:

- Modules are organized by feature/context in `src/store/pageModules/`
- Global state managed in `src/store/filters/` for shared filters
- `vuex-persist` is used for state persistence (auth, user, whitelabel)
- **Domain composables** provide clean interfaces to Vuex modules

### Routing

Vue Router with lazy-loaded routes for performance:

- Routes organized by user role (admin, teacher, auditor, network manager)
- Dynamic route generation for education systems
- Navigation guards for authentication and authorization

### Access Control (CASL)

Role-based access control using CASL:

- Abilities defined in store
- Component-level permissions
- Institution-level permissions

### Internationalization (i18n)

Multi-language support using vue-i18n:

- Language files in `src/libs/i18n/`
- Dynamic language switching
- Locale-specific date/number formatting

### API Services

Centralized API services using Axios:

- Service layer organized by context
- Interceptors for auth token management
- Error handling and retry logic

### Component Patterns

- **Composition API** - Modern component composition
- **Mixins** - Shared component logic
- **Directives** - Custom DOM manipulation
- **Filters** - Data transformation in templates

### Custom Reusable Components

The application includes several powerful custom components that should be used throughout the codebase:

#### ESelect - Advanced Select Component

**Location**: `src/components/selects/ESelect.vue`

A highly customizable dropdown select component with advanced features. **USE THIS instead of standard select/v-select for better UX.**

**Key Features**:

- Single or multiple selection
- Real-time search with debounce
- Pagination support for large datasets
- Async data loading
- Validation states
- Custom variants (primary, secondary, success, warning, danger)
- Modal for viewing selected items (multiple mode)
- Clearable option
- Accessible (ARIA compliant)

**Basic Usage**:

```vue
<template>
  <ESelect
    v-model="selectedOption"
    :options="options"
    label="name"
    track-by="id"
    placeholder="selectAnOption"
    :searchable="true"
  />
</template>

<script>
  import ESelect from '@/components/selects/ESelect.vue'

  export default {
    components: { ESelect },
    data() {
      return {
        selectedOption: null,
        options: [
          { id: 1, name: 'Option 1' },
          { id: 2, name: 'Option 2' },
        ],
      }
    },
  }
</script>
```

**Multiple Selection**:

```vue
<ESelect
  v-model="selectedOptions"
  :options="options"
  :multiple="true"
  :clearable="true"
  label="name"
  track-by="id"
  gender="F"
  prefix="option"
/>
```

**With Pagination** (for large datasets):

```vue
<ESelect
  v-model="selected"
  :options="currentPageOptions"
  :paginated="true"
  :page="currentPage"
  :total-pages="totalPages"
  @nextPage="loadNextPage"
/>
```

**Custom Slots**:

```vue
<ESelect v-model="selected" :options="users">
  <!-- Custom option display -->
  <template #option="{ id, name, email, avatar }">
    <div class="d-flex align-items-center">
      <img :src="avatar" class="avatar-sm mr-1" />
      <div>
        <div>{{ name }}</div>
        <small class="text-muted">{{ email }}</small>
      </div>
    </div>
  </template>

  <!-- Custom selected display -->
  <template #selected-option="{ name, avatar }">
    <div class="d-flex align-items-center">
      <img :src="avatar" class="avatar-xs mr-50" />
      <span>{{ name }}</span>
    </div>
  </template>
</ESelect>
```

**Important Props**:

- `options` (Array, required) - List of options
- `label` (String, default: 'name') - Property to display as text
- `track-by` (String, default: 'id') - Unique identifier property
- `multiple` (Boolean) - Enable multi-selection
- `searchable` (Boolean) - Enable search
- `clearable` (Boolean) - Allow clearing selection
- `paginated` (Boolean) - Enable pagination
- `state` (Boolean/null) - Validation state
- `variant` (String, default: 'primary') - Color variant

**Events**:

- `@input` - Selection changed
- `@change` - Selection confirmed
- `@nextPage` - Load next page (pagination)
- `@close` - Dropdown closed

#### ListTable - Data Table Component

**Location**: `src/components/table/ListTable.vue`

A comprehensive table component for displaying paginated data with server-side operations.

**Key Features**:

- Server-side pagination
- Integrated search with debounce
- Sorting by columns
- Excel export
- Loading states with skeleton
- Responsive (list/grid view)
- Customizable via slots

**Basic Usage**:

```vue
<template>
  <ListTable
    :data-table="students"
    :table-columns="columns"
    :loading="loading"
    :total-data="total"
    :current-page="currentPage"
    :per-page="perPage"
    search-placeholder="searchStudents"
    @page-changed="handlePageChange"
    @search="handleSearch"
    @sort-changed="handleSort"
  >
    <!-- Custom cell for status -->
    <template #cell(status)="{ item }">
      <b-badge :variant="getStatusVariant(item.status)">
        {{ $t(item.status) }}
      </b-badge>
    </template>

    <!-- Actions column -->
    <template #cell(actions)="{ item }">
      <b-button size="sm" variant="outline-primary" @click="edit(item)">
        <span class="material-symbols-outlined">edit</span>
      </b-button>
    </template>
  </ListTable>
</template>

<script>
  import ListTable from '@/components/table/ListTable.vue'

  export default {
    components: { ListTable },
    data() {
      return {
        students: [],
        total: 0,
        currentPage: 1,
        perPage: 10,
        loading: false,
        columns: [
          { key: 'name', label: 'Nome', sortable: true, searchable: true },
          { key: 'email', label: 'Email', sortable: true },
          { key: 'grade', label: 'Turma', sortable: false },
          { key: 'status', label: 'Status' },
          { key: 'actions', label: 'Ações' },
        ],
      }
    },
    methods: {
      async handlePageChange(page) {
        this.currentPage = page
        await this.fetchStudents()
      },
      async handleSearch(searchTerm) {
        this.searchQuery = searchTerm
        this.currentPage = 1
        await this.fetchStudents()
      },
    },
  }
</script>
```

**Column Configuration**:

```javascript
const columns = [
  {
    key: 'name', // Data property name
    label: 'Nome', // Column header (i18n key)
    sortable: true, // Enable sorting
    searchable: true, // Enable search
    tooltip: 'tooltipKey', // Tooltip text (i18n key)
    labelClass: 'text-center', // Header CSS class
  },
]
```

#### ListTableLocalSorting - Local Data Table

**Location**: `src/components/table/ListTableLocalSorting.vue`

Optimized table for datasets that can be loaded entirely in memory (local sorting/filtering).

**When to Use**:

- Small to medium datasets (< 1000 records)
- All data can be loaded at once
- Need instant search and sorting without API calls
- Displaying modal lists or dropdown tables (e.g., in ESelect)

**Usage**:

```vue
<template>
  <ListTableLocalSorting
    :data-table="allStudents"
    :table-columns="columns"
    :loading="loading"
    :per-page-default="10"
    :per-page-options="[5, 10, 25]"
    :show-view-selection="true"
    search-placeholder="searchStudents"
  >
    <template #cell(score)="{ item }">
      <ProgressBarHorizontal :value="item.score" :max="100" />
    </template>
  </ListTableLocalSorting>
</template>

<script>
  import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'

  export default {
    components: { ListTableLocalSorting },
    data() {
      return {
        allStudents: [], // Load ALL data at once
        loading: false,
        columns: [
          { key: 'name', label: 'Nome', sortable: true },
          { key: 'score', label: 'Pontuação', sortable: true },
        ],
      }
    },
    async mounted() {
      // Load all data
      this.loading = true
      const { data } = await this.$api.get('/students/all')
      this.allStudents = data
      this.loading = false
    },
  }
</script>
```

**Key Differences from ListTable**:

- **ListTable**: Server-side pagination, sorting, search (use for large datasets)
- **ListTableLocalSorting**: Client-side operations (use for small datasets, modals, dropdowns)

**Other Table Variants**:

- **ListTablePagination** - Basic pagination-only table
- **ListTableSelect** - Table with row selection (checkboxes)
- **ListTableSelectLocal** - Local table with row selection
- **ListTableRanking** - Specialized for ranking displays
- **ListTableAccess** - Specialized for access/permission tables

**Component Selection Guide**:

```
Need server-side operations? → ListTable
All data fits in memory? → ListTableLocalSorting
Need row selection with server-side? → ListTableSelect
Need row selection locally? → ListTableSelectLocal
Just showing rankings? → ListTableRanking
```

## DDD Page Structure Pattern (IMPORTANT)

The application follows a **strict component organization pattern** for all pages. This pattern enforces separation of concerns and makes code predictable and maintainable.

### Standard Page Structure

Every feature page should be organized following this structure:

```
src/views/pages/<context>/<feature>/
├── Index.vue              # Main orchestrator component
├── Filters.vue            # Filter components
├── List.vue               # Data table component
├── Title.vue              # Page title/header (optional)
├── useDomainName.js       # Domain composable
├── Root.vue               # Route entry point (optional, for nested routes)
└── components/            # Feature-specific components (optional)
    ├── FeatureCard.vue
    └── FeatureModal.vue
```

### Component Responsibilities

#### 1. **Root.vue** (Optional - For Nested Routes)

**Purpose**: Entry point for a feature with sub-routes. Handles initialization and routing.

**Example**: `src/views/events/EventsRoot.vue`

```vue
<template>
  <router-view />
</template>

<script>
  import store from '@/store'

  export default {
    name: 'EventsRoot',
    async setup() {
      // Reset filters when entering this section
      await store.dispatch('filters/reset')
    },
  }
</script>
```

**When to Use**:

- Feature has multiple sub-routes (e.g., `/events/list`, `/events/ranking`)
- Need to initialize state before rendering children
- Need to reset filters on entry

#### 2. **Index.vue** (Required - Main Orchestrator)

**Purpose**: Composes the page by importing and organizing sub-components. Handles:

- Module registration/unregistration
- Breadcrumb setup
- Event bus subscriptions
- Component layout

**Example**: `src/views/events/results-report/institutions-list/performance/Index.vue`

```vue
<template>
  <section>
    <PageTitle
      :title="eventDetails.eventActiveName"
      :start-date="eventDetails.startDate"
      :end-date="eventDetails.endDate"
      :status="eventDetails.status"
    />
    <Filters />
    <List />
    <LegendEnum :legends="legends" />
  </section>
</template>

<script>
  import Filters from './Filters.vue'
  import List from './List.vue'
  import LegendEnum from '@/components/legends/LegendEnum.vue'
  import store from '@/store'
  import modulePerformance from '@/store/pageModules/events/module-events-results-report-institutions-performance.js'
  import PageTitle from '@/views/events/components/PageTitle.vue'
  import { defineComponent, onMounted, onUnmounted, computed } from '@vue/composition-api'

  export default defineComponent({
    name: 'PerformanceIndex',
    components: {
      PageTitle,
      Filters,
      List,
      LegendEnum,
    },
    setup() {
      // Register Vuex module
      store.registerModule('resultsReportInstitutionsPerformance', modulePerformance)

      const eventDetails = computed(() => store.getters['events/eventDetails'])

      onMounted(() => {
        // Set breadcrumb
        vm.$bus.$emit('setBreadcrumb', [
          'Events',
          eventDetails.value.eventActiveName,
          'Performance',
        ])
      })

      onUnmounted(() => {
        // Clean up: reset state and unregister module
        store.commit('resultsReportInstitutionsPerformance/reset')
        store.unregisterModule('resultsReportInstitutionsPerformance')
      })

      return {
        eventDetails,
      }
    },
  })
</script>
```

**Key Responsibilities**:

- ✅ Import and compose Filters, List, Title components
- ✅ Register/unregister Vuex page modules
- ✅ Handle breadcrumb setup
- ✅ Manage event bus subscriptions
- ✅ Clean up on unmount
- ❌ NO business logic (use composable)
- ❌ NO filter state (use Filters.vue)
- ❌ NO table rendering (use List.vue)

#### 3. **Filters.vue** (Required if page has filters)

**Purpose**: Contains ALL filter components for the page. Uses `useFilters()` for global filters and local state for feature-specific filters.

**Example**: `src/views/events/results-report/institutions-list/performance/Filters.vue`

```vue
<template>
  <b-card>
    <b-row>
      <!-- Global filter from useFilters -->
      <b-col cols="12" md>
        <b-form-group :label="$t('networkGroups')" label-for="network-group">
          <ESelect
            id="network-group"
            label="name"
            :value="networkGroup"
            :options="networkGroups"
            :clearable="false"
            @input="setNetworkGroup"
          />
        </b-form-group>
      </b-col>

      <!-- Feature-specific filter -->
      <b-col cols="12" md>
        <b-form-group :label="$t('schoolYear')" label-for="schoolYear">
          <ESelect
            id="schoolYear"
            label="name"
            :value="serie"
            :options="series"
            :clearable="false"
            @input="setEventSerie"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
  import ESelect from '@/components/selects/ESelect.vue'
  import useFilters from '@/store/filters/useFilters'
  import useEvents from '@/views/events/useEvents.js'
  import { ref, watch, onMounted } from '@vue/composition-api'

  export default {
    name: 'PerformanceFilters',
    components: { ESelect },
    setup() {
      // Use global filters
      const { subject, classe } = useFilters()

      // Use domain composable
      const { networkGroup, setNetworkGroup, series, serie, setEventSerie } = useEvents()

      const networkGroups = ref([])

      // Fetch filter options
      const fetchNetworkGroups = async () => {
        const { data } = await getNetworkGroups()
        networkGroups.value = [{ id: null, name: 'Todos' }, ...data]
      }

      // Watch filters and trigger data fetch
      watch([serie, networkGroup], () => {
        // Trigger List.vue to refresh data
        store.dispatch('resultsReportInstitutionsPerformance/fetch')
      })

      onMounted(() => {
        fetchNetworkGroups()
      })

      return {
        networkGroup,
        setNetworkGroup,
        networkGroups,
        series,
        serie,
        setEventSerie,
      }
    },
  }
</script>
```

**Key Responsibilities**:

- ✅ Use `useFilters()` for subject/class/institution filters
- ✅ Use domain composable for feature-specific filters
- ✅ Use `ESelect` component for dropdowns
- ✅ Watch filters and trigger data refresh
- ✅ Wrap in `<b-card>` for consistent styling
- ❌ NO data fetching (List.vue handles this)
- ❌ NO table logic
- ❌ NO business logic beyond filter state

#### 4. **List.vue** (Required)

**Purpose**: Renders the data table. Handles pagination, sorting, search, and custom cell rendering.

**Example**: `src/views/events/results-report/institutions-list/performance/List.vue`

```vue
<template>
  <ListTable
    ref="listTableRef"
    :loading="isLoading"
    :table-columns="tableColumns"
    :data-table="dataTable"
    :total-data="totalData"
    search-placeholder="Pesquisar por habilidade"
    @change="changeListTable"
  >
    <!-- Custom cell rendering -->
    <template #cell(tag)="{ item }">
      <span :id="`popover-target-${item.tag}`" class="underline text-primary">
        {{ item.tag }}
      </span>
      <b-popover :title="item.tag" :target="`popover-target-${item.tag}`" triggers="hover">
        <p><strong>Habilidade:</strong> {{ item.name }}</p>
      </b-popover>
    </template>

    <template #cell(performance)="{ item }">
      <PerformanceCell :performance="item.performance" enum="eventLearningPerformance" />
    </template>
  </ListTable>
</template>

<script>
  import PerformanceCell from '@/components/cells/PerformanceCell.vue'
  import ListTable from '@/components/table/ListTable.vue'
  import store from '@/store'
  import useEvents from '@/views/events/useEvents.js'
  import { defineComponent, ref, watch, computed } from '@vue/composition-api'

  export default defineComponent({
    name: 'PerformanceList',
    components: {
      ListTable,
      PerformanceCell,
    },
    setup() {
      const listTableRef = ref(null)
      const { networkGroupID } = useEvents()

      const isLoading = computed(
        () => store.getters['resultsReportInstitutionsPerformance/loading'],
      )

      const dataTable = computed(() => store.getters['resultsReportInstitutionsPerformance/data'])

      const totalData = computed(() => store.getters['resultsReportInstitutionsPerformance/total'])

      const tableColumns = [
        { key: 'tag', label: 'CÓDIGO DA HABILIDADE', sortable: true },
        { key: 'knowledgeAxisName', label: 'TEMÁTICAS', sortable: true },
        { key: 'performance', label: 'Rendimento', sortable: true },
      ]

      // Handle table events (pagination, sort, search)
      const changeListTable = ({ currentPage, perPage, sortBy, isSortDirDesc, searchQuery }) => {
        store.commit('resultsReportInstitutionsPerformance/setParams', {
          Search: searchQuery,
          OrderBy: sortBy,
          Ascending: `${!isSortDirDesc}`,
          Page: currentPage,
          PageSize: perPage,
        })
        store.dispatch('resultsReportInstitutionsPerformance/fetch')
      }

      // Watch filters from Filters.vue and reset pagination
      watch([networkGroupID], () => {
        store.commit('resultsReportInstitutionsPerformance/setParams', { Page: 1 })
        listTableRef.value.resetPage()
        store.dispatch('resultsReportInstitutionsPerformance/fetch')
      })

      return {
        isLoading,
        listTableRef,
        dataTable,
        totalData,
        tableColumns,
        changeListTable,
      }
    },
  })
</script>
```

**Key Responsibilities**:

- ✅ Use `ListTable` or `ListTableLocalSorting` component
- ✅ Define `tableColumns` configuration
- ✅ Handle `@change` event (pagination, sort, search)
- ✅ Watch filter changes and reset pagination
- ✅ Use custom slots for complex cells
- ✅ Get data from Vuex store via computed properties
- ❌ NO filter components (Filters.vue handles this)
- ❌ NO data fetching logic (delegate to store/composable)

#### 5. **Title.vue** (Optional)

**Purpose**: Displays page title, breadcrumbs, and header information.

```vue
<template>
  <b-card>
    <div class="d-flex align-items-center justify-content-between">
      <div>
        <h2 class="mb-0">{{ title }}</h2>
        <p class="text-muted">{{ subtitle }}</p>
      </div>
      <b-badge :variant="statusVariant">{{ status }}</b-badge>
    </div>
  </b-card>
</template>

<script>
  export default {
    name: 'PageTitle',
    props: {
      title: String,
      subtitle: String,
      status: String,
      statusVariant: { type: String, default: 'primary' },
    },
  }
</script>
```

#### 6. **useDomainName.js** (Required for complex features)

**Purpose**: Domain composable that provides state management and business logic for the feature.

**Example**: `src/views/events/useEvents.js`

```javascript
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { computed } from '@vue/composition-api'

const moduleName = 'events'
const { networkGroup } = useFilters()

export default function useEvents() {
  // Computed properties from store
  const series = computed({
    get: () => store.getters[`${moduleName}/series`],
    set: val => store.commit(`${moduleName}/series`, val),
  })

  const serie = computed({
    get: () => store.getters[`${moduleName}/serie`],
    set: val => store.commit(`${moduleName}/serie`, val),
  })

  // Methods
  const setEventSerie = value => {
    serie.value = value
  }

  const setNetworkGroup = value => {
    networkGroup.value = value
  }

  return {
    moduleName,
    // State
    series,
    serie,
    networkGroup,
    // Methods
    setEventSerie,
    setNetworkGroup,
  }
}
```

### Real-World Examples

#### Example 1: Events List Page

```
src/views/events/
├── EventsRoot.vue           # Route entry, resets filters
├── list/
│   ├── EventsList.vue       # Index: orchestrates Filters + ListTable
│   ├── EventListFilter.vue  # Filters: subject + status filters
│   ├── EventListCard.vue    # Card view for grid mode
│   └── EventModalEnable.vue # Modal for enabling events
└── useEvents.js             # Domain composable
```

**EventsList.vue** (acts as Index):

- Imports `EventListFilter` and uses `ListTable`
- Handles modal state
- Composes the page layout

#### Example 2: Education System Books (Teacher Context)

```
src/views/pages/teacher-context/educationSystem/books/
├── Index.vue                 # Orchestrator
├── List.vue                  # Table with books
└── useEducationSystemBooks.js # Domain composable
```

**Index.vue**:

```vue
<template>
  <section>
    <!-- No separate Filters.vue, uses global SelectClass/SelectSubject -->
    <List />
  </section>
</template>
```

**List.vue**:

- Uses `ListTableLocalSorting` (small dataset)
- Implements custom sorting logic
- Watches `subject` and `classe` from `useFilters()`

#### Example 3: Complex Feature with Tabs

```
src/views/events/results-report/
├── class-details/
│   ├── Index.vue            # Tab orchestrator
│   ├── performance/
│   │   ├── Index.vue        # Performance tab content
│   │   ├── Filters.vue      # Performance filters
│   │   └── List.vue         # Performance table
│   └── participation/
│       ├── Index.vue        # Participation tab content
│       ├── Dashboard.vue    # Charts instead of List
│       └── List.vue         # Additional table
```

### Decision Tree: When to Use Each Component

```
Do you have nested routes?
├─ Yes → Create Root.vue
└─ No → Start with Index.vue

Does the page have filters?
├─ Yes → Create Filters.vue
└─ No → Use global SelectClass/SelectSubject in Index.vue

Does the page display tabular data?
├─ Yes → Create List.vue with ListTable/ListTableLocalSorting
└─ No → Create custom display component (Dashboard.vue, Cards.vue, etc.)

Is there complex state/business logic?
├─ Yes → Create useDomainName.js composable
└─ No → Use store directly in components

Need page title with metadata?
├─ Yes → Create Title.vue
└─ No → Use simple heading in Index.vue
```

### Best Practices

✅ **DO**:

- Follow the Index → Filters → List → composable pattern
- Use `useFilters()` in Filters.vue for global filters
- Use domain composable for feature-specific state
- Keep Index.vue as a thin orchestrator
- Use `ESelect` for all dropdowns
- Use `ListTable` variants for all tables
- Clean up (unregister modules, unsubscribe events) in `onUnmounted`
- Reset pagination when filters change
- Use computed properties for Vuex getters

❌ **DON'T**:

- Put business logic in Index.vue
- Mix filter logic with table logic
- Fetch data in Filters.vue
- Use v-select instead of ESelect
- Use b-table instead of ListTable
- Forget to unregister Vuex modules
- Hardcode data instead of using store
- Skip the composable for complex features

### Quick Start Checklist

When creating a new feature page:

- [ ] Create directory structure: `feature/Index.vue`, `Filters.vue`, `List.vue`
- [ ] Create Vuex page module in `store/pageModules/`
- [ ] Register module in `store/index.js`
- [ ] Create `useDomainName.js` composable
- [ ] Import `useFilters()` in Filters.vue if needed
- [ ] Use `ESelect` for all filter dropdowns
- [ ] Use `ListTable` or `ListTableLocalSorting` in List.vue
- [ ] Define `tableColumns` array
- [ ] Handle `@change` event for pagination/sort/search
- [ ] Watch filters and reset pagination
- [ ] Register/unregister module in Index.vue
- [ ] Add tests for composable and components

## API Documentation

Test API: https://apieducacrossmanager-test.azurewebsites.net/index.html

## Main Branch

The main development branch is **develop**. All pull requests should target this branch.

## Docker Support

Docker configurations are available in the `docker/` directory with `docker-compose.yml` in the root.

## Build Configuration

### Vue CLI Configuration (`vue.config.js`)

- Custom webpack configuration
- Path aliases for cleaner imports
- SCSS global imports for white-label theming
- Transpilation of specific dependencies
- Asset transformation for Bootstrap Vue components

### Path Aliases

- `@themeConfig` → `/themeConfig.js`
- `@core` → `/src/@core`
- `@validations` → `/src/@core/utils/validations/validations.js`
- `@axios` → `/src/libs/axios`
- `@components` → `/src/layouts/components`
- `@` → `/src` (default Vue CLI alias)

## Performance Considerations

- Code splitting via dynamic imports
- Lazy-loaded routes
- Asset optimization
- Tree shaking enabled
- Production source maps disabled

## Common Development Tasks

### Adding a New Feature with DDD Pattern

When adding a new feature that requires state management, follow the DDD pattern:

1. **Create the Vuex Page Module** (`src/store/pageModules/<domain>/`)

   ```javascript
   // Example: module-my-feature.js
   export default {
     namespaced: true,
     state: {
       data: [],
       loading: false,
     },
     mutations: {
       data(state, payload) {
         state.data = payload
       },
       loading(state, payload) {
         state.loading = payload
       },
     },
     getters: {
       data: state => state.data,
       loading: state => state.loading,
     },
   }
   ```

2. **Register the Module** in `src/store/index.js`

   ```javascript
   import myFeatureModule from './pageModules/domain/module-my-feature'

   // In modules object:
   MyFeature: myFeatureModule
   ```

3. **Create the Domain Composable** (`src/views/pages/<context>/<feature>/useMyFeature.js`)

   ```javascript
   import store from '@/store'
   import useFilters from '@/store/filters/useFilters'
   import { computed } from '@vue/composition-api'

   const moduleName = 'MyFeature'
   const { subject, classe } = useFilters() // Use filters if needed

   export default function useMyFeature() {
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
       try {
         const response = await getMyFeatureData({
           SubjectId: subject.value?.id,
           ClassId: classe.value?.ClassId,
         })
         data.value = response.data
       } finally {
         loading.value = false
       }
     }

     return {
       moduleName,
       data,
       loading,
       fetchData,
     }
   }
   ```

4. **Use in Component**

   ```vue
   <script>
     import useMyFeature from './useMyFeature'
     import useFilters from '@/store/filters/useFilters'
     import { watch } from '@vue/composition-api'

     export default {
       setup() {
         const { subject, classe } = useFilters()
         const { data, loading, fetchData } = useMyFeature()

         // Fetch when filters change
         watch([subject, classe], () => {
           if (subject.value?.id && classe.value?.ClassId) {
             fetchData()
           }
         })

         return { data, loading, subject, classe }
       },
     }
   </script>
   ```

5. **Add Tests** in `tests/unit/`
   - Test the composable logic
   - Mock Vuex store
   - Test component integration

### Adding a New Component

1. Create component in appropriate directory under `src/components/`
2. If globally used, register in `src/global-components.js`
3. Add tests in `tests/unit/` or on local component folder
4. **Use `useFilters()`** if component needs subject/class selection

### Adding a New Page/View

1. Create view component in `src/views/pages/<context>/`
2. If the page needs domain logic, create a `useDomainName.js` composable
3. **ALWAYS use `useFilters()`** if the page has subject/class filters
4. Create corresponding Vuex page module if needed
5. Add route definition in `src/router/`
6. Update navigation in `src/navigation/`
7. Configure ACL permissions

### Adding a New Route

1. Add route definition in appropriate router file under `src/router/`
2. Create view component in `src/views/`
3. Update navigation in `src/navigation/`
4. Configure ACL permissions if needed
5. Set proper meta tags (title, resource, action)

### Adding a New Vuex Module

1. Create module in `src/store/pageModules/<domain>/`
2. Follow the namespaced module pattern
3. Import and register in `src/store/index.js`
4. Create corresponding `useDomainName` composable
5. Add module types/actions/mutations/getters

### Adding a New Service

1. Create service file in `src/services/<context>/`
2. Import axios instance from `@axios`
3. Define API methods with proper JSDoc types
4. Use in domain composables (not directly in components)

## Troubleshooting

### Module Not Found Errors

Clear node_modules and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Additional Resources

- Vue.js documentation: https://v2.vuejs.org/
- Bootstrap Vue documentation: https://bootstrap-vue.org/
- Vuexy template documentation: Check project README

## Contributing

1. Create a feature branch from `develop|homolog|master`
2. Make your changes
3. Commit with descriptive messages using the pattern: `[feature|fix|rework|bugfix]: EC-XXXX: Short description`
4. Create pull request to `develop|homolog|master` branch

## Environment Variables Reference

Key environment variables (see `.env` for complete list):

- `VUE_APP_BASE_URL_API` - Main API endpoint
- `VUE_APP_BLOB_IMAGE` / `VUE_APP_BLOB` - Blob storage URLs
- `VUE_APP_WHITELABEL` - White-label configuration
- `VUE_APP_DEVTOOLS` - Enable Vue DevTools
- `VUE_APP_DEVELOP` - Development mode flag
- Authentication provider URLs for Microsoft, Google, LEX, Plurall, SAS, COC, Positivo, Layers
- `VUE_APP_MISSION_SUGGEST_URL` - Mission suggestion service
- `VUE_APP_WEBGL_PLAY_LINK` - WebGL player link

## License

Private - Educacross Platform
