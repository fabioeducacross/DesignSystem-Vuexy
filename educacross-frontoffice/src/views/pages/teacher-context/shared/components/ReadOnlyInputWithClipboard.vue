<template>
  <div class="text-left display-box">
    <b-input-group>
      <b-form-input
        v-model="inputData"
        type="text"
        name="name"
        readonly
        :label="inputLabel"
        class=""
      />
      <template v-slot:append>
        <b-button variant="outlined" class="input-append" @click="toClipboard()">
          <span id="inputWithClipboard" class="material-symbols-outlined"> content_copy </span>
        </b-button>
      </template>
    </b-input-group>

    <b-tooltip
      custom-class="tooltip-container"
      :show.sync="showTooltipFeedback"
      target="inputWithClipboard"
      placement="top"
      triggers="click"
      variant="success"
    >
      {{ $t('copied') }}
    </b-tooltip>
  </div>
</template>

<script setup>
import { BTooltip } from 'bootstrap-vue'
import { ref } from 'vue'

const props = defineProps({
  inputData: { type: String, required: true },
  inputLabel: { type: String, required: true },
})

const showTooltipFeedback = ref(false)

const toClipboard = () => {
  navigator.clipboard.writeText(props.inputData).then(
    () => {
      showTooltipFeedback.value = true
      setTimeout(() => {
        showTooltipFeedback.value = false
      }, 1500)
    }
  )
}
</script>

<style lang="scss" scoped>
  .input-append {
    border: 1px solid #d8d6de;
    padding: 0.438rem 1rem;
    .material-symbols-outlined {
      font-size: 1rem;
    }
  }

  .tooltip-container {
    z-index: 99999 !important;
    &::v-deep .tooltip-inner {
      z-index: 99999 !important;
    }
  }
</style>