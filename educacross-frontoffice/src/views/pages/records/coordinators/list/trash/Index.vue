<template>
  <section>
    <Filters />
    <List />
  </section>
</template>

<script setup>
import store from '@/store'
import moduleCoordinators from '@/store/pageModules/records/module-coorinator'
import Filters from '@/views/pages/records/coordinators/list/trash/Filters.vue'
import List from '@/views/pages/records/coordinators/list/trash/List.vue'
import { useRecordsCoordinators } from '@/views/pages/records/coordinators/list/trash/useRecordsCoordinators.js'
import { onUnmounted } from 'vue'

const { moduleName, moduleReset } = useRecordsCoordinators()

store.registerModule(moduleName, moduleCoordinators)

moduleReset()

onUnmounted(() => {
  moduleReset()
  store.unregisterModule(moduleName)
})
</script>

<style lang="scss" scoped></style>