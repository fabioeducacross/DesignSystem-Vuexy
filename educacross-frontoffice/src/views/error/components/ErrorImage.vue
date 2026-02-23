<template>
  <div class="mb-2 max-w-full">
    <img :src="src" :alt="alt" class="mx-auto wrap-brand-image" />
  </div>
</template>

<script setup>
  // ⚠️ DO NOT import defineProps (compiler macro)
  const props = defineProps({
    src: {
      required: true,
    },
    alt: {
      required: false,
      type: String,
    },
  })
</script>

<style lang="scss" scoped>
  .wrap-brand-image {
    width: auto;
    margin: 0 auto;
    max-height: 250px;

    @media (max-width: 1440px) {
      max-height: 180px;
    }

    @media (max-width: 992px) {
      max-height: 150px;
    }
  }
</style>