<template>
  <b-nav-item @click="skin = isDark ? 'light' : 'dark'">
    <feather-icon size="21" :icon="`${isDark ? 'Sun' : 'Moon'}Icon`" />
  </b-nav-item>
</template>

<script>
  import useAppConfig from '@core/app-config/useAppConfig'
  import { BNavItem } from 'bootstrap-vue'
  import { computed } from 'vue'

  export default {
    components: {
      BNavItem,
    },
    setup() {
      const { skin } = useAppConfig()

      const isDark = computed(() => skin.value === 'dark')

      return { skin, isDark }
    },
  }
</script>
