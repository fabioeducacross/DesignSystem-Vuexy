<template>
  <div class="expired-mission">
    <div class="expired-mission-content">
      <img
        src="@/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-enable-script.png"
        alt="belinha"
      />
      <h1 class="title-expired-mission mt-1">Missão expirada</h1>
      <p class="attention-expired-mission mt-1">
        Opss... o prazo de duração da missão que você deseja enviar está com o prazo de duração
        expirado, por favor, ajuste o prazo de duração da missão antes de enviá-la aos seus alunos.
      </p>
      <div class="boxButton mt-1 mb-1">
        <b-button
          class="button-left"
          variant="outline-primary"
          type="border"
          @click="closeModalExpiredMission"
        >
          Cancelar
        </b-button>
        <b-button
          id="button-loading-cancel"
          class="button-right"
          variant="primary"
          type="filled"
          :disabled="loadingButton"
          @click="editExpiredMission"
        >
          Editar missão
        </b-button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { BButton } from 'bootstrap-vue'
  import { useRouter } from 'vue-router/composables'

  const props = defineProps({
    guideId: { type: Number, default: 0 },
  })

  const emit = defineEmits(['close-expiredMission'])

  const loadingButton = ref(false)

  const router = useRouter()

  const closeModalExpiredMission = () => {
    emit('close-expiredMission')
  }

  const editExpiredMission = () => {
    router.push(`/teacher/custom-mission/${props.guideId}`)
  }
</script>

<style lang="scss" scoped>
  .expired-mission {
    display: flex;
    flex-direction: column;
    align-items: center;
    .expired-mission-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      .img-school-doubt {
        width: 311px;
        height: 241px;
      }
      .title-expired-mission {
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 29px;
        text-align: center;
        color: #4b4b4b;
      }
      .warning-expired-mission {
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        color: #6e6b7b;
        padding: 0 40px;
      }
      .attention-expired-mission {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 32px;
        text-align: center;
        padding: 0 40px;
      }
      .boxButton {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        .button-right,
        .button-left {
          width: 18rem;
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
    .cancelled {
      display: flex;
      flex-direction: column;
      align-items: center;
      .title-cancelled {
        font-style: normal;
        font-weight: 500;
        font-size: 28px;
        line-height: 36px;
        color: #5e5873;
      }
      .warning-mission-cancelled {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: #6e6b7b;
        padding: 0 40px;
      }
      .button-cancelled {
        width: 18rem;
        height: 48px;
        margin-bottom: 1rem;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0.4px;
      }
    }
    .fade-in {
      animation-duration: 1s;
      animation-name: fadeIn;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
</style>