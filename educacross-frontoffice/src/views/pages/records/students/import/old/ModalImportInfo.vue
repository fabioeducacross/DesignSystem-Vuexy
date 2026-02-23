<template>
  <div>
    <b-modal
      id="modal-import-info"
      ref="modal-import-info"
      content-class="shadow"
      centered
      hide-header
      hide-footer
      size="lg"
    >
      <div class="modal-content-import-info">
        <button type="button" aria-label="Close" class="close" @click="hideModal">
          <feather-icon size="28" icon="XIcon" />
        </button>
        <div class="modal-container">
          <div class="modal-header-text">
            <h1>Passo a passo do processo de importação de alunos</h1>
          </div>
          <div class="modal-content-infos">
            <div class="content-import">
              <feather-icon size="64" icon="UploadIcon" class="content-import-icon" />
              <p class="content-import-text">
                <span class="content-import-step">1 - </span>Importe a planilha e confira se os
                dados estão corretos.
              </p>
            </div>
            <div class="content-import">
              <feather-icon size="64" icon="RefreshCwIcon" class="content-import-icon" />
              <p class="content-import-text">
                <span class="content-import-step">2 - </span>Aguarde a importação ser processada, os
                status das importações são atualizados a cada 1 minuto.
              </p>
            </div>
            <div class="content-import">
              <feather-icon size="64" icon="CheckCircleIcon" class="content-import-icon" />
              <p class="content-import-text">
                <span class="content-import-step">3 - </span>Importação finalizada com sucesso!
              </p>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modalImportInfoRef = ref(null)

const hideModal = () => {
  if (modalImportInfoRef.value) {
    modalImportInfoRef.value.hide()
  }
}
</script>

<!-- Register template ref property for b-modal -->
<script>
export default {
  inheritAttrs: false,
}
</script>

<style lang="scss">
  #modal-import-info .modal-lg {
    max-width: 1200px;
  }
  #modal-import-info .modal-body {
    padding: 0;
  }
  .modal-content-import-info {
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
      .modal-header-icon {
        color: #7367f0;
        padding: 16px;
        background: rgba(115, 103, 240, 0.12);
        border-radius: 10px;
      }
      .modal-header-text {
        padding-top: 15px;
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 29px;
        text-align: center;
        color: #2c2c2c;
      }
      .modal-content-infos {
        display: flex;
        flex-direction: row;
        justify-content: space-between !important;
        margin-top: 40px;
        .content-import {
          display: flex;
          flex-direction: column;
          align-content: center;
          align-items: center;
          margin: 0 40px;
          .content-import-icon {
            margin-bottom: 16px;
            color: #00bdb9;
          }
          .content-import-text {
            font-style: normal;
            font-weight: 500;
            font-size: 21px;
            line-height: 25.6px;
            color: #6e6b7b;
            text-align: center;
            width: 320px;
            .content-import-step {
              color: #00bdb9;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
</style>