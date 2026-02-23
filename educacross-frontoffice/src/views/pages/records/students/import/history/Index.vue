<script setup>
import List from '@/views/pages/records/students/import/history/List.vue'
import { useImportHistory } from '@/views/pages/records/students/import/history/useImportHistory.js'
import { onMounted } from 'vue'

const { reset } = useImportHistory()

onMounted(() => {
  reset()
})
</script>

<template>
  <section class="px-1">
    <List />
  </section>
</template>