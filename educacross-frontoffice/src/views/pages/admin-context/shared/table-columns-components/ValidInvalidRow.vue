<template>
  <div>
    <b-badge
      v-if="!content.class || content.class.classId === ''"
      v-b-tooltip.hover.top="'Turma inválida'"
      pill
      variant="danger"
      class="bg-st-danger color-danger"
    >
      Inválido
    </b-badge>

    <b-badge
      v-else-if="!content.name || content.name === ''"
      v-b-tooltip.hover.top="'Nome inválido'"
      pill
      variant="danger"
      class="bg-st-danger color-danger"
    >
      Inválido
    </b-badge>

    <b-badge
      v-else
      pill
      :variant="verifyContent ? 'success' : 'danger'"
      :class="`bg-st-${verifyContent ? 'success' : 'danger'} color-${verifyContent ? 'success' : 'danger'}`"
    >
      {{ verifyContent ? 'Válido' : 'Inválido' }}
    </b-badge>
  </div>
</template>

<script setup>
import userStatus from '@/consts/admin-context/enums/userStatus'
import { BBadge } from 'bootstrap-vue'

const props = defineProps({
  content: {
    type: Object,
    default: () => ({}),
  },
})

const verifyContent = computed(() => {
  let valid = true

  if (
    !props.content.name ||
    props.content.name === '' ||
    props.content.name.length > 50
  ) {
    valid = false
  }

  if (!props.content.class || props.content.class.classId === '') {
    valid = false
  }

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  if (
    props.content.sponsorEmail &&
    !regex.test(props.content.sponsorEmail)
  ) {
    valid = false
  }

  return valid
})
</script>