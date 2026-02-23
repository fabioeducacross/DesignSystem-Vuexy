<template>
  <div class="meet-videos">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <!-- Videos Grid -->
    <div
      v-else-if="videos.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-1"
    >
      <div
        v-for="video in videos"
        :key="video.id"
        class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
        :class="{ 'lg:col-span-2': playingVideoId === video.id }"
        @click="handleVideoClick(video.id)"
      >
        <!-- Video Card -->
        <div class="p-1">
          <!-- Vimeo Player -->
          <div class="mb-2">
            <div class="bg-gray-100 rounded-lg overflow-hidden">
              <div style="padding: 75.31% 0 0 0; position: relative">
                <iframe
                  :src="`https://player.vimeo.com/video/${video.videoUrl}?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share; controls"
                  referrerpolicy="strict-origin-when-cross-origin"
                  style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
                  title="One Piece Abertura 1 - Tesouro dos Sonhos"
                ></iframe>
              </div>
            </div>
          </div>

          <div class="text-center">
            <h3 class="font-semibold text-lg line-clamp-2 text-primary">
              {{ video.title }}
            </h3>
            <div class="text-sm whitespace-nowrap">
              {{ formatDuration(video.duration) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-card>
      <list-table-pagination
        :per-page="params.limit"
        :total-data="pagination?.totalItems"
        :value="pagination?.currentPage"
        @change-page="changePage"
      />
    </b-card>
  </div>
</template>

<script setup>
import ListTablePagination from '@/components/table/ListTablePagination.vue'
import MockVideosService from '@/services/teacher-context/videos/MockVideos.service'
import { reactive, ref, onMounted } from 'vue'

// Reactive state
const videos = ref([])
const pagination = ref(null)
const loading = ref(false)
const playingVideoId = ref(null)

// Basic pagination params
const params = reactive({
  page: 1,
  limit: 20,
})

// Fetch videos from mock service
const fetchVideos = async () => {
  loading.value = true
  try {
    const response = await MockVideosService.getMeetVideos(params)
    if (response.status === 200) {
      videos.value = response.data.data
      pagination.value = response.data.pagination
    }
  } catch (error) {
    // Error handling (silenced)
  } finally {
    loading.value = false
  }
}

const handleVideoClick = videoId => {
  if (playingVideoId.value === videoId) {
    playingVideoId.value = null
  } else {
    playingVideoId.value = videoId
  }
}

// Change page
const changePage = page => {
  if (page) {
    params.page = page
    fetchVideos()
  }
}

// Utility functions
const formatDuration = seconds => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

// Extract Vimeo video ID from URL
const getVimeoId = url => {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return match ? match[1] : null
}

// Initialize component
onMounted(() => {
  fetchVideos()
})
</script>

<style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>