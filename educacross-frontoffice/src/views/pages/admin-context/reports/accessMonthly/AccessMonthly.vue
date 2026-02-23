<template>
  <div class="access-monthly">
    <Tab :tabs="availableTabs" :current-tab="0" tab-title-icon="school" :tab-title="title">
      <template v-for="(tab, index) in availableTabs" #[`tab-content-${index}`]>
        <component :is="tab.component" :key="index" />
      </template>
    </Tab>
  </div>
</template>

<script setup>
  import Tab from '@/components/tab/Tab.vue'
  import { ACTION, PERMISSION } from '@/consts/permissions'
  import store from '@/store'
  import Classes from '@/views/pages/admin-context/reports/accessMonthly/tabs/Classes'
  import Schools from '@/views/pages/admin-context/reports/accessMonthly/tabs/Schools'
  import Students from '@/views/pages/admin-context/reports/accessMonthly/tabs/Students'
  import { computed, getCurrentInstance } from 'vue'

  const vm = getCurrentInstance().proxy

  const availableTabs = computed(() => {
    const tabs = []

    if (vm.$can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)) {
      tabs.push({
        title: 'Escolas',
        component: Schools,
      })
    }

    tabs.push(
      {
        title: 'Turmas',
        component: Classes,
      },
      {
        title: 'Alunos',
        component: Students,
      },
    )

    return tabs
  })

  const title = store.getters.accessUserData.InstitutionName
</script>

<style lang="scss">
  .access-monthly {
    .nav-item .nav-link {
      font-size: 18px;
    }
  }
</style>
<style lang="scss" scoped>
  .text-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;

    color: #2c2c2c;

    margin: 0;
  }

  .text-legend,
  .legend-numbers {
    font-weight: 600;
    font-size: 15px;
    line-height: 24px;

    color: #2c2c2c;
  }

  .teachersList {
    display: flex;
    margin-top: 2rem;

    @media (max-width: 900px) {
      display: none;
    }
  }

  .paddingAdjust {
    padding-left: 30px;

    @media (max-width: 900px) {
      display: none;
    }
  }

  .marginAdjust {
    margin-right: 1rem;

    @media (max-width: 900px) {
      display: none;
    }
  }

  .custom-feather {
    width: 24px;
    height: 24px;

    color: #7367f0;

    margin-left: 19px;
  }

  .legend-numbers {
    color: #00bdb9;
  }

  .tab-header {
    padding-top: 1rem;
  }

  span.text-primary {
    display: flex;
    font-weight: bold;
    font-size: 0.9rem;
    align-self: center;
    padding: 1px 9px;
    border-radius: 17px;
  }

  @media (max-width: 900px) {
    .column-order {
      display: flex;
      flex-direction: column;
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