/**
 * Helper composable for creating Shepherd tours
 * Compatible with Vue 2.7 and Vue 3
 *
 * Migration guide from vue-tour to Shepherd:
 * - v-tour component → this.$shepherd.createTour()
 * - $tours.tourName.start() → tour.start()
 * - $tours.tourName.stop() → tour.cancel()
 * - steps prop → tour.addSteps()
 */

/**
 * Convert vue-tour step format to Shepherd format
 * @param {object} vueTourStep - Step in vue-tour format
 * @returns {object} - Step in Shepherd format
 */
export const convertVueTourStep = vueTourStep => {
  const shepherdStep = {
    id: vueTourStep.target || `step-${Math.random()}`,
    text: vueTourStep.content || '',
    attachTo: {
      element: vueTourStep.target,
      on: vueTourStep.placement || 'bottom',
    },
    classes: 'shepherd-theme-custom',
    buttons: vueTourStep.buttons || [],
  }

  // Add header if present
  if (vueTourStep.header) {
    shepherdStep.title = vueTourStep.header.title
  }

  // Add custom params
  if (vueTourStep.params) {
    shepherdStep.params = vueTourStep.params
  }

  return shepherdStep
}

/**
 * Create a tour with simplified API similar to vue-tour
 * @param {Vue} vm - Vue instance
 * @param {string} tourName - Tour name
 * @param {Array} steps - Array of steps
 * @param {object} options - Tour options
 * @returns {object} - Tour instance with helper methods
 */
export const useShepherdTour = (vm, tourName, steps = [], options = {}) => {
  // Create tour instance
  const tour = vm.$shepherd.createTour(tourName, {
    ...options,
    useModalOverlay: options.useModalOverlay !== false,
  })

  /**
   * Add step with custom header and actions template
   * @param {object} stepConfig - Step configuration
   */
  const addCustomStep = stepConfig => {
    const {
      target,
      header,
      content,
      placement = 'bottom',
      onNext,
      onPrevious,
      onComplete,
      params = {},
    } = stepConfig

    const step = {
      id: target || `step-${Math.random()}`,
      attachTo: target
        ? {
            element: target,
            on: placement,
          }
        : undefined,
      title: header?.title || '',
      text: content || '',
      classes: 'shepherd-theme-custom',
      buttons: [],
      when: {
        show() {
          // Custom show logic
          if (params.onShow) params.onShow()
        },
        hide() {
          // Custom hide logic
          if (params.onHide) params.onHide()
        },
      },
    }

    // Add buttons based on step position
    const currentSteps = tour.steps
    const isFirst = currentSteps.length === 0
    const isLast = stepConfig.isLast || false

    if (isFirst) {
      step.buttons.push({
        text: params.nextLabel || 'Próximo',
        classes: 'shepherd-button shepherd-button-primary',
        action() {
          if (onNext) onNext()
          tour.next()
        },
      })
    } else if (isLast) {
      step.buttons.push({
        text: params.previousLabel || 'Voltar',
        classes: 'shepherd-button shepherd-button-secondary',
        action() {
          if (onPrevious) onPrevious()
          tour.back()
        },
      })
      step.buttons.push({
        text: params.completeLabel || 'Finalizar',
        classes: 'shepherd-button shepherd-button-primary',
        action() {
          if (onComplete) onComplete()
          tour.complete()
        },
      })
    } else {
      step.buttons.push({
        text: params.previousLabel || 'Voltar',
        classes: 'shepherd-button shepherd-button-secondary',
        action() {
          if (onPrevious) onPrevious()
          tour.back()
        },
      })
      step.buttons.push({
        text: params.nextLabel || 'Próximo',
        classes: 'shepherd-button shepherd-button-primary',
        action() {
          if (onNext) onNext()
          tour.next()
        },
      })
    }

    tour.addStep(step)
  }

  /**
   * Add multiple steps at once
   * @param {Array} stepsArray - Array of step configurations
   */
  const addSteps = stepsArray => {
    stepsArray.forEach((step, index) => {
      addCustomStep({
        ...step,
        isLast: index === stepsArray.length - 1,
      })
    })
  }

  /**
   * Start the tour
   */
  const start = () => {
    tour.start()
  }

  /**
   * Stop/cancel the tour
   */
  const stop = () => {
    tour.cancel()
  }

  /**
   * Complete the tour
   */
  const complete = () => {
    tour.complete()
  }

  /**
   * Go to next step
   */
  const next = () => {
    tour.next()
  }

  /**
   * Go to previous step
   */
  const back = () => {
    tour.back()
  }

  // Auto-add steps if provided
  if (steps.length > 0) {
    addSteps(steps)
  }

  return {
    tour,
    addStep: addCustomStep,
    addSteps,
    start,
    stop,
    complete,
    next,
    back,
  }
}

/**
 * Create a compatibility layer for vue-tour API
 * Usage: const tour = createVueTourCompatible(this, 'tourName', steps)
 * Then use: vm.$tours.tourName.start()
 */
export const createVueTourCompatible = (vm, tourName, steps = []) => {
  const tourHelper = useShepherdTour(vm, tourName, steps)

  // Add to $tours object for vue-tour compatibility
  if (!vm.$tours) {
    vm.$tours = {}
  }

  vm.$tours[tourName] = {
    start: tourHelper.start,
    stop: tourHelper.stop,
    cancel: tourHelper.stop,
    complete: tourHelper.complete,
    next: tourHelper.next,
    back: tourHelper.back,
    tour: tourHelper.tour,
  }

  return vm.$tours[tourName]
}
