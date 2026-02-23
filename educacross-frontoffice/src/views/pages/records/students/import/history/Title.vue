<template>
  <div class="d-flex align-items-center gap-2 mb-2">
    <span class="material-symbols-outlined cursor-pointer text-body" @click="gotoViewWizard">
      arrow_back
    </span>
    <h3 class="text-body mb-0">Últimas Importações</h3>
  </div>
</template>

<script setup>
  import { useImportStudents } from '@/views/pages/records/students/import/useImportStudents.js'

  const { gotoViewWizard } = useImportStudents()
</script>

<style lang="scss" scoped></style>