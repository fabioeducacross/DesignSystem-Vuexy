<template>
  <div @click.stop.prevent>
    <!-- Trigger for Notifications Modal -->
    <b-dropdown-item @click.stop="notificationsModal = true">
      <div class="d-flex align-items-center">
        <div class="position-relative d-flex align-items-center">
          <span class="material-symbols-outlined"> mail </span>
          <span v-if="notificationsQtd" class="badge badge-up badge-pill bg-danger">
            {{ notificationsQtd }}
          </span>
        </div>
        <span class="ml-50">Notificações</span>
      </div>
    </b-dropdown-item>

    <!-- Notifications Modal -->
    <b-modal v-model="notificationsModal" title="Notificações" hide-footer centered size="lg">
      <div class="d-flex align-items-center flex-column mb-1">
        <MediaCardIcon icon="mail" variant="light-primary" />
        <h1>Notificações</h1>
        <b-badge variant="light-primary" pill>{{ notificationsQtd }} Nova(s)</b-badge>
      </div>

      <!-- Scrollable List of Notifications -->
      <vue-perfect-scrollbar
        :settings="perfectScrollbarSettings"
        class="scrollable-container media-list scroll-area mb-1"
      >
        <b-list-group>
          <b-list-group-item
            v-for="(notification, index) in state.notifications"
            :key="index"
            class="cursor-pointer"
            @click="openModal(notification)"
          >
            <div class="d-flex justify-content-between align-content-center gap-3">
              <div>
                <p class="mb-0">
                  <span
                    class="font-weight-bolder"
                    :class="{ 'text-primary': notification.status !== StatusEnum.WasRead }"
                  >
                    {{ notification.title }}
                  </span>
                </p>
                <small>{{ dateFormat(notification.publishDate) }}</small>
              </div>
              <div class="d-flex align-items-center justify-content-end">
                <span
                  class="material-symbols-outlined"
                  :class="{ 'text-primary': notification.status !== StatusEnum.WasRead }"
                >
                  {{ notification.status !== StatusEnum.WasRead ? 'mail' : 'drafts' }}
                </span>
              </div>
            </div>
          </b-list-group-item>
        </b-list-group>
      </vue-perfect-scrollbar>

      <!-- Mark All as Read -->
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        block
        :disabled="
          !state.notifications.some(x => x.status !== StatusEnum.WasRead) || setAllReadBusy
        "
        @click="setAllRead"
      >
        <b-spinner v-if="setAllReadBusy" class="text-white" small />
        Marcar todas como lidas
      </b-button>
    </b-modal>

    <!-- Single Notification Modal -->
    <b-modal
      ref="refModalNotification"
      size="lg"
      centered
      no-close-on-backdrop
      no-close-on-esc
      :hide-footer="selectedNotification.status === StatusEnum.WasRead"
    >
      <!-- Modal Header -->
      <template v-slot:modal-header>
        <h5 class="modal-title">Notificações</h5>
        <button class="back" @click="backModal">
          <span class="material-symbols-outlined"> chevron_left </span>
        </button>
        <button class="close" @click="closeModal">
          <!--          <span class="material-symbols-outlined">close</span>-->
          <span aria-hidden="true">&times;</span>
        </button>
      </template>

      <!-- Modal Body -->
      <template>
        <section class="notification-media">
          <b-carousel
            ref="refCarousel"
            v-model="slide"
            :interval="10000"
            img-width="750px"
            img-height="450px"
            class="carousel-content mb-1"
          >
            <b-carousel-slide
              v-for="media in selectedNotification.mediaContent"
              :key="media.content"
            >
              <template v-slot:img>
                <!-- Image -->
                <b-img
                  v-if="media.type === NotificationEnum.Image"
                  :src="media.content"
                  class="carousel-content"
                />
                <!-- Video (Vimeo Embed) -->
                <iframe
                  v-else
                  allowfullscreen
                  controls
                  aspect="16by9"
                  :src="`https://player.vimeo.com/video/${media.content}?color=655CD6`"
                  class="carousel-content"
                />
              </template>
            </b-carousel-slide>
          </b-carousel>

          <h6 class="font-bold text-primary mb-0">
            {{ selectedNotification.title }}
          </h6>
          <p>{{ formattedDate(selectedNotification.publishDate) }}</p>

          <!-- IMPORTANT: Display the HTML description -->
          <div class="ql-editor p-0" v-html="selectedNotification.description" />

          <!-- Carousel Controls (if multiple media items) -->
          <div
            v-if="selectedNotification.mediaContent.length > 1"
            class="d-flex align-items-center justify-content-center"
          >
            <b-button-group>
              <b-button variant="outline-primary" @click="prev">
                <span class="material-symbols-outlined rotate-180">
                  keyboard_double_arrow_right
                </span>
              </b-button>
              <b-button variant="outline-primary" @click="start">
                <span class="material-symbols-outlined">
                  {{ status ? 'play_arrow' : 'pause' }}
                </span>
              </b-button>
              <b-button variant="outline-primary" @click="next">
                <span class="material-symbols-outlined"> keyboard_double_arrow_right </span>
              </b-button>
            </b-button-group>
          </div>
        </section>
      </template>

      <!-- Modal Footer -->
      <template v-slot:modal-footer>
        <div class="d-flex align-items-center w-100 m-0">
          <b-button variant="primary" @click="setRead(selectedNotification.id)">
            {{ selectedNotification.status !== StatusEnum.WasRead ? 'Marcar como lido' : 'Fechar' }}
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script setup>
import MediaCardIcon from '@/components/card/MediaCardIcon.vue'
import axiosIns from '@/libs/axios'
import { getNotifications } from '@/services/notifications/notification.service.js'
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import Ripple from 'vue-ripple-directive'
import { formattedDate } from '@/filters/filters.js'
import Vue from 'vue'

const emit = defineEmits(['notificationsQtd'])

const notificationsModal = ref(false)
const slide = ref(0)
const status = ref(false)
const refCarousel = ref(null)

const StatusEnum = {
  None: 0,
  Received: 1,
  WasRead: 2,
}
const setAllReadBusy = ref(false)
const NotificationEnum = {
  Image: 0,
  Video: 1,
}
const prev = () => {
  if (!status.value) {
    refCarousel.value.prev()
  }
}
const next = () => {
  if (!status.value) {
    refCarousel.value.next()
  }
}
const start = () => {
  status.value = !status.value
  if (status.value) {
    refCarousel.value.pause()
  } else {
    refCarousel.value.start()
  }
}

const state = reactive({
  notifications: [],
})

const notificationsQtd = computed(() => {
  const qtd = state.notifications.filter(x => x.status !== StatusEnum.WasRead).length
  emit('notificationsQtd', qtd)
  return qtd
})

const perfectScrollbarSettings = {
  maxScrollbarLength: 60,
  wheelPropagation: false,
}

const refModalNotification = ref(null)
const selectedNotification = ref({
  id: 0,
  title: '',
  description: '',
  status: 0,
  mediaContent: [],
})
const openModal = notification => {
  refModalNotification.value.show()
  selectedNotification.value = notification
}

const closeModal = () => {
  refModalNotification.value.hide()
}

const fetchNotifications = async () => {
  try {
    const res = await getNotifications()
    if (res.status !== 200) {
      return
    }
    const { data } = res
    state.notifications = data
    setAllAsReceived()
    const notification = state.notifications.find(x => x.status !== StatusEnum.WasRead)
    if (notification) {
      openModal(notification)
    }
  } catch (error) {
    // Tratar erro silenciosamente para não quebrar a aplicação
    state.notifications = []
  }
}

const setRead = id => {
  if (selectedNotification.value.status === StatusEnum.WasRead) {
    closeModal()
    return
  }
  axiosIns.put('v1/notifications', { notificationsIds: [id] }).then(() => {
    fetchNotifications()
  })
  closeModal()
}

const backModal = () => {
  closeModal()
  notificationsModal.value = true
}

const setAllRead = () => {
  setAllReadBusy.value = true
  const notificationsIds = state.notifications
    .filter(x => x.status === StatusEnum.Received)
    .map(x => x.id)
  axiosIns
    .put('v1/notifications', { notificationsIds })
    .then(() => {
      fetchNotifications()
    })
    .catch(() => {
      // Tratar erro silenciosamente
    })
    .finally(() => {
      setAllReadBusy.value = false
    })
}

const setAllAsReceived = () => {
  const notificationsIds = state.notifications
    .filter(x => x.status === StatusEnum.None)
    .map(x => x.id)
  if (notificationsIds.length === 0) return
  axiosIns.put('v1/notifications', { notificationsIds }).then(() => {
    fetchNotifications()
  })
}

const dateFormat = date => {
  const formatedDate = new Date(date).toLocaleDateString('pt-BR', 'dd/MM/yyyy')
  return formatedDate
}

const GlobalEvent = new Vue()
GlobalEvent.$bus.on('getNotifications', () => {
  fetchNotifications()
})

onBeforeUnmount(() => {
  GlobalEvent.$bus.off('getNotifications')
})

fetchNotifications()
</script>

<script>
export default {
  name: 'NotificationsDropdown',
  components: {
    MediaCardIcon,
  },
  directives: {
    Ripple,
  },
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables/_variables.scss';

  .notification-item {
    cursor: pointer;
  }

  .carousel-content {
    width: 100%;
    max-width: 760px;
    max-height: 450px;
    margin: 0 auto;

    iframe {
      width: 100%;
      aspect-ratio: 16 / 9;
    }
  }

  .back {
    position: absolute;
    top: -2px;
    right: 30px;
    padding: 0;
    box-shadow: 0 5px 20px 0 rgb(34 41 47 / 10%);
    border-radius: 0.357rem;
    background: #fff;
    height: 34px;
    width: 34px;
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2c2c2c;
    opacity: 1;
    transition: all 0.23s ease 0.1s;

    &:hover {
      transform: translate(-3px, 5px);
    }
  }
</style>

<style lang="scss">
  @import '@/@core/scss/vue/libs/quill.scss';
</style>