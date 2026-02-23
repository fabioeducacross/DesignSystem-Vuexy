import store from '@/store'
import { ref, computed } from 'vue'

export default function useVerticalLayout(navbarType, footerType) {
  const isVerticalMenuActive = ref(false)
  const keepVerticalMenuActive = ref(false)

  const currentBreakpoint = ref('xl')

  const isVerticalMenuCollapsed = computed({
    get() {
      return store.state.verticalMenu.isVerticalMenuCollapsed
    },
    set(value) {
      store.commit('verticalMenu/UPDATE_VERTICAL_MENU_COLLAPSED', value)
    },
  })

  const toggleVerticalMenuActive = value => {
    if (keepVerticalMenuActive.value && isVerticalMenuActive) return
    if (value instanceof Boolean) {
      isVerticalMenuActive.value = value
      isVerticalMenuCollapsed.value = value
    } else {
      isVerticalMenuActive.value = !isVerticalMenuActive.value
      isVerticalMenuCollapsed.value = isVerticalMenuActive.value
    }
  }

  const toggleKeepVerticalMenuActive = () => {
    keepVerticalMenuActive.value = !keepVerticalMenuActive.value
    isVerticalMenuActive.value = keepVerticalMenuActive.value
    isVerticalMenuCollapsed.value = keepVerticalMenuActive.value
  }

  const layoutClasses = computed(() => {
    const classes = []

    if (currentBreakpoint.value === 'xl') {
      classes.push('vertical-menu-modern')
      classes.push(isVerticalMenuCollapsed.value ? 'menu-expanded' : 'menu-collapsed')
    } else {
      classes.push('vertical-overlay-menu')
      classes.push(isVerticalMenuActive.value ? 'menu-open' : 'menu-hide')
    }

    // Navbar
    classes.push(`navbar-${navbarType.value}`)

    // Footer
    if (footerType.value === 'sticky') classes.push('footer-fixed')
    if (footerType.value === 'static') classes.push('footer-static')
    if (footerType.value === 'hidden') classes.push('footer-hidden')

    return classes
  })

  // ------------------------------------------------
  // Resize handler for Breakpoint
  // ------------------------------------------------
  // watch(currentBreakpoint, val => {
  //   isVerticalMenuActive.value = val === 'xl'
  //   console.log('currentBreakpoint')
  // })

  const resizeHandler = () => {
    // ? This closes vertical menu when title bar is shown/hidden in mobile browsers.
    // ? We will watch for breakpoint to overcome this issue
    // isVerticalMenuActive.value = window.innerWidth >= 1200

    // ! You can use store getter to get breakpoint
    if (window.innerWidth >= 1200) currentBreakpoint.value = 'xl'
    else if (window.innerWidth >= 992) currentBreakpoint.value = 'lg'
    else if (window.innerWidth >= 768) currentBreakpoint.value = 'md'
    else if (window.innerWidth >= 576) currentBreakpoint.value = 'sm'
    else currentBreakpoint.value = 'xs'

    if (currentBreakpoint.value === 'xl') {
      isVerticalMenuActive.value = true
      isVerticalMenuCollapsed.value = true
      keepVerticalMenuActive.value = true
    }
  }

  const overlayClasses = computed(() => {
    if (currentBreakpoint.value !== 'xl' && isVerticalMenuActive.value) return 'show'
    return null
  })

  const navbarTypeClass = computed(() => {
    if (navbarType.value === 'sticky') return 'fixed-top'
    if (navbarType.value === 'static') return 'navbar-static-top'
    if (navbarType.value === 'hidden') return 'd-none'
    return 'floating-nav'
  })

  const footerTypeClass = computed(() => {
    if (footerType.value === 'static') return 'footer-static'
    if (footerType.value === 'hidden') return 'd-none'
    return ''
  })

  return {
    isVerticalMenuActive,
    toggleVerticalMenuActive,
    isVerticalMenuCollapsed,
    layoutClasses,
    overlayClasses,
    navbarTypeClass,
    footerTypeClass,
    resizeHandler,
    keepVerticalMenuActive,
    toggleKeepVerticalMenuActive,
  }
}
