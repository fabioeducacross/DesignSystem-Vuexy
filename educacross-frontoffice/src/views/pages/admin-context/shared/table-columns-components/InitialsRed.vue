<template>
  <div class="initialsRed">
    <div class="initials__initials_red">
      <span>{{ initials }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
})

import { computed } from 'vue'

const initials = computed(() => {
  if (props.name) {
    const formatedInitials = props.name.split(' ')

    return formatedInitials.length === 1
      ? formatedInitials[0].charAt(0).toUpperCase()
      : formatedInitials[0].charAt(0).toUpperCase() +
          formatedInitials[formatedInitials.length - 1].charAt(0).toUpperCase()
  }

  return ''
})
</script>

<style lang="scss">
  .initialsRed {
    background: rgba(234, 84, 85, 0.12);

    border-radius: 100px;
    margin-right: 0.7rem;

    width: 2.5rem;
    height: 2.5rem;

    .initials__initials_red {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 100%;

      span {
        font: Montserrat, sans-serif;
        font-size: 1rem;
        font-weight: 700;
        color: #ea5455;
        text-transform: uppercase;
      }
    }
  }
</style>