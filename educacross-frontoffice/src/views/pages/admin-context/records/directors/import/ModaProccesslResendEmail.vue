<template>
  <div>
    <b-modal
      id="modal-resend-emails"
      ref="modal-resend-emails"
      content-class="shadow"
      centered
      hide-header
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
      size="sm"
    >
      <div class="modal-content-resend-email">
        <button type="button" aria-label="Close" class="close" @click="close">
          <feather-icon size="28" icon="XIcon" />
        </button>
        <div class="modal-container">
          <div class="modal-content-infos">
            <div class="content-resend-email">
              <feather-icon size="64" icon="RefreshCwIcon" class="content-resend-email-icon" />
              <p class="content-resend-email-text">Processando envio de e-mails</p>
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
  // Hide the modal using Bootstrap-Vue's $bvModal service
  // We need to get the root instance to call $bvModal
  // In <script setup>, access via globalThis or window if mounted as $bvModal
  if (typeof window !== 'undefined' && window?.$bvModal) {
    window.$bvModal.hide('modal-resend-emails')
  } else if (typeof globalThis !== 'undefined' && globalThis?.$bvModal) {
    globalThis.$bvModal.hide('modal-resend-emails')
  }
  router.push({ name: 'listDirectorAdmin' })
}
</script>

<style lang="scss">
  #modal-resend-emails .modal-sm {
    max-width: 500px;
  }
  #modal-resend-emails .modal-body {
    padding: 0;
  }
  .modal-content-resend-email {
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
        .content-resend-email {
          display: flex;
          flex-direction: column;
          align-content: center;
          align-items: center;
          margin: 0 40px;
          .content-resend-email-icon {
            margin-bottom: 16px;
            color: #00bdb9;
          }
          .content-resend-email-text {
            font-style: normal;
            font-weight: 500;
            font-size: 20px;
            line-height: 25.6px;
            color: #6e6b7b;
            text-align: center;
          }
        }
      }
    }
  }
</style>