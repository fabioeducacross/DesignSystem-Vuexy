<template>
  <div>
    <b-card border-variant="gray" class="border shadow-none" body-class="py-50">
      <b-row align-h="between" align-v="center">
        <b-col cols="12" md>
          <span class="h4 mr-50 mb-0 text-body text-wrap">
            <span class="font-bold">{{ details.name }}</span>
          </span>
          <b-badge pill variant="light-primary">
            {{ details.serieName }}
          </b-badge>
        </b-col>
        <!-- <b-col></b-col> -->
        <b-col cols="12" md="auto" class="text-right h5 text-body mb-0">
          <span class="font-bold">Tipo de teste:</span>
          {{ details.type === 2 ? 'Texto' : 'Lista de Palavras' }}
        </b-col>
      </b-row>
    </b-card>
    <b-card border-variant="gray" class="border shadow-none">
      <p class="text-center text-primary font-semibold">
        {{ details.type === 2 ? 'TEXTO DE REFERÊNCIA' : 'PALAVRAS DE REFERÊNCIA' }}
      </p>
      <component :is="dynamicTableComponent" :text="details.content" />
    </b-card>
  </div>
</template>

<script setup>
  import { getReadingFluencyDetail } from '@/services/shared/readingMeter/readingMeter.service.js'
  import FullTextTable from '@/views/pages/reading-meter/components/FullTextTable.vue'
  import WordsTable from '@/views/pages/reading-meter/components/WordsTable.vue'
  import { ref, computed } from 'vue'

  const props = defineProps({
    id: {
      type: Number,
      required: true,
    },
  })

  const details = ref({})

  getReadingFluencyDetail(props.id).then(({ data }) => {
    details.value = data
  })

  const dynamicTableComponent = computed(() => {
    return details.value.type === 2 ? FullTextTable : WordsTable
  })
</script>

<style lang="scss" scoped></style>