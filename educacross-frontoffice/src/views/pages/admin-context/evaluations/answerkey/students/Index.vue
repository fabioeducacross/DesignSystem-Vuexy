<template>
  <div>
    <Title />
    <List />
  </div>
</template>

<script setup>
  import List from '@/views/pages/admin-context/evaluations/answerkey/students/List.vue'
  import Title from '@/views/pages/admin-context/evaluations/answerkey/students/Title.vue'
  import store from '@/store'
  import evaluationModule from '@/store/evaluation/index.js'
  import { onBeforeMount, onUnmounted } from 'vue'

  const moduleName = 'evaluations'
  let moduleAdded = false

  onBeforeMount(() => {
    if (!store.hasModule(moduleName)) {
      store.registerModule(moduleName, evaluationModule)
      moduleAdded = true
    }
  })

  onUnmounted(() => {
    if (moduleAdded && store.hasModule(moduleName)) {
      store.unregisterModule(moduleName)
    }
  })
</script>

<style lang="scss" scoped></style>