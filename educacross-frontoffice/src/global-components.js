import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vue from 'vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

// Register VuePerfectScrollbar globally before any async components load
const PerfectScrollbar = VuePerfectScrollbar.default || VuePerfectScrollbar
Vue.component(FeatherIcon.name || 'FeatherIcon', FeatherIcon)
Vue.component('VuePerfectScrollbar', PerfectScrollbar)
Vue.component('vue-perfect-scrollbar', PerfectScrollbar) // Register kebab-case variant
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
