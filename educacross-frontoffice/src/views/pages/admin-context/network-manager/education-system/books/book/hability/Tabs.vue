<template>
  <TabRouter :tabs="tabs" :tab-title="tabTitle" tab-title-icon="school">
    <router-view />
  </TabRouter>
</template>

<script setup>
import TabRouter from '@/components/tab/TabRouter.vue'
import router from '@/router'
import useFilters from '@/store/filters/useFilters.js'
import { ref, computed, onUnmounted, onMounted } from 'vue'
import { useRoute } from 'vue-router/composables'

const { book, moduleId, educationSystemId, fetchSubjectsWithParams } = useFilters()

const tabTitle = ref('')

const tabs = computed(() => [
  { title: 'Livros', route: { name: 'educationSystemNetworkBookDetails' } },
  { title: 'Escolas', route: { name: 'educationSystemNetworkBookDetailsSchools' } },
  { title: 'Ranking', route: { name: 'educationSystemNetworkBookDetailsRanking' } },
])

// Event Bus: $bus via getCurrentInstance().proxy, migrate to mitt-based event bus
// The app uses an event bus at $bus, which is instance-level. 
// We can use the global event bus via emitter from @/eventBus, but since $bus is used here, 
// we preserve behavior by getting the proxy's $bus.
import { getCurrentInstance } from 'vue'
const vm = getCurrentInstance().proxy

const handleSetTabTitle = newTabTitle => {
  tabTitle.value = newTabTitle
}

vm.$bus.on('setEducationSystemTabTitle', handleSetTabTitle)

onUnmounted(() => {
  vm.$bus.off('setEducationSystemTabTitle', handleSetTabTitle)
})

// Routing: useRoute provides a reactive current route
const route = useRoute()

onMounted(() => {
  fetchSubjectsWithParams({
    moduleId: moduleId.value,
    educationSystemId: educationSystemId.value,
  })
  // Set book value when component mounted (was previously outside any hook)
  book.value = { id: route.params.bookId, name: '' }
})
</script>