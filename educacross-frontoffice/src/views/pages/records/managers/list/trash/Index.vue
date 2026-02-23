<template>
  <section>
    <Filters />
    <List />
  </section>
</template>

<script setup>
import store from '@/store'
import moduleManagers from '@/store/pageModules/records/module-managers.js'
import Filters from '@/views/pages/records/managers/list/trash/Filters.vue'
import List from '@/views/pages/records/managers/list/trash/List.vue'
import { useRecordsManagers } from '@/views/pages/records/managers/list/trash/useRecordsManagers.js'
import { onUnmounted } from 'vue'

const { moduleName, moduleReset } = useRecordsManagers()

store.registerModule(moduleName, moduleManagers)

moduleReset()

onUnmounted(() => {
  moduleReset()
  store.unregisterModule(moduleName)
})
</script>

<style lang="scss" scoped></style>