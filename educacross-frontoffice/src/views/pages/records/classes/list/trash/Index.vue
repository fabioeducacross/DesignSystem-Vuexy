<template>
  <section>
    <Licenses v-if="$can(ACTION.READ, PERMISSION.GENERAL.SECRETARIAT)" />
    <Filters />
    <List />
  </section>
</template>

<script setup>
import { ACTION, PERMISSION } from '@/consts/permissions.js'
import store from '@/store'
import moduleClasses from '@/store/pageModules/records/module-classes.js'
import Filters from '@/views/pages/records/classes/list/trash/Filters.vue'
import Licenses from '@/views/pages/records/classes/list/trash/Licenses.vue'
import List from '@/views/pages/records/classes/list/trash/List.vue'
import { useRecordsClassesTrash } from '@/views/pages/records/classes/list/trash/useRecordsClassesTrash.js'
import { onUnmounted } from 'vue'

const { moduleName, moduleReset } = useRecordsClassesTrash()

store.registerModule(moduleName, moduleClasses)
moduleReset()

onUnmounted(() => {
  moduleReset()
  store.unregisterModule(moduleName)
})

// Export constants for template access
// (Script setup automatically exposes imported and defined variables)
</script>

<style lang="scss" scoped></style>