<template>
  <section>
    <div class="text-left">
      <b-card class="shadow-none" bg-variant="light-primary">
        <b-skeleton-wrapper :loading="loading">
          <template v-slot:loading>
            <b-skeleton type="text" class="w-100 mb-0" />
          </template>
          <b-row>
            <b-col>
              <div
                class="d-flex flex-column flex-sm-row align-items-center justify-content-start gap-2"
              >
                <span class="text-primary font-bold"> Missão com {{ totalActivities }} jogos </span>
                <span class="point-circle d-none d-sm-block bg-primary" />
                <span class="text-primary">
                  Cada aluno pode conquistar até {{ totalStars }} estrelas.
                </span>
              </div>
            </b-col>
          </b-row>
        </b-skeleton-wrapper>
      </b-card>
    </div>
    <ListTableLocalSorting
      ref="listTable"
      :table-columns="tableColumns"
      :data-table="dataTable"
      search-placeholder="searchForStudent"
      :row-class="rowClass"
      :loading="loading"
      :export-to-excel="exportExcel"
      :generating-excel="excelLoading"
    >
      <template #head(stars)="item">
        <div
          v-b-tooltip.hover.top="'São recebidas com base no rendimento do aluno à medida que joga.'"
          class="d-flex align-items-center gap-2"
        >
          <img :src="icons.starIcon" alt="" style="height: 20px" />
          <span>{{ item.label }}</span>
        </div>
      </template>
      <template #head(pointsXp)="item">
        <div
          v-b-tooltip.hover.top="
            'São atribuídos de acordo com o progresso no jogo. A quantidade varia de acordo com o nível de dificuldade.'
          "
          class="d-flex align-items-center gap-2"
        >
          <img :src="icons.xpIcon" alt="" style="height: 20px" />
          <span>{{ item.label }}</span>
        </div>
      </template>
      <template #head(coins)="item">
        <div
          v-b-tooltip.hover.top="
            'São recebidas ao completar determinado jogo. A quantidade está diretamente relacionada ao desempenho.'
          "
          class="d-flex align-items-center gap-2"
        >
          <img :src="icons.coinIcon" alt="" style="height: 20px" />
          <span>{{ item.label }}</span>
        </div>
      </template>
      <template #cell(position)="{ item }">
        <div class="d-flex align-items-center gap-1">
          <img
            v-if="item.position === '1º'"
            class="mr-1"
            src="@/assets/images/stars/gold.svg"
            alt=" Ouro"
          />
          <img
            v-if="item.position === '2º'"
            class="mr-1"
            src="@/assets/images/stars/silver.svg"
            alt=" Prata"
          />
          <img
            v-if="item.position === '3º'"
            class="mr-1"
            src="@/assets/images/stars/bronze.svg"
            alt=" Bronze"
          />

          <strong>{{ item.position }}</strong>
        </div>
      </template>
      <template #cell(studentName)="{ item }">
        <div class="d-flex align-items-center gap-2">
          <span class="font-bold">{{ $filters.truncate(item.studentName, 30) }}</span>
        </div>
      </template>
      <template #cell(stars)="{ item }">
        <div class="d-flex align-items-center gap-2">
          <span>{{ item.stars | formatNumber }}/{{ totalStars | formatNumber }}</span>
        </div>
      </template>
    </ListTableLocalSorting>
  </section>
</template>

<script setup>
import coinIcon from '@/assets/images/ranking-icons/coin.png'
import starIcon from '@/assets/images/ranking-icons/star.png'
import xpIcon from '@/assets/images/ranking-icons/xp.png'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { formatNumber } from '@/filters/filters'
import router from '@/router'
import {
  getMissionRanking,
  getMissionRankingExcel,
} from '@/services/shared/reports/Report.service'
import useFilters from '@/store/filters/useFilters'
import { sanitizeString } from '@/utils/utils'
import { saveAs } from 'file-saver'
import { onMounted, ref } from 'vue'

// Props
const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
})

// Refs and State
const listTable = ref(null)
const loading = ref(false)
const excelLoading = ref(false)
const dataTable = ref([])
const totalData = ref(0)

const { classe, subject } = useFilters()
const missionId = ref(router.currentRoute.params.missionId)

const totalStars = ref(0)
const totalActivities = ref(0)

const tableColumns = [
  { key: 'position', label: 'POSIÇÃO NA TURMA', sortable: true },
  { key: 'studentName', label: 'ALUNO', sortable: true, searchable: true },
  {
    key: 'stars',
    label: 'ESTRELAS',
    sortable: true,
  },
  {
    key: 'pointsXp',
    label: 'PONTOS XP DA MISSÃO',
    sortable: true,
    formatter: value => formatNumber(value),
  },
  { key: 'coins', label: 'MOEDAS', sortable: true, formatter: value => formatNumber(value) },
]

const rowClass = (item, type) => {
  if (!item || type !== 'row') return
  if (item.position === '1º') return 'tbody-row bg-light-primary'
  if (item.position === '2º') return 'tbody-row bg-light-success'
  if (item.position === '3º') return 'tbody-row bg-light-info'
  return 'tbody-row'
}

const exportExcel = async () => {
  excelLoading.value = true
  const { data } = await getMissionRankingExcel(missionId.value, {
    ClassId: classe.value.ClassId,
  })
  const fileName = sanitizeString(`Relatório missão ${props.data.name}.xlsx`)
  saveAs(data, fileName)
  excelLoading.value = false
}

const getRankingData = () => {
  loading.value = true
  getMissionRanking({ id: missionId.value, classId: classe.value.ClassId })
    .then(({ data }) => {
      dataTable.value = data.ranking
      totalStars.value = data.totalStars
      totalActivities.value = data.activities
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  getRankingData()
})

const icons = { starIcon, xpIcon, coinIcon }
</script>

<style lang="scss" scoped>
  .point-circle {
    border-radius: 50%;
    width: 4px;
    height: 4px;
  }
</style>