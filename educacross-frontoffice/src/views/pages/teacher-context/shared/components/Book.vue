<template>
  <b-skeleton-wrapper :loading="loading">
    <template v-slot:loading>
      <b-card class="d-flex flex-column justify-content-between p-1 mb-4 cursor-pointer book-card">
        <b-skeleton-img class="book-image" width="170" />
        <b-skeleton class="h2" />
        <b-skeleton />
      </b-card>
    </template>
    <b-card
      no-body
      class="d-flex flex-column justify-content-between p-1 mb-4 cursor-pointer book-card"
      @click="click"
    >
      <b-img-lazy
        v-bind="image"
        :src="moduleData.imageUrl"
        alt="module-image"
        class="br-md book-image"
      />

      <h3 class="text-center mb-4">
        {{ moduleData.bookName }}
      </h3>

      <b-card-text class="text-center mb-2">
        <span>
          <span class="material-symbols-outlined"> map </span>
          {{ moduleData.amountMissions | formatNumber }}
          {{ $tc('Missions', moduleData.amountMissions) }}
        </span>
      </b-card-text>
    </b-card>
  </b-skeleton-wrapper>
</template>

<script setup>
import { colors } from '@themeConfig'

const props = defineProps({
  moduleData: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const click = () => {
  emit('click', props.moduleData.bookId)
}

const image = {
  blank: true,
  blankColor: colors.primary,
  width: 170,
  blankWidth: 170,
  center: true,
}
</script>

<style lang="scss" scoped>
.book-image {
  transform: translateY(-20%);
}

.book-card {
  flex: 1 1;
}
</style>