<template>
  <div class="d-flex gap-1 flex-wrap">
    <b-badge
      v-for="(c, index) in firstClasses"
      :key="`${uuid}-${index}`"
      v-b-tooltip="c.standard ? 'Turma Regular' : 'Turma Extra'"
      :variant="`${c.standard ? '' : 'light-'}primary`"
    >
      {{ c.name }}
    </b-badge>
    <b-badge v-if="moreClasses.length" :id="uuid" pill variant="light-primary">
      {{ moreClasses.length }}+
    </b-badge>
    <b-popover v-if="moreClasses.length" :target="uuid" triggers="hover">
      <div class="d-flex gap-1 flex-wrap flex-col">
        <b-badge v-for="c in moreClasses" :key="c.id" variant="light-primary">
          {{ c.name }}
        </b-badge>
      </div>
    </b-popover>
  </div>
</template>

<script setup>
import { uuidv4 } from '@/utils/utils'
import { computed, toRef } from 'vue'

const props = defineProps({
  classes: {
    type: Array,
    required: true,
  },
})

const uuid = uuidv4()
const classes = toRef(props, 'classes')

const firstClasses = computed(() => {
  const mainClass = classes.value.find(c => c.standard)
  const filteredClasses = classes.value.filter(c => !c.standard)

  const classesToReturn = [mainClass]

  if (filteredClasses.length > 0) {
    classesToReturn.push(filteredClasses[0])
  }

  return classesToReturn
})

const moreClasses = computed(() => {
  return classes.value.filter(c => !firstClasses.value.some(fc => fc && fc.id === c.id))
})
</script>