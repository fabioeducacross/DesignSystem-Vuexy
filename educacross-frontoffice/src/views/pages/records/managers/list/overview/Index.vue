<template>
  <section>
    <Licenses />
    <Filters />
    <List />
  </section>
</template>

<script setup>
import store from '@/store'
import moduleManagers from '@/store/pageModules/records/module-managers.js'
import Filters from '@/views/pages/records/managers/list/overview/Filters.vue'
import Licenses from '@/views/pages/records/managers/list/overview/Licenses.vue'
import List from '@/views/pages/records/managers/list/overview/List.vue'
import { useRecordsManagers } from '@/views/pages/records/managers/list/overview/useRecordsManagers.js'
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