<template>
  <section>
    <b-alert variant="primary" show>
      <div class="alert-body d-flex justify-content-between">
        <p class="mb-0">
          <span class="material-symbols-outlined align-middle">group</span>
          <span class="align-middle">
            Usuários cadastrados: <b>{{ usedLicenses | formatNumber }}</b>
          </span>
          |
          <span class="material-symbols-outlined align-middle">id_card</span>
          <span class="align-middle">
            Licenças disponíveis: <b>{{ totalLicenses | formatNumber }}</b>
          </span>
        </p>

        <span
          v-b-tooltip="'Licenças disponíveis são o número de usuários que podem ser cadastrados.'"
          class="material-symbols-outlined cursor-help"
          >help</span
        >
      </div>
    </b-alert>
    <StudentsFilter />
    <StudentsTable />
  </section>
</template>

<script setup>
import store from '@/store'
import studentsModule from '@/store/pageModules/records/module-students.js'
import StudentsFilter from '@/views/pages/records/students/list/StudentsFilter.vue'
import StudentsTable from '@/views/pages/records/students/list/StudentsTable.vue'
import { useRecordStudents } from '@/views/pages/records/students/list/useRecordStudents'
import { onUnmounted } from 'vue'

const { module_name, totalLicenses, usedLicenses, refSideBarCreateStudent } = useRecordStudents()

if (!store.hasModule(module_name)) {
  store.registerModule(module_name, studentsModule)
}

onUnmounted(() => {
  store.commit(`${module_name}/reset`)
  store.unregisterModule(module_name)

  refSideBarCreateStudent.value = null
})
</script>

<style lang="scss" scoped></style>
