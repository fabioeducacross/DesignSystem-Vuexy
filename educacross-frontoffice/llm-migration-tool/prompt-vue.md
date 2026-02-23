Developer: # Educacross Frontend – AI Coding Guidelines

## Critical Reminders
- Begin with a concise checklist (3-7 bullets) of what you will do; keep items conceptual, not implementation-level.
- After each file edit, validate in 1-2 lines what changed and whether it met the goal; proceed or minimally self-correct if not.
- Set reasoning_effort = minimal for straightforward migrations; expand only as needed for complex cases.

## Project Overview

The project is a Vue 2.7 Single Page Application for an education platform. It uses the Vuexy admin template, Bootstrap-Vue, and Vuex. Multiple whitelabel brands are supported (educacross, superensino, seduc, somosplay).

## Architecture

### Directory Layout

- **`src/@core/`**: Base Vuexy template (layouts, components, SCSS). Avoid modifying files here.
- **`src/views/pages/{{context}}/`**: Context-specific views (admin-context, teacher-context, student-context).
- **`src/services/{{context}}/`**: API service files grouped by context (teacher-context, admin-context, shared).
- **`src/store/`**: Vuex modules. Persistent modules use `vuex-persist` for localStorage storage.

### User Roles & Routing

- Roles defined in `src/consts/accessRoleEnum.js` include: Teacher, Student, Coordinator, Manager, NetworkManager, Secretariat, Auditor, and Responsible.
- Role-specific routes are in `src/router/` (e.g., `professor-routes.js`, `student-routes.js`, `admin-routes.js`).
- Route guards employ CASL abilities (see `src/libs/acl/`) to control feature and route access.

### Whitelabel Mechanism

- **Single config source**: All brand color configs in `src/consts/whitelabelColors.config.js`.
- **SCSS generation**: `scripts/generate-whitelabel-colors.js` scripts run at build via `npm run dev`.
- **CSS vars at runtime**: Handled by `src/utils/whitelabelColorLoader.js`.
- **Brand configuration**: See `src/whiteLabel/config.js` and `src/services/whitelabel/WhiteLabel.Service.js`.
- **Brand selection**: Set `VITE_APP_WHITELABEL` in `.env`.

## Development Commands

```bash
npm run dev          # Local dev server with whitelabel SCSS generation
dnpm run test:unit    # Unit tests with Jest (TZ=UTC)
npm run lint         # Lint checking via ESLint
npm run pretty       # Code formatting via Prettier
```

## Code Patterns

### ⚠️ CRITICAL: Import Preservation

**NEVER alter import statements**—they must be copied exactly from the source file.

- ✔️ If original: `import { formatDate } from '@/utils/date'` → Keep exactly.
- ✔️ If original: `import formatDate from '@/utils/date'` → Keep exactly.
- ❌ Do not switch between named and default imports, nor change/add/remove curly braces.
- ❌ Do not ‘fix’ imports based on expected exports.
- Copy/paste import blocks character-for-character from the original file—no analysis or modification allowed.

**Applies to all imports:**
- Vue: `import { ref, computed } from 'vue'`
- Utilities: `import { formatDate } from '@/utils/date'` / `import formatDate from '@/utils/date'`
- Components: `import MyComponent from '@/components/MyComponent.vue'`
- Store/router: `import store from '@/store'` / `import { useRoute } from 'vue-router/composables'`

### Component Structure (Required: `<script setup>` Syntax)

```vue
<template>
  <div>{{ message }}</div>
  <div>{{ doubleCount }}</div>
  <button @click="handleClick">Click me</button>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
// ⚠️ Do NOT import defineProps, defineEmits, or defineExpose—use as macros

const props = defineProps({
  title: String,
  count: { type: Number, default: 0 },
})
const emit = defineEmits(['update', 'close'])

const message = ref('Hello')
const doubleCount = computed(() => props.count * 2)

const handleClick = () => {
  emit('update', message.value)
}

onMounted(() => {
  if (message.value) {
    // Initialization logic
  }
})
</script>
```

### Script Setup Migration (Vue 2.7)

1. **Replace old script tag:** Convert `<script>` to `<script setup>` and remove `export default`.
2. **Imports:**
      - Import only what you use, e.g., `import { ref, computed, onMounted, watch, ... } from 'vue'`.
      - **Do NOT import**: compiler macros (`defineProps`, `defineEmits`, `defineExpose`).
      - **PRESERVE import syntax EXACTLY** from the original file—no analysis or editing.
3. **Props & Emits:** Replace object syntax with `defineProps`/`defineEmits` calls in script.
4. **State:** Convert data to `ref`/`reactive`. In `<template>`, access without `.value`; in script, use `.value`.
5. **Methods:** Convert to function declarations.
6. **Lifecycle hooks:** Use `onMounted`, `onUnmounted`, etc., as needed.
7. **Event Bus:** Use `mitt`; import as handled in `@/eventBus` and clean up listeners on unmount.
8. **Vuex/Router:**
      - Use composables for router: `import { useRoute, useRouter } from 'vue-router/composables'`.
      - Use direct store import: `import store from '@/store'`.
      - **Migrate:** `import router from '@/router'` → composables.
9. **Component registration:** Direct import registers automatically.
10. **No `this`:** Reference all variables directly.

### Toast Usage

- **Do NOT use:** `import { useToast } from 'vue-toastification/composition'`.
- **Use instead:** Access via global proxy.
  ```javascript
  import { getCurrentInstance } from 'vue'
  
  const toast = getCurrentInstance().proxy.$toast
  ```

### Compiler Macros – DO NOT IMPORT

- Use `defineProps`, `defineEmits`, `defineExpose`, and `withDefaults` directly in script—never import them.

### Template Access to Reactivity

- **Never** use `.value` in `<template>`. Vue 2.7 automatically unwraps refs and computed props.

```vue
<div>{{ count }}</div>           <!-- CORRECT -->
<div>{{ count.value }}</div>     <!-- WRONG -->
```

### Vue 2.7 Limitations

- Uses getter/setter reactivity (not Proxy-based as in Vue 3).
- Property addition/deletion is not tracked (use `Vue.set()`/`set()`).
- No `createApp()`; use `new Vue()`.
- No top-level `await` in `<script setup>`.
- No Vue 3 reactivity transform (`$ref`, `$computed`, etc.).

## API Services

- Services in `src/services/` use `src/libs/axios.js`. Refresh tokens handled by interceptors.
- Error toasts can be suppressed via `{ headers: { showErrorToast: false } }`.

## Store Pattern

- Each Vuex module defines `state`, `mutations`, `actions`, `getters` as usual, with persist as needed.

## Permissions (CASL)

- Use `canNavigate` from `@/libs/acl/routeProtection` for route/feature access. Set abilities in route meta.

## Path Aliases

- `'@'` → `src/`  
- `'@core'` → `src/@core/`
- `'@components'` → `src/layouts/components/`
- `'@axios'` → `src/libs/axios`
- `'@themeConfig'` → `themeConfig.js`

## Testing & Conventions

- Unit test setup in `tests/unit/setup.js` (mocks i18n, localStorage, window APIs).
- Env var for test: `process.env.VUE_APP_WHITELABEL = 'educacross'`
- Use `shallowMount` for isolated component tests.
- Commits: `type(scope): description` (e.g., feat, fix, docs, refactor).
- Branches: `feature/EC-XXXX-description`, `bugfix/EC-XXXX-description`.
- Default branch: `nave-develop`
- CSS: Use BEM with scoped styles.
- For i18n, use `$t('key')` via `src/libs/i18n/`.

## Authentication

1. Login at account portal returns tokens as URL params.
2. `loginUser()` in `src/auth/utils.js` decodes JWT and fetches permissions.
3. Abilities are persisted in Vuex with CASL updates.
4. Refresh tokens on 401 responses using Axios interceptors.

## Env Vars

- Use `VITE_APP_`-prefixed vars in `.env`:
    - `VITE_APP_BASE_URL_API`: API endpoint
    - `VITE_APP_WHITELABEL`: Brand name (educacross, superensino, seduc, somosplay)
    - `VITE_APP_BLOB`: Asset storage blob URL

## File Locations

- Global components: `src/global-components.js`
- Mitt event bus: `src/eventBus.js`
- Filters: `src/filters/filters.js`
- Validations: `src/@core/utils/validations/validations.js`

## Forms & Validation (Vee-Validate v3.4.5)

- Import `ValidationObserver`/`ValidationProvider` from `vee-validate` for form validation.
- Import rules from `@core/utils/validations/validations.js` as needed.
- See example below:

```vue
<template>
  <ValidationObserver ref="formRef">
    <b-form @submit.prevent="onSubmit">
      <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
        <b-form-group label="Email">
          <b-form-input v-model="formData.email" :state="errors.length > 0 ? false : null" />
          <small v-if="errors.length" class="text-danger">
            {{ errors[0] }}
          </small>
        </b-form-group>
      </ValidationProvider>
      <!-- ...other fields... -->
    </b-form>
  </ValidationObserver>
</template>
```

### Validation Rules Available

- Standard: `required`, `email`, `min`, `max`, `confirmed`, `password`, `alpha`, `alpha-dash`, `alpha-num`, `digits`, `integer`, `between`, `length`, `positive`, `credit-card`, `url`.
- Custom: `registredEmail`, `requiredDateRange` (see `validations.js`).

## Migration Assignment

- **Migrate the following file:**
    - **Path:** {file_path}
    - **Type:** {file_type}

```{file_extension}
{file_content}
```

**Instructions:**
- Migrate this Vue component following all specified patterns.
- Return ONLY the migrated code. Do not include explanations, notes, or comments.
