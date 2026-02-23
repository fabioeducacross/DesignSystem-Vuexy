<template>
  <div class="divider">
    <span class="px-1">
      <slot />
    </span>
  </div>
</template>

<script setup>
// No imports or logic needed for this component
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables/_variables.scss';

.divider {
  text-align: center;
  vertical-align: middle;

  position: relative;

  & > span {
    background: $white;
    position: relative;

    z-index: 2;
  }

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: $grey-light;

    position: absolute;
    top: calc(50% - 1px);

    z-index: 1;
  }
}
</style>