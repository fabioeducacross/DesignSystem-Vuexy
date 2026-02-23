<template>
  <div>
    <b-modal
      id="modal-imported-spreadsheet"
      ref="modal-imported-spreadsheet"
      content-class="shadow"
      centered
      hide-header
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      size="sm"
    >
      <div class="modal-content-imported-spreadsheet">
        <button type="button" aria-label="Close" class="close" @click="close">
          <feather-icon size="28" icon="XIcon" />
        </button>
        <div class="modal-container">
          <div class="modal-content-infos">
            <div class="content-imported-spreadsheet">
              <div class="wrap-content-icon">
                <feather-icon
                  size="48"
                  icon="CheckIcon"
                  class="content-imported-spreadsheet-icon"
                />
              </div>
              <h1 class="content-imported-spreadsheet-header">Planilha importada</h1>
              <p class="content-imported-spreadsheet-text">
                A sua planilha foi importada, aguarde o seu processamento para garantir que os
                alunos foram cadastrados.
              </p>
              <b-button variant="primary" class="btn-imported-spreadsheet" @click="close">
                Ok
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script setup>
import { ACTION, PERMISSION } from '@/consts/permissions'
import { useRouter } from 'vue-router/composables'

const router = useRouter()
const modalRef = ref(null)

const close = () => {
  // Hide the modal
  // Access the modal using BootstrapVue method from the ref
  // eslint-disable-next-line vue/no-mutating-props
  if (modalRef.value && modalRef.value.hide) {
    modalRef.value.hide()
  } else if (window && window.$bvModal) {
    // Fallback for legacy modal instance (SSR safe guard)
    window.$bvModal.hide('modal-imported-spreadsheet')
  } else {
    // Use event directly if ref not accessible
    const modalEl = document.getElementById('modal-imported-spreadsheet')
    if (modalEl) {
      modalEl.__vue__ && modalEl.__vue__.$bvModal.hide('modal-imported-spreadsheet')
    }
  }

  // Access $can global method if available, else go to admin route
  // eslint-disable-next-line no-undef
  if (typeof $can === 'function' ? $can(ACTION.READ, PERMISSION.GENERAL.TEACHER) : (typeof window !== 'undefined' && window.$can && window.$can(ACTION.READ, PERMISSION.GENERAL.TEACHER))) {
    router.push({ name: 'listImportStudentTeacher' })
    return
  }
  router.push({ name: 'listImportStudentAdmin' })
}
</script>

<style lang="scss">
  #modal-imported-spreadsheet .modal-sm {
    max-width: 500px;
  }
  #modal-imported-spreadsheet .modal-body {
    padding: 0;
  }
  .modal-content-imported-spreadsheet {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .close {
      margin: 0;
      position: absolute !important;
      right: 24px !important;
      top: 20px !important;
      border: 1px solid #e2e2e3;
      border-radius: 10px;
    }
    .modal-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 21px 0;
      .modal-content-infos {
        display: flex;
        flex-direction: row;
        justify-content: space-between !important;
        margin-top: 40px;
        .content-imported-spreadsheet {
          display: flex;
          flex-direction: column;
          align-content: center;
          align-items: center;
          margin: 0 40px;
          .wrap-content-icon {
            background: rgba(40, 199, 111, 0.12);
            padding: 16px;
            border-radius: 10px;
          }
          .content-imported-spreadsheet-icon {
            color: #00bdb9;
          }
          .content-imported-spreadsheet-header {
            font-style: normal;
            font-weight: 500;
            font-size: 24px;
            line-height: 29px;
            color: #2c2c2c;
            margin-top: 16px;
            margin-bottom: 16px;
          }
          .content-imported-spreadsheet-text {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 32px;
            text-align: center;
            color: #2c2c2c;
            margin-bottom: 16px;
          }
        }
      }
    }
  }
</style>