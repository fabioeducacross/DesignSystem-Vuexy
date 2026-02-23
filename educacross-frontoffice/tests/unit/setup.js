/* eslint-disable max-classes-per-file, no-console */
const Vue = require('vue')

// Mock de variáveis de ambiente
process.env.VUE_APP_WHITELABEL = 'educacross'
process.env.VUE_APP_GOOGLE_CLIENT_ID = 'test-google-client-id'

// Mock de i18n
jest.mock('@/libs/i18n/index.js', () => ({
  t: key => key,
  locale: 'pt',
}))

// Silenciar warnings específicos do console
const originalConsoleWarn = console.warn
console.warn = (...args) => {
  const msg = args[0]
  if (
    typeof msg === 'string' &&
    (msg.includes('[Vue warn]') || msg.includes('Avoid mutating a prop directly'))
  ) {
    return
  }
  originalConsoleWarn.call(console, ...args)
}

const originalConsoleError = console.error
console.error = (...args) => {
  const msg = args[0]
  if (typeof msg === 'string' && msg.includes('[Vue warn]')) {
    return
  }
  originalConsoleError.call(console, ...args)
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock document.getElementById for loading-bg
const originalGetElementById = document.getElementById
document.getElementById = jest.fn(id => {
  if (id === 'loading-bg') {
    return {
      setAttribute: jest.fn(),
      getAttribute: jest.fn(),
      removeAttribute: jest.fn(),
      style: {},
    }
  }
  return originalGetElementById.call(document, id)
})

// Mock window.scrollTo
window.scrollTo = jest.fn()

// Mock window.location
delete window.location
window.location = {
  href: '',
  origin: 'http://localhost',
  protocol: 'http:',
  host: 'localhost',
  hostname: 'localhost',
  port: '',
  pathname: '/',
  search: '',
  hash: '',
  replace: jest.fn(),
  assign: jest.fn(),
  reload: jest.fn(),
}

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  disconnect() {}

  observe() {}

  takeRecords() {
    return []
  }

  unobserve() {}
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  disconnect() {}

  observe() {}

  unobserve() {}
}

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.sessionStorage = sessionStorageMock
