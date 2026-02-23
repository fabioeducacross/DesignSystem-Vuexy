<template>
  <div class="wrap-brand-logo mb-8">
    <b-img
      :src="getWhitelabelConfig('LightLogo')"
      :alt="`${name}`"
      :class="isEducaCross ? 'brand-logo' : 'wl-logo'"
    />
  </div>
</template>

<script setup>
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'

const name = getWhitelabelConfig('Name')

const isEducaCross = name === 'Educacross'
</script>

<style lang="scss" scoped>
  .wrap-brand-logo {
    .brand-logo,
    .wl-logo {
      width: auto;
      margin: 0 auto;
      max-height: 40px;
      @media (max-width: 768px) {
        max-height: 24px;
      }
    }
  }
</style>