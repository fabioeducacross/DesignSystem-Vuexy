<template>
  <Tab :tabs="tabs" :current-tab="currentTab" :tab-title="tabTitle" tab-title-icon="school">
    <template v-slot:tab-content-0>
      <div>
        <b-card>
          <span class="text-base">Escolha o sistema de ensino que deseja visualizar:</span>
        </b-card>
        <b-skeleton-wrapper :loading="loading" class="w-100">
          <template v-slot:loading>
            <div class="h-100">
              <b-row class="match-height">
                <b-col sm="12" md="6" lg="3" class="mb-2">
                  <b-skeleton type="card" height="225px" class="w-100 rounded" />
                </b-col>
                <b-col sm="12" md="6" lg="3" class="mb-2">
                  <b-skeleton type="card" height="225px" class="w-100 rounded" />
                </b-col>
                <b-col sm="12" md="6" lg="3" class="mb-2">
                  <b-skeleton type="card" height="225px" class="w-100 rounded" />
                </b-col>
                <b-col sm="12" md="6" lg="3" class="mb-2">
                  <b-skeleton type="card" height="225px" class="w-100 rounded" />
                </b-col>
              </b-row>
            </div>
          </template>
          <b-row class="match-height">
            <b-col v-for="(data, index) in educationData" :key="index" sm="12" md="6" lg="3">
              <EducationSystemCard
                :id="data.id"
                :image="data.imageUrl"
                :missions="data.totalGuides"
                :books="data.totalBooks"
                :action="openReport"
                :education-system-name="data.name"
              />
            </b-col>
            <b-col v-if="!educationData.length" class="text-center mb-2">
              {{ 'Nenhuma informação encontrada' }}
            </b-col>
          </b-row>
        </b-skeleton-wrapper>
      </div>
    </template>
  </Tab>
</template>

<script setup>
import EducationSystemCard from './components/EducationSystemCard.vue'
import Tab from '@/components/tab/Tab.vue'
import { getEducationSystemReport } from '@/services/shared/educationSystem/EducationSystem.Service'
import store from '@/store'
import { ref } from 'vue'
import { useRouter } from 'vue-router/composables'

const educationData = ref([])
const loading = ref(false)
const isNetworkManager = store.getters.accessRole === 'NetworkManager'

const tabs = [
  {
    title: 'Visão geral',
  },
]
const currentTab = ref(0)

const tabTitle = ref(store.state.access.userData.InstitutionName)

const fetchData = () => {
  loading.value = true
  getEducationSystemReport()
    .then(({ data }) => {
      educationData.value = data
    })
    .finally(() => {
      loading.value = false
    })
}
fetchData()

const router = useRouter()

const openReport = educationSystemId => {
  if (isNetworkManager) {
    router.push({
      name: 'educationSystemReportInstitutionsClassesBook',
      params: { educationSystemId },
    })
  } else {
    router.push({
      name: 'educationSystemReportBooksList',
      params: { educationSystemId },
    })
  }
}
</script>