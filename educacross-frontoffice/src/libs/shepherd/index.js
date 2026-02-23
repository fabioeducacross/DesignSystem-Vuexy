import Shepherd from 'shepherd.js'
import 'shepherd.js/dist/css/shepherd.css'
import './shepherd-custom.css'

/**
 * Vue plugin for Shepherd.js tours
 * Compatible with Vue 2.7 and Vue 3
 */
const ShepherdPlugin = {
  install(Vue) {
    // Store tours instances
    const tours = {}

    // Initialize $tours for vue-tour compatibility
    Vue.prototype.$tours = new Proxy(
      {},
      {
        get(target, prop) {
          return tours[prop]
        },
        set(target, prop, value) {
          tours[prop] = value
          return true
        },
      },
    )

    /**
     * Create a new tour instance
     * @param {string} name - Tour name
     * @param {object} options - Shepherd tour options
     * @returns {Shepherd.Tour}
     */
    const createTour = (name, options = {}) => {
      const defaultOptions = {
        useModalOverlay: true,
        defaultStepOptions: {
          classes: 'shepherd-theme-custom',
          scrollTo: { behavior: 'smooth', block: 'center' },
          cancelIcon: {
            enabled: true,
          },
        },
      }

      const tour = new Shepherd.Tour({
        ...defaultOptions,
        ...options,
      })

      tours[name] = tour
      return tour
    }

    /**
     * Get a tour instance by name
     * @param {string} name - Tour name
     * @returns {Shepherd.Tour|undefined}
     */
    const getTour = name => tours[name]

    /**
     * Remove a tour instance
     * @param {string} name - Tour name
     */
    const removeTour = name => {
      if (tours[name]) {
        tours[name].cancel()
        delete tours[name]
      }
    }

    // Add to Vue prototype for global access
    Vue.prototype.$shepherd = {
      createTour,
      getTour,
      removeTour,
      tours,
    }

    // Add Shepherd class for direct access
    Vue.prototype.$Shepherd = Shepherd
  },
}

export default ShepherdPlugin
export { Shepherd }
