<template>
  <SimpleTab>
    <div>
      <p class="ranking-legend">Selecione qual ranking deseja</p>
    </div>
    <div class="ranking-content">
      <ranking-card
        v-if="$can(ACTION.READ, PERMISSION.MODULE.SCHOOL_MISSIONS)"
        sub-title="Missões da Escola"
        type="school"
      />
      <ranking-card
        v-for="data in educationData"
        :key="data.id"
        :data="data"
        :type="'educationSystem'"
      />
      <ranking-card
        v-if="$can(ACTION.READ, PERMISSION.MODULE.ISLANDS)"
        sub-title="Ilhas"
        type="island"
      />
    </div>
  </SimpleTab>
</template>

<script setup>
  import SimpleTab from '@/components/tab/SimpleTab.vue'
  import { ACTION, PERMISSION } from '@/consts/permissions'
  import RankingCard from '@/views/pages/admin-context/shared/components/ranking-card/RankingCard.vue'
  import store from '@/store'
  import ability from '@/libs/acl/ability'

  // Reactive state
  import { ref } from 'vue'

  const educationData = ref(null)

  // Provide ACTION and PERMISSION for template
  // These can be accessed directly since imported

  // Lifecycle: created
  const handleGetModulesData = async () => {
    // Use ability.can() directly
    if (ability.can(ACTION.READ, PERMISSION.MODULE.EDUCATION_SYSTEMS)) {
      educationData.value = store.state.access.educationSystems
    }
  }

  handleGetModulesData()
</script>

<style lang="scss" scoped>
  .ranking-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;

    color: #2c2c2c;
  }

  .ranking-legend {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;

    color: #2c2c2c;

    margin: 0;
  }

  .ranking-content {
    display: flex;
    flex-wrap: wrap;
  }

  @media (max-width: 800px) {
    .ranking-content {
      display: flex;
      align-content: center;
      flex-direction: column;
    }
  }
</style>