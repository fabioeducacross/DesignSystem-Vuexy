<template>
  <b-row class="match-height">
    <b-col v-for="(item, index) in dashboard" :key="index" cols="12" md="3">
      <MediaCard
        :loading="loading"
        :title="item.title"
        :icon="item.icon"
        variant="light-primary"
        right-align
      >
        <template v-slot:description>
          <p class="text-secondary">
            <span class="font-extrabold">
              {{ item.value | formatNumber }}
            </span>
            {{ item.description }}
          </p>
        </template>
      </MediaCard>
    </b-col>
  </b-row>
</template>

<script setup>
  import MediaCard from '@/components/card/MediaCard.vue'
  import store from '@/store'
  import { computed } from 'vue'

  const data = computed(() => store.getters['moduleReadingFluencyOverview/data'])
  const loading = computed(() => store.getters['moduleReadingFluencyOverview/loading'])

  const dashboard = computed(() => {
    return [
      {
        title: 'Livros',
        icon: 'book_5',
        value: data.value.readBooks,
        description: 'títulos lidos',
      },
      {
        title: 'Testes de leitura',
        icon: 'dictionary',
        value: data.value.readingFluency,
        description: 'realizados',
      },
      {
        title: 'Desafios de leitura',
        icon: 'mic',
        value: data.value.readingChallenges,
        description: 'enviados',
      },
      {
        title: 'Desafios de escrita',
        icon: 'draw',
        value: data.value.writingChallenges,
        description: 'enviados',
      },
    ]
  })
</script>

<style lang="scss" scoped>
  .text-secondary {
    color: #6e6b7b !important;
  }
</style>