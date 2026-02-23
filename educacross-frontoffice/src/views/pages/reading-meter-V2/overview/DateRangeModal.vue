<template>
  <b-modal
    id="modal-date-range"
    :visible="visible"
    title="Aplicar avaliação"
    title-class="text-body"
    size="sm"
    centered
    hide-footer
    content-class="p-0"
    modal-class="modal-primary"
    static
    no-close-on-backdrop
    @hide="handleClose"
  >
    <div class="p-1">
      <div class="text-center mb-2">
        <span class="material-symbols-outlined text-list mb-2">calendar_month</span>
        <h3 class="font-weight-500 text-center mb-1">Defina o período de aplicação</h3>
        <p
          class="small mb-0"
          style="
            font-family: Montserrat;
            font-weight: 400;
            font-size: 14px;
            line-height: 21px;
            letter-spacing: 0px;
            text-align: center;
          "
        >
          {{ setMsg }}
          <span class="text-primary font-weight-bold"> {{ setSerieOrInstitution }}</span>
        </p>
      </div>

      <flat-pickr
        v-model="selectedDates"
        :config="flatpickrConfig"
        class="form-control text-center"
        placeholder="Defina o período"
        @on-change="setPeriod"
      />

      <div class="text-center mt-3">
        <b-button
          variant="primary"
          class="d-inline-block"
          style="width: 95px; height: 44px"
          :disabled="!selectedDates || !selectedDates.length"
          @click="handleApply"
        >
          Aplicar
        </b-button>
      </div>
    </div>
  </b-modal>
</template>

<script setup>
import store from '@/store'
import { formatISODate } from '@/utils/date'
import { getflatpickrLanguage } from '@/utils/locale.js'
import 'flatpickr/dist/flatpickr.css'
import { computed, reactive, ref } from 'vue'
import flatPickr from 'vue-flatpickr-component'

// Props
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  serieName: {
    type: String,
    required: true,
  },
})

// Emits
const emit = defineEmits(['apply', 'update:visible'])

// Access Role
const accessRole = store.getters.accessRole
const isManager = accessRole === 'NetworkManager'

// State
const selectedDates = ref([])
const defaultDate = [new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)]

// ISO range for emitting
const rangeDateValue = ref([
  formatISODate(defaultDate[0]),
  formatISODate(defaultDate[1]),
])

const flatpickrConfig = reactive({
  locale: getflatpickrLanguage(),
  mode: 'range',
  minDate: 'today',
  dateFormat: 'd/m/Y',
  disableMobile: true,
})

// Computeds
const setMsg = computed(() => {
  if (isManager) {
    return 'Nesse período, a avaliação ficará disponível para todos de '
  }
  return 'Nesse período, a aplicação ficará disponível para todas as turmas do '
})

const setSerieOrInstitution = computed(() => {
  if (isManager) {
    return store.getters.accessUserData?.InstitutionName
  }
  return props.serieName || ''
})

// Events and Actions
const setPeriod = dates => {
  if (dates.length === 2) {
    rangeDateValue.value = [dates[0].toISOString(), dates[1].toISOString()]
  }
}

const handleApply = () => {
  if (rangeDateValue.value && rangeDateValue.value.length === 2) {
    emit('apply', {
      startDate: rangeDateValue.value[0],
      endDate: rangeDateValue.value[1],
    })
    emit('update:visible', false)
  }
}

const handleClose = () => {
  selectedDates.value = []
  emit('update:visible', false)
}
</script>

<style lang="scss" scoped>
  .modal-title {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 0;
  }

  .material-symbols-outlined {
    font-size: 48px;
    color: #7367f0;
  }

  ::v-deep .flatpickr-calendar {
    &.arrowTop:before,
    &.arrowTop:after {
      display: none;
    }
  }
</style>