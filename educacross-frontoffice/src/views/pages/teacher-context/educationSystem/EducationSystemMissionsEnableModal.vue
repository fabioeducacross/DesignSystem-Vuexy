<template>
  <div>
    <div class="flex flex-col align-items-center">
      <span class="material-symbols-outlined text-primary mb-2" style="font-size: 48px">
        calendar_month
      </span>

      <h3 class="mb-2 text-body">Definir um período?</h3>
      <div class="d-flex justify-content-center gap-4 mb-2">
        <b-form-radio
          v-model="definePeriod"
          name="some-radios"
          :value="false"
          :state="definePeriod ? null : false"
        >
          Não
        </b-form-radio>
        <b-form-radio
          v-model="definePeriod"
          name="some-radios"
          :value="true"
          :state="definePeriod ? true : null"
        >
          Sim
        </b-form-radio>
      </div>

      <div v-show="definePeriod" class="mb-2">
        <b-form-group id="startDate-group" :class="{ 'opacity-50': !definePeriod }">
          <flat-pickr
            :value="rangeDateValue"
            name="period"
            class="form-control calendar"
            :config="flatpickrConfig"
            @on-change="setPeriod"
          />
        </b-form-group>
      </div>
      <b-form-group class="text-center">
        <b-button variant="primary" :disabled="busy" @click="activate">
          <b-spinner v-if="busy" small class="mr-50" />Habilitar
        </b-button>
      </b-form-group>
    </div>
  </div>
</template>

<script setup>
import { formatISODate } from '@/utils/date'
import { getflatpickrLanguage } from '@/utils/locale.js'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { ref, getCurrentInstance, reactive, watch, computed } from 'vue'
import flatPickr from 'vue-flatpickr-component'

const emit = defineEmits(['close-modal-success'])

const busy = ref(false)
const definePeriod = ref(false)

const defaultDate = [new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)]

const rangeDateValue = reactive([
  formatISODate(defaultDate[0]),
  formatISODate(defaultDate[1]),
])

const vm = getCurrentInstance().proxy

const locale = computed(() => vm.$i18n.locale)

const minDate = computed(() => {
  const data = new Date()
  data.setHours(0, 0, 0, 0)
  return data
})

const flatpickrConfig = reactive({
  locale: getflatpickrLanguage(),
  mode: 'range',
  altFormat: 'd/m/Y',
  altInput: true,
  defaultDate,
  minDate,
})

watch(locale, () => {
  flatpickrConfig.locale = getflatpickrLanguage()
})

const setPeriod = selectedDates => {
  if (selectedDates.length === 2) {
    rangeDateValue[0] = selectedDates[0].toISOString().slice(0, 10)
    rangeDateValue[1] = selectedDates[1].toISOString().slice(0, 10)
  }
}

const activate = () => {
  busy.value = true
  if (!definePeriod.value) {
    emit('close-modal-success', {})
    return
  }
  emit('close-modal-success', {
    startDate: new Date(rangeDateValue[0]),
    endDate: new Date(rangeDateValue[1]),
  })
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-flatpicker.scss';

  .calendar {
    min-width: 200px;
  }
</style>