<template>
  <div class="d-flex flex-col align-items-center gap-2">
    <p v-if="name === 'Educacross'" class="clearfix mb-0">
      <span class="float-md-left d-block d-md-inline-block mt-25">
        {{ new Date().getFullYear() }} &copy;
        <b-link class="ml-25" href="https://www.educacross.com.br/" target="_blank"
          >Educacross</b-link
        >
        <span class="d-none d-sm-inline-block">, Todos os direitos reservados</span>
      </span>
    </p>
    <div class="d-flex gap-1">
      <div>
        <a :href="facebookUrl" target="_blank">
          <FacebookIcon class="text-white" size="20px" />
        </a>
      </div>
      <div>
        <a :href="youtubeUrl" target="_blank">
          <YoutubeIcon size="20px" />
        </a>
      </div>
      <div>
        <a :href="instagramUrl" target="_blank">
          <InstagramIcon size="20px" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import FacebookIcon from '@/assets/icons/facebook-icon.vue'
  import InstagramIcon from '@/assets/icons/instagram-icon.vue'
  import YoutubeIcon from '@/assets/icons/youtube-icon.vue'
  import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
  import { BLink } from 'bootstrap-vue'

  export default {
    components: {
      BLink,
      FacebookIcon,
      YoutubeIcon,
      InstagramIcon,
    },
    setup() {
      const youtubeUrl = getWhitelabelConfig('YouTubeUrl')
      const facebookUrl = getWhitelabelConfig('FacebookUrl')
      const instagramUrl = getWhitelabelConfig('InstagramUrl')
      const name = getWhitelabelConfig('Name')

      return {
        youtubeUrl,
        facebookUrl,
        instagramUrl,
        name,
      }
    },

    mounted() {
      this.$bus.emit('mounted:footer')
    },
  }
</script>
