<template>
  <div>
    <!-- Main Player Card -->
    <b-card no-body>
      <b-card-body class="p-50">
        <div>
          <!-- Album cover as base with lyrics overlay -->
          <div class="album-section">
            <album-cover :is-fullscreen="false" />

            <!-- Lyrics overlay on top of album cover -->
            <div v-if="music.showLyrics && music.lyrics.length > 0" class="lyrics-overlay">
              <lyrics-display
                :visible-lyrics="getVisibleLyrics()"
                :current-time="music.currentTime"
                :is-fullscreen="false"
                :max-visible-lines="maxVisibleLines"
                :show-fullscreen-button="true"
                @toggle-fullscreen="toggleFullscreen"
              />
            </div>
          </div>
        </div>

        <div>
          <p class="music-title text-center">{{ music.title }}</p>
        </div>
        <!-- Audio controls container - only show when not in fullscreen -->
        <div class="audio-controls-container">
          <!-- Audio element - always present to maintain playback -->
          <audio
            ref="audioPlayer"
            :src="music.src"
            controls
            controlslist="nodownload"
            class="default-audio-player"
            @timeupdate="handleTimeUpdate"
            @loadedmetadata="loadDuration"
            @play="handlePlay"
            @pause="handlePause"
            @ended="onEnded"
          />

          <!-- Lyrics control button -->
          <b-button
            v-if="music.lyricsSrc"
            variant="outline-primary"
            size="sm"
            class="lyrics-control-btn"
            :class="{ active: music.showLyrics }"
            @click="toggleLyrics"
          >
            <span class="material-icons-outlined">subtitles</span>
          </b-button>
        </div>

        <!-- Hidden audio element for fullscreen mode -->
        <audio
          v-if="isFullscreen"
          ref="audioPlayer"
          :src="music.src"
          class="hidden-audio"
          @timeupdate="handleTimeUpdate"
          @loadedmetadata="loadDuration"
          @play="handlePlay"
          @pause="handlePause"
          @ended="onEnded"
        />
      </b-card-body>
    </b-card>

    <!-- Fullscreen Modal -->
    <div v-if="isFullscreen" class="fullscreen-overlay" @click.self="toggleFullscreen">
      <div class="fullscreen-player">
        <div class="fullscreen-content">
          <!-- Album cover in fullscreen -->
          <div class="fullscreen-image-container">
            <album-cover :thumbnail="music.thumbnail" :is-fullscreen="true" />
          </div>

          <!-- Lyrics in fullscreen -->
          <div v-if="music.showLyrics && music.lyrics.length > 0" class="fullscreen-lyrics-wrapper">
            <lyrics-display
              :visible-lyrics="getVisibleLyrics()"
              :current-time="music.currentTime"
              :is-fullscreen="true"
              :max-visible-lines="maxVisibleLines"
              :show-fullscreen-button="false"
            />
          </div>

          <!-- Close button -->
          <b-button variant="link" class="fullscreen-close-button" @click="toggleFullscreen">
            <span class="material-icons-outlined">close</span>
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AlbumCover from './AlbumCover.vue'
import LyricsDisplay from './LyricsDisplay.vue'

// Props
const props = defineProps({
  music: {
    type: Object,
    required: true,
  },
})

// Emits
const emit = defineEmits(['play'])

// Local state
const maxVisibleLines = ref(4) // Fixed to always show 4 lines
const isFullscreen = ref(false)
const audioPlayer = ref(null)

// Initialize lyrics if available
onMounted(() => {
  if (props.music.lyricsSrc && props.music.lyrics.length === 0) {
    fetchLyrics()
  }
})

// Restore body scroll if component is destroyed while in fullscreen
onUnmounted(() => {
  if (isFullscreen.value) {
    document.body.style.overflow = ''
  }
})

// Methods
const fetchLyrics = async () => {
  try {
    const response = await fetch(props.music.lyricsSrc)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const srt = await response.text()
    props.music.lyrics = parseSRT(srt)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching lyrics:', error)
  }
}

const parseSRT = (srt) => {
  const lines = srt.replace(/\r/g, '').split('\n\n')
  const subtitles = []

  lines.forEach(line => {
    const parts = line.split('\n')
    if (parts.length >= 2) {
      const [startTime, endTime] = parts[1].split(' --> ')
      const text = parts.slice(2).join('\n')

      if (startTime && endTime && text) {
        subtitles.push({
          start: timeToSeconds(startTime),
          end: timeToSeconds(endTime),
          text,
        })
      }
    }
  })

  return subtitles
}

const timeToSeconds = (time) => {
  const parts = time.replace(',', '.').split(':')
  const [h, m, s] = parts.map(parseFloat)
  if (parts.length === 3) {
    return h * 3600 + m * 60 + s
  }
  return m * 60 + s
}

const handleTimeUpdate = (event) => {
  props.music.currentTime = event.target.currentTime
  updateLyrics()
}

const handlePlay = () => {
  props.music.isPlaying = true
  emit('play', props.music)
}

const handlePause = () => {
  props.music.isPlaying = false
}

const updateLyrics = () => {
  const currentLyric = props.music.lyrics.find(
    lyric => props.music.currentTime >= lyric.start && props.music.currentTime <= lyric.end,
  )
  if (currentLyric) {
    props.music.currentLyric = currentLyric.text
  } else if (props.music.showLyrics) {
    props.music.currentLyric = ''
  }
}

const getVisibleLyrics = () => {
  if (!props.music.lyrics || props.music.lyrics.length === 0) return []

  const currentTime = props.music.currentTime
  const allLyrics = []

  // Find current lyric index
  const currentIndex = props.music.lyrics.findIndex(
    lyric => currentTime >= lyric.start && currentTime <= lyric.end,
  )

  // Build array with all lyrics
  for (let i = 0; i < props.music.lyrics.length; i++) {
    const lyric = props.music.lyrics[i]
    if (lyric) {
      const isActive = i === currentIndex

      // If we're past all lyrics, treat the last lyric as active for visual consistency
      const isPastAllLyrics =
        currentTime > props.music.lyrics[props.music.lyrics.length - 1].end
      const shouldBeActive =
        isActive || (isPastAllLyrics && i === props.music.lyrics.length - 1)

      allLyrics.push({
        text: lyric.text,
        isActive: shouldBeActive,
        position: i,
        start: lyric.start,
        end: lyric.end,
      })
    }
  }

  return allLyrics
}

const loadDuration = (event) => {
  props.music.duration = event.target.duration
}

const toggleLyrics = async () => {
  if (props.music.lyrics.length === 0 && props.music.lyricsSrc) {
    await fetchLyrics()
  }
  props.music.showLyrics = !props.music.showLyrics
  if (!props.music.showLyrics) {
    props.music.currentLyric = ''
  }
}

const onEnded = () => {
  props.music.isPlaying = false
}

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value

  // Prevent body scroll when fullscreen is active
  if (isFullscreen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const togglePlayPause = () => {
  if (audioPlayer.value) {
    if (props.music.isPlaying) {
      audioPlayer.value.pause()
    } else {
      audioPlayer.value.play()
    }
  }
}

const pausePlayer = () => {
  // Method to pause this player - called from parent component
  if (audioPlayer.value) {
    audioPlayer.value.pause()
    props.music.isPlaying = false
  }
}

// Expose methods/refs to parent
defineExpose({
  pausePlayer,
  togglePlayPause,
  audioPlayer,
  isFullscreen,
})
</script>

<style scoped lang="scss">
  @import '@/assets/scss/variables/variables';

  /* Card responsive padding */
  .card-body {
    padding: 1rem;
  }

  @media (max-width: 768px) {
    .card-body {
      padding: 0.75rem;
    }
  }

  @media (max-width: 480px) {
    .card-body {
      padding: 0.5rem;
    }
  }

  /* Music title styling */
  .music-title {
    font-family: inherit;
    font-weight: 700;
    font-size: 14px;

    line-height: 24px;
    letter-spacing: 0;
    text-align: center;

    margin: 0.5rem 0;

    color: map-get($theme-colors, 'collective');
  }

  .album-section {
    width: 100%;
    position: relative;
    margin: 0;
    padding: 0;
    display: inline-block;
  }

  .lyrics-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    border-radius: inherit;
  }

  .lyrics-overlay > * {
    pointer-events: auto;
  }

  /* Audio controls container - inline and compact */
  .audio-controls-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.25rem;
    padding: 0 0.25rem;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    flex-wrap: nowrap; /* Prevent wrapping */
  }

  /* Default HTML5 audio player styling */
  .default-audio-player {
    flex: 1;
    height: 40px;
    min-width: 180px; /* Reduced minimum width */
    max-width: 100%;
    overflow: hidden;
  }

  /* Hidden audio player in fullscreen mode */
  .hidden-audio {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    width: 1px;
    height: 1px;
  }

  /* Lyrics control button */
  .lyrics-control-btn {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    transition: all 0.2s ease;
  }

  .lyrics-control-btn .material-icons-outlined {
    font-size: 18px;
  }

  .lyrics-control-btn.active {
    background-color: var(--bs-primary);
    border-color: var(--bs-primary);
    color: white;
  }

  /* Mobile responsive styles for player content */
  @media (max-width: 992px) {
    .audio-controls-container {
      gap: 0.375rem;
      margin-top: 0.25rem;
    }

    .default-audio-player {
      min-width: 140px;
      height: 36px;
    }

    .lyrics-control-btn {
      width: 36px;
      height: 36px;
    }
  }

  @media (max-width: 768px) {
    .audio-controls-container {
      gap: 0.25rem;
      margin-top: 0.25rem;
      padding: 0;
    }

    .default-audio-player {
      min-width: 120px;
      height: 32px;
    }

    .lyrics-control-btn {
      width: 32px;
      height: 32px;
    }

    .lyrics-control-btn .material-icons-outlined {
      font-size: 16px;
    }
  }

  /* Fullscreen overlay styles */
  .fullscreen-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.95);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
  }

  .fullscreen-player {
    width: 95%;
    height: 95%;
    max-width: 1200px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fullscreen-content {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    gap: 2rem;
    padding: 2rem;
    align-items: center;
  }

  .fullscreen-image-container {
    grid-column: 1;
    grid-row: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .fullscreen-lyrics-wrapper {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .fullscreen-close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 10;
  }

  .fullscreen-close-button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  .fullscreen-close-button span {
    font-size: 1.5rem;
  }

  /* Mobile responsive styles for fullscreen */
  @media (max-width: 992px) {
    .fullscreen-content {
      grid-template-columns: 1fr 1.5fr;
      gap: 1.5rem;
      padding: 1.5rem;
    }

    .default-audio-player {
      min-width: 140px;
      height: 36px;
    }

    .lyrics-control-btn {
      width: 36px;
      height: 36px;
    }
  }

  @media (max-width: 768px) {
    .fullscreen-content {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
      gap: 1rem;
      padding: 1rem;
    }

    .fullscreen-image-container {
      grid-column: 1;
      grid-row: 1;
      max-height: 40vh;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 1rem;
    }

    .fullscreen-lyrics-wrapper {
      grid-column: 1;
      grid-row: 2;
      width: 100%;
      height: auto;
      min-height: 50vh;
      justify-content: center;
    }

    .fullscreen-close-button {
      top: 15px;
      right: 15px;
      width: 44px;
      height: 44px;
    }

    .default-audio-player {
      min-width: 120px;
      height: 32px;
    }

    .lyrics-control-btn {
      width: 32px;
      height: 32px;
    }

    .lyrics-control-btn .material-icons-outlined {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    .audio-controls-container {
      gap: 0.125rem;
      margin-top: 0.125rem;
      padding: 0;
    }

    .default-audio-player {
      min-width: 100px;
      height: 28px;
    }

    .lyrics-control-btn {
      width: 28px;
      height: 28px;
    }

    .lyrics-control-btn .material-icons-outlined {
      font-size: 14px;
    }

    .fullscreen-content {
      padding: 0.75rem;
      gap: 0.75rem;
    }

    .fullscreen-image-container {
      max-height: 35vh;
      padding-top: 0.5rem;
    }

    .fullscreen-lyrics-wrapper {
      min-height: 55vh;
    }

    .fullscreen-close-button {
      top: 10px;
      right: 10px;
      width: 40px;
      height: 40px;
    }

    .fullscreen-close-button span {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 360px) {
    .audio-controls-container {
      gap: 0.125rem;
      flex-wrap: nowrap; /* Ensure no wrapping even on very small screens */
    }

    .default-audio-player {
      min-width: 80px; /* Further reduced for very small screens */
      height: 24px;
      flex: 1;
    }

    .lyrics-control-btn {
      width: 24px;
      height: 24px;
      flex-shrink: 0; /* Prevent the button from shrinking */
    }

    .lyrics-control-btn .material-icons-outlined {
      font-size: 12px;
    }

    .fullscreen-content {
      padding: 0.5rem;
      gap: 0.5rem;
    }

    .fullscreen-image-container {
      max-height: 30vh;
      padding-top: 0.25rem;
    }

    .fullscreen-lyrics-wrapper {
      min-height: 60vh;
    }
  }
</style>