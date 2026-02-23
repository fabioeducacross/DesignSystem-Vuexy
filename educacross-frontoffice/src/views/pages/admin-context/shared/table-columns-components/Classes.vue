<template>
  <div :id="content.id.toString()">
    <span class="whitespace-no-wrap">
      {{ content.classes[0] && content.classes[0].className }}
      <b-badge v-if="content.classes.length > 0" variant="primary" pill>
        {{ content.classes[0] && content.classes[0].serieName }}
      </b-badge>
      <b-badge variant="primary" pill class="ml-1">
        <span v-if="content.classes.length > 1" :name="content.id">
          Mais {{ content.classes.length - 1 }}
        </span>
      </b-badge>
    </span>
    <b-popover :target="content.id.toString()" triggers="hover" placement="top">
      <div
        v-for="(eClass, eClassIndex) in content.classes"
        :key="eClassIndex"
        class="text-left mb-1 px-4 d-flex"
      >
        {{ eClass.className }}
        <b-badge variant="primary" pill class="ml-1">
          {{ eClass && eClass.serieName }}
        </b-badge>
      </div>
    </b-popover>
  </div>
</template>

<script setup>
import { BPopover } from 'bootstrap-vue'

const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
})
</script>