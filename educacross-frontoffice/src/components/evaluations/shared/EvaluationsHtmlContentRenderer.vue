<template>
  <div class="html-content-renderer" :style="cssVars" v-html="sanitizedHtml"></div>
</template>

<script setup>
import DOMPurify from 'dompurify'
import { computed } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  maxImageHeight: {
    type: String,
    default: '400px',
  },
  maxImageWidth: {
    type: String,
    default: '100%',
  },
})

const sanitizedHtml = computed(() => {
  if (!props.content) return ''

  // Replace \n with <br/> tags
  let htmlWithBreaks = props.content.replace(/\n/g, '<br/>')

  // Transform <align=center> to <span class="align-center">
  htmlWithBreaks = htmlWithBreaks.replace(/<align=center>/gi, '<span class="align-center">')
  htmlWithBreaks = htmlWithBreaks.replace(/<align=left>/gi, '<span class="align-left">')
  htmlWithBreaks = htmlWithBreaks.replace(/<align=right>/gi, '<span class="align-right">')
  htmlWithBreaks = htmlWithBreaks.replace(/<align=justify>/gi, '<span class="align-justify">')
  htmlWithBreaks = htmlWithBreaks.replace(
    /<align=justified>/gi,
    '<span class="align-justify">',
  )
  htmlWithBreaks = htmlWithBreaks.replace(/<\/align>/gi, '</span>')

  const config = {
    ALLOWED_TAGS: ['img', 'b', 'br', 'p', 'div', 'span', 'i', 'u', 'strong', 'em'],
    ALLOWED_ATTR: ['src', 'alt', 'title', 'width', 'height', 'class', 'style'],
  }

  return DOMPurify.sanitize(htmlWithBreaks, config)
})

const cssVars = computed(() => ({
  '--max-image-height': props.maxImageHeight,
  '--max-image-width': props.maxImageWidth,
}))
</script>

<style lang="scss">
.html-content-renderer {
  white-space: wrap;
  overflow-wrap: break-word;

  img {
    max-width: var(--max-image-width);
    max-height: var(--max-image-height);
    height: auto;
  }

  .align-center {
    display: block;
    text-align: center;
    width: 100%;

    img {
      display: inline-block;
      max-width: var(--max-image-width);
      max-height: var(--max-image-height);
    }
  }

  .align-left {
    display: block;
    text-align: left;
    width: 100%;

    img {
      display: inline-block;
      max-width: var(--max-image-width);
      max-height: var(--max-image-height);
    }
  }

  .align-right {
    display: block;
    text-align: right;
    width: 100%;

    img {
      display: inline-block;
      max-width: var(--max-image-width);
      max-height: var(--max-image-height);
    }
  }

  .align-justify {
    display: block;
    text-align: justify;
    width: 100%;

    img {
      display: inline-block;
      max-width: var(--max-image-width);
      max-height: var(--max-image-height);
    }
  }
}
</style>