<template>
  <footer v-if="isEducaCross" class="the-footer" :class="classes">
    <p>
      <span>{{ new Date().getFullYear() }} </span>
      <span>&copy; </span>
      <span class="text-footer-educa sm:inline-block"> Todos os direitos reservados - </span>
      <span> Educacross </span>
    </p>
  </footer>
</template>

<script setup>
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'

const props = defineProps({
  classes: {
    type: String,
  },
})

const name = getWhitelabelConfig('Name')

const isEducaCross = name === 'Educacross'
</script>

<style lang="scss" scoped>
@media (max-width: 767px) {
  .text-footer-educa {
    display: none;
  }
}
</style>