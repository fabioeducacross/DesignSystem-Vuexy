<template>
  <img :src="icon" :width="width" :height="height" class="icon" alt="Ícone de texto completo" />
</template>

<script>
  import icon from '@/assets/icons/exercises-types/full-text.svg'

  export default {
    data() {
      return {
        icon,
      }
    },
    props: {
      activate: { type: Boolean, default: true },
      width: { type: Number, default: 92 },
      height: { type: Number, default: 92 },
    },
  }
</script>

<style lang="scss" scoped>
  .icon {
    flex-shrink: 0;
    display: block;
  }
</style>
