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
  import moduleStudents from '@/store/pageModules/records/module-students.js'
  import Filters from '@/views/pages/records/students/list/trash/Filters.vue'
  import Licenses from '@/views/pages/records/students/list/trash/Licenses.vue'
  import List from '@/views/pages/records/students/list/trash/List.vue'
  import { useRecordsStudentsTrash } from '@/views/pages/records/students/list/trash/useRecordsStudentsTrash.js'
  import { onUnmounted } from 'vue'

  const { moduleName, moduleReset } = useRecordsStudentsTrash()

  store.registerModule(moduleName, moduleStudents)
  moduleReset()

  onUnmounted(() => {
    moduleReset()
    store.unregisterModule(moduleName)
  })
</script>

<style lang="scss" scoped></style>