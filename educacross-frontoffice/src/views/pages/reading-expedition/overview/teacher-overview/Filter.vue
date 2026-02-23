<template>
  <b-card>
    <b-row>
      <b-col cols="auto" md class="mb-1 mb-md-0">
        <div class="w-100 d-flex flex-row justify-content-start gap-2">
          <span>Escolha a forma de exibicao:</span>
          <div class="d-flex align-items-center">
            <b-form-radio v-model="viewMode" name="viewMode" :value="1" class="radio-inline">
              <span class="text-body">Engajamento</span>
            </b-form-radio>
          </div>
          <div class="d-flex align-items-center">
            <b-form-radio v-model="viewMode" name="viewMode" :value="2" class="radio-inline">
              <span class="text-body">Desempenho</span>
            </b-form-radio>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import { putReadingExpeditionClass } from '@/services/shared/reading-expedition/reading-expedition.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue'

const vm = getCurrentInstance().proxy

const { classe } = useFilters()

const viewMode = ref(store.getters['readingExpeditionModuleOverviewTeacher/viewMode'])
const enabled = computed(
  () => store.getters['readingExpeditionModuleOverviewTeacher/enabled'],
)

const loading = computed(
  () => store.getters['readingExpeditionModuleOverviewTeacher/loading'],
)

const checked = ref(false)

const confirmModal = ref(false)

const onCheckboxChange = data => {
  confirmModal.value = data
  if (!data) confirm()
}

const cancel = () => {
  checked.value = !checked.value
  confirmModal.value = false
}

const confirm = () => {
  confirmModal.value = false

  putReadingExpeditionClass(classe.value.ClassId, { enabled: checked.value }).then(() => {
    vm.$toast({
      component: Toast,
      props: {
        title: 'Alteracao realizada com sucesso!',
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })

    store.commit('readingExpeditionModuleOverviewTeacher/enabled', checked.value)
    store.commit('readingExpeditionModuleOverviewTeacher/reset')
    store.dispatch('readingExpeditionModuleOverviewTeacher/fetch')
  })
}

watch([viewMode, classe], () => {
  store.commit('readingExpeditionModuleOverviewTeacher/viewMode', viewMode.value)
  store.commit('readingExpeditionModuleOverviewTeacher/reset')
  store.dispatch('readingExpeditionModuleOverviewTeacher/fetch')
})

watch(loading, () => {
  checked.value = enabled.value
})

onMounted(() => {
  store.dispatch('readingExpeditionModuleOverviewTeacher/fetch')
})
</script>
