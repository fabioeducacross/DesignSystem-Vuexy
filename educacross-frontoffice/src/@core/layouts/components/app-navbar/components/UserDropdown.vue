<template>
  <b-nav-item-dropdown
    right
    toggle-class="d-flex align-items-center dropdown-user-link"
    class="dropdown-user"
  >
    <template v-slot:button-content>
      <div class="d-sm-flex d-none user-nav">
        <p class="user-name font-weight-bolder mb-0">
          {{ $store.getters.accessUserData?.Name || $store.getters.accessUserData?.UserName }}
        </p>
        <span class="user-status">{{ $store.getters.accessRole }}</span>
      </div>
      <b-avatar
        size="40"
        :src="$store.getters.accessUserData?.Avatar"
        variant="light-primary"
        badge
        class="badge-minimal"
        badge-variant="success"
      >
        <feather-icon v-if="!$store.getters.accessUserData?.FullName" icon="UserIcon" size="22" />
      </b-avatar>
    </template>

    <b-dropdown-item :to="{ name: 'pages-profile' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="UserIcon" class="mr-50" />
      <span>Profile</span>
    </b-dropdown-item>
    <b-dropdown-item :to="{ name: 'apps-email' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="MailIcon" class="mr-50" />
      <span>Inbox</span>
    </b-dropdown-item>
    <b-dropdown-item :to="{ name: 'apps-todo' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="CheckSquareIcon" class="mr-50" />
      <span>Task</span>
    </b-dropdown-item>
    <b-dropdown-item :to="{ name: 'apps-chat' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="MessageSquareIcon" class="mr-50" />
      <span>Chat</span>
    </b-dropdown-item>

    <b-dropdown-divider />

    <b-dropdown-item :to="{ name: 'pages-account-setting' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="SettingsIcon" class="mr-50" />
      <span>Settings</span>
    </b-dropdown-item>
    <b-dropdown-item :to="{ name: 'pages-pricing' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="CreditCardIcon" class="mr-50" />
      <span>Pricing</span>
    </b-dropdown-item>
    <b-dropdown-item :to="{ name: 'pages-faq' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="HelpCircleIcon" class="mr-50" />
      <span>Central de Ajuda</span>
    </b-dropdown-item>
    <b-dropdown-item link-class="d-flex align-items-center" @click="logout">
      <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
      <span>Logout</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
  import { initialAbility } from '@/libs/acl/config'
  import { avatarText } from '@core/utils/filter'
  import { BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar } from 'bootstrap-vue'

  export default {
    components: {
      BNavItemDropdown,
      BDropdownItem,
      BDropdownDivider,
      BAvatar,
    },
    data() {
      return {
        avatarText,
      }
    },
    methods: {
      logout() {
        // Reset ability
        this.$ability.update(initialAbility)

        // Redirect to login page
        this.$router.push({ name: 'login' })
      },
    },
  }
</script>
