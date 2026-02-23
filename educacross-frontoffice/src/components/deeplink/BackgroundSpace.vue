<template>
  <div class="flex justify-center items-center backgroundControl">
    <slot />
  </div>
</template>

<script setup>
  // No logic required for this component
</script>

<style lang="scss" scoped>
.backgroundControl {
  background-image: url('@/assets/images/images-educa/deep-link/Educa_BG_Espaco.svg');
  background-position: center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100%;
  width: 100%;
  min-height: 100vh;
  background-attachment: fixed;
}

// remove the background image on mobile
@media (max-width: 768px) {
  .backgroundControl {
    background-image: none !important;
  }
}
</style>