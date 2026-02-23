<template>
  <div class="w-full">
    <div class="">
      <p class="text-center">Se preferir, entre em contato com nosso suporte:</p>
    </div>
    <b-row class="mb-2" align-h="center">
      <b-col v-if="showChat" sm="6">
        <div class="mb-1 mb-lg-0 d-flex justify-content-center justify-content-sm-end">
          <b-button
            variant="outline-primary"
            class="d-flex align-items-center gap-3"
            @click="openChat"
          >
            <span class="material-symbols-outlined btn-icon">{{ 'chat_bubble' }}</span>
            <span class="footer-buttons">Fale com nosso suporte</span>
          </b-button>
        </div>
      </b-col>
      <b-col sm="6">
        <div
          class="mb-1 mb-lg-0 d-flex justify-content-center"
          :class="showChat ? 'justify-content-sm-start' : 'justify-content-sm-center'"
        >
          <b-button
            variant="outline-primary"
            class="d-flex align-items-center gap-3"
            @click="redirectToWhatsAppSupport"
          >
            <img :src="whatsappIcon" alt="" />
            <span class="footer-buttons">WhatsApp</span>
          </b-button>
        </div>
      </b-col>
    </b-row>
    <fixed-sticky-footer v-if="showChat" />
  </div>
</template>

<script setup>
import FixedStickyFooter from '@/components/FixedStickyFooter.vue'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import { computed, getCurrentInstance } from 'vue'

const vm = getCurrentInstance().proxy
const whatsappIcon = new URL('@/assets/icons/whatsapp-primary.svg', import.meta.url).href

const redirectToWhatsAppSupport = () => {
  window.open(getWhitelabelConfig('apiWhats'), '_blank')
}

const openChat = () => {
  vm.$bus.emit('userHelpRequested')
}

const showChat = computed(() => {
  return getWhitelabelConfig('Typebot')
})
</script>

<style lang="scss" scoped>
  .footer-buttons {
    font-size: 14px;
  }
  .material-symbols-outlined.btn-icon {
    font-size: 18px;
  }
</style>