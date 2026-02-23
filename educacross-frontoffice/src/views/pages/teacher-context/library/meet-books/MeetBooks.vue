<template>
  <section>
    <MeetBooksFilter />
    <MeetBooksList />
  </section>
</template>

<script setup>
  import MeetBooksFilter from './MeetBooksFilter.vue'
  import MeetBooksList from './MeetBooksList.vue'
  import store from '@/store'
  import moduleLibrayBooks from '@/store/pageModules/library/module-libray-books.js'
  import { onUnmounted } from 'vue'

  if (!store.hasModule('moduleLibrayBooks')) {
    store.registerModule('moduleLibrayBooks', moduleLibrayBooks)
  }

  onUnmounted(() => {
    if (store.hasModule('moduleLibrayBooks')) {
      store.unregisterModule('moduleLibrayBooks')
    }
  })
</script>