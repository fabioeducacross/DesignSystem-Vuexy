import ability from './ability'
import { Can } from '@casl/vue'
import Vue from 'vue'

// Re-implement reactivity logic to avoid conflict with mixin
const abilityObservables = new WeakMap()

function getReactiveAbility(abilityInstance) {
  if (abilityObservables.has(abilityInstance)) {
    return abilityObservables.get(abilityInstance)
  }
  const observable = Vue.observable({ t: true })
  abilityInstance.on('updated', () => {
    observable.t = !observable.t
  })
  abilityObservables.set(abilityInstance, observable)
  return observable
}

// Define $ability on prototype
Object.defineProperty(Vue.prototype, '$ability', {
  get() {
    return ability
  }
})

// Define reactive $can on prototype
Vue.prototype.$can = function (...args) {
  const reactive = getReactiveAbility(this.$ability)
  // eslint-disable-next-line no-unused-expressions
  reactive.t // Trigger dependency
  return this.$ability.can(...args)
}

// Register Can component manually
Vue.component('Can', Can)
