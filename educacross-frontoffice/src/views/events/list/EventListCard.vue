<template>
  <b-card body-class="flex flex-column">
    <div id="card-subject" class="d-flex align-items-center justify-content-center gap-2 mb-2">
      <section class="user-cell">
        <div class="image-container">
          <b-img-lazy v-bind="{ blank: true }" :src="data.imageUrl" fluid blank-color="#88f" />
        </div>
      </section>
    </div>
    <div id="card-status" class="d-flex align-items-center justify-content-center mb-2">
      <b-badge pill :variant="EventStatusEnum[data.status].variant">
        {{ EventStatusEnum[data.status].label }}
      </b-badge>
    </div>

    <p id="card-period" class="text-body text-center mb-2">
      Período de {{ data.startDate | formattedDate }} a
      {{ data.endDate | formattedDate }}
    </p>

    <div style="flex-grow: 1" class="mb-2">
      <h3 class="text-body text-center">
        {{ data.name }}
      </h3>
    </div>

    <div id="card-actions" class="d-flex align-items-center justify-content-center gap-2 mb-2">
      <span
        v-for="(action, index) in actions"
        v-show="action.isShow(data)"
        :key="index"
        v-b-tooltip.hover.top="action.tooltip(data)"
        class="material-symbols-outlined"
        :class="
          action.isEnabled(data)
            ? `${action.color(data)} cursor-pointer`
            : 'cursor-not-allowed text-muted'
        "
        @click="action.isEnabled(data) ? action.action(data) : null"
      >
        {{ action.icon(data) }}
      </span>
      <span
        :id="`inputWithClipboard${data.id}`"
        v-b-tooltip.hover.top="'Copiar link'"
        class="material-symbols-outlined"
        :class="enableCopy(data) ? 'text-primary cursor-pointer' : 'cursor-not-allowed text-muted'"
        :disabled="!enableCopy(data)"
        @click.stop="enableCopy(data) ? toClipboard(data) : false"
      >
        link
      </span>
    </div>
    <hr class="mb-1" />
    <div id="card-total" class="d-flex align-items-center justify-content-center gap-6">
      <div v-if="isNetworkManager" class="text-center">
        <h6 class="text-muted">Escolas</h6>
        <span class="font-weight-bold">{{ data.institutionsAmount | formatNumber }}</span>
      </div>
      <div class="text-center">
        <h6 class="text-muted">Alunos</h6>
        <span class="font-weight-bold">{{ data.studentsAmount | formatNumber }}</span>
      </div>
    </div>
    <b-tooltip
      custom-class="tooltip-container"
      :target="tooltipTarget"
      :show.sync="showTooltipFeedback"
      placement="top"
      triggers="click"
      variant="success"
    >
      Link copiado!
    </b-tooltip>
  </b-card>
</template>

<script setup>
import { EventStatusEnum } from '@/consts/StatusEnums.js'
import EventStatus from '@/consts/eventsEnum.js'
import store from '@/store'
import { getCurrentInstance, ref, nextTick } from 'vue'

// Props
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

const isNetworkManager = store.getters.accessRole === 'NetworkManager'
const isTeacher = store.getters.accessRole === 'Teacher'

const tooltipTarget = ref('')
const showTooltipFeedback = ref(false)

const enableCopy = event => {
  return event.status === EventStatus.InProgress
}

const vm = getCurrentInstance().proxy

const toClipboard = event => {
  vm.$copyText(
    `${import.meta.env.VITE_APP_DEEPLINK_URL}dl/events/${event.id}`,
  )
  tooltipTarget.value = `inputWithClipboard${event.id}`
  nextTick(() => {
    showTooltipFeedback.value = true
    setTimeout(() => {
      showTooltipFeedback.value = false
    }, 1500)
  })
}

// Expose to template
const data = props.data
const actions = props.actions
</script>

<style lang="scss" scoped>
  .user-cell {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
</style>