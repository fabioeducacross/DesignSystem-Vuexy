# Gerenciamento de Estado e Fluxo de Dados

Este documento explica como o projeto **Educacross Frontend** gerencia o estado da aplicação usando Vuex, incluindo a
arquitetura do store, fluxo de dados e padrões utilizados.

## 🏗️ Arquitetura do Vuex Store

### Estrutura Principal

```
src/store/
├── 📄 index.js                 # Store principal e configuração
├── 📁 modules/                 # Módulos principais do Vuex
│   ├── 📄 auth.js             # Autenticação e autorização
│   ├── 📄 user.js             # Dados do usuário logado
│   ├── 📄 classes.js          # Gestão de turmas
│   ├── 📄 missions.js         # Missões e atividades
│   ├── 📄 students.js         # Estudantes e dados acadêmicos
│   └── 📄 reports.js          # Relatórios e analytics
├── 📁 pageModules/            # Módulos específicos de páginas
│   ├── 📁 missions/
│   ├── 📁 analytics/
│   └── 📁 reports/
└── 📁 filters/                # Filtros e utilitários
    └── 📄 useFilters.js
```

### Configuração Principal (`index.js`)

```javascript
// Módulos principais
import auth from './modules/auth'
import classes from './modules/classes'
import missions from './modules/missions'
import user from './modules/user'
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

// Persistência no localStorage
const vuexLocal = new VuexPersist({
  storage: window.localStorage,
  modules: ['auth', 'user', 'whitelabel'],
})

export default new Vuex.Store({
  modules: {
    auth,
    user,
    classes,
    missions,
    // Módulos dinâmicos registrados em runtime
  },
  plugins: [vuexLocal.plugin],
  strict: process.env.NODE_ENV !== 'production',
})
```

## 📦 Módulos Principais

### 🔐 Auth Module (`auth.js`)

Gerencia autenticação, autorização e sessão do usuário.

```javascript
import { login, logout, refreshToken } from '@/services/auth'

const state = {
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  tokenExpiry: null,
  loginUrl: null,
  abilities: [],
  institutionAbilities: [],
}

const mutations = {
  SET_AUTHENTICATED(state, status) {
    state.isAuthenticated = status
  },
  SET_TOKEN(state, { token, refreshToken, expiresIn }) {
    state.token = token
    state.refreshToken = refreshToken
    state.tokenExpiry = Date.now() + expiresIn * 1000
  },
  SET_ABILITIES(state, abilities) {
    state.abilities = abilities
  },
  CLEAR_AUTH(state) {
    state.isAuthenticated = false
    state.token = null
    state.refreshToken = null
    state.tokenExpiry = null
  },
}

const actions = {
  async login({ commit }, credentials) {
    try {
      const response = await login(credentials)
      commit('SET_TOKEN', response.data)
      commit('SET_AUTHENTICATED', true)
      return response
    } catch (error) {
      commit('CLEAR_AUTH')
      throw error
    }
  },

  async logout({ commit }) {
    await logout()
    commit('CLEAR_AUTH')
  },

  async refreshToken({ commit, state }) {
    try {
      const response = await refreshToken(state.refreshToken)
      commit('SET_TOKEN', response.data)
      return response
    } catch (error) {
      commit('CLEAR_AUTH')
      throw error
    }
  },
}

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  token: state => state.token,
  hasAbility: state => ability => state.abilities.includes(ability),
  tokenExpired: state => {
    if (!state.tokenExpiry) return true
    return Date.now() > state.tokenExpiry
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
```

### 👤 User Module (`user.js`)

Gerencia dados do usuário logado e seu perfil.

```javascript
import { getUserProfile, updateProfile } from '@/services/user'

const state = {
  profile: null,
  preferences: {},
  institutions: [],
  currentInstitution: null,
  role: null,
  permissions: [],
}

const mutations = {
  SET_PROFILE(state, profile) {
    state.profile = profile
    state.role = profile.role
    state.permissions = profile.permissions || []
  },
  SET_INSTITUTIONS(state, institutions) {
    state.institutions = institutions
  },
  SET_CURRENT_INSTITUTION(state, institution) {
    state.currentInstitution = institution
  },
  UPDATE_PREFERENCES(state, preferences) {
    state.preferences = { ...state.preferences, ...preferences }
  },
}

const actions = {
  async fetchProfile({ commit }) {
    const response = await getUserProfile()
    commit('SET_PROFILE', response.data)
    return response.data
  },

  async updateProfile({ commit }, profileData) {
    const response = await updateProfile(profileData)
    commit('SET_PROFILE', response.data)
    return response.data
  },

  switchInstitution({ commit }, institution) {
    commit('SET_CURRENT_INSTITUTION', institution)
  },
}

const getters = {
  fullName: state => {
    if (!state.profile) return ''
    return `${state.profile.firstName} ${state.profile.lastName}`
  },
  isTeacher: state => state.role === 'teacher',
  isAdmin: state => state.role === 'admin',
  isStudent: state => state.role === 'student',
  hasPermission: state => permission => {
    return state.permissions.includes(permission)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
```

### 🎯 Missions Module (`missions.js`)

Gerencia missões, atividades e progresso educacional.

```javascript
import {
  getMissions,
  createMission,
  updateMission,
  deleteMission,
  getMissionTypes,
} from '@/services/missions'

const state = {
  missions: [],
  currentMission: null,
  missionTypes: [],
  loading: false,
  filters: {
    subject: null,
    grade: null,
    status: null,
    search: '',
  },
  pagination: {
    page: 1,
    totalPages: 1,
    perPage: 20,
    total: 0,
  },
}

const mutations = {
  SET_MISSIONS(state, missions) {
    state.missions = missions
  },
  ADD_MISSION(state, mission) {
    state.missions.unshift(mission)
  },
  UPDATE_MISSION(state, updatedMission) {
    const index = state.missions.findIndex(m => m.id === updatedMission.id)
    if (index !== -1) {
      Vue.set(state.missions, index, updatedMission)
    }
  },
  REMOVE_MISSION(state, missionId) {
    state.missions = state.missions.filter(m => m.id !== missionId)
  },
  SET_CURRENT_MISSION(state, mission) {
    state.currentMission = mission
  },
  SET_MISSION_TYPES(state, types) {
    state.missionTypes = types
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_FILTERS(state, filters) {
    state.filters = { ...state.filters, ...filters }
  },
  SET_PAGINATION(state, pagination) {
    state.pagination = { ...state.pagination, ...pagination }
  },
}

const actions = {
  async fetchMissions({ commit, state }) {
    commit('SET_LOADING', true)
    try {
      const params = {
        page: state.pagination.page,
        perPage: state.pagination.perPage,
        ...state.filters,
      }
      const response = await getMissions(params)
      commit('SET_MISSIONS', response.data.missions)
      commit('SET_PAGINATION', {
        page: response.data.page,
        totalPages: response.data.totalPages,
        total: response.data.total,
      })
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createMission({ commit }, missionData) {
    const response = await createMission(missionData)
    commit('ADD_MISSION', response.data)
    return response.data
  },

  async updateMission({ commit }, { id, data }) {
    const response = await updateMission(id, data)
    commit('UPDATE_MISSION', response.data)
    return response.data
  },

  async deleteMission({ commit }, missionId) {
    await deleteMission(missionId)
    commit('REMOVE_MISSION', missionId)
  },

  setFilters({ commit, dispatch }, filters) {
    commit('SET_FILTERS', filters)
    commit('SET_PAGINATION', { page: 1 }) // Reset para primeira página
    dispatch('fetchMissions')
  },

  changePage({ commit, dispatch }, page) {
    commit('SET_PAGINATION', { page })
    dispatch('fetchMissions')
  },
}

const getters = {
  activeMissions: state => state.missions.filter(m => m.status === 'active'),
  missionsBySubject: state => subject => {
    return state.missions.filter(m => m.subject === subject)
  },
  totalActiveMissions: (state, getters) => getters.activeMissions.length,
  hasNextPage: state => state.pagination.page < state.pagination.totalPages,
  hasPrevPage: state => state.pagination.page > 1,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
```

## 🔄 Módulos Dinâmicos (Page Modules)

### Conceito

Módulos registrados dinamicamente para páginas específicas, evitando carregar estado desnecessário.

### Exemplo: `EducacrossMissionsModule`

```javascript
// src/store/pageModules/missions/educacross-missions-module.js
const EducacrossMissionsModule = {
  namespaced: true,
  state: {
    missions: [],
    series: [],
    selectedSerie: null,
    searchTerm: '',
    loading: false,
    loadingFilter: false,
    page: 1,
    totalPages: 1,
  },

  mutations: {
    SET_MISSIONS(state, missions) {
      state.missions = missions
    },
    SET_SERIES(state, series) {
      state.series = series
    },
    SET_SELECTED_SERIE(state, serie) {
      state.selectedSerie = serie
    },
    SET_SEARCH_TERM(state, term) {
      state.searchTerm = term
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_PAGE(state, page) {
      state.page = page
    },
  },

  actions: {
    async fetchData({ commit, state }) {
      commit('SET_LOADING', true)
      try {
        const params = {
          serie: state.selectedSerie,
          search: state.searchTerm,
          page: state.page,
        }
        const response = await getEducacrossMissions(params)
        commit('SET_MISSIONS', response.data.missions)
        commit('SET_TOTAL_PAGES', response.data.totalPages)
      } finally {
        commit('SET_LOADING', false)
      }
    },
  },

  getters: {
    filteredMissions: state => {
      return state.missions.filter(mission => {
        return mission.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      })
    },
  },
}

export default EducacrossMissionsModule
```

### Registro Dinâmico

```javascript
// Em um componente Vue
import store from '@/store'
import EducacrossMissionsModule from '@/store/pageModules/missions/educacross-missions-module'

export default {
  setup() {
    // Registrar módulo ao montar componente
    store.registerModule('EducacrossMissionsModule', EducacrossMissionsModule)

    // Limpar ao desmontar
    onUnmounted(() => {
      store.unregisterModule('EducacrossMissionsModule')
    })
  },
}
```

## 🌊 Fluxo de Dados

### Padrão de Fluxo Unidirecional

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Component  │───▶│   Action    │───▶│  Service    │
└─────────────┘    └─────────────┘    └─────────────┘
       ▲                  │                   │
       │                  ▼                   │
┌─────────────┐    ┌─────────────┐            │
│   Getter    │◀───│  Mutation   │◀───────────┘
└─────────────┘    └─────────────┘
       ▲                  │
       │                  ▼
       └────────────┌─────────────┐
                    │    State    │
                    └─────────────┘
```

## 🎛️ Composables para Estado

### useFilters Composable

```javascript
// src/store/filters/useFilters.js
import store from '@/store'
import { computed } from '@vue/composition-api'

export default function useFilters() {
  const subject = computed({
    get: () => store.state.filters.subject,
    set: value => store.commit('filters/SET_SUBJECT', value),
  })

  const grade = computed({
    get: () => store.state.filters.grade,
    set: value => store.commit('filters/SET_GRADE', value),
  })

  const resetFilters = () => {
    store.commit('filters/RESET_FILTERS')
  }

  const applyFilters = () => {
    store.dispatch('missions/fetchMissions')
  }

  return {
    subject,
    grade,
    resetFilters,
    applyFilters,
  }
}
```

### Uso em Componentes

```javascript
// Em um componente
import useFilters from '@/store/filters/useFilters'

export default {
  setup() {
    const { subject, grade, resetFilters, applyFilters } = useFilters()

    return {
      subject,
      grade,
      resetFilters,
      applyFilters,
    }
  },
}
```

## 🔄 Gerenciamento de Loading States

### Pattern para Loading

```javascript
const state = {
  loading: {
    missions: false,
    students: false,
    reports: false,
  },
}

const mutations = {
  SET_LOADING(state, { key, value }) {
    state.loading[key] = value
  },
}

const actions = {
  async fetchMissions({ commit }) {
    commit('SET_LOADING', { key: 'missions', value: true })
    try {
      // API call
    } finally {
      commit('SET_LOADING', { key: 'missions', value: false })
    }
  },
}
```

## 📊 Cache e Performance

### Lazy Loading de Módulos

```javascript
// Carregar módulo apenas quando necessário
const lazyLoadModule = async moduleName => {
  if (!store.hasModule(moduleName)) {
    const module = await import(`@/store/modules/${moduleName}`)
    store.registerModule(moduleName, module.default)
  }
}
```

## 🔐 Persistência e Hidratação

### Configuração VuexPersist

```javascript
import VuexPersist from 'vuex-persist'

const vuexLocal = new VuexPersist({
  storage: window.localStorage,
  modules: ['auth', 'user', 'whitelabel'], // Apenas módulos específicos
  filter: mutation => {
    // Filtrar mutations que devem ser persistidas
    const persistMutations = ['auth/SET_TOKEN', 'user/SET_PROFILE', 'whitelabel/SET_CONFIG']
    return persistMutations.includes(mutation.type)
  },
})
```

### Session Storage para Dados Temporários

```javascript
const vuexSession = new VuexPersist({
  storage: window.sessionStorage,
  modules: ['filters', 'pagination'],
})
```

## 📋 Boas Práticas

### 1. Nomenclatura Consistente

```javascript
// ✅ Bom
const mutations = {
  SET_MISSIONS: 'SET_MISSIONS',
  ADD_MISSION: 'ADD_MISSION',
  UPDATE_MISSION: 'UPDATE_MISSION',
  REMOVE_MISSION: 'REMOVE_MISSION'
}

// ❌ Ruim
const mutations = {
  setMissions: 'setMissions',
  addMission: 'addMission'
}
```

### 3. Getters para Computações

```javascript
// ✅ Bom - usar getters para lógica complexa
const getters = {
  completedMissions: state => {
    return state.missions.filter(m => m.status === 'completed')
  }
}

// ❌ Ruim - lógica no componente
computed: {
  completedMissions()
  {
    return this.$store.state.missions.missions.filter(m => m.status === 'completed')
  }
}
```

---

🔗 **Próximos Passos**: Consulte [Rotas](Rotas.md) para entender como o roteamento funciona em conjunto com o
gerenciamento de estado.

## 🎯 Criando Novos Page Modules

### Por que usar Page Modules?

O projeto Educacross utiliza o padrão de **Page Modules** (módulos de página) para organizar o estado de forma modular,
com as seguintes vantagens:

1. **Evita Erros de Reatividade**: Isola o estado específico de cada página, prevenindo que dados de uma tela afetem
   outra.
2. **Melhora a Performance**: O estado de uma página é carregado na memória apenas quando ela está em uso.
3. **Facilita a Manutenção**: O código fica mais limpo e organizado, com cada funcionalidade tendo seu próprio módulo.
4. **Prepara para o Futuro**: A estrutura é alinhada com as práticas do Vue 3 e Pinia, facilitando futuras migrações.

### Estrutura Simplificada de um Page Module

Para fins didáticos, vamos usar um exemplo de uma página de "Produtos". A estrutura de arquivos seria:

```
📁 /src/views/pages/products/
├── 📄 index.vue       # Componente principal que orquestra a página
├── 📄 useProducts.js  # Composable que gerencia o estado da página
├── 📄 Title.vue       # Componente de título
├── 📄 Filters.vue     # Componente para os filtros
└── 📄 ProductList.vue # Componente para listar os produtos

📁 /src/store/pageModules/products/
└── 📄 module-products.js # Módulo Vuex com o estado e lógica da página
```

### 1. Criando o Módulo Vuex (`module-products.js`)

O módulo Vuex é o coração do estado da página. Ele contém o estado inicial, as mutações para alterá-lo e as ações para
buscar dados.

```javascript
// src/store/pageModules/products/module-products.js
import { productService } from '@/services/product.service'

// Função que retorna o estado inicial, garantindo um estado limpo sempre
const initialState = () => ({
  loading: false,
  products: [],
  filters: {
    search: '',
  },
  pagination: {
    page: 1,
    total: 0,
  },
})

export default {
  namespaced: true,
  state: initialState(),

  mutations: {
    SET_LOADING(state, isLoading) {
      state.loading = isLoading
    },
    SET_PRODUCTS(state, { products, total }) {
      state.products = products
      state.pagination.total = total
    },
    SET_SEARCH(state, search) {
      state.filters.search = search
    },
    SET_PAGE(state, page) {
      state.pagination.page = page
    },
    // Essencial: reseta o estado para o inicial ao sair da página
    RESET_STATE(state) {
      Object.assign(state, initialState())
    },
  },

  getters: {
    loading: state => state.loading,
    products: state => state.products,
    filters: state => state.filters,
    pagination: state => state.pagination,
  },

  actions: {
    async fetchProducts({ commit, state }) {
      commit('SET_LOADING', true)
      try {
        const { data } = await productService.getProducts({
          ...state.filters,
          page: state.pagination.page,
        })
        commit('SET_PRODUCTS', { products: data.items, total: data.total })
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
        commit('SET_PRODUCTS', { products: [], total: 0 }) // Limpa em caso de erro
      } finally {
        commit('SET_LOADING', false)
      }
    },
  },
}
```

### 2. Criando o Composable (`useProducts.js`)

O composable (ou "hook") é a ponte entre os componentes e o módulo Vuex. Ele expõe o estado e as ações de forma simples
e reativa.

```javascript
// src/views/pages/products/useProducts.js
import store from '@/store'
import { computed } from '@vue/composition-api'

export const useProducts = () => {
  // Nome único para o módulo, usado para registro e remoção
  const MODULE_NAME = 'productsPage'

  // Mapeamento do estado e getters para `computed` properties
  const loading = computed({
    get: () => store.getters[`${MODULE_NAME}/loading`],
    set: value => store.commit(`${MODULE_NAME}/SET_LOADING`, value)
  })

  const products = computed({
    get: () => store.getters[`${MODULE_NAME}/products`],
    set: ({ products, total }) => store.commit(`${MODULE_NAME}/SET_PRODUCTS`, { products, total })
  })

  const pagination = computed({
    get: () => store.getters[`${MODULE_NAME}/pagination`],
    set: value => {
      store.commit(`${MODULE_NAME}/SET_PAGE`, value.page)
    }
  })

  // Mapeamento dos filtros com `get` e `set` para v-model
  const search = computed({
    get: () => store.getters[`${MODULE_NAME}/filters`].search,
    set: value => store.commit(`${MODULE_NAME}/SET_SEARCH`, value),
  })

  // Mapeamento das actions
  const fetchProducts = () => store.dispatch(`${MODULE_NAME}/fetchProducts`)

  // Função utilitária para resetar a busca
  const resetAndFetch = () => {
    store.commit(`${MODULE_NAME}/SET_PAGE`, 1)
    fetchProducts()
  }

  // Interface pública do composable
  return {
    MODULE_NAME,
    loading,
    products,
    pagination,
    search,
    fetchProducts,
    resetAndFetch,
  }
}
```

### 3. Implementando no Componente Principal (`index.vue`)

O componente principal é responsável por registrar, inicializar e limpar o módulo Vuex.

```vue
<!-- src/views/pages/products/index.vue -->
<template>
  <div>
    <Title />
    <Filters />
    <ProductList />
  </div>
</template>

<script>
  import Filters from './Filters.vue'
  import ProductList from './ProductList.vue'
  import Title from './Title.vue'
  import { useProducts } from './useProducts.js'
  import store from '@/store'
  import ProductModule from '@/store/pageModules/products/module-products.js'
  import { onMounted, onUnmounted } from '@vue/composition-api'

  export default {
    name: 'ProductsPage',
    components: { Title, Filters, ProductList },

    setup() {
      const { MODULE_NAME, fetchProducts } = useProducts()

      // 1. Registra o módulo dinamicamente quando o componente é criado
      // A verificação `hasModule` evita erros durante a navegação rápida (HMR)
      if (!store.hasModule(MODULE_NAME)) {
        store.registerModule(MODULE_NAME, ProductModule)
      }

      // 2. Busca os dados iniciais quando o componente é montado
      onMounted(() => {
        fetchProducts()
      })

      // 3. Limpa o estado e desregistra o módulo ao sair da página
      // Este passo é CRUCIAL para evitar vazamento de estado
      onUnmounted(() => {
        store.commit(`${MODULE_NAME}/RESET_STATE`)
        store.unregisterModule(MODULE_NAME)
      })
    },
  }
</script>
```

### 4. Usando o Composable nos Subcomponentes

Os subcomponentes (`Filters.vue`, `ProductList.vue`) podem usar o mesmo composable para acessar e modificar o estado de
forma centralizada.

```vue
<!-- src/views/pages/products/Filters.vue -->
<template>
  <b-form-input v-model="search" placeholder="Buscar produto..." @input="resetAndFetch" />
</template>

<script>
  import { useProducts } from './useProducts.js'

  export default {
    setup() {
      // O estado já está disponível, basta usar o composable
      const { search, resetAndFetch } = useProducts()

      return { search, resetAndFetch }
    },
  }
</script>
```

### Conclusão do Exemplo

Este padrão garante que:

- O estado da página de produtos só existe quando o usuário está nela.
- Ao sair da página, o estado é completamente limpo, evitando que filtros ou dados vazem para outras partes do sistema.
- O código fica organizado, testável e pronto para futuras atualizações da stack.

---

## 🚀 Conclusão

O padrão de **Page Modules** no projeto Educacross não é apenas uma escolha arquitetural, mas uma **solução estratégica
** que:

1. **Resolve problemas atuais**: Evita erros de reatividade e vazamento de estado
2. **Melhora performance**: Carregamento dinâmico e cleanup adequado
3. **Facilita manutenção**: Código organizado e isolado por contexto
4. **Prepara o futuro**: Migração suave para Vue 3 e Pinia

Esta abordagem garante que o sistema seja **escalável**, **confiável** e **preparado para evoluções tecnológicas futuras
**, mantendo a produtividade da equipe e a qualidade do código.
