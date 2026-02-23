<template>
  <div>
    <ranking-card-config :institution-data="institution" @schoolConfig="updateConfig" />

    <b-card class="school-ranking-example">
      <h1 class="school-ranking-example-title">Exemplo de visualização do aluno</h1>
      <hr />
      <div class="school-ranking-example-content column-order">
        <div class="school-ranking-example-option">
          <h2 class="option-title">Individual</h2>
          <img
            src="@/assets/images/ranking-example/rankingIndividual.png"
            alt="Ranking Individual"
          />
        </div>
        <div class="school-ranking-example-option">
          <h2 class="option-title">Relativo</h2>
          <img src="@/assets/images/ranking-example/rankingRelativo.png" alt="Ranking Relativo" />
        </div>
        <div class="school-ranking-example-option">
          <h2 class="option-title">Absoluto</h2>
          <img src="@/assets/images/ranking-example/rankingAbsoluto.png" alt="Ranking Absoluto" />
        </div>
      </div>
    </b-card>
  </div>
</template>

<script setup>
import {
  editInstitutionConfig,
  getInstitutionConfig,
} from '@/services/shared/config/Config.Service'
import RankingCardConfig from '@/views/pages/admin-context/shared/components/ranking-card-config/RankingCardConfig.vue'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'
import { BCard } from 'bootstrap-vue'

const institution = ref({})

// Fetch institution config on mount
const handleGetInstitutionConfig = async () => {
  await getInstitutionConfig().then(response => {
    institution.value = response.data
  })
}

onMounted(() => {
  handleGetInstitutionConfig()
})

const updateConfig = async (data) => {
  await editInstitutionConfig(data).then(() => {
    // $toast is available on component instance in Vue 2.7 setup (proxy style)
    // Use globalThis to access proxy if needed, otherwise use `this.$toast`
    // Directly using `$toast` here, which will work in <script setup> in Vue 2.7
    // @ts-ignore
    $toast({
      component: Toast,
      props: {
        text: 'Configuração atualizada com sucesso',
        icon: 'CheckCircleIcon',
        variant: 'success',
      },
    })
  })
}
</script>

<style lang="scss" scoped>
  .school-ranking-example-title {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;

    color: #2c2c2c;
  }

  .option-title {
    font-size: 14px;
    font-weight: 500;
    line-height: 23px;

    color: #2c2c2c;
  }

  .filters-form {
    display: flex;
    flex-wrap: wrap;
    align-content: stretch;
    justify-content: space-between;
  }

  .filters-form-items {
    flex: 1;
    margin: 0px 5px;
  }

  .filters-wrapper {
    margin-top: 24px;
  }

  .school-ranking-example-content {
    display: flex;
    justify-content: space-between;
  }

  .teste {
    display: flex;
  }

  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 600px) {
    .column-order {
      display: flex;
      flex-direction: column;
    }

    .selects {
      width: 27.5rem;
      margin-right: 0.5rem;
    }

    .filters-form {
      display: flex;
      flex-direction: column;
    }

    .filters-form-items {
      margin-bottom: 1rem;
    }

    .custom-button-margin {
      margin-top: 1rem;
    }
  }
</style>