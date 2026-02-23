<template>
  <b-card
    :class="{ 'internal-border': internalCheck }"
    footer-class="border-0"
    @click="onCheckChange(!check)"
  >
    <div class="d-flex justify-content-between">
      <b-form-checkbox v-model="internalCheck" @change="onCheckChange(!check)"></b-form-checkbox>
      <span
        v-show="audioEnabled"
        v-b-tooltip="`Áudio habilitado`"
        class="material-symbols-outlined text-muted"
        >volume_up</span
      >
    </div>
    <div class="flex flex-column align-items-center text-center mb-1">
      <div class="position-relative mb-50" @click.stop.capture="openBookDetails">
        <b-img-lazy
          v-b-tooltip.hover="'Ver detalhes'"
          v-bind="imageProps"
          :src="item.imageUrl"
          class="cursor-pointer"
          style="border-top-right-radius: 12px; border-bottom-right-radius: 12px"
        />

        <div
          v-if="loadingDetails"
          class="position-absolute h-100 w-100 d-flex"
          style="top: 0; left: 0; background: rgba(255, 255, 255, 0.5)"
        >
          <b-spinner variant="primary" class="m-auto"></b-spinner>
        </div>
      </div>

      <span>Autor: {{ item.author }}</span>
      <span
        class="font-bold text-primary underline cursor-pointer"
        @click.stop.capture="openBookDetails"
        >{{ item.title }}</span
      >
    </div>
    <template v-slot:footer>
      <div
        class="d-flex justify-content-center"
        :class="item.loading ? 'cursor-not-allowed' : 'cursor-pointer'"
        @click.stop.capture="onChange(!item.enabled)"
      >
        <div
          class="d-flex align-items-center gap-2 border rounded py-50 px-50 text-muted"
          :class="{ 'border-success': item.enabled }"
        >
          <span
            v-if="item.enabled && !item.loading"
            class="material-symbols-outlined fill text-success"
            style="font-size: 20px"
          >
            kid_star
          </span>
          <span v-else-if="!item.loading" class="material-symbols-outlined" style="font-size: 20px">
            kid_star
          </span>
          <b-spinner
            v-show="item.loading"
            :variant="item.enabled ? 'success' : ''"
            small
          ></b-spinner>
          <span :class="{ 'text-success': item.enabled }">Exibir livro na estante</span>
          <b-form-checkbox
            v-model="internalEnabled"
            class="custom-control-success book-custom-switch"
            switch
            :disabled="item.loading"
          >
            <span class="switch-icon-left">
              <feather-icon icon="CheckIcon" />
            </span>
            <span class="switch-icon-right">
              <feather-icon icon="XIcon" class="text-muted" />
            </span>
          </b-form-checkbox>
        </div>
      </div>
    </template>
  </b-card>
</template>

<script setup>
import { computed, getCurrentInstance } from 'vue'

// Props
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  check: {
    type: Boolean,
    default: false,
  },
  loadingDetails: {
    type: Boolean,
    default: false,
  },
  audioEnabled: {
    type: Boolean,
    default: false,
  },
})

// Emits
const emit = defineEmits(['update:enabled', 'update:check', 'open'])

// Internal state
const internalCheck = computed({
  get: () => props.check,
  set: () => {
    return
  },
})

const internalEnabled = computed({
  get: () => props.item.enabled,
  set: () => {
    return
  },
})

const internalLoadingDetails = computed(() => props.loadingDetails)

// Methods
const onChange = value => {
  if (props.item.loading) return
  emit('update:enabled', { id: props.item.id, enabled: value })
}

const onCheckChange = value => {
  emit('update:check', { id: props.item.id, checked: value })
}

const openBookDetails = () => {
  if (props.item.loading) return
  emit('open')
}

// Image options
const imageProps = {
  center: true,
  blank: true,
  blankColor: '#bbb',
  width: 74 * 2,
  height: 104.59 * 2,
}
</script>

<style scoped>
  .fill {
    font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  }
</style>

<style>
  .book-custom-switch.custom-switch .custom-control-label .switch-text-left,
  .book-custom-switch.custom-switch .custom-control-label .switch-text-right,
  .book-custom-switch.custom-switch .custom-control-label .switch-icon-left,
  .book-custom-switch.custom-switch .custom-control-label .switch-icon-right {
    top: 5px;
  }

  .internal-border {
    position: relative;
    box-shadow: inset 0 0 0 4px var(--primary); /* Mimics an inner outline of 5px solid red and doesn't affect the component's layout */
  }
</style>