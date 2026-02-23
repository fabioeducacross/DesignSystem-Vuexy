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
import Filters from '@/views/pages/records/classes/list/overview/Filters.vue'
import Licenses from '@/views/pages/records/classes/list/overview/Licenses.vue'
import List from '@/views/pages/records/classes/list/overview/List.vue'
import { useRecordsClasses } from '@/views/pages/records/classes/list/overview/useRecordsClasses.js'
import { onUnmounted } from 'vue'

const { moduleName, moduleReset } = useRecordsClasses()

store.registerModule(moduleName, moduleClasses)
moduleReset()

onUnmounted(() => {
  moduleReset()
  store.unregisterModule(moduleName)
})
</script>

<style lang="scss" scoped></style>