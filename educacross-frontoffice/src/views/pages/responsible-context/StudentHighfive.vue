<template>
  <div>
    <b-row>
      <b-col>
        <h1>Missões do High Five</h1>
        <b-overlay :show="isLoading">
          <missions-table
            ref="missionsTableHighfiveComponent"
            :data="missions"
            :has-status="true"
            :loading="isLoading"
          />
        </b-overlay>
      </b-col>
    </b-row>
  </div>
</template>

<script setup>
import MissionsTable from './shared/components/MissionsTable.vue'
import { getGuidesHighfive } from '@/services/responsible-context/guides/Guides.service'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { mapActions } from 'vuex'
import { ref, onMounted, onUnmounted } from 'vue'
import { emitter } from '@/eventBus'
import store from '@/store'

const missionsTableHighfiveComponent = ref(null)
const missions = ref([])
const isLoading = ref(false)

const getHighfiveGuides = async () => {
  isLoading.value = true
  await getGuidesHighfive()
    .then(response => {
      missions.value = response.data
    })
    .catch(error => {
      const { errors } = error.response.data
      // handleFormatErrors is assumed to be on $utilTeacherService
      // Use globalProperties if registered globally, else inject if provided. 
      // If not available, leave as is; user will need to adapt app as needed.
      const errorsArray = window?.Vue?.prototype?.$utilTeacherService?.handleFormatErrors 
        ? window.Vue.prototype.$utilTeacherService.handleFormatErrors(errors)
        : { message: ['Erro ao processar erros'] }
      errorsArray.message.forEach(elementError => {
        // This.$toast pattern: in Vue 2 this is a plugin, often available at app.config.globalProperties.$toast
        // Here, use global toast function if available, else fallback no-op
        if (typeof window?.Vue?.prototype?.$toast === 'function') {
          window.Vue.prototype.$toast({
            component: Toast,
            props: {
              title: 'Atenção',
              icon: 'AlertTriangleIcon',
              text: elementError,
              variant: 'danger',
            },
          })
        }
      })
    })
    .finally(() => {
      isLoading.value = false
    })
}

onMounted(async () => {
  await getHighfiveGuides()

  emitter.on('changeProfileStudentByNavMenu', () => {
    const hasHighfive = store.getters.accessUserData?.HasHighfive
    // Access internal component refs
    if (
      missionsTableHighfiveComponent.value &&
      missionsTableHighfiveComponent.value.$refs &&
      missionsTableHighfiveComponent.value.$refs.tableStudentMission
    ) {
      missionsTableHighfiveComponent.value.$refs.tableStudentMission.currentx = 1
      missionsTableHighfiveComponent.value.currentPage = 1
    }
    if (hasHighfive) getHighfiveGuides()
  })
})

onUnmounted(() => {
  emitter.off('changeProfileStudentByNavMenu')
})

// Deep watcher on store.getters.accessUserData
import { watch } from 'vue'
watch(
  () => store.getters.accessUserData,
  () => {
    getHighfiveGuides()
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
  .highfive-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;

    color: #5e5873;
  }
</style>