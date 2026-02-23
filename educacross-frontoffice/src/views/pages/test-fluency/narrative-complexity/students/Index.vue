<template>
  <div>
    <AlertMoreInfo />
    <Title :back-func="backFunc">
      <div v-if="!$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)">
        <div class="d-flex align-items-center justify-content-end gap-2">
          <span class="h4 m-0 text-primary"
            ><span class="font-bold">{{ className }}</span></span
          >
          <b-badge pill variant="light-primary">
            {{ serieName }}
          </b-badge>
        </div>
      </div>
    </Title>
    <Cards />
    <div v-show="onlyApplyEnabled">
      <List />
      <LegendEnum :legends="legends" />
    </div>
  </div>
</template>

<script setup>
import LegendEnum from '@/components/legends/LegendEnum.vue'
import { percentileNarrativeComplexityLegend } from '@/consts/legends/percentileNarrativeComplexityEnum.js'
import { ACTION, PERMISSION } from '@/consts/permissions'
import router from '@/router'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import narrativeComplexityStudents from '@/store/pageModules/narrativeComplexity/module-narrative-complexity-students.js'
import AlertMoreInfo from '@/views/pages/test-fluency/narrative-complexity/components/AlertMoreInfo.vue'
import Title from '@/views/pages/test-fluency/narrative-complexity/components/Title.vue'
import Cards from '@/views/pages/test-fluency/narrative-complexity/students/Cards.vue'
import List from '@/views/pages/test-fluency/narrative-complexity/students/List.vue'
import { computed, getCurrentInstance, onUnmounted, ref, watch } from 'vue'

const vm = getCurrentInstance().proxy

const moduleName = 'narrativeComplexityStudents'
if (!store.hasModule(moduleName)) {
  store.registerModule(moduleName, narrativeComplexityStudents)
}

const backFunc = ref(null)

const { classId } = router.currentRoute.params
const { classe } = useFilters()

if (classId) {
  classe.value = { ClassId: classId }
}

const onlyApplyEnabled = computed(
  () => store.getters['narrativeComplexityStudents/onlyApplyEnabled'],
)

const className = computed(() => store.getters['narrativeComplexityStudents/className'])
const serieName = computed(() => store.getters['narrativeComplexityStudents/serieName'])

if (!vm.$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)) {
  backFunc.value = () => {
    router.push({ name: 'narrativeComplexityClasses' })
  }
}

watch([className], () => {
  vm.$bus.emit('setBreadcrumb', ['', '', className.value])
})

onUnmounted(() => {
  if (store.hasModule(moduleName)) {
    store.unregisterModule(moduleName)
  }
})

const legends = [percentileNarrativeComplexityLegend]
</script>

<style lang="scss" scoped></style>