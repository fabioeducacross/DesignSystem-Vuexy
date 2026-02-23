import access from './access'
import account from './account'
import adminContext from './admin-context'
// Modules
import app from './app'
import appConfig from './app-config'
import loggedAccess from './loggedAccess'
import teacherContext from './teacher-context'
import verticalMenu from './vertical-menu'
// Whitelabel
import filters from '@/store/filters/index.js'
import events from '@/store/pageModules/events/events.js'
import table from '@/store/table/index.js'
// dependencies
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { parse as flattedParse, stringify as flattedStringify } from 'flatted'

Vue.use(Vuex)

const vuexPersist = new VuexPersistence({
  key: 'vuex',
  storage: window.localStorage,
  // Avoid vuex-persist's internal `require('flatted')` which breaks in Vite prod
  supportCircular: false,
  // Use Flatted explicitly to safely handle any circular structures
  restoreState: (key, storage) => {
    try {
      const value = storage.getItem(key)
      if (typeof value === 'string') {
        return flattedParse(value || '{}')
      }
      return value || {}
    } catch (e) {
      // Fallback to empty object if parsing fails
      return {}
    }
  },
  saveState: (key, state, storage) => {
    try {
      storage.setItem(key, flattedStringify(state))
    } catch (e) {
      // Swallow quota or serialization errors to avoid breaking app
    }
  },
  // Persist only critical modules to reduce initial payload
  modules: ['app', 'teacherContext', 'adminContext', 'account', 'access', 'loggedAccess', 'filters'],
})

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    teacherContext,
    adminContext,
    account,
    access,
    loggedAccess,
    events,
    filters,
    table,
  },
  plugins: [vuexPersist.plugin],
})
