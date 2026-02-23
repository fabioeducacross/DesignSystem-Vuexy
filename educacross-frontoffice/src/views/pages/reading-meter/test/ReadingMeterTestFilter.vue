<template>
  <b-card>
    <b-row>
      <b-col cols="12" md>
        <b-form-group label="Nível de proficiência leitora" label-for="schoolYear">
          <ESelect
            :value="ProficiencyValue"
            :options="ProficiencyOptions"
            label="text"
            @input="setProficiency"
          />
        </b-form-group>
      </b-col>

      <b-col cols="12" md="auto">
        <b-form-group label-for="button">
          <template v-slot:label>
            <span class="d-none d-md-inline-block"> &nbsp;</span>
          </template>
          <b-button
            block
            variant="primary"
            :disabled="dataReport.status !== 3"
            :class="dataReport.status !== 3 ? 'cursor-not-allowed' : 'cursor-pointer'"
            @click="prepareReEnableItem"
          >
            <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: sub">
              prompt_suggestion
            </span>
            Reaplicar teste à turma
          </b-button>
        </b-form-group>
      </b-col>
    </b-row>
    <ModalConfirm
      v-model="confirmReEnableIsOpen"
      :callback-confirm="reEnableItem"
      label-confirm="Aplicar teste"
      :busy="loadingAction"
    >
      <h4>Tem certeza que deseja reaplicar?</h4>
      <p>
        O teste ficará disponível novamente para
        <span class="text-primary font-bold">{{ dataReport.className }}.</span> Você poderá cancelar
        a qualquer momento.
      </p>
    </ModalConfirm>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import { ReadingProficiencyEnum } from '@/consts/ReadingMeterEnum.js'
import router from '@/router'
import { enableReading } from '@/services/shared/readingMeter/readingMeter.service'
import store from '@/store'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import ModalConfirm from '@/views/pages/groups/components/ModalConfirm.vue'
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification/composition'

const toast = useToast()

const { testId, classId } = router.currentRoute.params

const dataReport = computed(() => store.getters['ReadingMeterModule/readingsTestReport'])

const ProficiencyValue = computed(() => store.getters['ReadingMeterModule/proficiency'])

const ProficiencyOptions = computed(() => {
  return [{ text: 'Todos', id: null }, ...ReadingProficiencyEnum]
})

const setProficiency = value => {
  store.commit('ReadingMeterModule/setProficiency', value)
  store.dispatch('ReadingMeterModule/fetchDataTest', { testId, classId })
}

const loadingAction = ref(false)

const confirmReEnableIsOpen = ref(false)
const prepareReEnableItem = () => {
  confirmReEnableIsOpen.value = true
}

const reEnableItem = async () => {
  loadingAction.value = true

  try {
    const res = await enableReading({
      readingFluencyTestId: testId,
      classId,
    })
    if (res.status === 200) {
      toast({
        component: Toast,
        props: {
          title: 'Teste aplicado com sucesso!',
          icon: 'CheckCircleIcon',
          variant: 'success',
        },
      })
      store.commit('ReadingMeterModule/reset')
      store.dispatch('ReadingMeterModule/fetchDataTestReport', { testId, classId })
      store.dispatch('ReadingMeterModule/fetchDataTest', { testId, classId })
    }
  } finally {
    loadingAction.value = false
    confirmReEnableIsOpen.value = false
  }
}
</script>