import Vue from 'vue'
import App from './App.vue'
import { emitter } from './eventBus'
import './filters/filters'
import './global-components'
import { updateAbility, updateInstitutionAbility } from './libs/acl/ability'
import router from './router'
import genEducationSystemRoutes from './router/education-system-routes'
import '@/@core/utils/validations/validations'
import '@/assets/scss/main.scss'
import '@/assets/scss/style.scss'
// Tailwind
import '@/assets/tailwind/base.css'
import '@/assets/tailwind/components.css'
import '@/assets/tailwind/tailwind.css'
import '@/assets/tailwind/utilities.css'
import '@/libs/acl'
import i18n from '@/libs/i18n/index.js'
// 3rd party plugins
import '@/libs/portal-vue'
import ShepherdPlugin from '@/libs/shepherd'
import '@/libs/toastification'
import UserwayWidget from '@/libs/userwayWidget.js'
import store from '@/store/index'
import UtilTeacherService from '@/utils/teacher-utils/utils'
// Core styles - must be imported in this order
import Toast from 'vue-toastification'
import '@core/scss/core.scss'
import { BootstrapVue, IconsPlugin, ModalPlugin, ToastPlugin } from 'bootstrap-vue'
import 'flatpickr/dist/flatpickr.css'
import 'material-icons/iconfont/material-icons.css'
import 'material-symbols'
import PortalVue from 'portal-vue'
import VueMask from 'v-mask'

const options = {
  hideProgressBar: true,
  closeOnClick: false,
  closeButton: false,
  icon: false,
  timeout: 7000,
  transition: 'Vue-Toastification__fade',
}

// Install the plugin globally
Vue.use(Toast, options)

if (!import.meta.env.VITE_APP_DEVELOP) {
  UserwayWidget()
}

const abilities = store.getters.getAbilities
updateAbility(abilities)

const instituionAbilities = store.getters.getInstituionAbilities
updateInstitutionAbility(instituionAbilities)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(VueMask)
Vue.use(PortalVue)

export const bus = new Vue()

Vue.prototype.$bus = emitter

Vue.prototype.$utilTeacherService = UtilTeacherService

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

Vue.config.productionTip = false

// configure education system routes
genEducationSystemRoutes(router)

Vue.config.ignoredElements = ['typebot-standard']

Vue.use(ShepherdPlugin)

const vueInstance = new Vue({
  i18n,
  store,
  router,
  render: h => h(App),
}).$mount('#app')

export default vueInstance
