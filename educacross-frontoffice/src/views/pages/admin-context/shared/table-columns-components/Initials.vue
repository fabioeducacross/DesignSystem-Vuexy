<template>
  <div :class="getColor()">
    <div :class="getInitialColors()">
      <span v-b-tooltip.hover.bottom="teacherName">{{ initials }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  content: { type: Object, default: () => ({}) },
  color: { type: String, default: '' },
})

// Computed: teacherName
const teacherName = computed(() => {
  if (props.content) {
    const nameTeacher = props.content.name
    return nameTeacher
  }
  return ''
})

// Computed: initials
const initials = computed(() => {
  if (props.content && props.content.name) {
    const formatedInitials = props.content.name.split(' ')
    return formatedInitials.length === 1
      ? formatedInitials[0].charAt(0).toUpperCase()
      : formatedInitials[0].charAt(0).toUpperCase() +
          formatedInitials[formatedInitials.length - 1].charAt(0).toUpperCase()
  }
  return ''
})

// Methods
const getColor = () => {
  switch (props.color) {
    case 'red':
      return 'initialsRed'
    case 'purple':
      return 'initialsBlue'
    case 'yellow':
      return 'initialsYellow'
    default:
      return ''
  }
}

const getInitialColors = () => {
  switch (props.color) {
    case 'red':
      return 'initials__initials_red'
    case 'purple':
      return 'initials__initials_blue'
    case 'yellow':
      return 'initials__initials_yellow'
    default:
      return ''
  }
}
</script>

<style lang="scss" scoped>
  .initialsRed,
  .initialsBlue,
  .initialsYellow {
    border-radius: 100px;
    margin-right: 0.7rem;

    width: 2.5rem;
    height: 2.5rem;
    .initials__initials_red,
    .initials__initials_blue,
    .initials__initials_yellow {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 100%;

      span {
        font: Montserrat, sans-serif;
        font-size: 1rem;
        font-weight: 700;
        text-transform: uppercase;
      }
    }
  }
  .initialsRed {
    background: rgba(234, 84, 85, 0.12);

    .initials__initials_red {
      span {
        color: #ea5455;
      }
    }
  }

  .initialsBlue {
    background: rgba(115, 103, 240, 0.12);

    .initials__initials_blue {
      span {
        color: #7367f0;
      }
    }
  }

  .initialsYellow {
    background: rgba(255, 159, 67, 0.12);

    .initials__initials_yellow {
      span {
        color: #ff9f43;
      }
    }
  }
</style>