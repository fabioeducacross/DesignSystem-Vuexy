<template>
  <div>
    <BooksMissionsFilter />
    <BooksMissionsList />
  </div>
</template>

<script setup>
  import store from '@/store'
  import booksMissionsModule from '@/store/pageModules/missions/books-missions-module.js'
  import BooksMissionsFilter from '@/views/pages/teacher-context/records/missions/books/BooksMissionsFilter.vue'
  import BooksMissionsList from '@/views/pages/teacher-context/records/missions/books/BooksMissionsList.vue'
  import { onUnmounted } from 'vue'

  store.registerModule('booksMissionsModule', booksMissionsModule)

  onUnmounted(() => {
    store.unregisterModule('booksMissionsModule')
  })
</script>