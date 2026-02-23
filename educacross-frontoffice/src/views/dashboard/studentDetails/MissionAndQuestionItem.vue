<script setup>
import DescriptorTag from '@/components/descriptors/DescriptorTag.vue'
import { getSubjectVariant } from '@/utils/utils'
import { formatNumber } from '@/filters/filters'

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
  detailsTooltip: {
    type: [String, null],
    default: 'Ver detalhes',
  },
  loadingDetails: {
    type: Boolean,
    default: false,
  },
  subjectId: {
    type: Number,
    required: true,
  },
  showViewDetails: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['open:details'])

const descriptorsLimit = 5

/**
 * @param {Array<any>} descriptors
 * @returns {Array<any>}
 */
const limitDescriptorsNumber = descriptors => {
  if (descriptors.length > descriptorsLimit) {
    return [...descriptors.slice(0, descriptorsLimit)]
  }
  return descriptors
}

/**
 * @param {Array<any>} descriptors
 * @returns {Array<any>}
 */
const excessDescriptors = descriptors => {
  if (descriptors.length < descriptorsLimit) return []
  return descriptors.slice(descriptorsLimit)
}

// Expose getSubjectVariant for badge variant calculation
</script>

<template>
  <b-card
    :class="isSelected ? 'border border-primary shadow-primary' : ''"
    body-class="d-flex flex-column flex-md-row justify-content-between"
  >
    <b-media
      class="flex-column flex-md-row align-items-center mb-1 mb-md-0"
      vertical-align="center"
    >
      <template v-slot:aside>
        <div
          class="image-border rounded mb-1 mb-md-0"
          :class="{ 'opacity-25 cursor-wait': loadingDetails, 'cursor-pointer': showViewDetails }"
          @click="showViewDetails ? emit('open:details', item) : null"
        >
          <b-img
            :src="item.imageUrl"
            alt="Imagem do jogo"
            class="rounded"
            fluid
            height="100px"
            width="100px"
          />
          <div v-if="showViewDetails" class="d-flex justify-content-center">
            <span
              v-b-tooltip:hover="detailsTooltip"
              class="material-symbols-outlined align-middle text-primary"
              style="font-size: 24px"
              >visibility</span
            >
          </div>
        </div>
      </template>
      <b-media-body>
        <p class="mb-25">
          <span class="text-primary h4">{{ item.name }} </span>
          <b-badge v-if="item.roundType" pill variant="light-math" class="ml-50"> Quiz </b-badge>
          <b-badge v-else pill variant="light-orange" class="ml-50"> Jogo </b-badge>
          <b-badge v-if="item.roundType !== undefined" pill variant="light-primary" class="ml-50">
            Plus
          </b-badge>
        </p>
        <b-card-text>
          <p v-if="item.objectOfKnowledgeName" class="mb-0">
            Objeto do conhecimento:
            <span class="text-primary font-semibold">{{ item.objectOfKnowledgeName }}</span>
          </p>
          <p class="mb-0">
            Temática:
            <span class="text-primary font-semibold">{{ item.thematicName }}</span>
          </p>
          <div v-if="item.descriptors" class="d-flex gap-1 flex-wrap">
            <DescriptorTag
              v-for="descriptor in limitDescriptorsNumber(item.descriptors)"
              :key="descriptor.id"
              :descriptor="descriptor"
              :subject-id="subjectId"
            />
            <b-badge
              v-if="excessDescriptors(item.descriptors).length"
              :id="`excessDescriptors${item.id}`"
              pill
              :variant="getSubjectVariant(subjectId)"
              class="cursor-help"
            >
              +{{ formatNumber(excessDescriptors(item.descriptors).length) }}
            </b-badge>
            <b-popover
              v-if="excessDescriptors(item.descriptors).length"
              :target="`excessDescriptors${item.id}`"
              triggers="hover"
              variant="white"
            >
              <div class="d-flex flex-col gap-2">
                <DescriptorTag
                  v-for="descriptor in excessDescriptors(item.descriptors)"
                  :key="descriptor.id"
                  :descriptor="descriptor"
                  :subject-id="subjectId"
                  :placement="null"
                />
              </div>
            </b-popover>
          </div>
        </b-card-text>
      </b-media-body>
    </b-media>

    <slot name="left-content" v-bind="{ isSelected, item }"></slot>
  </b-card>
</template>

<style lang="scss" scoped>
  .image-border {
    border: 1px solid #d8d6de;
  }
</style>