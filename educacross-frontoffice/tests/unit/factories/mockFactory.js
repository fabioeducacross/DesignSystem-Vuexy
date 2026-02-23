/**
 * Factory centralizada de mocks para testes
 * Elimina duplicação e facilita manutenção
 */

/**
 * Cria mock do Login Service
 * @returns {Object} Mock do LoginService com métodos mockados
 */
export const createMockLoginService = () => ({
  postLogin: jest.fn(),
  postLoginGoogle: jest.fn(),
})

/**
 * Cria mock do Router
 * @returns {Object} Mock do Vue Router
 */
export const createMockRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  currentRoute: {
    query: {},
    path: '/login',
    name: 'login',
  },
})

/**
 * Cria mock das funções de autenticação
 * @returns {Object} Mock das auth utils
 */
export const createMockAuthUtils = () => ({
  loginUser: jest.fn(),
  logoutUser: jest.fn(),
  decodeToken: jest.fn(),
  isUserLoggedIn: jest.fn(),
})

/**
 * Cria mock do AuthMicrosoft
 * @returns {Function} Mock constructor do AuthMicrosoft
 */
export const createMockAuthMicrosoft = () => {
  return jest.fn().mockImplementation(() => ({
    signIn: jest.fn(),
    signOut: jest.fn(),
  }))
}

/**
 * Cria mock do WhiteLabel Service
 * @param {Object} customConfig - Configurações customizadas
 * @returns {Function} Mock do WhiteLabel Service
 */
export const createMockWhitelabelService = (customConfig = {}) => {
  const defaultConfig = {
    LogoLogin: '/logo.png',
    showOthersLogins: true,
    name: 'Educacross',
    LoginUrl: '/login',
  }

  const config = { ...defaultConfig, ...customConfig }

  return jest.fn(key => config[key])
}

/**
 * Cria mock do Vuex Store para Login
 * @param {Object} overrides - Sobrescritas para state/mutations/getters
 * @returns {Object} Configuração do Vuex Store
 */
export const createMockStoreConfig = (overrides = {}) => {
  return {
    state: {
      emailVerify: null,
      accountId: null,
      ...overrides.state,
    },
    mutations: {
      UPDATE_GLOBAL_ERROR: jest.fn(),
      totalCodeTimeValidateEmail: jest.fn(),
      ...overrides.mutations,
    },
    getters: {
      'app/currentBreakPoint': () => 'lg',
      ...overrides.getters,
    },
  }
}

/**
 * Cria stubs padrão para componentes Vue
 * @returns {Object} Objeto com stubs de componentes
 */
export const createDefaultStubs = () => ({
  BLink: true,
  BImg: true,
  BFormGroup: true,
  BFormInput: true,
  BInputGroup: true,
  BInputGroupAppend: true,
  BInputGroupPrepend: true,
  BFormCheckbox: true,
  BButton: true,
  BSpinner: true,
  BForm: true,
  Divider: true,
  GoogleLogin: true,
  IntermediateRedirectLoginDeepLink: true,
  AuthLayout: {
    template: '<div><slot name="image"></slot><slot></slot></div>',
  },
  RouterLink: true,
  ValidationObserver: {
    template: '<form><slot /></form>',
    methods: {
      validate: jest.fn().mockResolvedValue(true),
    },
  },
  ValidationProvider: {
    template: '<div><slot :errors="[]" /></div>',
  },
})

/**
 * Cria mocks padrão para instância Vue ($t, $toast, etc)
 * @param {Object} customMocks - Mocks customizados
 * @returns {Object} Objeto com mocks
 */
export const createDefaultMocks = (customMocks = {}) => ({
  $t: key => key,
  $toast: jest.fn(),
  ...customMocks,
})
