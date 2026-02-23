<template>
  <div class="archive-missions">
    <div v-if="notFinished && !finished" class="not-archive">
      <img
        src="@/assets/images/teacher-context/school-context/students/pdf-progress/error.png"
        alt="belinha"
      />
      <h1 class="not-archive-title mt-2">
        Não é possível arquivar
        {{ missionsNotFinished.length > 1 ? 'as missões' : 'a missão' }}
      </h1>
      <p class="not-archive-subtitle">
        Opss...
        {{ missionsNotFinished.length > 1 ? 'as missões' : 'a missão' }} que você deseja arquivar
        não {{ missionsNotFinished.length > 1 ? 'estão finalizadas' : 'está finalizada' }}, para
        arquivar uma missão é necessário que ela esteja finalizada.
      </p>
    </div>
    <div v-else class="archived">
      <img
        src="@/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-enable-script.png"
        alt="belinha"
      />
      <h1 class="title mt-2">Arquivar missão</h1>
      <div v-if="notFinished" class="not-finished-warning">
        <span class="material-symbols-outlined" style="color: #ff9f43"> warning </span>
        <p class="not-finished-title mb-0">
          Você selecionou
          {{ missionsNotFinished.length > 1 ? 'algumas missões' : 'uma missão' }}
          que não
          {{ missionsNotFinished.length > 1 ? 'podem ser arquivadas' : 'pode ser arquivada' }}
          no momento por não
          {{ missionsNotFinished.length > 1 ? 'estarem finalizadas.' : 'estar finalizada.' }}
        </p>
      </div>
      <div v-if="notFinished" class="not-finished-missions">
        <p class="not-finished-missions-title">
          {{ missionsNotFinished.length > 1 ? 'Missões' : 'Missão' }} que não
          {{ missionsNotFinished.length > 1 ? 'podem ser arquivadas' : 'pode ser arquivada' }}
        </p>
        <div
          v-for="missionNotFinished in missionsNotFinished"
          :key="missionNotFinished.guideId"
          class="not-finished-missions-guide-names"
        >
          <p class="not-finished-missions-guide-name" style="font-weight: bold">
            {{ missionNotFinished.guideName }}
          </p>
        </div>
      </div>
      <div class="finished-missions">
        <p v-if="notFinished" class="finished-missions-title">
          {{ missionsFinished.length > 1 ? 'Missões' : 'Missão' }} que
          {{ missionsFinished.length > 1 ? 'podem ser arquivadas' : 'pode ser arquivada' }}
        </p>
        <p class="finished-missions-subtitle">
          Tem certeza que deseja arquivar
          {{ missionsFinished.length > 1 ? 'as missões' : 'a missão' }} abaixo?
        </p>
        <div
          v-for="missionFinished in missionsFinished"
          :key="missionFinished.guideId"
          class="finished-missions-guide-names"
        >
          <p class="finished-missions-guide-name" style="font-weight: bold">
            {{ missionFinished.guideName }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="notFinished && !finished" class="boxButton mt-6">
      <b-button
        class="button-right"
        variant="primary"
        type="filled"
        @click="closeModalArchiveMissions()"
      >
        Ok
      </b-button>
    </div>
    <div v-else class="boxButton mt-6">
      <b-button
        class="button-left"
        variant="outline-primary"
        type="border"
        @click="closeModalArchiveMissions()"
      >
        Cancelar
      </b-button>
      <b-button
        id="button-loading-deleteGuide"
        ref="loadableButtonDeleteGuide"
        class="button-right"
        variant="primary"
        type="filled"
        @click="archiveGuide()"
      >
        Arquivar
      </b-button>
    </div>
  </div>
</template>

<script setup>
import { EGuideSituation } from '@/consts/missionsEnum.js'
import { BButton } from 'bootstrap-vue'

// Props
const props = defineProps({
  archiveMissions: {
    type: Array,
    required: true,
  },
})

// Emits
const emit = defineEmits(['close-archive-missions', 'archive-missions'])

// Refs for data (must use ref for reactivity in arrays)
import { ref, computed, onMounted } from 'vue'

const missionsFinished = ref([])
const missionsNotFinished = ref([])

const notFinished = computed(() => missionsNotFinished.value.length)
const finished = computed(() => missionsFinished.value.length)

onMounted(() => {
  missionsFinished.value = props.archiveMissions.filter(
    element =>
      element.situation === EGuideSituation.Finished ||
      element.situation === EGuideSituation.Cancelled,
  )
  missionsNotFinished.value = props.archiveMissions.filter(
    element =>
      element.situation !== EGuideSituation.Finished &&
      element.situation !== EGuideSituation.Cancelled,
  )
})

const closeModalArchiveMissions = () => {
  emit('close-archive-missions')
}

const archiveGuide = () => {
  emit('archive-missions', missionsFinished.value)
}
</script>

<style lang="scss" scoped>
  .archive-missions {
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    text-align: center;
    .not-archive {
      display: flex;
      flex-direction: column;
      align-items: center;
      .not-archive-title {
        color: #5e5873;
        margin-bottom: 24px;
      }
      .not-archive-subtitle {
        color: #6e6b7b;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
      }
    }
    .archived {
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        font-style: normal;
        font-weight: 500;
        font-size: 28px;
        line-height: 36px;
        margin-bottom: 24px;
        color: #5e5873;
      }
      .subtitle {
        color: #6e6b7b;
        margin-bottom: 14px;
      }
      .not-finished-warning {
        background: #ff9f431f;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 24px;
        padding: 0.75rem;

        gap: 0.5rem;
        .warning {
          margin-left: 1rem;
        }
        .not-finished-title {
          text-align: left;
          font-style: normal;
          font-weight: bold;
          font-size: 12px;
          line-height: 18px;
          color: #ff9f43;
        }
      }
      .not-finished-missions {
        margin-bottom: 24px;
        .not-finished-missions-title {
          color: #ea5455;
          font-style: normal;
          font-weight: bold;
          font-size: 14px;
          line-height: 24px;
          margin-bottom: 5px;
        }
        .not-finished-missions-guide-names {
          color: #6e6b7b;
          font-weight: 700;
        }
      }
      .finished-missions {
        margin-bottom: 14px;
        .finished-missions-title {
          color: #28c76f;
          font-style: normal;
          font-weight: bold;
          font-size: 14px;
          line-height: 24px;
          margin-bottom: 5px;
        }
        .finished-missions-subtitle {
          margin-bottom: 5px;
        }
        .finished-missions-guide-names {
          color: #6e6b7b;
          font-weight: 700;
        }
      }
    }
    .boxButton {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      width: 100%;
      .button-right,
      .button-left {
        width: 15rem;
        height: 48px;
        margin-bottom: 1rem;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0.4px;
      }
      .button-left {
        margin-right: 1%;
      }

      .button-right {
        margin-left: 1%;
      }
    }
  }
</style>