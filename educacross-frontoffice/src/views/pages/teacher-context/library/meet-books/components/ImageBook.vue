<template>
  <div class="text-center">
    <div class="d-flex justify-content-between align-items-center mb-1">
      <h2 class="text-primary">Prévia do livro</h2>
      <div>
        <b-button
          variant="outline-primary"
          class="mr-50 btn-icon"
          :disabled="currentPage <= 0"
          @click="previousPage"
        >
          <!-- <span class="material-symbols-outlined" style="font-size: 20px"> arrow_back_ios </span>
            -->
          <feather-icon icon="ChevronLeftIcon" />
        </b-button>
        <b-button
          variant="outline-primary"
          :disabled="currentPage * 2 >= imageUrls.length"
          class="btn-icon"
          @click="nextPage"
        >
          <!-- <span class="material-symbols-outlined" style="font-size: 20px"> arrow_forward_ios </span> -->
          <feather-icon icon="ChevronRightIcon" />
        </b-button>
      </div>
    </div>
    <div class="book mb-1">
      <div
        v-for="(url, index) in imageUrls"
        v-show="showingPages.includes(index)"
        :key="url"
        class="page rounded"
      >
        <b-img
          :src="url"
          alt="Book Page"
          class="cursor-pointer"
          :style="`z-index: ${1000 + index};`"
          fluid-grow
          @click="() => (index % 2 === 0 ? nextPage() : previousPage())"
        />
      </div>
    </div>

    <span class="text-primary">Páginas {{ showingPagesToString }} de {{ imageUrls.length }}</span>
  </div>
</template>

<script setup>
import { ref, computed, toRef } from 'vue'

const props = defineProps({
  imageUrls: Array,
})

const currentPage = ref(0)
const imageUrls = toRef(props, 'imageUrls')

const showingPages = computed(() => {
  if (currentPage.value === 0) return [0]
  if (currentPage.value * 2 >= imageUrls.value.length) return [imageUrls.value.length - 1]
  const rightPageIndex = currentPage.value * 2
  const leftPageIndex = rightPageIndex - 1
  return [leftPageIndex, rightPageIndex]
})

const showingPagesToString = computed(() => {
  return showingPages.value.map(pageIndex => pageIndex + 1).join('/')
})

const nextPage = () => {
  if (currentPage.value < imageUrls.value.length - 1) {
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--
  }
}
</script>

<style lang="scss" scoped>
  .book {
    display: flex;
    justify-content: center;
  }
  .page {
    img {
      max-width: 527px;
      max-height: 744.83px;
      object-fit: cover;
    }

    &:nth-of-type(odd) img {
      border-radius: 5px 30px 30px 5px !important;
      box-shadow: 5px 0px 5px #d5d5d5, 5px 5px 5px #d5d5d5;
    }

    &:nth-of-type(even) img {
      border-radius: 30px 5px 5px 30px !important;
      box-shadow: -5px 0px 5px #d5d5d5, -5px 5px 5px #d5d5d5;
    }
  }
</style>