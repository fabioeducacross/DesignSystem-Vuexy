<template>
  <div
    :key="loading"
    class="main-menu menu-fixed menu-accordion menu-shadow"
    :class="[
      {
        expanded: isVerticalMenuActive,
        'menu-state-expanded': isVerticalMenuCollapsed,
      },
      skin === 'semi-dark' ? 'menu-dark' : 'menu-light',
    ]"
    @mouseenter="toggleVerticalMenuActive(true)"
    @mouseleave="toggleVerticalMenuActive(false)"
  >
    <vue-perfect-scrollbar
      :settings="perfectScrollbarSettings"
      class="main-menu-content scroll-area"
      tagname="ul"
    >
      <vertical-nav-menu-items :items="navMenuItems" class="navigation navigation-main" />
    </vue-perfect-scrollbar>

    <!-- Powered by Educacross Logo -->
    <div
      v-if="getWhitelabelConfig('Id') === WhitelabelEnum.SomosPlay"
      class="d-flex flex-column align-items-center justify-content-center position-absolute w-100 powered-by-footer"
    >
      <!-- Divider -->
      <hr class="menu-divider" />
      <div class="d-flex align-items-center justify-content-center">
        <span class="powered-text text-nowrap transition-all">Powered by</span>
        <img
          :src="require('@/assets/images/educacross/logo-mini-menu.svg')"
          alt="Educacross"
          class="logo-img transition-all"
        />
        <span class="font-semibold text-nowrap transition-all">Educacross</span>
      </div>
    </div>
  </div>
</template>

<script>
  import VerticalNavMenuItems from './components/vertical-nav-menu-items/VerticalNavMenuItems.vue'
  import useVerticalNavMenu from './useVerticalNavMenu'
  import { WhitelabelEnum } from '@/consts/WhitelabelEnum'
  import ROLE_ITEMS, { fetchAndFormatEducationSystemItems } from '@/navigation/vertical'
  import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
  import store from '@/store'
  import utils from '@/utils/teacher-utils/utils'
  import useAppConfig from '@core/app-config/useAppConfig'
  import { $themeConfig } from '@themeConfig'
  import { computed, defineComponent, getCurrentInstance, provide, ref } from 'vue'
  import { mapGetters } from 'vuex'

  export default defineComponent({
    components: {
      VerticalNavMenuItems,
    },
    props: {
      isVerticalMenuActive: {
        type: Boolean,
        required: true,
      },
      toggleVerticalMenuActive: {
        type: Function,
        required: true,
      },
    },
    data() {
      return {
        componentKey: 0,
        profileStudents: [],
        logo: '',
      }
    },
    computed: {
      ...mapGetters(['accessContext', 'GET_GLOBAL_SUBJECT_ID']),
      getImageLogoURL: {
        get() {
          return this.logo
        },
        set(newValue) {
          return newValue
        },
      },
      role() {
        return this.$store.getters.accessRole
      },
    },
    watch: {
      '$route.fullPath': function () {
        const { menuEducationSystemId } = this.$route.meta

        if (menuEducationSystemId) {
          utils.educationSystem.setColor()
        } else {
          utils.educationSystem.resetColors()
        }
      },
    },
    beforeMount() {
      utils.educationSystem.setColor()
    },
    setup(props) {
      const {
        isMouseHovered,
        isVerticalMenuCollapsed,
        collapseTogglerIcon,
        toggleCollapsed,
        updateMouseHovered,
      } = useVerticalNavMenu(props)

      const vm = getCurrentInstance().proxy

      const { skin } = useAppConfig()
      const loading = ref(0)

      vm.$bus.on('accessLogged', () => {
        loading.value++
      })

      /**
       * ROLE is a computed property that returns the role of the user.
       * If the user is not a Teacher or Student, it will return 'Admin'.
       */
      const ROLE = computed(() => {
        const role = store.getters.accessRole
        if (
          role !== 'Teacher' &&
          role !== 'Student' &&
          role !== 'Auditor' &&
          role !== 'NetworkManager'
        ) {
          return 'Admin'
        }

        return role
      })

      /**
       * navMenuItems is a computed property that returns an array of navigation menu items
       * based on the user's role (Admin, Teacher, Student).
       * If the user is a Teacher or Student, it also fetches and formats education system items
       * and adds them to the navigation menu.
       * The returned array of menu items is sorted by their 'order' property.
       */
      const navMenuItems = computed(() => {
        const res = []
        if (ROLE.value) res.push(...ROLE_ITEMS[ROLE.value])

        if (ROLE.value === 'Teacher' || ROLE.value === 'Student') {
          res.push(...fetchAndFormatEducationSystemItems(ROLE.value))
        }

        return res.sort((a, b) => a.order - b.order)
      })

      provide('isMouseHovered', isMouseHovered)

      const perfectScrollbarSettings = {
        maxScrollbarLength: 60,
        wheelPropagation: false,
      }

      const collapseTogglerIconFeather = computed(() =>
        collapseTogglerIcon.value === 'unpinned' ? 'CircleIcon' : 'DiscIcon',
      )

      // App Name
      const { appName, appLogoImage } = $themeConfig.app

      return {
        navMenuItems,
        perfectScrollbarSettings,
        isVerticalMenuCollapsed,
        collapseTogglerIcon,
        toggleCollapsed,
        isMouseHovered,
        updateMouseHovered,
        collapseTogglerIconFeather,

        // Skin
        skin,
        // App Name
        appName,
        appLogoImage,
        loading,
        WhitelabelEnum,
        getWhitelabelConfig,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .navbar-header {
    padding: 20px 19px 16px 23px;
    height: auto;
  }

  .logo-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      object-fit: cover;
      max-height: 150px;
      max-width: 85%;
    }
  }

  .container-studentProfile-verticalMenu {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 15px;

    .box-studentProfile-verticalMenu {
      border-radius: 50%;
      width: 55px;
      height: 55px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-spacing: 10px;
      position: relative;
    }

    .border-selected-verticalMenu::after,
    .border-unselected-verticalMenu::after {
      content: '';
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      border-radius: 50%;
    }

    .border-selected-verticalMenu::after {
      border: 5px solid #2279b1;
    }

    .border-unselected-verticalMenu::after {
      border: 5px solid transparent;
    }

    .img-studentProfile-verticalMenu {
      width: auto;
      height: 35px;
    }
  }

  .container-socialNetwork {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    bottom: 0px;
    padding: 0.5rem 2.5rem 0.75rem 2rem;

    .icon-socialNetwork {
      cursor: pointer;
      color: rgba(255, 255, 255, 0.5);
    }
  }

  // Powered by footer
  .powered-by-footer {
    bottom: 0;
    padding: 1rem 0.5rem;
    background: inherit;
    z-index: 10;
    color: var(--menuFontColor);

    .menu-divider {
      width: 13.5rem;
      margin: 0 0 1rem 0;
      border: 0;
      border-top: 0.125rem solid #00000033;
    }

    .logo-img {
      max-width: 5rem;
      height: auto;
      margin-left: 0.5875rem;
      margin-right: 0.2687rem;
    }

    .powered-text {
      font-size: 0.75rem;
    }

    span {
      color: var(--menuFontColor);
    }
  }

  // When menu is collapsed (not in expanded state), hide the powered-by footer
  .main-menu:not(.menu-state-expanded) {
    .powered-by-footer {
      opacity: 0;
      visibility: hidden;
    }
  }

  // Adjust the menu content to have padding at bottom to avoid overlap
  .main-menu-content {
    padding-bottom: 5.625rem !important;
  }

  // Transition utility class
  .transition-all {
    transition: all 0.25s ease;
  }
</style>

<style lang="scss">
  @import '@core/scss/base/core/menu/menu-types/vertical-menu.scss';
</style>
