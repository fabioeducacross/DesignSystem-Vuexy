<template>
  <div>
    <h4>{{ event.name }}</h4>
    <div class="flex flex-col">
      <b-form-group id="startDate-group" class="w-100" label="Data de início*">
        <b-form-datepicker
          v-model="startDate"
          value-as-date
          hide-header
          calendar-width="100%"
          menu-class="w-100"
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }"
          :date-disabled-fn="disabledStartDays"
          label-help=""
          locale="pt-br"
          @input="changeStartDate()"
        />
      </b-form-group>
      <b-form-group id="endDate-group" class="w-100" label="Data final*">
        <b-form-datepicker
          v-model="endDate"
          value-as-date
          hide-header
          menu-class="w-100"
          calendar-width="100%"
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }"
          label-help=""
          locale="pt-br"
          :date-disabled-fn="disabledStartDays"
          @input="changeEndDate()"
        />
      </b-form-group>
      <b-form-group id="endDate-group" class="w-100">
        <b-form-checkbox v-model="enableForClasses"> Enviar para a(s) turma(s)</b-form-checkbox>
      </b-form-group>
      <b-button variant="primary" @click="activate"> Ativar</b-button>
    </div>
  </div>
</template>

<script setup>
import { postEventsActivate } from '@/services/shared/events/Events.Service.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { ref, getCurrentInstance } from 'vue'

// Props
const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
})

// Emits
const emit = defineEmits(['close-modal-success'])

const vm = getCurrentInstance().proxy

const enableForClasses = ref(false)
const startDate = ref(new Date())
const endDate = ref(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))

const disabledStartDays = date => {
  const dataDeOntem = new Date()
  dataDeOntem.setDate(dataDeOntem.getDate() - 1)
  return dataDeOntem > new Date(date)
}

const changeStartDate = () => {
  if (startDate.value > endDate.value) {
    endDate.value = startDate.value
  }
}

const changeEndDate = () => {
  if (endDate.value < startDate.value) {
    startDate.value = endDate.value
  }
}

const activate = () => {
  postEventsActivate(props.event.id, {
    startDate: startDate.value,
    endDate: endDate.value,
    enableForClasses: enableForClasses.value.toString(),
  }).then(() => {
    vm.$toast({
      component: Toast,
      props: {
        title: 'Evento ativado com sucesso',
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })
    emit('close-modal-success')
  })
}
</script>

<style lang="scss" scoped>
  @import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>