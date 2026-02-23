<template>
  <ModalConfirm
    v-model="openConfirmExit"
    :callback-confirm="goExit"
    icon-variant="orange"
    confirm-variant="danger"
    cancel-variant="outline-primary"
    label-confirm="Sair e perder"
  >
    <h4 class="text-body">Tem certeza que deseja sair?</h4>
    <p>
      <span class="text-primary font-bold">Suas ações não foram salvas.</span> Ao sair, você perderá
      as alterações realizadas.
    </p>
  </ModalConfirm>
</template>

<script setup>
import { isUserLoggedIn } from '@/auth/utils'
import router from '@/router'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import { ref, getCurrentInstance, onUnmounted } from 'vue'

const showConfirmExit = ref(false)
const openConfirmExit = ref(false)
const routeTo = ref(null)

router.beforeEach((to, from, next) => {
  if (isUserLoggedIn()) {
    if (showConfirmExit.value) {
      routeTo.value = next
      openConfirmExit.value = true
      return false
    }
  }
  showConfirmExit.value = false
  openConfirmExit.value = false
  next()
})

const vm = getCurrentInstance().proxy

vm.$bus.on('showConfirmExit', (value = true) => {
  showConfirmExit.value = value
})

vm.$bus.on('manualShowConfirmExit', callback => {
  routeTo.value = callback || (() => {})
  openConfirmExit.value = true
})

onUnmounted(() => {
  vm.$bus.off('showConfirmExit')
  vm.$bus.off('manualShowConfirmExit')
})

const goExit = () => {
  showConfirmExit.value = false
  openConfirmExit.value = false
  routeTo.value()
}
</script>

<style lang="scss" scoped></style>