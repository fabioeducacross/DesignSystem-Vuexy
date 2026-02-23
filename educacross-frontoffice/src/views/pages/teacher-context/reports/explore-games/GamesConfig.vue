<template>
  <div>
    <h2 class="mb-1">Configure o módulo Explorar para os seus alunos</h2>
    <b-row class="match-height">
      <b-col cols="auto">
        <b-card>
          <SelectSubject />
        </b-card>
      </b-col>
      <b-col cols>
        <b-card>
          <b-overlay
            :show="loadingMainSwitch"
            opacity="1"
            variant="white"
            rounded="sm"
            spinner-variant="primary"
          >
            <h5>{{ islandName }}</h5>
            <div class="swipper">
              <b-form-checkbox
                id="exploreIslandSwiper"
                v-model="exploreIslandSwiper"
                class="custom-control-primary"
                name="check-button"
                switch
              />
              <label>Habilitada</label>
            </div>
          </b-overlay>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-card>
          <b-overlay
            :show="loadingSeries"
            opacity="1"
            variant="white"
            rounded="sm"
            spinner-variant="primary"
          >
            <h5 class="mb-1">
              Ative os jogos que aparecerão para a sua turma de acordo com o ano escolar
            </h5>
            <div class="checkboxes d-flex gap-4 flex-wrap mb-2">
              <b-checkbox v-model="allSeries" :disabled="!isDisabled" @change="checkAll()">
                Todos os anos escolares
              </b-checkbox>
              <b-checkbox
                v-for="(serie, index) in series"
                :id="serie.id.toString()"
                :key="index"
                :checked="serie.status"
                :disabled="!isDisabled"
                @change="updateCheck(serie)"
              >
                {{ serie.name }}
              </b-checkbox>
            </div>
            <b-button
              variant="primary"
              :disabled="loadingButtonSaveGrades"
              @click="updateIslandGrade()"
            >
              <b-spinner v-if="loadingButtonSaveGrades" class="mr-1" small />
              Salvar
            </b-button>
          </b-overlay>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script setup>
import { subjectPrefix } from '@/consts/SubjectEnum'
import SelectSubject from '@/layouts/components/SelectSubject.vue'
import { getSubjectsSeries } from '@/services/admin-context/series/Series.service'
import {
  getGuideFilter,
  getUpdateMap,
  putGuideFilter,
  putUpdateMap,
} from '@/services/shared/classes/Classes.service'
import store from '@/store'
import { ref, computed, watch, onMounted, getCurrentInstance } from 'vue'
import Toast from '@/views/pages/admin-context/shared/components/toast/Toast.vue'

// mapGetters manually as computed(s) since Vue 2.7 <script setup>
const subject = computed(() => store.getters['filters/subject'])
const classe = computed(() => store.getters['filters/class'])

const exploreIslandSwiper = ref(undefined)
const series = ref([])
const grade = ref([])
const allSeries = ref(false)
const isDisabled = ref(false)
const loadingButtonSaveGrades = ref(false)
const loadingMainSwitch = ref(true)
const loadingSeries = ref(true)
const toast = getCurrentInstance().proxy.$toast

// Used for intermediate switches, not sure if still needed -- not referenced anywhere
// const globalClassId = ref(0)
// const subjectId = ref(0)
// const checkCalling = ref(false)

// islandName computed logic
const islandName = computed(() => {
  const currentSubject = subject.value
  if (!currentSubject) return 'Ilhas'
  const prefix = subjectPrefix[currentSubject.id] || ''
  const name = currentSubject.name || ''
  return `Ilhas ${prefix} ${name}`.trim()
})

// Equivalent to mapping status for each series
const status = computed(() => series.value.map(item => item.status))

// Watchers (always .value in script)
watch(series, () => {
  let qtdChecked = 0
  series.value.forEach(item => {
    if (item.status) {
      qtdChecked += 1
    }
  })
  allSeries.value = series.value.length > 0 && qtdChecked === series.value.length
}, { deep: true })

watch(exploreIslandSwiper, () => {
  isDisabled.value = exploreIslandSwiper.value
})

watch(classe, () => {
  getMap()
})

watch(subject, () => {
  getSeries()
})

// onMounted instead of created
onMounted(async () => {
  await getMap()
  if (!exploreIslandSwiper.value) {
    isDisabled.value = true
    exploreIslandSwiper.value = false
  }
})

// --- Methods ---
function getSeries() {
  loadingSeries.value = true
  if (!subject.value) {
    loadingSeries.value = false
    return
  }
  getSubjectsSeries(subject.value.id)
    .then(response => {
      // Defensive copy of array
      series.value = response.data.map(serie => Object.assign({}, serie))
      getGrade()
    })
    .catch(() => {
      loadingSeries.value = false
    })
}

function getGrade() {
  if (!classe.value || !subject.value) {
    loadingSeries.value = false
    return
  }

  getGuideFilter(classe.value.ClassId, subject.value.id)
    .then(response => {
      grade.value = response.data.serieIds
      // Map existing series, set .status true if its id is in grade.value
      series.value = series.value.map(serie => {
        serie.status = grade.value.includes(serie.id)
        return serie
      })
    })
    .finally(() => {
      loadingSeries.value = false
    })
}

function getMap() {
  loadingMainSwitch.value = true
  if (!classe.value) {
    loadingMainSwitch.value = false
    return
  }
  getUpdateMap(classe.value.ClassId)
    .then(response => {
      exploreIslandSwiper.value = response.data.enableMap
      isDisabled.value = response.data.enableMap
    })
    .finally(() => {
      loadingMainSwitch.value = false
    })
}

function updateIslandGrade() {
  loadingButtonSaveGrades.value = true
  const finalGrades = []
  let qtdChecked = 0

  series.value.forEach(item => {
    if (item.status) {
      finalGrades.push(item.id)
      qtdChecked += 1
    }
  })

  if (qtdChecked === 0 && exploreIslandSwiper.value) {
    exploreIslandSwiper.value = false
    isDisabled.value = true
  }

  Promise.all([
    putGuideFilter(classe.value.ClassId, {
      subjectId: subject.value.id,
      serieIds: finalGrades,
    }),
    putUpdateMap(classe.value.ClassId, {
      enableMap: exploreIslandSwiper.value,
    }),
  ])
    .then(() => {
      toast({
        component: Toast,
        props: {
          icon: 'CheckCircleIcon',
          variant: 'success',
          text: 'Dados alterados com sucesso',
        },
      })
    })
    .finally(() => {
      loadingButtonSaveGrades.value = false
    })
}

// v-model for b-checkbox 'Todos os anos escolares' triggers .change even if user toggles the master checkbox
function checkAll(value = null) {
  if (value === null) {
    series.value = series.value.map(item => {
      item.status = allSeries.value
      return item
    })
    return
  }
  series.value = series.value.map(item => {
    item.status = value
    return item
  })
}

// b-checkbox for each year, toggles status for clicked serie
function updateCheck(e) {
  series.value = series.value.map(item => {
    if (item.id === e.id) {
      item.status = !e.status
    }
    return item
  })
}

</script>

<style scoped lang="scss">
  .content-title {
    font-size: 24px;
    line-height: 29px;
    color: #5e5873;
  }

  .config-content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .card {
      background: #ffffff;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      border-radius: 8px;

      &.card-switch {
        padding: 25px 19px;
        width: 258px;
        height: 123px;
        margin-right: 24px;
        margin-bottom: 24px;
      }

      &.card-checkbox {
        width: auto;
        height: 123px;
        padding: 19px;

        @media (max-width: 798px) {
          max-width: 632px;
          height: auto;
        }

        @media (min-width: 798px) {
          max-width: 850px;
        }
      }
    }

    h5 {
      font-weight: 600;
      font-size: 15px;
      line-height: 24px;
      letter-spacing: 0;

      color: #5e5873;
    }

    .swipper {
      display: flex;
      justify-content: flex-start;

      margin-top: 24px;

      label {
        margin-left: 8px;
      }
    }

    .checkboxes {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      margin-top: 1.35rem;

      @media (max-width: 798px) {
        margin: 10px;
      }

      .btn-save {
        width: 118px;

        @media (max-width: 798px) {
          width: 100%;
          margin: 20px auto;
        }
      }
    }
  }
</style>
