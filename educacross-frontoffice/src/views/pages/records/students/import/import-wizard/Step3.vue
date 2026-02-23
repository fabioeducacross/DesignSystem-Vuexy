<script setup>
import { useImportStudents } from '@/views/pages/records/students/import/useImportStudents'

const { cancelImport, showHistory } = useImportStudents()
</script>

<template>
  <section class="d-flex h-100">
    <div class="flex-1 d-flex flex-col align-items-center justify-content-center">
      <span class="material-symbols-outlined text-success" style="font-size: 64px"
        >sync_saved_locally</span
      >
      <h2 class="font-normal">Planilha importada</h2>
      <p class="text-center">
        A sua planilha foi importada, aguarde o <br />
        seu processamento para garantir que <br />
        os alunos foram cadastrados.
      </p>
      <b-button variant="outline-primary" @click="() => (showHistory = true)">
        Ver importações
      </b-button>
    </div>

    <Portal to="footer-mass-import">
      <hr class="mb-0" />
      <div class="d-flex align-items-center justify-content-center gap-2 px-2 py-1">
        <b-button variant="primary" class="px-3" @click="cancelImport(false)">Concluir</b-button>
      </div>
    </Portal>
  </section>
</template>