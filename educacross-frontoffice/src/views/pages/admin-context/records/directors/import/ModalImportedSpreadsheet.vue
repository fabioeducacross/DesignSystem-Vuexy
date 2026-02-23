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
                diretores foram cadastrados.
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
import { useRouter } from 'vue-router/composables'

const router = useRouter()

const close = () => {
  // Hide the modal programmatically via $bvModal
  // $bvModal must be accessed on `window.__vue__` root, so use $root.$bvModal
  // But in most setups $bvModal is accessible via the global property in BootstrapVue components
  // Here we access via the modal ref:
  const modalRef = document.getElementById('modal-imported-spreadsheet')
  // Hide the modal using BootstrapVue's modal hide event
  // Assuming BootstrapVueShim is globally available, otherwise use $root.$bvModal.hide
  // But usually within <script setup>, use globalThis
  if (typeof window !== 'undefined' && window && window.$bvModal) {
    window.$bvModal.hide('modal-imported-spreadsheet')
  } else if (
    typeof globalThis !== 'undefined' &&
    globalThis &&
    globalThis.$bvModal
  ) {
    globalThis.$bvModal.hide('modal-imported-spreadsheet')
  } else if (modalRef && modalRef.__vue__) {
    // Fallback: try accessing modal's Vue instance directly
    modalRef.__vue__.$bvModal.hide('modal-imported-spreadsheet')
  }

  router.push({ name: 'listDirectorAdmin' })
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