import {
  isUserLoggedIn,
  isAccountLoggedIn,
  getUserData,
  decodeToken,
  logoutUser,
  revokeAccount,
  revokeAllAccess,
  logoutAccount,
  loginUser,
  loginImpersonatedAdmin,
  logoutImpersonatedAdmin,
  removeRepeatedObjects,
  mapAbilities,
  processModulePermissions,
  generateEducationSystemPermissions,
  addEducationSystemPermissionsForTeacher,
} from '@/auth/utils'

// ============================================================
// NOTA TÉCNICA: Estratégia de Testes para authUtils
// ============================================================
//
// authUtils.js contém funções críticas de autenticação que:
// 1. Gerenciam tokens (JWT decode, storage)
// 2. Controlam fluxo de login/logout (Account vs Access)
// 3. Fazem chamadas de API (revoke, permissions)
// 4. Atualizam Vuex store
// 5. Navegam entre rotas
//
// ESTRATÉGIA DE MOCK:
// - Store: Mock completo do Vuex com state mutável
// - Router: Mock de push/replace
// - Axios: Mock de chamadas de API
// - EventBus: Mock de eventos
// - Window.location: Mock de redirecionamentos externos
//
// LIMITAÇÕES CONHECIDAS:
// - Funções privadas (loginAccount, loginAccess, redirectLogout)
//   são testadas INDIRETAMENTE através das funções públicas
// - updateAbility e updateInstitutionAbility não são mockados
//   profundamente, assumimos que funcionam
//
// ============================================================

// Mock de dependências externas
jest.mock('@/store', () => ({
  state: {
    access: {
      token: null,
      refreshToken: null,
      userData: null,
    },
    account: {
      token: null,
      refreshToken: null,
    },
    loggedAccess: {
      loggedAccess: {
        impersonated: {},
        users: {},
      },
    },
  },
  getters: {
    accessRole: null,
    accessUserData: null,
    getAbilities: [],
    getInstituionAbilities: [],
  },
  commit: jest.fn(),
  dispatch: jest.fn().mockResolvedValue({}),
}))

jest.mock('@/router', () => ({
  push: jest.fn(),
  currentRoute: { path: '/login' },
}))

jest.mock('@/libs/axios', () => ({
  defaults: {
    headers: {
      common: {},
    },
  },
  get: jest.fn().mockResolvedValue({}),
  post: jest.fn().mockResolvedValue({}),
}))

jest.mock('@/libs/axiosAccount', () => ({
  defaults: {
    headers: {
      common: {},
    },
  },
  get: jest.fn().mockResolvedValue({}),
}))

jest.mock('@/services/whitelabel/WhiteLabel.Service', () => {
  return jest.fn(key => {
    const config = {
      LoginUrl: '/login',
    }
    return config[key]
  })
})

jest.mock('@/services/auth/logout.service', () => ({
  getLogoutRedirectUrl: jest.fn().mockResolvedValue(''),
}))

jest.mock('@/eventBus', () => ({
  EventBus: {
    $emit: jest.fn(),
    $on: jest.fn(),
    $off: jest.fn(),
  },
}))

jest.mock('@/libs/acl/ability', () => ({
  updateAbility: jest.fn(),
  updateInstitutionAbility: jest.fn(),
}))

jest.mock('@/store/filters/useFilters', () => {
  return jest.fn(() => ({
    classes: { value: [] },
    classe: { value: null },
  }))
})

jest.mock('@/services/shared/educationSystem/EducationSystem.Service.js', () => ({
  getEducationSystemModule: jest.fn().mockResolvedValue({ data: [] }),
  getEducationSystemModuleV2: jest.fn().mockResolvedValue({ data: [] }),
}))

describe('authUtils', () => {
  let store
  let router
  let axiosIns

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()

    // Importar mocks
    store = require('@/store')
    router = require('@/router')
    axiosIns = require('@/libs/axios')

    // Reset state
    store.state.access.token = null
    store.state.access.refreshToken = null
    store.state.access.userData = null
    store.state.account.token = null
    store.state.account.refreshToken = null
    store.state.loggedAccess.loggedAccess = {
      impersonated: {},
      users: {},
    }
    store.getters.accessRole = null
    store.getters.accessUserData = null
    store.getters.getAbilities = []
    store.getters.getInstituionAbilities = []

    // Reset headers
    axiosIns.defaults.headers.common = {}

    // Reset localStorage
    localStorage.clear()

    // Reset router
    router.push.mockClear()

    // Reset window.location mock
    delete window.location
    window.location = { href: '', replace: jest.fn() }

    // Reset dispatch/commit para retornar promises
    store.dispatch.mockResolvedValue({})
    store.commit.mockClear()

    // Reset EventBus
    const { EventBus } = require('@/eventBus')
    EventBus.$emit.mockClear()
  })

  describe('isUserLoggedIn', () => {
    it('deve retornar truthy quando token e refreshToken estão presentes', () => {
      store.state.access.token = 'valid-token'
      store.state.access.refreshToken = 'valid-refresh-token'
      expect(isUserLoggedIn()).toBeTruthy()
    })

    it('deve retornar falsy quando token está ausente', () => {
      store.state.access.token = null
      store.state.access.refreshToken = 'valid-refresh-token'
      expect(isUserLoggedIn()).toBeFalsy()
    })

    it('deve retornar falsy quando refreshToken está ausente', () => {
      store.state.access.token = 'valid-token'
      store.state.access.refreshToken = null
      expect(isUserLoggedIn()).toBeFalsy()
    })

    it('deve retornar falsy quando ambos estão ausentes', () => {
      store.state.access.token = null
      store.state.access.refreshToken = null
      expect(isUserLoggedIn()).toBeFalsy()
    })
  })

  describe('isAccountLoggedIn', () => {
    it('deve retornar truthy quando token e refreshToken de conta estão presentes', () => {
      store.state.account.token = 'valid-account-token'
      store.state.account.refreshToken = 'valid-account-refresh-token'
      expect(isAccountLoggedIn()).toBeTruthy()
    })

    it('deve retornar falsy quando token de conta está ausente', () => {
      store.state.account.token = null
      store.state.account.refreshToken = 'valid-account-refresh-token'
      expect(isAccountLoggedIn()).toBeFalsy()
    })

    it('deve retornar falsy quando refreshToken de conta está ausente', () => {
      store.state.account.token = 'valid-account-token'
      store.state.account.refreshToken = null
      expect(isAccountLoggedIn()).toBeFalsy()
    })

    it('deve retornar falsy quando ambos estão ausentes', () => {
      store.state.account.token = null
      store.state.account.refreshToken = null
      expect(isAccountLoggedIn()).toBeFalsy()
    })
  })

  describe('getUserData', () => {
    it('deve retornar dados do usuário do getter accessRole quando disponíveis', () => {
      const mockUserData = { id: 1, name: 'Test User', email: 'test@example.com' }
      store.getters.accessRole = mockUserData

      const result = getUserData()
      expect(result).toEqual(mockUserData)
    })

    it('deve retornar null quando não há dados no getter', () => {
      store.getters.accessRole = null
      const result = getUserData()
      expect(result).toBeNull()
    })

    it('deve retornar dados complexos do usuário', () => {
      const mockUserData = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        roles: ['admin', 'user'],
        permissions: { read: true, write: false },
      }
      store.getters.accessRole = mockUserData

      const result = getUserData()
      expect(result).toEqual(mockUserData)
      expect(result.roles).toContain('admin')
    })
  })

  describe('decodeToken', () => {
    it('deve decodificar token JWT válido corretamente', () => {
      // Token JWT mock: {"sub":"1234567890","name":"John Doe","iat":1516239022}
      const mockToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

      const decoded = decodeToken(mockToken)
      expect(decoded).toEqual({
        sub: '1234567890',
        name: 'John Doe',
        iat: 1516239022,
      })
    })

    it('deve lançar erro quando token é inválido', () => {
      const invalidToken = 'invalid.token.here'
      expect(() => decodeToken(invalidToken)).toThrow()
    })

    it('deve lançar erro quando token está vazio', () => {
      expect(() => decodeToken('')).toThrow()
    })

    it('deve lançar erro quando token não tem formato JWT', () => {
      expect(() => decodeToken('not-a-jwt-token')).toThrow()
    })
  })

  describe('logoutUser', () => {
    it('deve chamar dispatch logoutAccess do store', async () => {
      await logoutUser()

      expect(store.dispatch).toHaveBeenCalledWith('logoutAccess')
    })

    it('deve chamar dispatch filters/reset do store', async () => {
      await logoutUser()

      expect(store.dispatch).toHaveBeenCalledWith('filters/reset')
    })

    it('deve redirecionar para managerAccount quando redirect é true', async () => {
      await logoutUser(true)

      expect(router.push).toHaveBeenCalledWith({ name: 'managerAccount' })
    })

    it('não deve redirecionar quando redirect é false', async () => {
      await logoutUser(false)

      expect(router.push).not.toHaveBeenCalled()
    })

    it('deve limpar estado do usuário ao fazer logout', async () => {
      store.state.access.token = 'token-to-remove'
      store.state.access.refreshToken = 'refresh-to-remove'

      await logoutUser()

      expect(store.dispatch).toHaveBeenCalledWith('logoutAccess')
      expect(store.dispatch).toHaveBeenCalledWith('filters/reset')
    })

    it('deve executar logout completo com redirecionamento', async () => {
      await logoutUser(true)

      expect(store.dispatch).toHaveBeenCalledWith('logoutAccess')
      expect(store.dispatch).toHaveBeenCalledWith('filters/reset')
      expect(router.push).toHaveBeenCalledWith({ name: 'managerAccount' })
    })
  })

  describe('revokeAccount', () => {
    it('deve chamar API de revoke quando token e refreshToken estão presentes', async () => {
      store.state.account.token = 'account-token'
      store.state.account.refreshToken = 'account-refresh-token'

      await revokeAccount()

      expect(axiosIns.post).toHaveBeenCalledWith(
        '/v2/account/revoke-token',
        {
          token: 'account-token',
          refreshToken: 'account-refresh-token',
        },
        expect.objectContaining({
          headers: {
            showErrorToast: false,
          },
        }),
      )
    })

    it('deve chamar commit logoutAccount após requisição', async () => {
      store.state.account.token = 'account-token'
      store.state.account.refreshToken = 'account-refresh-token'

      await revokeAccount()

      expect(store.commit).toHaveBeenCalledWith('logoutAccount')
    })

    it('não deve fazer requisição quando token está ausente', async () => {
      store.state.account.token = null
      store.state.account.refreshToken = 'refresh-token'

      await revokeAccount()

      expect(axiosIns.post).not.toHaveBeenCalled()
    })

    it('não deve fazer requisição quando refreshToken está ausente', async () => {
      store.state.account.token = 'account-token'
      store.state.account.refreshToken = null

      await revokeAccount()

      expect(axiosIns.post).not.toHaveBeenCalled()
    })

    it('deve sempre chamar commit logoutAccount mesmo em caso de erro', async () => {
      store.state.account.token = 'account-token'
      store.state.account.refreshToken = 'account-refresh-token'
      axiosIns.post.mockRejectedValue(new Error('API Error'))

      try {
        await revokeAccount()
      } catch (error) {
        // Erro esperado
      }

      expect(store.commit).toHaveBeenCalledWith('logoutAccount')
    })
  })

  describe('revokeAllAccess', () => {
    // NOTA TÉCNICA: revokeAllAccess revoga TODOS os acessos armazenados
    // (impersonated + users) fazendo chamadas paralelas de API.
    //
    // Usa Promise.allSettled (não Promise.all) para garantir que
    // todos os revokes são tentados mesmo se alguns falharem.
    //
    // Após cada revoke (sucesso ou falha), chama logoutLoggedAccess
    // para limpar o access do store.

    beforeEach(() => {
      axiosIns.post.mockResolvedValue({})
    })

    it('não deve fazer nada quando não há acessos armazenados', async () => {
      store.state.loggedAccess.loggedAccess = {
        impersonated: {},
        users: {},
      }

      await revokeAllAccess()

      expect(axiosIns.post).not.toHaveBeenCalled()
      expect(store.dispatch).not.toHaveBeenCalled()
    })

    it('deve revogar acessos de users via API', async () => {
      store.state.loggedAccess.loggedAccess = {
        impersonated: {},
        users: {
          'user-123': {
            AccessToken: 'token-123',
            RefreshToken: 'refresh-123',
          },
          'user-456': {
            AccessToken: 'token-456',
            RefreshToken: 'refresh-456',
          },
        },
      }

      await revokeAllAccess()

      expect(axiosIns.post).toHaveBeenCalledTimes(2)
      expect(axiosIns.post).toHaveBeenCalledWith(
        '/v2/applicationusers/revoke-token',
        {
          token: 'token-123',
          refreshToken: 'refresh-123',
        },
        expect.objectContaining({
          headers: { showErrorToast: false },
        }),
      )
      expect(axiosIns.post).toHaveBeenCalledWith(
        '/v2/applicationusers/revoke-token',
        {
          token: 'token-456',
          refreshToken: 'refresh-456',
        },
        expect.objectContaining({
          headers: { showErrorToast: false },
        }),
      )
    })

    it('deve revogar acessos impersonated via API', async () => {
      store.state.loggedAccess.loggedAccess = {
        impersonated: {
          'admin-123': {
            AccessToken: 'admin-token',
            RefreshToken: 'admin-refresh',
          },
        },
        users: {},
      }

      await revokeAllAccess()

      expect(axiosIns.post).toHaveBeenCalledWith(
        '/v2/applicationusers/revoke-token',
        {
          token: 'admin-token',
          refreshToken: 'admin-refresh',
        },
        expect.any(Object),
      )
    })

    it('deve revogar TODOS os acessos (impersonated + users)', async () => {
      store.state.loggedAccess.loggedAccess = {
        impersonated: {
          'admin-1': {
            AccessToken: 'admin-token-1',
            RefreshToken: 'admin-refresh-1',
          },
        },
        users: {
          'user-1': {
            AccessToken: 'user-token-1',
            RefreshToken: 'user-refresh-1',
          },
          'user-2': {
            AccessToken: 'user-token-2',
            RefreshToken: 'user-refresh-2',
          },
        },
      }

      await revokeAllAccess()

      // 1 impersonated + 2 users = 3 chamadas
      expect(axiosIns.post).toHaveBeenCalledTimes(3)
    })

    it('deve chamar logoutLoggedAccess para cada access após revoke', async () => {
      store.state.loggedAccess.loggedAccess = {
        impersonated: {},
        users: {
          'user-123': {
            AccessToken: 'token-123',
            RefreshToken: 'refresh-123',
          },
        },
      }

      await revokeAllAccess()

      expect(store.dispatch).toHaveBeenCalledWith('logoutLoggedAccess', {
        AccessToken: 'token-123',
        RefreshToken: 'refresh-123',
      })
    })

    it('deve continuar revogando mesmo se uma API falhar', async () => {
      store.state.loggedAccess.loggedAccess = {
        impersonated: {},
        users: {
          'user-success': {
            AccessToken: 'token-success',
            RefreshToken: 'refresh-success',
          },
          'user-fail': {
            AccessToken: 'token-fail',
            RefreshToken: 'refresh-fail',
          },
        },
      }

      // Primeira chamada falha, segunda sucede
      axiosIns.post.mockRejectedValueOnce(new Error('API Error')).mockResolvedValueOnce({})

      await revokeAllAccess()

      // Ambos devem ser logados out mesmo com erro
      expect(store.dispatch).toHaveBeenCalledTimes(2)
      expect(store.dispatch).toHaveBeenCalledWith('logoutLoggedAccess', {
        AccessToken: 'token-success',
        RefreshToken: 'refresh-success',
      })
      expect(store.dispatch).toHaveBeenCalledWith('logoutLoggedAccess', {
        AccessToken: 'token-fail',
        RefreshToken: 'refresh-fail',
      })
    })

    it('deve usar Promise.allSettled para não falhar se uma API falha', async () => {
      store.state.loggedAccess.loggedAccess = {
        impersonated: {},
        users: {
          'user-1': { AccessToken: 'token-1', RefreshToken: 'refresh-1' },
          'user-2': { AccessToken: 'token-2', RefreshToken: 'refresh-2' },
        },
      }

      axiosIns.post.mockRejectedValue(new Error('All fail'))

      // Não deve lançar erro
      await expect(revokeAllAccess()).resolves.not.toThrow()

      // Mas deve ter tentado revogar todos
      expect(axiosIns.post).toHaveBeenCalledTimes(2)
    })
  })

  describe('logoutAccount', () => {
    // NOTA TÉCNICA: logoutAccount foi completamente reescrito:
    // 1. ANTES de revogar: busca redirectUrl via getLogoutRedirectUrl (se redirect=true)
    // 2. Se getLogoutRedirectUrl falhar → panicLogout() e return
    // 3. Revoga tokens (revokeAllAccess + revokeAccount) - ignora erros
    // 4. Limpa store (logoutAccess + logoutAccount)
    // 5. Se redirect=true: redireciona para redirectUrl ou fallback para login

    let getLogoutRedirectUrl

    beforeEach(() => {
      // Mock revokeAccount para não fazer chamada real
      axiosIns.post.mockResolvedValue({})

      // Mock getLogoutRedirectUrl
      getLogoutRedirectUrl = require('@/services/auth/logout.service').getLogoutRedirectUrl
      getLogoutRedirectUrl.mockResolvedValue('')
    })

    it('deve chamar revokeAllAccess e revokeAccount', async () => {
      store.state.account.token = 'account-token'
      store.state.account.refreshToken = 'account-refresh'

      await logoutAccount(false)

      // revokeAccount foi chamado
      expect(axiosIns.post).toHaveBeenCalledWith(
        '/v2/account/revoke-token',
        {
          token: 'account-token',
          refreshToken: 'account-refresh',
        },
        expect.objectContaining({
          headers: { showErrorToast: false },
        }),
      )
    })

    it('não deve buscar redirectUrl quando redirect=false', async () => {
      await logoutAccount(false)

      expect(getLogoutRedirectUrl).not.toHaveBeenCalled()
    })

    it('deve buscar redirectUrl antes de revogar quando redirect=true', async () => {
      store.state.account.token = 'token'
      store.state.account.refreshToken = 'refresh'
      getLogoutRedirectUrl.mockResolvedValue('https://custom.logout.url')

      await logoutAccount(true)

      // Deve buscar URL primeiro (isAccountLoggedIn() retorna 'refresh' que é truthy)
      expect(getLogoutRedirectUrl).toHaveBeenCalledWith('refresh')
      // E depois revogar
      expect(axiosIns.post).toHaveBeenCalled()
    })

    it('deve chamar dispatch logoutAccess e commit logoutAccount', async () => {
      await logoutAccount(false)

      expect(store.dispatch).toHaveBeenCalledWith('logoutAccess')
      expect(store.commit).toHaveBeenCalledWith('logoutAccount')
    })

    it('deve continuar logout mesmo se revokeAccount falhar', async () => {
      store.state.account.token = 'token'
      store.state.account.refreshToken = 'refresh'
      axiosIns.post.mockRejectedValue(new Error('API Error'))

      await logoutAccount(false)

      // Mesmo com erro, deve limpar state
      expect(store.dispatch).toHaveBeenCalledWith('logoutAccess')
      expect(store.commit).toHaveBeenCalledWith('logoutAccount')
    })

    it('não deve redirecionar quando redirect=false', async () => {
      await logoutAccount(false)

      expect(router.push).not.toHaveBeenCalled()
      expect(window.location.href).toBe('')
    })

    describe('Redirecionamentos (redirect=true)', () => {
      it('deve redirecionar para redirectUrl retornada pela API', async () => {
        // Sem account token/refresh, isAccountLoggedIn() retorna null (falsy)
        store.state.account.token = null
        store.state.account.refreshToken = null
        getLogoutRedirectUrl.mockResolvedValue('https://api.logout.url')

        await logoutAccount(true)

        expect(getLogoutRedirectUrl).toHaveBeenCalledWith(null)
        expect(window.location.href).toBe('https://api.logout.url')
        expect(router.push).not.toHaveBeenCalled()
      })

      it('deve fazer router.push para login quando redirectUrl está vazio', async () => {
        getLogoutRedirectUrl.mockResolvedValue('')

        await logoutAccount(true)

        expect(router.push).toHaveBeenCalledWith({ name: 'login' })
        expect(window.location.href).toBe('')
      })

      it('deve chamar panicLogout quando getLogoutRedirectUrl falha', async () => {
        getLogoutRedirectUrl.mockRejectedValue(new Error('API Error'))
        store.state.account.token = 'token'
        store.state.account.refreshToken = 'refresh'

        await logoutAccount(true)

        // panicLogout limpa state e redireciona
        expect(store.dispatch).toHaveBeenCalledWith('logoutAccess')
        expect(store.commit).toHaveBeenCalledWith('logoutAccount')
        expect(store.dispatch).toHaveBeenCalledWith('filters/reset')
        expect(store.dispatch).toHaveBeenCalledWith('resetTeacherContext')
        expect(router.push).toHaveBeenCalledWith({ name: 'login' })
      })

      it('não deve revogar tokens quando panicLogout é acionado', async () => {
        getLogoutRedirectUrl.mockRejectedValue(new Error('API Error'))
        axiosIns.post.mockClear()

        await logoutAccount(true)

        // panicLogout tenta revogar mas ignora erros - pode ou não ser chamado
        // O importante é que não quebra o fluxo
        expect(router.push).toHaveBeenCalledWith({ name: 'login' })
      })

      it('deve usar isAccountLoggedIn para determinar qual axios usar na API', async () => {
        // Com account token/refresh, isAccountLoggedIn() retorna 'account-refresh' (truthy)
        store.state.account.token = 'account-token'
        store.state.account.refreshToken = 'account-refresh'
        getLogoutRedirectUrl.mockResolvedValue('https://test.url')

        await logoutAccount(true)

        // isAccountLoggedIn() retorna 'account-refresh' neste caso
        expect(getLogoutRedirectUrl).toHaveBeenCalledWith('account-refresh')
      })
    })
  })

  describe('loginUser', () => {
    // NOTA TÉCNICA: loginUser é a função MAIS COMPLEXA de authUtils.
    //
    // Fluxo:
    // 1. Decodifica token JWT para extrair userData
    // 2. Reset store se resetStore=true
    // 3. Branch baseado em userData.Role:
    //    - Role='Account' → loginAccount (privado)
    //    - Role=outras → loginAccess (privado) + addAccess ao store
    //
    // loginAccount (privado):
    // - Commit loginAccount ao store
    // - Faz API call para buscar permissions
    // - updateAbility com permissions
    //
    // loginAccess (privado):
    // - Commit loginAccess ao store
    // - Fetch classes (Teacher) ou students (Student)
    // - Fetch education systems
    // - Fetch access abilities
    // - Adiciona permissions extras para non-Student/Teacher
    // - updateAbility + updateInstitutionAbility
    // - Emite evento 'accessLogged'
    //
    // LIMITAÇÃO: Funções privadas não são testadas diretamente.
    // Testamos COMPORTAMENTO esperado através de loginUser.

    describe('Login como Account', () => {
      let mockAccountToken
      let axiosInsAccount

      beforeEach(() => {
        // Token com Role='Account'
        // Payload: { Role: 'Account', UserId: 'account-123', iat: 1516239022 }
        mockAccountToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiQWNjb3VudCIsIlVzZXJJZCI6ImFjY291bnQtMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.test'

        axiosInsAccount = require('@/libs/axiosAccount')
        axiosInsAccount.get = jest.fn().mockResolvedValue({
          data: { permissions: ['read:account', 'write:account'] },
        })
      })

      it('deve fazer login como Account e chamar loginAccount', async () => {
        await loginUser(mockAccountToken, 'refresh-token', false)

        expect(store.commit).toHaveBeenCalledWith('loginAccount', {
          token: mockAccountToken,
          refreshToken: 'refresh-token',
          userData: expect.objectContaining({ Role: 'Account' }),
        })
      })

      it('deve buscar permissions de account via API', async () => {
        await loginUser(mockAccountToken, 'refresh-token', false)

        expect(axiosInsAccount.get).toHaveBeenCalledWith('v1/account/permissions')
      })

      it('deve atualizar abilities após buscar permissions', async () => {
        const { updateAbility } = require('@/libs/acl/ability')

        await loginUser(mockAccountToken, 'refresh-token', false)

        expect(updateAbility).toHaveBeenCalledWith(['read:account', 'write:account'])
        expect(store.commit).toHaveBeenCalledWith('setAbilities', ['read:account', 'write:account'])
      })

      it('não deve resetar store quando resetStore=false', async () => {
        await loginUser(mockAccountToken, 'refresh-token', false)

        expect(store.dispatch).not.toHaveBeenCalledWith('resetTeacherContext')
      })

      it('deve resetar store quando resetStore=true', async () => {
        await loginUser(mockAccountToken, 'refresh-token', true)

        expect(store.dispatch).toHaveBeenCalledWith('resetTeacherContext')
      })
    })

    describe('Login como Teacher', () => {
      let mockTeacherToken
      let useFilters

      beforeEach(() => {
        // Token com Role='Teacher'
        // Payload: { Role: 'Teacher', UserId: 'teacher-456', InstitutionId: 'inst-1', iat: 1516239022 }
        mockTeacherToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiVGVhY2hlciIsIlVzZXJJZCI6InRlYWNoZXItNDU2IiwiSW5zdGl0dXRpb25JZCI6Imluc3QtMSIsImlhdCI6MTUxNjIzOTAyMn0.test'

        // Mock useFilters para retornar classes
        useFilters = require('@/store/filters/useFilters')
        useFilters.mockReturnValue({
          classes: {
            value: [
              { ClassId: 'class-1', Level: 'Level1' },
              { ClassId: 'class-2', Level: 'Level2' },
            ],
          },
          classe: { value: null },
        })

        // Mock API calls
        axiosIns.get.mockImplementation(url => {
          if (url === 'v2/applicationusers/permissions') {
            return Promise.resolve({
              data: {
                generalPermissions: [{ subject: 'Teacher', actions: ['read'] }],
                modulePermissions: {},
              },
            })
          }
          if (url === 'v1/applicationusers/teacher/permissions') {
            return Promise.resolve({
              data: {
                generalPermissions: [{ subject: 'Teacher', actions: ['read'] }],
                modulePermissions: {
                  'class-1': [],
                  'class-2': [],
                },
              },
            })
          }
          return Promise.resolve({ data: {} })
        })
      })

      it('deve adicionar access ao store antes de fazer login', async () => {
        await loginUser(mockTeacherToken, 'refresh-token', false)

        expect(store.commit).toHaveBeenCalledWith('addAccess', {
          Impersonated: undefined,
          Id: 'teacher-456',
          AccessToken: mockTeacherToken,
          RefreshToken: 'refresh-token',
        })
      })

      it('deve fazer loginAccess e commit loginAccess', async () => {
        await loginUser(mockTeacherToken, 'refresh-token', false)

        expect(store.commit).toHaveBeenCalledWith('loginAccess', {
          token: mockTeacherToken,
          refreshToken: 'refresh-token',
          userData: expect.objectContaining({ Role: 'Teacher' }),
        })
      })

      it('deve fazer dispatch fetchClasses para Teacher', async () => {
        await loginUser(mockTeacherToken, 'refresh-token', false)

        expect(store.dispatch).toHaveBeenCalledWith('fetchClasses')
      })

      it('deve buscar abilities de teacher via API', async () => {
        await loginUser(mockTeacherToken, 'refresh-token', false)

        expect(axiosIns.get).toHaveBeenCalledWith('v1/applicationusers/teacher/permissions')
      })

      it('deve emitir evento accessLogged após login', async () => {
        const { EventBus } = require('@/eventBus')

        await loginUser(mockTeacherToken, 'refresh-token', false)

        expect(EventBus.$emit).toHaveBeenCalledWith('accessLogged')
      })

      it('deve lançar erro noClassesError quando professor não tem turmas', async () => {
        useFilters.mockReturnValue({
          classes: { value: [] },
          classe: { value: null },
        })

        await expect(loginUser(mockTeacherToken, 'refresh-token', false)).rejects.toThrow(
          'noClassesError',
        )
      })

      it('deve chamar setHasAccountAction quando professor não tem turmas', async () => {
        // Token com HasAccount=true
        const tokenWithAccount =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiVGVhY2hlciIsIlVzZXJJZCI6InRlYWNoZXItNDU2IiwiSGFzQWNjb3VudCI6dHJ1ZSwiaWF0IjoxNTE2MjM5MDIyfQ.test'

        useFilters.mockReturnValue({
          classes: { value: [] },
          classe: { value: null },
        })

        try {
          await loginUser(tokenWithAccount, 'refresh-token', false)
        } catch (error) {
          // Esperado
        }

        expect(store.dispatch).toHaveBeenCalledWith('setHasAccountAction', true)
      })
    })

    describe('Login como Student', () => {
      let mockStudentToken

      beforeEach(() => {
        // Token com Role='Student'
        mockStudentToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiU3R1ZGVudCIsIlVzZXJJZCI6InN0dWRlbnQtNzg5IiwiSW5zdGl0dXRpb25JZCI6Imluc3QtMSIsImlhdCI6MTUxNjIzOTAyMn0.test'

        // Mock API calls
        axiosIns.get.mockResolvedValue({
          data: {
            generalPermissions: [],
            modulePermissions: {},
          },
        })
      })

      it('deve fazer dispatch fetchStudents para Student', async () => {
        await loginUser(mockStudentToken, 'refresh-token', false)

        expect(store.dispatch).toHaveBeenCalledWith('fetchStudents')
      })

      it('não deve fazer dispatch fetchClasses para Student', async () => {
        await loginUser(mockStudentToken, 'refresh-token', false)

        expect(store.dispatch).not.toHaveBeenCalledWith('fetchClasses')
      })
    })

    describe('Login com BackToNetworkManager', () => {
      it('deve usar InstitutionId como Id quando BackToNetworkManager é true', async () => {
        // Token com BackToNetworkManager=true
        const tokenWithBackTo =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiTmV0d29ya01hbmFnZXIiLCJVc2VySWQiOiJ1c2VyLTEyMyIsIkluc3RpdHV0aW9uSWQiOiJpbnN0LTk5OSIsIkJhY2tUb05ldHdvcmtNYW5hZ2VyIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjJ9.test'

        // Mock para não falhar
        axiosIns.get.mockResolvedValue({
          data: { generalPermissions: [], modulePermissions: {} },
        })

        await loginUser(tokenWithBackTo, 'refresh-token', false)

        expect(store.commit).toHaveBeenCalledWith('addAccess', {
          Impersonated: true,
          Id: 'inst-999', // Deve usar InstitutionId, não UserId
          AccessToken: tokenWithBackTo,
          RefreshToken: 'refresh-token',
        })
      })
    })

    describe('Edge Cases', () => {
      it('deve decodificar token corretamente', async () => {
        const mockToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiQWNjb3VudCIsIlVzZXJJZCI6ImFjY291bnQtMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.test'

        const axiosInsAccount = require('@/libs/axiosAccount')
        axiosInsAccount.get = jest.fn().mockResolvedValue({
          data: { permissions: [] },
        })

        await loginUser(mockToken, 'refresh-token', false)

        // Verifica que decodificou e usou o userData
        expect(store.commit).toHaveBeenCalledWith(
          'loginAccount',
          expect.objectContaining({
            userData: expect.objectContaining({
              Role: 'Account',
              UserId: 'account-123',
            }),
          }),
        )
      })

      it('deve lançar erro quando token é inválido', async () => {
        const invalidToken = 'invalid.token.here'

        await expect(loginUser(invalidToken, 'refresh-token')).rejects.toThrow()
      })
    })
  })

  describe('loginImpersonatedAdmin', () => {
    // NOTA: loginImpersonatedAdmin é apenas um wrapper para loginUser
    // com resetStore=true. Testa que extrai accessToken/refreshToken
    // do objeto access e passa para loginUser.

    it('deve chamar loginUser com tokens extraídos do objeto access', async () => {
      const mockAccess = {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiQWRtaW4iLCJVc2VySWQiOiJhZG1pbi0xMjMiLCJpYXQiOjE1MTYyMzkwMjJ9.test',
        refreshToken: 'admin-refresh-token',
      }

      // Mock para não falhar
      const axiosInsAccount = require('@/libs/axiosAccount')
      axiosInsAccount.get = jest.fn().mockResolvedValue({
        data: { permissions: [] },
      })

      axiosIns.get.mockResolvedValue({
        data: { generalPermissions: [], modulePermissions: {} },
      })

      await loginImpersonatedAdmin(mockAccess)

      // Verifica que fez login com os tokens
      expect(store.commit).toHaveBeenCalled()
      expect(store.dispatch).toHaveBeenCalledWith('resetTeacherContext')
    })

    it('deve resetar store sempre (resetStore=true)', async () => {
      const mockAccess = {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiQWRtaW4iLCJVc2VySWQiOiJhZG1pbi0xMjMiLCJpYXQiOjE1MTYyMzkwMjJ9.test',
        refreshToken: 'admin-refresh-token',
      }

      // Mock para não falhar
      axiosIns.get.mockResolvedValue({
        data: { generalPermissions: [], modulePermissions: {} },
      })

      await loginImpersonatedAdmin(mockAccess)

      expect(store.dispatch).toHaveBeenCalledWith('resetTeacherContext')
    })

    it('deve funcionar com role Admin', async () => {
      const mockAccess = {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiQWRtaW4iLCJVc2VySWQiOiJhZG1pbi0xMjMiLCJpYXQiOjE1MTYyMzkwMjJ9.test',
        refreshToken: 'admin-refresh-token',
      }

      axiosIns.get.mockResolvedValue({
        data: { generalPermissions: [], modulePermissions: {} },
      })

      await loginImpersonatedAdmin(mockAccess)

      expect(store.commit).toHaveBeenCalledWith('loginAccess', expect.anything())
    })
  })

  describe('logoutImpersonatedAdmin', () => {
    // NOTA: logoutImpersonatedAdmin faz logout do admin impersonado
    // e faz login novamente com o usuário original armazenado em
    // store.state.loggedAccess.loggedAccess.users[UserId].
    //
    // Se não encontrar usuário original, faz logoutUser().

    beforeEach(() => {
      // Mock para loginUser não falhar
      axiosIns.get.mockResolvedValue({
        data: { generalPermissions: [], modulePermissions: {} },
      })
    })

    it('deve buscar usuário original do store loggedAccess', async () => {
      store.getters.accessUserData = { UserId: 'current-user-123' }
      store.state.loggedAccess.loggedAccess = {
        impersonated: {},
        users: {
          'current-user-123': {
            // Token válido com Role=Account para evitar erro de classes
            AccessToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiQWNjb3VudCIsIlVzZXJJZCI6ImN1cnJlbnQtdXNlci0xMjMiLCJpYXQiOjE1MTYyMzkwMjJ9.test',
            RefreshToken: 'original-refresh',
          },
        },
      }

      // Mock para loginAccount não falhar
      const axiosInsAccount = require('@/libs/axiosAccount')
      axiosInsAccount.get = jest.fn().mockResolvedValue({
        data: { permissions: [] },
      })

      await logoutImpersonatedAdmin()

      // Verifica que tentou fazer login com tokens originais
      expect(store.commit).toHaveBeenCalled()
    })

    it('deve fazer loginUser com tokens do usuário original', async () => {
      store.getters.accessUserData = { UserId: 'original-user-456' }
      store.state.loggedAccess.loggedAccess = {
        impersonated: {},
        users: {
          'original-user-456': {
            // Token com Role=Account para não falhar com classes
            AccessToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiQWNjb3VudCIsIlVzZXJJZCI6Im9yaWdpbmFsLXVzZXItNDU2IiwiaWF0IjoxNTE2MjM5MDIyfQ.test',
            RefreshToken: 'original-refresh-token',
          },
        },
      }

      // Mock para loginAccount não falhar
      const axiosInsAccount = require('@/libs/axiosAccount')
      axiosInsAccount.get = jest.fn().mockResolvedValue({
        data: { permissions: [] },
      })

      await logoutImpersonatedAdmin()

      // Verifica que resetou store
      expect(store.dispatch).toHaveBeenCalledWith('resetTeacherContext')
    })

    it('deve fazer logoutUser quando não encontra usuário original', async () => {
      // BUG FIXED: O código agora tem o return statement correto
      store.getters.accessUserData = { UserId: 'not-found-user' }
      store.state.loggedAccess.loggedAccess = {
        impersonated: {},
        users: {}, // Nenhum usuário armazenado
      }

      // Mock router para logoutUser não falhar
      router.push = jest.fn().mockResolvedValue({})

      await logoutImpersonatedAdmin()

      // logoutUser foi chamado porque não encontrou usuário original
      expect(store.dispatch).toHaveBeenCalledWith('logoutAccess')
      expect(router.push).toHaveBeenCalledWith({ name: 'managerAccount' })
    })

    it('deve resetar store sempre (resetStore=true)', async () => {
      store.getters.accessUserData = { UserId: 'user-789' }
      store.state.loggedAccess.loggedAccess = {
        impersonated: {},
        users: {
          'user-789': {
            // Token com Role=Account para não falhar
            AccessToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiQWNjb3VudCIsIlVzZXJJZCI6InVzZXItNzg5IiwiaWF0IjoxNTE2MjM5MDIyfQ.test',
            RefreshToken: 'refresh-789',
          },
        },
      }

      // Mock para loginAccount não falhar
      const axiosInsAccount = require('@/libs/axiosAccount')
      axiosInsAccount.get = jest.fn().mockResolvedValue({
        data: { permissions: [] },
      })

      await logoutImpersonatedAdmin()

      expect(store.dispatch).toHaveBeenCalledWith('resetTeacherContext')
    })
  })

  describe('Utility Functions', () => {
    describe('removeRepeatedObjects', () => {
      it('deve remover objetos duplicados de um array', () => {
        const input = [
          { id: 1, name: 'Test' },
          { id: 2, name: 'Other' },
          { id: 1, name: 'Test' }, // duplicate
        ]

        const result = removeRepeatedObjects(input)

        expect(result).toHaveLength(2)
        expect(result).toEqual([
          { id: 1, name: 'Test' },
          { id: 2, name: 'Other' },
        ])
      })

      it('deve retornar array vazio quando input é vazio', () => {
        const result = removeRepeatedObjects([])
        expect(result).toEqual([])
      })

      it('deve manter todos os objetos quando não há duplicatas', () => {
        const input = [
          { id: 1, name: 'A' },
          { id: 2, name: 'B' },
          { id: 3, name: 'C' },
        ]

        const result = removeRepeatedObjects(input)
        expect(result).toHaveLength(3)
        expect(result).toEqual(input)
      })

      it('deve lidar com objetos complexos aninhados', () => {
        const input = [
          { id: 1, data: { nested: { value: 'test' } } },
          { id: 2, data: { nested: { value: 'other' } } },
          { id: 1, data: { nested: { value: 'test' } } }, // duplicate
        ]

        const result = removeRepeatedObjects(input)
        expect(result).toHaveLength(2)
      })

      it('deve manter array de primitivos únicos', () => {
        const input = [1, 2, 3, 2, 1, 3]

        const result = removeRepeatedObjects(input)
        expect(result).toHaveLength(3)
        expect(result).toEqual([1, 2, 3])
      })
    })

    describe('mapAbilities', () => {
      it('deve mapear abilities corretamente para formato CASL', () => {
        const input = [
          {
            subject: 'Student',
            actions: ['read', 'write'],
            name: 'Student Management',
          },
        ]

        const result = mapAbilities(input)

        expect(result).toEqual([
          { subject: 'Student', action: 'read', name: 'Student Management' },
          { subject: 'Student', action: 'write', name: 'Student Management' },
        ])
      })

      it('deve mapear múltiplas abilities com múltiplas actions', () => {
        const input = [
          { subject: 'Teacher', actions: ['read', 'write', 'delete'], name: 'Teachers' },
          { subject: 'Class', actions: ['read', 'update'], name: 'Classes' },
        ]

        const result = mapAbilities(input)

        expect(result).toHaveLength(5)
        expect(result).toContainEqual({ subject: 'Teacher', action: 'read', name: 'Teachers' })
        expect(result).toContainEqual({ subject: 'Teacher', action: 'write', name: 'Teachers' })
        expect(result).toContainEqual({ subject: 'Teacher', action: 'delete', name: 'Teachers' })
        expect(result).toContainEqual({ subject: 'Class', action: 'read', name: 'Classes' })
        expect(result).toContainEqual({ subject: 'Class', action: 'update', name: 'Classes' })
      })

      it('deve filtrar abilities sem action', () => {
        const input = [
          { subject: 'Student', actions: ['read', null, 'write'], name: 'Students' },
          { subject: 'Teacher', actions: [undefined, ''], name: 'Teachers' },
        ]

        const result = mapAbilities(input)

        expect(result).toHaveLength(2)
        expect(result).toEqual([
          { subject: 'Student', action: 'read', name: 'Students' },
          { subject: 'Student', action: 'write', name: 'Students' },
        ])
      })

      it('deve filtrar abilities sem subject', () => {
        const input = [
          { subject: null, actions: ['read'], name: 'Test' },
          { subject: '', actions: ['write'], name: 'Test2' },
          { subject: 'Valid', actions: ['read'], name: 'Valid' },
        ]

        const result = mapAbilities(input)

        expect(result).toHaveLength(1)
        expect(result[0]).toEqual({ subject: 'Valid', action: 'read', name: 'Valid' })
      })

      it('deve retornar array vazio quando input é vazio', () => {
        const result = mapAbilities([])
        expect(result).toEqual([])
      })

      it('deve lidar com array de abilities sem actions', () => {
        const input = [{ subject: 'Test', actions: [], name: 'Test Name' }]

        const result = mapAbilities(input)
        expect(result).toEqual([])
      })
    })

    describe('generateEducationSystemPermissions', () => {
      it('deve adicionar permissões de education system para séries corretas', () => {
        const modulePermissions = {
          'serie-1': [],
          'serie-2': [],
        }

        const educationSystems = [
          {
            id: 'ed-sys-1',
            name: 'Math System',
            subjects: [
              {
                serieIds: ['serie-1', 'serie-2'],
              },
            ],
          },
        ]

        const result = generateEducationSystemPermissions(modulePermissions, educationSystems)

        expect(result['serie-1']).toContainEqual({
          subject: 'EducationSystems-ed-sys-1',
          actions: ['read'],
          name: 'Math System',
        })
        expect(result['serie-2']).toContainEqual({
          subject: 'EducationSystems-ed-sys-1',
          actions: ['read'],
          name: 'Math System',
        })
      })

      it('deve não adicionar permissão se série não existir em modulePermissions', () => {
        const modulePermissions = {
          'serie-1': [],
        }

        const educationSystems = [
          {
            id: 'ed-sys-1',
            name: 'System',
            subjects: [
              {
                serieIds: ['serie-1', 'serie-non-existent'],
              },
            ],
          },
        ]

        const result = generateEducationSystemPermissions(modulePermissions, educationSystems)

        expect(result['serie-1']).toHaveLength(1)
        expect(result['serie-non-existent']).toBeUndefined()
      })

      it('deve lidar com múltiplos education systems', () => {
        const modulePermissions = {
          'serie-1': [],
        }

        const educationSystems = [
          {
            id: 'sys-1',
            name: 'System 1',
            subjects: [{ serieIds: ['serie-1'] }],
          },
          {
            id: 'sys-2',
            name: 'System 2',
            subjects: [{ serieIds: ['serie-1'] }],
          },
        ]

        const result = generateEducationSystemPermissions(modulePermissions, educationSystems)

        expect(result['serie-1']).toHaveLength(2)
        expect(result['serie-1']).toContainEqual({
          subject: 'EducationSystems-sys-1',
          actions: ['read'],
          name: 'System 1',
        })
        expect(result['serie-1']).toContainEqual({
          subject: 'EducationSystems-sys-2',
          actions: ['read'],
          name: 'System 2',
        })
      })

      it('deve retornar modulePermissions inalterado quando educationSystems é vazio', () => {
        const modulePermissions = {
          'serie-1': [{ subject: 'existing', actions: ['read'] }],
        }

        const result = generateEducationSystemPermissions(modulePermissions, [])

        expect(result).toEqual(modulePermissions)
        expect(result['serie-1']).toHaveLength(1)
      })

      it('deve adicionar permissões sem modificar as existentes', () => {
        const modulePermissions = {
          'serie-1': [{ subject: 'existing-permission', actions: ['read', 'write'] }],
        }

        const educationSystems = [
          {
            id: 'sys-1',
            name: 'New System',
            subjects: [{ serieIds: ['serie-1'] }],
          },
        ]

        const result = generateEducationSystemPermissions(modulePermissions, educationSystems)

        expect(result['serie-1']).toHaveLength(2)
        expect(result['serie-1'][0]).toEqual({
          subject: 'existing-permission',
          actions: ['read', 'write'],
        })
      })
    })

    describe('addEducationSystemPermissionsForTeacher', () => {
      it('deve adicionar permissões de education system para turmas do professor', () => {
        const abilities = {
          generalPermissions: [],
          modulePermissions: {
            'class-1': [],
            'class-2': [],
          },
        }

        const classes = [
          { ClassId: 'class-1', Level: 'Level1' },
          { ClassId: 'class-2', Level: 'Level2' },
        ]

        const educationSystems = [
          {
            id: 'ed-sys-1',
            name: 'System 1',
            classesIds: ['class-1', 'class-2'],
          },
        ]

        const result = addEducationSystemPermissionsForTeacher(abilities, classes, educationSystems)

        expect(result.modulePermissions['class-1']).toContainEqual({
          subject: 'EducationSystems-ed-sys-1',
          action: 'read',
          name: 'System 1',
        })
        expect(result.modulePermissions['class-2']).toContainEqual({
          subject: 'EducationSystems-ed-sys-1',
          action: 'read',
          name: 'System 1',
        })
      })

      it('não deve adicionar permissão se turma não existir em classes', () => {
        const abilities = {
          modulePermissions: {
            'class-1': [],
          },
        }

        const classes = [{ ClassId: 'class-1', Level: 'Level1' }]

        const educationSystems = [
          {
            id: 'ed-sys-1',
            name: 'System 1',
            classesIds: ['class-1', 'non-existent-class'],
          },
        ]

        const result = addEducationSystemPermissionsForTeacher(abilities, classes, educationSystems)

        expect(result.modulePermissions['class-1']).toHaveLength(1)
        expect(result.modulePermissions['non-existent-class']).toBeUndefined()
      })

      it('não deve adicionar permissão se modulePermissions da turma não existir', () => {
        const abilities = {
          modulePermissions: {
            'class-1': [],
          },
        }

        const classes = [
          { ClassId: 'class-1', Level: 'Level1' },
          { ClassId: 'class-2', Level: 'Level2' },
        ]

        const educationSystems = [
          {
            id: 'ed-sys-1',
            name: 'System 1',
            classesIds: ['class-1', 'class-2'],
          },
        ]

        const result = addEducationSystemPermissionsForTeacher(abilities, classes, educationSystems)

        expect(result.modulePermissions['class-1']).toHaveLength(1)
        expect(result.modulePermissions['class-2']).toBeUndefined()
      })

      it('não deve adicionar permissão duplicada', () => {
        const abilities = {
          modulePermissions: {
            'class-1': [
              {
                subject: 'EducationSystems-ed-sys-1',
                action: 'read',
                name: 'System 1',
              },
            ],
          },
        }

        const classes = [{ ClassId: 'class-1', Level: 'Level1' }]

        const educationSystems = [
          {
            id: 'ed-sys-1',
            name: 'System 1',
            classesIds: ['class-1'],
          },
        ]

        const result = addEducationSystemPermissionsForTeacher(abilities, classes, educationSystems)

        // Deve continuar com apenas 1 permissão (não duplicar)
        expect(result.modulePermissions['class-1']).toHaveLength(1)
      })

      it('deve usar Map para lookup eficiente de turmas', () => {
        const abilities = {
          modulePermissions: {
            'class-1': [],
            'class-2': [],
          },
        }

        const classes = [
          { ClassId: 'class-1', Level: 'Level1' },
          { ClassId: 'class-2', Level: 'Level2' },
        ]

        const educationSystems = [
          {
            id: 'sys-1',
            name: 'System 1',
            classesIds: ['class-1'],
          },
        ]

        const result = addEducationSystemPermissionsForTeacher(abilities, classes, educationSystems)

        // Verifica que apenas class-1 recebeu a permissão
        expect(result.modulePermissions['class-1']).toHaveLength(1)
        expect(result.modulePermissions['class-2']).toHaveLength(0)
      })

      it('deve retornar abilities sem modificações quando educationSystems é vazio', () => {
        const abilities = {
          modulePermissions: {
            'class-1': [],
          },
        }

        const classes = [{ ClassId: 'class-1', Level: 'Level1' }]

        const result = addEducationSystemPermissionsForTeacher(abilities, classes, [])

        expect(result.modulePermissions['class-1']).toHaveLength(0)
      })
    })

    describe('processModulePermissions', () => {
      it('deve processar permissões de módulo para professor (retorna objeto)', () => {
        const modulePermissions = {
          'class-1': [{ subject: 'Math', actions: ['read', 'write'], name: 'Mathematics' }],
          'class-2': [{ subject: 'Science', actions: ['read'], name: 'Science' }],
        }

        const result = processModulePermissions(modulePermissions, true, [])

        expect(result).toHaveProperty('class-1')
        expect(result).toHaveProperty('class-2')
        expect(Array.isArray(result['class-1'])).toBe(true)
        expect(result['class-1']).toContainEqual({
          subject: 'Math',
          action: 'read',
          name: 'Mathematics',
        })
        expect(result['class-1']).toContainEqual({
          subject: 'Math',
          action: 'write',
          name: 'Mathematics',
        })
      })

      it('deve processar permissões de módulo para não-professor (retorna array flat)', () => {
        const modulePermissions = {
          'serie-1': [{ subject: 'Math', actions: ['read'], name: 'Mathematics' }],
          'serie-2': [{ subject: 'Science', actions: ['read'], name: 'Science' }],
        }

        const result = processModulePermissions(modulePermissions, false, [])

        expect(Array.isArray(result)).toBe(true)
        expect(result).toContainEqual({ subject: 'Math', action: 'read', name: 'Mathematics' })
        expect(result).toContainEqual({ subject: 'Science', action: 'read', name: 'Science' })
      })

      it('deve remover permissões duplicadas para não-professor', () => {
        const modulePermissions = {
          'serie-1': [{ subject: 'Math', actions: ['read'], name: 'Mathematics' }],
          'serie-2': [{ subject: 'Math', actions: ['read'], name: 'Mathematics' }], // duplicate
        }

        const result = processModulePermissions(modulePermissions, false, [])

        expect(result).toHaveLength(1)
        expect(result[0]).toEqual({ subject: 'Math', action: 'read', name: 'Mathematics' })
      })

      it('deve integrar education systems nas permissões', () => {
        const modulePermissions = {
          'serie-1': [],
        }

        const educationSystems = [
          {
            id: 'sys-1',
            name: 'System 1',
            subjects: [{ serieIds: ['serie-1'] }],
          },
        ]

        const result = processModulePermissions(modulePermissions, false, educationSystems)

        expect(result).toContainEqual({
          subject: 'EducationSystems-sys-1',
          action: 'read',
          name: 'System 1',
        })
      })

      it('deve retornar objeto vazio para professor sem permissões', () => {
        const result = processModulePermissions({}, true, [])
        expect(result).toEqual({})
      })

      it('deve retornar array vazio para não-professor sem permissões', () => {
        const result = processModulePermissions({}, false, [])
        expect(result).toEqual([])
      })
    })
  })
})
