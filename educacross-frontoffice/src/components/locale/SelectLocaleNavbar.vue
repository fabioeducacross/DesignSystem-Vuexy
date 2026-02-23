<template>
  <div>
    <b-dropdown-item @click.stop>
      <!-- toggle button -->
      <div
        v-b-toggle.collapse-1
        class="d-flex align-items-center justify-content-between"
        @click.stop
      >
        <div class="d-flex align-content-center">
          <b-img :src="currentLocale.img" height="24px" width="22px" :alt="currentLocale.locale" />
          <span class="ml-50">{{ currentLocale.name }}</span>
        </div>
        <span
          class="material-symbols-outlined not-expanded"
          :class="{ expanded: extended }"
        >
          expand_more
        </span>
      </div>
    </b-dropdown-item>

    <b-dropdown-item link-class="p-0 bg-white" @click.stop>
      <b-collapse id="collapse-1" v-model="extended">
        <b-dropdown-item
          v-for="localeObj in filteredLocale"
          :key="localeObj.locale"
          @click="setLocale(localeObj.locale)"
        >
          <span class="d-flex align-items-center pl-50">
            <b-img :src="localeObj.img" height="24px" width="22px" :alt="localeObj.locale" />
            <span class="ml-50">{{ localeObj.name }}</span>
          </span>
        </b-dropdown-item>
      </b-collapse>
    </b-dropdown-item>
  </div>
</template>

<script setup>
import brFlag from '@/assets/images/flags/br.svg'
import deFlag from '@/assets/images/flags/de.svg'
import enFlag from '@/assets/images/flags/en.svg'
import frFlag from '@/assets/images/flags/fr.svg'
import { computed, getCurrentInstance, ref } from 'vue'

const vm = getCurrentInstance().proxy
const extended = ref(false)

const locales = [
  {
    locale: 'en',
    img: enFlag,
    name: 'EN',
  },
  {
    locale: 'pt-BR',
    img: brFlag,
    name: 'PT',
  },
  {
    locale: 'fr',
    img: frFlag,
    name: 'French',
  },
  {
    locale: 'de',
    img: deFlag,
    name: 'German',
  },
]

const currentLocale = computed(() => {
  return locales.find(l => l.locale === vm.$i18n.locale)
})

const filteredLocale = computed(() => {
  return locales.filter(l => l.locale !== currentLocale.value?.locale)
})

const setLocale = locale => {
  vm.$i18n.locale = locale
}
</script>

<style lang="scss" scoped>
#dropdown-grouped {
  list-style: none;
}

.not-expanded {
  transform: rotate(0deg);
  transition: all 250ms ease-in;
}

.expanded {
  transform: rotate(180deg);
}
</style>