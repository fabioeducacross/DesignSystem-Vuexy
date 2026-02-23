<template>
  <b-card body-class="flex flex-column" class="cursor-pointer" @click="action(id)">
    <div id="card-subject" class="d-flex align-items-center justify-content-center gap-2 flex-grow">
      <section class="user-cell">
        <div class="image-container cursor-pointer mb-2">
          <b-img-lazy
            v-bind="{ blank: true }"
            :src="image ? image : getImageUrl(imageLink)"
            fluid
            blank-color="#88f"
          />
        </div>
        <h3 class="text-center text-primary mb-2">
          {{ educationSystemName }}
        </h3>
      </section>
    </div>
    <hr class="mb-2 mt-0" />
    <div id="card-total" class="d-flex align-items-center justify-content-center gap-6">
      <div class="text-center">
        <h6 class="text-body font-normal">Livros</h6>
        <span class="font-bold text-primary">{{ books | formatNumber }}</span>
      </div>
      <div class="text-center">
        <h6 class="text-body font-normal">Missões</h6>
        <span class="font-bold text-primary">{{ missions | formatNumber }}</span>
      </div>
    </div>
  </b-card>
</template>

<script setup>
  // Dynamically import all images from missions directory
  const missionImages = import.meta.glob('@/assets/images/missions/**/*', { eager: true, import: 'default' })

  // Props
  const props = defineProps({
    id: {
      required: true,
    },
    image: {
      type: String,
    },
    books: {
      type: Number,
    },
    missions: {
      type: Number,
    },
    action: {
      type: Function,
      default: () => {},
    },
    imageLink: { type: String, default: 'belinha-mochila.jpg' },
    educationSystemName: {
      type: String,
    },
  })

  // Methods
  const getImageUrl = (link) => {
    const imagePath = `/src/assets/images/missions/${link}`
    return missionImages[imagePath] || ''
  }

  // Expose props for template usage (script setup auto-exposes)
  // No emits needed
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables/_variables.scss';
  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    img {
      max-height: 100%;
      max-width: 100%;
      object-fit: scale-down;
    }
  }

  .text-title {
    color: $color-gray-theme;
  }
</style>