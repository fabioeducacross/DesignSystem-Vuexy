<template>
  <div class="w-full bg-white">
    <div
      class="flex items-center justify-center min-vh-100 flex-col py-1 px-2 lg:w-3/4 xl:w-1/2 mx-auto text-center"
    >
      <ErrorLogo />

      <ErrorImage :src="image" alt="Você não tem permissão para acessar esta página" />

      <ErrorTitle title="Desculpe, você não tem permissão para acessar esta página" />

      <p>
        Por favor, entre em contato com o administrador do sistema se precisar de ajuda ou tiver
        alguma dúvida.
      </p>

      <b-button variant="primary" to="/"> Voltar à Home </b-button>
      <hr class="w-full divider" />

      <ErrorContact />
    </div>
  </div>
</template>

<script setup>
import ErrorContact from './components/ErrorContact.vue'
import ErrorImage from './components/ErrorImage.vue'
import ErrorLogo from './components/ErrorLogo.vue'
import ErrorTitle from './components/ErrorTitle.vue'

const image = new URL('@/assets/images/pages/error-partner.svg', import.meta.url).href
</script>

<style lang="scss" scoped>
.divider {
  border-color: #b9b9c3;
}
</style>