<template>
  <v-select
    :options="paginated"
    :filterable="false"
    @open="onOpen"
    @close="onClose"
    @search="query => (search.value = query)"
  >
    <template #list-footer>
      <li v-show="hasNextPage" ref="load" class="loader">Loading more options...</li>
    </template>
  </v-select>
</template>

<script setup>
import countries from './countries'
import vSelect from 'vue-select'

import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const observer = ref(null)
const limit = ref(10)
const search = ref('')

const filtered = computed(() =>
  countries.filter(country => country.includes(search.value))
)

const paginated = computed(() =>
  filtered.value.slice(0, limit.value)
)

const hasNextPage = computed(() =>
  paginated.value.length < filtered.value.length
)

const load = ref(null)

const infiniteScroll = async ([entry]) => {
  if (entry.isIntersecting) {
    const ul = entry.target.offsetParent
    const scrollTop = entry.target.offsetParent.scrollTop
    limit.value += 10
    await nextTick()
    ul.scrollTop = scrollTop
  }
}

const onOpen = async () => {
  if (hasNextPage.value) {
    await nextTick()
    if (load.value && observer.value) {
      observer.value.observe(load.value)
    }
  }
}

const onClose = () => {
  if (observer.value) {
    observer.value.disconnect()
  }
}

onMounted(() => {
  observer.value = new window.IntersectionObserver(infiniteScroll)
})

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})
</script>

<style lang="scss" scoped>
.loader {
  text-align: center;
  color: #bbbbbb;
}
</style>