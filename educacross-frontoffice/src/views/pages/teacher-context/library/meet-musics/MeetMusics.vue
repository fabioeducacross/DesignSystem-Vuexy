<template>
  <div>
    <b-card>
      <b-col
        cols="12"
        md="auto"
        class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
      >
        <label>{{ $t('show') }}</label>
        <ESelect
          v-model="perPageSelected"
          :options="perPageOptionsObjects"
          label="value"
          track-by="value"
          :clearable="false"
          :searchable="false"
          class="per-page-selector d-inline-block mx-50"
        />
      </b-col>
    </b-card>

    <b-row>
      <b-col v-for="music in paginatedMusics" :key="music.id" md="4" sm="6">
        <Player :ref="`player-${music.id}`" :music="music" @play="pauseOtherPlayers" />
      </b-col>
    </b-row>

    <b-card>
      <list-table-pagination
        :value="currentPage"
        :total-data="totalRows"
        :per-page="perPage"
        @update:current-page="currentPage = $event"
      />
    </b-card>
  </div>
</template>

<script setup>
import Player from '@/components/player/Player.vue'
import ESelect from '@/components/selects/ESelect.vue'
import ListTablePagination from '@/components/table/ListTablePagination.vue'
import { BRow, BCol, BPagination, BFormSelect } from 'bootstrap-vue'
import { ref, computed, getCurrentInstance } from 'vue'

// Data
const perPage = ref(24)
const currentPage = ref(1)
const perPageOptions = [24, 48, 60]
const musics = ref([
  {
    id: 1,
    title: 'Eve - Quando a Chuva Caiu',
    src: '/assets/audio/1. Eve - Quando a Chuva caiu v1.mp3',
    lyricsSrc: '/assets/subtitles/Eve_na_chuva_legenda.srt',
  },
  {
    id: 2,
    title: 'Bem-vinda Professora Clara!',
    src: '/assets/audio/1._Bem_vinda_Professora_Clara!_v1.mp3',
    lyricsSrc: '/assets/subtitles/Professora_Clara_Legenda.srt',
  },
  {
    id: 3,
    title: 'Junior Está Chegando! (Pop)',
    src: '/assets/audio/1._Junior_esta_chegando!-v1_POP.mp3',
    lyricsSrc: '/assets/subtitles/Junior_Legenda.srt',
  },
  {
    id: 4,
    title: 'Zeca e o Banquete da Floresta (Rock)',
    src: '/assets/audio/1._Zeca_e_o_Banquete_da_Floresta-Rock.mp3',
    lyricsSrc: '/assets/subtitles/Zeca_banquete_legenda.srt',
  },
  {
    id: 5,
    title: 'Uhuhuh Nasceu Belinha',
    src: '/assets/audio/1A._Uhuhuh_Nasceu_Belinha.mp3',
    lyricsSrc: '/assets/subtitles/Nasceu_Belinha_Legenda.srt',
  },
  {
    id: 6,
    title: 'Uhuhuhu Chegou Eugênio',
    src: '/assets/audio/2A-Uhuhuhu_Chegou_Eugenio_v1.mp3',
    lyricsSrc: '/assets/subtitles/Eugenio_Bem-vindo_Legenda.srt',
  },
  {
    id: 7,
    title: 'Chico e a Orquestra da Floresta',
    src: '/assets/audio/3A._Chico_e_a_Orquestra_da_Floresta_v1.mp3',
    lyricsSrc: '/assets/subtitles/Chico_Floresta_Legenda.srt',
  },
  {
    id: 8,
    title: 'Papai Nitche',
    src: '/assets/audio/9._Papai_Nitche_v1.mp3',
    lyricsSrc: '/assets/subtitles/Papai_Nitche_Legenda.srt',
  },
  {
    id: 9,
    title: 'Cacau - Tudo tem Som',
    src: '/assets/audio/Cacau-Tudo-tem-Som.mp3',
    lyricsSrc: '/assets/subtitles/Cacau-Tudo-tem-Som_legenda.srt',
  },
].map(m => ({
  ...m,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  isMuted: false,
  showLyrics: false,
  lyrics: [],
  currentLyric: '',
})))

// Computed
const perPageOptionsObjects = computed(() => {
  return perPageOptions.map(n => ({ value: n }))
})

const perPageSelected = computed({
  get() {
    return { value: perPage.value }
  },
  set(val) {
    if (!val) {
      perPage.value = null
      return
    }
    perPage.value = typeof val === 'object' ? val.value : val
  },
})

const totalRows = computed(() => musics.value.length)

const paginatedMusics = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return musics.value.slice(start, end)
})

// Methods
const vm = getCurrentInstance()

const pauseOtherPlayers = currentMusic => {
  musics.value.forEach(music => {
    if (music.id !== currentMusic.id && music.isPlaying) {
      // Player refs
      const playerRef = (vm?.proxy?.$refs || {})[`player-${music.id}`]
      const player = Array.isArray(playerRef) ? playerRef[0] : playerRef
      if (player && player.pausePlayer) {
        player.pausePlayer()
      }
    }
  })
}
</script>

<style scoped>
  .per-page-selector {
    width: 90px;
  }
</style>
