<template>
  <li
    v-if="canViewVerticalNavMenuGroup(item)"
    class="nav-item has-sub"
    :class="{
      open: isOpen,
      disabled: item.disabled,
      'sidebar-group-active': isActive,
    }"
  >
    <b-link class="d-flex align-items-center" @click="() => updateGroupOpen(!isOpen)">
      <i class="material-symbols-outlined">
        {{ item.icon || 'circle' }}
      </i>
      <span class="menu-title text-truncate">{{ t(item.title) }}</span>
      <b-badge v-if="item.tag" pill :variant="item.tagVariant || 'primary'" class="mr-1 ml-auto">
        {{ item.tag }}
      </b-badge>
    </b-link>
    <b-collapse v-model="isOpen" class="menu-content" tag="ul">
      <component
        :is="resolveNavItemComponent(child)"
        v-for="(child, index) in item.children"
        :key="`${child.header || child.title}-${index}`"
        ref="groupChild"
        :item="child"
      />
    </b-collapse>
  </li>
</template>

<script>
  import VerticalNavMenuHeader from '../vertical-nav-menu-header'
  import VerticalNavMenuLink from '../vertical-nav-menu-link/VerticalNavMenuLink.vue'
  import mixinVerticalNavMenuGroup from './mixinVerticalNavMenuGroup'
  // Composition Function
  import useVerticalNavMenuGroup from './useVerticalNavMenuGroup'
  import { abilityInstitution } from '@/libs/acl/ability.js'
  import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from '@core/layouts/utils'
  import { useUtils as useI18nUtils } from '@core/libs/i18n'
  import { BLink, BBadge, BCollapse } from 'bootstrap-vue'

  export default {
    name: 'VerticalNavMenuGroup',
    components: {
      VerticalNavMenuHeader,
      VerticalNavMenuLink,
      BLink,
      BBadge,
      BCollapse,
    },
    mixins: [mixinVerticalNavMenuGroup],
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const { isOpen, isActive, updateGroupOpen, updateIsActive } = useVerticalNavMenuGroup(
        props.item,
      )

      const { t } = useI18nUtils()

      const canViewVerticalNavMenuGroup = item => {
        const hasAnyVisibleChild = item.children.some(i =>
          abilityInstitution.can(i.action, i.resource),
        )

        if (!(item.action && item.resource)) {
          return hasAnyVisibleChild
        }
        return abilityInstitution.can(item.action, item.resource) && hasAnyVisibleChild
      }

      return {
        resolveNavItemComponent,
        isOpen,
        isActive,
        updateGroupOpen,
        updateIsActive,

        // ACL
        canViewVerticalNavMenuGroup,

        // i18n
        t,
      }
    },
  }
</script>

<style></style>
