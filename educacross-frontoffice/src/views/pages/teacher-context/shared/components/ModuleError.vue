<template>
  <div class="d-flex flex-wrap">
    <div class="no-data-image-and-text">
      <span class="material-symbols-outlined bgcolor-patternSeven"> bar_chart </span>
      <div class="mt-6">
        <span
          v-if="dataListLength === 0 && serverErrorsMessage.message.length === 0"
          class="color-patternSeven title-moduleError"
        >
          {{ $t(customEmptyMessage) }}
        </span>
        <span
          v-for="(msgError, indexMsgError) in serverErrorsMessage.message"
          v-else
          :key="indexMsgError"
          class="color-patternSeven title-moduleError"
        >
          {{ msgError }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  customEmptyMessage: { type: String, required: true },
  dataListLength: { type: Number, required: true },
  serverErrorsMessage: { type: Object, required: true },
})
</script>

<style lang="scss" scoped>
  .no-data-image-and-text {
    width: 100%;
    text-align: center;
    .material-symbols-outlined {
      font-size: 8rem;
      border-radius: 12px;
      color: #f8f8f8;
    }
    .title-moduleError {
      font-weight: 600;
      font-size: 20px;
      line-height: 22px;
    }
  }
</style>