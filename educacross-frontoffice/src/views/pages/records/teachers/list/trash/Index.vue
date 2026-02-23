<template>
  <section>
    <Filters />
    <List />
  </section>
</template>

<script setup>
  import store from '@/store'
  import moduleTeachers from '@/store/pageModules/records/module-teachers.js'
  import Filters from '@/views/pages/records/teachers/list/trash/Filters.vue'
  import Licenses from '@/views/pages/records/teachers/list/trash/Licenses.vue'
  import List from '@/views/pages/records/teachers/list/trash/List.vue'
  import { useRecordsTeachers } from '@/views/pages/records/teachers/list/trash/useRecordsTeachers.js'
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