<template>
  <b-nav-item-dropdown id="dropdown-grouped" variant="link" class="dropdown-language" right>
    <template v-slot:button-content>
      <b-img :src="currentLocale.img" height="14px" width="22px" :alt="currentLocale.locale" />
      <span class="ml-50 text-body">{{ currentLocale.name }}</span>
    </template>
    <b-dropdown-item
      v-for="localeObj in locales"
      :key="localeObj.locale"
      @click="$i18n.locale = localeObj.locale"
    >
      <b-img :src="localeObj.img" height="14px" width="22px" :alt="localeObj.locale" />
      <span class="ml-50">{{ localeObj.name }}</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
  import { BNavItemDropdown, BDropdownItem, BImg } from 'bootstrap-vue'

  export default {
    components: {
      BNavItemDropdown,
      BDropdownItem,
      BImg,
    },
    setup() {
      const flagEn = new URL('@/assets/images/flags/en.svg', import.meta.url).href
      const flagFr = new URL('@/assets/images/flags/fr.svg', import.meta.url).href
      const flagDe = new URL('@/assets/images/flags/de.svg', import.meta.url).href
      const flagBr = new URL('@/assets/images/flags/br.svg', import.meta.url).href

      const locales = [
        {
          locale: 'en',
          img: flagEn,
          name: 'English',
        },
        {
          locale: 'fr',
          img: flagFr,
          name: 'French',
        },
        {
          locale: 'de',
          img: flagDe,
          name: 'German',
        },
        {
          locale: 'pt',
          img: flagBr,
          name: 'Portuguese',
        },
      ]

      return {
        locales,
      }
    },
    // ! Need to move this computed property to comp function once we get to Vue 3
    computed: {
      currentLocale() {
        return this.locales.find(l => l.locale === this.$i18n.locale)
      },
    },
  }
</script>

<style></style>
