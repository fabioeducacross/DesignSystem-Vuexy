<script setup>
  import { writingPhaseEnumLegend } from '@/consts/legends/writingPhasesEnum'
</script>

<template>
  <b-card no-body>
    <b-card-body class="text-center">
      {{ writingPhaseEnumLegend.text }}:
      <b-badge
        v-for="(item, index) in writingPhaseEnumLegend.enum"
        :key="index"
        :variant="`outline-${item.variant}`"
        class="mr-50 mb-50 uppercase"
        active
        pill
      >
        {{ item.text }}
      </b-badge>
    </b-card-body>
  </b-card>
</template>