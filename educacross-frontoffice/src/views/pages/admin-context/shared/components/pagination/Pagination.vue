<template>
  <div class="pagination">
    <ul>
      <li class="icon-left" @click.prevent="changePage(currentPage - 1)">
        <a href="#">
          <feather-icon icon="ChevronLeftIcon" />
        </a>
      </li>
      <div id="pagination" class="pages">
        <template v-for="(item, idx) in paginationShow">
          <li
            v-if="item.page"
            :key="`page-${idx}`"
            :class="{ active: item.active }"
            @click.prevent="changePage(item.page)"
          >
            <a href="#">{{ item.page }}</a>
          </li>
          <li v-else :key="`dots-${idx}`">
            <a href="#">...</a>
          </li>
        </template>
      </div>
      <li class="icon-right" @click.prevent="changePage(currentPage + 1)">
        <a href="#">
          <feather-icon icon="ChevronRightIcon" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

  const props = defineProps({
    page: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
  })

  const emit = defineEmits(['changePage'])

  import { ref, watch, onMounted } from 'vue'

  const currentPage = ref(props.page)
  const pagination = ref([])
  const paginationShow = ref([])

  // Watchers
  watch(
    () => props.page,
    val => {
      currentPage.value = val
    }
  )

  watch(currentPage, val => {
    updatePagination()
    emit('changePage', val)
  })

  onMounted(() => {
    updatePagination()
  })

  const updatePagination = () => {
    const pages = Math.ceil(props.total / props.perPage)

    // create new array with pages numbers
    const group = Math.ceil(currentPage.value / 5)

    pagination.value = []

    for (let i = 1; i <= pages; i += 1) {
      const element = {
        page: i,
        active: currentPage.value === i,
      }
      pagination.value.push(element)
    }

    const pagesShowArr = pagination.value.slice((group - 1) * 5, group * 5)

    const firstPage = pagination.value[0]
    const lastPage = pagination.value[pagination.value.length - 1]

    const showFirstPage =
      firstPage && !pagesShowArr.find(page => page.page === firstPage.page)
    const showLastPage =
      lastPage && !pagesShowArr.find(page => page.page === lastPage.page)

    const pagesPrev = [{ dots: '...' }]
    const pagesNext = [{ dots: '...' }]

    if (showFirstPage && firstPage) {
      pagesShowArr.unshift(firstPage)
      pagesShowArr.unshift(...pagesPrev)
    }

    if (showLastPage && lastPage) {
      pagesShowArr.push(...pagesNext)
      pagesShowArr.push(lastPage)
    }

    paginationShow.value = pagesShowArr
  }

  const changePage = page => {
    const pages = Math.ceil(props.total / props.perPage)

    if (page <= 1) {
      currentPage.value = 1
      updatePagination()
      return
    }

    if (page >= pages) {
      currentPage.value = pages
      updatePagination()
      return
    }

    currentPage.value = page
  }
</script>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;

    ul {
      list-style: none;
      display: flex;
      align-items: center;

      li {
        &.icon-left,
        &.icon-right {
          cursor: pointer;
        }

        a {
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border: 1px solid #c0c0c0;
          border-radius: 5px;
          color: #333;
          margin: 0 2px;
        }

        &:hover,
        &.active {
          a {
            background: #5e50ee;
            color: #fff;
          }
        }

        &.pages {
          display: flex;
        }
      }
    }
  }
</style>