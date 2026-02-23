<template>
  <div>
    <div>
      <h1 class="ranking-list-title">Ilhas {{ subjectPrefix[subject.id] }} {{ subject.name }}</h1>
    </div>
    <b-card>
      <SelectSubject />
    </b-card>
    <ranking-badge-table
      :badge-ranking-by-class="dataRanking"
      teacher="teacher"
      :loading="loading"
    />
  </div>
</template>

<script setup>
import RankingBadgeTable from '../../../admin-context/shared/components/ranking-badge-table/RankingBadgeTable.vue'
import { subjectPrefix } from '@/consts/SubjectEnum'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getRankingByClass } from '@/services/shared/ranking/Ranking.Service'
import store from '@/store'
import { ref, computed, watch, onMounted } from 'vue'

const dataRanking = ref([])
const loading = ref(true)

const subject = computed(() => store.getters['filters/subject'])
const classe = computed(() => store.getters['filters/class'])

const handleGetDataRanking = async () => {
  loading.value = true
  getRankingByClass(classe.value?.ClassId)
    .then(response => {
      dataRanking.value = response.data
    })
    .finally(() => {
      loading.value = false
    })
}

watch(
  subject,
  () => {
    handleGetDataRanking()
  }
)

onMounted(() => {
  handleGetDataRanking()
})
</script>

<style lang="scss" scoped>
  .ranking-list-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;

    color: #5e5873;
  }

  .ranking-list-legend {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;

    color: #2c2c2c;

    margin: 0;
  }

  .ranking-list-action {
    display: flex;
    justify-content: end;
  }

  .ranking-modal-title {
    margin: 2rem;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;

    color: #2c2c2c;

    text-align: center;
  }

  .ranking-modal-buttons {
    display: flex;
    justify-content: center;
  }

  .ranking-modal-button {
    margin: 8px;
  }

  .ranking-list-filters {
    width: 20%;
  }

  @media (max-width: 600px) {
    .ranking-modal-buttons {
      display: flex;
      flex-direction: column;
    }

    .ranking-list-filters {
      width: 27.9rem;
      margin-bottom: 0.5rem;
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
