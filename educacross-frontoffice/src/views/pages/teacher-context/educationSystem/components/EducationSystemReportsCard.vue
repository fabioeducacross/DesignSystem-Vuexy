<template>
  <b-card body-class="flex flex-column">
    <div style="flex-grow: 1">
      <h3 class="text-body text-center">
        {{ data.missionName }}
      </h3>
    </div>
    <p id="card-period" class="text-sm text-body text-center">
      <strong>{{ $t('Book') }}: </strong><span class="color-patternSeven">{{ data.bookName }}</span>
    </p>
    <div class="d-flex align-items-center justify-content-center gap-2 mb-2">
      <img
        v-if="data.type === 3"
        v-b-tooltip="$t('collectiveMission')"
        src="@/assets/icons/mission-icons/missao-coletiva.svg"
      />

      <img
        v-if="data.type === 1"
        v-b-tooltip="$t('individualMission')"
        src="@/assets/icons/mission-icons/missao-individual.svg"
      />

      <img
        v-if="data.type === 2"
        v-b-tooltip="$t('mixedMission')"
        src="@/assets/icons/mission-icons/missao-mista.svg"
      />
    </div>
    <div id="card-status" class="d-flex align-items-center justify-content-center mb-">
      <b-badge pill :variant="data.enabled ? 'light-success' : 'light-danger'">
        {{ data.enabled ? $t('enabled') : $t('disabled') }}
      </b-badge>
    </div>
    <hr class="mb-1" />

    <ProgressBarHorizontal
      label="Progress"
      :value="data.progress"
      :progress-bar-colors="[
        {
          variant: 'primary',
          min: 0,
        },
      ]"
    />

    <div id="card-actions" class="d-flex align-items-center justify-content-center gap-2 mb-2">
      <span
        v-for="(action, index) in actions"
        :key="index"
        v-b-tooltip.hover.top="$t(action.tooltip(data))"
        class="text-primary cursor-pointer"
        @click="action.action(data)"
      >
        {{ $t(action.label) }}
      </span>
    </div>
  </b-card>
</template>

<script setup>
import ProgressBarHorizontal from '@/components/progessBar/ProgressBarHorizontal.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  actions: {
    type: Array,
    required: false,
  },
})
</script>