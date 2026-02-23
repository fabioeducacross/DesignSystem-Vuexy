<template>
  <div>
    <b-row>
      <b-col cols="12" lg="8">
        <h1 class="ranking-list-title">Rankings de conquista - Ilhas</h1>
      </b-col>
      <b-col cols="12" lg="4" align-self="end">
        <div class="d-flex justify-content-end">
          <b-form-group>
            <b-button v-b-modal.modal-config variant="primary"> Configurar ranking </b-button>
          </b-form-group>
        </div>
      </b-col>
    </b-row>

    <b-card>
      <b-row class="match-height">
        <b-col cols="12" md="auto">
          <SelectSubject :additional-modules="[ModulesEnum.Islands]" />
        </b-col>
        <b-col cols="12" md="6" lg="4" align-self="center">
          <b-form-group id="class-group" label="Turma*" label-for="classes">
            <ESelect
              id="classes"
              label="name"
              :value="classe"
              :options="classes"
              :clearable="false"
              :loading="classesLoading"
              :disabled="classesLoading"
              :page="classesPage"
              :total-pages="classesTotalpages"
              paginated
              @input="setclasses"
              @nextPage="fetchClasses"
            >
              <template v-slot:no-options> Nenhuma turma encontrada </template>
              <template v-slot:selected-option="{ name, serieName }">
                <span class="d-flex class-badge">
                  {{ name }}
                  <SchoolYearBadge v-if="serieName" class="select-badge" :text="serieName" />
                </span>
              </template>
              <template v-slot:option="{ name, serieName, classId }">
                <span class="d-flex flex-wrap class-badge">
                  {{ name }}
                  <SchoolYearBadge
                    v-if="serieName"
                    :text="serieName"
                    :selected="classe.id === classId"
                  />
                </span>
              </template>
            </ESelect>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>

    <ranking-badge-table :badge-ranking-by-class="dataRanking" :loading="loading" />

    <RankingConfigModal :modal-title="`Ilhas ${subjectPrefix[subject.id]} ${subject.name}`" />
  </div>
</template>

<script setup>
  import RankingBadgeTable from '../../shared/components/ranking-badge-table/RankingBadgeTable.vue'
  import RankingConfigModal from './components/RankingConfigModal.vue'
  import ESelect from '@/components/selects/ESelect.vue'
  import { subjectPrefix } from '@/consts/SubjectEnum'
  import { ModulesEnum } from '@/consts/admin-context/enums/modules'
  import SelectSubject from '@/layouts/components/SelectSubject.vue'
  import { getClassesV2Label } from '@/services/shared/classes/Classes.service'
  import { getRankingByClass } from '@/services/shared/ranking/Ranking.Service'
  import store from '@/store'
  import useFilters from '@/store/filters/useFilters.js'
  import SchoolYearBadge from '@components/SchoolYearBadge'
  import { ref, computed, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router/composables'

  const route = useRoute()
  const router = useRouter()

  const ModulesEnumObj = ModulesEnum

  const institutionId = computed(() => {
    return store.getters.accessUserData?.InstitutionId
  })

  const { subject, classe } = useFilters()

  const dataRanking = ref([])
  const loading = ref(true)

  const handleGetDataRanking = async () => {
    loading.value = true
    await getRankingByClass(classe.value.id, subject.value.id)
      .then(response => {
        dataRanking.value = response.data
      })
      .finally(() => {
        loading.value = false
      })
  }

  const classesLoading = ref(true)
  const classes = ref([])
  const classesPage = ref(1)
  const classesTotalpages = ref(1)

  const setclasses = value => {
    classe.value = value
    handleGetDataRanking()
  }

  const fetchClasses = async (ctx = {}) => {
    if (!subject.value.id) return

    classesLoading.value = true

    const { page } = ctx
    classesPage.value = page || 1

    try {
      const { data } = await getClassesV2Label({
        Page: classesPage.value,
        SubjectId: subject.value.id,
        institutionId: institutionId.value,
      })

      const options = data.data

      if (classesPage.value === 1) {
        classes.value = []

        if (options.length > 0) {
          classe.value = options[0]
        } else {
          loading.value = false
        }
      }

      classes.value.push(...options)
      classesTotalpages.value = data.totalPages
      classesLoading.value = false
    } catch (error) {
      classes.value = []
    }
  }

  const toSchoolConfig = () => {
    router.push({
      name: 'configSchoolRanking',
    })
  }
  const toClassConfig = () => {
    router.push({
      name: 'configClassRanking',
    })
  }

  watch(subject, async () => {
    classesPage.value = 1
    classesTotalpages.value = 1
    classes.value = []
    loading.value = true

    await fetchClasses()
    await handleGetDataRanking()
  })
</script>

<style lang="scss" scoped>
  .ranking-list-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;

    color: #2c2c2c;
  }

  .ranking-list-legend {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;

    color: #2c2c2c;

    margin: 0;
  }

  .class-badge {
    display: flex;
    letter-spacing: 0;
    align-items: center;

    .select-badge {
      margin-top: 2px;
      margin-left: 8px !important;
    }
  }

  @media (max-width: 1000px) {
    .ranking-modal-buttons {
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
