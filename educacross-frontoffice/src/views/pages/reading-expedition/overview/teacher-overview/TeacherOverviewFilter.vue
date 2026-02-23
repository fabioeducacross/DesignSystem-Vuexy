<template>
  <b-card>
    <b-row>
      <b-col cols="auto" md class="mb-1 mb-md-0">
        <div class="w-100 d-flex flex-row justify-content-start gap-2">
          <span>Escolha a forma de exibição:</span>
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
      <b-col cols="auto" md>
        <div class="d-flex align-items-center justify-content-end">
          <span class="material-icons-outlined" style="font-size: 16px">info</span>
          <b-form-checkbox
            v-model="checked"
            class="custom-control-primary ml-50"
            name="check-button"
            switch
            @change="onCheckboxChange"
          >
            <span class="switch-icon-left">
              <span class="material-symbols-outlined align-middle" style="font-size: 16px">
                done
              </span>
            </span>
            <span class="switch-icon-right">
              <span
                class="material-symbols-outlined align-middle text-secondary"
                style="font-size: 16px"
              >
                close
              </span>
            </span>
          </b-form-checkbox>
          <span>Desbloquear etapas automaticamente.</span>
        </div>
      </b-col>
    </b-row>
    <ModalConfirm
      v-model="confirmModal"
      :callback-cancel="cancel"
      :callback-confirm="confirm"
      label-cancel="Cancelar"
      label-confirm="Alterar"
    >
      <h4>Tem certeza que deseja alterar?</h4>
      <div>
        <p>
          Esta ação fará com que a nova etapa seja
          <span class="font-bold text-primary">liberada automaticamente</span> ao aluno após a
          finalização da etapa anterior.
        </p>
      </div>
    </ModalConfirm>
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
        title: 'Alteração realizada com sucesso!',
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
