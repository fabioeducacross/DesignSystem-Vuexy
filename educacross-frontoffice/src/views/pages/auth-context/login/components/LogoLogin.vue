<template>
  <img :src="getWhitelabelConfig('LogoLogin')" :alt="getWhitelabelConfig('Name')" />
</template>

<script setup>
  import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
</script>