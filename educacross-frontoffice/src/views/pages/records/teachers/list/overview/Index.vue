<template>
  <section>
    <Licenses />
    <Filters />
    <List />
  </section>
</template>

<script setup>
  import store from '@/store'
  import moduleTeachers from '@/store/pageModules/records/module-teachers.js'
  import Filters from '@/views/pages/records/teachers/list/overview/Filters.vue'
  import Licenses from '@/views/pages/records/teachers/list/overview/Licenses.vue'
  import List from '@/views/pages/records/teachers/list/overview/List.vue'
  import { useRecordsTeachers } from '@/views/pages/records/teachers/list/overview/useRecordsTeachers.js'
  import { onUnmounted } from 'vue'

  const { moduleName, moduleReset } = useRecordsTeachers()

  store.registerModule(moduleName, moduleTeachers)
  moduleReset()

  onUnmounted(() => {
    moduleReset()
    store.unregisterModule(moduleName)
  })
</script>

<style lang="scss" scoped></style>