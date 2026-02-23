<template>
  <div id="app" :aria-user="role ? role : 'loggedOut'" :class="[skinClasses]" class="h-100">
    <div id="loading-bg">
      <div class="w-100 h-100 d-flex align-items-center justify-content-center flex-column gap-5">
        <div class="loading-logo">
          <img :src="logo" alt="Logo" />
        </div>
        <div class="loading">
          <div class="effect-1 effects"></div>
          <div class="effect-2 effects"></div>
          <div class="effect-3 effects"></div>
        </div>
      </div>
    </div>
    <component :is="layout">
      <router-view />
    </component>
    <div>
      <b-modal
        v-for="(item, itemIndex) in activePromptNPS"
        :id="`modal-${item.id}`"
        :key="item.id"
        :ref="el => { if (el) modalRefs[`modal-${item.id}`] = el }"
        :visible="item.showNps"
        content-class="shadow "
        hide-footer
        lazy
        modal-class="d-flex flex-column justify-content-center"
        no-close-on-backdrop
        no-close-on-esc
        scrollable
        size="lg"
        static
        @close="closeModal(`modal-${item.id}`)"
      >
        <nps
          :index="itemIndex"
          :is-teacher="false"
          :n-p-s-data="item"
          @close="closeNPS(itemIndex, item.id)"
        />
      </b-modal>
    </div>
    <fixed-sticky-footer />
    <PortalTarget multiple name="modals" />
  </div>
</template>

<script>
  // This will be populated in `beforeCreate` hook
  import '@core/assets/fonts/feather/iconfont.css'
  import { emitter } from '@/eventBus'
  import FixedStickyFooter from '@/components/FixedStickyFooter.vue'
  import nps from '@/components/NPS/NPS.vue'
  import menuColorsOptions from '@/consts/menuColors'
  import { getNps } from '@/services/shared/NPS/Nps.Service'
  import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
  import store from '@/store'
  import { loadWhitelabelColors } from '@/utils/whitelabelColorLoader'
  import useAppConfig from '@core/app-config/useAppConfig'
  import { $themeBreakpoints, $themeColors, $themeConfig } from '@themeConfig'
  import {
    computed,
    defineComponent,
    getCurrentInstance,
    onMounted,
    onUnmounted,
    ref,
  } from 'vue'
  import { useRouter } from '@core/utils/utils'
  import { provideToast } from 'vue-toastification/composition'
  import { mapMutations } from 'vuex'

  const LayoutVertical = () => import('@/layouts/vertical/LayoutVertical.vue')
  const LayoutHorizontal = () => import('@/layouts/horizontal/LayoutHorizontal.vue')
  const LayoutFull = () => import('@/layouts/full/LayoutFull.vue')

  export default defineComponent({
    components: {
      FixedStickyFooter,
      // Layouts
      LayoutHorizontal,
      LayoutVertical,
      LayoutFull,
      nps,
    },
    // ! We can move this computed: layout & contentLayoutType once we get to use Vue 3
    // Currently, router.currentRoute is not reactive and doesn't trigger any change
    computed: {
      layout() {
        if (this.$route.meta.layout === 'full' || !this.$route.name) return 'layout-full'
        return `layout-${this.contentLayoutType}`
      },
      contentLayoutType() {
        return this.$store.state.appConfig.layout.type
      },
    },
    beforeCreate() {
      // Set colors in theme
      const colors = [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'danger',
        'light',
        'dark',
      ]

      // eslint-disable-next-line no-plusplus
      for (let i = 0, len = colors.length; i < len; i += 1) {
        $themeColors[colors[i]] = getComputedStyle(document.documentElement)
          .getPropertyValue(`--${colors[i]}`)
          .trim()
      }

      // Set Theme Breakpoints
      const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl']

      // eslint-disable-next-line no-plusplus
      for (let i = 0, len = breakpoints.length; i < len; i += 1) {
        $themeBreakpoints[breakpoints[i]] = Number(
          getComputedStyle(document.documentElement)
            .getPropertyValue(`--breakpoint-${breakpoints[i]}`)
            .trim()
            .slice(0, -2),
        )
      }

      // Set RTL
      const { isRTL } = $themeConfig.layout
      document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')
    },

    setup() {
      const { skin, skinClasses } = useAppConfig()
      const logo = getWhitelabelConfig('MainLogo')
      const { route } = useRouter()
      const modalRefs = ref({})
      const showNPS = ref(false)
      const NPSData = ref([])
      const activePromptNPS = ref([])

      const userId = store.getters.accessUserData.UserId
      const role = computed(() => store.getters.accessRole)
      const institutionId = store.getters.getInstitutionId

      const { SET_CanVerifyNPS } = mapMutations({ SET_CanVerifyNPS: 'app/SET_CanVerifyNPS' })

      // If skin is dark when initialized => Add class to body
      if (skin.value === 'dark') document.body.classList.add('dark-layout')

      // Provide toast for Composition API usage
      // This for those apps/components which uses composition API
      // Demos will still use Options API for ease
      provideToast({
        hideProgressBar: true,
        closeOnClick: false,
        closeButton: false,
        icon: false,
        timeout: 7000,
        transition: 'Vue-Toastification__fade',
      })

      // Load menu colors
      if (import.meta.env.VITE_APP_WHITELABEL === 'educacross') {
        const menuColorsTeacher = menuColorsOptions.educacrossTeacher
        store.commit('app/SET_MENU_COLORS_TEACHER', menuColorsTeacher)
      } else if (import.meta.env.VITE_APP_WHITELABEL === 'seduc') {
        const menuColorsTeacher = menuColorsOptions.educacrossTeacher
        store.commit('app/SET_MENU_COLORS_TEACHER', menuColorsTeacher)
      } else {
        const menuColorsTeacher = menuColorsOptions[import.meta.env.VITE_APP_WHITELABEL]
        store.commit('app/SET_MENU_COLORS_TEACHER', menuColorsTeacher)
      }

      const menuColorsAdmin = menuColorsOptions.educacrossAdmin
      store.commit('app/SET_MENU_COLORS_ADMIN', menuColorsAdmin)

      const menuColorsResponsible = menuColorsOptions.educacrossResponsible
      store.commit('app/SET_MENU_COLORS_RESPONSIBLE', menuColorsResponsible)

      // Load whitelabel colors and apply them as CSS custom properties
      const whitelabelName = import.meta.env.VITE_APP_WHITELABEL || 'educacross'
      loadWhitelabelColors(whitelabelName)

      /*  // Set Window Width in store
      store.commit('app/UPDATE_WINDOW_WIDTH', window.innerWidth)
      const windowWidth = ref(window.innerWidth)

      const onWidthChange = () => {
        windowWidth.value = window.innerWidth
        store.commit('app/UPDATE_WINDOW_WIDTH', windowWidth.value)
      }
      onMounted(() => window.addEventListener('resize', onWidthChange))
      onUnmounted(() => window.removeEventListener('resize', onWidthChange))

      watch(windowWidth, val => {
        store.commit('app/UPDATE_WINDOW_WIDTH', val)
      }) */

      // Set window header title

      document.title = getWhitelabelConfig('appName')

      const handleMessage = event => {
        // We only accept messages from ourselves

        const message = event.data

        if (message.type === 'unity') {
          window.location.href = message.payload
        }
      }

      const getNpsInformation = () => {
        getNps()
          .then(response => {
            NPSData.value = response.data
            const npsSessionStorageData = sessionStorage.getItem('npsSessionStorage')
            const npsSessionStorageDataParsed = JSON.parse(npsSessionStorageData)

            if (NPSData.value.length > 0) {
              NPSData.value.forEach(surveyItem => {
                validateShowNPS(surveyItem, npsSessionStorageDataParsed)
              })
            }
            SET_CanVerifyNPS(false)
          })
          .catch(() => {
            // Handle error
          })
      }

      const validateShowNPS = (surveyData, npsArrayInSessionStorage) => {
        // Check if this NPS ID already exists in activePromptNPS to avoid duplicates
        if (activePromptNPS.value.some(item => item.id === surveyData.id)) {
          return
        }

        let npsInSessionStorage = null
        if (npsArrayInSessionStorage) {
          const npsIndexInSessionStorage = npsArrayInSessionStorage.findIndex(
            npsSaved =>
              npsSaved.npsId === surveyData.id &&
              userId === npsSaved.userId &&
              role.value === npsSaved.role &&
              institutionId === npsSaved.institutionId,
          )

          if (npsIndexInSessionStorage >= 0) {
            npsInSessionStorage = npsArrayInSessionStorage[npsIndexInSessionStorage]
          }

          if (
            npsInSessionStorage &&
            npsInSessionStorage.userId === userId &&
            npsInSessionStorage.institutionId === institutionId &&
            npsInSessionStorage.role === role.value
          ) {
            activePromptNPS.value.push({
              id: surveyData.id,
              question: surveyData.question,
              showNps: false,
            })
          } else {
            activePromptNPS.value.push({
              id: surveyData.id,
              question: surveyData.question,
              showNps: true,
            })
          }
        } else {
          activePromptNPS.value.push({
            id: surveyData.id,
            question: surveyData.question,
            showNps: true,
          })
        }
      }

      const closeNPS = (itemIndex, itemId) => {
        closeModal(`modal-${itemId}`)
      }

      const closeModal = modalId => {
        const modal = modalRefs.value[modalId]
        if (modal) {
          modal.hide()
        }
      }

      onMounted(() => {
        window.addEventListener('message', handleMessage, false)
        emitter.on('accessLogged', getNpsInformation)
      })

      onUnmounted(() => {
        window.removeEventListener('message', handleMessage, false)
        emitter.off('accessLogged', getNpsInformation)
      })

      return {
        skinClasses,
        logo,
        showNPS,
        NPSData,
        activePromptNPS,
        role,
        closeNPS,
        closeModal,
        modalRefs,
      }
    },
  })
</script>
<style lang="scss" scoped>
  .loading-logo img {
    height: 100%;
    max-height: 76px;
    max-width: 100%;
  }
</style>
<style>
  @font-face {
    font-family: 'Montserrat';
    src: url('~@/assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf')
      format('truetype-variations');
    font-weight: 100 900; /* This range covers the lightest to the boldest weight */
    font-style: normal;
  }

  @font-face {
    font-family: 'Montserrat Italic';
    src: url('~@/assets/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf')
      format('truetype-variations');
    font-weight: 100 900;
    font-style: italic;
  }

  @font-face {
    font-family: 'Dimbo';
    src: local('Dimbo'), url(./assets/fonts/dimbo-regular.ttf) format('truetype');
  }
</style>
