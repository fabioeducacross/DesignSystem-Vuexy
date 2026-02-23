<script setup>
import Divider from '@/components/divider/Divider.vue'
import MissionDetailsPlus from '@/components/mission-plus/MissionDetailsPlus.vue'
import ESelect from '@/components/selects/ESelect.vue'
import {
  applicationTypeEnum,
  fluxOptions,
  rankingOptions,
  studentMessageSuggestions,
} from '@/consts/missionsEnum'
import router from '@/router'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { useCustomMissionV2 } from '@/views/pages/teacher-context/records/missions/customMissionV2/useCustomMissionV2'
import { max, required, requiredDateRange } from '@core/utils/validations/validations.js'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Vue, { ref, computed, watch, getCurrentInstance } from 'vue'

// Setup
const vm = getCurrentInstance().proxy
const missionDataValidatorObserver = ref(null)
const {
  missionInfo,
  selectedItems,
  loadingMissionPlus,
  filtersItems,
  createMission,
  sendMission,
} = useCustomMissionV2()

Vue.set(missionInfo.value, 'flux', fluxOptions[0].value)
const disableStudentSelect = ref(false)
const showMissionCreatedModal = ref(false)
const guideId = ref(null)
const loadingSendMission = ref(false)
const editing = !!router.currentRoute.params.id

const disableMessageToStudent = computed(() => {
  return missionInfo.value.classe.some(c => !c.enableMessageGuide)
})

const changeClass = classes => {
  if (!(classes instanceof Array)) return

  const s = classes.map(item => item.students).flat()
  missionInfo.value.students = s
  filtersItems.value.students = s

  disableStudentSelect.value = classes.length > 1
}

watch(disableMessageToStudent, value => {
  if (value) {
    missionInfo.value.messageToStudent = ''
  }
})

const submitMission = () => {
  missionDataValidatorObserver.value.validate().then(async success => {
    if (!success) return

    guideId.value = await createMission()

    vm.$bus.emit('showConfirmExit', false)

    if (missionInfo.value.enabled) {
      vm.$toast({
        component: Toast,
        props: {
          title: 'Atenção',
          icon: 'CheckCircleIcon',
          text: 'Missão salva com sucesso!',
          variant: 'success',
        },
      })
      gotoList()
    } else {
      showMissionCreatedModal.value = true
    }
  })
}

watch(
  () => missionInfo.value.classe,
  () => {
    changeClass(missionInfo.value.classe)
  },
)

watch(
  () => missionInfo.value.start,
  () => {
    if (missionInfo.value.end >= missionInfo.value.start) return

    const tempDate = new Date(missionInfo.value.start)
    tempDate.setDate(tempDate.getDate() + 7)

    if (tempDate.getFullYear() !== missionInfo.value.start.getFullYear()) {
      missionInfo.value.end = new Date(missionInfo.value.start.getFullYear(), 11, 31)
    } else {
      missionInfo.value.end = tempDate
    }
  },
)

const sendMissionPlus = async () => {
  loadingSendMission.value = true
  await sendMission(guideId.value)

  gotoList()

  loadingSendMission.value = false
}

const gotoList = () => {
  router.push({ name: 'activeMissions' })
}

const cancel = () => {
  router.back()
}

const maxDate = computed(() => {
  let tempDate = new Date(missionInfo.value.start)
  tempDate.setDate(tempDate.getDate() + 30)

  if (tempDate.getFullYear() !== missionInfo.value.start.getFullYear()) {
    tempDate = new Date(missionInfo.value.start.getFullYear(), 11, 31)
  }

  return tempDate
})

const putTextSuggestion = () => {
  let randomMessage = missionInfo.value.messageToStudent

  while (randomMessage === missionInfo.value.messageToStudent) {
    randomMessage =
      studentMessageSuggestions[Math.floor(Math.random() * studentMessageSuggestions.length)]
        .text
  }

  missionInfo.value.messageToStudent = randomMessage
}
</script>

<template>
  <b-card class="mb-2">
    <ValidationObserver ref="missionDataValidatorObserver">
      <b-form autocomplete="off">
        <b-skeleton-wrapper :loading="loadingMissionPlus">
          <template v-slot:loading>
            <b-form-row>
              <b-col cols="12" md="4">
                <b-skeleton class="mb-1" type="input" />
              </b-col>
              <b-col cols="12" md="5">
                <b-skeleton class="mb-1" type="input" />
              </b-col>
              <b-col cols="12" md="3">
                <b-skeleton class="mb-1 mb-md-0" type="input" />
              </b-col>
              <b-col cols="12" md="6">
                <b-skeleton class="mb-1 mb-md-0" type="input" />
              </b-col>
              <b-col cols="12" md="6">
                <b-skeleton class="mb-1 mb-md-0" type="input" />
              </b-col>
            </b-form-row>
          </template>
          <b-form-row class="match-height">
            <b-col cols="12">
              <b-form-group label-for="mission-name">
                <template v-slot:label>
                  <div class="d-flex justify-content-between">
                    <label>Nome da Missão*</label>
                    <small>{{ missionInfo.name.length }}/38 caracteres</small>
                  </div>
                </template>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Nome da Missão"
                  rules="required|max:38"
                >
                  <b-form-input
                    id="mission-name"
                    v-model="missionInfo.name"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Digite o nome da missão"
                  ></b-form-input>
                  <small v-for="(error, index) in errors" :key="index" class="text-danger">
                    {{ error }}
                  </small>
                </ValidationProvider>
              </b-form-group>
            </b-col>
            <b-col cols="12" lg="8">
              <b-form-row>
                <b-col cols="12" md="6">
                  <b-form-group label-for="classe">
                    <template v-slot:label>
                      <div>
                        <span class="labelStyle align-middle">Turmas* </span>
                        <span
                          id="info-tooltip"
                          v-b-tooltip.hover.right="
                            'É permitida a criação de até 40 missões ao mês por turma.'
                          "
                          class="material-symbols-outlined align-middle cursor-pointer"
                          style="font-size: 16px"
                        >
                          info
                        </span>
                      </div>
                    </template>
                    <ValidationProvider v-slot="{ errors }" name="Turmas" rules="required">
                      <ESelect
                        id="classe"
                        v-model="missionInfo.classe"
                        :options="filtersItems.classes"
                        :state="errors.length > 0 ? false : null"
                        :table-columns="[
                          {
                            key: 'className',
                            label: 'Turma',
                            searchable: true,
                          },
                        ]"
                        label="className"
                        multiple
                        @input="changeClass"
                      >
                        <template v-slot:option="item">
                          <div class="d-flex align-items-center gap-1">
                            <span :class="item.guidesCreated >= 40 ? 'text-muted' : ''">
                              {{ item.className }}
                            </span>
                            <b-badge variant="primary">{{ item.serieName }}</b-badge>
                            <span
                              v-if="
                                item.guidesCreated &&
                                item.guidesCreated >= 25 &&
                                item.guidesCreated < 40
                              "
                              id="info-tooltip"
                              v-b-tooltip.hover="
                                `${item.guidesCreated} de 40 missões criadas. As missões dessa turma estão se esgotando.`
                              "
                              class="material-symbols-outlined align-middle cursor-pointer"
                              style="font-size: 16px"
                            >
                              info
                            </span>
                            <span
                              v-else-if="item.guidesCreated && item.guidesCreated >= 40"
                              id="info-tooltip"
                              v-b-tooltip.hover="
                                `${item.guidesCreated} de 40 missões criadas. As missões dessa turma se esgotaram.`
                              "
                              class="material-symbols-outlined align-middle cursor-pointer text-danger"
                              style="font-size: 16px"
                            >
                              gpp_maybe
                            </span>
                          </div>
                        </template>
                      </ESelect>
                      <small v-for="(error, index) in errors" :key="index" class="text-danger">
                        {{ error }}
                      </small>
                    </ValidationProvider>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group label="Alunos da Turma*" label-for="students">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Alunos da Turma"
                      rules="required"
                    >
                      <ESelect
                        id="students"
                        v-model="missionInfo.students"
                        :disabled="disableStudentSelect"
                        :options="filtersItems.students"
                        :state="errors.length > 0 ? false : null"
                        :table-columns="[
                          { key: 'studentName', label: 'Nome do Aluno', searchable: true },
                        ]"
                        label="studentName"
                        multiple
                        table-title="Alunos selecionados"
                      >
                        <template v-slot:allOptionsLabel><span>Todos</span></template>
                      </ESelect>

                      <small v-for="(error, index) in errors" :key="index" class="text-danger">
                        {{ error }}
                      </small>
                    </ValidationProvider>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group label="Data Inicial*" label-for="periodStart">
                    <ValidationProvider v-slot="{ errors }" name="Período" rules="required">
                      <b-form-datepicker
                        v-model="missionInfo.start"
                        locale="pt-br"
                        value-as-date
                        hide-header
                        calendar-width="100%"
                        menu-class="w-100"
                        :state="errors.length > 0 ? false : null"
                        :min="new Date()"
                        :max="new Date(new Date().getFullYear(), 11, 31)"
                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                      ></b-form-datepicker>
                      <small v-for="(error, index) in errors" :key="index" class="text-danger">
                        {{ error }}
                      </small>
                    </ValidationProvider>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group label="Data Final*" label-for="periodEnd">
                    <ValidationProvider v-slot="{ errors }" name="Período" rules="required">
                      <b-form-datepicker
                        v-model="missionInfo.end"
                        locale="pt-br"
                        value-as-date
                        hide-header
                        calendar-width="100%"
                        menu-class="w-100"
                        :state="errors.length > 0 ? false : null"
                        :min="missionInfo.start"
                        :max="maxDate"
                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                      ></b-form-datepicker>
                      <small v-for="(error, index) in errors" :key="index" class="text-danger">
                        {{ error }}
                      </small>
                    </ValidationProvider>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                  <b-form-group label="Fluxo da Missão*" label-for="radio-inline">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Fluxo da Missão"
                      rules="required"
                    >
                      <b-form-radio-group
                        v-model="missionInfo.flux"
                        stacked
                        :state="errors.length > 0 ? false : null"
                        name="radio-inline"
                      >
                        <b-form-radio
                          v-for="(ranking, index) in fluxOptions"
                          :key="index"
                          :value="ranking.value"
                          :class="{ 'mb-50': index === 0 }"
                        >
                          {{ ranking.text }}
                        </b-form-radio>
                      </b-form-radio-group>
                      <small v-for="(error, index) in errors" :key="index" class="text-danger">
                        {{ error }}
                      </small>
                    </ValidationProvider>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                  <b-form-group label="Ranking da missão*" label-for="ranking-radio">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Ranking da missão"
                      rules="required"
                    >
                      <b-form-radio-group
                        v-model="missionInfo.rankingEnabled"
                        stacked
                        :state="errors.length > 0 ? false : null"
                        name="ranking-radio"
                      >
                        <b-form-radio
                          v-for="(ranking, index) in rankingOptions"
                          :key="index"
                          :value="ranking.value"
                          :class="{ 'mb-50': index === 0 }"
                        >
                          {{ ranking.text }}
                        </b-form-radio>
                      </b-form-radio-group>
                      <small v-for="(error, index) in errors" :key="index" class="text-danger">
                        {{ error }}
                      </small>
                    </ValidationProvider>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                  <b-form-group
                    label="Onde a missão deve ser realizada?"
                    label-for="application-radio"
                  >
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Onde a missão deve ser realizada"
                      rules="required"
                    >
                      <b-form-radio-group
                        v-model="missionInfo.application"
                        stacked
                        :state="errors.length > 0 ? false : null"
                        name="application-radio"
                      >
                        <b-form-radio
                          v-for="(application, index) in applicationTypeEnum"
                          :key="index"
                          :value="index"
                          :class="{ 'mb-50': application.id === 1 }"
                        >
                          <b-img :src="application.img" width="20px" height="20px" class="inline" />
                          {{ application.inputLabel }}
                        </b-form-radio>
                      </b-form-radio-group>
                      <small v-for="(error, index) in errors" :key="index" class="text-danger">
                        {{ error }}
                      </small>
                    </ValidationProvider>
                  </b-form-group>
                </b-col>
              </b-form-row>
            </b-col>
            <b-col cols="12" lg="4">
              <b-form-group label-for="studentMessage" :disabled="disableMessageToStudent">
                <template v-slot:label>
                  <div class="d-flex justify-content-between">
                    <div>
                      <span class="align-middle">Recado para o aluno </span>
                      <span
                        id="info-tooltip"
                        v-b-tooltip="
                          'Esta mensagem aparecerá antes que os alunos iniciem a missão.'
                        "
                        class="material-symbols-outlined align-middle cursor-help font-semibold"
                        style="font-size: 16px"
                      >
                        info
                      </span>
                    </div>
                    <small class="align-middle">
                      {{
                        missionInfo.messageToStudent ? missionInfo.messageToStudent.length : 0
                      }}/600 caracteres
                    </small>
                  </div>
                </template>
                <ValidationProvider v-slot="{ errors }" name="Recado para o aluno" rules="max:600">
                  <b-form-textarea
                    id="studentMessage"
                    v-model="missionInfo.messageToStudent"
                    :placeholder="
                      disableMessageToStudent
                        ? 'Está função está desabilitada para uma das turmas selecionadas.'
                        : 'Recado opcional.'
                    "
                    :state="errors.length > 0 ? false : null"
                    rows="7"
                    no-resize
                    :disabled="disableMessageToStudent"
                  />
                  <small v-for="(error, index) in errors" :key="index" class="text-danger">
                    {{ error }}
                  </small>
                </ValidationProvider>
                <div class="d-flex justify-content-between">
                  <b-link
                    class="font-bold"
                    style="cursor: pointer"
                    :disabled="disableMessageToStudent"
                    @click="putTextSuggestion()"
                  >
                    <span
                      class="material-symbols-outlined font-bold align-middle"
                      style="font-size: 18px"
                      >emoji_objects</span
                    >
                    <span class="align-middle"> Sugerir texto</span>
                  </b-link>
                </div>
              </b-form-group>
            </b-col>
          </b-form-row>
        </b-skeleton-wrapper>
      </b-form>
    </ValidationObserver>

    <b-modal
      v-model="showMissionCreatedModal"
      body-class="text-center"
      centered
      hide-footer
      hide-header
      no-close-on-backdrop
      no-close-on-esc
      size="lg"
      title="Missão criada com sucesso"
    >
      <span
        class="material-symbols-outlined bg-light-success p-1 rounded mb-1"
        style="font-size: 80px"
      >
        task_alt
      </span>
      <h2 class="text-success mb-0">Missão criada com sucesso!</h2>

      <Divider class="mx-auto" style="width: 70%">
        <div></div>
      </Divider>

      <MissionDetailsPlus :guide-id="guideId" />

      <Divider class="mx-auto" style="width: 70%">
        <div></div>
      </Divider>

      <h3>O que deseja fazer agora?</h3>
      <div class="d-flex justify-content-center gap-2 mb-2">
        <b-button :disabled="loadingSendMission" variant="outline-primary" @click="gotoList">
          Sair sem enviar missão
        </b-button>
        <b-button :disabled="loadingSendMission" variant="primary" @click="sendMissionPlus">
          Enviar missão agora
          <b-spinner v-show="loadingSendMission" small variant="white"></b-spinner>
        </b-button>
      </div>

      <div>
        <b>Atenção:</b> Ao enviar a missão agora, ela irá se iniciar em
        <span class="text-primary font-bold">{{ missionInfo.start | formatDate }}</span>
        e então, não será mais possível apagar ou editá-la.
      </div>
    </b-modal>
    <portal to="fixed-sticky-footer-destination">
      <div class="bg-white p-1 d-flex justify-content-center gap-2 shadow">
        <b-button :disabled="loadingMissionPlus" variant="outline-danger" @click="cancel">
          Cancelar
        </b-button>
        <b-button
          :disabled="!selectedItems.some(i => i.item) || loadingMissionPlus"
          variant="primary"
          @click="submitMission"
        >
          {{ editing ? 'Salvar' : 'Criar' }} Missão
          <b-spinner v-show="loadingMissionPlus" small variant="white" />
        </b-button>
      </div>
    </portal>
  </b-card>
</template>