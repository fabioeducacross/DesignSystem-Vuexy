<template>
  <b-card body-class="flex flex-column align-items-center">
    <b-badge
      pill
      :variant="`light-${StatusEnum[data.status].variant}`"
      class="mb-1"
      style="width: 115px"
    >
      {{ StatusEnum[data.status].label }}
    </b-badge>

    <p id="evaluation-card-period" class="text-sm text-body text-center">
      {{ data.startDate | formattedDate }} a
      {{ data.endDate | formattedDate }}
    </p>

    <h5 class="text-body text-center">
      <span class="font-bold"> {{ data.evaluationName }}</span>
    </h5>

    <div class="d-flex align-items-center justify-content-center gap-2 mb-2">
      <subject v-for="(sId, index) in data.subjectsIds" :key="index" :subject-id="sId" :size="24" />
    </div>

    <div v-if="$can(ACTION.READ, PERMISSION.GENERAL.TEACHER) && data.progress" class="w-100 mb-2">
      <ProgressBarHorizontalV2
        height="12px"
        :value="data.progress.students"
        :max="data.progress.totalStudents"
        enum="progress"
      >
        <template v-slot:description>
          <b-badge
            v-if="progressVariant"
            pill
            :variant="`light-${progressVariant.variant}`"
            :class="`border-${progressVariant.variant}`"
            class="ml-auto"
          >
            {{ $t(progressVariant.badgeLabel) }}
          </b-badge>
        </template>
      </ProgressBarHorizontalV2>
    </div>

    <div v-else class="flex-1 h-100"></div>

    <div class="d-flex align-items-center justify-content-center gap-2">
      <span
        v-for="(action, index) in evaluationActions"
        v-show="action.show(data)"
        :key="index"
        v-b-tooltip.hover.top="action.tooltip(action.isEnabled(data), data)"
        :class="
          action.isEnabled(data)
            ? `${action.color(data)} cursor-pointer`
            : 'cursor-not-allowed text-muted'
        "
        class="material-symbols-outlined"
        @click="action.isEnabled(data) ? action.action(data) : null"
      >
        {{ action.icon(data) }}
      </span>
    </div>
    <hr v-if="!$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)" class="mb-1 w-100" />
    <div
      v-if="!$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)"
      class="d-flex align-items-center justify-content-center gap-6"
    >
      <div v-if="isNetworkManager" class="text-center">
        <h6 class="font-weight-normal">Escolas</h6>
        <span class="h5">{{ data.totalInstitutions | formatNumber }}</span>
      </div>
      <div class="text-center">
        <h6 class="font-weight-normal">Turmas</h6>
        <span class="h5">{{ data.totalClasses | formatNumber }}</span>
      </div>
      <div class="text-center">
        <h6 class="font-weight-normal">Alunos</h6>
        <span class="h5">{{ data.totalStudents | formatNumber }}</span>
      </div>
    </div>
  </b-card>
</template>

<script setup>
import ProgressBarHorizontalV2 from '@/components/progessBar/ProgressBarHorizontalV2.vue'
import subject from '@/components/subjects/subjects.vue'
import { StatusEnum } from '@/consts/evaluationsEnum.js'
import { getVariantByRule } from '@/consts/legends'
import { ACTION, PERMISSION } from '@/consts/permissions'
import store from '@/store'
import { computed } from 'vue'

// Props
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  evaluationActions: {
    type: Array,
    required: false,
  },
  enableAction: {
    type: Function,
    required: true,
  },
})

// Computed  
const isNetworkManager = computed(() => store.getters.accessRole === 'NetworkManager')

const progressVariant = computed(() => {
  if (!props.data.progress) return null
  return getVariantByRule(props.data.progress.progress, 'progress')
})

// Expose for template
// (Note: objects imported are available directly in template)
</script>