<template>
  <div class="w-100">
    <div class="p-1 p-sm-2">
      <b-row class="match-height">
        <b-col
          v-for="(activity, indexActivity) in data"
          :key="indexActivity"
          cols="12"
          md="6"
          xl="4"
        >
          <b-card class="mb-2 mt-0" body-class="p-1 p-sm-2">
            <div class="d-flex flex-row">
              <div class="firstActivityColumn-image py-1 mr-2">
                <div class="activity-image-wrapper mb-1">
                  <b-img
                    :src="activity.imageUrl"
                    class="ActivityImage"
                    alt="activity"
                    width="100"
                    height="100"
                  />
                </div>
                <type-badge v-if="activity.type" :activity-type="activity.type"></type-badge>
              </div>
              <div class="secondActivityColumn-description d-flex flex-col justify-content-between">
                <div class="title-activity mb-1">
                  <span class="h4 mr-50 text-body">{{
                    activity.activityName ? activity.activityName : activity.name
                  }}</span>
                  <b-badge v-if="activity.level" variant="primary" pill class="align-top">
                    Nível {{ activity.level }}
                  </b-badge>
                </div>
                <p class="color-patternTwo m-0">
                  {{ activity.learningObjective }}
                </p>
                <div class="flex-row mt-1">
                  <div class="flex-column w-100">
                    <span
                      class="cursor-pointer text-primary text-activityCard h5"
                      @click="
                        showActivityDetail(activity.activityId ? activity.activityId : activity.id)
                      "
                      >{{ isHighfive ? 'See details' : $t('viewDetails') }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <b-modal
      ref="activityDetail"
      v-model="activePromptActivityDetail"
      size="xl"
      hide-footer
      header-class="bg-white"
      scrollable
      static
      no-close-on-backdrop
      no-close-on-esc
      @close="activePromptActivityDetail = false"
    >
      <template v-slot:modal-header>
        <button v-if="renderWebgl" class="back" @click="renderWebgl = false">
          <span class="material-symbols-outlined" style="font-size: 16px"> arrow_back </span>
        </button>
        <button class="close" @click="activePromptActivityDetail = false">
          <span aria-hidden="true">&times;</span>
        </button>
      </template>
      <activity-detail
        v-if="activePromptActivityDetail"
        :render-webgl="renderWebgl"
        :activity-id="selectedActivityId"
        :subject-id="subjectId"
        :lang="isHighfive ? 2 : 1"
        :educational-organization-id="educationalOrganizationId"
        @update:render-webgl="renderWebgl = $event"
        @close-activityDetail="activePromptActivityDetail = false"
      />
    </b-modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ActivityDetail from '../modals/ActivityDetail.vue'
import TypeBadge from './TypeBadge.vue'
import store from '@/store'

// Props
const props = defineProps({
  data: { type: Array, default: () => [] },
  isHighfive: { type: Boolean, default: false },
  educationalOrganizationId: { required: false, type: Number },
})

// State
const selectedActivityId = ref(0)
const activePromptActivityDetail = ref(false)
const renderWebgl = ref(false)

// Computed
const subjectId = computed(() => {
  return store.getters['filters/subject']?.id
})

// Methods
const showActivityDetail = (id) => {
  selectedActivityId.value = id
  activePromptActivityDetail.value = true
  renderWebgl.value = false
}
</script>

<style lang="scss" scoped>
  .title-activity {
    word-break: break-word;
    color: #6b6b6b;
  }
  .firstActivityColumn-image {
    min-width: 100px;
  }
  .secondActivityColumn-description {
    flex: 1;
  }
  .text-activityCard {
    font-weight: normal;
  }

  .back {
    position: absolute;
    top: -2px;
    right: 30px;

    padding: 0.7rem 0.7rem;
    box-shadow: 0 5px 20px 0 rgb(34 41 47 / 10%);
    border-radius: 0.357rem;
    background: #fff;

    color: #5e5873;

    opacity: 1;
    transition: all 0.23s ease 0.1s;

    &:hover {
      transform: translate(-3px, 5px);
    }
  }

  .left-arrow-icon {
    stroke-width: 3;
    transform: scale(1.2);
  }
  .ActivityImage {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  .activity-image-wrapper {
    width: 100px;
    height: 100px;
    background-color: #f0f0f0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>