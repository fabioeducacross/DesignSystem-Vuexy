<template>
  <b-nav-item-dropdown
    id="dropdown-grouped"
    variant="link"
    class="dropdown-language"
    toggle-class="d-flex align-items-center"
    :right="right"
  >
    <template #button-content>
      <span class="d-flex align-items-center">
        <b-img :src="currentLocale.img" height="14px" width="22px" :alt="currentLocale.locale" />
        <span class="ml-50" :class="labelClass">
          {{ showFullName ? currentLocale.fullname : currentLocale.name }}
        </span>
      </span>
    </template>
    <b-dropdown-item
      v-for="localeObj in locales"
      :key="localeObj.locale"
      @click="setLocale(localeObj.locale)"
    >
      <span class="d-flex align-items-center">
        <b-img :src="localeObj.img" height="14px" width="22px" :alt="localeObj.locale" />
        <span class="ml-50">
          {{ showFullName ? localeObj.fullname : localeObj.name }}
        </span>
      </span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script setup>
import brFlag from '@/assets/images/flags/br.svg'
import deFlag from '@/assets/images/flags/de.svg'
import enFlag from '@/assets/images/flags/en.svg'
import frFlag from '@/assets/images/flags/fr.svg'
import { computed, getCurrentInstance } from 'vue'

const props = defineProps({
  showFullName: {
    type: Boolean,
    default: false,
  },
  labelClass: {
    type: String,
    default: 'text-body',
  },
  right: {
    type: Boolean,
    default: true,
  },
})

const { showFullName, labelClass, right } = props

const vm = getCurrentInstance().proxy

const locales = [
  {
    locale: 'en',
    img: enFlag,
    name: 'EN',
    fullname: 'English',
  },
  {
    locale: 'fr',
    img: frFlag,
    name: 'FR',
    fullname: 'French',
  },
  {
    locale: 'de',
    img: deFlag,
    name: 'DE',
    fullname: 'German',
  },
  {
    locale: 'pt-BR',
    img: brFlag,
    name: 'PT',
    fullname: 'Português (Brasil)',
  },
]

const currentLocale = computed(() => {
  return locales.find(l => l.locale === vm.$i18n.locale) || locales[0]
})

const setLocale = locale => {
  vm.$i18n.locale = locale
}
</script>

<style lang="scss" scoped>
#dropdown-grouped {
  list-style: none;
}
</style>