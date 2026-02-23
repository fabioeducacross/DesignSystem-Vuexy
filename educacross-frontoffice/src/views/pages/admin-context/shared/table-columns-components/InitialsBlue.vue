<template>
  <div class="initialsBlue">
    <div class="initials__initials_blue">
      <span>{{ initials }}</span>
    </div>
  </div>
</template>

<script setup>
  // Props
  const props = defineProps({
    name: {
      type: String,
      default: '',
    },
  })

  // Computed
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
  .initialsBlue {
    background: rgba(115, 103, 240, 0.12);

    border-radius: 100px;
    margin-right: 0.7rem;

    width: 2.5rem;
    height: 2.5rem;

    .initials__initials_blue {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 100%;

      span {
        font: Montserrat, sans-serif;
        font-size: 1rem;
        font-weight: 700;
        color: #7367f0;
        text-transform: uppercase;
      }
    }
  }
</style>