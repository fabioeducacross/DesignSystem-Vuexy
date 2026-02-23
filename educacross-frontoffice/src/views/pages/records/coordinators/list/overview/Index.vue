<template>
  <section>
    <Licenses />
    <Filters />
    <List />
  </section>
</template>

<script setup>
  import Filters from './Filter.vue'
  import { useCoordinatorList } from './useCoordinatorList'
  import Tab from '@/components/tab/Tab.vue'
  import { getVariantByRule } from '@/consts/legends'
  import store from '@/store'
  import ModuleCoorinator from '@/store/pageModules/records/module-coorinator'
  import Licenses from '@/views/pages/records/coordinators/list/overview/Licenses.vue'
  import List from '@/views/pages/records/coordinators/list/overview/List.vue'
  import { computed, onUnmounted } from 'vue'

  // Register page module if not present
  const { module_name } = useCoordinatorList()

  if (!store.hasModule(module_name)) {
    store.registerModule(module_name, ModuleCoorinator)
  }

  // Computed institution name
  const institutionName = computed(() => store.getters.accessUserData.InstitutionName)

  onUnmounted(() => {
    store.commit(`${module_name}/reset`)
    store.unregisterModule(module_name)
  })
</script>
