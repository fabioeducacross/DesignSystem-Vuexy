<template>
  <img :src="icon" :width="width" :height="height" alt="Ícone de lista de palavras" />
</template>

<script>
  import icon from '@/assets/icons/exercises-types/word-list.svg'

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

<style lang="scss" scoped></style>
