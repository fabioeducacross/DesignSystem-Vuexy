<template>
  <b-row
    v-if="route.meta.breadcrumb || route.meta.pageTitle"
    class="content-header mb-2 d-none d-md-flex"
  >
    <!-- Content Left -->
    <b-col>
      <b-row class="breadcrumbs-top">
        <b-col cols="12">
          <!-- <h2
            class="content-header-title float-left pr-1 mb-0 color-patternTwo"
          >
            {{ route.meta.pageTitle }}
          </h2> -->
          <div class="breadcrumb-wrapper">
            <b-breadcrumb class="pl-0">
              <b-breadcrumb-item to="/">
                <feather-icon icon="HomeIcon" size="16" class="align-text-top" />
              </b-breadcrumb-item>
              <b-breadcrumb-item
                v-for="item in route.meta.breadcrumb"
                :key="item.text"
                :active="item.active"
                :to="item.to"
              >
                {{ $tc(item.text, item.plural ? 2 : 0) }}
              </b-breadcrumb-item>
            </b-breadcrumb>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script setup>
import {
  BBreadcrumb,
  BBreadcrumbItem,
  BRow,
  BCol,
  BDropdown,
  BDropdownItem,
  BButton,
} from 'bootstrap-vue'
import { onMounted, onUnmounted } from 'vue'
import Ripple from 'vue-ripple-directive'
import { useRoute } from 'vue-router/composables'
import { emitter } from '@/eventBus'

const route = useRoute()

/**
 * Sets the breadcrumb text for the current route.
 * @param {Array} newBreadcrumb - An array of strings representing the new breadcrumb text.
 */
const setBreadcrumb = newBreadcrumb => {
  if (route.meta && route.meta.breadcrumb) {
    route.meta.breadcrumb = route.meta.breadcrumb.map((item, index) => {
      if (item && newBreadcrumb[index]) {
        return { ...item, text: newBreadcrumb[index] }
      }
      return item
    })
  }
}

const replaceBreadcrumb = newBreadcrumb => {
  if (route.meta) {
    route.meta.breadcrumb = newBreadcrumb
  }
}

onMounted(() => {
  emitter.on('setBreadcrumb', setBreadcrumb)
  emitter.on('replaceBreadcrumb', replaceBreadcrumb)
})

onUnmounted(() => {
  emitter.off('setBreadcrumb', setBreadcrumb)
  emitter.off('replaceBreadcrumb', replaceBreadcrumb)
})
</script>

<script>
export default {
  directives: {
    Ripple,
  },
}
</script>