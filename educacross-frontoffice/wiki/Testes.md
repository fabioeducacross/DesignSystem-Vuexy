# Testes

Este documento descreve a estratégia de testes do projeto **Educacross Frontend**, incluindo configuração, tipos de testes, ferramentas utilizadas e boas práticas.

## 🧪 Visão Geral dos Testes

O projeto utiliza uma estratégia abrangente de testes para garantir qualidade e confiabilidade:

- **Testes Unitários**: Componentes, funções e módulos isoladamente
- **Testes de Integração**: Interação entre componentes e serviços
- **Testes E2E**: Fluxos completos do usuário (planejado)
- **Testes de Snapshot**: Regressão visual de componentes

### Ferramentas Utilizadas

```json
{
  "jest": "^27.0.5",
  "@vue/test-utils": "^1.1.3",
  "@vue/vue2-jest": "^27.0.0-alpha.2",
  "babel-jest": "^27.0.6"
}
```

## ⚙️ Configuração

### `jest.config.js`

```javascript
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testEnvironment: 'jsdom',
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/@core/**',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@core/(.*)$': '<rootDir>/src/@core/$1',
    '^@validations$': '<rootDir>/src/@core/utils/validations/validations.js',
    '^@axios$': '<rootDir>/src/libs/axios',
    '^@components/(.*)$': '<rootDir>/src/layouts/components/$1',
  },
  transform: {
    '^.+\\.vue$': '@vue/vue2-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(bootstrap-vue|vue-.*)/)'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setup.js'],
  testMatch: ['**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'],
}
```

### Setup de Testes (`tests/unit/setup.js`)

```javascript
import VueCompositionAPI from '@vue/composition-api'
import { config } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import Vue from 'vue'

// Plugins globais
Vue.use(BootstrapVue)
Vue.use(VueCompositionAPI)

// Mock de componentes globais
config.stubs = {
  'b-icon': true,
  'b-button': true,
  'b-card': true,
  'feather-icon': true,
}

// Mock de diretivas
config.mocks = {
  $t: key => key,
  $tc: key => key,
  $store: {
    state: {},
    getters: {},
    commit: jest.fn(),
    dispatch: jest.fn(),
  },
  $router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
  $route: {
    params: {},
    query: {},
    name: 'test',
  },
}

// Configuração de timezone para testes consistentes
process.env.TZ = 'UTC'
```

## 📝 Scripts de Teste

### `package.json`

```json
{
  "scripts": {
    "test:unit": "TZ=UTC vue-cli-service test:unit",
    "test:coverage": "TZ=UTC vue-cli-service test:unit --coverage",
    "test:watch": "TZ=UTC vue-cli-service test:unit --watch",
    "test:debug": "TZ=UTC node --inspect-brk node_modules/.bin/vue-cli-service test:unit --runInBand"
  }
}
```

## 🧩 Testando Componentes Vue

### Componente Base

```javascript
// components/MyComponent.vue
<template>
  <div class="my-component">
    <h1>{{ title }}</h1>
    <button @click="handleClick">{{ buttonText }}</button>
    <p v-if="showMessage">{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      default: 'Click me'
    }
  },
  data() {
    return {
      showMessage: false,
      message: 'Hello World!'
    }
  },
  methods: {
    handleClick() {
      this.showMessage = !this.showMessage
      this.$emit('button-clicked', this.showMessage)
    }
  }
}
</script>
```

### Teste do Componente

```javascript
// tests/unit/components/MyComponent.spec.js
import MyComponent from '@/components/MyComponent.vue'
import { shallowMount } from '@vue/test-utils'

describe('MyComponent', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(MyComponent, {
      propsData: {
        title: 'Test Title',
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  describe('Renderização', () => {
    it('deve renderizar o título corretamente', () => {
      expect(wrapper.find('h1').text()).toBe('Test Title')
    })

    it('deve mostrar o texto padrão do botão', () => {
      expect(wrapper.find('button').text()).toBe('Click me')
    })

    it('deve aceitar texto personalizado do botão', () => {
      wrapper.setProps({ buttonText: 'Custom Button' })
      expect(wrapper.find('button').text()).toBe('Custom Button')
    })

    it('não deve mostrar a mensagem inicialmente', () => {
      expect(wrapper.find('p').exists()).toBe(false)
    })
  })

  describe('Interações', () => {
    it('deve mostrar/ocultar mensagem ao clicar no botão', async () => {
      const button = wrapper.find('button')

      // Primeiro clique - mostrar mensagem
      await button.trigger('click')
      expect(wrapper.find('p').exists()).toBe(true)
      expect(wrapper.find('p').text()).toBe('Hello World!')

      // Segundo clique - ocultar mensagem
      await button.trigger('click')
      expect(wrapper.find('p').exists()).toBe(false)
    })

    it('deve emitir evento ao clicar no botão', async () => {
      const button = wrapper.find('button')

      await button.trigger('click')

      expect(wrapper.emitted('button-clicked')).toBeTruthy()
      expect(wrapper.emitted('button-clicked')[0]).toEqual([true])
    })
  })

  describe('Props', () => {
    it('deve validar prop obrigatória', () => {
      const { title } = MyComponent.props
      expect(title.required).toBe(true)
      expect(title.type).toBe(String)
    })

    it('deve ter valores padrão corretos', () => {
      const { buttonText } = MyComponent.props
      expect(buttonText.default).toBe('Click me')
    })
  })
})
```

## 🏪 Testando Vuex Store

### Store Module

```javascript
// store/modules/missions.js
const state = {
  missions: [],
  loading: false,
  error: null,
}

const mutations = {
  SET_MISSIONS(state, missions) {
    state.missions = missions
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
}

const actions = {
  async fetchMissions({ commit }) {
    commit('SET_LOADING', true)
    try {
      const response = await getMissions()
      commit('SET_MISSIONS', response.data)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },
}

const getters = {
  activeMissions: state => state.missions.filter(m => m.active),
  missionCount: state => state.missions.length,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
```

### Teste do Store

```javascript
// tests/unit/store/modules/missions.spec.js
import * as api from '@/services/missions'
import missionsModule from '@/store/modules/missions'

// Mock da API
jest.mock('@/services/missions')

describe('Missions Store Module', () => {
  let state

  beforeEach(() => {
    state = {
      missions: [],
      loading: false,
      error: null,
    }
  })

  describe('Mutations', () => {
    it('SET_MISSIONS deve atualizar as missões', () => {
      const missions = [
        { id: 1, name: 'Mission 1', active: true },
        { id: 2, name: 'Mission 2', active: false },
      ]

      missionsModule.mutations.SET_MISSIONS(state, missions)

      expect(state.missions).toEqual(missions)
    })

    it('SET_LOADING deve atualizar o estado de loading', () => {
      missionsModule.mutations.SET_LOADING(state, true)
      expect(state.loading).toBe(true)

      missionsModule.mutations.SET_LOADING(state, false)
      expect(state.loading).toBe(false)
    })

    it('SET_ERROR deve definir mensagem de erro', () => {
      const errorMessage = 'Erro ao carregar missões'

      missionsModule.mutations.SET_ERROR(state, errorMessage)

      expect(state.error).toBe(errorMessage)
    })
  })

  describe('Actions', () => {
    let commit

    beforeEach(() => {
      commit = jest.fn()
    })

    it('fetchMissions deve carregar missões com sucesso', async () => {
      const mockMissions = [
        { id: 1, name: 'Mission 1' },
        { id: 2, name: 'Mission 2' },
      ]

      api.getMissions.mockResolvedValue({ data: mockMissions })

      await missionsModule.actions.fetchMissions({ commit })

      expect(commit).toHaveBeenCalledWith('SET_LOADING', true)
      expect(commit).toHaveBeenCalledWith('SET_MISSIONS', mockMissions)
      expect(commit).toHaveBeenCalledWith('SET_LOADING', false)
    })

    it('fetchMissions deve tratar erros', async () => {
      const errorMessage = 'Network Error'
      api.getMissions.mockRejectedValue(new Error(errorMessage))

      await missionsModule.actions.fetchMissions({ commit })

      expect(commit).toHaveBeenCalledWith('SET_LOADING', true)
      expect(commit).toHaveBeenCalledWith('SET_ERROR', errorMessage)
      expect(commit).toHaveBeenCalledWith('SET_LOADING', false)
    })
  })

  describe('Getters', () => {
    beforeEach(() => {
      state.missions = [
        { id: 1, name: 'Mission 1', active: true },
        { id: 2, name: 'Mission 2', active: false },
        { id: 3, name: 'Mission 3', active: true },
      ]
    })

    it('activeMissions deve retornar apenas missões ativas', () => {
      const result = missionsModule.getters.activeMissions(state)

      expect(result).toHaveLength(2)
      expect(result.every(m => m.active)).toBe(true)
    })

    it('missionCount deve retornar total de missões', () => {
      const result = missionsModule.getters.missionCount(state)

      expect(result).toBe(3)
    })
  })
})
```

## 🔌 Testando Serviços de API

### Serviço

```javascript
// services/missions.js
import api from '@/libs/axios'

export const getMissions = (params = {}) => {
  return api.get('/missions', { params })
}

export const createMission = data => {
  return api.post('/missions', data)
}

export const updateMission = (id, data) => {
  return api.put(`/missions/${id}`, data)
}

export const deleteMission = id => {
  return api.delete(`/missions/${id}`)
}
```

### Teste do Serviço

```javascript
// tests/unit/services/missions.spec.js
import { getMissions, createMission, updateMission, deleteMission } from '@/services/missions'
import axios from 'axios'

// Mock do axios
jest.mock('axios')
const mockedAxios = axios

describe('Missions Service', () => {
  beforeEach(() => {
    mockedAxios.get.mockClear()
    mockedAxios.post.mockClear()
    mockedAxios.put.mockClear()
    mockedAxios.delete.mockClear()
  })

  describe('getMissions', () => {
    it('deve fazer GET request correto', async () => {
      const mockResponse = { data: [{ id: 1, name: 'Mission 1' }] }
      mockedAxios.get.mockResolvedValue(mockResponse)

      const result = await getMissions()

      expect(mockedAxios.get).toHaveBeenCalledWith('/missions', { params: {} })
      expect(result).toEqual(mockResponse)
    })

    it('deve passar parâmetros de query', async () => {
      const params = { subject: 'math', grade: '5' }
      mockedAxios.get.mockResolvedValue({ data: [] })

      await getMissions(params)

      expect(mockedAxios.get).toHaveBeenCalledWith('/missions', { params })
    })
  })

  describe('createMission', () => {
    it('deve fazer POST request com dados corretos', async () => {
      const missionData = { name: 'New Mission', subject: 'math' }
      const mockResponse = { data: { id: 1, ...missionData } }
      mockedAxios.post.mockResolvedValue(mockResponse)

      const result = await createMission(missionData)

      expect(mockedAxios.post).toHaveBeenCalledWith('/missions', missionData)
      expect(result).toEqual(mockResponse)
    })
  })

  describe('updateMission', () => {
    it('deve fazer PUT request com ID e dados corretos', async () => {
      const id = 1
      const updateData = { name: 'Updated Mission' }
      const mockResponse = { data: { id, ...updateData } }
      mockedAxios.put.mockResolvedValue(mockResponse)

      const result = await updateMission(id, updateData)

      expect(mockedAxios.put).toHaveBeenCalledWith(`/missions/${id}`, updateData)
      expect(result).toEqual(mockResponse)
    })
  })

  describe('deleteMission', () => {
    it('deve fazer DELETE request com ID correto', async () => {
      const id = 1
      mockedAxios.delete.mockResolvedValue({ data: {} })

      await deleteMission(id)

      expect(mockedAxios.delete).toHaveBeenCalledWith(`/missions/${id}`)
    })
  })
})
```

## 🎛️ Testando com Composition API

### Composable

```javascript
// composables/useMissions.js
import { getMissions } from '@/services/missions'
import { ref, computed } from '@vue/composition-api'

export default function useMissions() {
  const missions = ref([])
  const loading = ref(false)
  const error = ref(null)

  const activeMissions = computed(() => {
    return missions.value.filter(mission => mission.active)
  })

  const fetchMissions = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await getMissions()
      missions.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    missions,
    loading,
    error,
    activeMissions,
    fetchMissions,
  }
}
```

### Teste do Composable

```javascript
// tests/unit/composables/useMissions.spec.js
import useMissions from '@/composables/useMissions'
import * as api from '@/services/missions'
import { ref } from '@vue/composition-api'

jest.mock('@/services/missions')

describe('useMissions composable', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve inicializar com valores padrão', () => {
    const { missions, loading, error } = useMissions()

    expect(missions.value).toEqual([])
    expect(loading.value).toBe(false)
    expect(error.value).toBe(null)
  })

  it('deve carregar missões com sucesso', async () => {
    const mockMissions = [
      { id: 1, name: 'Mission 1', active: true },
      { id: 2, name: 'Mission 2', active: false },
    ]

    api.getMissions.mockResolvedValue({ data: mockMissions })

    const { missions, loading, error, fetchMissions } = useMissions()

    await fetchMissions()

    expect(missions.value).toEqual(mockMissions)
    expect(loading.value).toBe(false)
    expect(error.value).toBe(null)
  })

  it('deve computar missões ativas corretamente', async () => {
    const mockMissions = [
      { id: 1, name: 'Mission 1', active: true },
      { id: 2, name: 'Mission 2', active: false },
      { id: 3, name: 'Mission 3', active: true },
    ]

    api.getMissions.mockResolvedValue({ data: mockMissions })

    const { activeMissions, fetchMissions } = useMissions()

    await fetchMissions()

    expect(activeMissions.value).toHaveLength(2)
    expect(activeMissions.value.every(m => m.active)).toBe(true)
  })

  it('deve tratar erros na requisição', async () => {
    const errorMessage = 'Network Error'
    api.getMissions.mockRejectedValue(new Error(errorMessage))

    const { missions, loading, error, fetchMissions } = useMissions()

    await fetchMissions()

    expect(missions.value).toEqual([])
    expect(loading.value).toBe(false)
    expect(error.value).toBe(errorMessage)
  })
})
```

## 📸 Testes de Snapshot

### Componente para Snapshot

```javascript
// tests/unit/components/MissionCard.spec.js
import MissionCard from '@/components/missions/MissionCard.vue'
import { shallowMount } from '@vue/test-utils'

describe('MissionCard', () => {
  const defaultProps = {
    mission: {
      id: 1,
      name: 'Test Mission',
      subject: 'Mathematics',
      grade: '5th Grade',
      status: 'active',
      studentsCount: 25,
      completedCount: 15,
    },
  }

  it('deve corresponder ao snapshot', () => {
    const wrapper = shallowMount(MissionCard, {
      propsData: defaultProps,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('deve corresponder ao snapshot com status inativo', () => {
    const wrapper = shallowMount(MissionCard, {
      propsData: {
        ...defaultProps,
        mission: {
          ...defaultProps.mission,
          status: 'inactive',
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

## 🔧 Utilitários de Teste

### Factory Helper

```javascript
// tests/unit/helpers/factories.js
export const createMission = (overrides = {}) => ({
  id: 1,
  name: 'Test Mission',
  subject: 'Mathematics',
  grade: '5th Grade',
  status: 'active',
  studentsCount: 25,
  completedCount: 15,
  createdAt: '2024-01-01T00:00:00Z',
  ...overrides,
})

export const createUser = (overrides = {}) => ({
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  role: 'teacher',
  ...overrides,
})

export const createClass = (overrides = {}) => ({
  id: 1,
  name: '5A',
  studentsCount: 30,
  grade: '5th Grade',
  ...overrides,
})
```

### Mock Helper

```javascript
// tests/unit/helpers/mocks.js
export const createMockStore = (customState = {}) => ({
  state: {
    auth: { isAuthenticated: true },
    user: { profile: { name: 'Test User' } },
    ...customState,
  },
  getters: {
    'auth/isAuthenticated': () => true,
    'user/profile': () => ({ name: 'Test User' }),
    ...customState.getters,
  },
  commit: jest.fn(),
  dispatch: jest.fn(),
})

export const createMockRouter = (route = {}) => ({
  push: jest.fn(),
  replace: jest.fn(),
  currentRoute: {
    name: 'test',
    params: {},
    query: {},
    ...route,
  },
})
```

## 🚀 Executando Testes

### Comandos Básicos

```bash
# Executar todos os testes
npm run test:unit

# Executar com coverage
npm run test:coverage

# Executar em modo watch
npm run test:watch

# Executar testes específicos
npm run test:unit -- --testNamePattern="MissionCard"

# Executar arquivo específico
npm run test:unit tests/unit/components/MissionCard.spec.js

# Debug de testes
npm run test:debug
```

### CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:unit

      - name: Run coverage
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v1
```

## 📋 Boas Práticas

### 1. Estrutura de Testes

```javascript
describe('ComponentName', () => {
  describe('Renderização', () => {
    // Testes de renderização
  })

  describe('Interações', () => {
    // Testes de eventos e interações
  })

  describe('Computeds/Getters', () => {
    // Testes de propriedades computadas
  })

  describe('Props/Validação', () => {
    // Testes de validação de props
  })
})
```

### 2. Nomenclatura

```javascript
// ✅ Bom - descrições claras
it('deve mostrar mensagem de erro quando login falha', () => {})
it('deve emitir evento "mission-created" ao criar missão', () => {})

// ❌ Ruim - descrições vagas
it('deve funcionar', () => {})
it('teste do botão', () => {})
```

### 3. AAA Pattern (Arrange, Act, Assert)

```javascript
it('deve calcular média corretamente', () => {
  // Arrange - preparar dados
  const grades = [8, 9, 7, 10]

  // Act - executar ação
  const average = calculateAverage(grades)

  // Assert - verificar resultado
  expect(average).toBe(8.5)
})
```

### 4. Mocking Apropriado

```javascript
// ✅ Bom - mock de dependências externas
jest.mock('@/services/api')

// ✅ Bom - spy de métodos
const spy = jest.spyOn(component.methods, 'handleClick')

// ❌ Ruim - mock excessivo
jest.mock('@/components/Button.vue')
```

---

🔬 **Próximos Passos**: Consulte [Contribuição](Contribuicao.md) para entender como contribuir com o projeto, incluindo como escrever testes para suas contribuições.
