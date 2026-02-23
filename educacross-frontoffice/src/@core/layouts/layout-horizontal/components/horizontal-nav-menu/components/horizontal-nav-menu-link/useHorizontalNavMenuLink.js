import { isNavLinkActive, navLinkProps } from '@core/layouts/utils'
import { ref } from 'vue'

export default function useHorizontalNavMenuLink(item) {
  const isActive = ref(false)

  const linkProps = navLinkProps(item)

  const updateIsActive = () => {
    isActive.value = isNavLinkActive(item)
  }

  return {
    isActive,
    linkProps,
    updateIsActive,
  }
}
