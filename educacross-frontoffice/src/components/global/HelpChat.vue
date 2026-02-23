<script setup>
import whatsapp from '@/assets/icons/whatsapp.svg'
import initTypebot from '@/libs/typebot'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import { ref, onUnmounted } from 'vue'
import { emitter } from '@/eventBus'

// Props
const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
})

// Emits
const emit = defineEmits(['input'])

// State
const isHelpChatOpen = ref(props.value)
const isTypebotOpen = ref(false)
const haveTypeBot = getWhitelabelConfig('Typebot') === true
const haveEmail = typeof getWhitelabelConfig('email') === 'string'
const haveWhatsapp = typeof getWhitelabelConfig('apiWhats') === 'string'
const haveHelpLink = typeof getWhitelabelConfig('helpLink') === 'string'

// Methods
const openWhatsapp = () => {
  window.open(getWhitelabelConfig('apiWhats'), '_blank')
}

const openHelpLink = () => {
  window.open(getWhitelabelConfig('helpLink'), '_blank')
}

const openEmail = () => {
  window.open(getWhitelabelConfig('email'), '_blank')
}

const openThirdPartyChat = () => {
  isTypebotOpen.value = true
}

if (haveTypeBot) {
  initTypebot()
}

const changeChatStatus = isOpen => {
  isHelpChatOpen.value = isOpen
  emit('input', isOpen)
}

// Event listeners
const onUserHelpRequested = () => {
  changeChatStatus(true)
}

const onOpenHelpChat = () => {
  changeChatStatus(true)
  openThirdPartyChat()
}

emitter.on('userHelpRequested', onUserHelpRequested)
emitter.on('openHelpChat', onOpenHelpChat)

onUnmounted(() => {
  emitter.off('openHelpChat', onOpenHelpChat)
  emitter.off('userHelpRequested', onUserHelpRequested)
})
</script>

<template>
  <div class="help-chat-content-wrapper">
    <b-collapse :visible="isHelpChatOpen">
      <div class="bg-white border help-chat">
        <div class="d-flex justify-content-between p-1 pb-0">
          <div>
            <span
              v-show="isTypebotOpen"
              class="material-symbols-outlined cursor-pointer"
              @click="isTypebotOpen = false"
              >arrow_back_ios</span
            >
          </div>
          <span class="material-symbols-outlined cursor-pointer" @click="changeChatStatus(false)">
            close
          </span>
        </div>
        <div class="text-center help-chat-content d-flex flex-column justify-content-center">
          <div v-if="!isTypebotOpen" class="px-2 pb-2 overflow-y-auto">
            <p class="text-primary h2"><span class="font-bold">Olá</span></p>
            <p class="mb-2 font-16">
              Estamos aqui para ajudar você.<br />
              Por qual canal você prefere ser atendido?
            </p>

            <div class="mb-2">
              <b-button v-if="haveWhatsapp" block variant="primary" @click="openWhatsapp">
                <div class="d-flex align-items-center justify-content-center gap-2">
                  <span> WhatsApp</span>
                  <b-img :src="whatsapp" alt="whatsapp icon" class="d-inline" style="width: 20px" />
                </div>
              </b-button>
              <b-button v-if="haveTypeBot" block variant="primary" @click="openThirdPartyChat">
                <div class="d-flex align-items-center justify-content-center gap-2">
                  <span> Chat</span>
                  <span class="material-symbols-outlined font-20">chat_bubble</span>
                </div>
              </b-button>

              <b-button v-if="haveEmail" block variant="primary" @click="openEmail">
                <div class="d-flex align-items-center justify-content-center gap-2">
                  <span> E-mail</span>
                  <span class="material-symbols-outlined font-20">outgoing_mail</span>
                </div>
              </b-button>
              <b-button v-if="haveHelpLink" block variant="outline-primary" @click="openHelpLink">
                <div class="d-flex align-items-center justify-content-center gap-2">
                  <span>Ir para a Central de Ajuda</span>
                  <span class="material-symbols-outlined font-20">arrow_forward</span>
                </div>
              </b-button>
            </div>

            <b-card-text class="font-16">
              O nosso atendimento é de
              <span class="text-primary font-bold">segunda a sexta-feira, das 7h às 19h.</span>
            </b-card-text>
          </div>
          <typebot-standard
            v-show="isTypebotOpen"
            id="bot1"
            class="typebot-content"
          ></typebot-standard>
          <div></div>
        </div>
      </div>
    </b-collapse>
    <div class="chat-help-button-container">
      <b-button
        class="chat-help-button"
        variant="orange"
        @click="changeChatStatus(!isHelpChatOpen)"
      >
        <span class="material-symbols-outlined align-middle">contact_support</span>
        <span class="align-middle d-none d-sm-inline">Precisando de ajuda?</span>
        <span class="material-symbols-outlined align-middle d-none d-sm-inline-block">
          {{ isHelpChatOpen ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}
        </span>
      </b-button>
    </div>
  </div>
</template>

<style lang="scss">
  @import '../../assets/scss/variables/_variables.scss';
  @import '../../@core/scss/base/bootstrap-extended/_variables.scss';

  $fixedFooterVarHeight: var(--fixed-footer-var-height, 0);
  $help-chat-content-height: calc(
    100vh - #{$navbar-height} - #{$content-padding} * 4 - #{$fixedFooterVarHeight} - 108px
  );

  .help-chat-content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;

    position: absolute;
    right: 0;
    bottom: 100%;

    .font-20 {
      font-size: 20px;
    }
  }

  .help-chat {
    width: 400px;

    margin-bottom: $content-padding;
    margin-right: $content-padding;

    border-radius: $border-radius-lg;
    border: 1px solid #d8d6de;

    box-shadow: 0px 10px 24px 0px #00000029;
  }

  .help-chat-content {
    max-height: $help-chat-content-height;

    z-index: 997;
  }

  .chat-help-button-container {
    width: 400px;
    display: flex;
    justify-content: center;
    @media print {
      display: none;
    }
  }

  .chat-help-button {
    z-index: 998;
    border-radius: $border-radius-lg $border-radius-lg 0 0 !important;
    margin-right: $content-padding;

    box-shadow: 0px 0px 24px 0px #00000029;
  }

  .typebot-content {
    width: 100%;
    height: min(400px, 100vh);
    overflow-y: auto;
  }

  @media (max-width: 576px) {
    #help-chat-wrapper {
      width: 100%;
      margin-right: 0;
    }

    .help-chat {
      width: 100vw;
      margin-right: 0;
      margin-bottom: 0;

      border-radius: 0;
    }

    .help-chat-content {
      width: 100%;
      height: calc(100vh - #{$navbar-height} - #{$content-padding} - 50px);
      max-height: none;
      border-radius: 0 !important;
      margin-bottom: 0 !important;
      box-shadow: none !important;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .chat-help-button-container {
      width: fit-content;
      position: fixed;
      justify-content: flex-end;
    }

    .chat-help-button {
      border-radius: 50% !important;
      margin-bottom: $content-padding;
      width: 54px;
      height: 54px;
      padding: 0 !important;
    }

    .typebot-content {
      width: calc(100vw - #{$content-padding});
    }
  }
</style>