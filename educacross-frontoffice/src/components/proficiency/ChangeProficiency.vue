<template>
  <section v-if="hideAlert">
    <b-alert show variant="primary" @dismissed="onDismissed">
      <div class="alert-body text-center">
        <h6 class="text-primary font-weight-bolder">
          Que tal personalizar a avaliação desta atividade?
        </h6>
        <div class="d-flex justify-content-center gap-2 mb-50">
          <div>
            <b-row>
              <b-col
                v-for="item in iterableEnum"
                :key="item.id"
                cols="12"
                md="6"
                lg="auto"
                class="mb-1"
              >
                <b-badge
                  :variant="item.current ? item.variant : `light-${item.variant}`"
                  :class="[
                    { 'bg-transparent': !item.current },
                    `border-${item.variant} cursor-pointer text-uppercase px-2 py-25 d-flex align-items-center justify-content-center gap-1`,
                  ]"
                  @click="changeCurrentProficiency(item)"
                >
                  <span
                    :class="`material-symbols-outlined text-${item.current ? 'white' : item.variant}`"
                    style="font-size: 12px"
                  >
                    person_edit
                  </span>
                  {{ item.label }}
                </b-badge>
              </b-col>
            </b-row>
          </div>
        </div>
        <!-- <p class="text-body underline cursor-pointer" @click="refModalReportInconsistency.show()">
          Relatar inconsistência na análise automática.
        </p> -->
      </div>
    </b-alert>

    <b-modal
      ref="refModalConfirm"
      centered
      static
      hide-header
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
    >
      <section class="text-center mb-2">
        <span
          class="material-symbols-outlined font-weight-bolder text-warning"
          style="font-size: 80px"
        >error</span>
        <h3 class="font-weight-bolder text-body mb-2">Tem certeza que deseja alterar?</h3>
        <div v-if="proficiency" class="d-flex gap-2">
          <div class="text-center flex-1 px-2 py-1 d-flex flex-column">
            <h6 class="text-body font-weight-bolder">ATUAL:</h6>
            <p class="text-body font-weight-bold">{{ proficiencyText(proficiency) }}</p>
            <span class="material-symbols-outlined mt-auto">stat_minus_3</span>
            <br />
            <BadgeStatus :value="proficiency.level" enum="proficiency" :pill="!changeProficiency" />
          </div>
          <div
            v-if="newProficiency"
            class="h100 text-center flex-1 text-primary border-primary rounded px-2 py-1 d-flex flex-column"
          >
            <h6 class="text-primary font-weight-bolder">TROCAR POR:</h6>
            <p class="font-weight-bold">{{ proficiencyText(newProficiency, true) }}</p>
            <span class="material-symbols-outlined mt-auto">stat_minus_3</span>
            <br />
            <BadgeStatus
              :value="newProficiency.level"
              enum="proficiency"
              :pill="!newProficiency.changeLevel"
            />
          </div>
        </div>
      </section>
      <section class="d-flex justify-content-center w-100 gap-2 mb-1">
        <b-button
          variant="outline-danger"
          :disabled="loadingChangeProficiency"
          @click="refModalConfirm.hide()"
        >
          Cancelar
        </b-button>
        <b-button
          variant="primary"
          :disabled="loadingChangeProficiency"
          @click="saveProficiencyChange"
        >
          <b-spinner v-show="loadingChangeProficiency" show small />
          Alterar
        </b-button>
      </section>
    </b-modal>

    <b-modal
      ref="refModalReason"
      centered
      static
      hide-header
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
    >
      <section>
        <b-form @submit.prevent="onSubmit">
          <b-form-group
            label="Deseja registrar o motivo da sua alteração? (opcional)"
            label-class="h5 text-body"
          >
            <b-form-textarea
              id="textarea"
              v-model="reason"
              placeholder="Registre aqui."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
          <div class="d-flex justify-content-center w-100">
            <b-button :disabled="loadingChangeReason" variant="primary" type="submit">
              <b-spinner v-show="loadingChangeReason" show small />
              Concluir
            </b-button>
          </div>
        </b-form>
      </section>
    </b-modal>
    <b-modal
      ref="refModalReportInconsistency"
      centered
      static
      hide-header
      hide-footer
      no-close-on-backdrop
      no-close-on-esc
    >
      <b-form @submit.prevent="">
        <b-form-group label="Qual inconsistência você identificou na análise automática?">
          <b-form-textarea
            id="textarea"
            v-model="reason"
            placeholder="Registre aqui."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
        <div class="d-flex gap-2">
          <b-button
            class="flex-1"
            :disabled="loadingChangeReason"
            variant="outline-danger"
            type="button"
            @click="refModalReportInconsistency.hide()"
          >
            Cancelar
          </b-button>

          <b-button class="flex-1" :disabled="loadingChangeReason" variant="primary" type="submit">
            <b-spinner v-show="loadingChangeReason" show small />
            Concluir
          </b-button>
        </div>
      </b-form>
    </b-modal>
  </section>
</template>

<script setup>
import BadgeStatus from '@/components/badge/BadgeStatus.vue'
import { proficiency as proficiencyEnum } from '@/consts/legends/proficiencyEnum.js'
import router from '@/router'
import { computed, onUnmounted, ref } from 'vue'
import { emitter } from '@/eventBus'

// Props
const props = defineProps({
  currentProficiency: {
    type: Number,
    default: null,
  },
  changeProficiency: {
    type: Number,
    default: null,
  },
  callback: {
    type: Function,
    required: true,
  },
})

// Local Refs
const refModalConfirm = ref(null)
const refModalReason = ref(null)
const refModalReportInconsistency = ref(null)
const loadingChangeProficiency = ref(false)
const loadingChangeReason = ref(false)
const reason = ref('')
const dismissedRoutes = ref([])

const newProficiency = ref({})
const proficiency = ref(props.currentProficiency)

// Get current route name (Vue 2 router pattern)
const currentRouteName = router.currentRoute.name

const iterableEnum = computed(() => {
  return proficiencyEnum.map(item => {
    if (item.id === props.currentProficiency && props.changeProficiency) {
      return { ...item, variant: `${item.variant}`, current: true }
    }
    return { ...item, variant: item.variant, current: item.id === props.currentProficiency }
  })
})

function changeCurrentProficiency(item) {
  proficiency.value = {
    level: props.currentProficiency,
    changeLevel: props.changeProficiency,
  }
  newProficiency.value = { level: item.id, changeLevel: item.id !== props.changeProficiency }
  if (refModalConfirm.value) refModalConfirm.value.show()
}

// Event Bus - listens for external proficiency changes
emitter.on('changeCurrentProficiency', (current, newValue) => {
  proficiency.value = current
  newProficiency.value = newValue
  if (refModalConfirm.value) refModalConfirm.value.show()
})

onUnmounted(() => {
  emitter.off('changeCurrentProficiency')
})

async function saveProficiencyChange() {
  loadingChangeProficiency.value = true

  if (!newProficiency.value.changeLevel) {
    await fetchSave()
    if (refModalConfirm.value) refModalConfirm.value.hide()
    loadingChangeProficiency.value = false
    emitter.emit('reloadChallenge')
    return
  }

  if (refModalConfirm.value) refModalConfirm.value.hide()
  if (refModalReason.value) refModalReason.value.show()
  loadingChangeProficiency.value = false
}

async function onSubmit() {
  loadingChangeReason.value = true
  await fetchSave()
  emitter.emit('reloadChallenge')
  if (refModalReason.value) refModalReason.value.hide()
  loadingChangeReason.value = false
}

async function fetchSave() {
  return props.callback({
    level: newProficiency.value.level,
    reasonChangeLevel: reason.value,
  })
}

function onDismissed() {
  loadDismissedRoutes()
  dismissedRoutes.value.push(currentRouteName)
  sessionStorage.setItem('dismissedRoutes', JSON.stringify(dismissedRoutes.value))
}

function loadDismissedRoutes() {
  const dismissedRoutesStorage = sessionStorage.getItem('dismissedRoutes')
  if (dismissedRoutesStorage) {
    dismissedRoutes.value = JSON.parse(dismissedRoutesStorage)
  }
}

const hideAlert = computed(() => {
  loadDismissedRoutes()
  return !dismissedRoutes.value.includes(currentRouteName)
})

function proficiencyText(item, newProficiency = false) {
  if (newProficiency) {
    if (!props.changeProficiency) return 'Minha avaliação personalizada.'
    return item.level !== props.changeProficiency
      ? ''
      : 'Avaliação feita pela Inteligência Artificial.'
  }
  return item.changeLevel
    ? 'Minha avaliação personalizada.'
    : 'Avaliação feita pela Inteligência Artificial.'
}

// Expose for parent if required (optional, not used in template)
defineExpose({
  changeCurrentProficiency,
  saveProficiencyChange,
  onSubmit,
  onDismissed,
})

</script>