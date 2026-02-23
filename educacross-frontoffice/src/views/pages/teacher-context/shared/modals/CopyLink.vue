<template>
  <div class="d-flex flex-column align-items-center">
    <img
      src="@/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-copy_link.png"
      class="image"
      alt="belinha"
    />
    <h1 class="title">Copy script link</h1>
    <b-form-input ref="input" v-model="missionLink" class="cursor-pointer custom-input" />
    <b-button class="custom-button" variant="primary" type="filled" @click="copyLink">
      Copy link
    </b-button>
  </div>
</template>

<script setup>
  import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
  import { BButton, BFormInput } from 'bootstrap-vue'

  const props = defineProps({
    missionLink: {
      type: String,
      required: true,
    },
  })

  const emit = defineEmits(['close-copylink-modal'])

  import { ref } from 'vue'

  const input = ref(null)
  const missionLink = ref(props.missionLink)

  // Keep v-model in template for UX, but do not emit changes, as input is read-only

  const copyLink = () => {
    if (input.value && input.value.$el) {
      try {
        const nativeInput = input.value.$el instanceof HTMLInputElement
          ? input.value.$el
          : input.value.$el.querySelector('input')

        if (nativeInput) {
          nativeInput.select()
          nativeInput.setSelectionRange(0, 99999)
        }
        navigator.clipboard.writeText(missionLink.value)
        // Use global $toast if available on proxy (compatible with root instance plugin)
        if (typeof getCurrentInstance === 'function') {
          const { proxy } = getCurrentInstance()
          proxy.$toast({
            component: Toast,
            props: {
              text: 'Link copied successfully.',
              icon: 'CheckCircleIcon',
              variant: 'success',
            },
          })
        }
      } catch (error) {
        if (typeof getCurrentInstance === 'function') {
          const { proxy } = getCurrentInstance()
          proxy.$toast({
            component: Toast,
            props: {
              text: 'An error occurred while copying link.',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
            },
          })
        }
      }
    }
  }

  import { getCurrentInstance } from 'vue'
</script>

<style lang="scss" scoped>
  .image {
    margin-bottom: 24px;
  }

  .title {
    color: #5e5873;
    font-size: 24px;
    line-height: 29px;
    font-weight: 500;
    margin-bottom: 24px;
  }
  .custom-button {
    width: 233px;
  }

  .custom-input {
    padding: 12px 38px;
    margin-bottom: 24px;
    pointer-events: none;
    cursor: pointer !important;
  }
</style>