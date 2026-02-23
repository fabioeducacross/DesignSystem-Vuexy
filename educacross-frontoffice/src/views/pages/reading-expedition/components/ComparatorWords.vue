<template>
  <b-row class="match-height">
    <b-col cols="12">
      <b-card border-variant="gray" class="border">
        <p class="text-center text-primary font-semibold">TRANSCRIÇÃO DA LEITURA DO ALUNO</p>
        <component :is="dynamicTableComponent" v-if="!loading" :text="filteredResult" />
        <b-skeleton-img v-else no-aspect height="200px" />
      </b-card>
    </b-col>
  </b-row>
</template>

<script setup>
  import FullTextTable from '@/views/pages/reading-expedition/components/FullTextTable.vue'
  import WordsTable from '@/views/pages/reading-expedition/components/WordsTable.vue'
  import { computed } from 'vue'

  const props = defineProps({
    tableType: {
      type: Number,
      default: 1,
    },
    reference: {
      type: Array,
      required: true,
    },
    result: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  })

  const dynamicTableComponent = computed(() => {
    return props.tableType === 2 ? FullTextTable : WordsTable
  })

  const filteredResult = computed(() => props.result.filter(r => r.reading !== 3))
</script>