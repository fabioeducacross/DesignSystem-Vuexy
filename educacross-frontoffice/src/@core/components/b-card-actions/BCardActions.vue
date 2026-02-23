<template>
  <b-overlay
    v-if="!cardClosed"
    variant="white"
    :show="showLoading"
    spinner-variant="primary"
    blur="0"
    opacity=".75"
    rounded="sm"
  >
    <b-card
      ref="bCard"
      v-bind="cardAttrs"
      no-body
      :aria-expanded="!content_visible ? 'true' : 'false'"
      :aria-controls="parentID"
      :style="cardStyles"
      v-on="attrs.listeners"
    >
      <div v-if="showHeader" class="card-header">
        <div>
          <b-card-title>{{ attrs.title }}</b-card-title>
          <b-card-sub-title v-if="attrs['sub-title']">
            {{ attrs['sub-title'] }}
          </b-card-sub-title>
        </div>
        <b-card-actions-container
          v-if="showActions"
          :available-actions="availableActions"
          :is-collapsed="!content_visible"
          @collapse="triggerCollapse"
          @refresh="triggerRefresh"
          @close="triggerClose"
        />
      </div>
      <b-collapse
        :id="parentID"
        v-model="content_visible"
        :visible="content_visible"
        class="card-content"
      >
        <slot v-if="attrs['no-body'] !== undefined" />
        <b-card-body v-else>
          <slot />
        </b-card-body>
      </b-collapse>
    </b-card>
  </b-overlay>
</template>

<script setup>
import BCardActionsContainer from './BCardActionsContainer.vue'
import { BCard, BCardTitle, BCardSubTitle, BCardBody, BCollapse, BOverlay } from 'bootstrap-vue'
import { ref, computed, reactive, getCurrentInstance, onMounted, useAttrs } from 'vue'

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
  noActions: {
    type: Boolean,
    default: false,
  },
  actionCollapse: {
    type: Boolean,
    default: false,
  },
  actionRefresh: {
    type: Boolean,
    default: false,
  },
  actionClose: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['collapse', 'refresh', 'close'])

const attrs = useAttrs()

const parentID = ref('')
const content_visible = ref(!props.collapsed)
const showLoading = ref(false)
const cardClosed = ref(false)
const cardStyles = reactive({})

const cardAttrs = computed(() => {
  const cardAttrsCopy = JSON.parse(JSON.stringify(attrs))
  delete cardAttrsCopy.title
  delete cardAttrsCopy['sub-title']
  return cardAttrsCopy
})

const showHeader = computed(() => {
  return attrs.title || attrs['sub-title'] || !props.noActions
})

const showActions = computed(() => {
  if (props.noActions) return false
  return true
})

const availableActions = computed(() => {
  const actions = []
  const allFalse = props.actionCollapse || props.actionRefresh || props.actionClose
  if (props.actionCollapse || allFalse) actions.push('collapse')
  if (props.actionRefresh || allFalse) actions.push('refresh')
  if (props.actionClose || allFalse) actions.push('close')
  return actions
})

const bCard = ref(null)
const instance = getCurrentInstance()

onMounted(() => {
  parentID.value = String(Math.floor(Math.random() * 10) + 1)
})

function removeCard() {
  cardStyles.maxHeight = `${bCard.value?.$el?.clientHeight || 0}px`
  setTimeout(() => {
    cardStyles.maxHeight = '0px'
    cardStyles.overflow = 'hidden'
  }, 10)
}

function triggerCollapse() {
  content_visible.value = !content_visible.value
  emit('collapse')
}

function triggerRefresh() {
  showLoading.value = true
  emit('refresh')
}

function triggerClose() {
  removeCard()
  emit('close')
}
</script>

<style lang="scss" scoped>
  @import '@core/scss/base/bootstrap-extended/include';
  @import '@core/scss/base/components/variables-dark';

  .card {
    ::v-deep .card-header {
      .heading-elements {
        position: static;
        cursor: inherit;

        .list-inline {
          display: block;

          li {
            a {
              padding: 0;
            }

            &:not(:last-child) {
              margin-right: 1rem;
            }
          }
        }
      }
    }
  }

  .dark-layout {
    .b-overlay-wrap ::v-deep .b-overlay {
      .bg-white {
        background-color: $theme-dark-body-bg !important;
      }
    }
  }
</style>