<script setup>
import ImportClassesWizard from '@/views/pages/records/classes/import/import-wizard/Index.vue'
import { useImportClasses } from '@/views/pages/records/classes/import/useImportClasses'
import { watch, getCurrentInstance } from 'vue'

const { isVisible, EView, sumImportingUsers, hideImport, hasUnsavedChanges, cancelImport } =
  useImportClasses()

const { proxy } = getCurrentInstance()

watch(hasUnsavedChanges, (newValue, oldValue) => {
  if (!oldValue && newValue) {
    proxy.$bus.emit('showConfirmExit', () => cancelImport(true))
  }
})
</script>

<template>
  <b-sidebar
    :visible="isVisible"
    width="727px"
    bg-variant="white"
    shadow
    backdrop
    right
    no-close-on-backdrop
    no-close-on-esc
    header-class="px-0 pb-0 pt-1"
    @hidden="cancelImport(true)"
  >
    <template v-slot:header>
      <div class="flex-1">
        <div class="px-1 flex-1 d-flex align-items-center justify-content-between">
          <h4 class="mb-0">Importar Turmas</h4>
          <span
            class="material-symbols-outlined text-body cursor-pointer"
            @click="cancelImport(false)"
            >close</span
          >
        </div>
        <hr class="flex-1" />
      </div>
    </template>
    <div>
      <ImportClassesWizard />
    </div>
    <template v-slot:footer>
      <PortalTarget name="footer-mass-import" />
    </template>
  </b-sidebar>
</template>