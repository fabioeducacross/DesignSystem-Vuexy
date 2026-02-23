<template>
  <ul>
    <component
      :is="resolveNavItemComponent(item)"
      v-for="(item, index) in items"
      :key="`${item.header || item.title}-${index}`"
      :item="item"
    />
    <!-- <li v-if="showLoginApp()" class="d-flex align-items-center mt-1">
      <b-overlay :show="loadingButton" class="ml-auto mr-auto" variant="primary" rounded>
        <b-button variant="primary" :disabled="loadingButton" class="shadow-none" @click="loginApp">
          <b-icon icon="controller" aria-hidden="true" />
          Acessar Aplicativo
        </b-button>
      </b-overlay>
    </li> -->
  </ul>
</template>

<script>
  import VerticalNavMenuGroup from '../vertical-nav-menu-group/VerticalNavMenuGroup.vue'
  import VerticalNavMenuHeader from '../vertical-nav-menu-header'
  import VerticalNavMenuLink from '../vertical-nav-menu-link/VerticalNavMenuLink.vue'
  import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from '@core/layouts/utils'
  import { provide, ref } from 'vue'

  export default {
    components: {
      VerticalNavMenuHeader,
      VerticalNavMenuLink,
      VerticalNavMenuGroup,
    },
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
    setup() {
      provide('openGroups', ref([]))
      const loadingButton = ref(false)

      return {
        resolveNavItemComponent,
        loadingButton,
      }
    },
  }
</script>
