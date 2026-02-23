<script setup>
import DescriptorTag from '@/components/descriptors/DescriptorTag.vue'
import { getSubjectVariant } from '@/utils/utils'
import { ref } from 'vue'
import { formatNumber } from '@/filters/filters'

// Props
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
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

// Emits
const emit = defineEmits(['open:details'])

const descriptorsLimit = 5

/**
 * @param {Array} descriptors
 * @returns {Array}
 */
const limitDescriptorsNumber = (descriptors) => {
  if (!Array.isArray(descriptors)) return []
  if (descriptors.length > descriptorsLimit) {
    return [...descriptors.slice(0, descriptorsLimit)]
  }
  return descriptors
}

const excessDescriptors = (descriptors) => {
  if (!Array.isArray(descriptors) || descriptors.length < descriptorsLimit) return []
  return descriptors.slice(descriptorsLimit)
}
</script>

<template>
  <b-card
    :class="isSelected ? 'border border-primary shadow-primary' : ''"
    body-class="d-flex flex-column"
    class="h-100"
  >
    <div class="d-flex flex-grow-1 flex-column flex-md-row">
      <b-media
        class="flex-column flex-md-row align-items-center mb-1 mb-md-0 flex-grow-1"
        vertical-align="center"
      >
        <template #aside>
          <div
            class="image-border rounded mb-1 mb-md-0"
            :class="{
              'opacity-25 cursor-wait': loadingDetails,
              'cursor-pointer': showViewDetails,
            }"
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
          <h4 class="text-primary">{{ item.topicName }}</h4>
          <b-card-text>
            <p v-if="item.objectOfKnowledgeName" class="mb-0">
              Objeto do conhecimento:
            </p>
            <span class="text-primary font-semibold">{{ item.objectOfKnowledgeName }}</span>
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
            <DescriptorTag
              v-else
              :descriptor="{
                id: item.descriptorId,
                tag: item.descriptorTag,
                educationalOrganizationName: item.educationalOrganizationName,
                knowledgeAxisName: item.topicName,
                knowledgeObject: item.descriptorKnowledgeObject,
                name: item.descriptorName,
              }"
              :subject-id="subjectId"
            />
          </b-card-text>
        </b-media-body>
      </b-media>
      <slot name="left-content" v-bind="{ isSelected, item }" class="mt-auto"></slot>
    </div>
  </b-card>
</template>

<style lang="scss" scoped>
.image-border {
  border: 1px solid #d8d6de;
}
</style>