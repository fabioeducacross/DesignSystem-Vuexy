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
                  :variant="item.current ? `${item.variant}` : `light-${item.variant}`"
                  :class="[
                    { 'bg-transparent': !item.current },
                    `border-${item.variant} cursor-pointer text-uppercase px-2 py-25 d-flex align-items-center justify-content-center gap-1`,
                  ]"
                  @click="changeProficiency(item)"
                >
                  <span
                    :class="`material-symbols-outlined text-${item.current ? 'white' : item.variant}`"
                    style="font-size: 12px"
                  >
                    person_edit
                  </span>{{ item.label }}
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
          <div class="text-center flex-1 px-2 py-1">
            <h6 class="text-body font-weight-bolder">ATUAL:</h6>
            <p class="text-body font-weight-bold">{{ proficiencyText(proficiency) }}</p>
            <span class="material-symbols-outlined">stat_minus_3</span>
            <br />

            <BadgeStatusReadingExpedition
              :value="proficiency.level ? proficiency.level : proficiency.status"
              :enum="proficiency.level ? 'ProficiencyTestStatusEnum' : 'ExpeditionStageStatusEnum'"
              :pill="!proficiency.changeLevel"
            />
          </div>
          <div v-if="newProficiency" class="flex-1">
            <div class="text-center flex-1 text-primary border-primary rounded px-2 py-1">
              <h6 class="text-primary font-weight-bolder">TROCAR POR:</h6>
              <p class="font-weight-bold">{{ proficiencyText(newProficiency) }}</p>
              <span class="material-symbols-outlined">stat_minus_3</span>
              <br />
              <BadgeStatusReadingExpedition
                :value="newProficiency.level ? newProficiency.level : newProficiency.status"
                :enum="
                  newProficiency.level ? 'ProficiencyTestStatusEnum' : 'ExpeditionStageStatusEnum'
                "
                :pill="!newProficiency.changeLevel"
              />
            </div>
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
import {
  EExpeditionStageStatus,
  ProficiencyTestStatusEnum,
} from '@/consts/ReadingExpeditionEnum.js'
import router from '@/router'
import { putReadingExpeditionStudentChangeLevel } from '@/services/shared/reading-expedition/reading-expedition.service.js'
import BadgeStatusReadingExpedition from '@/views/pages/reading-expedition/overview/components/BadgeStatusReadingExpedition.vue'
import { computed, getCurrentInstance, onUnmounted, ref } from 'vue'

// Props
const props = defineProps({
  studentId: {
    type: Number || null,
  },
  currentProficiency: {
    type: Object || null,
  },
  stage: {
    type: Number || null,
  },
  type: {
    type: Number || null,
  },
})

// Emits (none used for parent communication directly, so omitted)

// Instance for $bus
const vm = getCurrentInstance().proxy

// Modal Refs
const refModalConfirm = ref(null)
const refModalReason = ref(null)
const refModalReportInconsistency = ref(null)

// Loading states
const loadingChangeProficiency = ref(false)
const loadingChangeReason = ref(false)

// Reason for change
const reason = ref('')

// Dismissed routes tracking
const currentRouteName = router.currentRoute.name
const dismissedRoutes = ref([])

// Proficiency state
const newProficiency = ref({})
const proficiency = ref(props.currentProficiency)

// Computed enum rendering
const iterableEnum = computed(() => {
  return ProficiencyTestStatusEnum.slice(1).map(item => {
    if (item.id === props.currentProficiency.level && props.currentProficiency.changeLevel) {
      return { ...item, variant: `${item.variant}`, current: true }
    }
    return { ...item, variant: 'dark-gray' }
  })
})

// Change proficiency handler
const changeProficiency = item => {
  proficiency.value = props.currentProficiency
  newProficiency.value = { status: 4, level: item.id, changeLevel: true }

  refModalConfirm.value.show()
}

// Bus triggers from other components (for compatibility)
vm.$bus.on('changeProficiency', (current, newValue) => {
  proficiency.value = current
  newProficiency.value = newValue
  refModalConfirm.value.show()
})

onUnmounted(() => {
  vm.$bus.off('changeProficiency')
})

const saveProficiencyChange = async () => {
  loadingChangeProficiency.value = true

  if (!newProficiency.value.changeLevel) {
    await fetchSave()
    refModalConfirm.value.hide()
    loadingChangeProficiency.value = false
    vm.$bus.emit('reloadChallenge')
    return
  }

  refModalConfirm.value.hide()
  refModalReason.value.show()
  loadingChangeProficiency.value = false
}

const onSubmit = async () => {
  loadingChangeReason.value = true
  await fetchSave()
  vm.$bus.emit('reloadChallenge')
  refModalReason.value.hide()
  loadingChangeReason.value = false
}

const fetchSave = async () => {
  return putReadingExpeditionStudentChangeLevel(props.studentId, {
    stage: props.stage,
    type: props.type,
    level: newProficiency.value.level,
    reasonChangeLevel: reason.value,
  })
}

const onDismissed = () => {
  loadDismissedRoutes()
  dismissedRoutes.value.push(currentRouteName)
  sessionStorage.setItem('dismissedRoutes', JSON.stringify(dismissedRoutes.value))
}

const loadDismissedRoutes = () => {
  const dismissedRoutesStorage = sessionStorage.getItem('dismissedRoutes')
  if (dismissedRoutesStorage) {
    dismissedRoutes.value = JSON.parse(dismissedRoutesStorage)
  }
}

const hideAlert = computed(() => {
  loadDismissedRoutes()
  return !dismissedRoutes.value.includes(currentRouteName)
})

const proficiencyText = item => {
  return item.changeLevel
    ? 'Minha avaliação personalizada.'
    : 'Avaliação feita pela Inteligência Artificial.'
}
</script>