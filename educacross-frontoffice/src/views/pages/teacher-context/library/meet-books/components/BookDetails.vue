<template>
  <div>
    <section class="pt-2 px-1">
      <b-row align-v="start" class="mb-1">
        <b-col cols="12" lg="5" xl="4" class="">
          <div class="d-flex align-items-strech gap-4 mb-1">
            <div>
              <img
                :src="bookDetails.imageUrl"
                alt="activity"
                aspect-ratio="1/1"
                class="img-activity"
                width="141"
                height="200"
              />
            </div>
            <div class="font-weight-bold">
              <h1 class="text-primary mb-0">{{ bookDetails.title }}</h1>

              <p class="font-12 mb-0">
                Autor: <span class="font-bold text-primary">{{ bookDetails.author }}</span>
              </p>

              <p class="font-12 mb-0">
                Objetivo: <span class="font-bold text-primary">{{ bookDetails.goal }}</span>
              </p>

              <p class="font-12 mb-0">
                Gênero:
                <span class="font-bold text-primary">{{ bookDetails.genre }}</span>
              </p>

              <p class="font-12 mb-0">
                Temática:
                <span class="font-bold text-primary">{{ bookDetails.thematic }}</span>
              </p>

              <p class="font-12 mb-0">
                Tempo de leitura previsto:
                <span class="font-bold text-primary">{{ bookDetails.readingTimeInMin }}min</span>
              </p>
            </div>
          </div>
          <!--  <div>
            <b-button
              variant="primary"
              class="d-flex align-items-center gap-2 justify-content-center w-100 mb-1"
              @click="$emit('update:render-webgl', true)"
            >
              <span class="material-symbols-outlined" style="font-size: 22px">play_circle</span>
              <span>Ler como aluno</span>
            </b-button>
          </div> -->
          <b-button
            v-if="bookDetails.classPlanUrl"
            variant="primary"
            block
            :disabled="loadingDownloadClassPlan"
            @click="downloadClassPlan"
          >
            <b-spinner v-if="loadingDownloadClassPlan" small class="mr-50"></b-spinner>
            <span class="material-symbols-outlined" style="font-size: 18px; vertical-align: middle"
              >picture_as_pdf</span
            >
            Baixar plano de aula
          </b-button>
        </b-col>
        <b-col cols="12" lg="7" xl="8">
          <section class="px-lg-3">
            <div>
              <h4>Sinopse</h4>
              <p>
                {{ bookDetails.synopsis }}
              </p>
            </div>
          </section>
        </b-col>
      </b-row>
      <hr />
      <div>
        <ImageBook :image-urls="pages"></ImageBook>
      </div>
    </section>
  </div>
</template>

<script setup>
import ImageBook from '@/views/pages/teacher-context/library/meet-books/components/ImageBook.vue'
import { saveAs } from 'file-saver'
import { ref } from 'vue'

// Props
const props = defineProps({
  bookDetails: {
    type: Object,
  },
})

// State
const loadingDownloadClassPlan = ref(false)
const pages = ref([])

// Set pages based on bookDetails.images
pages.value = props.bookDetails.images?.map(imageUrl => imageUrl.imageUrl) || []

// Methods
const downloadClassPlan = async () => {
  const url = props.bookDetails.classPlanUrl
  loadingDownloadClassPlan.value = true
  const name = `plano_de_aula_${props.bookDetails.title}.pdf`
  saveAs(url, name)
  loadingDownloadClassPlan.value = false
}

const options = {
  speed: 500,
}
</script>

<style lang="scss" scoped></style>