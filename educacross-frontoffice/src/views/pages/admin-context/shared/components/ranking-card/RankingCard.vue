<template>
  <b-card class="ranking-card">
    <h2 class="ranking-card-title">Ranking</h2>
    <h2 class="ranking-card-sub-title">
      {{ data ? data.name : subTitle }}
    </h2>
    <div class="ranking-card-image-wrapper">
      <img
        class="ranking-image"
        :src="data ? data.imageUrl : getImageUrl(getImageName())"
      />
    </div>
    <div class="ranking-card-button-wrapper">
      <b-button variant="primary" @click="toList(data)"> Acessar </b-button>
    </div>
  </b-card>
</template>

<script setup>
import { BButton, BCard } from 'bootstrap-vue'

// Dynamically import all ranking images
const rankingImages = import.meta.glob('@/assets/images/ranking/*', { eager: true, import: 'default' })

// Props
const props = defineProps({
  data: { type: Object, default: () => ({}) },
  subTitle: { type: String, required: false },
  type: { type: String, required: true },
})

// Router and Store
import store from '@/store'
import { useRouter } from 'vue-router/composables'
const router = useRouter()

// Methods
const getImageUrl = (imageName) => {
  const imagePath = `/src/assets/images/ranking/${imageName}`
  return rankingImages[imagePath] || ''
}

const toList = (data) => {
  switch (props.type) {
    case 'school':
      store.dispatch('setSelectedRankingAction', {
        rankingName: 'Missões da Escola',
        routeName: 'schoolRanking',
      })
      router.push({
        name: 'schoolRanking',
      })
      break
    case 'educationSystem':
      store.dispatch('setSelectedRankingAction', data)
      router.push({
        name: 'educationSystemRanking',
        params: {
          educationSystemId: data.id,
        },
      })
      break
    case 'island':
      store.dispatch('setSelectedRankingAction', {
        rankingName: 'Ilhas',
        routeName: 'islandRanking',
      })
      router.push({
        name: 'islandRanking',
      })
      break
    default:
      break
  }
}

const getImageName = () => {
  switch (props.type) {
    case 'school':
      return 'educacrossSchool.png'
    case 'educationSystem':
      return 'educationSystem.png'
    case 'island':
      return 'mathIsland.png'
    default:
      return '#'
  }
}
</script>

<style lang="scss" scoped>
  .ranking-card {
    width: 20.4rem;
    margin: 2rem 2rem 0 0;
  }

  .ranking-card-title {
    text-align: center;

    font-weight: 500;
    font-size: 18px;
    line-height: 21px;

    color: #7367f0;
  }

  .ranking-card-sub-title {
    text-align: center;

    font-weight: 700;
    font-size: 18px;
    line-height: 21px;

    color: #7367f0;
  }

  .ranking-card-image-wrapper {
    display: flex;
    justify-content: center;

    margin-bottom: 16px;

    height: 120px;
  }

  .ranking-image {
    max-height: 120px;
    max-width: 250px;
  }

  .ranking-card-count {
    text-align: center;

    font-weight: 600;
    font-size: 14px;
    line-height: 24px;

    color: #6e6b7b;
  }

  .ranking-card-progress {
    text-align: center;

    font-weight: 400;
    font-size: 14px;
    line-height: 24px;

    color: #6e6b7b;
  }

  .ranking-card-button-wrapper {
    display: flex;
    justify-content: center;
  }
</style>
