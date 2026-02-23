<template>
  <div>
    <WritingPhaseRegisterInfo />
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
      <WritingPhasesLegendEnum />
    </div>
  </div>
</template>

<script setup>
  import { ACTION, PERMISSION } from '@/consts/permissions'
  import router from '@/router'
  import store from '@/store'
  import useFilters from '@/store/filters/useFilters'
  import moduleWritingPhasesStudents from '@/store/pageModules/writing-phases/module-writing-phases-students.js'
  import useTable from '@/store/table/useTable.js'
  import AlertMoreInfo from '@/views/pages/test-fluency/narrative-complexity/components/AlertMoreInfo.vue'
  import WritingPhaseRegisterInfo from '@/views/pages/writing-phases/components/Info.vue'
  import Title from '@/views/pages/writing-phases/components/Title.vue'
  import WritingPhasesLegendEnum from '@/views/pages/writing-phases/components/WritingPhasesLegendEnum.vue'
  import Cards from '@/views/pages/writing-phases/students/Cards.vue'
  import List from '@/views/pages/writing-phases/students/List.vue'
  import { useWritingStagesStudents } from '@/views/pages/writing-phases/students/useWritingStagesStudents.js'
  import { getCurrentInstance, onUnmounted, ref, watch } from 'vue'

  const vm = getCurrentInstance().proxy
  const { reset } = useTable()

  const { moduleName, onlyApplyEnabled, className, serieName } = useWritingStagesStudents()

  if (!store.hasModule(moduleName)) {
    store.registerModule(moduleName, moduleWritingPhasesStudents)
  }

  const backFunc = ref(null)

  const { classId } = router.currentRoute.params
  const { classe } = useFilters()

  if (classId) {
    classe.value = { ClassId: classId }
  }

  if (!vm.$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)) {
    backFunc.value = () => {
      router.push({ name: 'WritingPhasesListClassesAdmin' })
    }
  }

  watch([className], () => {
    vm.$bus.emit('setBreadcrumb', ['', '', className.value])
  })

  onUnmounted(() => {
    reset()
    if (store.hasModule(moduleName)) {
      store.unregisterModule(moduleName)
    }
  })
</script>

<style lang="scss" scoped></style>