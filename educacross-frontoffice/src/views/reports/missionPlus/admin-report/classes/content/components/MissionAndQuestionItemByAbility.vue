<template>
  <div class="d-flex flex-column flex-lg-row justify-content-between">
    <b-media
      class="flex-column flex-md-row align-items-center mb-1 mb-md-0"
      vertical-align="center"
    >
      <template v-slot:aside>
        <div
          class="rounded mb-1 mb-md-0"
          :class="{
            'opacity-25 cursor-wait': loadingDetails,
          }"
        >
          <b-img
            :src="item.imageUrl"
            alt="Imagem do jogo"
            class="rounded"
            fluid
            height="100px"
            width="100px"
          />
        </div>
      </template>
      <b-media-body>
        <b-card-text>
          <DescriptorTag :descriptor="item.descriptor" :subject-id="subjectId" />

          <div class="mb-1">
            Temática:
            <span class="text-primary font-semibold">{{ item.thematicName }}</span>
          </div>
          <p v-if="item.descriptor">{{ item.descriptor.name }}</p>
        </b-card-text>
      </b-media-body>
    </b-media>

    <slot name="left-content" v-bind="{ item }"></slot>
  </div>
</template>

<script setup>
  import DescriptorTag from '@/components/descriptors/DescriptorTag.vue'
  import { getSubjectVariant } from '@/utils/utils'

  const props = defineProps({
    item: {
      type: Object,
      default: () => {},
    },
    loadingDetails: {
      type: Boolean,
      default: false,
    },
    subjectId: {
      type: Number,
      required: true,
    },
  })
</script>

<style lang="scss" scoped>
  .image-border {
    border: 1px solid #d8d6de;
  }
</style>