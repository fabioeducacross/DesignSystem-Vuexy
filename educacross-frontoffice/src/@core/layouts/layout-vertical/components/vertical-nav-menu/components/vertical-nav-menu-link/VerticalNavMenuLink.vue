<template>
  <li
    v-if="canViewVerticalNavMenuLink(item)"
    class="nav-item"
    :class="{
      active: isActive,
      disabled: item.disabled,
    }"
    :data-action="item.action"
    :data-resource="item.resource"
  >
    <b-link v-bind="linkProps" class="d-flex align-items-center">
      <i class="material-symbols-outlined">
        {{ item.icon || 'circle' }}
      </i>
      <span class="menu-title whitespace-normal">{{ item.title }}</span>
      <b-badge v-if="item.tag" pill :variant="item.tagVariant || 'primary'" class="mr-1 ml-auto">
        {{ item.tag }}
      </b-badge>
    </b-link>
  </li>
</template>

<script>
  import mixinVerticalNavMenuLink from './mixinVerticalNavMenuLink'
  import useVerticalNavMenuLink from './useVerticalNavMenuLink'
  import { abilityInstitution } from '@/libs/acl/ability.js'
  import { useUtils as useI18nUtils } from '@core/libs/i18n'
  import { BLink, BBadge } from 'bootstrap-vue'

  export default {
    components: {
      BLink,
      BBadge,
    },
    mixins: [mixinVerticalNavMenuLink],
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const { isActive, linkProps, updateIsActive } = useVerticalNavMenuLink(props.item)
      const { t } = useI18nUtils()

      const canViewVerticalNavMenuLink = item => {
        return abilityInstitution.can(item.action, item.resource)
      }

      return {
        isActive,
        linkProps,
        updateIsActive,

        // ACL
        canViewVerticalNavMenuLink,

        // i18n
        t,
      }
    },
  }
</script>
