Developer: ## Architecture

### Core Structure
- **`src/@core/`**: Base Vuexy template (layouts, components, scss). *Avoid modifications.*
- **`src/views/pages/{{context}}/`**: Role-based views (`admin-context`, `teacher-context`, `student-context`).
- **`src/services/{{context}}/`**: API services by domain (`teacher-context`, `admin-context`, `shared`).
- **`src/store/`**: Vuex modules—key modules persist to localStorage using vuex-persist.

### User Roles & Routes
Roles are defined in `src/consts/accessRoleEnum.js`: Teacher, Student, Coordinator, Manager, NetworkManager, Secretariat, Auditor, Responsible.
- Role-specific routes located in `src/router/` (e.g., `professor-routes.js`, `student-routes.js`, `admin-routes.js`).
- Route guards leverage CASL (`src/libs/acl/`) for permissions.

### Whitelabel System
- **Single source of truth:** `src/consts/whitelabelColors.config.js`
- Generate SCSS at build-time with `scripts/generate-whitelabel-colors.js` (`npm run dev`).
- Runtime CSS vars via `src/utils/whitelabelColorLoader.js` (sets `--whitelabel-*`).
- Brand configuration: `src/whiteLabel/config.js`, `src/services/whitelabel/WhiteLabel.Service.js`
- Set active brand using `VITE_APP_WHITELABEL` in `.env`

## Code Patterns

### ⚠️ CRITICAL: Import Preservation Rule
Never change import statements. Always copy them *exactly* as in the original:
- ✅ If original: `import { formatDate } from '@/utils/date'` → Keep.
- ✅ If original: `import formatDate from '@/utils/date'` → Keep.
- ❌ Never switch between named/default imports or add/remove curly braces.
- ❌ Do not alter or "fix" import syntax—just copy character-for-character.

**This applies to all imports:**
- Vue: `import { ref, computed } from 'vue'`
- Utilities: `import { formatDate } from '@/utils/date'` or `import formatDate from '@/utils/date'`
- Components: `import MyComponent from '@/components/MyComponent.vue'`
- Store/router: `import store from '@/store'` or `import { useRoute } from 'vue-router/composables'`

### When to Migrate JavaScript Files
**Migrate to composables (Composition API):**
- Mixins (`src/mixins/*.js`): convert to composables (`useFeatureName.js`).
- Utilities with Vue instance dependencies (`this.$store`, `this.$router`): convert to composables.

**Do NOT migrate (keep as-is):**
- Vuex store modules (`src/store/**/index.js`)
- API services (`src/services/**/*.js`)
- Pure utilities (formatters, helpers, constants)
- Route config (`src/router/*.js`)
- Plain JS modules

### Refactoring to Composition API (Vue 2.7)

1. **Naming Convention**
   - ✅ Use: `export function useFeature() { ... }`
   - ❌ Avoid: `export default { ... }` (deprecated)

2. **Imports**
   - ⚠️ *Do not* modify imports. Copy all from source exactly. Maintain named/default import style. No curly brace changes.
   - For Vue APIs: `import { ref, computed, onMounted, watch, onUnmounted } from 'vue'`
   - For utilities/filters: *Preserve the original import pattern.*
   ```javascript
   // Do NOT switch:
   import { formatDate } from '@/utils/date' // keep!
   import formatDate from '@/utils/date'      // do not rewrite!
   ```

3. **Return Statement**: Return reactive values and methods from composables.
   ```javascript
   export function useFeature() {
     const data = ref(null)
     const fetchData = () => { /* ... */ }
     return { data, fetchData }
   }
   ```

4. **Reactivity**
   - Convert properties to `ref()` or `reactive()`
   - ⚠️ Use `ref([])` for arrays
   - Access `.value` in JS (not templates)

5. **Logic Migration**
   - `data()` → `ref()`/`reactive()`
   - `methods` → functions
   - `computed` → `computed()`
   - `watch` → `watch()`/`watchEffect()`
   - No `this` context; use direct refs

6. **Lifecycle Mapping**
   - `created` → setup code in function body
   - `mounted` → `onMounted`
   - `destroyed`/`beforeDestroy` → `onUnmounted`
   - `updated` → `onUpdated`

7. **Event Bus**
   - Replace legacy event bus with `mitt` (`import { emitter } from '@/eventBus'`)
   - Use `emitter.emit()` / `emitter.on()`; clean up with `onUnmounted()`

8. **Store & Router**
   - Store: `import store from '@/store'`; use `store.dispatch(...)`/`store.getters[...]`
   - Router: Use router composables for reactivity:
     - ✅ `import { useRoute, useRouter } from 'vue-router/composables'`
     - ✅ `const route = useRoute()`/`const router = useRouter()`
     - ⚠️ Migrate all direct router imports (`import router from '@/router'`) to use composables.
     ```javascript
     // ❌ Do not use:
     import router from '@/router'
     router.currentRoute
     // ✅ Use:
     import { useRoute, useRouter } from 'vue-router/composables'
     const route = useRoute(), router = useRouter()
     route.name // reactive!
     ```
   - ❌ Do not use `useStore()` (Vue 3 only)
   - ❌ Do not use `this.$store` or `this.$router`

### Vue 2.7 Limitations
- Reactivity uses Vue 2 getter/setter, not Proxy (Vue 3)
- `reactive(obj) === obj` (same ref)
- Use `set()` from 'vue' for property add/remove
- `readonly()` does not track new properties
- Not supported: `createApp()`, top-level `await`, reactivity macros (`$ref`, `$computed`)
- Available: `defineComponent()`, `h()`, `set()`, `del()`, `nextTick()`

### API Services Pattern
Services in `src/services/` use axios from `src/libs/axios.js`:
- Automatic token refresh (interceptors)
- Use `{ headers: { showErrorToast: false } }` to silence errors

### Store Module Pattern
```javascript
// src/store/{{module}}/index.js
export default {
  state: () => ({ /* ... */ }),
  mutations: { SET_DATA(state, data) { state.data = data } },
  actions: { async fetchData({ commit }) { /* ... */ } },
  getters: { getData: state => state.data },
}
```

### Permissions/Abilities
Use CASL for permissions:
```javascript
import { canNavigate } from '@/libs/acl/routeProtection'
// route: { resource: 'Missions', action: 'read' }
```

## Path Aliases
```javascript
'@'               → 'src/'
'@core'           → 'src/@core/'
'@components'     → 'src/layouts/components/'
'@axios'          → 'src/libs/axios'
'@themeConfig'    → 'themeConfig.js'
```

## Testing
- Setup: `tests/unit/setup.js` (mocks: i18n, localStorage, window)
- Mock env: `process.env.VUE_APP_WHITELABEL = 'educacross'`
- Use `shallowMount` for unit tests

## Conventions
- **i18n:** Use `$t('key')` for translations (`src/libs/i18n/`)

## Authentication Flow
1. External login via account portal, tokens returned via URL params
2. `loginUser()` (`src/auth/utils.js`) decodes JWT and fetches permissions
3. Abilities stored in Vuex and CASL
4. Token refresh via axios interceptor on 401

## Environment Variables (in `.env`, `VITE_APP_` prefixed)
- `VITE_APP_BASE_URL_API`: API endpoint
- `VITE_APP_WHITELABEL`: Brand (`educacross|superensino|seduc|somosplay`)
- `VITE_APP_BLOB`: Blob URL for assets

## File Locations
- Global components: `src/global-components.js`
- Event bus: `src/eventBus.js` (mitt-based)
- Filters: `src/filters/filters.js`
- Validations: `src/@core/utils/validations/validations.js`

---

# Plan First
Begin with a concise checklist (3-7 bullets) of what you will do; keep items conceptual, not implementation-level.

---

## File to Migrate
- **File Path:** {file_path}
- **File Type:** {file_type}

```{file_extension}
{file_content}
```

## Instructions
1. **Analyze the file type:**
   - If it is a **mixin** or **utility with Vue dependencies**, migrate to a Composition API composable.
   - If it is a **Vuex store module, API service, route config, or pure utility**, return *unchanged* with comment: `// No migration needed - keep as-is`
2. **For files to migrate:**
   - Migrate to Composition API. Output the full, migrated code only inside a code block, using the correct extension `{file_extension}`. Only include migrated code and migrated code comments (no extra explanation).
   - Example:
     ```js
     import { ref, onMounted } from 'vue'
     // ...migrated code...
     ```
3. **For files not to migrate:**
   - Return the file unchanged, in a code block with `{file_extension}` and comment:
     ```js
     // No migration needed - keep as-is
     // ...original file content...
     ```
4. **If file content is missing/empty:**
   - Return:
     ```
     // ERROR: No file content provided. Cannot analyze or migrate.
     ```

After migration or returning the file, validate in 1-2 lines what was done and confirm if the action met the goal; proceed or minimally self-correct if not.