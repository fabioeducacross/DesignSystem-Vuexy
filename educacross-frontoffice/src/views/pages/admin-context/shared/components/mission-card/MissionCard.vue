<template>
  <b-card class="mission-card">
    <h2 class="mission-card-title">
      {{ data ? data.name : cardTitle }}
    </h2>
    <div class="mission-card-image-wrapper">
      <img
        class="mission-card-image"
        :src="data ? data.imageUrl : getImageUrl(link)"
      />
    </div>

    <div class="mission-card-button-wrapper mt-2">
      <b-button variant="primary" @click="buttonEventClick"> Ver turmas </b-button>
    </div>
  </b-card>
</template>

<script setup>
import { BButton, BCard } from 'bootstrap-vue'

// Dynamically import all images from missions directory
const missionImages = import.meta.glob('@/assets/images/missions/**/*', { eager: true, import: 'default' })

const props = defineProps({
  link: { type: String, default: '' },
  cardTitle: { type: String, default: '' },
  data: { type: Object, default: () => {} },
  buttonFunction: { type: Function, default: () => {} },
})

const emit = defineEmits(['buttonClick'])

const percent = ref(0)

const getImageUrl = (link) => {
  const imagePath = `/src/assets/images/missions/${link}`
  return missionImages[imagePath] || ''
}

const buttonEventClick = () => {
  if (props.data) {
    emit('buttonClick', props.data.id)
  } else {
    emit('buttonClick')
  }
}
</script>

<style lang="scss" scoped>
  .mission-card {
    width: 20.4rem;
    margin: 2rem 2rem 0 0;
  }

  .mission-card-title {
    text-align: center;

    font-weight: 500;
    font-size: 18px;
    line-height: 21px;

    color: #5e5873;
  }

  .mission-card-image-wrapper {
    display: flex;
    justify-content: center;

    height: 120px;
  }

  .mission-card-image {
    max-height: 120px;
    max-width: 250px;
  }

  .mission-card-count {
    text-align: center;

    font-weight: 600;
    font-size: 14px;
    line-height: 24px;

    color: #6e6b7b;
  }

  .mission-card-progress {
    text-align: center;

    font-weight: 400;
    font-size: 14px;
    line-height: 24px;

    color: #6e6b7b;
  }

  .mission-card-button-wrapper {
    display: flex;
    justify-content: center;
  }
</style>