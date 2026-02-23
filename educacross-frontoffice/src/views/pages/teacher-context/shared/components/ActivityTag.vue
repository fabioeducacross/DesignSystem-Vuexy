<template>
  <div class="d-flex w-100 justify-content-center flex-wrap px-1 row row-cols-10">
    <div
      v-for="(activity, activityIndex) in data"
      :id="`${activityIndex}-id`"
      :key="activityIndex"
      class="d-flex flex-column mr-1 mb-1"
    >
      <img :src="activity.imageUrl" class="img-activity" alt="activity" :name="activityIndex" />
      <b-tooltip
        :target="`${activityIndex}-id`"
        placement="top"
        variant="light"
        custom-class="tooltip-container"
      >
        <div class="text-left">
          <p class="title-activity">
            <span class="title-activity-name mr-50">{{ activity.activityName }}</span>
            <b-badge variant="primary" class="align-top" pill>Nível {{ activity.level }}</b-badge>
          </p>
          <p class="text-activity">
            {{ activity.learningObjective }}
          </p>
          <span
            class="text-patternOne cursor-pointer underline text-primary mx-0 my-0"
            @click="
              showActivityDetail(
                activity.activityId ? activity.activityId : activity.id,
                `${activityIndex}-id`,
              )
            "
            >Ver detalhes</span
          >
          <br />
        </div>
      </b-tooltip>
    </div>

    <b-modal
      ref="activityDetail"
      v-model="activePromptActivityDetail"
      size="xl"
      hide-footer
      header-class="bg-white"
      scrollable
      no-close-on-backdrop
      no-close-on-esc
      static
      @close="activePromptActivityDetail = false"
    >
      <template v-slot:modal-header>
        <button v-if="renderWebgl" class="back" @click="renderWebgl = false">
          <span class="material-symbols-outlined" style="font-size: 16px"> arrow_back </span>
        </button>
        <button class="close" @click="hideActivityDetailModal">
          <span aria-hidden="true">&times;</span>
        </button>
      </template>
      <activity-detail
        v-if="activePromptActivityDetail"
        v-model="renderWebgl"
        :activity-id="selectedActivityId"
        :subject-id="subjectId"
        :educational-organization-id="educationalOrganizationId"
        @close-activityDetail="closeActivityDetail"
      />
    </b-modal>
  </div>
</template>

<script setup>
  import ActivityDetail from '../modals/ActivityDetail.vue'
  import { BTooltip, BModal } from 'bootstrap-vue'
  import store from '@/store'

  // Props
  const props = defineProps({
    data: { type: Array, require: true, default: () => [] },
    educationalOrganizationId: { required: false, type: Number },
  })

  // Emits
  const emit = defineEmits(['modal-been-closed'])

  // State
  import { ref, computed } from 'vue'
  const activePromptActivityDetail = ref(false)
  const selectedActivityId = ref(0)
  const renderWebgl = ref(false)
  const activityDetail = ref(null)

  // Computed
  const subjectId = computed(() => {
    return store.getters['filters/subject']?.id
  })

  // Methods
  const showActivityDetail = (id, tooltipId) => {
    // Hide BV tooltip via event bus
    // In Vue 2.7, root instance is available at globalProperties.$root in setup
    // But event bus is best used via emitter pattern, but here we use $root.$emit for legacy BootstrapVue tooltip
    // For compatibility, we use window.Vue.$root.$emit if available, otherwise dispatch an event (since $root not accessible directly)
    // Instead, we can globally emit to window for vue2
    if (typeof window !== 'undefined' && window.Vue && window.Vue.$root) {
      window.Vue.$root.$emit('bv::hide::tooltip', tooltipId)
    }
    selectedActivityId.value = id
    activePromptActivityDetail.value = true
    renderWebgl.value = false
  }

  const closeActivityDetail = () => {
    activePromptActivityDetail.value = false
    emit('modal-been-closed')
  }

  const hideActivityDetailModal = () => {
    if (activityDetail.value && activityDetail.value.hide) {
      activityDetail.value.hide()
    }
  }
</script>

<style lang="scss" scoped>
  .float-left {
    float: left !important;
  }
  .tooltip-container::v-deep .tooltip-inner {
    max-width: 500px !important;
    width: 400px !important;
    padding: 1rem;
  }

  .title-activity {
    margin: 1rem 0;
  }
  .title-activity-name {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: #6b6b6b;
  }
  .text-activity {
    font-size: 14px;
    line-height: 19px;
    color: #2c2c2c;
    margin-bottom: 1rem;
  }

  .img-activity {
    width: 100px;
    height: 100px;
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
</style>