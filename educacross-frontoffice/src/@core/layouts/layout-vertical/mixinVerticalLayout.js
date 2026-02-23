import { $themeBreakpoints } from '@themeConfig'

export default {
  watch: {
    $route() {
      // Only auto-collapse on route change for screens below xl breakpoint (< 1200px)
      // On desktop/xl screens, keep the menu state as-is
      const currentBreakpoint = this.$store.getters['app/currentBreakPoint']
      if (currentBreakpoint !== 'xl') {
        this.isVerticalMenuActive = false
      }
    },
  },
}
